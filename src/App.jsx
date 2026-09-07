import Layout from './components/layout/Layout'
import HeroSection from './components/hero/HeroSection'
import AboutSection from './components/about/AboutSection'
import SkillsSection from './components/skills/SkillsSection'
import ProjectGrid from './components/projects/ProjectGrid'
import ExperienceSection from './components/experience/ExperienceSection'
import TestimonialsSection from './components/testimonials/TestimonialsSection'
import ContactSection from './components/contact/ContactSection'
import AddProjectModal from './components/admin/AddProjectModal'
import AdminLoginModal from './components/admin/AdminLoginModal'

function App() {
  return (
    <Layout>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectGrid />
      <ExperienceSection />
      <TestimonialsSection />
      <ContactSection />
      <AddProjectModal />
      <AdminLoginModal />
    </Layout>
  )
}

export default App
