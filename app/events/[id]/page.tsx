"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, MapPin, Phone, Users, Loader2, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { EventRegistrationModal } from "@/components/event-registration-modal"
import QRCode from 'qrcode'

interface Event {
  id: string
  name: string
  date: string
  time: string
  location: string
  description: string
  image: string
  ticketCapacity: number
  registeredCount: number
  contact: string
  attendees: string
}

export default function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [eventId, setEventId] = useState<string>("")
  const [event, setEvent] = useState<Event | null>(null)
  const [eventQRCode, setEventQRCode] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const [isEventModalOpen, setIsEventModalOpen] = useState(false)

  useEffect(() => {
    params.then((p) => setEventId(p.id))
  }, [params])

  useEffect(() => {
    if (eventId) {
      fetchEvent()
    }
  }, [eventId])

  const fetchEvent = async () => {
    try {
      const response = await fetch('/api/events')
      const events = await response.json()
      const foundEvent = events.find((e: Event) => e.id === eventId)
      
      if (foundEvent) {
        setEvent(foundEvent)
        
        // Generate QR code for this event that links to the event page
        const eventUrl = `${typeof window !== 'undefined' ? window.location.origin : 'https://yrdly.com'}/events/${eventId}`
        const qrDataUrl = await QRCode.toDataURL(eventUrl)
        setEventQRCode(qrDataUrl)
      }
    } catch (error) {
      console.error('Failed to fetch event:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-green-600 animate-spin" />
      </div>
    )
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Event Not Found</h1>
        <Link href="/events">
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            Back to Events
          </Button>
        </Link>
      </div>
    )
  }

  const ticketsRemaining = event.ticketCapacity - event.registeredCount
  const isSoldOut = ticketsRemaining <= 0
  const percentageFilled = (event.registeredCount / event.ticketCapacity) * 100

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-4 md:px-8 py-4 glass border-b border-gray-100">
        <Link href="/events" className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-smooth group">
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span className="font-medium text-sm md:text-base">Back to Events</span>
        </Link>
      </nav>

      {/* Main Content */}
      <main className="flex-grow max-w-4xl mx-auto px-4 py-6 md:py-12 w-full">
        {/* Event Image */}
        <div className="relative h-64 sm:h-80 md:h-[28rem] w-full rounded-2xl overflow-hidden shadow-soft mb-6 md:mb-8 group animate-fade-in">
          <Image
            src={event.image}
            alt={event.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          
          {/* QR Code Overlay on Flyer - Hidden on mobile, shown on tablet+ */}
          <div className="hidden sm:block absolute top-4 right-4 md:top-6 md:right-6 bg-white/95 backdrop-blur-sm p-3 md:p-4 rounded-xl shadow-lg border border-gray-100">
            <div className="w-16 h-16 md:w-20 md:h-20 relative">
              {eventQRCode && (
                <Image
                  src={eventQRCode}
                  alt="Event QR Code"
                  fill
                  className="object-contain"
                />
              )}
            </div>
            <p className="text-xs text-gray-600 text-center mt-2 font-medium">Scan for Details</p>
          </div>
        </div>

        {/* Mobile: Ticket Card First */}
        <div className="md:hidden mb-6 animate-fade-in-up delay-100">
          <Card className="shadow-soft rounded-2xl overflow-hidden border-0">
            <CardHeader className="bg-gradient-to-r from-green-600 to-green-500 py-5">
              <CardTitle className="text-white text-lg">Get Your Ticket</CardTitle>
              <CardDescription className="text-green-100 text-sm">
                {isSoldOut ? "This event is sold out" : `${ticketsRemaining} tickets available`}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-5 pb-5">
              {/* Capacity Progress Bar */}
              <div className="mb-5">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-gray-700">Ticket Capacity</span>
                  <span className="text-sm font-bold text-green-600">{percentageFilled.toFixed(0)}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 rounded-full ${
                      percentageFilled < 75 ? 'bg-gradient-to-r from-green-500 to-green-600' : percentageFilled < 90 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' : 'bg-gradient-to-r from-red-500 to-red-600'
                    }`}
                    style={{ width: `${percentageFilled}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {event.registeredCount} registered, {ticketsRemaining} left
                </p>
              </div>

              {isSoldOut ? (
                <Button disabled className="w-full h-12 text-base font-semibold rounded-xl">
                  Sold Out
                </Button>
              ) : (
                <Button 
                  onClick={() => setIsEventModalOpen(true)}
                  className="w-full h-12 bg-green-600 hover:bg-green-700 text-white text-base font-semibold rounded-xl transition-smooth hover:shadow-lg hover:shadow-green-600/20"
                >
                  Attend Event
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {/* Event Details */}
          <div className="md:col-span-2 space-y-5 md:space-y-6 animate-fade-in-up delay-200">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 text-balance">{event.name}</h1>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">{event.description}</p>
            </div>

            {/* Event Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              <Card className="border-0 shadow-soft rounded-xl hover-lift">
                <CardContent className="p-4 md:p-5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Date & Time</p>
                      <p className="font-semibold text-gray-900 text-sm md:text-base">{event.date}</p>
                      <p className="text-xs md:text-sm text-gray-600">{event.time}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-soft rounded-xl hover-lift">
                <CardContent className="p-4 md:p-5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Location</p>
                      <p className="font-semibold text-gray-900 text-sm md:text-base line-clamp-2">{event.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-soft rounded-xl hover-lift">
                <CardContent className="p-4 md:p-5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Registrations</p>
                      <p className="font-semibold text-gray-900 text-sm md:text-base">{event.registeredCount}/{event.ticketCapacity}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-soft rounded-xl hover-lift">
                <CardContent className="p-4 md:p-5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">For Enquiry</p>
                      <a href={`tel:${event.contact}`} className="font-semibold text-gray-900 text-sm md:text-base hover:text-green-600 transition-smooth">{event.contact}</a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Desktop: Ticket Registration Card */}
          <div className="hidden md:block animate-fade-in-up delay-300">
            <Card className="sticky top-24 shadow-soft rounded-2xl overflow-hidden border-0">
              <CardHeader className="bg-gradient-to-r from-green-600 to-green-500 py-6">
                <CardTitle className="text-white text-xl">Get Your Ticket</CardTitle>
                <CardDescription className="text-green-100">
                  {isSoldOut ? "This event is sold out" : `${ticketsRemaining} tickets available`}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 pb-6">
                {/* Capacity Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-gray-700">Ticket Capacity</span>
                    <span className="text-sm font-bold text-green-600">{percentageFilled.toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 rounded-full ${
                        percentageFilled < 75 ? 'bg-gradient-to-r from-green-500 to-green-600' : percentageFilled < 90 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' : 'bg-gradient-to-r from-red-500 to-red-600'
                      }`}
                      style={{ width: `${percentageFilled}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    {event.registeredCount} registered, {ticketsRemaining} left
                  </p>
                </div>

                {isSoldOut ? (
                  <Button disabled className="w-full h-12 text-base font-semibold rounded-xl">
                    Sold Out
                  </Button>
                ) : (
                  <Button 
                    onClick={() => setIsEventModalOpen(true)}
                    className="w-full h-12 bg-green-600 hover:bg-green-700 text-white text-base font-semibold rounded-xl transition-smooth hover:shadow-lg hover:shadow-green-600/20"
                  >
                    Attend Event
                  </Button>
                )}

                <p className="text-xs text-gray-500 text-center mt-5 leading-relaxed">
                  Free event. You'll receive a unique ticket QR code via email that grants you entry.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-8 text-center text-sm text-gray-500 mt-auto">
        <p>© 2026 Yrdly Community Hub. All rights reserved.</p>
      </footer>

      <EventRegistrationModal 
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
        eventId={event.id}
        eventName={event.name}
      />
    </div>
  )
}
