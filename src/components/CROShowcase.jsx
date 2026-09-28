import { useState, useRef } from 'react'
import ScrollReveal from './ScrollReveal'
import './CROShowcase.css'

const CROShowcase = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [impression, setImpression] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [wordError, setWordError] = useState(false)
  const dropdownRef = useRef(null)

  const countWords = (text) => text.trim().split(/\s+/).filter(Boolean).length

  const handleFeedbackChange = (e) => {
    const val = e.target.value
    const words = countWords(val)
    if (words <= 200) {
      setFeedback(val)
      setWordError(false)
    } else {
      setWordError(true)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!impression || submitting) return

    setSubmitting(true)
    setSubmitError('')

    try {
      const response = await fetch('https://formspree.io/f/xbglqgkv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          form: 'CRO Design Feedback',
          impression: IMPRESSIONS.find(i => i.value === impression)?.label || impression,
          thoughts: feedback || '(No comments provided)',
          email: email || '(No email provided)'
        })
      })

      if (response.ok) {
        setSubmitted(true)
      } else {
        const data = await response.json().catch(() => ({}))
        setSubmitError(data?.errors?.[0]?.message || 'Failed to submit. Please try again.')
      }
    } catch (err) {
      setSubmitError('Unable to send. Please check your internet connection.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleClose = () => {
    setModalOpen(false)
    setSubmitted(false)
    setSubmitting(false)
    setSubmitError('')
    setImpression('')
    setFeedback('')
    setEmail('')
    setWordError(false)
    setDropdownOpen(false)
  }

  const IMPRESSIONS = [
    { value: 'love', emoji: '❤️', label: 'Love it' },
    { value: 'okay', emoji: '😐', label: "It's okay" },
    { value: 'needs-work', emoji: '🔧', label: 'Needs work' },
  ]

  return (
    <section className="cro-showcase-section" id="cro">
      <div className="cro-showcase-container">
        {/* Header – same style as Testimonials */}
        <ScrollReveal>
          <div className="cro-showcase-header">
            <p className="cro-showcase-subtitle">(CRO Specialty · Flagship Case)</p>
            <div className="cro-showcase-title-wrap">
              <h2 className="cro-showcase-display-title">Conversion</h2>
            </div>
          </div>
        </ScrollReveal>

        {/* Main layout: Impact | Phones | What I used */}
        <ScrollReveal delay={0.15}>
          <div className="cro-showcase-body">

            {/* ─── LEFT: IMPACT ─── */}
            <div className="cro-impact-panel">
              <p className="cro-impact-label">IMPACT</p>
              <div className="cro-impact-stats">
                <div className="cro-stat cro-stat--positive">
                  <span className="cro-stat-num">+18%</span>
                  <span className="cro-stat-name">AOV</span>
                </div>
                <div className="cro-stat cro-stat--negative">
                  <span className="cro-stat-num">-15%</span>
                  <span className="cro-stat-name">Cart Abandonment</span>
                </div>
                <div className="cro-stat cro-stat--positive">
                  <span className="cro-stat-num">+22%</span>
                  <span className="cro-stat-name">Checkout Completion</span>
                </div>
              </div>
              <p className="cro-ab-note">4-week A/B test · 50/50 split<br />stat. sig. p&lt;0.05</p>
            </div>

            {/* ─── CENTER: IMAGES ─── */}
            <div className="cro-phones-panel">
              <div className="cro-phones-row">
                {/* Before Image */}
                <div className="cro-img-wrap">
                  <span className="cro-phase-label">BEFORE CRO</span>
                  <img
                    src="/images/Image ( before ).png"
                    alt="Before CRO"
                    className="cro-plain-img"
                  />
                </div>

                {/* After Image */}
                <div className="cro-img-wrap cro-img-wrap--after">
                  <span className="cro-phase-label">AFTER CRO</span>
                  <img
                    src="/images/Image ( after ).png"
                    alt="After CRO"
                    className="cro-plain-img"
                  />
                </div>
              </div>

              {/* ─── FEEDBACK BUTTON ─── */}
              <button
                id="cro-feedback-btn"
                className="cro-feedback-btn"
                onClick={() => setModalOpen(true)}
              >
                <span className="cro-feedback-btn-text">Does this design work?</span>
              </button>
            </div>

            {/* ─── RIGHT: WHAT I USED ─── */}
            <div className="cro-methods-panel">
              <h3 className="cro-methods-title">What I used and why</h3>
              <div className="cro-methods-list">
                <div className="cro-method-item">
                  <h4 className="cro-method-name">Hotjar heatmaps</h4>
                  <p className="cro-method-desc">
                    Found: 23% of mobile users never scrolled past the product image →<br />
                    Compacted the title and price area so key purchase info appears sooner
                  </p>
                </div>
                <div className="cro-method-item">
                  <h4 className="cro-method-name">A/B Testing</h4>
                  <p className="cro-method-desc">
                    Tested: Original page vs. a variant with the sale price and strikethrough, a low-stock urgency label, a size guide link and a short product description
                  </p>
                </div>
                <div className="cro-method-item">
                  <h4 className="cro-method-name">GA4 Funnel Analysis</h4>
                  <p className="cro-method-desc">
                    Found: 35% drop-off at shipping-cost reveal step →<br />
                    Moved shipping estimator earlier in the flow
                  </p>
                </div>
                <div className="cro-method-item">
                  <h4 className="cro-method-name">Session Recordings</h4>
                  <p className="cro-method-desc">
                    Found: Users rage-clicking a non-clickable trust badge →<br />
                    Made trust signals interactive/expandable
                  </p>
                </div>
              </div>
            </div>

          </div>
        </ScrollReveal>
      </div>

      {/* ─── FEEDBACK MODAL ─── */}
      {modalOpen && (
        <div className="cro-modal-overlay" onClick={handleClose}>
          <div className="cro-modal" onClick={(e) => e.stopPropagation()}>
            <button className="cro-modal-close" onClick={handleClose} aria-label="Close">✕</button>

            {!submitted ? (
              <>
                <h2 className="cro-modal-title">Suggest a feedback</h2>
                <p className="cro-modal-subtitle">Share your honest take on this design.</p>

                <form className="cro-modal-form" onSubmit={handleSubmit}>

                  {/* Custom Dropdown */}
                  <div className="cro-form-group">
                    <label className="cro-form-label">Overall impression</label>
                    <div className="cro-custom-select" ref={dropdownRef}>
                      <button
                        type="button"
                        className={`cro-select-trigger${dropdownOpen ? ' open' : ''}`}
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                      >
                        <span className="cro-select-value">
                          {impression
                            ? <>{IMPRESSIONS.find(i => i.value === impression)?.emoji} {IMPRESSIONS.find(i => i.value === impression)?.label}</>
                            : <span className="cro-select-placeholder">Select your impression…</span>
                          }
                        </span>
                        <span className={`cro-select-chevron${dropdownOpen ? ' up' : ''}`}>
                          <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                            <path d="M1 1l5 5 5-5" stroke="#888" strokeWidth="1.5" strokeLinecap="round"/>
                          </svg>
                        </span>
                      </button>
                      {dropdownOpen && (
                        <div className="cro-select-dropdown">
                          {IMPRESSIONS.map(opt => (
                            <button
                              key={opt.value}
                              type="button"
                              className={`cro-select-option${impression === opt.value ? ' selected' : ''}`}
                              onClick={() => { setImpression(opt.value); setDropdownOpen(false) }}
                            >
                              <span className="cro-option-emoji">{opt.emoji}</span>
                              <span>{opt.label}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Textarea */}
                  <div className="cro-form-group">
                    <label className="cro-form-label" htmlFor="cro-feedback-text">
                      Your thoughts
                      <span className="cro-word-count">{countWords(feedback)} / 200 words</span>
                    </label>
                    <textarea
                      id="cro-feedback-text"
                      className={`cro-form-textarea${wordError ? ' cro-textarea--error' : ''}`}
                      placeholder="Tell me what works, what doesn't, and why…"
                      value={feedback}
                      onChange={handleFeedbackChange}
                      rows={4}
                    />
                    {wordError && <p className="cro-error-msg">Maximum 200 words reached.</p>}
                  </div>

                  {/* Email / Let's Connect */}
                  <div className="cro-form-group">
                    <label className="cro-form-label" htmlFor="cro-connect-email">Let's connect <span className="cro-optional">(optional)</span></label>
                    <input
                      id="cro-connect-email"
                      type="email"
                      className="cro-email-input"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                    />
                  </div>

                  {submitError && (
                    <p className="cro-error-msg" style={{ marginBottom: '12px', textAlign: 'center' }}>
                      {submitError}
                    </p>
                  )}

                  <button
                    type="submit"
                    id="cro-submit-feedback"
                    className="cro-modal-submit"
                    disabled={!impression || submitting}
                  >
                    {submitting ? 'Submitting…' : 'Submit feedback'}
                  </button>
                </form>
              </>
            ) : (
              <div className="cro-modal-success">
                <div className="cro-success-icon">✓</div>
                <h2 className="cro-modal-title">Thanks for your feedback!</h2>
                <p className="cro-modal-subtitle">Your input helps me improve this design.</p>
                <button className="cro-modal-submit" onClick={handleClose}>Close</button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}

export default CROShowcase

