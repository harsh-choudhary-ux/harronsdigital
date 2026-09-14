import { useEffect, useRef } from 'react'
import ScrollReveal from './ScrollReveal'
import './HowWeWork.css'

const stepsLeft = [
  {
    title: 'Listen & define',
    desc: 'Understanding your business, users, and real goals.',
  },
  {
    title: 'Design & refine',
    desc: 'Visual language, UX, and iteration.',
  },
  {
    title: 'Test & optimize',
    desc: 'Checking flows, devices, and performance before launch.',
  },
]

const stepsRight = [
  {
    title: 'Strategy & plan',
    desc: 'Turning insight into structure, flows, and priorities.',
  },
  {
    title: 'Build & develop',
    desc: 'Turning designs into a fast, functional Shopify store.',
  },
  {
    title: 'Launch & support',
    desc: 'Shipping live, then monitoring and improving post-launch.',
  },
]

const HowWeWork = () => {
  const shapeRef = useRef(null)
  const wrapRef = useRef(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const cube = shapeRef.current
          const wrap = wrapRef.current
          if (!cube || !wrap) { ticking = false; return }

          const section = sectionRef.current
          const rect = section.getBoundingClientRect()
          const sectionTop = rect.top
          const sectionBottom = rect.bottom
          const vh = window.innerHeight

          // Rotation progress based on scroll through section
          const scrollable = rect.height - vh
          const progress = Math.max(0, Math.min(1, -sectionTop / scrollable))
          const rotY = progress * 360
          const rotX = progress * 180
          cube.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`

          // 70% screen gap transition: #F1F1F1 -> #353535
          // Starts when section boundary passes the top of viewport (sectionTop <= 0)
          // and completes across the 70% screen gap (vh * 0.7) before entering the content.
          const startY = 0
          const transitionDistance = vh * 0.7
          let darkProgress = 0
          if (sectionTop <= startY) {
            darkProgress = Math.max(0, Math.min(1, (startY - sectionTop) / transitionDistance))
          }
          // Cinematic smoothstep curve
          const eased = darkProgress * darkProgress * (3 - 2 * darkProgress)
          const r = Math.round(241 - eased * (241 - 53))
          const g = Math.round(241 - eased * (241 - 53))
          const b = Math.round(241 - eased * (241 - 53))
          const currentColor = `rgb(${r}, ${g}, ${b})`

          section.style.backgroundColor = currentColor

          // Keep adjacent elements in sync so there is zero visible boundary seam anywhere
          if (section.previousElementSibling) {
            section.previousElementSibling.style.backgroundColor = currentColor
          }
          if (section.nextElementSibling) {
            section.nextElementSibling.style.backgroundColor = currentColor
          }
          document.body.style.backgroundColor = currentColor

          if (eased >= 0.45) {
            section.classList.add('is-dark')
          } else {
            section.classList.remove('is-dark')
          }

          // Sticky logic:
          // Always keep fixed so no jump — just slide in/out via bottom value + CSS transition
          const centerX = `${section.getBoundingClientRect().left + section.offsetWidth / 2}px`

          if (sectionTop > 0) {
            // Section not yet reached — park below viewport (hidden, ready to slide up)
            wrap.style.position = 'fixed'
            wrap.style.bottom = '-250px'
            wrap.style.left = centerX
            wrap.style.transform = 'translateX(-50%)'
          } else if (sectionBottom > vh) {
            // Section is active — slide up and lock to viewport bottom
            wrap.style.position = 'fixed'
            wrap.style.bottom = '40px'
            wrap.style.left = centerX
            wrap.style.transform = 'translateX(-50%)'
          } else {
            // Section has fully scrolled past — move into section so it scrolls away naturally
            wrap.style.position = 'absolute'
            wrap.style.bottom = '40px'
            wrap.style.left = '50%'
            wrap.style.transform = 'translateX(-50%)'
          }

          ticking = false
        })
        ticking = true
      }
    }
    // Run once on mount
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    if (window.lenis) {
      window.lenis.on('scroll', onScroll)
    }
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (window.lenis) {
        window.lenis.off('scroll', onScroll)
      }
      document.body.style.backgroundColor = ''
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

        {/* 2-column: left steps | right steps */}
        <div className="how-we-work-grid">
          {/* Left Column */}
          <div className="how-we-work-col how-we-work-col-left">
            {stepsLeft.map((step, idx) => (
              <ScrollReveal key={step.title} delay={idx * 0.1}>
                <div className="how-we-work-card left-card">
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

          {/* Right Column (Staggered) */}
          <div className="how-we-work-col how-we-work-col-right">
            {stepsRight.map((step, idx) => (
              <ScrollReveal key={step.title} delay={idx * 0.15}>
                <div className="how-we-work-card right-card">
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
      </div>
    </section>
  )
}

export default HowWeWork
