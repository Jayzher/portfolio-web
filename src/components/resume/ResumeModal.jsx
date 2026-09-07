import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, FileText, Download, Mail, Phone, MapPin, ExternalLink, Globe, Briefcase, GraduationCap, CodeXml, CheckCircle2 } from 'lucide-react'
import { portfolioData } from '../../data/portfolioData'
import useProjectStore from '../../store/projectStore'

export default function ResumeModal({ isOpen, onClose }) {
  const isDarkMode = useProjectStore((s) => s.isDarkMode)
  const { profile, skillsCategorized, experience, education } = portfolioData

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-6"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className={`relative w-full max-w-4xl max-h-[92vh] rounded-2xl overflow-hidden shadow-2xl flex flex-col border ${
            isDarkMode
              ? 'bg-bg-surface border-border text-text-primary'
              : 'bg-white border-border-light text-gray-900'
          }`}
        >
          {/* Top Bar */}
          <div className="px-6 py-4 border-b border-border/50 flex items-center justify-between bg-black/10">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-accent" />
              <span className="font-bold text-sm sm:text-base">Developer Curriculum Vitae (ATS-Optimized)</span>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent text-white text-xs font-semibold hover:bg-accent-hover transition-colors shadow-md"
              >
                <Download className="w-3.5 h-3.5" />
                Original Resume Image
              </a>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Printable / ATS CV Scrollable Body */}
          <div className="p-6 sm:p-10 overflow-y-auto space-y-8 text-left font-sans leading-relaxed">
            
            {/* Header */}
            <div className="border-b pb-6 border-border/40">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-accent">
                {profile.name}
              </h1>
              <p className="text-lg font-bold mt-1 text-text-primary">
                {profile.role} — <span className="font-normal text-text-secondary">{profile.specialization}</span>
              </p>
              
              <div className="flex flex-wrap items-center gap-4 mt-4 text-xs font-medium text-text-secondary">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-accent" /> {profile.location}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-accent" /> {profile.phone}
                </span>
                <a href={`mailto:${profile.email}`} className="flex items-center gap-1 hover:text-accent">
                  <Mail className="w-3.5 h-3.5 text-accent" /> {profile.email}
                </a>
                <a href={profile.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-accent">
                  <Globe className="w-3.5 h-3.5 text-accent" /> github.com/Jayzher
                </a>
              </div>
            </div>

            {/* Professional Summary */}
            <div>
              <h2 className="text-xs font-extrabold uppercase tracking-widest text-accent mb-2">
                Executive Professional Summary
              </h2>
              <p className="text-sm leading-relaxed text-text-secondary">
                {profile.bio.join(" ")}
              </p>
            </div>

            {/* Core Technical Skills */}
            <div>
              <h2 className="text-xs font-extrabold uppercase tracking-widest text-accent mb-3">
                Technical Skills & Architecture Matrix
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {skillsCategorized?.map((cat) => (
                  <div key={cat.category} className="p-3.5 rounded-xl border border-border/50 bg-black/5 dark:bg-white/5">
                    <h3 className="text-xs font-bold text-accent mb-1">{cat.category}</h3>
                    <p className="text-xs text-text-secondary mb-2">{cat.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.items.map((item) => (
                        <span key={item.name} className="px-2 py-0.5 rounded text-[11px] font-semibold bg-accent/10 text-accent border border-accent/20">
                          {item.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Professional Experience */}
            <div>
              <h2 className="text-xs font-extrabold uppercase tracking-widest text-accent mb-4">
                Professional Experience
              </h2>
              <div className="space-y-6">
                {experience.map((job) => (
                  <div key={job.period} className="border-l-2 border-accent/40 pl-4 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                      <h3 className="text-base font-bold text-text-primary">
                        {job.role} <span className="text-accent">@ {job.company}</span>
                      </h3>
                      <span className="text-xs font-mono text-text-secondary">{job.period}</span>
                    </div>
                    <p className="text-xs italic text-text-secondary">{job.location} | {job.description}</p>
                    <ul className="space-y-1.5 pt-1">
                      {job.achievements.map((ach, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-text-secondary">
                          <CheckCircle2 className="w-3.5 h-3.5 text-accent flex-shrink-0 mt-0.5" />
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Key Engineering Projects */}
            <div>
              <h2 className="text-xs font-extrabold uppercase tracking-widest text-accent mb-3">
                Selected High-Impact Projects
              </h2>
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl border border-border/50 bg-black/5 dark:bg-white/5">
                  <h3 className="text-sm font-bold">Asset Management System (Full Lifecycle Audit Platform)</h3>
                  <p className="text-xs text-text-secondary mt-0.5">
                    Engineered multi-department asset tracking, barcode categorization, procurement workflows, stock movement auditing, and PostgreSQL atomic database transaction handling.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl border border-border/50 bg-black/5 dark:bg-white/5">
                  <h3 className="text-sm font-bold">Ticket Support System with Tasks & Kanban Management</h3>
                  <p className="text-xs text-text-secondary mt-0.5">
                    Built unified helpdesk ticketing with drag-and-drop Kanban state engine, automated SLA timers, and escalation workflows handling 500+ ticket resolutions with 98% compliance.
                  </p>
                </div>
              </div>
            </div>

            {/* Education */}
            <div>
              <h2 className="text-xs font-extrabold uppercase tracking-widest text-accent mb-3">
                Education & Professional Training
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {education.map((edu) => (
                  <div key={edu.degree} className="p-3.5 rounded-xl border border-border/50 bg-black/5 dark:bg-white/5">
                    <h3 className="text-sm font-bold text-text-primary">{edu.degree}</h3>
                    <p className="text-xs font-semibold text-accent mt-0.5">{edu.institution} ({edu.period})</p>
                    <p className="text-xs text-text-secondary mt-1">{edu.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Remote Availability Footer */}
            <div className="p-4 rounded-xl border border-accent/30 bg-accent/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div>
                <span className="font-bold text-accent block">Remote Overseas Work Readiness</span>
                <span className="text-text-secondary">Open to Remote Full-Time / Contract roles (UTC+8 / Flexible Overlap)</span>
              </div>
              <a
                href={`mailto:${profile.email}`}
                className="px-4 py-2 rounded-lg bg-accent text-white font-semibold hover:bg-accent-hover transition-colors shadow-sm"
              >
                Contact Jayzher
              </a>
            </div>

          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
