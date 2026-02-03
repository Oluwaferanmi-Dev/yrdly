"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, MapPin, Users, ChevronRight, Home, Loader2, CalendarX } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { EventRegistrationModal } from "@/components/event-registration-modal"

interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  attendees: string;
  image: string;
  description: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isEventModalOpen, setIsEventModalOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<{id: string, name: string}>({id: "", name: ""})

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events')
      const data = await response.json()
      if (Array.isArray(data)) {
        setEvents(data)
      }
    } catch (error) {
      console.error('Failed to fetch events:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const openEventModal = (id: string, name: string) => {
    setSelectedEvent({ id, name })
    setIsEventModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-4 md:px-8 py-3 md:py-4 border-b bg-white shadow-sm">
        <div className="flex items-center gap-4 md:gap-8">
          <Link href="/">
            <Image
              src="/yrdly-logo.png"
              alt="YRDLY Logo"
              width={50}
              height={36}
              className="hover:opacity-80 transition-opacity md:w-[62px] md:h-[44px]"
            />
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-gray-600 hover:text-green-600">Home</Link>
            <Link href="/events" className="text-sm font-semibold text-green-600">Events</Link>
            <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-green-600">About</Link>
          </div>
        </div>
        <Link href="/">
          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-green-600 px-2 md:px-4">
            <Home className="w-4 h-4 md:mr-2" />
            <span className="hidden md:inline">Back Home</span>
          </Button>
        </Link>
      </nav>

      {/* Hero Section */}
      <div className="bg-green-600 py-10 md:py-16 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4 text-balance">Community Events</h1>
          <p className="text-base md:text-xl text-green-50 opacity-90 max-w-2xl mx-auto text-pretty">
            Discover neighborhood gatherings, markets, and workshops happening right where you live.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 py-6 md:py-12 w-full">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16 md:py-20">
            <Loader2 className="w-8 h-8 md:w-10 md:h-10 text-green-600 animate-spin mb-4" />
            <p className="text-gray-500 font-medium text-sm md:text-base">Checking for upcoming events...</p>
          </div>
        ) : events.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {events.map((event) => (
              <Card key={event.id} className="overflow-hidden border-none shadow-md hover:shadow-xl transition-shadow flex flex-col">
                <Link href={`/events/${event.id}`}>
                  <div className="relative h-40 sm:h-48 w-full cursor-pointer">
                    <Image
                      src={event.image || '/hero-image.png'}
                      alt={event.name}
                      fill
                      className="object-cover hover:opacity-90 transition-opacity"
                    />
                  </div>
                </Link>
                <CardHeader className="pb-2 px-4 md:px-6">
                  <div className="flex justify-between items-start mb-2">
                    <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                      Upcoming
                    </span>
                    <span className="text-xs text-gray-500 flex items-center">
                      <Users className="w-3 h-3 mr-1" />
                      {event.attendees}
                    </span>
                  </div>
                  <Link href={`/events/${event.id}`}>
                    <CardTitle className="text-lg md:text-xl font-bold text-gray-900 leading-tight cursor-pointer hover:text-green-600 transition-colors">
                      {event.name}
                    </CardTitle>
                  </Link>
                  <CardDescription className="flex items-center text-green-600 font-medium pt-1 text-sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    {event.date}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow pb-4 md:pb-6 px-4 md:px-6">
                  <div className="flex items-start text-sm text-gray-600 mb-4 md:mb-6">
                    <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-gray-400" />
                    {event.location}
                  </div>
                  <p className="text-sm text-gray-700 mb-4 md:mb-6 line-clamp-2 md:line-clamp-3">
                    {event.description}
                  </p>
                  <Button 
                    onClick={() => openEventModal(event.id, event.name)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold h-11 md:h-12"
                  >
                    Attend Event
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
            <CalendarX className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Upcoming Events</h3>
            <p className="text-gray-500 max-w-md mx-auto mb-8">
              There are currently no community events scheduled. Check back soon for workshops, neighborhood gatherings, and local markets.
            </p>
            <Link href="/coming-soon">
              <Button className="bg-green-600 hover:bg-green-700 text-white px-8">
                Request an Event
              </Button>
            </Link>
          </div>
        )}

        {/* Post Event Call to Action */}
        {events.length > 0 && (
          <div className="mt-16 text-center py-12 bg-white rounded-2xl border-2 border-dashed border-gray-200">
            <p className="text-gray-500 font-medium">Have an event to share with the neighborhood?</p>
            <Link href="/coming-soon">
              <Button variant="link" className="text-green-600 mt-2 font-bold flex items-center mx-auto">
                Post your own event
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        )}
      </main>

      <EventRegistrationModal 
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
        eventId={selectedEvent.id}
        eventName={selectedEvent.name}
      />

      <footer className="bg-white border-t py-8 text-center text-sm text-gray-500 mt-auto">
        <p>© 2025 Yrdly Community Hub. All rights reserved.</p>
      </footer>
    </div>
  )
}
