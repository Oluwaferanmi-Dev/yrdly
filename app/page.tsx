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
import { useState } from "react"

export default function LandingPage() {
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false)
  const navLinks = [
    { href: "/", label: "Home", isActive: true },
    { href: "/about", label: "About Us" },
    { href: "/learn-more", label: "Learn More" },
    { href: "/contact", label: "Contact Us" },
  ];

  return (
    <div className="min-h-screen bg-white">

<nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-3 border-b bg-white">
  <div className="flex items-center space-x-12">
    <div className="flex items-center space-x-4">
      <Image
        src="/yrdly-logo.png"
        alt="YRDLY Logo"
        width={62}
        height={44}
        style={{ width: "auto", height: "auto" }}
      />
    </div>
    <div className="hidden md:flex items-center space-x-12">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`text-sm text-gray-900 hover:text-green-600 ${link.isActive ? 'font-semibold text-green-600' : ''}`}
        >
          {link.label}
        </Link>
      ))}
    </div>
    <div className="md:hidden">
      <MobileNav links={navLinks} />
    </div>
  </div>

  <a
    href="https://yrdly-app.vercel.app/"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Button className="bg-green-600 hover:bg-green-700 text-white px-6">
      Join
    </Button>
  </a>
</nav>



      <section className="relative h-[800px] flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/hero-image.png')"
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
         <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Your Neighborhood, Connected with Yrdly
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Yrdly is more than a marketplace — it’s your community hub. Discover and share local listings, connect with neighbors, attend nearby events, and stay updated on what’s happening around you, all in one place.
        </p>  

          <NewsletterSignup 
            placeholder="Enter your email to sign up for our Newsletter"
            buttonText="Sign Up"
            source="hero-newsletter"
          />
        </div>
      </section>


      <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="text-center">
            <h2 className="text-8xl md:text-9xl font-bold tracking-[0.68em] opacity-20">
              DISCOVER
            </h2>
          </div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 items-end">
            <div>
              <Image
                src="/discover1.png"
                alt="Discover Local Events"
                width={400}
                height={600}
                className="rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">
                Discover Local Events Happening Right in Your Community
              </h3>
            </div>

            <div className="md:transform md:-translate-y-20">
              <Image
                src="/discover2.png"
                alt="Main Feature"
                width={521}
                height={772}
                className="rounded-lg mb-4"
              />
              <p className="text-center">
                Post your items and events effortlessly, connecting with your local audience
              </p>
            </div>

            <div>
              <Image
                src="/discover3.png"
                alt="Community Connection"
                width={400}
                height={600}
                className="rounded-lg mb-4"
              />
              <Link href="/learn-more" className="flex items-center justify-between hover:text-green-400 transition-colors">
                <span>Learn More</span>
                <ChevronRight className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
      </section>


      <section className="py-20 bg-gradient-to-b from-white to-green-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Your Guide to Buying and Selling Locally
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Creating a listing is simple and intuitive. Browse through a variety of items and events happening in your area with just a few clicks.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="relative mb-6">
                <Image
                  src="/listing.png"
                  alt="Create Listing"
                  width={200}
                  height={200}
                  className="mx-auto rounded-lg"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Creating Your Listing Made Easy
              </h3>
              <p className="text-gray-600">
                Upload images, videos, and documents to showcase your items.
              </p>
            </div>

            <div className="text-center">
              <div className="relative mb-6">
                <Image
                  src="/browse.png"
                  alt="Browse and Filter"
                  width={200}
                  height={200}
                  className="mx-auto rounded-lg"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Browse and Filter Listings Effortlessly
              </h3>
              <p className="text-gray-600">
                Use our search feature to find exactly what you need.
              </p>
            </div>

            <div className="text-center">
              <div className="relative mb-6">
                <Image
                  src="/Local.png"
                  alt="Local Events"
                  width={200}
                  height={200}
                  className="mx-auto rounded-lg"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Attend Local Events and Connect
              </h3>
              <p className="text-gray-600">
                Join events in your community and meet new people.
              </p>
            </div>
          </div>
        </div>
      </section>


   <section 
  className="py-20 text-white relative border-y-4 border-yellow-300"
  style={{
    backgroundImage: `url('/newsletter-bg.png')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'repeat',
  }}
>
  <div className="max-w-4xl mx-auto px-4">
    <div className="max-w-2xl">
      <h2 className="text-4xl sm:text-5xl font-bold mb-6">
        Stay Updated with Our <br /> Newsletter
      </h2>
      <p className="text-xl mb-8">
        Sign up to recieve the lastest listings and local events directly to your inbox. <span className="text-purple-300">✦</span>
      </p>

      <NewsletterSignup 
        placeholder="Enter your email"
        buttonText="Sign Up"
        source="newsletter-section"
        className="mb-4"
      />

      <p className="text-sm text-white/80">
        By clicking Sign Up, you agree to our <button 
          onClick={() => setIsTermsModalOpen(true)}
          className="underline hover:text-yellow-200 cursor-pointer"
        >
          Terms and Conditions
        </button>
      </p>
    </div>
  </div>
</section>



      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">FAQs</h2>
            <p className="text-lg text-gray-600">
              Find answers to your questions about listings, purchases, and events right here.
            </p>
          </div>

          <div className="space-y-0">
            {[ 
              {
                question: "How to create listings?",
                answer: "To create a listing, navigate to the 'Create Listing' section from your dashboard. Fill in the required details such as title, description, price, and category, then upload images if necessary. Once you submit, your listing will be visible to the community."
              },
              {
                question: "How to purchase items?",
                answer: "To purchase an item, browse available listings and click on the one you’re interested in. Tap the 'Buy Now' or 'Contact Seller' button to proceed. Payments can be made securely through our supported payment gateways, and you will receive a confirmation once the purchase is complete."
              },
              {
                question: "How to attend events?",
                answer: "To attend an event, go to the 'Events' section of the app. Select the event you’re interested in, check the details, and click 'Join' or 'Get Ticket'. If it’s a paid event, you’ll need to complete the payment process before your spot is confirmed."
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
              <div key={index}>
                <div className="py-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {faq.question}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
                {index < 5 && <div className="border-t-2 border-gray-900"></div>}
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Still have questions?
            </h3>
            <p className="text-lg text-gray-600 mb-8">
              We're here to help you!
            </p>
            <Link href="/contact">
              <Button className="bg-green-600 hover:bg-green-700 text-white px-8">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>


      <footer className="bg-white border-t py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-12 mb-12">
            <Link href="/about" className="text-sm font-bold text-gray-900 hover:text-green-600">About Us</Link>
            <Link href="/contact" className="text-sm font-bold text-gray-900 hover:text-green-600">Contact Us</Link>
            <Link href="#" className="text-sm font-bold text-gray-900 hover:text-green-600">Help Center</Link>
          </div>
          
          <Separator className="mb-8" />
          
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-xs font-bold text-gray-900">
              © 2025 Yrdly. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy-policy" className="text-sm text-gray-900 hover:text-green-600 underline">Privacy Policy</Link>
              <Link href="/terms" className="text-sm text-gray-900 hover:text-green-600 underline">Terms of Service</Link>
              <Link href="#" className="text-sm text-gray-900 hover:text-green-600 underline">Cookies Settings</Link>
            </div>
          </div>
        </div>
      </footer>
      
      <TermsModal 
        isOpen={isTermsModalOpen} 
        onClose={() => setIsTermsModalOpen(false)} 
      />
    </div>
  )
}