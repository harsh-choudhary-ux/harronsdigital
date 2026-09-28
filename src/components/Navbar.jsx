import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Navbar.css'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [connectOpen, setConnectOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [connectSubmitted, setConnectSubmitted] = useState(false)
  const emailRef = useRef(null)

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
          <a href="#hero" onClick={(e) => scrollToSection(e, 'hero')} className="navbar-logo" aria-label="Harron home">
            <img
              src="/Harrons logo.svg"
              alt="Harron logo"
              className="navbar-logo-img"
            />
          </a>

          <div className="navbar-links">
            <a href="#works" onClick={(e) => scrollToSection(e, 'works')}>Works</a>
            <a href="#how-we-work" onClick={(e) => scrollToSection(e, 'how-we-work')}>Process</a>
            <a href="#about" onClick={(e) => scrollToSection(e, 'about')}>About</a>
            <a href="#faq" onClick={(e) => scrollToSection(e, 'faq')}>FAQ</a>
          </div>

          <div className="navbar-actions">
            <a
              href="/Harsh%20Choudhary%20CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="navbar-resume-btn"
              aria-label="Download Resume"
              download="Harsh Choudhary CV.pdf"
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
            <a
              href="/Harsh%20Choudhary%20CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="Harsh Choudhary CV.pdf"
              className="mobile-resume-link"
              onClick={() => setMobileOpen(false)}
            >
              Resume ↓
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── LET'S CONNECT MODAL ─── */}
      <AnimatePresence>
        {connectOpen && (
          <motion.div
            className="connect-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setConnectOpen(false)}
          >
            <motion.div
              className="connect-modal"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 340, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="connect-modal-close" onClick={() => setConnectOpen(false)} aria-label="Close">✕</button>

              {!connectSubmitted ? (
                <>
                  <p className="connect-modal-eyebrow">Say hello 👋</p>
                  <h2 className="connect-modal-title">Let's Connect</h2>
                  <p className="connect-modal-sub">Drop your email and I'll reach out shortly.</p>

                  <form
                    className="connect-modal-form"
                    onSubmit={(e) => { e.preventDefault(); if (email) setConnectSubmitted(true) }}
                  >
                    <div className="connect-input-wrap">
                      <input
                        id="connect-email-input"
                        ref={emailRef}
                        type="email"
                        className="connect-email-input"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                      />
                    </div>
                    <button
                      id="connect-submit-btn"
                      type="submit"
                      className="connect-submit-btn"
                      disabled={!email}
                    >
                      <span>Send it</span>
                      <span className="connect-submit-icon">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                          <path d="M2 7h10M7 2l5 5-5 5" stroke="#171717" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    </button>
                  </form>
                </>
              ) : (
                <div className="connect-modal-success">
                  <div className="connect-success-icon">✓</div>
                  <h2 className="connect-modal-title">You're on the list!</h2>
                  <p className="connect-modal-sub">Thanks! I'll be in touch soon.</p>
                  <button className="connect-submit-btn" style={{marginTop:'8px'}} onClick={() => setConnectOpen(false)}>Close</button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
