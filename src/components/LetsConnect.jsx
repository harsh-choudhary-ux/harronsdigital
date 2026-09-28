import ScrollReveal from './ScrollReveal'
import './LetsConnect.css'

const SOCIALS = [
  {
    id: 'connect-linkedin',
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M5 7.5V15M5 5v.01M10 15v-4a2 2 0 014 0v4m0-4v4M10 11V7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="2" y="2" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="1.6"/>
      </svg>
    ),
  },
  {
    id: 'connect-instagram',
    label: 'Instagram',
    href: 'https://instagram.com',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="16" height="16" rx="5" stroke="currentColor" strokeWidth="1.6"/>
        <circle cx="10" cy="10" r="3.5" stroke="currentColor" strokeWidth="1.6"/>
        <circle cx="14.5" cy="5.5" r="0.75" fill="currentColor"/>
      </svg>
    ),
  },
  {
    id: 'connect-gmail',
    label: 'Gmail',
    href: 'mailto:Harshchoudhary.ux@gmail.com',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.6"/>
        <path d="M2 6l8 5 8-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
  },
]

const LetsConnect = () => {
  return (
    <section className="lc-section" id="lets-connect">
      <div className="lc-container">

        <ScrollReveal>
          <div className="lc-header">
            <p className="lc-eyebrow">Open to opportunities</p>
            <h2 className="lc-headline">
              Let's <span className="lc-headline-accent">Connect</span>
            </h2>
            <p className="lc-subtext">
              Whether you have a project, a question, or just want to say hi — my inbox is always open.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <a
            id="connect-email-cta"
            href="mailto:Harshchoudhary.ux@gmail.com"
            className="lc-email-cta"
          >
            <span className="lc-email-text">Harshchoudhary.ux@gmail.com</span>
            <span className="lc-email-arrow">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M4 14L14 4M14 4H6M14 4v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </a>
        </ScrollReveal>

        <ScrollReveal delay={0.18}>
          <div className="lc-socials">
            {SOCIALS.map((s) => (
              <a
                key={s.id}
                id={s.id}
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="lc-social-pill"
                aria-label={s.label}
              >
                {s.icon}
                <span>{s.label}</span>
              </a>
            ))}
          </div>
        </ScrollReveal>

        {/* Decorative rule */}
        <div className="lc-divider" />

        <ScrollReveal delay={0.22}>
          <p className="lc-footer-note">Harsh Choudhary · UX Designer · 2025</p>
        </ScrollReveal>

      </div>
    </section>
  )
}

export default LetsConnect
