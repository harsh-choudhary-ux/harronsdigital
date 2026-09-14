import { motion, AnimatePresence } from 'framer-motion'
import { useRef, useMemo } from 'react'

const BlurText = ({
  text = '',
  delay = 50,
  className = '',
  animateBy = 'words', // 'words' | 'text'
  direction = 'top',
  stepDuration = 0.38,
  as = 'span',
  style = {}
}) => {
  const elements = useMemo(() => {
    return animateBy === 'words' ? text.split(' ') : [text]
  }, [text, animateBy])

  const Component = as

  // Direction dictates the vertical path:
  // direction='top' -> incoming comes from -y (up) down to 0; outgoing goes from 0 down to +y (down)
  const isFromTop = direction === 'top'
  const enterY = isFromTop ? -32 : 32
  const exitY = isFromTop ? 32 : -32

  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.04
      }
    },
    exit: {
      transition: {
        staggerChildren: 0.03
      }
    }
  }

  const wordVariants = {
    initial: {
      y: enterY,
      opacity: 0,
      filter: 'blur(10px)'
    },
    animate: {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        duration: stepDuration,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    exit: {
      y: exitY,
      opacity: 0,
      filter: 'blur(10px)',
      transition: {
        duration: stepDuration * 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  }

  return (
    <Component
      className={`blur-text-root ${className}`}
      style={{
        display: 'inline-flex',
        verticalAlign: 'baseline',
        position: 'relative',
        fontFamily: "'Clash Grotesk Variable', 'Clash Grotesk', sans-serif",
        ...style
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={text}
          variants={containerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          style={{
            display: 'inline-flex',
            alignItems: 'baseline',
            whiteSpace: 'nowrap',
            fontFamily: "'Clash Grotesk Variable', 'Clash Grotesk', sans-serif"
          }}
        >
          {elements.map((segment, index) => (
            <motion.span
              key={`${text}-${index}`}
              variants={wordVariants}
              style={{
                display: 'inline-block',
                willChange: 'transform, filter, opacity',
                fontFamily: "'Clash Grotesk Variable', 'Clash Grotesk', sans-serif"
              }}
            >
              {segment}
              {index < elements.length - 1 && '\u00A0'}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </Component>
  )
}

export default BlurText
