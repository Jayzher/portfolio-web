import { Moon, Sun } from 'lucide-react'
import { motion } from 'framer-motion'
import useProjectStore from '../../store/projectStore'

export default function ThemeToggle() {
  const isDarkMode = useProjectStore((s) => s.isDarkMode)
  const toggleDarkMode = useProjectStore((s) => s.toggleDarkMode)

  return (
    <button
      onClick={toggleDarkMode}
      className={`relative p-2 rounded-lg transition-colors ${
        isDarkMode
          ? 'text-text-secondary hover:text-text-primary hover:bg-bg-surface'
          : 'text-text-secondary-light hover:text-text-primary-light hover:bg-bg-surface-hover-light'
      }`}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <motion.div
        key={isDarkMode ? 'moon' : 'sun'}
        initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.3 }}
      >
        {isDarkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
      </motion.div>
    </button>
  )
}
