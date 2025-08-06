import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import MobileNav from "@/components/mobile-nav" // Corrected import

export default function AboutPage() {
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us", isActive: true },
  { href: "#", label: "Contact Us" },
];
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 border-b">
      <div className="flex items-center space-x-12">
        <div className="flex items-center space-x-4">
                    <Image
                      src="/yrdly-logo.png"
                      alt="YRDLY Logo"
                      width={62}
                      height={44}
                    />
                  </div>
        <div className="hidden md:flex items-center space-x-12">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={`text-sm text-gray-900 hover:text-green-600 ${link.isActive ? 'font-semibold' : ''}`}>
              {link.label}
            </Link>
          ))}
        </div>
        <div className="md:hidden">
          <MobileNav links={navLinks} />
        </div>
      </div>
      <Button className="bg-green-600 hover:bg-green-700 text-white px-6">
        Join
      </Button>
    </nav>

      {/* Hero Section */}
      <section className="relative h-[260px] flex items-center justify-center" style={{
        background: `linear-gradient(rgba(26, 42, 48, 0.9), rgba(26, 42, 48, 0.9)), url('/about-bg.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl font-bold tracking-tight">
            About Us
          </h1>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8">
          {/* Section Label */}
          <div className="mb-12">
            <p className="text-sm font-medium tracking-wide text-gray-600 mb-6 uppercase">
              OUR STORY
            </p>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight max-w-lg">
              At Yrdly, we believe that technology should work for you.
            </h2>
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Image */}
            <div className="relative">
              <Image
                src="/about.png"
                alt="Person sitting on steps"
                width={350}
                height={400}
                className="rounded-lg object-cover w-full"
              />
            </div>

            {/* Text Content */}
            <div className="space-y-6 relative">
              <p className="text-base leading-relaxed text-gray-700">
                Yrdly is built for Nigerians by Nigerians. We understand campus life, we understand the hustle, the late night cravings, the deadlines, and everything in between. That's why we created Yrdly: a smart, reliable platform designed to simplify your everyday needs. Either on campus or a regular life fostering the development of grassroot economy, from ordering essentials to making secure payments to connecting with events and getting sweet deals on products, Yrdly brings convenience right to your fingertips. We're not just a service provider we're your digital companion, making sure you spend less time stressing and more time living.
              </p>
              
              <p className="text-base leading-relaxed text-gray-700">
                Our goal is to empower people with tools that make life smoother, faster, and more connected so you can focus on what really matters. Join the Yrdly movement. Campus just got a lot easier.
              </p>

              {/* Green Star Accent */}
              <div className="absolute -right-8 top-1/2 transform -translate-y-1/2">
                <div className="w-8 h-8 text-green-500">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
              </div>
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
                answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
              },
              {
                question: "How to purchase items?",
                answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam"
              },
              {
                question: "How to attend events?",
                answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
              },
              {
                question: "How to attend events?",
                answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
              },
              {
                question: "Can I save listings?",
                answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
              },
              {
                question: "What if I have a question?",
                answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
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
            <Button className="bg-green-600 hover:bg-green-700 text-white px-8">
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-12 mb-12">
            <Link href="#" className="text-sm font-bold text-gray-900 hover:text-green-600">About Us</Link>
            <Link href="#" className="text-sm font-bold text-gray-900 hover:text-green-600">Contact Us</Link>
            <Link href="#" className="text-sm font-bold text-gray-900 hover:text-green-600">Help Center</Link>
          </div>
          
          <Separator className="mb-8" />
          
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-xs font-bold text-gray-900">
              © 2025 Yrdly. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="#" className="text-sm text-gray-900 hover:text-green-600 underline">Privacy Policy</Link>
              <Link href="#" className="text-sm text-gray-900 hover:text-green-600 underline">Terms of Service</Link>
              <Link href="#" className="text-sm text-gray-900 hover:text-green-600 underline">Cookies Settings</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
