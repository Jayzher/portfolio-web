import 'dotenv/config'
import express from 'express'
import cookieParser from 'cookie-parser'
import multer from 'multer'
import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT_DIR = path.resolve(__dirname, '..')
const PROJECTS_FILE = path.join(ROOT_DIR, 'src', 'data', 'projects.json')
const VIDEOS_DIR = path.join(ROOT_DIR, 'public', 'videos')

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD
const SESSION_TTL_MS = Number(process.env.SESSION_TTL_HOURS || 12) * 60 * 60 * 1000
const PORT = Number(process.env.API_PORT || 4174)

if (!ADMIN_PASSWORD) {
  console.error('ADMIN_PASSWORD is not set in .env — admin login will always fail.')
}

fs.mkdirSync(VIDEOS_DIR, { recursive: true })

// ---- In-memory sessions (single-admin local tool; resets on server restart) ----
const sessions = new Map() // token -> expiresAt

function createSession() {
  const token = crypto.randomBytes(24).toString('hex')
  sessions.set(token, Date.now() + SESSION_TTL_MS)
  return token
}

function isValidSession(token) {
  if (!token) return false
  const expiresAt = sessions.get(token)
  if (!expiresAt) return false
  if (Date.now() > expiresAt) {
    sessions.delete(token)
    return false
  }
  return true
}

function requireAuth(req, res, next) {
  if (!isValidSession(req.cookies.admin_session)) {
    return res.status(401).json({ error: 'Not authenticated. Please log in as admin.' })
  }
  next()
}

// ---- Projects file helpers ----
function readProjects() {
  const raw = fs.readFileSync(PROJECTS_FILE, 'utf8')
  return JSON.parse(raw)
}

function writeProjects(projects) {
  fs.writeFileSync(PROJECTS_FILE, JSON.stringify(projects, null, 2) + '\n')
}

function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60) || 'project'
}

// ---- App setup ----
const app = express()
app.use(express.json({ limit: '2mb' }))
app.use(cookieParser())

// ---- Auth routes ----
app.post('/api/auth/login', (req, res) => {
  const { password } = req.body || {}
  if (!ADMIN_PASSWORD || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Incorrect password.' })
  }
  const token = createSession()
  res.cookie('admin_session', token, {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: SESSION_TTL_MS,
  })
  res.json({ ok: true })
})

app.post('/api/auth/logout', (req, res) => {
  const token = req.cookies.admin_session
  if (token) sessions.delete(token)
  res.clearCookie('admin_session')
  res.json({ ok: true })
})

app.get('/api/auth/me', (req, res) => {
  res.json({ authenticated: isValidSession(req.cookies.admin_session) })
})

// ---- Projects routes ----
app.get('/api/projects', (req, res) => {
  try {
    res.json(readProjects())
  } catch (e) {
    res.status(500).json({ error: 'Failed to read projects.json' })
  }
})

app.post('/api/projects', requireAuth, (req, res) => {
  const body = req.body || {}
  if (!body.title || !String(body.title).trim()) {
    return res.status(400).json({ error: 'A project title is required.' })
  }

  const projects = readProjects()
  const id = `proj-${slugify(body.title)}-${Date.now().toString(36)}`

  const newProject = {
    id,
    title: body.title,
    description: body.description || '',
    shortDescription: body.shortDescription || '',
    thumbnail: body.thumbnail || '',
    video: body.video || null,
    techStack: Array.isArray(body.techStack) ? body.techStack : [],
    category: body.category || 'web',
    links: {
      github: body.links?.github || '',
      live: body.links?.live || '',
    },
    featured: !!body.featured,
    order: projects.length + 1,
    createdAt: new Date().toISOString(),
  }

  const updated = [newProject, ...projects]
  writeProjects(updated)
  res.status(201).json(updated)
})

app.put('/api/projects/:id', requireAuth, (req, res) => {
  const projects = readProjects()
  const idx = projects.findIndex((p) => p.id === req.params.id)
  if (idx === -1) {
    return res.status(404).json({ error: 'Project not found.' })
  }

  const body = req.body || {}
  projects[idx] = {
    ...projects[idx],
    ...body,
    links: {
      github: body.links?.github ?? projects[idx].links?.github ?? '',
      live: body.links?.live ?? projects[idx].links?.live ?? '',
    },
  }

  writeProjects(projects)
  res.json(projects)
})

app.delete('/api/projects/:id', requireAuth, (req, res) => {
  const projects = readProjects()
  const updated = projects.filter((p) => p.id !== req.params.id)
  if (updated.length === projects.length) {
    return res.status(404).json({ error: 'Project not found.' })
  }
  writeProjects(updated)
  res.json(updated)
})

// ---- Video routes ----
const ALLOWED_VIDEO_EXT = new Set(['.webm', '.mp4', '.mov'])

app.get('/api/videos/list', (req, res) => {
  try {
    const files = fs.readdirSync(VIDEOS_DIR)
      .filter((f) => ALLOWED_VIDEO_EXT.has(path.extname(f).toLowerCase()))
      .map((f) => {
        const stat = fs.statSync(path.join(VIDEOS_DIR, f))
        return { name: f, url: `/videos/${f}`, size: stat.size }
      })
    res.json(files)
  } catch (e) {
    res.status(500).json({ error: 'Failed to list videos.' })
  }
})

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, VIDEOS_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase()
    const base = slugify(path.basename(file.originalname, ext))
    cb(null, `${base}-${Date.now().toString(36)}${ext}`)
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 1024 }, // 1GB
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase()
    if (!ALLOWED_VIDEO_EXT.has(ext)) {
      return cb(new Error('Only .webm, .mp4, or .mov video files are allowed.'))
    }
    cb(null, true)
  },
})

app.post('/api/videos/upload', requireAuth, (req, res) => {
  upload.single('video')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message || 'Upload failed.' })
    }
    if (!req.file) {
      return res.status(400).json({ error: 'No video file received.' })
    }
    res.status(201).json({ url: `/videos/${req.file.filename}`, name: req.file.filename })
  })
})

app.listen(PORT, () => {
  console.log(`Admin API server running on http://localhost:${PORT}`)
})
