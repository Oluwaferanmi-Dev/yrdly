import { Button } from "@/components/ui/button"
import { 
  Home, 
  ShoppingCart, 
  Building2, 
  Calendar, 
  MessageCircle, 
  Shield, 
  Smartphone, 
  CheckCircle,
  ArrowRight,
  Globe,
  Bell,
  Lock,
  CreditCard,
  Users,
  MapPin,
} from 'lucide-react'
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://app.yrdly.ng'

const features = [
  {
    icon: Home,
    title: "Neighbourhood Feed",
    description: "Real-time updates from your local community",
    details: [
      "Live feed of posts from neighbours nearby",
      "Community announcements and local news",
      "Neighbour-to-neighbour communication",
      "Estate and street-level group boards",
    ]
  },
  {
    icon: ShoppingCart,
    title: "Local Marketplace",
    description: "Buy and sell safely within your neighbourhood",
    details: [
      "List items for sale in seconds",
      "Secure escrow payments via Paystack",
      "Seller verification and trust ratings",
      "Category-based search and browse",
    ]
  },
  {
    icon: Building2,
    title: "Business Directory",
    description: "Discover and support local Nigerian businesses",
    details: [
      "Verified local business listings",
      "Customer reviews and star ratings",
      "Direct contact and location info",
      "Business hours and service details",
    ]
  },
  {
    icon: Calendar,
    title: "Events & Activities",
    description: "From owambe parties to networking meetups",
    details: [
      "Discover events in your estate or city",
      "Create and promote your own events",
      "Buy tickets securely online",
      "RSVP and attendance reminders",
    ]
  },
  {
    icon: MessageCircle,
    title: "Direct Messaging",
    description: "Chat privately with neighbours and sellers",
    details: [
      "Private one-on-one chats",
      "In-app marketplace buyer-seller chat",
      "Photo and media sharing",
      "Group chats for estates and communities",
    ]
  },
  {
    icon: Shield,
    title: "Safety & Trust",
    description: "Verified identities and secure transactions",
    details: [
      "Multi-level user verification",
      "Encrypted, secure payment processing",
      "Granular privacy controls",
      "Report and block functionality",
    ]
  },
]

const benefits = [
  { icon: MapPin, title: "Hyperlocal", description: "Content is filtered to your exact neighbourhood — estate, street, or city." },
  { icon: Users, title: "Community First", description: "Foster real connections with neighbours you can actually see and meet." },
  { icon: Shield, title: "Safe & Verified", description: "Verified users, secured payments, and privacy controls at every step." },
  { icon: Globe, title: "All-in-One", description: "Marketplace, events, messaging, and community — one platform, no apps to juggle." },
  { icon: Bell, title: "Real-time Alerts", description: "Instant notifications about local listings, events, and neighbourhood updates." },
  { icon: Smartphone, title: "Mobile & Web", description: "Full access on your phone or browser. Your neighbourhood is always with you." },
]

const onboardingSteps = [
  { step: 1, title: "Sign Up", description: "Create your account with email or Google in under a minute." },
  { step: 2, title: "Verify Location", description: "Set your neighbourhood so you only see what's relevant to you." },
  { step: 3, title: "Complete Profile", description: "Add your name, photo, and a brief bio so neighbours can trust you." },
  { step: 4, title: "Explore Features", description: "Browse local listings, upcoming events, and connect with neighbours." },
  { step: 5, title: "Start Engaging", description: "Post your first listing, RSVP to an event, or say hello to a neighbour." },
]

