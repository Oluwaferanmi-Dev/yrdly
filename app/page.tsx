"use client"

import { Button } from "@/components/ui/button"
import { Heart, Lock, ShoppingBag, ArrowRight, ShieldCheck, Tag, Zap, Camera, Plus, MapPin, UserCheck, MessageSquare, ChevronDown } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useState } from "react"

const CATEGORIES = [
  "Wigs", "Footwear", "Electronics", "Machinery", "Accessories", 
  "Watches", "Handbags", "Clothes", "Jewelry", "Gadgets"
]

export default function LandingPage() {
  const [howItWorksTab, setHowItWorksTab] = useState<'buying' | 'selling'>('buying')
  const [faqTab, setFaqTab] = useState<'buying' | 'selling'>('buying')
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const faqs = {
    buying: [
      { q: "Is it safe to buy on Yrdly?", a: "Absolutely. With SafePay, your money is held securely until you receive and approve the item." },
      { q: "How do I make an offer?", a: "Click the 'Make Offer' button on any listing to negotiate a price directly with the seller." },
      { q: "What if the item is not as described?", a: "You can open a dispute through SafePay, and our support team will mediate to ensure a fair resolution." }
    ],
    selling: [
      { q: "How much does it cost to list?", a: "Listing items on Yrdly is completely free. We only take a small success fee when your item sells." },
      { q: "When do I get paid?", a: "You get paid immediately after the buyer confirms they have received the item in good condition." },
      { q: "How do I ship my items?", a: "You can arrange local pickup or use your preferred delivery service. Just make sure to communicate with the buyer." }
    ]
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-base)]">
      <Header currentPage="home" />

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-6 overflow-hidden">
        <div className="max-w-[1000px] mx-auto text-center relative z-10">
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <span className="trust-pill"><Heart className="w-4 h-4" /> Trusted</span>
            <span className="trust-pill"><Lock className="w-4 h-4" /> Secure</span>
            <span className="trust-pill"><ShoppingBag className="w-4 h-4" /> Local</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-extrabold tracking-tight leading-[1.1] text-balance mb-8">
            Just Like Your Local Market, <span className="text-brand block md:inline">but Safer</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-[var(--color-text-secondary)] mb-10 max-w-2xl mx-auto">
            Make space and make sales in your community with built-in trust and verified neighbours.
          </p>
          
          <Button className="btn-primary text-lg h-14 px-10">
            Shop Now
          </Button>
        </div>
      </section>

      {/* CATEGORY MARQUEE */}
      <section className="py-10 border-y border-[var(--color-border-default)] overflow-hidden bg-[var(--color-bg-subtle)]">
        <div className="flex w-full overflow-hidden">
          <div className="marquee-track gap-8 px-4">
            {[...CATEGORIES, ...CATEGORIES, ...CATEGORIES].map((category, i) => (
              <div key={i} className="flex items-center gap-2 text-xl font-medium text-[var(--color-text-primary)] whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-brand/30" />
                {category}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURE BENTO GRID */}
      <section className="py-24 px-6 max-w-[1280px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Everything You Need</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bento 1 */}
          <div className="card p-8 md:p-12 bg-[#F5C518]/10 border-[#F5C518]/20 flex flex-col justify-between h-[400px]">
            <div>
              <ShieldCheck className="w-12 h-12 text-[#F5C518] mb-6" />
              <h3 className="text-2xl font-bold mb-2">SafePay Protection</h3>
              <p className="text-[var(--color-text-secondary)]">Your money is held securely until you receive exactly what you paid for.</p>
            </div>
            <div className="mt-auto flex justify-end">
               <div className="bg-white p-4 rounded-xl shadow-sm w-3/4 translate-x-4 translate-y-4 border border-[var(--color-border-default)]">
                 <div className="flex items-center gap-3 mb-2">
                   <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600"><Lock className="w-4 h-4"/></div>
                   <div className="font-bold text-sm">Payment Secured</div>
                 </div>
                 <div className="text-xs text-[var(--color-text-muted)]">Awaiting seller fulfillment...</div>
               </div>
            </div>
          </div>
          
          {/* Bento 2 */}
          <div className="card p-8 md:p-12 bg-blue-50 border-blue-100 flex flex-col justify-between h-[400px]">
            <div>
              <MessageSquare className="w-12 h-12 text-blue-500 mb-6" />
              <h3 className="text-2xl font-bold mb-2">Ask Seller</h3>
              <p className="text-[var(--color-text-secondary)]">Direct chat built-in. Get all your questions answered before you commit.</p>
            </div>
            <div className="mt-auto flex justify-end">
               <div className="bg-white p-4 rounded-xl shadow-sm w-full border border-[var(--color-border-default)]">
                 <div className="flex gap-2 mb-3">
                   <div className="bg-gray-100 p-2 rounded-lg text-xs w-3/4">Is this still available?</div>
                 </div>
                 <div className="flex gap-2 justify-end">
                   <div className="bg-blue-500 text-white p-2 rounded-lg text-xs w-2/3">Yes, you can come pick it up today!</div>
                 </div>
               </div>
            </div>
          </div>

          {/* Bento 3 */}
          <div className="card p-8 md:p-12 bg-purple-50 border-purple-100 flex flex-col justify-between h-[400px]">
            <div>
              <Tag className="w-12 h-12 text-purple-500 mb-6" />
              <h3 className="text-2xl font-bold mb-2">Make Offer</h3>
              <p className="text-[var(--color-text-secondary)]">Haggle just like in the local market. Propose a price that works for you.</p>
            </div>
            <div className="mt-auto flex justify-start">
               <div className="bg-white p-4 rounded-xl shadow-sm border border-[var(--color-border-default)]">
                 <div className="text-sm font-bold mb-1">Make an Offer</div>
                 <div className="flex items-center gap-2">
                   <div className="border rounded-md px-3 py-1.5 font-mono">₦15,000</div>
                   <Button size="sm" className="bg-purple-500 hover:bg-purple-600 text-white">Send</Button>
                 </div>
               </div>
            </div>
          </div>

          {/* Bento 4 */}
          <div className="card p-8 md:p-12 bg-brand/5 border-brand/20 flex flex-col justify-between h-[400px]">
            <div>
              <Camera className="w-12 h-12 text-brand mb-6" />
              <h3 className="text-2xl font-bold mb-2">List Items Fast</h3>
              <p className="text-[var(--color-text-secondary)]">Snap, price, and post. It takes less than 60 seconds to start selling.</p>
            </div>
            <div className="mt-auto flex justify-center">
               <Button className="btn-primary shadow-lg flex items-center gap-2"><Plus className="w-5 h-5"/> Create Listing</Button>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 px-6 bg-[var(--color-bg-subtle)]">
        <div className="max-w-[1000px] mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-10">How It Works</h2>
          
          <div className="flex justify-center mb-12">
            <div className="flex bg-white rounded-full p-1 border border-[var(--color-border-default)]">
              <button 
                onClick={() => setHowItWorksTab('buying')}
                className={`px-8 py-2.5 rounded-full font-medium transition-all ${howItWorksTab === 'buying' ? 'bg-brand text-white shadow-md' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'}`}
              >
                Buying
              </button>
              <button 
                onClick={() => setHowItWorksTab('selling')}
                className={`px-8 py-2.5 rounded-full font-medium transition-all ${howItWorksTab === 'selling' ? 'bg-brand text-white shadow-md' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'}`}
              >
                Selling
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="text-left flex flex-col items-center">
                <div className="w-12 h-12 bg-brand/10 text-brand rounded-full flex items-center justify-center font-bold text-xl mb-6">
                  {step}
                </div>
                <h4 className="text-xl font-bold mb-3 text-center">
                  {howItWorksTab === 'buying' 
                    ? (step === 1 ? 'Find It' : step === 2 ? 'Price It' : 'Get It')
                    : (step === 1 ? 'Snap It' : step === 2 ? 'Post It' : 'Sell It')}
                </h4>
                <p className="text-[var(--color-text-secondary)] text-center mb-8">
                  {howItWorksTab === 'buying' 
                    ? (step === 1 ? 'Search our local inventory for exactly what you need.' : step === 2 ? 'Use SafePay to secure the item or make a counter-offer.' : 'Meet up locally or get it delivered securely.')
                    : (step === 1 ? 'Take clear photos of the item you want to let go of.' : step === 2 ? 'Add a description and set your asking price.' : 'Ship it or hand it over and get paid instantly.')}
                </p>
                <div className="w-full max-w-[240px] aspect-[1/2] bg-white rounded-[2rem] border-4 border-gray-100 shadow-xl overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center text-[var(--color-text-muted)] text-sm font-medium bg-gray-50">
                    App UI Mockup
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16">
            <Button className="btn-primary text-lg h-14 px-10">Start {howItWorksTab === 'buying' ? 'Shopping' : 'Selling'}</Button>
          </div>
        </div>
      </section>

      {/* TRUST STATEMENT */}
      <section className="py-32 px-6 bg-[var(--color-bg-dark)] text-white relative overflow-hidden text-center flex items-center justify-center min-h-[60vh]">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-8">
            Commerce That Doesn't Ask You To Hope For The Best.
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            We built Yrdly because we believe buying and selling online shouldn't feel like a gamble.
          </p>
        </div>
      </section>

      {/* SAFEPAY SPOTLIGHT */}
      <section className="py-24 px-6 max-w-[1280px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:w-1/2">
            <div className="aspect-square bg-gray-200 rounded-[2rem] overflow-hidden relative">
              <Image src="/listing.png" alt="Happy Customer" fill className="object-cover" />
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F5C518]/10 text-[#D4A000] rounded-full text-sm font-bold uppercase tracking-wider mb-6">
              <ShieldCheck className="w-4 h-4" /> Yrdly SafePay
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Total peace of mind <br/>for every transaction.</h2>
            <p className="text-lg text-[var(--color-text-secondary)] mb-8">
              Whether you are buying a used phone or selling a designer bag, our escrow service ensures nobody gets cheated. The buyer's money is held safely until they approve the item.
            </p>
            
            <div className="flex flex-wrap gap-3 mb-10">
              <span className="trust-pill border-gray-200 bg-white text-gray-600"><Lock className="w-4 h-4"/> Trust</span>
              <span className="trust-pill border-gray-200 bg-white text-gray-600"><Zap className="w-4 h-4"/> Visibility</span>
              <span className="trust-pill border-gray-200 bg-white text-gray-600"><UserCheck className="w-4 h-4"/> Familiarity</span>
            </div>
            
            <Link href="/about" className="text-brand font-bold flex items-center gap-2 hover:gap-3 transition-all">
              Learn more about SafePay <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* WHO IT'S BUILT FOR */}
      <section className="py-24 px-6 bg-[var(--color-bg-subtle)]">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Who is Yrdly for?</h2>
            <p className="text-[var(--color-text-secondary)] text-lg">Built for the community, driven by trust.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="card">
              <div className="aspect-[4/3] bg-gray-200 relative">
                 <div className="absolute inset-0 flex items-center justify-center text-gray-400">Lifestyle Image</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Thrifters & Deal Hunters</h3>
                <p className="text-[var(--color-text-secondary)]">Find incredible local deals without the risk of getting scammed.</p>
              </div>
            </div>
            <div className="card">
              <div className="aspect-[4/3] bg-gray-200 relative">
                 <div className="absolute inset-0 flex items-center justify-center text-gray-400">Lifestyle Image</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Side Hustlers</h3>
                <p className="text-[var(--color-text-secondary)]">Start your small business and reach real buyers in your community.</p>
              </div>
            </div>
            <div className="card">
              <div className="aspect-[4/3] bg-gray-200 relative">
                 <div className="absolute inset-0 flex items-center justify-center text-gray-400">Lifestyle Image</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Declutterers</h3>
                <p className="text-[var(--color-text-secondary)]">Make space in your home by easily selling items you no longer need.</p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <Button className="btn-primary text-lg h-14 px-10">Create Account</Button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 max-w-[800px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-10">Frequently Asked Questions</h2>
          
          <div className="flex justify-center mb-12">
            <div className="flex border-b border-[var(--color-border-default)]">
              <button 
                onClick={() => setFaqTab('buying')}
                className={`px-8 py-3 font-medium transition-all border-b-2 ${faqTab === 'buying' ? 'text-brand border-brand' : 'text-[var(--color-text-muted)] border-transparent hover:text-[var(--color-text-primary)]'}`}
              >
                Buying
              </button>
              <button 
                onClick={() => setFaqTab('selling')}
                className={`px-8 py-3 font-medium transition-all border-b-2 ${faqTab === 'selling' ? 'text-brand border-brand' : 'text-[var(--color-text-muted)] border-transparent hover:text-[var(--color-text-primary)]'}`}
              >
                Selling
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {faqs[faqTab].map((faq, i) => (
            <div key={i} className="border border-[var(--color-border-default)] rounded-xl overflow-hidden bg-white">
              <button 
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full px-6 py-5 text-left flex justify-between items-center font-bold text-lg hover:bg-gray-50 transition-colors"
              >
                {faq.q}
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === i && (
                <div className="px-6 pb-5 text-[var(--color-text-secondary)]">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button className="btn-outline">Get Started Today</Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
