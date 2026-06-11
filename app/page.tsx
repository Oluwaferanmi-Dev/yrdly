"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Home, Search, Radio, List, Music, Smile, ChevronDown, ChevronRight } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { TermsModal } from "@/components/terms-modal"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { HeroLoginForm } from "@/components/auth/HeroLoginForm"
import { useState, useEffect } from "react"
import { EventRegistrationModal } from "@/components/event-registration-modal"

export default function LandingPage() {
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false)
  const [isEventModalOpen, setIsEventModalOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<{id: string, name: string, attendees: string}>({id: "", name: "", attendees: ""})

  useEffect(() => {
    fetchLatestEvent()
  }, [])

  const fetchLatestEvent = async () => {
    try {
      const response = await fetch('/api/events')
      const data = await response.json()
      if (Array.isArray(data) && data.length > 0) {
        setSelectedEvent({ 
          id: data[0].id, 
          name: data[0].name,
          attendees: data[0].attendees || ""
        })
      }
    } catch (error) {
      console.error('Failed to fetch event:', error)
    }
  }

  const openEventModal = (id: string, name: string) => {
    if (!id) return;
    setSelectedEvent(prev => ({ ...prev, id, name }))
    setIsEventModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-white">
      <Header currentPage="home" />

      <section className="relative min-h-[95vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-[20s] hover:scale-110"
          style={{
            backgroundImage: "url('/hero-image.png')"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-gray-900" />
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-[5%] w-72 h-72 bg-green-500/20 rounded-full blur-[120px] animate-pulse-soft pointer-events-none" />
        <div className="absolute bottom-20 right-[5%] w-96 h-96 bg-green-400/10 rounded-full blur-[140px] animate-pulse-soft delay-500 pointer-events-none" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 lg:py-32 flex flex-col lg:flex-row items-center justify-between gap-12 w-full">
          {/* Left Side text */}
          <div className="flex-1 text-white text-center lg:text-left">
            <div className="animate-fade-in mb-8">
              <span className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 backdrop-blur-xl rounded-full text-sm font-bold border border-white/20 shadow-xl">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Your Estate & Street, Connected
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-[1.1] animate-fade-in-up text-balance tracking-tighter">
              Your Neighbourhood,<br />
              <span className="text-gradient drop-shadow-sm">Connected</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-12 max-w-2xl mx-auto lg:mx-0 text-white/80 animate-fade-in-up delay-200 text-pretty leading-relaxed font-medium">
              Stay in the loop with your neighbours, buy and sell safely on your street, and discover local owambe and events just steps away.
            </p>
          </div>

          {/* Right Side Form */}
          <div className="w-full lg:w-[420px] animate-fade-in-up delay-300">
            <HeroLoginForm />
          </div>
          
          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float hidden md:flex flex-col items-center gap-3">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Explore More</span>
            <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2 backdrop-blur-sm">
              <div className="w-1 h-2 bg-green-500 rounded-full animate-bounce" />
            </div>
          </div>
        </div>
      </section>


      <section className="py-24 md:py-32 bg-gray-900 text-white relative overflow-hidden">
        {/* Background text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <h2 className="text-[18vw] font-black tracking-tighter opacity-[0.02] whitespace-nowrap uppercase">
            Discovery Hub
          </h2>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <div className="max-w-2xl">
              <span className="text-green-500 font-black uppercase tracking-[0.3em] text-xs mb-4 block">Community Feed</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">See What's Happening <br className="hidden md:block" /> In Your Estate</h2>
              <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
                Connect with verified neighbours, support local businesses, and attend curated events that matter to your community.
              </p>
            </div>
            <Link href="/events">
              <Button variant="outline" className="h-14 px-8 rounded-2xl border-white/10 hover:bg-white hover:text-gray-900 transition-all font-bold group bg-transparent">
                Browse All Events
                <ChevronRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start">
            <div className="group card-glow rounded-[2.5rem] overflow-hidden bg-gray-800/30 p-6 border border-white/5">
              <div className="relative overflow-hidden rounded-[2rem] mb-6 aspect-[3/4]">
                <Image
                  src="/pexels-k.jpg"
                  alt="Discover Local Events"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <h3 className="text-xl md:text-2xl font-black mb-3 tracking-tight">
                Local Owambe & Events
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">Find estate meetings, networking meetups, and local parties happening today.</p>
            </div>

            <div className="group card-glow rounded-[2.5rem] overflow-hidden bg-gray-800/30 p-6 border border-white/5 md:-translate-y-12">
              <div className="relative overflow-hidden rounded-[2rem] mb-6 aspect-[3/4]">
                <Image
                  src="/clothes.webp"
                  alt="Main Feature"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <h3 className="text-xl md:text-2xl font-black mb-3 tracking-tight">
                Neighbourhood Market
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">Support your local vendors or post your own hustle to reach neighbours you trust.</p>
            </div>

            <div className="group card-glow rounded-[2.5rem] overflow-hidden bg-gray-800/30 p-6 border border-white/5">
              <div className="relative overflow-hidden rounded-[2rem] mb-6 aspect-[3/4]">
                <Image
                  src="/pexels-e.jpg"
                  alt="Community Connection"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <h3 className="text-xl md:text-2xl font-black mb-3 tracking-tight">
                Verified Neighbours Only
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">Safe interactions powered by local verification. Connect with real people on your street.</p>
              <Link href="/learn-more" className="flex items-center justify-between group/link transition-smooth text-green-500 font-bold uppercase tracking-widest text-[10px]">
                <span>Deep Dive</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>


      <section className="py-24 md:py-32 bg-white relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-50/50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-green-50/30 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="text-center mb-20 md:mb-24">
            <span className="inline-block px-5 py-2 bg-green-100 text-green-700 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-6 shadow-sm shadow-green-600/5">
              Experience Yrdly
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-gray-900 mb-8 tracking-tighter leading-tight">
              Your Estate,<br className="hidden md:block" /> In Your Pocket
            </h2>
            <p className="text-lg md:text-2xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
              We've stripped away the noise to give you the most intuitive way to buy, sell, and connect with your immediate community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="group text-center hover-lift bg-white rounded-[2.5rem] p-8 md:p-10 shadow-premium border border-gray-100/50">
              <div className="relative mb-10 mx-auto w-fit">
                <div className="absolute inset-0 bg-green-200/40 rounded-[2.5rem] blur-2xl scale-75 group-hover:scale-110 transition-transform duration-700" />
                <Image
                  src="/listing.png"
                  alt="Create Listing"
                  width={220}
                  height={220}
                  className="relative rounded-[2rem] transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-2 rotate-0"
                />
              </div>
              <div className="inline-flex items-center justify-center w-10 h-10 bg-green-600 text-white rounded-2xl text-xs font-black mb-6 shadow-lg shadow-green-600/20">01</div>
              <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tight">
                Swift Listings
              </h3>
              <p className="text-gray-500 text-base leading-relaxed">
                Post in seconds. Upload your media and reach your local circle instantly.
              </p>
            </div>

            <div className="group text-center hover-lift bg-white rounded-[2.5rem] p-8 md:p-10 shadow-premium border border-gray-100/50 md:-translate-y-6">
              <div className="relative mb-10 mx-auto w-fit">
                <div className="absolute inset-0 bg-green-200/40 rounded-[2.5rem] blur-2xl scale-75 group-hover:scale-110 transition-transform duration-700" />
                <Image
                  src="/browse.png"
                  alt="Browse and Filter"
                  width={220}
                  height={220}
                  className="relative rounded-[2rem] transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2 rotate-0"
                />
              </div>
              <div className="inline-flex items-center justify-center w-10 h-10 bg-green-600 text-white rounded-2xl text-xs font-black mb-6 shadow-lg shadow-green-600/20">02</div>
              <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tight">
                Effortless Discovery
              </h3>
              <p className="text-gray-500 text-base leading-relaxed">
                Powerful filters to find exactly what you need without the endless scrolling.
              </p>
            </div>

            <div className="group text-center hover-lift bg-white rounded-[2.5rem] p-8 md:p-10 shadow-premium border border-gray-100/50">
              <div className="relative mb-10 mx-auto w-fit">
                <div className="absolute inset-0 bg-green-200/40 rounded-[2.5rem] blur-2xl scale-75 group-hover:scale-110 transition-transform duration-700" />
                <Image
                  src="/Local.png"
                  alt="Local Events"
                  width={220}
                  height={220}
                  className="relative rounded-[2rem] transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-2 rotate-0"
                />
              </div>
              <div className="inline-flex items-center justify-center w-10 h-10 bg-green-600 text-white rounded-2xl text-xs font-black mb-6 shadow-lg shadow-green-600/20">03</div>
              <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tight">
                Estate & Local Events
              </h3>
              <p className="text-gray-500 mb-8 text-base leading-relaxed">
                Connect in person. Secure your spot at estate meetings, street parties, and local events.
              </p>
              <div className="flex flex-col items-center gap-4">
                {selectedEvent.id && (
                  <div className="w-full max-w-[220px] space-y-3">
                    <Button 
                      onClick={() => openEventModal(selectedEvent.id, selectedEvent.name)}
                      className="bg-green-600 hover:bg-gray-900 text-white w-full h-12 rounded-2xl transition-all font-black uppercase tracking-widest text-[10px] shadow-xl hover:shadow-green-600/20"
                    >
                      Quick Join Now
                    </Button>
                    {selectedEvent.attendees && (
                      <p className="text-[10px] font-black text-green-600 uppercase tracking-[0.2em] text-center animate-pulse">
                        {selectedEvent.attendees}
                      </p>
                    )}
                  </div>
                )}
                <Link href="/events" className="text-green-600 hover:text-gray-900 font-black text-[10px] uppercase tracking-widest flex items-center group/link transition-all">
                  Browse Event Hub <ChevronRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section 
        className="py-24 md:py-32 text-white relative overflow-hidden group/newsletter"
        style={{
          backgroundImage: `url('/newsletter-bg.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/40 to-transparent pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-green-500 via-yellow-400 to-green-500" />
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-green-500 via-yellow-400 to-green-500" />
        
        <div className="max-w-7xl mx-auto px-6 relative flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 max-w-xl text-center md:text-left">
            <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-8 border border-white/20">
              Community Pulse
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black mb-8 leading-[1.1] tracking-tighter">
              The Best of Your <br className="hidden lg:block" /><span className="text-green-400">Estate & City</span>
            </h2>
            <p className="text-xl md:text-2xl mb-10 text-white/80 leading-relaxed font-medium">
              Join our newsletter to get updates on estate news, local hustles, and events directly to your inbox.
            </p>

            <NewsletterSignup 
              placeholder="Your primary email..."
              buttonText="Sign Me Up"
              source="newsletter-section"
              className="mb-6 shadow-2xl"
            />

            <p className="text-xs text-white/40 font-bold uppercase tracking-widest">
              No spam. Just community trust. By signing up, you agree to our{' '}
              <button 
                onClick={() => setIsTermsModalOpen(true)}
                className="text-white hover:text-green-400 underline decoration-green-400/30 underline-offset-4 cursor-pointer transition-colors"
              >
                Terms
              </button>
            </p>
          </div>
          
          <div className="hidden lg:block flex-1 relative h-[500px] w-full max-w-md animate-float">
             <div className="absolute inset-0 bg-green-500/20 rounded-[3rem] blur-[100px] opacity-50" />
             <div className="relative h-full w-full glass-dark rounded-[3rem] p-10 flex flex-col justify-center border-white/10">
                <div className="space-y-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-20 bg-white/5 rounded-2xl border border-white/10 flex items-center px-6 gap-4 animate-pulse-soft" style={{ animationDelay: `${i * 200}ms` }}>
                      <div className="w-10 h-10 rounded-full bg-green-500/20" />
                      <div className="flex-1 space-y-2">
                        <div className="h-2 w-1/2 bg-white/20 rounded" />
                        <div className="h-2 w-full bg-white/10 rounded" />
                      </div>
                    </div>
                  ))}
                </div>
             </div>
          </div>
        </div>
      </section>


      <section className="py-24 md:py-32 bg-gray-50 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative">
          <div className="text-center mb-20">
            <span className="text-green-600 font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Knowledge Hub</span>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tighter">Frequently Asked</h2>
            <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Everything you need to know about the Yrdly ecosystem.
            </p>
          </div>

          <div className="space-y-6">
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
                <div className="bg-white rounded-[2rem] p-8 shadow-soft card-glow border border-transparent hover:border-green-100 transition-all duration-500">
                  <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-6 flex items-start gap-5">
                    <span className="inline-flex items-center justify-center w-10 h-10 bg-green-50 text-green-600 rounded-2xl text-xs font-black flex-shrink-0">
                      {index + 1}
                    </span>
                    {faq.question}
                  </h3>
                  <p className="text-gray-500 leading-relaxed pl-14 text-sm md:text-base font-medium">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-20 bg-gray-900 rounded-[3rem] p-10 md:p-16 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-[100px] pointer-events-none" />
            <h3 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight relative z-10">
              Still Have Questions?
            </h3>
            <p className="text-gray-400 mb-10 text-lg relative z-10">
              Our community support team is always ready to help you navigate Yrdly.
            </p>
            <Link href="/contact" className="relative z-10">
              <Button className="bg-green-600 hover:bg-white hover:text-gray-900 text-white px-10 h-14 rounded-2xl transition-all font-black uppercase tracking-widest text-xs shadow-xl shadow-green-600/10">
                Talk to Us
              </Button>
            </Link>
          </div>
        </div>
      </section>


      <Footer />

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
