import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Video, Sparkles, Image, Tag, Link2, CodeXml, Check, AlertCircle, Upload, FolderOpen, Loader2 } from 'lucide-react'
import useProjectStore from '../../store/projectStore'

function formatBytes(bytes) {
  if (!bytes) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB']
  const i = Math.min(units.length - 1, Math.floor(Math.log(bytes) / Math.log(1024)))
  return `${(bytes / 1024 ** i).toFixed(1)} ${units[i]}`
}

const PRESET_THUMBNAILS = [
  { label: 'Web / SaaS', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop' },
  { label: 'AI / Neural', url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop' },
  { label: 'Mobile App', url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop' },
  { label: 'Cloud / API', url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop' },
  { label: 'E-Commerce', url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop' },
]

const SAMPLE_PROJECT = {
  title: 'Next-Gen 3D Portfolio',
  shortDescription: 'Interactive Three.js & WebGL immersive 3D experience with spatial audio',
  description: 'An experimental 3D web experience built with Three.js, React Three Fiber, and WebGL shaders. Includes procedural terrain generation, realistic lighting, and smooth camera physics.',
  category: 'web',
  thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=400&fit=crop',
  videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  duration: '10:15',
  techStack: ['React', 'Three.js', 'WebGL', 'Tailwind CSS', 'Framer Motion'],
  github: 'https://github.com',
  live: 'https://example.com',
  featured: true,
}

export default function AddProjectModal() {
  const isOpen = useProjectStore((s) => s.isAddModalOpen)
  const editingProject = useProjectStore((s) => s.editingProject)
  const closeModal = useProjectStore((s) => s.closeAddModal)
  const addProject = useProjectStore((s) => s.addProject)
  const updateProject = useProjectStore((s) => s.updateProject)
  const isDarkMode = useProjectStore((s) => s.isDarkMode)

  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    description: '',
    category: 'web',
    customCategory: '',
    thumbnail: '',
    videoUrl: '',
    duration: '',
    techStack: ['React', 'Tailwind CSS'],
    github: '',
    live: '',
    featured: false,
  })

  const [techInput, setTechInput] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // Video source: link to a file already in public/videos, upload a new
  // file, or point at an external URL (YouTube, Vimeo, direct link)
  const [videoMode, setVideoMode] = useState('existing')
  const [existingVideos, setExistingVideos] = useState([])
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')

  useEffect(() => {
    if (editingProject) {
      const url = editingProject.video?.url || ''
      setFormData({
        title: editingProject.title || '',
        shortDescription: editingProject.shortDescription || '',
        description: editingProject.description || '',
        category: editingProject.category || 'web',
        customCategory: '',
        thumbnail: editingProject.thumbnail || '',
        videoUrl: url,
        duration: editingProject.video?.duration || '',
        techStack: editingProject.techStack || ['React'],
        github: editingProject.links?.github || '',
        live: editingProject.links?.live || '',
        featured: !!editingProject.featured,
      })
      setVideoMode(url.startsWith('/videos/') ? 'existing' : url ? 'url' : 'existing')
    } else {
      setFormData({
        title: '',
        shortDescription: '',
        description: '',
        category: 'web',
        customCategory: '',
        thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
        videoUrl: '',
        duration: 'Walkthrough',
        techStack: ['React', 'Node.js', 'Tailwind CSS'],
        github: '',
        live: '',
        featured: false,
      })
      setVideoMode('existing')
    }
    setError('')
    setUploadError('')
  }, [editingProject, isOpen])

  // Lock scroll + load the list of videos already sitting in public/videos
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      fetch('/api/videos/list', { credentials: 'include' })
        .then((r) => (r.ok ? r.json() : []))
        .then((list) => setExistingVideos(Array.isArray(list) ? list : []))
        .catch(() => setExistingVideos([]))
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleUploadFile = async (file) => {
    if (!file) return
    setUploadError('')
    setUploading(true)
    try {
      const body = new FormData()
      body.append('video', file)
      const res = await fetch('/api/videos/upload', {
        method: 'POST',
        credentials: 'include',
        body,
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        throw new Error(data.error || 'Upload failed.')
      }
      setFormData((prev) => ({ ...prev, videoUrl: data.url }))
      setExistingVideos((prev) => [...prev, { name: data.name, url: data.url }])
    } catch (err) {
      setUploadError(err.message || 'Upload failed.')
    } finally {
      setUploading(false)
    }
  }

  const handleAddTech = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      const trimmed = techInput.trim().replace(/,$/, '')
      if (trimmed && !formData.techStack.includes(trimmed)) {
        setFormData((prev) => ({ ...prev, techStack: [...prev.techStack, trimmed] }))
        setTechInput('')
      }
    }
  }

  const handleRemoveTech = (tag) => {
    setFormData((prev) => ({
      ...prev,
      techStack: prev.techStack.filter((t) => t !== tag),
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!formData.title.trim()) {
      setError('Please enter a project title.')
      return
    }
    if (uploading) {
      setError('Please wait for the video upload to finish.')
      return
    }

    const finalCategory = formData.category === 'other'
      ? (formData.customCategory.trim().toLowerCase() || 'other')
      : formData.category

    const videoUrl = formData.videoUrl.trim()

    const projectPayload = {
      title: formData.title.trim(),
      shortDescription: formData.shortDescription.trim() || formData.title,
      description: formData.description.trim() || formData.shortDescription || formData.title,
      thumbnail: formData.thumbnail.trim() || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      video: videoUrl
        ? {
            url: videoUrl,
            type: videoUrl.includes('youtu') ? 'youtube' : 'video',
            duration: formData.duration.trim() || 'Walkthrough',
          }
        : null,
      techStack: formData.techStack.length > 0 ? formData.techStack : ['React'],
      category: finalCategory,
      links: {
        github: formData.github.trim(),
        live: formData.live.trim(),
      },
      featured: formData.featured,
    }

    setSubmitting(true)
    try {
      if (editingProject) {
        await updateProject(editingProject.id, projectPayload)
      } else {
        await addProject(projectPayload)
      }
    } catch (err) {
      setError(err.message || 'Failed to save project.')
    } finally {
      setSubmitting(false)
    }
  }

  const loadSample = () => {
    setFormData({
      ...SAMPLE_PROJECT,
      customCategory: '',
    })
    setVideoMode('url')
    setError('')
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
          onClick={closeModal}
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
          className={`relative w-full max-w-3xl my-8 rounded-2xl overflow-hidden shadow-2xl border ${
            isDarkMode
              ? 'bg-bg-surface border-border text-text-primary'
              : 'bg-bg-surface-light border-border-light text-text-primary-light'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className={`flex items-center justify-between px-6 py-5 border-b ${
            isDarkMode ? 'border-border bg-bg-surface' : 'border-border-light bg-bg-surface-light'
          }`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                <Video className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold">
                  {editingProject ? 'Edit Project Walkthrough' : 'Add Project Walkthrough'}
                </h3>
                <p className={`text-xs ${isDarkMode ? 'text-text-secondary' : 'text-text-secondary-light'}`}>
                  Dynamic project showcase with video integration
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {!editingProject && (
                <button
                  type="button"
                  onClick={loadSample}
                  className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                    isDarkMode
                      ? 'border-border text-text-secondary hover:text-accent hover:border-accent'
                      : 'border-border-light text-text-secondary-light hover:text-accent-light hover:border-accent-light'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Fill Sample
                </button>
              )}
              <button
                onClick={closeModal}
                className={`p-2 rounded-lg transition-colors ${
                  isDarkMode
                    ? 'hover:bg-bg-surface-hover text-text-secondary hover:text-text-primary'
                    : 'hover:bg-bg-surface-hover-light text-text-secondary-light hover:text-text-primary-light'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
            {error && (
              <div className="flex items-center gap-2 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Basic Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 opacity-80">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. AI Cloud Platform"
                  className={`w-full px-3.5 py-2.5 rounded-xl text-sm border outline-none transition-colors ${
                    isDarkMode
                      ? 'bg-bg-primary border-border focus:border-accent text-text-primary'
                      : 'bg-bg-primary-light border-border-light focus:border-accent-light text-text-primary-light'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 opacity-80">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-sm border outline-none transition-colors ${
                    isDarkMode
                      ? 'bg-bg-primary border-border focus:border-accent text-text-primary'
                      : 'bg-bg-primary-light border-border-light focus:border-accent-light text-text-primary-light'
                  }`}
                >
                  <option value="web">Web Application</option>
                  <option value="mobile">Mobile App</option>
                  <option value="ai">AI / ML</option>
                  <option value="api">API / Backend</option>
                  <option value="other">Custom Category</option>
                </select>
              </div>
            </div>

            {formData.category === 'other' && (
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 opacity-80">
                  Custom Category Name
                </label>
                <input
                  type="text"
                  value={formData.customCategory}
                  onChange={(e) => setFormData({ ...formData, customCategory: e.target.value })}
                  placeholder="e.g. Blockchain, IoT, DevOps"
                  className={`w-full px-3.5 py-2.5 rounded-xl text-sm border outline-none transition-colors ${
                    isDarkMode
                      ? 'bg-bg-primary border-border focus:border-accent text-text-primary'
                      : 'bg-bg-primary-light border-border-light focus:border-accent-light text-text-primary-light'
                  }`}
                />
              </div>
            )}

            {/* Tagline & Description */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 opacity-80">
                Short Tagline
              </label>
              <input
                type="text"
                value={formData.shortDescription}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                placeholder="One sentence overview for the card preview"
                className={`w-full px-3.5 py-2.5 rounded-xl text-sm border outline-none transition-colors ${
                  isDarkMode
                    ? 'bg-bg-primary border-border focus:border-accent text-text-primary'
                    : 'bg-bg-primary-light border-border-light focus:border-accent-light text-text-primary-light'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 opacity-80">
                Full Description
              </label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Detailed project summary, challenges solved, architecture details..."
                className={`w-full px-3.5 py-2.5 rounded-xl text-sm border outline-none transition-colors resize-none ${
                  isDarkMode
                    ? 'bg-bg-primary border-border focus:border-accent text-text-primary'
                    : 'bg-bg-primary-light border-border-light focus:border-accent-light text-text-primary-light'
                }`}
              />
            </div>

            {/* Video Walkthrough Settings */}
            <div className={`p-4 rounded-xl border ${
              isDarkMode ? 'bg-bg-primary/50 border-border' : 'bg-bg-primary-light/50 border-border-light'
            }`}>
              <div className="flex items-center gap-2 mb-3">
                <Video className="w-4 h-4 text-accent" />
                <h4 className="text-sm font-bold">Video Walkthrough</h4>
                <span className="text-xs opacity-60 font-normal ml-auto">Optional — leave empty to show "N/A"</span>
              </div>

              {/* Source mode tabs */}
              <div className={`inline-flex items-center gap-1 p-1 rounded-lg mb-3 border ${
                isDarkMode ? 'bg-bg-surface border-border' : 'bg-bg-surface-light border-border-light'
              }`}>
                {[
                  { key: 'existing', label: 'File in /videos', icon: FolderOpen },
                  { key: 'upload', label: 'Upload Video', icon: Upload },
                  { key: 'url', label: 'External URL', icon: Link2 },
                ].map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setVideoMode(key)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                      videoMode === key
                        ? 'bg-accent text-white'
                        : isDarkMode
                          ? 'text-text-secondary hover:text-text-primary'
                          : 'text-text-secondary-light hover:text-text-primary-light'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {label}
                  </button>
                ))}
              </div>

              {videoMode === 'existing' && (
                <div>
                  <label className="block text-xs font-medium mb-1 opacity-80">
                    Pick a file already sitting in <code>public/videos</code>
                  </label>
                  <select
                    value={formData.videoUrl}
                    onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                    className={`w-full px-3.5 py-2 rounded-lg text-sm border outline-none transition-colors ${
                      isDarkMode
                        ? 'bg-bg-surface border-border focus:border-accent text-text-primary'
                        : 'bg-bg-surface-light border-border-light focus:border-accent-light text-text-primary-light'
                    }`}
                  >
                    <option value="">— None (N/A) —</option>
                    {existingVideos.map((v) => (
                      <option key={v.url} value={v.url}>
                        {v.name} {v.size ? `(${formatBytes(v.size)})` : ''}
                      </option>
                    ))}
                  </select>
                  {existingVideos.length === 0 && (
                    <p className="text-xs opacity-60 mt-1.5">
                      No videos found yet — drop a .webm/.mp4/.mov file into <code>public/videos</code> manually, or switch to Upload.
                    </p>
                  )}
                </div>
              )}

              {videoMode === 'upload' && (
                <div>
                  <label className="block text-xs font-medium mb-1 opacity-80">
                    Upload a new .webm, .mp4, or .mov file
                  </label>
                  <input
                    type="file"
                    accept=".webm,.mp4,.mov,video/webm,video/mp4,video/quicktime"
                    disabled={uploading}
                    onChange={(e) => handleUploadFile(e.target.files?.[0])}
                    className={`w-full text-sm file:mr-3 file:px-3 file:py-1.5 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-accent file:text-white ${
                      isDarkMode ? 'text-text-secondary' : 'text-text-secondary-light'
                    }`}
                  />
                  {uploading && (
                    <p className="flex items-center gap-1.5 text-xs text-accent mt-1.5">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" /> Uploading…
                    </p>
                  )}
                  {uploadError && (
                    <p className="text-xs text-red-500 mt-1.5">{uploadError}</p>
                  )}
                  {!uploading && formData.videoUrl && videoMode === 'upload' && (
                    <p className="text-xs text-emerald-500 mt-1.5">Uploaded: {formData.videoUrl}</p>
                  )}
                </div>
              )}

              {videoMode === 'url' && (
                <div>
                  <label className="block text-xs font-medium mb-1 opacity-80">
                    Video URL (YouTube, Vimeo, or direct link)
                  </label>
                  <input
                    type="url"
                    value={formData.videoUrl}
                    onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className={`w-full px-3.5 py-2 rounded-lg text-sm border outline-none transition-colors ${
                      isDarkMode
                        ? 'bg-bg-surface border-border focus:border-accent text-text-primary'
                        : 'bg-bg-surface-light border-border-light focus:border-accent-light text-text-primary-light'
                    }`}
                  />
                </div>
              )}

              <div className="mt-3">
                <label className="block text-xs font-medium mb-1 opacity-80">
                  Duration label (e.g. 8:30, or "Walkthrough")
                </label>
                <input
                  type="text"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="Walkthrough"
                  className={`w-full px-3.5 py-2 rounded-lg text-sm border outline-none transition-colors ${
                    isDarkMode
                      ? 'bg-bg-surface border-border focus:border-accent text-text-primary'
                      : 'bg-bg-surface-light border-border-light focus:border-accent-light text-text-primary-light'
                  }`}
                />
              </div>
            </div>

            {/* Thumbnail Image */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 opacity-80">
                Thumbnail Image URL
              </label>
              <input
                type="url"
                value={formData.thumbnail}
                onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                placeholder="https://images.unsplash.com/..."
                className={`w-full px-3.5 py-2.5 rounded-xl text-sm border outline-none transition-colors mb-2 ${
                  isDarkMode
                    ? 'bg-bg-primary border-border focus:border-accent text-text-primary'
                    : 'bg-bg-primary-light border-border-light focus:border-accent-light text-text-primary-light'
                }`}
              />

              {/* Preset buttons */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
                <span className="opacity-60 flex-shrink-0">Presets:</span>
                {PRESET_THUMBNAILS.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => setFormData({ ...formData, thumbnail: preset.url })}
                    className={`px-2.5 py-1 rounded-md border text-xs whitespace-nowrap transition-colors ${
                      formData.thumbnail === preset.url
                        ? 'border-accent bg-accent/10 text-accent font-medium'
                        : isDarkMode
                          ? 'border-border text-text-secondary hover:border-border-hover'
                          : 'border-border-light text-text-secondary-light hover:border-border-hover-light'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tech Stack Tags */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 opacity-80">
                Tech Stack (Press Enter or Comma to add)
              </label>
              <div className={`p-2 rounded-xl border flex flex-wrap items-center gap-2 min-h-[46px] ${
                isDarkMode ? 'bg-bg-primary border-border' : 'bg-bg-primary-light border-border-light'
              }`}>
                {formData.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-accent/15 text-accent border border-accent/30"
                  >
                    {tech}
                    <button
                      type="button"
                      onClick={() => handleRemoveTech(tech)}
                      className="hover:text-red-400 ml-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyDown={handleAddTech}
                  placeholder={formData.techStack.length === 0 ? "Type tech and hit Enter..." : "Add more..."}
                  className="flex-1 min-w-[120px] bg-transparent outline-none text-xs px-1"
                />
              </div>
            </div>

            {/* Links & Featured */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 opacity-80">
                  GitHub URL (Optional)
                </label>
                <input
                  type="url"
                  value={formData.github}
                  onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  placeholder="https://github.com/..."
                  className={`w-full px-3.5 py-2.5 rounded-xl text-sm border outline-none transition-colors ${
                    isDarkMode
                      ? 'bg-bg-primary border-border focus:border-accent text-text-primary'
                      : 'bg-bg-primary-light border-border-light focus:border-accent-light text-text-primary-light'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 opacity-80">
                  Live Demo URL (Optional)
                </label>
                <input
                  type="url"
                  value={formData.live}
                  onChange={(e) => setFormData({ ...formData, live: e.target.value })}
                  placeholder="https://myproject.com"
                  className={`w-full px-3.5 py-2.5 rounded-xl text-sm border outline-none transition-colors ${
                    isDarkMode
                      ? 'bg-bg-primary border-border focus:border-accent text-text-primary'
                      : 'bg-bg-primary-light border-border-light focus:border-accent-light text-text-primary-light'
                  }`}
                />
              </div>
            </div>

            {/* Featured toggle */}
            <label className="flex items-center gap-3 cursor-pointer pt-2">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-4 h-4 rounded text-accent focus:ring-accent accent-accent"
              />
              <span className="text-sm font-medium">Mark as Featured Walkthrough</span>
            </label>

            {/* Footer Buttons */}
            <div className={`flex items-center justify-end gap-3 pt-4 border-t ${
              isDarkMode ? 'border-border' : 'border-border-light'
            }`}>
              <button
                type="button"
                onClick={closeModal}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium border transition-colors ${
                  isDarkMode
                    ? 'border-border text-text-secondary hover:text-text-primary hover:border-border-hover'
                    : 'border-border-light text-text-secondary-light hover:text-text-primary-light hover:border-border-hover-light'
                }`}
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={submitting || uploading}
                className="flex items-center gap-2 px-6 py-2.5 bg-accent hover:bg-accent-hover disabled:opacity-60 text-white text-sm font-medium rounded-xl transition-all hover:scale-105 shadow-lg shadow-accent/25"
              >
                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                {submitting ? 'Saving…' : editingProject ? 'Save Changes' : 'Publish Walkthrough'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
