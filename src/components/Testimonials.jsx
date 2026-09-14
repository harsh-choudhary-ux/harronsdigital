import { motion, AnimatePresence } from 'framer-motion'
import ScrollReveal from './ScrollReveal'
import { useCarousel } from '../context/CarouselContext'
import './Testimonials.css'

const testimonialsData = [
  {
    id: '01',
    number: '01',
    quote: '"Franklin turned our ideas into a sharp, clean brand. \nFast, easy, and right on point."',
    name: 'Ethan Moore',
    role: 'Co-founder,NovaTech',
    bgImage: '/images/testimonials-laptop-bg.webp',
  },
  {
    id: '02',
    number: '02',
    quote: '"Harron delivered a design so refined and intuitive that our demo conversions spiked by 140%."',
    name: 'Marcus Vance',
    role: 'VP of Product, HyperScale',
    bgImage: '/images/recent-work-wide.webp',
  },
  {
    id: '03',
    number: '03',
    quote: '"The attention to micro-interactions and conversion psychology set Harron apart from everyone."',
    name: 'Elena Rostova',
    role: 'Founder & CEO, Veloce AI',
    bgImage: '/images/recent-work-bg.webp',
  },
]

const Testimonials = () => {
  const { testimonialsIndex } = useCarousel()
  const currentItem = testimonialsData[testimonialsIndex]

  return (
    <section className="testimonials-section" id="testimonials">
      <div className="testimonials-container">
        {/* Header with Subtitle and Giant Heading */}
        <ScrollReveal>
          <div className="testimonials-header">
            <p className="testimonials-subtitle">(Why clients love Harron)</p>
            <div className="testimonials-title-wrap">
              <h2 className="testimonials-display-title">Testimonials</h2>
            </div>
          </div>
        </ScrollReveal>

        {/* The Two Cards Container */}
        <ScrollReveal delay={0.15}>
          <div className="testimonials-cards-row">
            {/* Left Metrics Card */}
            <div className="testimonials-metrics-card">
              {/* Smoky ink texture background */}
              <img
                src="/images/testimonials-stats-bg.webp"
                alt=""
                className="metrics-card-bg"
              />
              <div className="metrics-card-overlay" />
              <div className="metrics-card-noise" />

              {/* 3 Metric Blocks */}
              <div className="metrics-content">
                <div className="metric-block">
                  <div className="metric-num">40+</div>
                  <div className="metric-lbl">Finalized Projects</div>
                </div>

                <div className="metric-block">
                  <div className="metric-num">98%</div>
                  <div className="metric-lbl">Client satisfaction rate</div>
                </div>

                <div className="metric-block">
                  <div className="metric-num">500k</div>
                  <div className="metric-lbl">Gross Revenue</div>
                </div>
              </div>
            </div>

            {/* Right Testimonial Slider Card */}
            <div className="testimonials-slider-card">
              {/* Active Background Photo */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentItem.id + '-bg'}
                  src={currentItem.bgImage}
                  alt=""
                  className="slider-card-bg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                />
              </AnimatePresence>

              <div className="slider-card-overlay" />

              {/* Counter: 01 / 03 */}
              <div className="slider-counter-wrap">
                <div className="slider-counter-row">
                  <span className="slider-counter-curr">{currentItem.number}</span>
                  <span className="slider-counter-sep"> / 03</span>
                </div>
                <div className="slider-counter-divider" />
              </div>

              {/* Quote & Author */}
              <div className="slider-body">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentItem.id + '-body'}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                  >
                    <blockquote className="slider-quote-text">
                      {currentItem.quote}
                    </blockquote>

                    <div className="slider-author-info">
                      <span className="slider-author-name">{currentItem.name}</span>
                      <span className="slider-author-role">{currentItem.role}</span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

export default Testimonials
