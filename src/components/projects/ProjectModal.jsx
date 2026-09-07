import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CodeXml, ExternalLink, Clock, Play, Video, AlertCircle, Lock } from 'lucide-react'
import ReactPlayer from 'react-player'
import useProjectStore from '../../store/projectStore'

export default function ProjectModal({ project, isOpen, onClose }) {
  const isDarkMode = useProjectStore((s) => s.isDarkMode)
  const [hasVideoError, setHasVideoError] = useState(false)

  // Reset error when project changes
  useEffect(() => {
    setHasVideoError(false)
  }, [project])

  // Lock body scroll when modal is open
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

  // Close on Escape
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

  return (
    <AnimatePresence>
      {isOpen && project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/85 backdrop-blur-md" />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full max-w-4xl max-h-[92vh] rounded-2xl overflow-hidden shadow-2xl flex flex-col border ${
              isDarkMode
                ? 'bg-bg-surface border-border text-text-primary'
                : 'bg-bg-surface-light border-border-light text-text-primary-light'
            }`}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-sm transition-all hover:scale-105"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Video Player Box */}
            <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden flex-shrink-0">
              {!project.video?.url ? (
                <div className="flex flex-col items-center justify-center text-center p-6 space-y-3">
                  <div className="w-14 h-14 rounded-full bg-gray-600/30 border border-gray-500/40 flex items-center justify-center text-gray-400">
                    <Video className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-base">Walkthrough Video: N/A</h4>
                    <p className="text-gray-400 text-xs mt-1 max-w-sm">
                      A walkthrough video for this project isn't available yet.
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
                      Unable to embed this video preview. You can open the video source directly.
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

            {/* Project Details */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[11px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-md bg-accent/15 text-accent border border-accent/30">
                      {project.category}
                    </span>
                    <span className={`flex items-center gap-1 text-xs font-medium ${
                      isDarkMode ? 'text-text-secondary' : 'text-text-secondary-light'
                    }`}>
                      <Clock className="w-3.5 h-3.5 text-accent" />
                      {project.video?.duration || 'N/A'}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                    {project.title}
                  </h2>
                </div>

                {/* Action Links */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  {project.links?.github ? (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all hover:scale-105 ${
                        isDarkMode
                          ? 'border-border text-text-secondary hover:text-text-primary hover:border-border-hover bg-bg-primary'
                          : 'border-border-light text-text-secondary-light hover:text-text-primary-light hover:border-border-hover-light bg-bg-primary-light'
                      }`}
                    >
                      <CodeXml className="w-4 h-4" />
                      Source Code
                    </a>
                  ) : (
                    <span
                      title="Source code is private under an NDA"
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border cursor-not-allowed opacity-60 ${
                        isDarkMode
                          ? 'border-border text-text-secondary bg-bg-primary'
                          : 'border-border-light text-text-secondary-light bg-bg-primary-light'
                      }`}
                    >
                      <Lock className="w-4 h-4" />
                      Source Code (NDA)
                    </span>
                  )}
                  {project.links?.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-accent hover:bg-accent-hover text-white transition-all hover:scale-105 shadow-md shadow-accent/20"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className={`text-xs font-bold uppercase tracking-wider ${
                  isDarkMode ? 'text-text-secondary' : 'text-text-secondary-light'
                }`}>
                  About The Project
                </h4>
                <p className={`text-sm sm:text-base leading-relaxed ${
                  isDarkMode ? 'text-text-secondary' : 'text-text-secondary-light'
                }`}>
                  {project.description}
                </p>
              </div>

              {/* Tech Stack */}
              <div>
                <h4 className={`text-xs font-bold uppercase tracking-wider mb-2.5 ${
                  isDarkMode ? 'text-text-secondary' : 'text-text-secondary-light'
                }`}>
                  Technologies & Libraries
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
