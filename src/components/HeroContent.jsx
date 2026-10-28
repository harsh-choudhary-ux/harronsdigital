import BlurText from './BlurText'

export const ROLES = ['UI UX Designer', 'CRO Designer', 'Product Designer']
export const LONGEST_ROLE = ROLES.reduce((a, b) => (a.length > b.length ? a : b), '')

/**
 * Shared hero headline + subtitle content.
 * Rendered twice in HeroSection — once for the ghost (white) layer
 * and once for the normal (dark) layer — with identical markup.
 */
const HeroContent = ({
  isGhost = false,
  liveTime,
  currentRole = 'UI UX Designer',
  style = {},
  pillRef = null,
}) => {
  return (
    <div
      className={`hero-content-inner ${isGhost ? 'hero-content-ghost' : 'hero-content-normal'}`}
      style={style}
    >
      <div className="hero-live-time">
        IST ( {liveTime || '11:47:00 PM'} )
      </div>

      <h1 className="hero-headline">
        <span className="hero-headline-line">
          I'm Harsh Choudhary{' '}
          <span
            className="hero-pill hero-pill-showcase"
            ref={pillRef}
            aria-hidden="true"
            style={{ visibility: 'hidden' }}
          />{' '}
          a{' '}
          <span className="purple hero-role-rotator">
            <span className="hero-role-sizer" aria-hidden="true">
              {LONGEST_ROLE}
            </span>
            <span className="hero-role-current">
              <BlurText
                text={currentRole}
                stepDuration={0.38}
                direction="top"
                as="span"
              />
            </span>
          </span>
        </span>
        <br />
        <span className="hero-headline-line">
          <span className="muted">I design</span>{' '}
          <span className="hero-pill">
            <img src="/images/hero-pill-2.webp" alt="Designer" />
          </span>{' '}
          Outstanding Digital Products
        </span>
        <br />
        <span className="hero-headline-line">
          <span className="muted">Based in</span>{' '}
          <span className="hero-pill">
            <img src="/images/hero-pill-3.webp" alt="India" />
          </span>{' '}
          India
        </span>
      </h1>

      <p className="hero-subtitle">
        UI/UX Designer and CRO Specialist helping DTC e-commerce brands and product teams turn user friction into measurable growth.
      </p>

      <div className="hero-kpi-row">
        <div className="hero-kpi-card">
          <span className="hero-kpi-num">40+</span>
          <span className="hero-kpi-lbl">Brands Shipped</span>
        </div>
        <div className="hero-kpi-divider" />
        <div className="hero-kpi-card">
          <span className="hero-kpi-num">$500K+</span>
          <span className="hero-kpi-lbl">Revenue Impact</span>
        </div>
        <div className="hero-kpi-divider" />
        <div className="hero-kpi-card">
          <span className="hero-kpi-num">500+</span>
          <span className="hero-kpi-lbl">User Enterprise Systems</span>
        </div>
        <div className="hero-kpi-divider" />
        <div className="hero-kpi-card">
          <span className="hero-kpi-num">95%</span>
          <span className="hero-kpi-lbl">Client Satisfaction</span>
        </div>
      </div>
    </div>
  )
}

export default HeroContent
