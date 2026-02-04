"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  Clock, 
  Smartphone, 
  Globe, 
  Bell, 
  Users, 
  ShoppingCart, 
  Calendar, 
  MessageCircle,
  Shield,
  CheckCircle,
  ArrowRight,
  Mail,
  Star
} from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import MobileNav from "@/components/mobile-nav"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { useState } from "react"

export default function ComingSoonPage() {
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false)
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/learn-more", label: "Learn More" },
    { href: "/contact", label: "Contact Us" },
    { href: "/coming-soon", label: "Coming Soon", isActive: true },
  ];

  const features = [
    {
      icon: Users,
      title: "Community Hub",
      description: "Connect with your neighbors and build stronger communities"
    },
    {
      icon: ShoppingCart,
      title: "Local Marketplace",
      description: "Buy and sell items within your neighborhood safely"
    },
    {
      icon: Calendar,
      title: "Local Events",
      description: "Discover and create events happening in your area"
    },
    {
      icon: MessageCircle,
      title: "Neighbor Chat",
      description: "Communicate directly with your neighbors"
    },
    {
      icon: Shield,
      title: "Secure & Trusted",
      description: "Verified users and secure transactions"
    },
    {
      icon: Smartphone,
      title: "Mobile & Web",
      description: "Access from any device, anywhere"
    }
  ]

  const timeline = [
    {
      phase: "Phase 1",
      title: "Core Development",
      status: "In Progress",
      description: "Building the foundation with user authentication, profiles, and basic marketplace features"
    },
    {
      phase: "Phase 2", 
      title: "Community Features",
      status: "Upcoming",
      description: "Adding neighborhood feeds, event management, and messaging capabilities"
    },
    {
      phase: "Phase 3",
      title: "Advanced Features",
      status: "Planned",
      description: "Implementing advanced security, analytics, and premium features"
    },
    {
      phase: "Phase 4",
      title: "Launch",
      status: "Coming Soon",
      description: "Public release with full feature set and community onboarding"
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

        <Button className="bg-green-600 hover:bg-green-700 text-white px-6" disabled>
          <Clock className="w-4 h-4 mr-2" />
          Coming Soon
        </Button>
      </nav>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-6">
              <Clock className="w-4 h-4 mr-2" />
              Coming Soon
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Yrdly App is Coming Soon
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              We're building something amazing for your neighborhood. Get early access and be the first to experience the future of community connection.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <NewsletterSignup 
                placeholder="Enter your email for early access"
                buttonText="Get Early Access"
                source="coming-soon-hero"
                className="max-w-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* App Preview Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What We're Building
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Yrdly will be your neighborhood's digital hub, bringing together everything you need to connect with your community.
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
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Development Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Development Timeline
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Follow our progress as we build the future of neighborhood connectivity.
            </p>
          </div>

          <div className="space-y-8">
            {timeline.map((item, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    item.status === "In Progress" ? "bg-green-100 text-green-600" :
                    item.status === "Upcoming" ? "bg-blue-100 text-blue-600" :
                    item.status === "Planned" ? "bg-gray-100 text-gray-600" :
                    "bg-yellow-100 text-yellow-600"
                  }`}>
                    {item.status === "In Progress" ? <CheckCircle className="w-6 h-6" /> :
                     item.status === "Upcoming" ? <Clock className="w-6 h-6" /> :
                     item.status === "Planned" ? <Clock className="w-6 h-6" /> :
                     <Star className="w-6 h-6" />}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                    <Badge variant={
                      item.status === "In Progress" ? "default" :
                      item.status === "Upcoming" ? "secondary" :
                      item.status === "Planned" ? "outline" :
                      "default"
                    }>
                      {item.status}
                    </Badge>
                  </div>
                  <p className="text-gray-600 mb-2">{item.description}</p>
                  <p className="text-sm text-gray-500">{item.phase}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Early Access Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Join Early?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Early access members get exclusive benefits and help shape the future of Yrdly.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="p-6 bg-green-50 rounded-lg">
                <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Be First to Connect
                </h3>
                <p className="text-gray-600">
                  Get early access to connect with your neighbors before the public launch.
                </p>
              </div>
            </div>

            <div className="text-center">
              <div className="p-6 bg-green-50 rounded-lg">
                <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Shape the Product
                </h3>
                <p className="text-gray-600">
                  Your feedback will directly influence features and improvements.
                </p>
              </div>
            </div>

            <div className="text-center">
              <div className="p-6 bg-green-50 rounded-lg">
                <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bell className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Exclusive Updates
                </h3>
                <p className="text-gray-600">
                  Get insider updates on development progress and new features.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup Section */}
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
              Get Early Access to <br /> Yrdly
            </h2>
            <p className="text-xl mb-8">
              Be the first to experience the future of neighborhood connectivity. <span className="text-purple-300">✦</span>
            </p>

            <NewsletterSignup 
              placeholder="Enter your email for early access"
              buttonText="Join Waitlist"
              source="coming-soon-newsletter"
              className="mb-4"
            />

            <p className="text-sm text-white/80">
              By joining the waitlist, you agree to our <button 
                onClick={() => setIsTermsModalOpen(true)}
                className="underline hover:text-yellow-200 cursor-pointer"
              >
                Terms and Conditions
              </button>
            </p>
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
            <Link href="/coming-soon" className="text-sm font-bold text-gray-900 hover:text-green-600">Coming Soon</Link>
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
