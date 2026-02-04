import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import Link from "next/link"
import MobileNav from "@/components/mobile-nav"
import { ContactForm } from "@/components/contact-form"
import { Mail, Phone, MapPin, Clock } from 'lucide-react'

export default function ContactPage() {
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact Us", isActive: true },
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
      <section className="relative h-[280px] md:h-[320px] flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-50 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(34,197,94,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(34,197,94,0.08),transparent_50%)]" />
        <div className="relative z-10 text-center px-4 animate-fade-in">
          <span className="inline-block px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
            We're Here to Help
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 text-balance">
            Get in Touch
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto text-pretty">
            Have questions about Yrdly? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16">
            {/* Contact Form */}
            <div className="animate-fade-in-up">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-soft">
                <ContactForm />
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6 md:space-y-8 animate-fade-in-up delay-200">
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
                
                <div className="space-y-5">
                  <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-soft hover-lift transition-all">
                    <div className="bg-green-100 p-3 rounded-xl">
                      <Mail className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Email Support</h4>
                      <p className="text-gray-600">support@yrdly.ng</p>
                      <p className="text-sm text-gray-500">We'll respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-soft hover-lift transition-all">
                    <div className="bg-green-100 p-3 rounded-xl">
                      <Clock className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Business Hours</h4>
                      <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
                      <p className="text-sm text-gray-500">WAT (West Africa Time)</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-soft hover-lift transition-all">
                    <div className="bg-green-100 p-3 rounded-xl">
                      <MapPin className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Location</h4>
                      <p className="text-gray-600">Lagos, Nigeria</p>
                      <p className="text-sm text-gray-500">Serving communities across Nigeria</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="bg-white p-6 rounded-2xl shadow-soft">
                <h4 className="font-semibold text-gray-900 mb-4">Frequently Asked Questions</h4>
                <div className="space-y-4 text-sm">
                  <div className="pb-3 border-b border-gray-100">
                    <p className="font-medium text-gray-900 mb-1">How quickly do you respond?</p>
                    <p className="text-gray-600">We typically respond within 24 hours during business days.</p>
                  </div>
                  <div className="pb-3 border-b border-gray-100">
                    <p className="font-medium text-gray-900 mb-1">Can I get help with my account?</p>
                    <p className="text-gray-600">Yes! Our support team can help with account issues, password resets, and more.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 mb-1">Do you offer phone support?</p>
                    <p className="text-gray-600">Currently, we provide email support. Phone support is coming soon!</p>
                  </div>
                </div>
              </div>
            </div>
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
