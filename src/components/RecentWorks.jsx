import { motion, AnimatePresence } from 'framer-motion'
import ScrollReveal from './ScrollReveal'
import { useCarousel } from '../context/CarouselContext'
import './RecentWorks.css'

const worksData = [
  {
    id: '01',
    number: '01',
    title: 'Archin',
    year: '2024',
    role: 'Spatial Designer',
    services: ['Architecture', 'Branding', 'Framer 3D', 'Strategy'],
    bgImage: '/images/showcase-1.webp',
    posterImage: '/images/showcase-1.webp',
    description: 'We’ve collaborated with companies from diverse sectors to turn their visions into reality. Here’s a look at some of our featured work.',
  },
  {
    id: '02',
    number: '02',
    title: 'FinCraft',
    year: '2024',
    role: 'Lead UI/UX Designer',
    services: ['FinTech', 'Dashboard', 'Brand Strategy', 'Development'],
    bgImage: '/images/showcase-2.webp',
    posterImage: '/images/showcase-2.webp',
    description: 'We’ve collaborated with companies from diverse sectors to turn their visions into reality. Here’s a look at some of our featured work.',
  },
  {
    id: '03',
    number: '03',
    title: 'Aeorim',
    year: '2023',
    role: 'Website Designer',
    services: ['Branding', 'Revamp', 'Development', 'Designing'],
    bgImage: '/images/recent-work-bg.webp',
    posterImage: '/images/recent-work-poster.webp',
    description: 'We’ve collaborated with companies from diverse sectors to turn their visions into reality. Here’s a look at some of our featured work.',
  },
]

const RecentWorks = () => {
  const { worksIndex } = useCarousel()
  const currentWork = worksData[worksIndex]

  return (
    <section className="recent-works-section" id="works">
      <div className="recent-works-wrapper">
        {/* Top Header */}
        <ScrollReveal>
          <div className="recent-works-header">
            <p className="recent-works-subtitle">(Selected Works)</p>
            <div className="recent-works-title-container">
              <h2 className="recent-works-display-title">Recent Works</h2>
            </div>
          </div>
        </ScrollReveal>

        {/* Showcase Glass Card */}
        <ScrollReveal delay={0.15}>
          <div className="recent-works-card">
            {/* Blurred Background Image */}
            <AnimatePresence mode="wait">
              <motion.img
                key={currentWork.id + '-bg'}
                src={currentWork.bgImage}
                alt=""
                className="card-bg-blurred"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
              />
            </AnimatePresence>

            {/* Dark Frosted Blur Overlay */}
            <div className="card-overlay-dark" />

            {/* Noise Texture Layer */}
            <div className="card-noise-layer" />

            {/* Inner Content Grid */}
            <div className="card-content-grid">
              {/* Left Column */}
              <div className="card-col card-col-left">
                <div className="card-problem-solution">
                  <div className="card-ps-block">
                    <span className="card-ps-label">Problem</span>
                    <p className="card-intro-text">
                      We've collaborated with companies from diverse sectors to turn their visions into reality. Here's a look at some of our featured work.
                    </p>
                  </div>
                </div>

                <div className="card-brand-meta">
                  <div className="card-counter-container">
                    <div className="card-counter-row">
                      <span className="counter-curr">{currentWork.number}</span>
                      <span className="counter-sep"> / 03</span>
                    </div>
                    <div className="card-counter-divider" />
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.h3
                      key={currentWork.id + '-title'}
                      className="card-brand-title"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.4 }}
                    >
                      {currentWork.title}
                    </motion.h3>
                  </AnimatePresence>
                </div>
              </div>

              {/* Center Column: Sharp Poster Preview */}
              <div className="card-col card-col-center">
                <div className="card-poster-wrapper">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentWork.id + '-poster'}
                      src={currentWork.posterImage}
                      alt={currentWork.title}
                      className="card-poster-image"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </AnimatePresence>
                  <div className="card-poster-border-outer" />
                  <div className="card-poster-border-inner" />
                </div>
              </div>

              {/* Right Column: Metadata & Services */}
              <div className="card-col card-col-right">
                <div className="card-meta-top">
                  <div className="card-meta-group">
                    <span className="meta-label">Year</span>
                    <span className="meta-value-year">{currentWork.year}</span>
                  </div>

                  <div className="card-meta-group meta-role-group">
                    <span className="meta-label">Role</span>
                    <span className="meta-value-role">{currentWork.role}</span>
                  </div>

                  {/* View in Figma Button */}
                  <a
                    href={currentWork.figmaUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="figma-btn"
                  >
                    <span className="figma-btn-icon">
                      <svg width="14" height="14" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 28.5C19 25.6826 20.1062 22.9847 22.0754 21.0157C24.0447 19.0466 26.7428 17.9406 29.5604 17.9406C32.378 17.9406 35.0761 19.0466 37.0454 21.0157C39.0146 22.9847 40.1208 25.6826 40.1208 28.5C40.1208 31.3174 39.0146 34.0153 37.0454 35.9843C35.0761 37.9534 32.378 39.0594 29.5604 39.0594C26.7428 39.0594 24.0447 37.9534 22.0754 35.9843C20.1062 34.0153 19 31.3174 19 28.5Z" fill="#1ABCFE"/>
                        <path d="M0 47.0594C0 44.242 1.10618 41.5441 3.07541 39.575C5.04464 37.606 7.74276 36.5 10.5604 36.5H19V47.0594C19 49.8768 17.8938 52.5747 15.9246 54.5437C13.9554 56.5128 11.2572 57.6188 8.43978 57.6188C5.62232 57.6188 2.92421 56.5128 0.954982 54.5437C-1.01425 52.5747 0 49.8768 0 47.0594H0Z" fill="#0ACF83"/>
                        <path d="M19 0V17.9406H29.5604C32.378 17.9406 35.0761 16.8346 37.0454 14.8655C39.0146 12.8965 40.1208 10.1986 40.1208 7.38125C40.1208 4.56389 39.0146 1.86599 37.0454 -0.103039C35.0761 -2.07207 32.378 -3.17808 29.5604 -3.17808L19 0Z" fill="#FF7262"/>
                        <path d="M0 7.38125C0 10.1986 1.10618 12.8965 3.07541 14.8655C5.04464 16.8346 7.74276 17.9406 10.5604 17.9406H19V0L10.5604 0C7.74276 0 5.04464 1.10601 3.07541 3.07504C1.10618 5.04407 0 7.74197 0 7.38125Z" fill="#F24E1E"/>
                        <path d="M0 28.5C0 31.3174 1.10618 34.0153 3.07541 35.9843C5.04464 37.9534 7.74276 39.0594 10.5604 39.0594H19V17.9406H10.5604C7.74276 17.9406 5.04464 19.0466 3.07541 21.0157C1.10618 22.9847 0 25.6826 0 28.5Z" fill="#A259FF"/>
                      </svg>
                    </span>
                    <span className="figma-btn-text">View in Figma</span>
                    <span className="figma-btn-arrow">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </a>
                </div>

                <div className="card-meta-bottom">
                  <div className="card-ps-block">
                    <span className="card-ps-label">Solution</span>
                    <p className="card-intro-text">
                      We've collaborated with companies from diverse sectors to turn their visions into reality. Here's a look at some of our featured work.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

export default RecentWorks
