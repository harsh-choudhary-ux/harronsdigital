import { useEffect } from 'react'

/**
 * Manages navbar opacity and pointer-events CSS variables during the hero
 * showcase expansion scroll animation. Also toggles `hero-scaling-active`
 * body class. Cleans up all properties on unmount.
 *
 * @param {number} scrollProgress - Current hero scroll progress (0–1)
 */
export function useNavbarFade(scrollProgress) {
  useEffect(() => {
    let navOpacity = 1
    let isScaling = false

    if (scrollProgress > 0.05 && scrollProgress < 0.92) {
      isScaling = true
      if (scrollProgress < 0.28) {
        navOpacity = Math.max(0, 1 - (scrollProgress - 0.05) / 0.23)
      } else if (scrollProgress > 0.78) {
        navOpacity = Math.min(1, (scrollProgress - 0.78) / 0.14)
      } else {
        navOpacity = 0
      }
    } else {
      navOpacity = 1
      isScaling = false
    }

    document.documentElement.style.setProperty('--hero-navbar-opacity', navOpacity.toFixed(3))
    document.documentElement.style.setProperty('--hero-navbar-pointer-events', navOpacity < 0.05 ? 'none' : 'auto')

    if (isScaling) {
      document.body.classList.add('hero-scaling-active')
    } else {
      document.body.classList.remove('hero-scaling-active')
    }
  }, [scrollProgress])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.classList.remove('hero-scaling-active')
      document.documentElement.style.removeProperty('--hero-navbar-opacity')
      document.documentElement.style.removeProperty('--hero-navbar-pointer-events')
    }
  }, [])
}
