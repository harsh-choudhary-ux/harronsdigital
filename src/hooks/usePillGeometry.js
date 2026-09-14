import { useState, useRef, useEffect } from 'react'

const INITIAL_GEOM = {
  deltaX: 0,
  deltaY: -80,
  pillWidth: 80,
  pillHeight: 60,
  targetWidth: 1400,
  targetHeight: 800,
  startScaleX: 0.06,
  startScaleY: 0.08,
}

/**
 * Measures the hero pill element's geometry relative to the hero center,
 * computing the scale and offset values needed for the showcase expansion animation.
 *
 * @param {React.RefObject} heroRef         - The sticky hero window element
 * @param {React.RefObject} scrollProgressRef - Current scroll progress ref
 * @returns {{ pillRef, boxRef, pillGeom, hasMeasured }}
 */
export function usePillGeometry(heroRef, scrollProgressRef) {
  const pillRef = useRef(null)
  const boxRef = useRef(null)
  const pillRestingGeomRef = useRef(null)
  const [hasMeasured, setHasMeasured] = useState(false)
  const [pillGeom, setPillGeom] = useState(INITIAL_GEOM)

  const updatePillGeom = () => {
    if (!pillRef.current || !heroRef.current) return
    // Don't re-measure while transformed mid-scroll (use cached resting value)
    if (window.scrollY > 10 && pillRestingGeomRef.current) return

    const pillRect = pillRef.current.getBoundingClientRect()
    const heroRect = heroRef.current.getBoundingClientRect()
    const boxEl = boxRef.current

    if (pillRect.width === 0 || pillRect.height === 0) return

    const heroCenterX = heroRect.left + heroRect.width / 2
    const heroCenterY = heroRect.top + heroRect.height / 2

    // Adjust for any translateY applied to hero-content-inner if measured while scrolled
    const heroFade = scrollProgressRef.current <= 0.05
      ? 0
      : Math.min(1, (scrollProgressRef.current - 0.05) / 0.23)
    const currentHeroTranslateY = -heroFade * 50

    const pillCenterX = pillRect.left + pillRect.width / 2
    const pillCenterY = pillRect.top + pillRect.height / 2 - currentHeroTranslateY

    const isMobile = heroRect.width <= 768
    const margin = isMobile ? 32 : 48
    const targetWidth = boxEl && boxEl.offsetWidth > 0 ? boxEl.offsetWidth : Math.max(100, heroRect.width - margin)
    const targetHeight = boxEl && boxEl.offsetHeight > 0 ? boxEl.offsetHeight : Math.max(100, heroRect.height - margin)

    const startScaleX = pillRect.width / targetWidth
    const startScaleY = pillRect.height / targetHeight

    const geom = {
      deltaX: pillCenterX - heroCenterX,
      deltaY: pillCenterY - heroCenterY,
      pillWidth: pillRect.width,
      pillHeight: pillRect.height,
      targetWidth,
      targetHeight,
      startScaleX: Math.max(0.01, startScaleX),
      startScaleY: Math.max(0.01, startScaleY),
    }

    pillRestingGeomRef.current = geom
    setPillGeom(geom)
    setHasMeasured(true)
  }

  useEffect(() => {
    updatePillGeom()
    const handleResize = () => {
      pillRestingGeomRef.current = null
      updatePillGeom()
    }
    window.addEventListener('resize', handleResize)

    // Re-measure when scroll returns to the top
    const handleScroll = () => {
      if (window.scrollY <= 2) {
        pillRestingGeomRef.current = null
        updatePillGeom()
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    // When web fonts load, layout can shift — ensure measurement is updated
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        if (window.scrollY <= 10) {
          pillRestingGeomRef.current = null
          updatePillGeom()
        }
      })
    }

    // ResizeObserver watches for dynamic font/element dimension changes
    let ro = null
    if (typeof ResizeObserver !== 'undefined' && heroRef.current) {
      ro = new ResizeObserver(() => {
        if (window.scrollY <= 10) {
          pillRestingGeomRef.current = null
          updatePillGeom()
        }
      })
      ro.observe(heroRef.current)
      if (pillRef.current) ro.observe(pillRef.current)
    }

    const timer = setTimeout(updatePillGeom, 350)
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll)
      if (ro) ro.disconnect()
      clearTimeout(timer)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return { pillRef, boxRef, pillGeom, hasMeasured }
}
