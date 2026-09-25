import './MarqueeStrips.css'

const marqueeItems = [
  '40+ DTC BRANDS',
  '$500K+ REVENUE IMPACT',
  '60% FASTER PAYROLL',
  '+18% AOV',
  '−15% CART ABANDONMENT',
  '+22% CHECKOUT COMPLETION',
  '95% CLIENT SATISFACTION',
  '500+ USER HRMS',
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
