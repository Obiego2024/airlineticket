import Footer from '@/components/Footer'
import { Deals } from '@/components/home/Deals'
import { Destinations } from '@/components/home/Destinations'
import { Features } from '@/components/home/Features'
import { Hero } from '@/components/home/Hero'
import { HowItWorks } from '@/components/home/HowItWorks'
import { Newsletter } from '@/components/home/Newsletter'
import { Partners } from '@/components/home/Partners'
import { Testimonials } from '@/components/home/Testimonials'


function Home() {
  return (
    <div>
      <Hero />
      <Partners />
      <Destinations />
      <Deals />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Newsletter />
      <Footer />
    </div>
  )
}

export default Home