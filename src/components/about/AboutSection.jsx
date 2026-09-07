import { motion } from 'framer-motion'
import { CodeXml, Sparkles, Smartphone, Zap, CheckCircle2, ArrowRight, GraduationCap, Award } from 'lucide-react'
import { portfolioData } from '../../data/portfolioData'
import useProjectStore from '../../store/projectStore'

const iconMap = {
  CodeXml: CodeXml,
  Sparkles: Sparkles,
  Smartphone: Smartphone,
  Zap: Zap,
}

export default function AboutSection() {
  const isDarkMode = useProjectStore((s) => s.isDarkMode)
  const { profile, stats, services, education } = portfolioData

  return (
    <section id="about" className="py-20 border-t border-border/50 relative overflow-hidden">
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
            Professional Profile
          </span>
          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
            isDarkMode ? 'text-text-primary' : 'text-text-primary-light'
          }`}>
            Engineering Solutions with Python, Django & React
          </h2>
          <p className={`mt-3 text-base leading-relaxed ${
            isDarkMode ? 'text-text-secondary' : 'text-text-secondary-light'
          }`}>
            {profile.tagline}
          </p>
        </motion.div>

        {/* Narrative & Stats Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-stretch">
          
          {/* Left Bio Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`lg:col-span-7 p-8 rounded-3xl border flex flex-col justify-between ${
              isDarkMode
                ? 'bg-bg-surface border-border'
                : 'bg-bg-surface-light border-border-light shadow-sm'
            }`}
          >
            <div>
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={profile.Profile}
                  alt={profile.name}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-accent/40 shadow-md"
                />
                <div>
                  <h3 className="text-xl font-bold">{profile.name}</h3>
                  <p className={`text-xs ${isDarkMode ? 'text-text-secondary' : 'text-text-secondary-light'}`}>
                    {profile.role} • {profile.location}
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-sm sm:text-base leading-relaxed opacity-90">
                {profile.bio.map((para, idx) => (
                  <p key={idx} className={isDarkMode ? 'text-text-secondary' : 'text-text-secondary-light'}>
                    {para}
                  </p>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border/50 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-semibold text-emerald-500">
                  {profile.availability}
                </span>
              </div>

              <a
                href="#contact"
                className="inline-flex items-center gap-1 text-xs font-bold text-accent hover:underline"
              >
                Contact Jayzher <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>

          {/* Right Stats & Education Grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 flex flex-col justify-between gap-4"
          >
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className={`p-5 rounded-2xl border flex flex-col justify-center text-center transition-all hover:scale-[1.02] ${
                    isDarkMode
                      ? 'bg-bg-surface border-border hover:border-accent/40'
                      : 'bg-bg-surface-light border-border-light hover:border-accent/40 shadow-sm'
                  }`}
                >
                  <span className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-500">
                    {stat.value}
                  </span>
                  <span className={`text-xs font-bold mt-1.5 ${
                    isDarkMode ? 'text-text-primary' : 'text-text-primary-light'
                  }`}>
                    {stat.label}
                  </span>
                  <span className={`text-[10px] mt-0.5 ${
                    isDarkMode ? 'text-text-secondary' : 'text-text-secondary-light'
                  }`}>
                    {stat.change}
                  </span>
                </div>
              ))}
            </div>

            {/* Education Summary Card */}
            <div className={`p-6 rounded-3xl border ${
              isDarkMode ? 'bg-bg-surface border-border' : 'bg-bg-surface-light border-border-light shadow-sm'
            }`}>
              <div className="flex items-center gap-2 mb-3">
                <GraduationCap className="w-4 h-4 text-accent" />
                <h4 className="text-xs font-bold uppercase tracking-wider">Education & Certification</h4>
              </div>

              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.degree} className="text-left border-l-2 border-accent/40 pl-3">
                    <p className="text-xs font-bold text-accent">{edu.degree}</p>
                    <p className={`text-xs font-medium ${isDarkMode ? 'text-text-primary' : 'text-text-primary-light'}`}>
                      {edu.institution} <span className="opacity-50">• {edu.period}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>

        </div>

        {/* Services & Capabilities */}
        <div>
          <h3 className={`text-xl font-bold mb-6 text-center lg:text-left ${
            isDarkMode ? 'text-text-primary' : 'text-text-primary-light'
          }`}>
            Core Engineering Capabilities
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, idx) => {
              const IconComponent = iconMap[service.icon] || CodeXml
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className={`p-6 rounded-2xl border flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] ${
                    isDarkMode
                      ? 'bg-bg-surface border-border hover:border-accent/50 hover:shadow-xl hover:shadow-accent/5'
                      : 'bg-bg-surface-light border-border-light hover:border-accent/50 hover:shadow-xl hover:shadow-black/5'
                  }`}
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-4">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h4 className="text-base font-bold mb-2">
                      {service.title}
                    </h4>
                    <p className={`text-xs leading-relaxed mb-4 ${
                      isDarkMode ? 'text-text-secondary' : 'text-text-secondary-light'
                    }`}>
                      {service.description}
                    </p>
                  </div>

                  <ul className="space-y-1.5 pt-3 border-t border-border/40">
                    {service.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-1.5 text-[11px] opacity-80">
                        <CheckCircle2 className="w-3 h-3 text-accent flex-shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}
