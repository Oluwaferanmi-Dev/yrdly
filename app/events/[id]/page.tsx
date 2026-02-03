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

export default function EventDetailPage({ params }: { params: { id: string } }) {
  const [event, setEvent] = useState<Event | null>(null)
  const [eventQRCode, setEventQRCode] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const [isEventModalOpen, setIsEventModalOpen] = useState(false)

  useEffect(() => {
    fetchEvent()
  }, [params.id])

  const fetchEvent = async () => {
    try {
      const response = await fetch('/api/events')
      const events = await response.json()
      const foundEvent = events.find((e: Event) => e.id === params.id)
      
      if (foundEvent) {
        setEvent(foundEvent)
        
        // Generate QR code for this event that links to the event page
        const eventUrl = `${typeof window !== 'undefined' ? window.location.origin : 'https://yrdly.com'}/events/${params.id}`
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
      <nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 border-b bg-white shadow-sm">
        <Link href="/events" className="flex items-center space-x-2 text-gray-600 hover:text-green-600">
          <ArrowLeft className="w-4 h-4" />
          <span className="font-medium">Back to Events</span>
        </Link>
      </nav>

      {/* Main Content */}
      <main className="flex-grow max-w-4xl mx-auto px-4 py-12 w-full">
        {/* Event Image */}
        <div className="relative h-96 w-full rounded-xl overflow-hidden shadow-lg mb-8">
          <Image
            src={event.image}
            alt={event.name}
            fill
            className="object-cover"
            priority
          />
          
          {/* QR Code Overlay on Flyer */}
          <div className="absolute top-6 right-6 bg-white p-3 rounded-lg shadow-lg border-2 border-gray-200">
            <div className="w-24 h-24 relative">
              {eventQRCode && (
                <Image
                  src={eventQRCode}
                  alt="Event QR Code"
                  fill
                  className="object-contain"
                />
              )}
            </div>
            <p className="text-xs text-gray-600 text-center mt-2 font-semibold">Scan for Details</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Event Details */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{event.name}</h1>
              <p className="text-lg text-gray-600">{event.description}</p>
            </div>

            {/* Event Info Cards */}
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-500">Date & Time</p>
                      <p className="font-semibold text-gray-900">{event.date}</p>
                      <p className="text-sm text-gray-600">{event.time}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-semibold text-gray-900 line-clamp-2">{event.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-500">Registrations</p>
                      <p className="font-semibold text-gray-900">{event.registeredCount}/{event.ticketCapacity}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-500">For Enquiry</p>
                      <p className="font-semibold text-gray-900">{event.contact}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Ticket Registration Card */}
          <div>
            <Card className="sticky top-24 shadow-lg">
              <CardHeader className="bg-green-50 border-b">
                <CardTitle className="text-green-700">Get Your Ticket</CardTitle>
                <CardDescription>
                  {isSoldOut ? "This event is sold out" : `${ticketsRemaining} tickets available`}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                {/* Capacity Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-gray-700">Ticket Capacity</span>
                    <span className="text-sm font-bold text-green-600">{percentageFilled.toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ${
                        percentageFilled < 75 ? 'bg-green-600' : percentageFilled < 90 ? 'bg-yellow-500' : 'bg-red-600'
                      }`}
                      style={{ width: `${percentageFilled}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    {event.registeredCount} registered, {ticketsRemaining} left
                  </p>
                </div>

                {isSoldOut ? (
                  <Button disabled className="w-full h-12 text-base font-semibold">
                    Sold Out
                  </Button>
                ) : (
                  <Button 
                    onClick={() => setIsEventModalOpen(true)}
                    className="w-full h-12 bg-green-600 hover:bg-green-700 text-white text-base font-semibold"
                  >
                    Attend Event
                  </Button>
                )}

                <p className="text-xs text-gray-500 text-center mt-4 leading-relaxed">
                  Free event. You'll receive a unique ticket QR code via email that grants you entry.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-8 text-center text-sm text-gray-500 mt-auto">
        <p>© 2025 Yrdly Community Hub. All rights reserved.</p>
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
