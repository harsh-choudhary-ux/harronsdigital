import ScrollReveal from './ScrollReveal'
import './Corkboard.css'

const Corkboard = () => {
  return (
    <section className="corkboard-section" id="corkboard">
      <div className="corkboard-container">
        {/* Header with Subtitle and Giant Heading */}
        <ScrollReveal>
          <div className="corkboard-header">
            <p className="corkboard-subtitle">(Conspiracy-board)</p>
            <div className="corkboard-title-wrap">
              <h2 className="corkboard-display-title">Corkboard</h2>
            </div>
          </div>
        </ScrollReveal>

        {/* The Dark Corkboard Graphic Card */}
        <ScrollReveal delay={0.15}>
          <div className="corkboard-card">
            <div className="corkboard-card-inner">
              <img
                src="/images/corkboard.webp"
                alt="Conspiracy Board - UX detective investigation with pinned newspapers and connected threads"
                className="corkboard-img"
              />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

export default Corkboard
