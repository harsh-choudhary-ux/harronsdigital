import ScrollReveal from './ScrollReveal'
import './MeetFounder.css'

const MeetFounder = () => {
  return (
    <section className="meet-founder-section" id="about">
      <div className="meet-founder-container">
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
                <p className="founder-title">UI UX and Product Designer</p>
                <p className="founder-bio">
                  Over the past 3+ years, I've obsessed over the intersection where intuitive UI/UX design, product thinking, and high-velocity CRO mechanics meet. I founded Harron to eliminate bloated agency hierarchies—you collaborate directly with me, guaranteeing unmatched attention to microscopic details from the first wireframe to final deployment.
                </p>

                {/* Experience list below detail text */}
                <div className="founder-experience">
                  <div className="founder-exp-divider" />
                  <div className="founder-exp-list">
                    <div className="founder-exp-item">
                      <span className="founder-exp-role">Founder at Harrons</span>
                    </div>
                    <div className="founder-exp-item">
                      <span className="founder-exp-role">CRO Design Lead at Open Limits</span>
                    </div>
                    <div className="founder-exp-item">
                      <span className="founder-exp-role">Product Designer at Cybrom Technology</span>
                    </div>
                    <div className="founder-exp-item">
                      <span className="founder-exp-role">UI/UX Designer at Practice Paper</span>
                    </div>
                    <div className="founder-exp-item">
                      <span className="founder-exp-role">Frontend Designer at Skills Pinnacle</span>
                    </div>
                  </div>
                </div>
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
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" className="site-btn" aria-label="Instagram">
                    <span className="site-btn-text">Instagram</span>
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
                  <a href="mailto:Harshchoudhary.ux@gmail.com" className="site-btn" aria-label="Gmail">
                    <span className="site-btn-text">Gmail</span>
                    <span className="site-btn-icon">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <path d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5" stroke="#171717" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </a>
                </div>
              </div>
            </div>{/* end founder-content */}
          </div>{/* end founder-card */}
        </ScrollReveal>
      </div>
    </section>
  )
}

export default MeetFounder
