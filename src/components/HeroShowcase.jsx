import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import ScrollReveal from './ScrollReveal'
import './HeroShowcase.css'

const cardsData = [
  // Col 2 Row 2 - Funky Bioacetate Hair Gel
  {
    id: 'funky-hair-gel',
    left: 312.57,
    top: -58.25,
    image: '/images/showcase/Frame 1410104009.webp',
    alt: 'Funky, Bioacetate Hair Gel'
  },
  // Col 2 Row 1 - Top center
  {
    id: 'top-center',
    left: 205.85,
    top: -455.35,
    image: '/images/showcase/Frame 1410104009.webp',
    alt: 'Showcase card'
  },
  // Col 3 Row 1 - Top Right
  {
    id: 'top-right-offscreen',
    left: 722.47,
    top: -594.11,
    image: '/images/showcase/Frame 2087325982.webp',
    alt: 'Showcase card'
  },
  // Col 3 Row 2 - Top Right Peeking Card (Silhouette)
  {
    id: 'blurred-silhouette',
    left: 819.23,
    top: -233.01,
    image: '/images/showcase/Frame 2087325982.webp',
    alt: 'Editorial Silhouette'
  },
  // Col 1 Row 2 - Colorful cards dashboard
  {
    id: 'dashboard-cards',
    left: -191.09,
    top: 126.22,
    image: '/images/showcase/Frame 1410104008.webp',
    alt: 'Dashboard analytics cards'
  },
  // Col 3 Row 3 - Editorial presence (Middle Right)
  {
    id: 'editorial-presence',
    left: 915.98,
    top: 128.09,
    image: '/images/showcase/Frame 1410103995.webp',
    alt: 'Editorial presence'
  },
  // Col 3 Row 4 - Sottozero laptop on rock (Bottom Right)
  {
    id: 'sottozero',
    left: 1012.73,
    top: 489.18,
    image: '/images/showcase/Frame 1410104000.webp',
    alt: 'Sottozero laptop on stone'
  },
  // Col 1 Row 3 - NOTE HERE (hand holding phone)
  {
    id: 'note-here',
    left: -94.33,
    top: 487.32,
    image: '/images/showcase/Frame 1410104007.webp',
    alt: 'NoteSphere note taking app'
  },
  // Col 1 Row 4 - Holographic glitter
  {
    id: 'glitter-texture',
    left: 2.42,
    top: 848.41,
    image: '/images/showcase/Frame 1410104005.webp',
    alt: 'Holographic fluid texture'
  },
  // Col 2 Row 3 - Center laptop green screen
  {
    id: 'center-laptop',
    left: 409.33,
    top: 302.85,
    image: '/images/showcase/Frame 1410104002.webp',
    alt: 'HR Management Platform mockup'
  },
  // Col 2 Row 4 - Meet the HRMS of the future
  {
    id: 'hrms-future',
    left: 506.08,
    top: 663.94,
    image: '/images/showcase/Frame 1410104010.webp',
    alt: 'Meet the HRMS of the future'
  },
  // Col 1 Row 1 - Top left
  {
    id: 'top-left',
    left: -310.85,
    top: -316.90,
    image: '/images/showcase/Frame 1410104008.webp',
    alt: 'Showcase card'
  },
]

const HeroShowcase = ({ embedded = false }) => {
  const frameRef = useRef(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    if (!frameRef.current) return
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width
        if (width > 0) {
          setScale(width / 1392)
        }
      }
    })
    ro.observe(frameRef.current)
    return () => ro.disconnect()
  }, [])

  const frameContent = (
    <div
      ref={frameRef}
      className={`showcase-outer-frame ${embedded ? 'is-embedded' : ''}`}
    >
      <div
        className="showcase-scaler-box"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
      >
        {cardsData.map((card, idx) => (
          <div
            key={card.id || idx}
            className="showcase-card-item"
            style={{
              width: 497.92,
              height: 336.83,
              left: card.left,
              top: card.top,
              position: 'absolute',
              transform: 'rotate(-15deg)',
              transformOrigin: 'top left',
              background: '#151515',
              borderRadius: 14.64,
              border: '0.73px rgba(64, 64, 64, 0.50) solid',
              overflow: 'hidden',
            }}
          >
            {card.image && (
              <img
                src={card.image}
                alt={card.alt || `Showcase ${idx + 1}`}
                className="showcase-card-img"
                width="498"
                height="337"
                loading={idx < 4 ? 'eager' : 'lazy'}
                decoding="async"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )

  if (embedded) {
    return frameContent
  }

  return (
    <section className="hero-showcase" id="showcase">
      <ScrollReveal delay={0.2}>
        {frameContent}
      </ScrollReveal>
    </section>
  )
}

export default HeroShowcase
