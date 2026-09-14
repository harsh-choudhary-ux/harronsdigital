import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Preloader.css'

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0)
  const [isFinished, setIsFinished] = useState(false)

  useEffect(() => {
    // Disable scrolling during preloader
    document.body.style.overflow = 'hidden'
    if (window.lenis) {
      window.lenis.stop()
    }

    let isMounted = true
    let current = 0

    // Random pause milestones during the count
    const pause1 = Math.floor(Math.random() * 8) + 28 // 28-35%
    const pause2 = Math.floor(Math.random() * 8) + 64 // 64-71%

    let timerId = null

    const step = () => {
      if (!isMounted) return

      if (current < 100) {
        current += 1
        setProgress(current)

        // Slow-mo deliberate counting speed (~32-48ms per number)
        let nextDelay = Math.floor(Math.random() * 16) + 32

        // Mid-way random breaks
        if (current === pause1) {
          nextDelay = Math.floor(Math.random() * 100) + 360 // ~360-460ms pause
        } else if (current === pause2) {
          nextDelay = Math.floor(Math.random() * 100) + 380 // ~380-480ms pause
        } else if (current >= 95 && current < 99) {
          nextDelay = Math.floor(Math.random() * 20) + 55 // gradual deceleration near 99
        } else if (current === 99) {
          // Specific requirement: pause at 99 before transitioning to 100
          nextDelay = 550 // 550ms break at 99%
        }

        timerId = setTimeout(step, nextDelay)
      } else {
        // Reached 100%: take another break before smoothly revealing the website
        timerId = setTimeout(() => {
          if (!isMounted) return
          setIsFinished(true)
          document.body.style.overflow = ''
          if (window.lenis) {
            window.lenis.start()
          }
          if (onComplete) {
            onComplete()
          }
        }, 600) // 600ms break at 100%
      }
    }

    timerId = setTimeout(step, 160)

    return () => {
      isMounted = false
      if (timerId) clearTimeout(timerId)
      document.body.style.overflow = ''
      if (window.lenis) {
        window.lenis.start()
      }
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          className="preloader-overlay"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
          }}
        >
          <div className="preloader-center">
            <span className="preloader-number">{progress}%</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Preloader
