import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Mail, Phone, ChevronRight } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header currentPage="contact" />

      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/contact-bg.png')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 via-gray-900/80 to-gray-900" />
        
        <div className="relative z-10 text-center px-6 animate-fade-in pt-20">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-white mb-6 border border-white/10">
            Support Center
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-none mb-4">
            Get in <span className="text-green-500">Touch</span>
          </h1>
          <p className="text-lg md:text-xl text-white/50 font-medium max-w-xl mx-auto tracking-tight">
            We're here to help you navigate your neighborhood.
          </p>
        </div>
      </section>

      {/* Main Support Section */}
      <section className="py-24 md:py-32 bg-white relative overflow-hidden">
        {/* Decorative background atoms */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-50/50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-green-50/30 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            
            {/* Left Column - Contact Info */}
            <div className="space-y-12 animate-fade-in-up">
              <div className="space-y-6">
                <span className="text-green-600 font-black uppercase tracking-[0.3em] text-[10px]">Contact Details</span>
                <h2 className="text-4xl md:text-6xl font-black text-gray-900 leading-[1.1] tracking-tighter">
                  Let's Start a <br /> <span className="text-green-600">Conversation</span>.
                </h2>
                <p className="text-gray-500 text-lg md:text-xl font-medium leading-relaxed max-w-md">
                   Have a specific inquiry or just want to say hello? Our team is always ready to connect.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-8">
                <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 hover:border-green-100 transition-colors group">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-soft group-hover:scale-110 transition-transform">
                    <Mail className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-2">Email Us</h3>
                  <p className="text-lg font-black text-gray-900">yrdly@gmail.com</p>
                </div>

                <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 hover:border-green-100 transition-colors group">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-soft group-hover:scale-110 transition-transform">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-2">Call Us</h3>
                  <p className="text-lg font-black text-gray-900">09166368783</p>
                </div>
              </div>

              {/* Social Connection */}
              <div className="p-10 bg-gray-900 rounded-[3rem] text-white relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl pointer-events-none" />
                 <h3 className="text-2xl font-black mb-4 relative z-10">Social Connection</h3>
                 <p className="text-white/50 mb-8 font-medium relative z-10 leading-relaxed">
                   Follow us on Instagram for the latest neighborhood highlights and exclusive events.
                 </p>
                 <Link href="https://instagram.com/yrdly.ng" className="inline-flex items-center gap-2 text-green-500 font-black uppercase tracking-widest text-xs group-hover:gap-4 transition-all">
                   @yrdly.ng <ChevronRight className="w-4 h-4" />
                 </Link>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="animate-fade-in-up delay-200">
              <div className="bg-white rounded-[3rem] p-10 md:p-14 shadow-premium border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-600 to-green-400" />
                
                <h3 className="text-3xl font-black text-gray-900 mb-10 tracking-tight">Send a Message</h3>
                
                <form className="space-y-8">
                  <div className="grid sm:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">First Name</label>
                      <Input placeholder="Alex" className="h-16 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all text-base font-medium px-6" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Last Name</label>
                      <Input placeholder="Neighbor" className="h-16 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all text-base font-medium px-6" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Email Address</label>
                    <Input placeholder="alex@neighborhood.com" type="email" className="h-16 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all text-base font-medium px-6" />
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Your Message</label>
                    <Textarea 
                      placeholder="How can we help you today?" 
                      className="min-h-[180px] rounded-[2rem] border-gray-100 bg-gray-50/50 focus:bg-white transition-all text-base font-medium px-6 py-5 resize-none" 
                    />
                  </div>

                  <Button className="w-full h-16 bg-gray-900 hover:bg-green-600 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-gray-900/10 transition-all active:scale-[0.98]">
                    Deliver Message
                  </Button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
