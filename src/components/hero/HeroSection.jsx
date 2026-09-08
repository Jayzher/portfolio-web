import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Play, Plus, FileText, Mail, Phone, MapPin, Globe, Clock, Briefcase, CodeXml } from 'lucide-react'
import { portfolioData } from '../../data/portfolioData'
import useProjectStore from '../../store/projectStore'
import ResumeModal from '../resume/ResumeModal'

export default function HeroSection() {
  const [isResumeOpen, setIsResumeOpen] = useState(false)
  const isDarkMode = useProjectStore((s) => s.isDarkMode)
  const projects = useProjectStore((s) => s.projects)
  const openAddModal = useProjectStore((s) => s.openAddModal)
  const isAdmin = useProjectStore((s) => s.isAdmin)
  const { profile, remoteStatus } = portfolioData

  const techBadges = ["Python", "Django", "React", "TypeScript", "PostgreSQL", "REST APIs", "Docker"]

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

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Profile Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative inline-block mb-6"
        >
          <div className="relative">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-accent/40 shadow-xl shadow-accent/20 mx-auto"
            />
            <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-bg-primary flex items-center justify-center" title="Available for remote hire">
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
            </span>
          </div>
        </motion.div>

        {/* Remote Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center justify-center gap-2 mb-5"
        >
          <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold border shadow-sm ${
            isDarkMode
              ? 'bg-bg-surface border-emerald-500/30 text-emerald-400 shadow-emerald-500/5'
              : 'bg-emerald-50 border-emerald-200 text-emerald-700 shadow-black/5'
          }`}>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{remoteStatus.badge}</span>
            <span className="opacity-40">•</span>
            <span className="text-accent font-bold">{projects.length} Engineering Case Studies</span>
          </span>
        </motion.div>

        {/* Main Heading & Strong Position */}
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
          <span className="text-2xl sm:text-3xl md:text-4xl font-bold opacity-90 block mt-2 text-text-primary">
            {profile.role}
          </span>
        </motion.h1>

        {/* Specific Value Proposition */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-3 text-base sm:text-xl font-medium max-w-3xl mx-auto text-accent"
        >
          {profile.specialization}
        </motion.p>

        {/* Core Tech Stack Underneath */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-4 flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto"
        >
          {techBadges.map((tech) => (
            <span
              key={tech}
              className={`px-3 py-1 rounded-lg text-xs font-semibold border ${
                isDarkMode
                  ? 'bg-bg-surface border-border text-text-secondary'
                  : 'bg-bg-surface-light border-border-light text-text-secondary-light'
              }`}
            >
              {tech}
            </span>
          ))}
        </motion.div>

        {/* International Remote Opportunity Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={`mt-8 max-w-2xl mx-auto p-4 sm:p-5 rounded-2xl border text-left flex flex-col sm:flex-row items-center justify-between gap-4 transition-all ${
            isDarkMode
              ? 'bg-bg-surface/80 border-accent/30 shadow-lg shadow-accent/5'
              : 'bg-white border-accent/30 shadow-lg shadow-black/5'
          }`}
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-accent" />
              <span className="text-xs font-extrabold uppercase tracking-wider text-accent">Currently Seeking</span>
            </div>
            <p className={`text-xs sm:text-sm font-medium ${isDarkMode ? 'text-text-secondary' : 'text-text-secondary-light'}`}>
              {remoteStatus.statement}
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] font-semibold text-text-secondary">
              <span className="flex items-center gap-1 text-emerald-400">
                <Globe className="w-3 h-3" /> {remoteStatus.location}
              </span>
              <span className="flex items-center gap-1 text-accent">
                <Clock className="w-3 h-3" /> {remoteStatus.timezone}
              </span>
              <span className="flex items-center gap-1 text-purple-400">
                <Briefcase className="w-3 h-3" /> {remoteStatus.employmentType}
              </span>
            </div>
          </div>

          <a
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 px-4 py-2.5 rounded-xl bg-accent text-white font-semibold text-xs hover:bg-accent-hover transition-colors shadow-md"
          >
            Hire Remotely
          </a>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5"
        >
          <a
            href="#projects"
            className="w-full sm:w-auto group flex items-center justify-center gap-2 px-7 py-3.5 bg-accent hover:bg-accent-hover text-white font-semibold rounded-xl transition-all hover:scale-105 shadow-xl shadow-accent/25"
          >
            <CodeXml className="w-4 h-4" />
            Explore Case Studies & Architecture
          </a>
          <button
            type="button"
            onClick={() => setIsResumeOpen(true)}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 font-semibold rounded-xl transition-all border hover:scale-105 ${
              isDarkMode
                ? 'border-border text-text-primary bg-bg-surface hover:bg-bg-surface-hover hover:border-border-hover'
                : 'border-border-light text-text-primary-light bg-bg-surface-light hover:bg-bg-surface-hover-light hover:border-border-hover-light'
            }`}
          >
            <FileText className="w-4 h-4 text-accent" />
            View Developer CV (ATS)
          </button>
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
            <span>Explore Architecture & Engineering Experience</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
            >
              <ArrowDown className="w-4 h-4" />
            </motion.div>
          </a>
        </motion.div>

      </div>

      {/* Developer CV Modal */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </section>
  )
}
