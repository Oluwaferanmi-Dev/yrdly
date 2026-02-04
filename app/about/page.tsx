import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import MobileNav from "@/components/mobile-nav" 

export default function AboutPage() {
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us", isActive: true },
  { href: "/contact", label: "Contact Us" },
];
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-4 md:px-8 py-4 glass border-b border-gray-100">
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

      {/* Hero Section */}
      <section className="relative h-[280px] md:h-[320px] flex items-center justify-center overflow-hidden" style={{
        background: `linear-gradient(rgba(26, 42, 48, 0.85), rgba(26, 42, 48, 0.9)), url('/about-bg.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
        <div className="relative z-10 text-center text-white animate-fade-in">
          <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-4 border border-white/20">
            Our Story
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            About Us
          </h1>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 md:py-24 bg-gray-50 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative">
          {/* Section Label */}
          <div className="mb-10 md:mb-12 animate-fade-in">
            <span className="inline-block px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
              OUR STORY
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight max-w-xl text-balance">
              At Yrdly, we believe that technology should work for you.
            </h2>
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-start">
            {/* Image */}
            <div className="relative animate-fade-in-up">
              <div className="absolute inset-0 bg-green-200/50 rounded-2xl blur-2xl scale-95" />
              <Image
                src="/about.png"
                alt="Person sitting on steps"
                width={500}
                height={600}
                className="relative rounded-2xl object-cover w-full shadow-soft"
              />
            </div>

            {/* Text Content */}
            <div className="space-y-6 relative animate-fade-in-up delay-200">
              <p className="text-base md:text-lg leading-relaxed text-gray-700">
                Yrdly is built for Nigerians by Nigerians. We understand campus life, we understand the hustle, the late night cravings, the deadlines, and everything in between. That's why we created Yrdly: a smart, reliable platform designed to simplify your everyday needs.
              </p>
              
              <p className="text-base md:text-lg leading-relaxed text-gray-700">
                Either on campus or in regular life fostering the development of grassroot economy, from ordering essentials to making secure payments to connecting with events and getting sweet deals on products, Yrdly brings convenience right to your fingertips. We're not just a service provider — we're your digital companion, making sure you spend less time stressing and more time living.
              </p>
              
              <p className="text-base md:text-lg leading-relaxed text-gray-700">
                Our goal is to empower people with tools that make life smoother, faster, and more connected so you can focus on what really matters. Join the Yrdly movement. Campus just got a lot easier.
              </p>

              {/* Green accent decoration */}
              <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 w-1 h-32 bg-gradient-to-b from-green-400 to-green-600 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
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

      {/* Footer */}
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
              © 2026 Yrdly. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy-policy" className="text-sm text-gray-900 hover:text-green-600 underline">Privacy Policy</Link>
              <Link href="/terms" className="text-sm text-gray-900 hover:text-green-600 underline">Terms of Service</Link>
              <Link href="#" className="text-sm text-gray-900 hover:text-green-600 underline">Cookies Settings</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
