import ScrollReveal from './ScrollReveal'
import './ContactFooter.css'

const ContactFooter = () => {
  return (
    <footer className="footer-section" id="contact">
      <div className="footer-backdrop-overlay" />

      <div className="footer-container">
        <ScrollReveal>
          <div className="footer-content">
            <h2 className="footer-headline">Let's work together</h2>

            <p className="footer-description">
              I'm always looking for new projects and collaborations. If you have a project in mind, or just want to say hello, please get in touch.
            </p>

            <div className="footer-contact-info">
              <div className="footer-name">Harsh Choudhary</div>
              <a href="mailto:Harshchoudhary.ux@gmail.com" className="footer-email">
                Harshchoudhary.ux@gmail.com
              </a>
            </div>

            <div className="footer-actions">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="site-btn"
                aria-label="Instagram"
              >
                <span className="site-btn-text">Instagram</span>
                <span className="site-btn-icon">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5" stroke="#171717" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="site-btn"
                aria-label="LinkedIn"
              >
                <span className="site-btn-text">LinkedIn</span>
                <span className="site-btn-icon">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5" stroke="#171717" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </a>

              <a
                href="mailto:Harshchoudhary.ux@gmail.com"
                className="site-btn"
                aria-label="Gmail"
              >
                <span className="site-btn-text">Gmail</span>
                <span className="site-btn-icon">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5" stroke="#171717" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  )
}

export default ContactFooter
