import { useMemo } from 'react'
import { Search, X } from 'lucide-react'
import { motion } from 'framer-motion'
import useProjectStore from '../../store/projectStore'

const categoryLabels = {
  all: 'All',
  web: 'Web',
  mobile: 'Mobile',
  api: 'API',
  ai: 'AI / ML',
}

export default function FilterBar() {
  const isDarkMode = useProjectStore((s) => s.isDarkMode)
  const activeCategory = useProjectStore((s) => s.activeCategory)
  const setActiveCategory = useProjectStore((s) => s.setActiveCategory)
  const searchQuery = useProjectStore((s) => s.searchQuery)
  const setSearchQuery = useProjectStore((s) => s.setSearchQuery)
  const projects = useProjectStore((s) => s.projects)

  const categories = useMemo(() => {
    const cats = new Set(projects.map((p) => p.category))
    return ['all', ...Array.from(cats)]
  }, [projects])

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto scrollbar-none">
        {categories.map((cat) => {
          const isActive = activeCategory === cat
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                isActive
                  ? 'text-white'
                  : isDarkMode
                    ? 'text-text-secondary hover:text-text-primary hover:bg-bg-surface-hover'
                    : 'text-text-secondary-light hover:text-text-primary-light hover:bg-bg-surface-hover-light'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-accent rounded-lg"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                />
              )}
              <span className="relative z-10">
                {categoryLabels[cat] || cat.charAt(0).toUpperCase() + cat.slice(1)}
              </span>
            </button>
          )
        })}
      </div>

      {/* Search */}
      <div className={`relative w-full sm:w-64 ${
        isDarkMode ? 'text-text-secondary' : 'text-text-secondary-light'
      }`}>
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search projects..."
          className={`w-full pl-10 pr-10 py-2.5 rounded-lg text-sm border outline-none transition-colors ${
            isDarkMode
              ? 'bg-bg-surface border-border text-text-primary placeholder:text-text-secondary focus:border-accent'
              : 'bg-bg-surface-light border-border-light text-text-primary-light placeholder:text-text-secondary-light focus:border-accent-light'
          }`}
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 hover:text-accent"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}
