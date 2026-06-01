import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, MapPin, ShoppingBag, Calendar, MessageCircle, CheckCircle } from "lucide-react"

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://app.yrdly.ng'

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="pt-40 pb-24 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(34,197,94,0.12),transparent_60%)] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6 text-center relative">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-600/20 border border-green-500/30 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-green-400 mb-8">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Now Live — Join Your Neighbourhood
          </span>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter leading-none mb-8">
            Yrdly is <span className="text-green-400">Live</span><br />in Nigeria 🇳🇬
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-14 font-medium">
            Buy, sell, attend local events, and connect with the people in your neighbourhood — all in one place.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <Link href={APP_URL} target="_blank" rel="noopener noreferrer">
              <Button className="h-16 px-12 bg-green-600 hover:bg-green-500 text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-2xl shadow-green-600/30 transition-all active:scale-95">
                Open Yrdly App <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/events">
              <Button variant="outline" className="h-16 px-12 rounded-2xl font-black uppercase tracking-widest text-sm border-white/20 text-white hover:bg-white hover:text-gray-900 bg-transparent transition-all">
                Browse Local Events
              </Button>
            </Link>
          </div>

          {/* Feature grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: ShoppingBag, label: "Local Marketplace" },
              { icon: Calendar, label: "Neighbourhood Events" },
              { icon: MessageCircle, label: "Direct Messaging" },
              { icon: MapPin, label: "Hyperlocal Discovery" },
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <div key={i} className="bg-white/5 border border-white/10 rounded-2xl px-4 py-5 flex flex-col items-center gap-3">
                  <Icon className="w-6 h-6 text-green-400" />
                  <span className="text-xs font-black uppercase tracking-widest text-gray-400 text-center">{item.label}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* What's waiting for you */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-green-600 font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">On The Platform</span>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter mb-6">
              Everything Your <span className="text-green-600">Neighbourhood</span> Needs
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Neighbourhood Marketplace",
                desc: "Buy and sell locally. From electronics to food items — find it all within your estate or city.",
                cta: "Browse Market",
                href: `${APP_URL}/marketplace`,
              },
              {
                title: "Community Events",
                desc: "Discover owambe parties, networking sessions, sports events, and more happening near you.",
                cta: "See Events",
                href: "/events",
              },
              {
                title: "Trust & Verification",
                desc: "Every neighbour is verified. Every payment is secured. Yrdly keeps your transactions safe.",
                cta: "Learn More",
                href: "/learn-more",
              },
              {
                title: "Neighbourhood Feed",
                desc: "Stay in the loop with local announcements, lost & found, and community news in real time.",
                cta: "Join Now",
                href: APP_URL,
              },
            ].map((card, i) => (
              <div key={i} className="bg-gray-50 rounded-[2.5rem] p-8 border border-gray-100 hover:border-green-100 hover:shadow-xl transition-all group">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <h3 className="text-xl font-black text-gray-900 tracking-tight">{card.title}</h3>
                </div>
                <p className="text-gray-500 leading-relaxed mb-8">{card.desc}</p>
                <Link href={card.href} target={card.href.startsWith('http') ? '_blank' : undefined} rel={card.href.startsWith('http') ? 'noopener noreferrer' : undefined}>
                  <Button className="h-12 px-8 bg-gray-900 hover:bg-green-600 text-white rounded-xl font-black uppercase tracking-widest text-[10px] transition-all">
                    {card.cta} <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-green-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="max-w-3xl mx-auto px-6 text-center relative">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">
            Your Street is Waiting 🏘️
          </h2>
          <p className="text-xl text-white/80 mb-12 leading-relaxed">
            Join thousands of Nigerians already using Yrdly to shop local, attend community events, and connect with their neighbours.
          </p>
          <Link href={APP_URL} target="_blank" rel="noopener noreferrer">
            <Button className="h-16 px-14 bg-white text-green-600 hover:bg-gray-900 hover:text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-2xl transition-all active:scale-95">
              Get Started — It's Free
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
