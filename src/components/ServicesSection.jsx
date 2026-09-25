import ScrollReveal from './ScrollReveal'
import './ServicesSection.css'

const servicesData = [
  {
    id: 'hrms',
    label: 'HRMS — Intellostack',
    image: '/images/Frame 1410104002.png',
    description: 'End-to-end HR management system designed for enterprise teams. Covers employee onboarding, attendance tracking, leave management, and multi-role dashboards — built to reduce HR ops time and improve internal UX across departments.',
    tags: ['Dashboard Design', 'Role-Based UX', 'Data Tables', 'Onboarding Flows'],
    figmaUrl: 'https://www.figma.com/design/po6YWsIduLXlNlS5aZdjbX/HRMS-Intellostack-Project?node-id=12093-85996&t=S7Tj5kurdppsYxnN-1',
  },
  {
    id: 'student',
    label: 'Student Module',
    image: '/images/Frame 1321314835.png',
    description: 'A comprehensive student-facing module designed for academic institutions. Features course management, assignment submissions, grade tracking, and a clean dashboard experience — built to simplify student–faculty interaction at scale.',
    tags: ['User Research', 'Wireframing', 'Figma Prototypes', 'Design Systems'],
    figmaUrl: 'https://www.figma.com/design/cVeT8lfTS6aLHeX24zUnGQ/Student-Module?node-id=0-1&t=LiVxsGsBqwblJScQ-1',
  },
  {
    id: 'payroll',
    label: 'Payroll Application — Cybrom',
    image: '/images/Mockup 12.png',
    description: 'Mobile-first payroll application designed for Cybrom Technology. Streamlines salary processing, tax breakdowns, and payslip generation — giving HR teams and employees a transparent, zero-confusion payroll experience on any device.',
    tags: ['Mobile App Design', 'Payroll UX', 'Data Visualization', 'Accessibility'],
    figmaUrl: 'https://www.figma.com/design/UwxbOAtVXM91DRyJc8Cstd/Cybrom-App.---Payroll--?node-id=308-6806&t=f1I5eXXRmOVtCn2x-1',
  },
  {
    id: 'kenzen',
    label: 'Kanzen Skincare — CRO Design',
    image: '/images/Frame 1484580597.png',
    description: "CRO-focused redesign for the UK's #1 skincare brand. Rebuilt the product detail page, checkout flow, and trust architecture to reduce friction and increase conversion — backed by heatmap analysis, A/B testing, and copy psychology.",
    tags: ['CRO Strategy', 'Shopify Design', 'A/B Testing', 'Copy Optimization'],
    figmaUrl: 'https://www.figma.com/design/XdUggKf6H2gkr3I77JCTmn/Kanzen-Skincare-Website---UK--1-Skin-Care-Brand--?node-id=0-1&t=bIFPkbT4dYnOu30B-1',
  },
]

const ServicesSection = () => {
  return (
    <section className="services-section" id="services">
      <div className="services-container">
        {/* Header */}
        <ScrollReveal>
          <div className="services-header">
            <p className="services-subtitle">(Services)</p>
            <div className="services-title-wrap">
              <h2 className="services-display-title">What I do</h2>
            </div>
          </div>
        </ScrollReveal>

        {/* Service rows */}
        <div className="services-list">
          {servicesData.map((service, i) => (
            <ScrollReveal key={service.id} delay={i * 0.08}>
              <div className="service-row">
                <div className="service-row-inner">
                  {/* Left: label */}
                  <div className="service-label-col">
                    <span className="service-label">{service.label}</span>
                  </div>

                  {/* Center: mockup image */}
                  <div className="service-image-col">
                    <div className="service-image-wrap">
                      <img
                        src={service.image}
                        alt={service.label}
                        className="service-image"
                      />
                      {/* Tags below image */}
                      <div className="service-tags">
                        {service.tags.map((tag) => (
                          <span key={tag} className="service-tag">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right: description */}
                  <div className="service-desc-col">
                    <p className="service-desc">{service.description}</p>
                    {service.figmaUrl && (
                      <a
                        href={service.figmaUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="service-figma-btn"
                      >
                        <span className="figma-btn-text">View in Figma</span>
                        <span className="figma-btn-icon">
                          <img src="/Figma.svg" alt="Figma" width="16" height="16" style={{objectFit:'contain'}} />
                        </span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
