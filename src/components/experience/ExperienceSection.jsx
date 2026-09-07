import { motion } from 'framer-motion'
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react'
import { portfolioData } from '../../data/portfolioData'
import useProjectStore from '../../store/projectStore'

export default function ExperienceSection() {
  const isDarkMode = useProjectStore((s) => s.isDarkMode)
  const experience = portfolioData.experience

  return (
    <section id="experience" className="py-20 border-t border-border/50 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-accent mb-2 block">
            Work Experience
          </span>
          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
            isDarkMode ? 'text-text-primary' : 'text-text-primary-light'
          }`}>
            Professional Experience & Internships
          </h2>
          <p className={`mt-2 text-sm sm:text-base ${
            isDarkMode ? 'text-text-secondary' : 'text-text-secondary-light'
          }`}>
            Proven engineering experience building educational platforms, CMS, RMS, and government service systems
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative border-l-2 border-accent/30 pl-6 sm:pl-8 ml-4 sm:ml-8 space-y-12">
          {experience.map((item, idx) => (
            <motion.div
              key={item.period}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative"
            >
              {/* Timeline Bullet */}
              <div className="absolute -left-[33px] sm:-left-[41px] top-1 w-5 h-5 rounded-full bg-accent border-4 border-bg-primary flex items-center justify-center shadow-md shadow-accent/40" />

              {/* Experience Card */}
              <div className={`p-6 sm:p-8 rounded-3xl border transition-all hover:scale-[1.01] ${
                isDarkMode
                  ? 'bg-bg-surface border-border hover:border-accent/40'
                  : 'bg-bg-surface-light border-border-light hover:border-accent/40 shadow-sm'
              }`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-accent block mb-1">
                      {item.type}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-accent">
                      {item.role} – {item.company}
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5 text-xs font-semibold">
                      <span className={`flex items-center gap-1 font-normal ${
                        isDarkMode ? 'text-text-secondary' : 'text-text-secondary-light'
                      }`}>
                        <MapPin className="w-3 h-3 text-accent" /> {item.location}
                      </span>
                    </div>
                  </div>

                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold self-start sm:self-auto border ${
                    isDarkMode
                      ? 'bg-bg-primary border-border text-text-secondary'
                      : 'bg-bg-primary-light border-border-light text-text-secondary-light'
                  }`}>
                    <Calendar className="w-3 h-3 text-accent" />
                    {item.period}
                  </span>
                </div>

                <p className={`text-sm leading-relaxed mb-4 ${
                  isDarkMode ? 'text-text-secondary' : 'text-text-secondary-light'
                }`}>
                  {item.description}
                </p>

                {/* Achievements list */}
                {item.achievements && (
                  <div className="space-y-2 mb-5">
                    {item.achievements.map((ach, aIdx) => (
                      <div key={aIdx} className="flex items-start gap-2 text-xs leading-relaxed">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent mt-0.5 flex-shrink-0" />
                        <span className={isDarkMode ? 'text-text-secondary' : 'text-text-secondary-light'}>
                          {ach}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border/50">
                  {item.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`px-2.5 py-0.5 rounded-lg text-xs font-medium ${
                        isDarkMode
                          ? 'bg-bg-primary text-text-secondary'
                          : 'bg-bg-primary-light text-text-secondary-light'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
