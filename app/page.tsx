"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Home, Search, Radio, List, Music, Smile, ChevronDown, ChevronRight } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import MobileNav from "@/components/mobile-nav"
import { TermsModal } from "@/components/terms-modal"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { useState, useEffect } from "react"
import { EventRegistrationModal } from "@/components/event-registration-modal"

export default function LandingPage() {
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false)
  const [isEventModalOpen, setIsEventModalOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<{id: string, name: string}>({id: "", name: ""})

  useEffect(() => {
    fetchLatestEvent()
  }, [])

  const fetchLatestEvent = async () => {
    try {
      const response = await fetch('/api/events')
      const data = await response.json()
      if (Array.isArray(data) && data.length > 0) {
        setSelectedEvent({ id: data[0].id, name: data[0].name })
      }
    } catch (error) {
      console.error('Failed to fetch event:', error)
    }
  }

  const openEventModal = (id: string, name: string) => {
    if (!id) return;
    setSelectedEvent({ id, name })
    setIsEventModalOpen(true)
  }

  const navLinks = [
    { href: "/", label: "Home", isActive: true },
    { href: "/events", label: "Events" },
    { href: "/about", label: "About Us" },
    { href: "/learn-more", label: "Learn More" },
    { href: "/coming-soon", label: "Coming Soon" },
    { href: "/contact", label: "Contact Us" },
  ];

  return (
    <div className="min-h-screen bg-white">

<nav className="sticky top-0 z-50 flex items-center justify-between px-4 md:px-8 py-3 glass border-b border-gray-100">
  <div className="flex items-center gap-6 md:gap-12">
    <Link href="/" className="transition-smooth hover:opacity-80">
      <Image
        src="/yrdly-logo.png"
        alt="YRDLY Logo"
        width={56}
        height={40}
        className="md:w-[62px] md:h-[44px]"
        style={{ width: "auto", height: "auto" }}
      />
    </Link>
    <div className="hidden md:flex items-center gap-8">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`text-sm transition-smooth relative py-1 ${
            link.isActive 
              ? 'font-semibold text-green-600' 
              : 'text-gray-600 hover:text-green-600'
          }`}
        >
          {link.label}
          {link.isActive && (
            <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-green-600 rounded-full" />
          )}
        </Link>
      ))}
    </div>
    <div className="md:hidden">
      <MobileNav links={navLinks} />
    </div>
  </div>

  <Link href="/coming-soon">
    <Button className="bg-green-600 hover:bg-green-700 text-white px-5 md:px-6 h-10 rounded-full transition-smooth hover:shadow-lg hover:shadow-green-600/20">
      Join
    </Button>
  </Link>
