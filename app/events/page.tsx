"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Users, CalendarX, Sparkles, ArrowRight, Ticket, Tag } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"

const APP_URL = "https://app.yrdly.ng"

interface MarketingEvent {
  id: string;
  name: string;
  date: string;
  location: string;
  attendees: string;
  image: string;
  description: string;
  category: string;
  ticketCapacity: number | null;
  lowestPrice: number;
  appEventUrl: string;
}

function formatPrice(naira: number) {
  return naira === 0 ? "Free" : `₦${naira.toLocaleString()}`
}

export default function EventsPage() {
  const [events, setEvents] = useState<MarketingEvent[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch('/api/events')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setEvents(data)
      })
      .catch((err) => console.error('Failed to fetch events:', err))
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-[#fafaf9] flex flex-col selection:bg-green-100 selection:text-green-900">
      <Header currentPage="events" />

      {/* Premium Hero Section */}
      <div className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-white">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-green-50/50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-green-100/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-green-50 border border-green-100 text-green-700 text-[10px] font-black uppercase tracking-[0.3em] mb-8 animate-fade-in shadow-soft">
              <Sparkles className="w-3 h-3" />
              <span>What's Happening</span>
            </div>

            <h1 className="text-5xl md:text-8xl font-black text-gray-900 mb-8 tracking-tighter animate-fade-in-up leading-none">
              Estate & Street <br /><span className="text-green-600">Events</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto mb-12 font-medium leading-relaxed tracking-tight animate-fade-in-up delay-100">
              Discover street parties, estate meetings, local markets, and community meetups happening right in your backyard.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 animate-fade-in-up delay-200">
              <Button
                onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })}
                className="bg-gray-900 hover:bg-green-600 text-white px-10 h-16 rounded-[1.5rem] font-black uppercase tracking-widest text-xs shadow-xl shadow-gray-900/10 transition-all active:scale-95"
              >
                Browse Events
              </Button>
              <Link href={`${APP_URL}/events/create`} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" className="px-10 h-16 rounded-[1.5rem] font-black uppercase tracking-widest text-xs text-gray-400 hover:text-green-600 hover:bg-green-50 transition-all">
                  Host an Event <ArrowRight className="w-4 h-4 ml-3" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-6 py-20 md:py-32 w-full relative">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-gray-100 border-t-green-600 rounded-full animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <div className="w-5 h-5 bg-green-600 rounded-full animate-pulse" />
                </div>
              </div>
            </div>
            <p className="mt-8 text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px]">Curating estate highlights...</p>
          </div>
        ) : events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
            {events.map((event, index) => (
              <Card
                key={event.id}
                className="group border border-gray-100 shadow-soft hover:shadow-premium transition-all duration-500 overflow-hidden bg-white rounded-[2.5rem] flex flex-col animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={event.image || '/hero-image.png'}
                    alt={event.name}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />

                  {/* Floating Date Badge */}
                  <div className="absolute top-4 left-4 glass px-3 py-2 rounded-xl text-center min-w-[60px] shadow-sm border-white/40">
                    <span className="block text-green-600 font-black text-lg leading-none">{event.date.split(' ')[0]}</span>
                    <span className="block text-[9px] uppercase font-black text-gray-400 tracking-tighter mt-0.5">{event.date.split(' ')[1]}</span>
                  </div>

                  {/* Price Badge */}
                  <div className="absolute top-4 right-4 bg-gray-900/80 backdrop-blur-sm px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                    <Tag className="w-3 h-3 text-green-400" />
                    <span className="text-[10px] font-black text-white">{formatPrice(event.lowestPrice)}</span>
                  </div>
                </div>

                <CardHeader className="pt-6 pb-2 px-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-green-600/80">
                      {event.category || "Neighborhood Hub"}
                    </span>
                  </div>
                  <CardTitle className="text-xl font-black text-gray-900 leading-tight group-hover:text-green-600 transition-colors tracking-tight">
                    {event.name}
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex-grow pb-6 px-6 flex flex-col">
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-xs text-gray-500 font-bold tracking-tight">
                      <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center mr-3 flex-shrink-0 group-hover:bg-green-50 transition-colors">
                        <MapPin className="w-4 h-4 text-green-600" />
                      </div>
                      {event.location}
                    </div>
                    <div className="flex items-center text-xs text-gray-500 font-bold tracking-tight">
                      <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center mr-3 flex-shrink-0 group-hover:bg-green-50 transition-colors">
                        <Users className="w-4 h-4 text-green-600" />
                      </div>
                      {event.attendees}
                    </div>
                  </div>

                  <p className="text-gray-400 text-xs leading-relaxed mb-6 line-clamp-2 font-medium">
                    {event.description}
                  </p>

                  <div className="mt-auto">
                    {/* Deep-link to app.yrdly.ng/events/[id] */}
                    <Link
                      href={`${APP_URL}${event.appEventUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        className="w-full bg-gray-900 hover:bg-green-600 text-white font-black uppercase tracking-widest text-[10px] h-12 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2"
                      >
                        <Ticket className="w-3.5 h-3.5" />
                        Secure My Spot
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="max-w-2xl mx-auto text-center py-24 px-8 bg-white rounded-[3rem] shadow-premium border border-gray-100 mt-12 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-50/50 rounded-full blur-3xl pointer-events-none" />

            <div className="w-24 h-24 bg-gray-50 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-soft">
              <CalendarX className="w-12 h-12 text-gray-300" />
            </div>
            <h3 className="text-4xl font-black text-gray-900 mb-4 tracking-tighter">No Events Scheduled</h3>
            <p className="text-gray-500 text-lg font-medium leading-relaxed mb-12 max-w-md mx-auto">
              It's quiet for now! Check back soon or host a workshop in your neighborhood.
            </p>
            <Link href={`${APP_URL}/events/create`} target="_blank" rel="noopener noreferrer">
              <Button className="bg-green-600 hover:bg-green-700 text-white px-12 h-16 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-green-600/20 transition-all active:scale-95">
                Host an Event
              </Button>
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
