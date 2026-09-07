import { useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import useProjectStore from '../../store/projectStore'

export default function Layout({ children }) {
  const initTheme = useProjectStore((s) => s.initTheme)
  const checkAuth = useProjectStore((s) => s.checkAuth)
  const fetchProjects = useProjectStore((s) => s.fetchProjects)

  useEffect(() => {
    initTheme()
    checkAuth()
    fetchProjects()
  }, [initTheme, checkAuth, fetchProjects])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        {children}
      </main>
      <Footer />
    </div>
  )
}
