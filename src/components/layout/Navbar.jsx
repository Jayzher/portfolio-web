import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, CodeXml, Plus, Lock, LogOut } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import useProjectStore from '../../store/projectStore'
import { portfolioData } from '../../data/portfolioData'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Reviews', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const isDarkMode = useProjectStore((s) => s.isDarkMode)
  const openAddModal = useProjectStore((s) => s.openAddModal)
  const openLoginModal = useProjectStore((s) => s.openLoginModal)
  const isAdmin = useProjectStore((s) => s.isAdmin)
  const logout = useProjectStore((s) => s.logout)

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-xl transition-colors ${
      isDarkMode
        ? 'bg-bg-primary/85 border-border'
        : 'bg-bg-primary-light/85 border-border-light'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center text-white shadow-md shadow-accent/30 transition-transform group-hover:scale-105">
              <CodeXml className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className={`text-base font-extrabold tracking-tight leading-none ${
                isDarkMode ? 'text-text-primary' : 'text-text-primary-light'
              }`}>
                {portfolioData.profile.preferredName} {portfolioData.profile.name.split(' ').slice(-1)[0]}
              </span>
              <span className="text-[10px] text-accent font-medium tracking-wide">
                {portfolioData.profile.role}
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-xs font-semibold uppercase tracking-wider transition-colors hover:text-accent ${
                  isDarkMode ? 'text-text-secondary' : 'text-text-secondary-light'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            {isAdmin ? (
              <>
                {/* Add Project CTA */}
                <button
                  onClick={openAddModal}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-accent hover:bg-accent-hover text-white shadow-md shadow-accent/25 transition-all hover:scale-105 active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                  Add Walkthrough
                </button>
                <button
                  onClick={logout}
                  title="Log out of admin"
                  className={`flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg border transition-colors ${
                    isDarkMode
                      ? 'border-border text-text-secondary hover:text-text-primary hover:border-border-hover'
                      : 'border-border-light text-text-secondary-light hover:text-text-primary-light hover:border-border-hover-light'
                  }`}
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </>
            ) : (
              <button
                onClick={openLoginModal}
                title="Admin login"
                className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors ${
                  isDarkMode
                    ? 'border-border text-text-secondary hover:text-text-primary hover:border-border-hover'
                    : 'border-border-light text-text-secondary-light hover:text-text-primary-light hover:border-border-hover-light'
                }`}
              >
                <Lock className="w-3.5 h-3.5" />
                Admin Login
              </button>
            )}

            <ThemeToggle />
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 lg:hidden">
            {isAdmin ? (
              <button
                onClick={openAddModal}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-accent text-white"
              >
                <Plus className="w-3.5 h-3.5" />
                Add
              </button>
            ) : (
              <button
                onClick={openLoginModal}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                  isDarkMode ? 'border-border text-text-secondary' : 'border-border-light text-text-secondary-light'
                }`}
              >
                <Lock className="w-3.5 h-3.5" />
                Admin
              </button>
            )}
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode
                  ? 'text-text-secondary hover:bg-bg-surface'
                  : 'text-text-secondary-light hover:bg-bg-surface-light'
              }`}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className={`lg:hidden border-t overflow-hidden ${
              isDarkMode
                ? 'bg-bg-primary/95 border-border'
                : 'bg-bg-primary-light/95 border-border-light'
            }`}
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block text-sm font-medium py-2 transition-colors hover:text-accent ${
                    isDarkMode ? 'text-text-secondary' : 'text-text-secondary-light'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              {isAdmin && (
                <div className="pt-2 border-t border-border/50">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileOpen(false)
                      logout()
                    }}
                    className={`w-full flex items-center justify-start gap-2 text-sm font-medium py-2 transition-colors ${
                      isDarkMode ? 'text-text-secondary' : 'text-text-secondary-light'
                    }`}
                  >
                    <LogOut className="w-4 h-4" />
                    Log Out of Admin
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
