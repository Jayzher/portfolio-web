import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CodeXml, ExternalLink, Clock, Video, Lock, ArrowRight, CheckCircle2, ShieldCheck, Database, Server, Cpu, Sparkles, Layers } from 'lucide-react'
import ReactPlayer from 'react-player'
import useProjectStore from '../../store/projectStore'

export default function ProjectModal({ project, isOpen, onClose }) {
  const isDarkMode = useProjectStore((s) => s.isDarkMode)
  const [hasVideoError, setHasVideoError] = useState(false)
  const [activeTab, setActiveTab] = useState('caseStudy')

  useEffect(() => {
    setHasVideoError(false)
    setActiveTab('caseStudy')
  }, [project])

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

  const isLocalVideo = project?.video?.url?.startsWith('/videos/') ||
    project?.video?.url?.endsWith('.webm') ||
    project?.video?.url?.endsWith('.mp4')

  const caseStudy = project?.caseStudy

  return (
    <AnimatePresence>
      {isOpen && project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/85 backdrop-blur-md" />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full max-w-5xl max-h-[92vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col border ${
              isDarkMode
                ? 'bg-bg-surface border-border text-text-primary'
                : 'bg-bg-surface-light border-border-light text-text-primary-light'
            }`}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-black/70 hover:bg-black/90 text-white backdrop-blur-md transition-all hover:scale-105 shadow-lg"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Video / Banner Box */}
            <div className="relative aspect-video max-h-[340px] w-full bg-black flex items-center justify-center overflow-hidden flex-shrink-0">
              {!project.video?.url ? (
                <div className="flex flex-col items-center justify-center text-center p-6 space-y-3">
                  <div className="w-14 h-14 rounded-full bg-gray-600/30 border border-gray-500/40 flex items-center justify-center text-gray-400">
                    <Video className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-base">Video Walkthrough N/A</h4>
                    <p className="text-gray-400 text-xs mt-1 max-w-sm">
                      Walkthrough video in preparation. Detailed engineering breakdown available below.
                    </p>
                  </div>
                </div>
              ) : project.video?.url && !hasVideoError ? (
                isLocalVideo ? (
                  <video
                    key={project.video.url}
                    src={project.video.url}
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full object-contain bg-black"
                    onError={() => setHasVideoError(true)}
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <ReactPlayer
                    url={project.video.url}
                    width="100%"
                    height="100%"
                    controls
                    playing
                    onError={() => setHasVideoError(true)}
                    config={{
                      youtube: {
                        playerVars: { modestbranding: 1, rel: 0 },
                      },
                    }}
                  />
                )
              ) : (
                <div className="flex flex-col items-center justify-center text-center p-6 space-y-3">
                  <div className="w-14 h-14 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-accent">
                    <Video className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-base">Direct Video Source</h4>
                    <p className="text-gray-400 text-xs mt-1 max-w-sm">
                      Unable to embed video preview. You can view the video source directly.
                    </p>
                  </div>
                  {project.video?.url && (
                    <a
                      href={project.video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-accent text-white text-xs font-semibold hover:bg-accent-hover transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Open Video in New Tab
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Modal Body Scroll Area */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              
              {/* Header Title & Actions */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b pb-6 border-border/40">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[11px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-md bg-accent/15 text-accent border border-accent/30">
                      {project.category}
                    </span>
                    {caseStudy && (
                      <span className="text-[11px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-md bg-purple-500/15 text-purple-400 border border-purple-500/30 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Detailed Case Study
                      </span>
                    )}
                    <span className={`flex items-center gap-1 text-xs font-medium ${
                      isDarkMode ? 'text-text-secondary' : 'text-text-secondary-light'
                    }`}>
                      <Clock className="w-3.5 h-3.5 text-accent" />
                      {project.video?.duration || 'Walkthrough'}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                    {project.title}
                  </h2>
                </div>

                {/* GitHub & Live Action Links */}
                <div className="flex items-center gap-2.5 flex-shrink-0">
                  {project.links?.github ? (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-accent text-white hover:bg-accent-hover transition-all shadow-md"
                    >
                      <CodeXml className="w-4 h-4" />
                      GitHub Repository
                    </a>
                  ) : (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border border-purple-500/30 bg-purple-500/10 text-purple-300">
                      <Lock className="w-3.5 h-3.5 text-purple-400" />
                      Private Commercial Repo (Architecture Available)
                    </div>
                  )}

                  {project.links?.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-md"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>

              {/* Case Study Detailed Breakdown */}
              {caseStudy ? (
                <div className="space-y-8">
                  
                  {/* Problem & Role Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-5 rounded-2xl border border-red-500/20 bg-red-500/5 space-y-1.5">
                      <span className="text-[11px] font-extrabold uppercase tracking-widest text-red-400 block">
                        The Business Problem
                      </span>
                      <p className="text-xs sm:text-sm leading-relaxed text-text-secondary">
                        {caseStudy.problem}
                      </p>
                    </div>
                    <div className="p-5 rounded-2xl border border-blue-500/20 bg-blue-500/5 space-y-1.5">
                      <span className="text-[11px] font-extrabold uppercase tracking-widest text-blue-400 block">
                        My Engineering Role & Ownership
                      </span>
                      <p className="text-xs sm:text-sm leading-relaxed text-text-secondary">
                        {caseStudy.role}
                      </p>
                    </div>
                  </div>

                  {/* Architecture Diagram & Flow (Requirement #3) */}
                  {caseStudy.architectureFlow && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-extrabold uppercase tracking-widest text-accent flex items-center gap-1.5">
                        <Layers className="w-4 h-4" />
                        System Architecture & Data Flow Diagram
                      </h4>

                      <div className="p-5 rounded-2xl border border-accent/20 bg-black/10 dark:bg-white/5">
                        <div className="flex flex-wrap items-center justify-between gap-3 text-center">
                          {caseStudy.architectureFlow.map((step, sIdx) => (
                            <div key={sIdx} className="flex items-center gap-3 flex-1 min-w-[130px]">
                              <div className="p-3 rounded-xl border border-accent/30 bg-accent/10 text-center w-full">
                                <span className="font-bold text-xs text-accent block">{step.step}</span>
                                <span className="text-[10px] text-text-secondary block mt-0.5">{step.desc}</span>
                              </div>
                              {sIdx < caseStudy.architectureFlow.length - 1 && (
                                <ArrowRight className="w-4 h-4 text-accent hidden lg:block flex-shrink-0" />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Architecture Details Breakdown (Requirement #3) */}
                  {caseStudy.architectureDetails && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-extrabold uppercase tracking-widest text-accent flex items-center gap-1.5">
                        <Cpu className="w-4 h-4" />
                        Technical Depth & Engineering Blueprint
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl border border-border/60 bg-black/5 dark:bg-white/5 space-y-1">
                          <span className="text-xs font-bold text-accent flex items-center gap-1.5">
                            <Database className="w-3.5 h-3.5" /> Database Schema & Data Modeling
                          </span>
                          <p className="text-xs text-text-secondary leading-relaxed">
                            {caseStudy.architectureDetails.databaseSchema}
                          </p>
                        </div>
                        <div className="p-4 rounded-xl border border-border/60 bg-black/5 dark:bg-white/5 space-y-1">
                          <span className="text-xs font-bold text-accent flex items-center gap-1.5">
                            <Server className="w-3.5 h-3.5" /> API Structure & Endpoints
                          </span>
                          <p className="text-xs text-text-secondary leading-relaxed">
                            {caseStudy.architectureDetails.apiStructure}
                          </p>
                        </div>
                        <div className="p-4 rounded-xl border border-border/60 bg-black/5 dark:bg-white/5 space-y-1">
                          <span className="text-xs font-bold text-accent flex items-center gap-1.5">
                            <ShieldCheck className="w-3.5 h-3.5" /> Authentication & Role-Based Access (RBAC)
                          </span>
                          <p className="text-xs text-text-secondary leading-relaxed">
                            {caseStudy.architectureDetails.securityAndRBAC}
                          </p>
                        </div>
                        <div className="p-4 rounded-xl border border-border/60 bg-black/5 dark:bg-white/5 space-y-1">
                          <span className="text-xs font-bold text-accent flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Validation, Audit & Data Integrity
                          </span>
                          <p className="text-xs text-text-secondary leading-relaxed">
                            {caseStudy.architectureDetails.validationAndAudit}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Key Engineering Features */}
                  {caseStudy.keyFeatures && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-extrabold uppercase tracking-widest text-accent">
                        Key Engineering Features
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {caseStudy.keyFeatures.map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-center gap-2 p-3 rounded-xl border border-border/40 bg-black/5 dark:bg-white/5 text-xs">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                            <span className="font-medium text-text-primary">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Challenge vs Solution Narrative */}
                  {caseStudy.challengesAndSolutions && (
                    <div className="p-5 rounded-2xl border border-purple-500/30 bg-purple-500/5 space-y-2">
                      <span className="text-xs font-extrabold uppercase tracking-widest text-purple-400 block">
                        Technical Challenge & Engineering Solution
                      </span>
                      <div className="space-y-2 text-xs leading-relaxed text-text-secondary">
                        <p><strong className="text-text-primary">Challenge:</strong> {caseStudy.challengesAndSolutions.challenge}</p>
                        <p><strong className="text-accent">Solution:</strong> {caseStudy.challengesAndSolutions.solution}</p>
                      </div>
                    </div>
                  )}

                  {/* Result / Impact Metric Highlight (Requirement #6) */}
                  {caseStudy.impact && (
                    <div className="p-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 flex items-center gap-3">
                      <CheckCircle2 className="w-6 h-6 flex-shrink-0 text-emerald-400" />
                      <div>
                        <span className="text-xs font-extrabold uppercase tracking-wider block text-emerald-300">
                          Measurable Result & Business Impact
                        </span>
                        <p className="text-xs sm:text-sm font-semibold text-emerald-200 mt-0.5">
                          {caseStudy.impact}
                        </p>
                      </div>
                    </div>
                  )}

                </div>
              ) : (
                /* Fallback standard view for non-case study projects */
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-text-secondary mb-1">
                      About The Project
                    </h4>
                    <p className="text-sm leading-relaxed text-text-secondary">
                      {project.description}
                    </p>
                  </div>
                </div>
              )}

              {/* Technologies Pill Grid */}
              <div className="pt-4 border-t border-border/40">
                <h4 className="text-xs font-bold uppercase tracking-wider text-text-secondary mb-2.5">
                  Technologies & Engineering Libraries
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack?.map((tech) => (
                    <span
                      key={tech}
                      className={`px-3 py-1 rounded-lg text-xs font-medium border ${
                        isDarkMode
                          ? 'bg-bg-primary text-text-secondary border-border'
                          : 'bg-bg-primary-light text-text-secondary-light border-border-light'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
