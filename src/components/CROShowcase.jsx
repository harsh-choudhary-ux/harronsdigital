import ScrollReveal from './ScrollReveal'
import './CROShowcase.css'

const CROShowcase = () => {
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
            </div>

            {/* ─── RIGHT: WHAT I USED ─── */}
            <div className="cro-methods-panel">
              <h3 className="cro-methods-title">What I used and why</h3>
              <div className="cro-methods-list">
                <div className="cro-method-item">
                  <h4 className="cro-method-name">Hotjar heatmaps</h4>
                  <p className="cro-method-desc">
                    Found: 40% of users never scrolled past hero →<br />
                    Moved primary CTA above the fold
                  </p>
                </div>
                <div className="cro-method-item">
                  <h4 className="cro-method-name">A/B Testing</h4>
                  <p className="cro-method-desc">
                    Found: CTA color blended into brand palette →<br />
                    High-contrast variant, ran to stat. significance before shipping
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
    </section>
  )
}

export default CROShowcase
