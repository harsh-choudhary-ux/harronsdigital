import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Navbar.css'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (e, id) => {
    e.preventDefault()
    setMobileOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <div className="navbar-wrapper">
        <motion.div
          className="top-tab-container"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <svg className="tab-wing tab-wing-left" width="38" height="38" viewBox="0 0 38 38" fill="none" aria-hidden="true">
            <path d="M0 0C10.49 0 19 8.51 19 19C19 29.49 27.51 38 38 38V0H0Z" fill="#353535" />
          </svg>
          <div className="top-available-tab">
            <span className="top-available-dot"></span>
            <span className="top-available-text">Available for the projects</span>
          </div>
          <svg className="tab-wing tab-wing-right" width="38" height="38" viewBox="0 0 38 38" fill="none" aria-hidden="true">
            <path d="M0 38C10.49 38 19 29.49 19 19C19 8.51 27.51 0 38 0H0V38Z" fill="#353535" />
          </svg>
        </motion.div>

        <motion.nav
          className={`navbar ${scrolled ? 'scrolled' : ''}`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <a href="#hero" onClick={(e) => scrollToSection(e, 'hero')} className="navbar-logo">
            Harron.
          </a>

          <div className="navbar-links">
            <a href="#works" onClick={(e) => scrollToSection(e, 'works')}>Works</a>
            <a href="#how-we-work" onClick={(e) => scrollToSection(e, 'how-we-work')}>Process</a>
            <a href="#about" onClick={(e) => scrollToSection(e, 'about')}>About</a>
            <a href="#faq" onClick={(e) => scrollToSection(e, 'faq')}>FAQ</a>
          </div>

          <div className="navbar-actions">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="navbar-resume-btn"
              aria-label="Download Resume"
            >
              <span className="resume-btn-text">RESUME</span>
              <span className="resume-btn-icon">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M7 2.5V11.5M7 11.5L3.5 8M7 11.5L10.5 8" stroke="#171717" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </a>
          </div>

          <button className="navbar-toggle" onClick={() => setMobileOpen(true)} aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </motion.nav>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-menu open"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <button className="mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close menu">
              ×
            </button>
            <a href="#hero" onClick={(e) => scrollToSection(e, 'hero')}>Home</a>
            <a href="#works" onClick={(e) => scrollToSection(e, 'works')}>Works</a>
            <a href="#how-we-work" onClick={(e) => scrollToSection(e, 'how-we-work')}>Process</a>
            <a href="#about" onClick={(e) => scrollToSection(e, 'about')}>About</a>
            <a href="#faq" onClick={(e) => scrollToSection(e, 'faq')}>FAQ</a>
            <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')}>Contact</a>


          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
