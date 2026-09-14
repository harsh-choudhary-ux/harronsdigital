import { useState, useRef, useEffect } from 'react'

/**
 * Tracks the hero section scroll progress (0 → 1) relative to its sticky track.
 * Returns both a React state (for re-renders) and a ref (for use inside RAF loops).
 */
export function useHeroScrollProgress() {
  const trackRef = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const scrollProgressRef = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const trackEl = trackRef.current
      if (!trackEl) return
      const rect = trackEl.getBoundingClientRect()
      const scrollableDist = rect.height - window.innerHeight
      if (scrollableDist <= 0) return

      const progress = Math.max(0, Math.min(1, -rect.top / scrollableDist))
      scrollProgressRef.current = progress
      setScrollProgress(progress)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  return { scrollProgress, scrollProgressRef, trackRef }
}
