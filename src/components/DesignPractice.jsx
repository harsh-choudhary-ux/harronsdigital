import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import './DesignPractice.css'

const DesignPractice = () => {
  const sectionRef = useRef(null)

  // Track scroll into section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'center center'],
  })

  // Rotate balls around orbit from -180deg to 0deg as section scrolls into center view
  const rawRotate = useTransform(scrollYProgress, [0, 1], [-180, 0])
  const smoothRotate = useSpring(rawRotate, {
    damping: 24,
    stiffness: 80,
    mass: 0.8,
  })

  // Counter-rotate text so labels remain upright throughout the orbit rotation
  const counterRotate = useTransform(smoothRotate, r => -r)

  return (
    <section
      id="practice"
      ref={sectionRef}
      className="home-canvas practice-section"
      aria-labelledby="practice-title"
    >
      <div className="practice-map" aria-labelledby="practice-title">
        <div className="orbit" aria-hidden="true" />

        {/* Orbit Rotator Container: orbits balls into exact final position */}
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
    </section>
  )
}

export default DesignPractice
