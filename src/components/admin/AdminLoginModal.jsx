import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Lock, Check, AlertCircle } from 'lucide-react'
import useProjectStore from '../../store/projectStore'

export default function AdminLoginModal() {
  const isOpen = useProjectStore((s) => s.isLoginModalOpen)
  const closeModal = useProjectStore((s) => s.closeLoginModal)
  const login = useProjectStore((s) => s.login)
  const isDarkMode = useProjectStore((s) => s.isDarkMode)

  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (!isOpen) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await login(password)
      setPassword('')
    } catch (err) {
      setError(err.message || 'Login failed.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleClose = () => {
    setPassword('')
    setError('')
    closeModal()
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
          onClick={handleClose}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
          className={`relative w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl border ${
            isDarkMode
              ? 'bg-bg-surface border-border text-text-primary'
              : 'bg-bg-surface-light border-border-light text-text-primary-light'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={`flex items-center justify-between px-6 py-5 border-b ${
            isDarkMode ? 'border-border' : 'border-border-light'
          }`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold">Admin Login</h3>
            </div>
            <button
              onClick={handleClose}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode
                  ? 'hover:bg-bg-surface-hover text-text-secondary hover:text-text-primary'
                  : 'hover:bg-bg-surface-hover-light text-text-secondary-light hover:text-text-primary-light'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 opacity-80">
                Password
              </label>
              <input
                type="password"
                autoFocus
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full px-3.5 py-2.5 rounded-xl text-sm border outline-none transition-colors ${
                  isDarkMode
                    ? 'bg-bg-primary border-border focus:border-accent text-text-primary'
                    : 'bg-bg-primary-light border-border-light focus:border-accent-light text-text-primary-light'
                }`}
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 py-3 bg-accent hover:bg-accent-hover disabled:opacity-60 text-white text-sm font-semibold rounded-xl transition-all"
            >
              <Check className="w-4 h-4" />
              {submitting ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
