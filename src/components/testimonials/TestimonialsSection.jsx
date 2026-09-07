import { motion } from 'framer-motion'
import { Star, Quote, UserRound } from 'lucide-react'
import { portfolioData } from '../../data/portfolioData'
import useProjectStore from '../../store/projectStore'

export default function TestimonialsSection() {
  const isDarkMode = useProjectStore((s) => s.isDarkMode)
  const testimonials = portfolioData.testimonials

  return (
    <section id="testimonials" className="py-20 border-t border-border/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-accent mb-2 block">
            Endorsements
          </span>
          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
            isDarkMode ? 'text-text-primary' : 'text-text-primary-light'
          }`}>
            What Collaborators Say
          </h2>
          <p className={`mt-2 text-sm sm:text-base ${
            isDarkMode ? 'text-text-secondary' : 'text-text-secondary-light'
          }`}>
            Feedback from engineering leaders, product managers, and founders
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className={`p-7 rounded-3xl border flex flex-col justify-between relative overflow-hidden transition-all hover:scale-[1.02] ${
                isDarkMode
                  ? 'bg-bg-surface border-border hover:border-accent/40'
                  : 'bg-bg-surface-light border-border-light hover:border-accent/40 shadow-sm'
              }`}
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 opacity-10 text-accent pointer-events-none" />

              <div>
                {/* Rating stars */}
                <div className="flex items-center gap-1 mb-4 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className={`text-sm leading-relaxed mb-6 italic ${
                  isDarkMode ? 'text-text-secondary' : 'text-text-secondary-light'
                }`}>
                  "{t.text}"
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                <div className={`w-11 h-11 rounded-full border-2 border-accent/40 flex items-center justify-center flex-shrink-0 ${
                  isDarkMode ? 'bg-bg-primary text-text-secondary' : 'bg-bg-primary-light text-text-secondary-light'
                }`}>
                  <UserRound className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold">{t.name}</h4>
                  <p className={`text-xs ${isDarkMode ? 'text-text-secondary' : 'text-text-secondary-light'}`}>
                    {t.role} • {t.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
