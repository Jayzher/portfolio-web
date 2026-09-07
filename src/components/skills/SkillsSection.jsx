import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, Layout, Database } from 'lucide-react'
import { portfolioData } from '../../data/portfolioData'
import useProjectStore from '../../store/projectStore'

const categories = [
  { id: 'languagesAndBackend', label: 'Languages & Backend', icon: Terminal },
  { id: 'frontendAndDesign', label: 'Frontend & UI', icon: Layout },
  { id: 'databasesAndTools', label: 'Databases, Tools & AI', icon: Database },
]

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState('languagesAndBackend')
  const isDarkMode = useProjectStore((s) => s.isDarkMode)
  const skills = portfolioData.skills

  const currentSkills = skills[activeTab] || []

  return (
    <section id="skills" className="py-20 border-t border-border/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-accent mb-2 block">
            Technical Stack
          </span>
          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
            isDarkMode ? 'text-text-primary' : 'text-text-primary-light'
          }`}>
            Technical Skills & Tooling
          </h2>
          <p className={`mt-2 text-sm sm:text-base ${
            isDarkMode ? 'text-text-secondary' : 'text-text-secondary-light'
          }`}>
            Core proficiencies across Python, Django, React.js, relational databases, and AI-assisted workflows
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-10 overflow-x-auto pb-2">
          {categories.map((cat) => {
            const Icon = cat.icon
            const isActive = activeTab === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  isActive
                    ? 'text-white'
                    : isDarkMode
                      ? 'text-text-secondary hover:text-text-primary bg-bg-surface hover:bg-bg-surface-hover'
                      : 'text-text-secondary-light hover:text-text-primary-light bg-bg-surface-light hover:bg-bg-surface-hover-light'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeSkillTab"
                    className="absolute inset-0 bg-accent rounded-xl shadow-md shadow-accent/30"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  {cat.label}
                </span>
              </button>
            )
          })}
        </div>

        {/* Skills Grid */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {currentSkills.map((skill, idx) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className={`p-5 rounded-2xl border transition-all hover:scale-[1.02] ${
                isDarkMode
                  ? 'bg-bg-surface border-border hover:border-accent/40'
                  : 'bg-bg-surface-light border-border-light hover:border-accent/40 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: skill.color || '#3b82f6' }}
                  />
                  <span className="font-bold text-sm">{skill.name}</span>
                </div>
                <span className="text-xs font-mono font-semibold opacity-75">
                  {skill.level}%
                </span>
              </div>

              {/* Progress bar */}
              <div className={`w-full h-2 rounded-full overflow-hidden ${
                isDarkMode ? 'bg-bg-primary' : 'bg-gray-200'
              }`}>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: 'easeOut', delay: idx * 0.05 }}
                  className="h-full rounded-full"
                  style={{
                    backgroundColor: skill.color || '#3b82f6',
                  }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
