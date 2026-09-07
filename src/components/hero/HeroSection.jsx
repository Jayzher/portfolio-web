import { motion } from 'framer-motion'
import { ArrowDown, Play, Sparkles, Plus, FileText, CodeXml, Briefcase, Mail, Phone, MapPin } from 'lucide-react'
import { portfolioData } from '../../data/portfolioData'
import useProjectStore from '../../store/projectStore'

export default function HeroSection() {
  const isDarkMode = useProjectStore((s) => s.isDarkMode)
  const projects = useProjectStore((s) => s.projects)
  const openAddModal = useProjectStore((s) => s.openAddModal)
  const isAdmin = useProjectStore((s) => s.isAdmin)
  const { profile } = portfolioData

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-10 pb-16">
      {/* Animated background gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-40 -right-40 w-[30rem] h-[30rem] rounded-full blur-3xl opacity-25 animate-pulse ${
          isDarkMode ? 'bg-accent' : 'bg-accent-light'
        }`} />
        <div className={`absolute -bottom-40 -left-40 w-[30rem] h-[30rem] rounded-full blur-3xl opacity-15 animate-pulse ${
          isDarkMode ? 'bg-purple-600' : 'bg-purple-400'
        }`} style={{ animationDelay: '2s' }} />
        {/* Grid pattern overlay */}
        <div className={`absolute inset-0 opacity-[0.035] ${
          isDarkMode ? 'bg-white' : 'bg-black'
        }`}
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Profile Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative inline-block mb-6"
        >
          <div className="relative">
            <img
              src={profile.Profile}
              alt={profile.name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-accent/40 shadow-xl shadow-accent/20 mx-auto"
            />
            <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-bg-primary flex items-center justify-center" title="Available for hire">
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
            </span>
          </div>
        </motion.div>

        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center justify-center gap-2 mb-4"
        >
          <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold border shadow-sm ${
            isDarkMode
              ? 'bg-bg-surface border-border text-emerald-400 shadow-emerald-500/5'
              : 'bg-bg-surface-light border-border-light text-emerald-600 shadow-black/5'
          }`}>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{profile.availability}</span>
            <span className="opacity-40">•</span>
            <span className="text-accent font-bold">{projects.length} Walkthroughs</span>
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className={`text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1] ${
            isDarkMode ? 'text-text-primary' : 'text-text-primary-light'
          }`}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">
            {profile.name}
          </span>
          <br />
          <span className="text-2xl sm:text-3xl md:text-4xl font-bold opacity-90 block mt-2 text-text-secondary">
            {profile.role}
          </span>
        </motion.h1>

        {/* Subtitle / Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`mt-4 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed ${
            isDarkMode ? 'text-text-secondary' : 'text-text-secondary-light'
          }`}
        >
          {profile.tagline}
        </motion.p>

        {/* Quick Contact & Location Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs"
        >
          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border ${
            isDarkMode ? 'border-border text-text-secondary' : 'border-border-light text-text-secondary-light'
          }`}>
            <MapPin className="w-3.5 h-3.5 text-accent" /> {profile.location}
          </span>
          <a
            href={`tel:${profile.phone.replace(/\s/g, '')}`}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors ${
              isDarkMode ? 'border-border text-text-secondary hover:text-accent' : 'border-border-light text-text-secondary-light hover:text-accent-light'
            }`}
          >
            <Phone className="w-3.5 h-3.5 text-emerald-400" /> {profile.phone}
          </a>
          <a
            href={`mailto:${profile.email}`}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors ${
              isDarkMode ? 'border-border text-text-secondary hover:text-accent' : 'border-border-light text-text-secondary-light hover:text-accent-light'
            }`}
          >
            <Mail className="w-3.5 h-3.5 text-accent" /> {profile.email}
          </a>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5"
        >
          <a
            href="#projects"
            className="w-full sm:w-auto group flex items-center justify-center gap-2 px-7 py-3.5 bg-accent hover:bg-accent-hover text-white font-semibold rounded-xl transition-all hover:scale-105 shadow-xl shadow-accent/25"
          >
            <Play className="w-4 h-4 fill-white" />
            Watch Project Walkthroughs
          </a>
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 font-semibold rounded-xl transition-all border hover:scale-105 ${
              isDarkMode
                ? 'border-border text-text-primary bg-bg-surface hover:bg-bg-surface-hover hover:border-border-hover'
                : 'border-border-light text-text-primary-light bg-bg-surface-light hover:bg-bg-surface-hover-light hover:border-border-hover-light'
            }`}
          >
            <FileText className="w-4 h-4 text-accent" />
            View Resume
          </a>
          {isAdmin && (
            <button
              type="button"
              onClick={openAddModal}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3.5 text-xs font-semibold rounded-xl transition-all border ${
                isDarkMode
                  ? 'border-border text-text-secondary hover:text-text-primary'
                  : 'border-border-light text-text-secondary-light hover:text-text-primary-light'
              }`}
            >
              <Plus className="w-4 h-4 text-accent" />
              Add Walkthrough
            </button>
          )}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-14"
        >
          <a
            href="#about"
            className={`inline-flex flex-col items-center gap-1.5 text-xs font-medium transition-colors hover:text-accent ${
              isDarkMode ? 'text-text-secondary' : 'text-text-secondary-light'
            }`}
          >
            <span>Explore Experience & Skills</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
            >
              <ArrowDown className="w-4 h-4" />
            </motion.div>
          </a>
        </motion.div>

      </div>
    </section>
  )
}
