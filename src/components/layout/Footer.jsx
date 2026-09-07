import { CodeXml, Briefcase, Mail, ArrowUp, Lock, ExternalLink } from 'lucide-react'
import { portfolioData } from '../../data/portfolioData'
import useProjectStore from '../../store/projectStore'

export default function Footer() {
  const isDarkMode = useProjectStore((s) => s.isDarkMode)
  const { profile } = portfolioData

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer
      className={`border-t py-12 transition-colors ${
        isDarkMode
          ? 'bg-bg-surface border-border'
          : 'bg-white border-border-light'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* GitHub Presentation Banner (Requirement #8) */}
        <div className={`p-6 rounded-3xl border flex flex-col md:flex-row items-center justify-between gap-4 ${
          isDarkMode
            ? 'bg-bg-primary border-border/80 text-text-primary'
            : 'bg-gray-50 border-border-light text-gray-900'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent flex-shrink-0">
              <CodeXml className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm sm:text-base">
                GitHub Repository & Code Policy Notice
              </h4>
              <p className="text-xs text-text-secondary mt-0.5 max-w-2xl">
                My GitHub profile hosts public source code, walkthrough demonstrations, and personal projects. Production enterprise projects deployed at Classify Inc. and government agencies remain under non-disclosure agreements (NDA); architecture diagrams and technical documentation are available upon request.
              </p>
            </div>
          </div>

          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-white font-semibold text-xs hover:bg-accent-hover transition-colors shadow-md"
          >
            <CodeXml className="w-4 h-4" />
            Visit github.com/Jayzher
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-4">
          
          {/* Branding */}
          <div className="text-center md:text-left">
            <h3 className={`text-lg font-bold ${
              isDarkMode ? 'text-text-primary' : 'text-text-primary-light'
            }`}>
              {profile.name}
            </h3>
            <p className={`text-xs mt-1 ${
              isDarkMode ? 'text-text-secondary' : 'text-text-secondary-light'
            }`}>
              {profile.role} • {profile.specialization}
            </p>
          </div>

          {/* Social Links & Back to Top */}
          <div className="flex items-center gap-3">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className={`p-2.5 rounded-xl border transition-all hover:scale-110 hover:text-accent ${
                isDarkMode
                  ? 'border-border text-text-secondary hover:bg-bg-surface-hover'
                  : 'border-border-light text-text-secondary-light hover:bg-bg-surface-hover-light'
              }`}
            >
              <CodeXml className="w-4 h-4" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className={`p-2.5 rounded-xl border transition-all hover:scale-110 hover:text-accent ${
                isDarkMode
                  ? 'border-border text-text-secondary hover:bg-bg-surface-hover'
                  : 'border-border-light text-text-secondary-light hover:bg-bg-surface-hover-light'
              }`}
            >
              <Briefcase className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              aria-label="Email"
              className={`p-2.5 rounded-xl border transition-all hover:scale-110 hover:text-accent ${
                isDarkMode
                  ? 'border-border text-text-secondary hover:bg-bg-surface-hover'
                  : 'border-border-light text-text-secondary-light hover:bg-bg-surface-hover-light'
              }`}
            >
              <Mail className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              title="Back to top"
              className="p-2.5 rounded-xl bg-accent/15 text-accent border border-accent/30 hover:bg-accent hover:text-white transition-all hover:scale-110 ml-2"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className={`mt-8 pt-6 border-t text-center ${
          isDarkMode ? 'border-border/60' : 'border-border-light/60'
        }`}>
          <p className={`text-xs flex items-center justify-center gap-1.5 ${
            isDarkMode ? 'text-text-secondary' : 'text-text-secondary-light'
          }`}>
            © {new Date().getFullYear()} {profile.name} — Full-Stack Software Engineer. All rights reserved. Built with React 19, Tailwind CSS & Framer Motion.
          </p>
        </div>
      </div>
    </footer>
  )
}
