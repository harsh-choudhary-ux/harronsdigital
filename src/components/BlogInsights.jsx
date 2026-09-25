import ScrollReveal from './ScrollReveal'
import './BlogInsights.css'

const blogPosts = [
  {
    id: 1,
    title: 'Logo Design',
    description: 'Brand identity crafted from scratch',
    readTime: '2 Min Read',
    image: '/images/showcase-1.webp',
    href: '#',
  },
  {
    id: 2,
    title: 'Packaging Design',
    description: 'Strategic visuals that sell on shelf',
    readTime: '3 Min Read',
    image: '/images/showcase-2.webp',
    href: '#',
  },
  {
    id: 3,
    title: 'Code Editor Redesign',
    description: 'Rethinking the developer experience',
    readTime: '1 Min Read',
    image: '/images/showcase-3.webp',
    href: '#',
  },
  {
    id: 4,
    title: 'Detailed Visual Components',
    description: 'Pixel-perfect UI at every scale',
    readTime: '4 Min Read',
    image: '/images/recent-work-wide.webp',
    href: '#',
  },
  {
    id: 5,
    title: 'Waste Management System',
    description: 'Mockup for a smarter civic platform',
    readTime: '3 Min Read',
    image: '/images/hero-showcase.webp',
    href: '#',
  },
  {
    id: 6,
    title: 'Money Tracker Mock Project',
    description: 'Personal finance, beautifully designed',
    readTime: '2 Min Read',
    image: '/images/testimonials-laptop-bg.webp',
    href: '#',
  },
]

const BlogInsights = () => {
  return (
    <section className="blog-section">
      <div className="blog-container">

        {/* Heading area */}
        <ScrollReveal>
          <div className="blog-header">
            <p className="blog-kicker">(Intro)</p>
            <div className="blog-title-wrap">
              <h2 className="blog-watermark">Other Work</h2>
            </div>
          </div>
        </ScrollReveal>

        {/* Cards grid */}
        <div className="blog-grid">
          {blogPosts.map((post, i) => (
            <ScrollReveal key={post.id} delay={i * 0.07}>
              <a href={post.href} className="blog-card">
                <div className="blog-card-image-wrap">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="blog-card-image"
                  />
                </div>
                <div className="blog-card-body">
                  <div className="blog-card-text">
                    <h3 className="blog-card-title">{post.title}</h3>
                    <p className="blog-card-desc">{post.description}</p>
                  </div>
                  <span className="blog-arrow-btn">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5" stroke="#ffffff" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  )
}

export default BlogInsights
