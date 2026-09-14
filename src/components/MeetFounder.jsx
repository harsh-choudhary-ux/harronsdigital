import ScrollReveal from './ScrollReveal'
import './MeetFounder.css'

const MeetFounder = () => {
  return (
    <section className="meet-founder" id="about">
      <ScrollReveal>
        <div className="founder-card">
          <div className="founder-image-wrapper">
            <img src="/images/founder.webp" alt="Harsh Choudhary - Founder & Lead Designer" />
          </div>

          <div className="founder-content">
            <div>
              <div className="founder-badge">
                <span>●</span> Behind the Studio
              </div>
              <h2 className="founder-name">Hey, I'm Harsh Choudhary</h2>
              <p className="founder-title">Founder & Lead Creative Technologist</p>
              <p className="founder-bio">
                Over the past 8+ years, I've obsessed over the intersection where emotive graphic art meets high-velocity conversion mechanics. I founded Harron to eliminate bloated agency hierarchies—you collaborate directly with me, guaranteeing unmatched attention to microscopic details from the first wireframe to final deployment.
              </p>
            </div>

            <div>
              <div className="founder-stats">
                <div className="founder-stat-item">
                  <h4>40+</h4>
                  <p>Finalized Projects</p>
                </div>
                <div className="founder-stat-item">
                  <h4>98%</h4>
                  <p>Client Satisfaction Rate</p>
                </div>
                <div className="founder-stat-item">
                  <h4>500K</h4>
                  <p>Gross Revenue</p>
                </div>
              </div>

              <div className="founder-socials">
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="site-btn" aria-label="Twitter / X">
                  <span className="site-btn-text">Twitter / X</span>
                  <span className="site-btn-icon">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5" stroke="#171717" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="site-btn" aria-label="LinkedIn">
                  <span className="site-btn-text">LinkedIn</span>
                  <span className="site-btn-icon">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5" stroke="#171717" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </a>
                <a href="https://dribbble.com" target="_blank" rel="noreferrer" className="site-btn" aria-label="Dribbble">
                  <span className="site-btn-text">Dribbble</span>
                  <span className="site-btn-icon">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5" stroke="#171717" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </a>
                <a href="https://readcv.com" target="_blank" rel="noreferrer" className="site-btn" aria-label="ReadCV">
                  <span className="site-btn-text">ReadCV</span>
                  <span className="site-btn-icon">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5" stroke="#171717" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}

export default MeetFounder