export default function LearnMorePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header currentPage="learn-more" />

      {/* Hero */}
      <section className="pt-40 pb-24 bg-gradient-to-b from-green-50 to-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-100/60 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center relative">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-8">
            <MapPin className="w-3 h-3" /> Built for Nigerian Neighbourhoods
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter leading-none mb-8">
            Everything You Need<br />to Know About <span className="text-green-600">Yrdly</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed mb-10">
            Yrdly is Nigeria's neighbourhood super-app — connecting you to your local market, community events, and the people just steps away.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href={APP_URL} target="_blank" rel="noopener noreferrer">
              <Button className="h-14 px-10 bg-gray-900 hover:bg-green-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl transition-all">
                Join Yrdly Now <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/events">
              <Button variant="outline" className="h-14 px-10 rounded-2xl font-black uppercase tracking-widest text-xs border-gray-200 hover:border-green-600 hover:text-green-600 transition-all">
                Browse Local Events
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-green-600 font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Platform Features</span>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter mb-6">
              What Yrdly Does
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
              From the Ikoyi estate to the Ibadan street — Yrdly brings every neighbourhood together in one place.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div key={index} className="group bg-white rounded-[2.5rem] p-8 border border-gray-100 hover:border-green-100 hover:shadow-xl transition-all duration-500">
                  <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-600 transition-colors">
                    <IconComponent className="w-6 h-6 text-green-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-black text-gray-900 mb-2 tracking-tight">{feature.title}</h3>
                  <p className="text-gray-400 text-sm mb-6 font-medium">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Yrdly */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-green-600 font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">The Yrdly Advantage</span>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter mb-6">
              Why Nigerians Choose Yrdly
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              We're not just another app. We're the digital backbone of your street, estate, and city.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon
              return (
                <div key={index} className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 hover:border-green-100 hover:shadow-lg transition-all">
                  <div className="w-12 h-12 bg-green-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-green-600/20">
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-black text-gray-900 mb-3 tracking-tight">{benefit.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{benefit.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-green-600 font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Trust & Safety</span>
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter mb-8">
                Security First, Always
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-10">
                Your safety and privacy are our top priorities. We've built multiple layers of protection — because trust is the foundation of every neighbourhood.
              </p>
              <div className="space-y-6">
                {[
                  { icon: Lock, title: "Verified Neighbours", desc: "Every user goes through identity verification before joining their neighbourhood." },
                  { icon: CreditCard, title: "Secure Nigerian Payments", desc: "Paystack-powered escrow ensures money is held safely until delivery is confirmed." },
                  { icon: Shield, title: "Privacy Controls", desc: "You control who sees your profile, location, and contact details." },
                ].map((item, i) => {
                  const Icon = item.icon
                  return (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-green-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-black text-gray-900 mb-1">{item.title}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="bg-gray-900 rounded-[3rem] p-10 text-white text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-green-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="w-20 h-20 bg-green-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-green-600/30">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-black mb-4 tracking-tight">Trusted by Neighbours</h3>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Verified Nigerians across Lagos, Abuja, Port Harcourt and beyond trust Yrdly for their daily community needs.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {["✓ Verified Users", "✓ Secure Escrow", "✓ Privacy First", "✓ Local Focus"].map((item, i) => (
                  <div key={i} className="bg-white/5 rounded-2xl px-4 py-3 text-sm font-bold border border-white/10">{item}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Get Started */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-green-600 font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Getting Started</span>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter mb-6">
              Join in 5 Easy Steps
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Less than 5 minutes and you'll be connected to your neighbourhood.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-8 mb-16">
            {onboardingSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative">
                  <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-black shadow-lg shadow-green-600/20">
                    {step.step}
                  </div>
                  {index < onboardingSteps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-green-100 transform translate-x-8" />
                  )}
                </div>
                <h3 className="text-base font-black text-gray-900 mb-2 tracking-tight">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href={APP_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="h-16 px-12 bg-green-600 hover:bg-gray-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-green-600/20 transition-all">
                Start Your Journey <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-green-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-green-500/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center relative">
          <span className="text-green-400 font-black uppercase tracking-[0.3em] text-[10px] mb-6 block">Ready to Join?</span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8">
            Connect With Your<br /><span className="text-green-400">Neighbourhood Today</span>
          </h2>
          <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
            Thousands of Nigerians are already buying, selling, and connecting locally on Yrdly. Your street is waiting.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={APP_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="h-14 px-10 bg-green-600 hover:bg-white hover:text-gray-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl shadow-green-600/20">
                Join Yrdly Free
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="h-14 px-10 rounded-2xl font-black uppercase tracking-widest text-xs border-white/20 text-white hover:bg-white hover:text-gray-900 bg-transparent transition-all">
                Talk to Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
