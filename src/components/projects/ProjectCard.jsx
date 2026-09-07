import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, CodeXml, ExternalLink, Clock, Edit2, Trash2, Lock } from 'lucide-react'
import useProjectStore from '../../store/projectStore'

export default function ProjectCard({ project, index, onPlay }) {
  const [isHovered, setIsHovered] = useState(false)
  const isDarkMode = useProjectStore((s) => s.isDarkMode)
  const isAdmin = useProjectStore((s) => s.isAdmin)
  const openEditModal = useProjectStore((s) => s.openEditModal)
  const deleteProject = useProjectStore((s) => s.deleteProject)
  const hasVideo = Boolean(project.video?.url)

  const handleEdit = (e) => {
    e.stopPropagation()
    openEditModal(project)
  }

  const handleDelete = async (e) => {
    e.stopPropagation()
    if (window.confirm(`Are you sure you want to remove "${project.title}" from your portfolio?`)) {
      try {
        await deleteProject(project.id)
      } catch (err) {
        alert(err.message || 'Failed to delete project.')
      }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative rounded-2xl overflow-hidden border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
        isDarkMode
          ? 'bg-bg-surface border-border hover:border-border-hover hover:shadow-2xl hover:shadow-accent/10'
          : 'bg-bg-surface-light border-border-light hover:border-border-hover-light hover:shadow-2xl hover:shadow-black/10'
      }`}
      onClick={() => onPlay(project)}
    >
      <div>
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />

          {/* Hover play overlay */}
          <motion.div
            initial={false}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center pointer-events-none"
          >
            <motion.div
              initial={false}
              animate={{ scale: isHovered ? 1 : 0.6 }}
              transition={{ type: 'spring', bounce: 0.4 }}
              className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg text-white ${
                hasVideo ? 'bg-accent shadow-accent/50' : 'bg-gray-600 shadow-black/40'
              }`}
            >
              {hasVideo ? (
                <Play className="w-6 h-6 ml-0.5" fill="white" />
              ) : (
                <span className="text-[10px] font-bold uppercase tracking-wider">N/A</span>
              )}
            </motion.div>
          </motion.div>

          {/* Top action bar (Edit / Delete / Featured) */}
          <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-auto">
            {project.featured ? (
              <span className="px-2.5 py-1 rounded-md bg-accent text-white text-xs font-semibold shadow-sm">
                Featured
              </span>
            ) : <span />}

            {isAdmin && (
              <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-sm p-1 rounded-lg">
                <button
                  type="button"
                  onClick={handleEdit}
                  title="Edit Walkthrough"
                  className="p-1.5 rounded-md hover:bg-white/20 text-white transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  title="Delete Walkthrough"
                  className="p-1.5 rounded-md hover:bg-red-500/80 text-white transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Duration badge */}
          <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 rounded-md bg-black/75 backdrop-blur-sm text-white text-xs font-medium">
            <Clock className="w-3 h-3 text-accent" />
            {hasVideo ? project.video.duration : 'N/A'}
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <h3 className={`text-lg font-bold transition-colors group-hover:text-accent ${
              isDarkMode ? 'text-text-primary' : 'text-text-primary-light'
            }`}>
              {project.title}
            </h3>
            <span className={`text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5 rounded-full border ${
              isDarkMode ? 'border-border text-text-secondary' : 'border-border-light text-text-secondary-light'
            }`}>
              {project.category}
            </span>
          </div>

          <p className={`text-sm leading-relaxed mb-4 line-clamp-2 ${
            isDarkMode ? 'text-text-secondary' : 'text-text-secondary-light'
          }`}>
            {project.shortDescription}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.techStack?.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className={`px-2 py-0.5 rounded-md text-xs font-medium ${
                  isDarkMode
                    ? 'bg-bg-primary text-text-secondary border border-border/50'
                    : 'bg-bg-primary-light text-text-secondary-light border border-border-light'
                }`}
              >
                {tech}
              </span>
            ))}
            {(project.techStack?.length || 0) > 4 && (
              <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${
                isDarkMode
                  ? 'bg-bg-primary text-text-secondary'
                  : 'bg-bg-primary-light text-text-secondary-light'
              }`}>
                +{project.techStack.length - 4}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Footer Links */}
      <div className={`px-5 pb-5 pt-2 flex items-center justify-between border-t ${
        isDarkMode ? 'border-border/50' : 'border-border-light/50'
      }`}>
        {hasVideo ? (
          <span className="inline-flex items-center gap-1.5 text-xs text-accent font-medium group-hover:underline">
            <Play className="w-3 h-3" /> Watch Walkthrough
          </span>
        ) : (
          <span
            title="Walkthrough video not yet available"
            className={`inline-flex items-center gap-1.5 text-xs font-medium opacity-60 ${
              isDarkMode ? 'text-text-secondary' : 'text-text-secondary-light'
            }`}
          >
            <Play className="w-3 h-3" /> Walkthrough (N/A)
          </span>
        )}

        <div className="flex items-center gap-3">
          {project.links?.github ? (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className={`flex items-center gap-1 text-xs font-medium transition-colors hover:text-accent ${
                isDarkMode ? 'text-text-secondary' : 'text-text-secondary-light'
              }`}
            >
              <CodeXml className="w-3.5 h-3.5" />
              Code
            </a>
          ) : (
            <span
              title="Source code is private under an NDA"
              onClick={(e) => e.stopPropagation()}
              className={`flex items-center gap-1 text-xs font-medium cursor-not-allowed opacity-60 ${
                isDarkMode ? 'text-text-secondary' : 'text-text-secondary-light'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              Code (NDA)
            </span>
          )}
          {project.links?.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className={`flex items-center gap-1 text-xs font-medium transition-colors hover:text-accent ${
                isDarkMode ? 'text-text-secondary' : 'text-text-secondary-light'
              }`}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}
