import { useEffect } from 'react'

/**
 * Keeps --showcase-cover-scale CSS variable in sync with the viewport size.
 * Pure side-effect — no return value.
 */
export function useCoverScale() {
  useEffect(() => {
    const updateCoverScale = () => {
      const isMobile = window.innerWidth <= 768
      const margin = isMobile ? 32 : 48
      const w = window.innerWidth - margin
      const h = window.innerHeight - margin
      if (w > 0 && h > 0) {
        const coverScale = Math.max(w / 1392, h / 888)
        document.documentElement.style.setProperty('--showcase-cover-scale', coverScale.toFixed(5))
      }
    }

    updateCoverScale()
    window.addEventListener('resize', updateCoverScale)
    return () => {
      window.removeEventListener('resize', updateCoverScale)
      document.documentElement.style.removeProperty('--showcase-cover-scale')
    }
  }, [])
}
