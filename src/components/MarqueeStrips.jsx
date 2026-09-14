import './MarqueeStrips.css'

const marqueeItems = [
  'WEBSITE DESIGN',
  'UI/UX STRATEGY',
  'PRODUCT DESIGN',
  'INTERACTION DESIGN',
  'BRAND IDENTITY',
  'CONVERSION DESIGN',
  'SYSTEM ARCHITECTURE',
]

const MarqueeStrips = () => {
  return (
    <div className="marquee-strips-wrapper">
      {/* Black Strip - angled downward to the right, passing underneath */}
      <div className="marquee-strip strip-dark">
        <div className="marquee-track track-left">
          <div className="marquee-group">
            {marqueeItems.map((item, idx) => (
              <span key={`d1-${idx}`} className="strip-item">
                {item}
              </span>
            ))}
          </div>
          <div className="marquee-group" aria-hidden="true">
            {marqueeItems.map((item, idx) => (
              <span key={`d2-${idx}`} className="strip-item">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Orange Strip - angled upward to the right, crossing ON TOP */}
      <div className="marquee-strip strip-orange">
        <div className="marquee-track track-right">
          <div className="marquee-group">
            {marqueeItems.map((item, idx) => (
              <span key={`o1-${idx}`} className="strip-item">
                {item}
              </span>
            ))}
          </div>
          <div className="marquee-group" aria-hidden="true">
            {marqueeItems.map((item, idx) => (
              <span key={`o2-${idx}`} className="strip-item">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MarqueeStrips
