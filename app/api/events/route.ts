import { NextRequest, NextResponse } from 'next/server';
import eventsData from '@/lib/data/events.json';
import { getTicketCountByEvent } from '@/lib/supabase-client';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const events = eventsData;
    
    // Fetch live counts from Supabase for each event
    const enrichedEvents = await Promise.all(events.map(async (event: any) => {
      try {
        const liveCount = await getTicketCountByEvent(event.id);
        return {
          ...event,
          registeredCount: liveCount,
          attendees: liveCount === 0 ? "No one yet" : `${liveCount} attending`
        };
      } catch (e) {
        console.error(`Error fetching count for event ${event.id}:`, e);
        return event; // Fallback to original event data
      }
    }));

    return NextResponse.json(enrichedEvents);
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}
