import { useRef, useMemo } from 'react'
import { Sun, Moon } from 'lucide-react'
import PixelTrail from './PixelTrail'
import HeroShowcase from './HeroShowcase'
import HeroContent from './HeroContent'
import { useHeroScrollProgress } from '../hooks/useHeroScrollProgress'
import { useDarkMode } from '../hooks/useDarkMode'
import { useLiveTime } from '../hooks/useLiveTime'
import { useRoleRotator } from '../hooks/useRoleRotator'
import { useHeroMask } from '../hooks/useHeroMask'
import { useCoverScale } from '../hooks/useCoverScale'
import { useNavbarFade } from '../hooks/useNavbarFade'
import { usePillGeometry } from '../hooks/usePillGeometry'
import './HeroSection.css'

const HeroSection = () => {
  // ── State & refs from hooks ──────────────────────────────────────────────
  const { isDark, setIsDark, isDarkRef } = useDarkMode()
  const liveTime = useLiveTime()
  const currentRole = useRoleRotator()

  const heroRef = useRef(null)
  const ghostRef = useRef(null)
  const normalRef = useRef(null)

  const { scrollProgress, scrollProgressRef, trackRef } = useHeroScrollProgress()
  const { pillRef, boxRef, pillGeom, hasMeasured } = usePillGeometry(heroRef, scrollProgressRef)

  // ── Side-effects via hooks ───────────────────────────────────────────────
  useHeroMask(heroRef, ghostRef, normalRef, scrollProgressRef, isDarkRef)
  useCoverScale()
  useNavbarFade(scrollProgress)

  // ── Showcase expansion transform math (memoised) ─────────────────────────
  const {
    heroOpacity,
    heroTranslateY,
    showcaseTranslateX,
    showcaseTranslateY,
    showcaseScaleX,
    showcaseScaleY,
    innerScaleX,
    innerScaleY,
    innerTranslateX,
    innerTranslateY,
    showcaseBorderRadiusCSS,
    expandEase,
    isInteractive,
  } = useMemo(() => {
    // Hero text fade: 0.05 → 0.28
    const heroFadeProgress = scrollProgress <= 0.05
      ? 0
      : Math.min(1, (scrollProgress - 0.05) / 0.23)
    const heroOpacity = 1 - heroFadeProgress
    const heroTranslateY = -heroFadeProgress * 50

    // Showcase expansion: 0 → 0.76 with easeInOutQuad
    const expandProgressRaw = Math.min(1, Math.max(0, scrollProgress / 0.76))
    const expandEase = expandProgressRaw < 0.5
      ? 2 * expandProgressRaw * expandProgressRaw
      : 1 - Math.pow(-2 * expandProgressRaw + 2, 2) / 2

    const showcaseTranslateX = (1 - expandEase) * pillGeom.deltaX
    const showcaseTranslateY = (1 - expandEase) * pillGeom.deltaY
    const showcaseScaleX = pillGeom.startScaleX + expandEase * (1 - pillGeom.startScaleX)
    const showcaseScaleY = pillGeom.startScaleY + expandEase * (1 - pillGeom.startScaleY)

    // Zoom & uniform aspect-ratio compensation — eliminates squeezing at any scroll point
    const startNetScale = 0.25
    const currentNetScale = startNetScale + expandEase * (1 - startNetScale)
    const innerScaleX = Math.max(0.1, currentNetScale / showcaseScaleX)
    const innerScaleY = Math.max(0.1, currentNetScale / showcaseScaleY)

    // Align center laptop card with pill centre
    const coverScale = pillGeom.targetWidth > 0
      ? Math.max(pillGeom.targetWidth / 1392, pillGeom.targetHeight / 888)
      : 1
    const cardDeltaX = -2.6 * coverScale
    const cardDeltaY = -42.9 * coverScale
    const innerTranslateX = (1 - expandEase) * (-cardDeltaX * innerScaleX)
    const innerTranslateY = (1 - expandEase) * (-cardDeltaY * innerScaleY)

    // Border radius: exactly 24px on-screen at all times (compensates for non-uniform scale)
    const targetOnScreenRadius = 24
    const unscaledRadiusX = targetOnScreenRadius / Math.max(0.0001, showcaseScaleX)
    const unscaledRadiusY = targetOnScreenRadius / Math.max(0.0001, showcaseScaleY)
    const showcaseBorderRadiusCSS = `${unscaledRadiusX.toFixed(2)}px / ${unscaledRadiusY.toFixed(2)}px`

    const isInteractive = scrollProgress >= 0.85

    return {
      heroOpacity, heroTranslateY,
      showcaseTranslateX, showcaseTranslateY, showcaseScaleX, showcaseScaleY,
      innerScaleX, innerScaleY, innerTranslateX, innerTranslateY,
      showcaseBorderRadiusCSS, expandEase, isInteractive,
    }
  }, [scrollProgress, pillGeom])

  // Shared style for both HeroContent layers (opacity + translateY driven by scroll)
  const heroContentStyle = {
    opacity: heroOpacity,
    transform: `translateY(${heroTranslateY}px)`,
    pointerEvents: heroOpacity < 0.05 ? 'none' : 'auto',
  }

  return (
    <section className={`hero-scroll-track ${isDark ? 'is-dark' : ''}`} id="hero" ref={trackRef}>
      <div className="hero-sticky-window" ref={heroRef}>

        {/* Dark Mode Toggle — scoped to Hero Section only */}
        <div
          className="hero-dark-toggle-wrap"
          style={{
            opacity: Math.max(0, 1 - scrollProgress * 3.5),
            pointerEvents: scrollProgress > 0.15 ? 'none' : 'auto',
            transform: `translateY(${scrollProgress * 24}px)`,
          }}
        >
          <button
            type="button"
            className={`hero-dark-toggle-btn ${isDark ? 'active' : ''}`}
            onClick={() => setIsDark((prev) => !prev)}
            aria-label={isDark ? 'Switch to Daylight mode' : 'Switch to Cosmic Dark mode'}
            title={isDark ? 'Switch to Daylight mode' : 'Switch to Cosmic Dark mode'}
          >
            <div className="toggle-indicator-track">
              <div className="toggle-indicator-thumb">
                {isDark ? <Moon size={12} strokeWidth={2.4} /> : <Sun size={12} strokeWidth={2.4} />}
              </div>
            </div>
            <span className="toggle-mode-text">{isDark ? 'Cosmic Dark' : 'Daylight'}</span>
          </button>
        </div>

        {/* Layer 1: Ghost — white text with moving cloud background */}
        <div className="hero-layer hero-layer-ghost" ref={ghostRef}>
          <div className="hero-ghost-clouds-bg" aria-hidden="true">
            <div className="ghost-cloud-layer ghost-cloud-main" />
            <div className="ghost-cloud-layer ghost-cloud-dense" />
            <div className="ghost-cloud-layer ghost-cloud-mist" />
            <div className="ghost-cloud-ambient-light" />
          </div>
          <HeroContent isGhost liveTime={liveTime} currentRole={currentRole} style={heroContentStyle} />
        </div>

        {/* Layer 2: PixelTrail Canvas — cosmic shader (Cosmic Dark only) */}
        <div className="hero-pixel-trail-layer">
          <PixelTrail trailSize={0.13} maxAge={250} interpolate={3.7} isDarkMode={isDark} />
        </div>

        {/* Layer 3: Normal — original dark text */}
        <div className="hero-layer hero-layer-normal" ref={normalRef}>
          <HeroContent liveTime={liveTime} currentRole={currentRole} pillRef={pillRef} style={heroContentStyle} />
        </div>

        {/* Layer 4: Expanding Showcase Stage */}
        <div className="hero-showcase-stage">
          <div
            ref={boxRef}
            className="showcase-expanding-box"
            style={{
              transform: `translate3d(${showcaseTranslateX}px, ${showcaseTranslateY}px, 0) scale(${showcaseScaleX}, ${showcaseScaleY})`,
              transformOrigin: 'center center',
              borderRadius: showcaseBorderRadiusCSS,
              opacity: hasMeasured ? 1 : 0,
              boxShadow: expandEase < 0.08 ? 'none' : '0 25px 80px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.08)',
              pointerEvents: isInteractive ? 'auto' : 'none',
            }}
          >
            <div
              className="showcase-zoom-wrapper"
              style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                inset: 0,
                transform: `translate3d(${innerTranslateX}px, ${innerTranslateY}px, 0) scale(${innerScaleX}, ${innerScaleY})`,
                transformOrigin: 'center center',
                willChange: 'transform',
              }}
            >
              <div className="showcase-interactive-layer">
                <HeroShowcase embedded={true} />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default HeroSection
