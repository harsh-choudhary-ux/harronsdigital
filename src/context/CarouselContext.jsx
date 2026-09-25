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

      let worksInView = false
      let testimonialsInView = false

      if (worksEl) {
        const wRect = worksEl.getBoundingClientRect()
        worksInView = wRect.top <= 120 && wRect.bottom > 80
      }

      if (testimonialsEl) {
        const tRect = testimonialsEl.getBoundingClientRect()
        testimonialsInView =
          tRect.top <= window.innerHeight * 0.75 && tRect.bottom >= 120
      }

      if (!worksInView && !testimonialsInView) {
        setActiveSection(null)
        return
      }

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
