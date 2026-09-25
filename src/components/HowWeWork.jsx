import { useEffect, useRef } from 'react'
import ScrollReveal from './ScrollReveal'
import './HowWeWork.css'

const steps = [
  {
    title: 'Listen & define',
    desc: 'Understanding your business, users, and real goals.',
    side: 'left',
  },
  {
    title: 'Strategy & plan',
    desc: 'Turning insight into structure, flows, and priorities.',
    side: 'right',
  },
  {
    title: 'Design & refine',
    desc: 'Visual language, UX, and iteration.',
    side: 'left',
  },
  {
    title: 'Build & develop',
    desc: 'Turning designs into a fast, functional Shopify store.',
    side: 'right',
  },
  {
    title: 'Test & optimize',
    desc: 'Checking flows, devices, and performance before launch.',
    side: 'left',
  },
  {
    title: 'Launch & support',
    desc: 'Shipping live, then monitoring and improving post-launch.',
    side: 'right',
  },
]

const HowWeWork = () => {
  const shapeRef = useRef(null)
  const wrapRef = useRef(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    let ticking = false
    let lastColor = ''
    let lastDark = null
    let lastWrapState = ''

    const updateFrame = () => {
      const cube = shapeRef.current
      const wrap = wrapRef.current
      const section = sectionRef.current
      if (!cube || !wrap || !section) { ticking = false; return }

      const rect = section.getBoundingClientRect()
      const sectionTop = rect.top
      const sectionBottom = rect.bottom
      const vh = window.innerHeight

      // Fast exit when section is far out of view
      if (sectionBottom < -100 || sectionTop > vh + 100) {
        if (sectionTop > vh && lastWrapState !== 'parked') {
          lastWrapState = 'parked'
          wrap.style.position = 'fixed'
          wrap.style.bottom = '-250px'
        }
        ticking = false
        return
      }

      // Rotation progress based on scroll through section
      const scrollable = Math.max(1, rect.height - vh)
      const progress = Math.max(0, Math.min(1, -sectionTop / scrollable))
      const rotY = Math.round(progress * 360 * 10) / 10
      const rotX = Math.round(progress * 180 * 10) / 10
      cube.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`

      // Background color transition: #F1F1F1 -> #353535
      const startY = vh * 0.2
      const transitionDistance = vh * 0.35
      let darkProgress = 0
      if (sectionTop <= startY) {
        darkProgress = Math.max(0, Math.min(1, (startY - sectionTop) / transitionDistance))
      }
      const eased = darkProgress * darkProgress * (3 - 2 * darkProgress)
      const r = Math.round(241 - eased * (241 - 53))
      const g = Math.round(241 - eased * (241 - 53))
      const b = Math.round(241 - eased * (241 - 53))
      const currentColor = `rgb(${r}, ${g}, ${b})`

      if (currentColor !== lastColor) {
        lastColor = currentColor
        section.style.backgroundColor = currentColor
      }

      const isDark = eased >= 0.45
      if (isDark !== lastDark) {
        lastDark = isDark
        if (isDark) {
          section.classList.add('is-dark')
        } else {
          section.classList.remove('is-dark')
        }
      }

      // Sticky logic: state-based to eliminate duplicate getBoundingClientRect layout queries
      let wrapState = ''
      if (sectionTop > 0) {
        wrapState = 'parked-bottom'
      } else if (sectionBottom > vh) {
        wrapState = 'active'
      } else {
        wrapState = 'past'
      }

      if (wrapState !== lastWrapState) {
        lastWrapState = wrapState
        if (wrapState === 'parked-bottom') {
          wrap.style.position = 'fixed'
          wrap.style.bottom = '-250px'
        } else if (wrapState === 'active') {
          wrap.style.position = 'fixed'
          wrap.style.bottom = '40px'
        } else {
          wrap.style.position = 'absolute'
          wrap.style.bottom = '40px'
        }
      }

      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateFrame)
        ticking = true
      }
    }

    // Run once on mount
    onScroll()

    // Prefer Lenis if active, otherwise use passive native scroll listener
    if (window.lenis) {
      window.lenis.on('scroll', onScroll)
    } else {
      window.addEventListener('scroll', onScroll, { passive: true })
    }

    return () => {
      if (window.lenis) {
        window.lenis.off('scroll', onScroll)
      } else {
        window.removeEventListener('scroll', onScroll)
      }
    }
  }, [])
  return (
    <section className="how-we-work-section" id="how-we-work" ref={sectionRef}>
      {/* 3D Shape — floats outside the grid, sticky to viewport bottom while section is active */}
      <div className="how-we-work-3d-wrap" ref={wrapRef}>
        <div className="shape-scene">
          <div className="shape-cube" ref={shapeRef}>
            <div className="shape-face face-front" />
            <div className="shape-face face-back" />
            <div className="shape-face face-left" />
            <div className="shape-face face-right" />
            <div className="shape-face face-top" />
            <div className="shape-face face-bottom" />
            <div className="shape-ring ring-1" />
            <div className="shape-ring ring-2" />
            <div className="shape-ring ring-3" />
          </div>
        </div>
      </div>

      <div className="how-we-work-container">
        {/* Header: Title */}
        <ScrollReveal>
          <div className="how-we-work-header">
            <h2 className="how-we-work-title">
              Designing, building, and refining as
              <br />
              one continuous process.
            </h2>
          </div>
        </ScrollReveal>

        {/* Alternating 2-column grid */}
        <div className="how-we-work-grid">
          {steps.map((step, idx) => (
            <ScrollReveal
              key={step.title}
              className={`how-we-work-step-wrapper step-${step.side} step-row-${idx + 1}`}
              delay={0.1}
            >
              <div className={`how-we-work-card ${step.side}-card`}>
                <div className="step-header">
                  <h3 className="step-title">{step.title}</h3>
                </div>
                <div className="step-content">
                  <p className="step-description">{step.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowWeWork
