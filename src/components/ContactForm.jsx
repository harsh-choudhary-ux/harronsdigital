import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollReveal from './ScrollReveal'
import './ContactForm.css'

const budgetOptions = [
  { value: '$3k - $5k', label: '$3k – $5k (MVP Landing Page)' },
  { value: '$5k - $10k', label: '$5k – $10k (Full Redesign Sprint)' },
  { value: '$10k - $25k', label: '$10k – $25k (Multi-page Platform)' },
  { value: '$25k+', label: '$25k+ (Enterprise Retainer)' },
]

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    budget: '$5k - $10k',
    message: '',
  })
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectedBudgetLabel =
    budgetOptions.find((opt) => opt.value === formData.budget)?.label ||
    formData.budget

  const handleSelectBudget = (val) => {
    setFormData((prev) => ({ ...prev, budget: val }))
    setDropdownOpen(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <section className="contact-form-section" id="contact">
      <div className="contact-container">
        <div className="contact-grid">
          {/* Left Column: Context & Direct Inquiry */}
          <ScrollReveal>
            <div className="contact-info-col">
              <div className="contact-badge">
                <span>●</span> Start A Project
              </div>
              <h2 className="contact-headline">
                Let's create something <span className="highlight-text">remarkable</span> together.
              </h2>
              <p className="contact-subtext">
                Have a visionary project in mind or looking to overhaul your existing site? We're actively taking on new design & Framer sprint clients.
              </p>

              <div className="contact-direct-card">
                <span className="direct-label">Direct Inquiry</span>
                <a href="mailto:Harshchoudhary.ux@gmail.com" className="direct-email-link">
                  Harshchoudhary.ux@gmail.com ↗
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Form with Fixed Custom Dropdown */}
          <ScrollReveal delay={0.15}>
            <div className="contact-form-card">
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="contact-name" className="form-label">
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="e.g. Marcus Vance"
                    className="form-input"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-email" className="form-label">
                    Work Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="e.g. marcus@company.com"
                    className="form-input"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                {/* Custom Accessible Dropdown with Flawless Padding & Centering */}
                <div className="form-group" ref={dropdownRef}>
                  <label className="form-label">Estimated Budget</label>
                  <div className="custom-select-wrapper">
                    <button
                      type="button"
                      className={`custom-select-trigger ${dropdownOpen ? 'is-open' : ''}`}
                      onClick={() => setDropdownOpen((prev) => !prev)}
                      aria-haspopup="listbox"
                      aria-expanded={dropdownOpen}
                    >
                      <span className="selected-value-text">{selectedBudgetLabel}</span>
                      <span className={`select-chevron ${dropdownOpen ? 'rotated' : ''}`}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path
                            d="M3.5 5.25L7 8.75L10.5 5.25"
                            stroke="currentColor"
                            strokeWidth="1.75"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </button>

                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.ul
                          className="custom-select-options"
                          role="listbox"
                          initial={{ opacity: 0, y: -6, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -6, scale: 0.98 }}
                          transition={{ duration: 0.16, ease: 'easeOut' }}
                        >
                          {budgetOptions.map((opt) => {
                            const isSelected = opt.value === formData.budget
                            return (
                              <li
                                key={opt.value}
                                className={`custom-option-item ${isSelected ? 'selected' : ''}`}
                                onClick={() => handleSelectBudget(opt.value)}
                                role="option"
                                aria-selected={isSelected}
                              >
                                <span className="option-label">{opt.label}</span>
                                {isSelected && (
                                  <span className="option-check">
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                      <path
                                        d="M2.5 7L5.5 10L11.5 4"
                                        stroke="#5C59E8"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </span>
                                )}
                              </li>
                            )
                          })}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message" className="form-label">
                    Tell Us About Your Vision
                  </label>
                  <textarea
                    id="contact-message"
                    rows="4"
                    required
                    placeholder="Briefly describe what you are looking to design or build..."
                    className="form-textarea"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button type="submit" className="form-submit-btn site-btn">
                  <span className="site-btn-text">
                    {submitted ? 'Inquiry Received! ✓' : 'Send Message'}
                  </span>
                  <span className="site-btn-icon">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path
                        d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5"
                        stroke="#171717"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

export default ContactForm
