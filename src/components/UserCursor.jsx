import { useEffect, useRef, useState } from 'react'
import './UserCursor.css'

const UserCursor = ({ name = 'you', color = '#FFC700' }) => {
  const [isClicking, setIsClicking] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isTouch, setIsTouch] = useState(false)

  const containerRef = useRef(null)
  const arrowRef = useRef(null)
  const tagRef = useRef(null)

  // Motion physics refs
  const posRef = useRef({
    mouseX: -100,
    mouseY: -100,
    tagX: -100,
    tagY: -100,
    hasMoved: false
  })

  useEffect(() => {
    // Only disable custom cursor if device is EXCLUSIVELY touch-only (no mouse / trackpad attached)
    const isTouchOnly = 
      window.matchMedia('(pointer: coarse)').matches && 
      !window.matchMedia('(any-pointer: fine)').matches &&
      !window.matchMedia('(pointer: fine)').matches

    if (isTouchOnly) {
      setIsTouch(true)
      return
    }

    const pos = posRef.current
    let rafId = null

    const handleMouseMove = (e) => {
      pos.mouseX = e.clientX
      pos.mouseY = e.clientY

      if (!pos.hasMoved) {
        pos.hasMoved = true
        pos.tagX = e.clientX
        pos.tagY = e.clientY
        if (containerRef.current) {
          containerRef.current.style.opacity = '1'
        }
      }

      // Instantaneous 1:1 hardware mouse sync across the entire website (0ms lag)
      if (arrowRef.current) {
        arrowRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
      }

      // Check if hovering interactive element
      const target = e.target
      if (target && target.closest) {
        const interactive = target.closest('a, button, [role="button"], input, textarea, select, .btn')
        setIsHovering(!!interactive)
      }
    }

    // During scroll the mouse clientX/clientY don't update, so snap the trailing
    // tag instantly to avoid it floating over content at the wrong position.
    const handleScroll = () => {
      if (!pos.hasMoved) return
      pos.tagX = pos.mouseX
      pos.tagY = pos.mouseY
      if (tagRef.current) {
        tagRef.current.style.transform = `translate3d(${pos.tagX}px, ${pos.tagY}px, 0)`
      }
      if (arrowRef.current) {
        arrowRef.current.style.transform = `translate3d(${pos.mouseX}px, ${pos.mouseY}px, 0)`
      }
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    const handleMouseLeave = () => {
      if (containerRef.current) containerRef.current.style.opacity = '0'
    }
    const handleMouseEnter = () => {
      if (pos.hasMoved && containerRef.current) containerRef.current.style.opacity = '1'
    }

    // Smooth trailing name tag loop
    const updateMotion = () => {
      const easing = 0.22
      pos.tagX += (pos.mouseX - pos.tagX) * easing
      pos.tagY += (pos.mouseY - pos.tagY) * easing

      if (tagRef.current) {
        tagRef.current.style.transform = `translate3d(${pos.tagX}px, ${pos.tagY}px, 0)`
      }

      rafId = requestAnimationFrame(updateMotion)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('scroll', handleScroll, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    rafId = requestAnimationFrame(updateMotion)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  if (isTouch) return null

  return (
    <div
      ref={containerRef}
      className={`user-cursor-container ${isClicking ? 'is-clicking' : ''} ${
        isHovering ? 'is-hovering' : ''
      }`}
      style={{ opacity: 0 }}
      aria-hidden="true"
    >
      {/* Instantaneous 1:1 Arrow Cursor */}
      <div ref={arrowRef} className="user-cursor-arrow-wrap">
        <div className="user-cursor-arrow-inner">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="user-cursor-arrow-svg"
          >
            <path
              d="M3.5 2.5L10 21.5L13.5 13.5L21.5 10L3.5 2.5Z"
              fill={color}
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Smooth Trailing Name Tag */}
      <div ref={tagRef} className="user-cursor-tag-wrap">
        <div className="user-cursor-tag" style={{ background: color }}>
          {name}
        </div>
      </div>
    </div>
  )
}

export default UserCursor
