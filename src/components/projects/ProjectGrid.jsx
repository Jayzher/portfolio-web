import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProjectCard from './ProjectCard'
import ProjectModal from './ProjectModal'
import FilterBar from './FilterBar'
import useProjectStore from '../../store/projectStore'
import { FolderOpen } from 'lucide-react'

export default function ProjectGrid() {
  const [selectedProject, setSelectedProject] = useState(null)
  const isDarkMode = useProjectStore((s) => s.isDarkMode)
  const projects = useProjectStore((s) => s.projects)
  const searchQuery = useProjectStore((s) => s.searchQuery)
  const activeCategory = useProjectStore((s) => s.activeCategory)

  const filteredProjects = useMemo(() => {
    return projects
      .filter((p) => {
        const matchesCategory = activeCategory === 'all' || p.category === activeCategory
        const matchesSearch =
          !searchQuery ||
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
        return matchesCategory && matchesSearch
      })
      .sort((a, b) => a.order - b.order)
  }, [projects, searchQuery, activeCategory])

  return (
    <section id="projects" className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h2 className={`text-3xl sm:text-4xl font-bold ${
            isDarkMode ? 'text-text-primary' : 'text-text-primary-light'
          }`}>
            Projects
          </h2>
          <p className={`mt-2 text-base ${
            isDarkMode ? 'text-text-secondary' : 'text-text-secondary-light'
          }`}>
            Click on any project to watch its walkthrough video
          </p>
        </motion.div>

        {/* Filters */}
        <FilterBar />

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onPlay={setSelectedProject}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <FolderOpen className={`w-16 h-16 mb-4 ${
              isDarkMode ? 'text-border' : 'text-border-light'
            }`} />
            <p className={`text-lg font-medium ${
              isDarkMode ? 'text-text-secondary' : 'text-text-secondary-light'
            }`}>
              No projects found
            </p>
            <p className={`text-sm mt-1 ${
              isDarkMode ? 'text-text-secondary' : 'text-text-secondary-light'
            }`}>
              Try adjusting your search or filters
            </p>
          </motion.div>
        )}

        {/* Video Modal */}
        <ProjectModal
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  )
}
