import HeroSection from '../components/HeroSection'
import MarqueeStrips from '../components/MarqueeStrips'
import DesignPractice from '../components/DesignPractice'
import Corkboard from '../components/Corkboard'
import RecentWorks from '../components/RecentWorks'
import Testimonials from '../components/Testimonials'
import HowWeWork from '../components/HowWeWork'
import MeetFounder from '../components/MeetFounder'
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
        <RecentWorks />
        <HowWeWork />
        <MeetFounder />
        <Testimonials />
        <Corkboard />
        <FAQ />
        <ContactFooter />
        <FloatingCarouselNav />
      </main>
    </CarouselProvider>
  )
}

export default Home
