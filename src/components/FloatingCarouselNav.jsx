import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCarousel } from '../context/CarouselContext'
import './FloatingCarouselNav.css'

const FloatingCarouselNav = () => {
  const {
    activeSection,
    worksIndex,
    setWorksIndex,
    prevWorks,
    nextWorks,
    worksLength,
    testimonialsIndex,
    setTestimonialsIndex,
    prevTestimonials,
    nextTestimonials,
    testimonialsLength,
  } = useCarousel()

  const isVisible = activeSection !== null
  const isWorks = activeSection === 'works'

  const currentIndex = isWorks ? worksIndex : testimonialsIndex
  const totalLength = isWorks ? worksLength : testimonialsLength

  const handlePrev = isWorks ? prevWorks : prevTestimonials
  const handleNext = isWorks ? nextWorks : nextTestimonials
  const handleSelect = isWorks ? setWorksIndex : setTestimonialsIndex

  // Keyboard navigation when either section is in view
  useEffect(() => {
    if (!isVisible) return
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        handlePrev()
      } else if (e.key === 'ArrowRight') {
        handleNext()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isVisible, handlePrev, handleNext])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="floating-carousel-nav"
          aria-label={`${isWorks ? 'Project' : 'Testimonial'} Navigation`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
        >
          <button
            type="button"
            className="floating-carousel-btn"
            onClick={handlePrev}
            aria-label={`Previous ${isWorks ? 'Project' : 'Testimonial'}`}
          >
            ←
          </button>
          <div className="floating-carousel-dots">
            {Array.from({ length: totalLength }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`floating-carousel-dot ${idx === currentIndex ? 'active' : ''}`}
                onClick={() => handleSelect(idx)}
                aria-label={`Go to ${isWorks ? 'project' : 'testimonial'} ${idx + 1}`}
              />
            ))}
          </div>
          <button
            type="button"
            className="floating-carousel-btn"
            onClick={handleNext}
            aria-label={`Next ${isWorks ? 'Project' : 'Testimonial'}`}
          >
            →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default FloatingCarouselNav
