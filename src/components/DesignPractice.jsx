import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import './DesignPractice.css'

const practiceItems = [
  {
    num: '( 1 )',
    title: 'Interaction Design',
    subtitle: 'Micro-animations & transitions that guide users effortlessly.',
  },
  {
    num: '( 2 )',
    title: 'UI / UX Design',
    subtitle: 'Conversion-focused interfaces built on research and user psychology.',
  },
  {
    num: '( 3 )',
    title: 'Visual Design',
    subtitle: 'Typography, color, and layout that build trust and brand identity.',
  },
]

const DesignPractice = () => {
  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'center center'],
  })

  const rawRotate = useTransform(scrollYProgress, [0, 1], [-180, 0])
  const smoothRotate = useSpring(rawRotate, {
    damping: 24,
    stiffness: 80,
    mass: 0.8,
  })

  const counterRotate = useTransform(smoothRotate, r => -r)

  return (
    <section
      id="practice"
      ref={sectionRef}
      className="home-canvas practice-section"
      aria-labelledby="practice-title"
    >
      <div className="practice-inner">

        {/* LEFT: orbit visual */}
        <div className="practice-map" aria-labelledby="practice-title">
          <div className="orbit" aria-hidden="true" />

          <motion.div
            className="orbit-rotator"
            style={{ rotate: smoothRotate }}
          >
            <div className="discipline interaction">
              <motion.span style={{ rotate: counterRotate, display: 'inline-block' }}>
                Interaction<br />design
              </motion.span>
            </div>
            <div className="discipline interface">
              <motion.span style={{ rotate: counterRotate, display: 'inline-block' }}>
                UI/UX
              </motion.span>
            </div>
            <div className="discipline visual">
              <motion.span style={{ rotate: counterRotate, display: 'inline-block' }}>
                Visual<br />design
              </motion.span>
            </div>
          </motion.div>

          <h2 id="practice-title">
            My design<br />practice
          </h2>
        </div>

        {/* RIGHT: numbered list */}
        <div className="practice-list">
          {practiceItems.map((item, i) => (
            <div key={item.num} className="practice-list-item">
              <div className="practice-list-row">
                <span className="practice-list-num">{item.num}</span>
                <div className="practice-list-text">
                  <p className="practice-list-title">{item.title}</p>
                  <p className="practice-list-sub">{item.subtitle}</p>
                </div>
              </div>
              {i < practiceItems.length - 1 && (
                <div className="practice-list-divider" />
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default DesignPractice
