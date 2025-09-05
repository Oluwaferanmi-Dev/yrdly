"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  Home, 
  ShoppingCart, 
  Building2, 
  Calendar, 
  MessageCircle, 
  Shield, 
  Smartphone, 
  Star, 
  Rocket,
  Users,
  CreditCard,
  CheckCircle,
  ArrowRight,
  Globe,
  Bell,
  Lock
} from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import MobileNav from "@/components/mobile-nav"
import { useState } from "react"

export default function LearnMorePage() {
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false)
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact Us" },
    { href: "/learn-more", label: "Learn More", isActive: true },
  ];

  const features = [
    {
      icon: Home,
      title: "Home & Community",
      description: "Neighborhood feed, local posts, community updates",
      details: [
        "Real-time neighborhood feed with local updates",
        "Community posts and announcements",
        "Local news and information sharing",
        "Neighbor-to-neighbor communication"
      ]
    },
    {
      icon: ShoppingCart,
      title: "Marketplace",
      description: "Buy/sell locally, secure escrow, seller verification",
      details: [
        "Local marketplace for buying and selling",
        "Secure escrow system for safe transactions",
        "Seller verification and rating system",
        "Category-based browsing and search"
      ]
    },
    {
      icon: Building2,
      title: "Business Directory",
      description: "Local businesses, reviews, contact info",
      details: [
        "Comprehensive local business listings",
        "Customer reviews and ratings",
        "Direct contact information",
        "Business hours and location details"
      ]
    },
    {
      icon: Calendar,
      title: "Events & Activities",
      description: "Local events, event creation, RSVP system",
      details: [
        "Discover local events and activities",
        "Create and promote your own events",
        "RSVP and attendance tracking",
        "Event reminders and notifications"
      ]
    },
    {
      icon: MessageCircle,
      title: "Messaging & Communication",
      description: "Neighbor chats, marketplace chats, photo sharing",
      details: [
        "Direct messaging with neighbors",
        "Marketplace communication",
        "Photo and file sharing",
        "Group chats for communities"
      ]
    },
    {
      icon: Shield,
      title: "Security & Trust",
      description: "User verification, secure payments, privacy controls",
      details: [
        "Multi-level user verification",
        "Secure payment processing",
        "Privacy controls and settings",
        "Report and block functionality"
      ]
    },
    {
      icon: Smartphone,
      title: "Mobile & Web",
      description: "Cross-platform, offline support, push notifications",
      details: [
        "Native mobile apps for iOS and Android",
        "Web platform for desktop access",
        "Offline mode for core features",
        "Push notifications for updates"
      ]
    }
  ]

  const benefits = [
    {
      title: "Local Focus",
      description: "Everything is hyperlocal - discover what's happening in your immediate neighborhood"
    },
    {
      title: "Community Building",
      description: "Foster real connections with your neighbors and build a stronger community"
    },
    {
      title: "Safe & Secure",
      description: "Verified users, secure payments, and privacy controls ensure a safe experience"
    },
    {
      title: "Easy to Use",
      description: "Intuitive design makes it simple for everyone to participate in their community"
    },
    {
      title: "Real-time Updates",
      description: "Stay informed with instant notifications about local events and opportunities"
    },
    {
      title: "All-in-One Platform",
      description: "One app for marketplace, events, communication, and community updates"
    }
  ]

  const onboardingSteps = [
    {
      step: 1,
      title: "Sign Up",
      description: "Create your account with email or social login"
    },
    {
      step: 2,
      title: "Verify Location",
      description: "Confirm your neighborhood for local content"
    },
    {
      step: 3,
      title: "Complete Profile",
      description: "Add your photo and basic information"
    },
    {
      step: 4,
      title: "Explore Features",
      description: "Browse listings, events, and connect with neighbors"
    },
    {
      step: 5,
      title: "Start Engaging",
      description: "Create your first listing or join a local event"
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
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
            Join Now
          </Button>
        </a>
      </nav>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Everything You Need to Know About Yrdly
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how Yrdly transforms your neighborhood into a connected, thriving community where neighbors help neighbors.
            </p>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Key Features
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Yrdly brings together all the tools you need to build a stronger, more connected neighborhood.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-3 bg-green-100 rounded-lg">
                        <IconComponent className="w-6 h-6 text-green-600" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </div>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {feature.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Yrdly Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Yrdly?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We're not just another social app - we're your neighborhood's digital backbone.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Trust Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Security & Trust First
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Your safety and privacy are our top priorities. We've built multiple layers of protection to ensure a secure community experience.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Lock className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Verified Users
                    </h3>
                    <p className="text-gray-600">
                      All users go through verification to ensure authentic community members.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CreditCard className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Secure Payments
                    </h3>
                    <p className="text-gray-600">
                      Encrypted payment processing with escrow protection for all transactions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Shield className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Privacy Controls
                    </h3>
                    <p className="text-gray-600">
                      Granular privacy settings let you control who sees what information.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-2xl p-8">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 text-white rounded-full mb-4">
                    <Shield className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Trusted by Thousands
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Join thousands of verified neighbors who trust Yrdly for their community needs.
                  </p>
                  <div className="flex justify-center space-x-4">
                    <Badge variant="secondary" className="px-4 py-2">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Verified Users
                    </Badge>
                    <Badge variant="secondary" className="px-4 py-2">
                      <Lock className="w-4 h-4 mr-2" />
                      Secure
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile & Web Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Available Everywhere
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Access Yrdly on any device, anywhere. Your community is always at your fingertips.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="p-6 bg-white rounded-lg shadow-md">
                <Smartphone className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Mobile Apps
                </h3>
                <p className="text-gray-600 mb-4">
                  Native iOS and Android apps with full offline support
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Push notifications</li>
                  <li>• Offline browsing</li>
                  <li>• Camera integration</li>
                </ul>
              </div>
            </div>

            <div className="text-center">
              <div className="p-6 bg-white rounded-lg shadow-md">
                <Globe className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Web Platform
                </h3>
                <p className="text-gray-600 mb-4">
                  Full-featured web experience for desktop users
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Responsive design</li>
                  <li>• Full feature access</li>
                  <li>• Real-time updates</li>
                </ul>
              </div>
            </div>

            <div className="text-center">
              <div className="p-6 bg-white rounded-lg shadow-md">
                <Bell className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Smart Notifications
                </h3>
                <p className="text-gray-600 mb-4">
                  Stay informed with intelligent notification system
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Customizable alerts</li>
                  <li>• Location-based</li>
                  <li>• Smart filtering</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Get Started Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Get Started Today
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Join your neighborhood in just a few simple steps. It takes less than 5 minutes to get started.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-8">
            {onboardingSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative">
                  <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    {step.step}
                  </div>
                  {index < onboardingSteps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gray-300 transform translate-x-8"></div>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="https://yrdly-app.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg">
                Start Your Journey
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Connect with Your Neighborhood?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of neighbors who are already building stronger communities with Yrdly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://yrdly-app.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="secondary" className="px-8 py-4 text-lg">
                Get Started Free
              </Button>
            </a>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="px-8 py-4 text-lg border-2 border-white text-white hover:bg-white hover:text-green-600 bg-transparent">
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
            <Link href="/learn-more" className="text-sm font-bold text-gray-900 hover:text-green-600">Learn More</Link>
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
    </div>
  )
}
