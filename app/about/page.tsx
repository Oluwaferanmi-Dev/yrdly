import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header currentPage="about" />

      {/* Hero Section */}
      <section className="relative h-[350px] md:h-[450px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{
            backgroundImage: `url('/about-bg.png')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 via-gray-900/80 to-gray-900" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.15),transparent_50%)]" />
        
        <div className="relative z-10 text-center text-white px-6 animate-fade-in">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-6 border border-white/10">
            Our DNA
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none mb-4">
            About <span className="text-green-500">Us</span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 font-medium max-w-xl mx-auto tracking-tight">
            Built for Nigerians, by Nigerians. Fostering trust on every street and in every estate.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 md:py-32 bg-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-green-50/50 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            {/* Image Cluster */}
            <div className="relative flex-1 animate-fade-in-up">
              <div className="absolute inset-0 bg-green-200/40 rounded-[3rem] blur-3xl scale-90 translate-y-8" />
              <div className="relative rounded-[3rem] overflow-hidden shadow-premium border-8 border-white">
                <Image
                  src="/pexels-e.jpg"
                  alt="Nigerian estate community"
                  width={600}
                  height={800}
                  className="object-cover w-full aspect-[4/5] transition-transform duration-700 hover:scale-105"
                />
              </div>
              {/* Floating Stat Badge */}
              <div className="absolute -bottom-10 -right-6 md:right-10 bg-gray-900 text-white p-8 rounded-[2.5rem] shadow-2xl animate-float z-20 hidden md:block">
                <p className="text-3xl font-black text-green-500 mb-1">100%</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/50">Local Impact</p>
              </div>
            </div>

            {/* Content Column */}
            <div className="flex-1 space-y-10 animate-fade-in-up delay-200">
              <div className="space-y-6">
                <span className="text-green-600 font-black uppercase tracking-[0.3em] text-[10px]">The Yrdly Mission</span>
                <h2 className="text-4xl md:text-6xl font-black text-gray-900 leading-[1.1] tracking-tighter">
                  Technology That Works For <span className="text-green-600 underline decoration-green-600/20 underline-offset-8">You</span>.
                </h2>
              </div>
              
              <div className="space-y-8 text-gray-500 text-lg md:text-xl font-medium leading-relaxed">
                <p>
                  Yrdly is built for Nigerians by Nigerians. We understand the hustle, the owambe weekends, and the unique pulse of our estates and streets.
                </p>
                <p>
                  From buying from the vendor next door to securing your spot at the estate meeting, Yrdly brings your immediate community right to your fingertips.
                </p>
                <div className="pt-6 border-l-4 border-green-600 pl-8 space-y-4">
                  <p className="italic text-gray-900 font-black text-2xl tracking-tight">
                    "Our goal is to bring back the age-old Nigerian spirit of community — where neighbours actually know, trust, and support each other."
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="/contact">
                  <Button className="h-14 px-10 bg-gray-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-green-600 transition-all shadow-xl shadow-gray-900/10">
                    Join the Movement
                  </Button>
                </Link>
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
                question: "How to sell on the Neighbourhood Market?",
                answer: "To sell an item, go to the Marketplace and tap 'Post Hustle'. Add photos, set your price in Naira, and wait for verified neighbours to contact you. It's safe, local, and quick."
              },
              {
                question: "How to buy from neighbours?",
                answer: "Browse the Marketplace for items in your estate or city. You can chat with the seller directly in the app or pay securely via Paystack escrow to ensure you get exactly what you paid for."
              },
              {
                question: "How do I attend local events?",
                answer: "Head to the Events tab to see owambes, estate meetings, and parties near you. Tap 'Get Ticket' to secure your spot. For paid events, checkout is seamless and your ticket is stored in the app."
              },
              {
                question: "Can I save items from vendors?",
                answer: "Yes! Spot a good deal but not ready to buy? Tap the save icon. You can find all your saved items later in your profile under 'Saved Items'."
              },
              {
                question: "How do I contact support?",
                answer: "Having issues? Our Nigerian support team is always ready to help. Go to 'Settings' → 'Support' in the app to chat with us, or send an email to yrdly@gmail.com."
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

      <Footer />
    </div>
  )
}
