"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, CheckCircle, Calculator, Shield, TrendingUp, HelpCircle } from "lucide-react"

const slides = [
  {
    title: "Free Tax Calculator",
    subtitle: "Calculate Your PAYE Instantly",
    description: "Use our free calculator to see exactly how much tax you'll pay under Nigeria's 2026 tax law. No signup required.",
    icon: Calculator,
    color: "from-blue-600 to-blue-800",
    cta: "Try Calculator Free",
    link: "/taxpadi/calculator",
  },
  {
    title: "Confused by the new 2026 tax law?",
    subtitle: "Complex calculations, deadline stress, and penalty fears are things of the past.",
    description: "TaxWise handles everything automatically. Accurate calculations, compliance tracking, and FIRS-ready reports—all in one place.",
    icon: HelpCircle,
    color: "from-indigo-600 to-indigo-800",
    cta: "Get Started Free",
    link: "/register",
  },
  {
    title: "Free Payroll for Small Teams",
    subtitle: "Up to 5 Employees - Forever Free",
    description: "Run payroll for up to 5 employees completely free. No credit card required. Perfect for small businesses and startups.",
    icon: CheckCircle,
    color: "from-green-600 to-green-800",
    cta: "Start Free Forever",
    link: "/register",
  },
  {
    title: "Free Tax Filing Assistant",
    subtitle: "File Your Taxes with Confidence",
    description: "Step-by-step guide to file your personal income tax returns. Free tools to help you navigate Nigerian taxes.",
    icon: Shield,
    color: "from-purple-600 to-purple-800",
    cta: "Start Filing Free",
    link: "/taxpadi/filing",
  },
  {
    title: "FIRS-Compliant Reports",
    subtitle: "Export Ready Reports - Free",
    description: "Generate FIRS-ready PAYE schedules and annual returns. Export to Excel and PDF at no cost.",
    icon: TrendingUp,
    color: "from-orange-600 to-orange-800",
    cta: "Get Started Free",
    link: "/register",
  },
]

export function HeroSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(timer)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const current = slides[currentSlide]
  const Icon = current.icon

  return (
    <div className="relative h-[600px] overflow-hidden">
      {/* Slides */}
      <div className="relative h-full">
        {slides.map((slide, index) => {
          const isActive = index === currentSlide
          const SlideIcon = slide.icon
          
          return (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                isActive ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
              }`}
            >
              <div className={`h-full bg-gradient-to-br ${slide.color} relative`}>
                {/* Pattern overlay for texture */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                    backgroundSize: '40px 40px'
                  }}></div>
                </div>
                
                {/* Content */}
                <div className="relative h-full flex items-center">
                  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
                    <div className="max-w-3xl">
                      <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in">
                        <SlideIcon className="h-4 w-4" />
                        <span>100% Free</span>
                      </div>
                      
                      <h1 className={`text-5xl md:text-6xl font-bold text-white mb-4 ${isActive ? 'animate-slide-up' : ''}`}>
                        {slide.title}
                      </h1>
                      
                      <p className={`text-xl md:text-2xl text-white/90 mb-2 font-medium ${isActive ? 'animate-slide-up-delay' : ''}`}>
                        {slide.subtitle}
                      </p>
                      
                      <p className={`text-lg text-white/80 mb-8 max-w-2xl ${isActive ? 'animate-slide-up-delay-2' : ''}`}>
                        {slide.description}
                      </p>
                      
                      <div className={`flex flex-col sm:flex-row gap-4 ${isActive ? 'animate-slide-up-delay-3' : ''}`}>
                        <Link href={slide.link}>
                          <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-6 text-lg font-semibold shadow-xl">
                            {slide.cta}
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </Button>
                        </Link>
                        <Link href="/taxpadi">
                          <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold backdrop-blur-sm">
                            Explore All Features
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "w-8 bg-white"
                : "w-2 bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => goToSlide((currentSlide - 1 + slides.length) % slides.length)}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 text-white transition-all z-10"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={() => goToSlide((currentSlide + 1) % slides.length)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 text-white transition-all z-10"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  )
}
