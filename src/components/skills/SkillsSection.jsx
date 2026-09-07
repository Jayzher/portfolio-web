import { motion } from 'framer-motion'
import { Terminal, Layout, Database, Cpu, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react'
import { portfolioData } from '../../data/portfolioData'
import useProjectStore from '../../store/projectStore'

export default function SkillsSection() {
  const isDarkMode = useProjectStore((s) => s.isDarkMode)
  const categories = portfolioData.skillsCategorized || []

  const categoryIcons = {
    "Backend": Terminal,
    "Frontend": Layout,
    "Database & Storage": Database,
    "Software Engineering & Infrastructure": Cpu,
  }

  return (
    <section id="skills" className="py-20 border-t border-border/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-accent mb-2 block">
            Engineering & Stack Proficiencies
          </span>
          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
            isDarkMode ? 'text-text-primary' : 'text-text-primary-light'
          }`}>
            Categorized Technical Stack & Competencies
          </h2>
          <p className={`mt-2 text-sm sm:text-base ${
            isDarkMode ? 'text-text-secondary' : 'text-text-secondary-light'
          }`}>
            Cleanly structured software engineering stack across backend architectures, frontend systems, relational data design, and deployment operations.
          </p>
        </motion.div>

        {/* Categorized Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((cat, idx) => {
            const Icon = categoryIcons[cat.category] || Cpu
            return (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className={`p-6 sm:p-8 rounded-3xl border transition-all hover:scale-[1.01] ${
                  isDarkMode
                    ? 'bg-bg-surface border-border hover:border-accent/40 shadow-lg'
                    : 'bg-white border-border-light hover:border-accent/40 shadow-md'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-text-primary">
                      {cat.category}
                    </h3>
                    <p className={`text-xs ${isDarkMode ? 'text-text-secondary' : 'text-text-secondary-light'}`}>
                      {cat.description}
                    </p>
                  </div>
                </div>

                {/* Technology Pills & Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-4 border-t border-border/50">
                  {cat.items.map((item) => (
                    <div
                      key={item.name}
                      className={`p-2.5 rounded-xl border flex items-center justify-between gap-2 text-xs transition-colors ${
                        isDarkMode
                          ? 'bg-bg-primary border-border/60 text-text-primary hover:border-accent/30'
                          : 'bg-bg-primary-light border-border-light text-text-primary-light hover:border-accent/30'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                        <span className="font-semibold">{item.name}</span>
                      </div>
                      <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-accent/10 text-accent border border-accent/20">
                        {item.tag}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* AI Acceleration Callout */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`mt-12 p-6 sm:p-8 rounded-3xl border text-center max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-4 ${
            isDarkMode
              ? 'bg-gradient-to-r from-bg-surface via-purple-950/20 to-bg-surface border-purple-500/30'
              : 'bg-gradient-to-r from-purple-50 via-white to-blue-50 border-purple-200 shadow-sm'
          }`}
        >
          <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 flex-shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="text-left space-y-1">
            <h4 className="text-base font-bold text-text-primary">
              AI-Accelerated Software Development Workflows
            </h4>
            <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-text-secondary' : 'text-text-secondary-light'}`}>
              Actively leveraging GitHub Copilot, Claude, Gemini, Windsurf, and Codex for automated unit testing, root-cause debugging, architecture prototyping, and rapid feature delivery.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
