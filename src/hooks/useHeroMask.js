import { useRef, useEffect } from 'react'

/**
 * 120 FPS+ hardware-accelerated GPU CSS radial gradient mask tracking.
 * Drives the ghost/normal layer mask based on cursor position within the hero.
 * Pure side-effect — no return value.
 *
 * @param {React.RefObject} heroRef      - The sticky hero window element
 * @param {React.RefObject} ghostRef     - The ghost (white-text) layer element
 * @param {React.RefObject} normalRef    - The normal (dark-text) layer element
 * @param {React.RefObject} scrollProgressRef - Current scroll progress (0–1)
 * @param {React.RefObject} isDarkRef    - Current dark mode state ref
 */
export function useHeroMask(heroRef, ghostRef, normalRef, scrollProgressRef, isDarkRef) {
  const mousePos = useRef({ x: -500, y: -500, currX: -500, currY: -500, active: false, opacity: 0 })

  useEffect(() => {
    const heroEl = heroRef.current
    if (!heroEl) return

    let cachedRect = heroEl.getBoundingClientRect()
    const updateRect = () => {
      if (heroEl) cachedRect = heroEl.getBoundingClientRect()
    }

    window.addEventListener('resize', updateRect)
    window.addEventListener('scroll', updateRect, { passive: true })

    const handlePointerMove = (e) => {
      if (scrollProgressRef.current > 0.25) {
        mousePos.current.active = false
        return
      }

      const rect = cachedRect
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        mousePos.current.active = false
        return
      }

      mousePos.current.active = true
      mousePos.current.x = e.clientX - rect.left
      mousePos.current.y = e.clientY - rect.top

      if (mousePos.current.opacity === 0) {
        mousePos.current.currX = mousePos.current.x
        mousePos.current.currY = mousePos.current.y
      }
    }

    const handlePointerLeave = () => {
      mousePos.current.active = false
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    document.addEventListener('mouseleave', handlePointerLeave)

    let rafId
    let lastAppliedMask = ''
    const updateMask = () => {
      const ghost = ghostRef.current
      const normal = normalRef.current
      const isDark = isDarkRef.current
      const pos = mousePos.current

      // Smoothly track cursor and remain active while hovering in the hero section
      if (pos.active && scrollProgressRef.current <= 0.25) {
        pos.opacity = Math.min(1, pos.opacity + 0.14)
        pos.currX += (pos.x - pos.currX) * 0.18
        pos.currY += (pos.y - pos.currY) * 0.18
      } else {
        pos.opacity = Math.max(0, pos.opacity - 0.07)
      }

      if (ghost && normal) {
        if (isDark) {
          // Cosmic Dark mode: ghost layer fully visible, normal layer hidden
          if (lastAppliedMask !== 'dark') {
            lastAppliedMask = 'dark'
            ghost.style.webkitMaskImage = 'none'
            ghost.style.maskImage = 'none'
            ghost.style.opacity = '1'
            normal.style.webkitMaskImage = 'none'
            normal.style.maskImage = 'none'
            normal.style.opacity = '0'
          }
          rafId = requestAnimationFrame(updateMask)
          return
        }

        // Daylight mode:
        if (pos.opacity > 0.01) {
          const x = Math.round(pos.currX)
          const y = Math.round(pos.currY)
          const r = Math.round(180 * pos.opacity)
          const maskKey = `light,${x},${y},${r}`

          if (maskKey !== lastAppliedMask) {
            lastAppliedMask = maskKey
            const ghostMask = `radial-gradient(circle ${r}px at ${x}px ${y}px, black 0%, black 50%, transparent 100%)`
            ghost.style.webkitMaskImage = ghostMask
            ghost.style.maskImage = ghostMask
            ghost.style.opacity = '1'

            const normalMask = `radial-gradient(circle ${r}px at ${x}px ${y}px, transparent 0%, transparent 50%, black 100%)`
            normal.style.webkitMaskImage = normalMask
            normal.style.maskImage = normalMask
            normal.style.opacity = '1'
          }
        } else {
          if (lastAppliedMask !== 'light,idle') {
            lastAppliedMask = 'light,idle'
            ghost.style.opacity = '0'
            ghost.style.webkitMaskImage = 'none'
            ghost.style.maskImage = 'none'
            normal.style.opacity = '1'
            normal.style.webkitMaskImage = 'none'
            normal.style.maskImage = 'none'
          }
        }
      }

      rafId = requestAnimationFrame(updateMask)
    }

    rafId = requestAnimationFrame(updateMask)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', updateRect)
      window.removeEventListener('scroll', updateRect)
      window.removeEventListener('pointermove', handlePointerMove)
      document.removeEventListener('mouseleave', handlePointerLeave)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
}
