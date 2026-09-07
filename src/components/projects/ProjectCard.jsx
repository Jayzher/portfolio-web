import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, CodeXml, ExternalLink, Clock, Edit2, Trash2, Lock, Sparkles, FileText } from 'lucide-react'
import useProjectStore from '../../store/projectStore'

export default function ProjectCard({ project, index, onPlay }) {
  const [isHovered, setIsHovered] = useState(false)
  const isDarkMode = useProjectStore((s) => s.isDarkMode)
  const isAdmin = useProjectStore((s) => s.isAdmin)
  const openEditModal = useProjectStore((s) => s.openEditModal)
  const deleteProject = useProjectStore((s) => s.deleteProject)
  const hasVideo = Boolean(project.video?.url)
  const hasCaseStudy = Boolean(project.caseStudy)

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
      className={`group relative rounded-3xl overflow-hidden border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
        isDarkMode
          ? 'bg-bg-surface border-border hover:border-accent/40 hover:shadow-2xl hover:shadow-accent/10'
          : 'bg-white border-border-light hover:border-accent/40 hover:shadow-2xl hover:shadow-black/10'
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

          {/* Hover play / Case study overlay */}
          <motion.div
            initial={false}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center pointer-events-none"
          >
            <motion.div
              initial={false}
              animate={{ scale: isHovered ? 1 : 0.6 }}
              transition={{ type: 'spring', bounce: 0.4 }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-white shadow-xl shadow-accent/40 font-semibold text-xs"
            >
              {hasCaseStudy ? (
                <>
                  <FileText className="w-4 h-4" />
                  <span>Read Case Study & Architecture</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 ml-0.5" fill="white" />
                  <span>Watch Walkthrough</span>
                </>
              )}
            </motion.div>
          </motion.div>

          {/* Top action bar */}
          <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-auto">
            <div className="flex items-center gap-1.5">
              {project.featured && (
                <span className="px-2.5 py-1 rounded-lg bg-accent text-white text-[10px] font-extrabold uppercase tracking-wider shadow-sm">
                  Featured Case Study
                </span>
              )}
            </div>

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

          {/* Duration / Case study badge */}
          <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-sm text-white text-xs font-semibold">
            {hasCaseStudy ? (
              <span className="text-purple-400 font-bold flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-purple-400" /> Case Study
              </span>
            ) : (
              <>
                <Clock className="w-3 h-3 text-accent" />
                {hasVideo ? project.video.duration : 'Walkthrough'}
              </>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <h3 className={`text-lg font-extrabold transition-colors group-hover:text-accent ${
              isDarkMode ? 'text-text-primary' : 'text-text-primary-light'
            }`}>
              {project.title}
            </h3>
          </div>

          <p className={`text-xs sm:text-sm leading-relaxed line-clamp-2 ${
            isDarkMode ? 'text-text-secondary' : 'text-text-secondary-light'
          }`}>
            {project.shortDescription}
          </p>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.techStack?.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className={`px-2.5 py-0.5 rounded-lg text-[11px] font-medium border ${
                  isDarkMode
                    ? 'bg-bg-primary text-text-secondary border-border/50'
                    : 'bg-bg-primary-light text-text-secondary-light border-border-light'
                }`}
              >
                {tech}
              </span>
            ))}
            {(project.techStack?.length || 0) > 4 && (
              <span className={`px-2 py-0.5 rounded-lg text-[11px] font-medium ${
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
      <div className={`px-5 sm:px-6 pb-5 pt-3 flex items-center justify-between border-t ${
        isDarkMode ? 'border-border/50' : 'border-border-light/50'
      }`}>
        <span className="inline-flex items-center gap-1.5 text-xs text-accent font-bold group-hover:underline">
          {hasCaseStudy ? (
            <>
              <FileText className="w-3.5 h-3.5" /> Read Case Study
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5" /> Watch Walkthrough
            </>
          )}
        </span>

        <div className="flex items-center gap-3">
          {project.links?.github ? (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className={`flex items-center gap-1 text-xs font-semibold transition-colors hover:text-accent ${
                isDarkMode ? 'text-text-secondary' : 'text-text-secondary-light'
              }`}
            >
              <CodeXml className="w-3.5 h-3.5 text-accent" />
              GitHub
            </a>
          ) : (
            <span
              title="Private Commercial Repository — Architecture available upon request"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 text-[11px] font-semibold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20"
            >
              <Lock className="w-3 h-3 text-purple-400" />
              Private (NDA)
            </span>
          )}

          {project.links?.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:underline"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}
