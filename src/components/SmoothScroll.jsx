import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

const SmoothScroll = ({ children }) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.8, // Slow, weighted, luxurious scroll duration
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential deceleration
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8, // Deliberate, smooth, slow glide
      touchMultiplier: 1.5,
      infinite: false
    })

    window.lenis = lenis

    let rafId
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      delete window.lenis
    }
  }, [])

  return children
}

export default SmoothScroll
