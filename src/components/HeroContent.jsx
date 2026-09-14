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
        I'm Harsh Choudhary{' '}
        <span
          className="hero-pill hero-pill-showcase"
          ref={pillRef}
          aria-hidden="true"
          style={{ visibility: 'hidden' }}
        />{' '}
        a{' '}
        <span className="purple hero-role-rotator">
          {/* Sizer reserves maximum width so title position never shifts when role changes */}
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
        <br />
        <span className="muted">I design</span>{' '}
        <span className="hero-pill">
          <img src="/images/hero-pill-2.webp" alt="Designer" />
        </span>{' '}
        Outstanding Digital Products
        <br />
        <span className="muted">Based in</span>{' '}
        <span className="hero-pill">
          <img src="/images/hero-pill-3.webp" alt="India" />
        </span>{' '}
        India
      </h1>

      <p className="hero-subtitle">
        We make it easy for startups to launch, grow, and scale with clean,
        conversion focused designs —no delays, no drama.
      </p>
    </div>
  )
}

export default HeroContent
