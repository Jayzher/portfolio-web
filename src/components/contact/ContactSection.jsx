import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Copy, Check, MapPin, ArrowUpRight, Phone } from 'lucide-react'
import { portfolioData } from '../../data/portfolioData'
import useProjectStore from '../../store/projectStore'

const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.89h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
  </svg>
)

const FACEBOOK_URL = 'https://www.facebook.com/PsyChoNyMouz'

export default function ContactSection() {
  const isDarkMode = useProjectStore((s) => s.isDarkMode)
  const { profile } = portfolioData

  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <section id="contact" className="py-20 border-t border-border/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-accent mb-2 block">
            Get In Touch
          </span>
          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
            isDarkMode ? 'text-text-primary' : 'text-text-primary-light'
          }`}>
            Let's Connect & Build Together
          </h2>
          <p className={`mt-2 text-sm sm:text-base ${
            isDarkMode ? 'text-text-secondary' : 'text-text-secondary-light'
          }`}>
            Have an open software development opportunity, need educational system consulting, or want to discuss architecture? Reach out directly.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Info & Contact Cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-6 flex flex-col justify-between"
          >
            {/* Email quick card */}
            <div className={`p-6 sm:p-8 rounded-3xl border ${
              isDarkMode ? 'bg-bg-surface border-border' : 'bg-bg-surface-light border-border-light shadow-sm'
            }`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center text-accent">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold">Email Address</h4>
                  <p className={`text-xs ${isDarkMode ? 'text-text-secondary' : 'text-text-secondary-light'}`}>
                    Direct inbox response within 24h
                  </p>
                </div>
              </div>

              <div className={`flex items-center justify-between p-3 rounded-xl border ${
                isDarkMode ? 'bg-bg-primary border-border' : 'bg-bg-primary-light border-border-light'
              }`}>
                <span className="text-xs sm:text-sm font-mono truncate mr-2 font-medium">
                  {profile.email}
                </span>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-accent text-white text-xs font-semibold hover:bg-accent-hover transition-colors flex-shrink-0"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Direct Phone & WhatsApp card */}
            <div className={`p-6 sm:p-8 rounded-3xl border ${
              isDarkMode ? 'bg-bg-surface border-border' : 'bg-bg-surface-light border-border-light shadow-sm'
            }`}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-500">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold">Direct Phone & WhatsApp</h4>
                  <p className={`text-xs ${isDarkMode ? 'text-text-secondary' : 'text-text-secondary-light'}`}>
                    Available for calls and messages
                  </p>
                </div>
              </div>

              <a
                href={`tel:${profile.phone.replace(/\s/g, '')}`}
                className="inline-flex items-center gap-2 text-sm font-bold text-accent hover:underline"
              >
                {profile.phone} <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Location & Status */}
            <div className={`p-6 rounded-3xl border flex items-center justify-between ${
              isDarkMode ? 'bg-bg-surface border-border' : 'bg-bg-surface-light border-border-light shadow-sm'
            }`}>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-accent" />
                <span className="text-xs font-medium">{profile.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-emerald-500">Active & Available</span>
              </div>
            </div>

          </motion.div>

          {/* Right: Facebook Direct Message */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`lg:col-span-7 p-8 sm:p-10 rounded-3xl border flex flex-col items-center justify-center text-center gap-6 ${
              isDarkMode ? 'bg-bg-surface border-border' : 'bg-bg-surface-light border-border-light shadow-sm'
            }`}
          >
            <div className="w-16 h-16 rounded-2xl bg-[#1877F2]/15 flex items-center justify-center text-[#1877F2]">
              <FacebookIcon className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2">Send a Direct Message</h3>
              <p className={`text-sm max-w-sm mx-auto ${
                isDarkMode ? 'text-text-secondary' : 'text-text-secondary-light'
              }`}>
                Prefer chatting over messaging apps? Reach out directly on Facebook and Jayzher will get back to you shortly.
              </p>
            </div>

            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1877F2] hover:bg-[#1462c9] text-white text-sm font-semibold rounded-xl transition-all hover:scale-[1.02] shadow-lg shadow-[#1877F2]/25"
            >
              <FacebookIcon className="w-4 h-4" />
              Message on Facebook
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </motion.div>

        </div>

      </div>
    </section>
  )
}
