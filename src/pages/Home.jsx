import HeroSection from '../components/HeroSection'
import MarqueeStrips from '../components/MarqueeStrips'
import DesignPractice from '../components/DesignPractice'
import CROShowcase from '../components/CROShowcase'
import ServicesSection from '../components/ServicesSection'
import Testimonials from '../components/Testimonials'
import HowWeWork from '../components/HowWeWork'
import MeetFounder from '../components/MeetFounder'
import Corkboard from '../components/Corkboard'
import BlogInsights from '../components/BlogInsights'
import FAQ from '../components/FAQ'
import ContactFooter from '../components/ContactFooter'
import { CarouselProvider } from '../context/CarouselContext'
import FloatingCarouselNav from '../components/FloatingCarouselNav'

const Home = () => {
  return (
    <CarouselProvider>
      <main>
        <HeroSection />
        <MarqueeStrips />
        <DesignPractice />
        <CROShowcase />
        <ServicesSection />
        <HowWeWork />
        <MeetFounder />
        <Testimonials />
        <Corkboard />
        <BlogInsights />
        <FAQ />
        <ContactFooter />
        <FloatingCarouselNav />
      </main>
    </CarouselProvider>
  )
}

export default Home