</nav>

      <section className="relative min-h-[90vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-[20s] hover:scale-110"
          style={{
            backgroundImage: "url('/hero-image.png')"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-400/10 rounded-full blur-3xl animate-pulse-soft delay-500" />
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 py-12">
          <div className="animate-fade-in">
            <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6 border border-white/20">
              Welcome to Your Community Hub
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-in-up text-balance">
            Your Neighborhood,
            <br />
            <span className="text-green-400">Connected</span> with Yrdly
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-10 max-w-2xl mx-auto text-white/90 animate-fade-in-up delay-200 text-pretty leading-relaxed">
            Yrdly is more than a marketplace — it's your community hub. Discover local listings, connect with neighbors, attend nearby events, and stay updated on what's happening around you.
          </p>

          <div className="animate-fade-in-up delay-300">
            <NewsletterSignup 
              placeholder="Enter your email to join our community"
              buttonText="Get Started"
              source="hero-newsletter"
            />
          </div>
          
          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float hidden md:block">
            <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
              <div className="w-1 h-2 bg-white/60 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </section>


      <section className="py-16 md:py-24 bg-gray-900 text-white relative overflow-hidden">
        {/* Background text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <h2 className="text-[15vw] md:text-[12vw] font-bold tracking-wider opacity-[0.03] whitespace-nowrap">
            DISCOVER
          </h2>
        </div>
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-transparent to-gray-900 pointer-events-none" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Discover What's Around You</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
              Explore local events, connect with neighbors, and find hidden gems in your community
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-end">
            <div className="group hover-lift rounded-2xl overflow-hidden bg-gray-800/50 p-4">
              <div className="relative overflow-hidden rounded-xl mb-4">
                <Image
                  src="/discover1.png"
                  alt="Discover Local Events"
                  width={400}
                  height={600}
                  className="rounded-xl transition-transform duration-500 group-hover:scale-105 w-full"
                />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2 text-balance">
                Discover Local Events Happening Right in Your Community
              </h3>
            </div>

            <div className="group hover-lift rounded-2xl overflow-hidden bg-gray-800/50 p-4 md:-translate-y-8">
              <div className="relative overflow-hidden rounded-xl mb-4">
                <Image
                  src="/discover2.png"
                  alt="Main Feature"
                  width={521}
                  height={772}
                  className="rounded-xl transition-transform duration-500 group-hover:scale-105 w-full"
                />
              </div>
              <p className="text-center text-gray-300">
                Post your items and events effortlessly, connecting with your local audience
              </p>
            </div>

            <div className="group hover-lift rounded-2xl overflow-hidden bg-gray-800/50 p-4">
              <div className="relative overflow-hidden rounded-xl mb-4">
                <Image
                  src="/discover3.png"
                  alt="Community Connection"
                  width={400}
                  height={600}
                  className="rounded-xl transition-transform duration-500 group-hover:scale-105 w-full"
                />
              </div>
              <Link href="/learn-more" className="flex items-center justify-between group/link transition-smooth hover:text-green-400">
                <span className="font-medium">Learn More</span>
                <ChevronRight className="w-5 h-5 transition-transform group-hover/link:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>


      <section className="py-16 md:py-24 bg-gradient-to-b from-white via-green-50/30 to-white relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-green-100/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="text-center mb-12 md:mb-16">
            <span className="inline-block px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
              How It Works
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 text-balance">
              Your Guide to Buying and Selling Locally
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto text-pretty">
              Creating a listing is simple and intuitive. Browse through a variety of items and events happening in your area with just a few clicks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
            <div className="group text-center hover-lift bg-white rounded-2xl p-6 md:p-8 shadow-soft">
              <div className="relative mb-6 mx-auto w-fit">
                <div className="absolute inset-0 bg-green-200/50 rounded-2xl blur-xl scale-75 group-hover:scale-100 transition-transform duration-500" />
                <Image
                  src="/listing.png"
                  alt="Create Listing"
                  width={180}
                  height={180}
                  className="relative rounded-2xl transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <span className="inline-flex items-center justify-center w-8 h-8 bg-green-600 text-white rounded-full text-sm font-bold mb-4">1</span>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                Creating Your Listing Made Easy
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                Upload images, videos, and documents to showcase your items.
              </p>
            </div>

            <div className="group text-center hover-lift bg-white rounded-2xl p-6 md:p-8 shadow-soft md:-translate-y-4">
              <div className="relative mb-6 mx-auto w-fit">
                <div className="absolute inset-0 bg-green-200/50 rounded-2xl blur-xl scale-75 group-hover:scale-100 transition-transform duration-500" />
                <Image
                  src="/browse.png"
                  alt="Browse and Filter"
                  width={180}
                  height={180}
                  className="relative rounded-2xl transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <span className="inline-flex items-center justify-center w-8 h-8 bg-green-600 text-white rounded-full text-sm font-bold mb-4">2</span>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                Browse and Filter Listings Effortlessly
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                Use our search feature to find exactly what you need.
              </p>
            </div>

            <div className="group text-center hover-lift bg-white rounded-2xl p-6 md:p-8 shadow-soft">
              <div className="relative mb-6 mx-auto w-fit">
                <div className="absolute inset-0 bg-green-200/50 rounded-2xl blur-xl scale-75 group-hover:scale-100 transition-transform duration-500" />
                <Image
                  src="/Local.png"
                  alt="Local Events"
                  width={180}
                  height={180}
                  className="relative rounded-2xl transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <span className="inline-flex items-center justify-center w-8 h-8 bg-green-600 text-white rounded-full text-sm font-bold mb-4">3</span>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                Attend Local Events and Connect
              </h3>
              <p className="text-gray-600 mb-6 text-sm md:text-base">
                Join events in your community and meet new people.
              </p>
              <div className="flex flex-col items-center gap-3">
                {selectedEvent.id && (
                  <Button 
                    onClick={() => openEventModal(selectedEvent.id, selectedEvent.name)}
                    className="bg-green-600 hover:bg-green-700 text-white w-full max-w-[200px] rounded-full transition-smooth hover:shadow-lg hover:shadow-green-600/20"
                  >
                    Quick Register
                  </Button>
                )}
                <Link href="/events" className="text-green-600 hover:text-green-700 font-semibold flex items-center group/link transition-smooth">
                  Explore All Events <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section 
        className="py-16 md:py-24 text-white relative overflow-hidden"
        style={{
          backgroundImage: `url('/newsletter-bg.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat',
        }}
      >
        {/* Gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400" />
        
        <div className="max-w-4xl mx-auto px-4 relative">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6 border border-white/20">
              Stay Connected
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-balance leading-tight">
              Stay Updated with Our Newsletter
            </h2>
            <p className="text-lg md:text-xl mb-8 text-white/90 leading-relaxed">
              Sign up to receive the latest listings and local events directly to your inbox.
            </p>

            <NewsletterSignup 
              placeholder="Enter your email"
              buttonText="Sign Up"
              source="newsletter-section"
              className="mb-4"
            />

            <p className="text-sm text-white/70">
              By clicking Sign Up, you agree to our{' '}
              <button 
                onClick={() => setIsTermsModalOpen(true)}
                className="underline hover:text-yellow-300 cursor-pointer transition-colors"
              >
                Terms and Conditions
              </button>
            </p>
          </div>
        </div>
      </section>



      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <span className="inline-block px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
              Got Questions?
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Find answers to your questions about listings, purchases, and events right here.
            </p>
          </div>

          <div className="space-y-4">
            {[ 
              {
                question: "How to create listings?",
                answer: "To create a listing, navigate to the 'Create Listing' section from your dashboard. Fill in the required details such as title, description, price, and category, then upload images if necessary. Once you submit, your listing will be visible to the community."
              },
              {
                question: "How to purchase items?",
                answer: "To purchase an item, browse available listings and click on the one you're interested in. Tap the 'Buy Now' or 'Contact Seller' button to proceed. Payments can be made securely through our supported payment gateways, and you will receive a confirmation once the purchase is complete."
              },
              {
                question: "How to attend events?",
                answer: "To attend an event, go to the 'Events' section of the app. Select the event you're interested in, check the details, and click 'Join' or 'Get Ticket'. If it's a paid event, you'll need to complete the payment process before your spot is confirmed."
              },
              {
                question: "Can I save listings?",
                answer: "Yes, you can save listings to view later. Simply tap the 'Save' or 'Bookmark' button on any listing. Your saved listings will be available under your profile in the 'Saved Items' section."
              },
              {
                question: "What if I have a question?",
                answer: "If you have a question, you can visit our Help Center or contact support directly from the app. Go to 'Settings' → 'Support' to chat with our team or send us an email. You can also check our community forums for quick answers."
              }
            ].map((faq, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-xl p-6 shadow-soft hover-lift transition-all duration-300">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 flex items-start gap-3">
                    <span className="inline-flex items-center justify-center w-7 h-7 bg-green-100 text-green-600 rounded-full text-sm font-bold flex-shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed pl-10 text-sm md:text-base">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 md:mt-16 bg-white rounded-2xl p-8 md:p-12 shadow-soft">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-6">
              We're here to help you!
            </p>
            <Link href="/contact">
              <Button className="bg-green-600 hover:bg-green-700 text-white px-8 rounded-full transition-smooth hover:shadow-lg hover:shadow-green-600/20">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>


      <footer className="bg-white border-t py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col items-center mb-10">
            <Link href="/" className="mb-6">
              <Image
                src="/yrdly-logo.png"
                alt="YRDLY Logo"
                width={80}
                height={58}
                style={{ width: "auto", height: "auto" }}
              />
            </Link>
            <div className="flex flex-wrap justify-center gap-6 md:gap-10">
              <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-green-600 transition-smooth">About Us</Link>
              <Link href="/contact" className="text-sm font-medium text-gray-600 hover:text-green-600 transition-smooth">Contact Us</Link>
              <Link href="/events" className="text-sm font-medium text-gray-600 hover:text-green-600 transition-smooth">Events</Link>
              <Link href="/learn-more" className="text-sm font-medium text-gray-600 hover:text-green-600 transition-smooth">Learn More</Link>
            </div>
          </div>
          
          <Separator className="mb-8" />
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500 order-2 md:order-1">
              © 2025 Yrdly. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 order-1 md:order-2">
              <Link href="/privacy-policy" className="text-sm text-gray-500 hover:text-green-600 transition-smooth">Privacy Policy</Link>
              <Link href="/terms" className="text-sm text-gray-500 hover:text-green-600 transition-smooth">Terms of Service</Link>
              <Link href="#" className="text-sm text-gray-500 hover:text-green-600 transition-smooth">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>

      <TermsModal 
        isOpen={isTermsModalOpen} 
        onClose={() => setIsTermsModalOpen(false)} 
      />

      <EventRegistrationModal 
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
        eventId={selectedEvent.id}
        eventName={selectedEvent.name}
      />
    </div>
  )
}
