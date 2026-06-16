import React from 'react'
import Header from './Components/Header'
import HeroSection from './Components/Hero'
import AboutUs from './Components/Aboutus'
import ContactForm from './Components/ContactForm'
import Footer from './Components/Footer'
import ProductsGrid from './Components/ProductGrid'
import ServicesSection from './Components/ServicesSection'

const page = () => {
  return (
    <div>
    <Header/>
    <HeroSection/>
    <ProductsGrid />
    <ServicesSection />
    <AboutUs />
    <ContactForm/>
    <Footer />
      
    </div>
  )
}

export default page
