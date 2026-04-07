'use client'

import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import CategoriesSection from '@/components/CategoriesSection'
import ProductsSection from '@/components/ProductsSection'
import ServicesSection from '@/components/ServicesSection'
import ProductCatalog from '@/components/ProductCatalog'
import TestimonialsSection from '@/components/TestimonialsSection'
import BlogSection from '@/components/BlogSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <CategoriesSection />
        <ProductsSection />
        <ServicesSection />
        <ProductCatalog />
        <TestimonialsSection />
        <BlogSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
