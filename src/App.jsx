import { useState, useEffect, useRef } from 'react'
import Lenis from 'lenis'
import Loader from './components/Loader'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import BackToTop from './components/BackToTop'
import FloatingShapes from './components/FloatingShapes'

export default function App() {
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState('home')
  const lenisRef = useRef(null)

  useEffect(() => {
    if (loading) return
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true })
    lenisRef.current = lenis
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [loading])

  useEffect(() => {
    if (loading) return
    const sections = document.querySelectorAll('section[id]')
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id) })
    }, { threshold: 0.3 })
    sections.forEach(s => obs.observe(s))
    return () => obs.disconnect()
  }, [loading])

  const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      {!isTouchDevice && !loading && <CustomCursor />}
      {!loading && <ScrollProgress />}
      {!loading && <FloatingShapes />}
      {!loading && (
        <div className="app-wrapper">
          <Navbar activeSection={activeSection} lenis={lenisRef} />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Contact />
          </main>
          <Footer />
          <BackToTop lenis={lenisRef} />
        </div>
      )}
    </>
  )
}
