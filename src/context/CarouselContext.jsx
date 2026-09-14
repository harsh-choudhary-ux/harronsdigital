import { createContext, useContext, useState, useEffect } from 'react'

const CarouselContext = createContext(null)

export const CarouselProvider = ({ children }) => {
  // Works default index is 2 (Aeorim) matching project mockup
  const [worksIndex, setWorksIndex] = useState(2)
  const [testimonialsIndex, setTestimonialsIndex] = useState(0)
  const [activeSection, setActiveSection] = useState(null) // 'works' | 'testimonials' | null

  const worksLength = 3
  const testimonialsLength = 3

  useEffect(() => {
    const handleScroll = () => {
      const worksEl = document.getElementById('works')
      const testimonialsEl = document.getElementById('testimonials')

      if (!worksEl || !testimonialsEl) return

      const wRect = worksEl.getBoundingClientRect()
      const tRect = testimonialsEl.getBoundingClientRect()

      // Each section is checked independently — they are no longer adjacent
      // (MeetFounder / Behind the studio now sits between them)
      const worksInView = wRect.top <= 120 && wRect.bottom > 80
      const testimonialsInView =
        tRect.top <= window.innerHeight * 0.45 && tRect.bottom > 80

      if (!worksInView && !testimonialsInView) {
        setActiveSection(null)
        return
      }

      // Testimonials takes priority when both could overlap (shouldn't happen normally)
      if (testimonialsInView) {
        setActiveSection('testimonials')
      } else {
        setActiveSection('works')
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  const prevWorks = () => {
    setWorksIndex((prev) => (prev === 0 ? worksLength - 1 : prev - 1))
  }

  const nextWorks = () => {
    setWorksIndex((prev) => (prev === worksLength - 1 ? 0 : prev + 1))
  }

  const prevTestimonials = () => {
    setTestimonialsIndex((prev) => (prev === 0 ? testimonialsLength - 1 : prev - 1))
  }

  const nextTestimonials = () => {
    setTestimonialsIndex((prev) => (prev === testimonialsLength - 1 ? 0 : prev + 1))
  }

  return (
    <CarouselContext.Provider
      value={{
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
        activeSection,
      }}
    >
      {children}
    </CarouselContext.Provider>
  )
}

export const useCarousel = () => {
  const context = useContext(CarouselContext)
  if (!context) {
    throw new Error('useCarousel must be used within a CarouselProvider')
  }
  return context
}
