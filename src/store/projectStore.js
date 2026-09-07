import { create } from 'zustand'
import initialProjects from '../data/projects.json'

async function parseError(res, fallback) {
  try {
    const data = await res.json()
    return data.error || fallback
  } catch {
    return fallback
  }
}

const useProjectStore = create((set, get) => ({
  projects: initialProjects,
  searchQuery: '',
  activeCategory: 'all',
  isDarkMode: true,
  isAddModalOpen: false,
  editingProject: null,
  isLoginModalOpen: false,

  isAdmin: false,
  authChecked: false,

  // Modal controls
  openAddModal: () => set({ isAddModalOpen: true, editingProject: null }),
  openEditModal: (project) => set({ isAddModalOpen: true, editingProject: project }),
  closeAddModal: () => set({ isAddModalOpen: false, editingProject: null }),
  openLoginModal: () => set({ isLoginModalOpen: true }),
  closeLoginModal: () => set({ isLoginModalOpen: false }),

  // Auth
  checkAuth: async () => {
    try {
      const res = await fetch('/api/auth/me', { credentials: 'include' })
      const data = await res.json()
      set({ isAdmin: !!data.authenticated, authChecked: true })
    } catch {
      set({ isAdmin: false, authChecked: true })
    }
  },

  login: async (password) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ password }),
    })
    if (!res.ok) {
      throw new Error(await parseError(res, 'Login failed. Is the admin server running?'))
    }
    set({ isAdmin: true, isLoginModalOpen: false })
  },

  logout: async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' })
    } catch {
      // ignore network errors on logout
    }
    set({ isAdmin: false })
  },

  // Fetch live data from the local admin server (falls back to the bundled
  // projects.json snapshot when the server isn't running, e.g. in production)
  fetchProjects: async () => {
    try {
      const res = await fetch('/api/projects', { credentials: 'include' })
      if (!res.ok) return
      const projects = await res.json()
      set({ projects })
    } catch {
      // no admin server reachable — keep the bundled snapshot
    }
  },

  // Project CRUD — all persisted to disk via the local admin server
  addProject: async (project) => {
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(project),
    })
    if (!res.ok) {
      throw new Error(await parseError(res, 'Failed to add project.'))
    }
    const projects = await res.json()
    set({ projects, isAddModalOpen: false, editingProject: null })
  },

  updateProject: async (id, updates) => {
    const res = await fetch(`/api/projects/${encodeURIComponent(id)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(updates),
    })
    if (!res.ok) {
      throw new Error(await parseError(res, 'Failed to update project.'))
    }
    const projects = await res.json()
    set({ projects, isAddModalOpen: false, editingProject: null })
  },

  deleteProject: async (id) => {
    const res = await fetch(`/api/projects/${encodeURIComponent(id)}`, {
      method: 'DELETE',
      credentials: 'include',
    })
    if (!res.ok) {
      throw new Error(await parseError(res, 'Failed to delete project.'))
    }
    const projects = await res.json()
    set({ projects })
  },

  // Filters
  setSearchQuery: (query) => set({ searchQuery: query }),
  setActiveCategory: (category) => set({ activeCategory: category }),

  // Theme
  toggleDarkMode: () => {
    const isDarkMode = !get().isDarkMode
    if (isDarkMode) {
      document.body.classList.remove('light')
    } else {
      document.body.classList.add('light')
    }
    localStorage.setItem('portfolio-theme', isDarkMode ? 'dark' : 'light')
    set({ isDarkMode })
  },

  initTheme: () => {
    const saved = localStorage.getItem('portfolio-theme')
    const isDarkMode = saved !== 'light'
    if (!isDarkMode) {
      document.body.classList.add('light')
    }
    set({ isDarkMode })
  },
}))

export default useProjectStore
