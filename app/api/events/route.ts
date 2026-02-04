import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const EVENTS_PATH = path.join(process.cwd(), 'lib/data/events.json');
const TICKETS_PATH = path.join(process.cwd(), 'lib/data/tickets.json');

export async function GET() {
  try {
    if (!fs.existsSync(EVENTS_PATH)) {
      return NextResponse.json([]);
    }
    
    const eventsData = fs.readFileSync(EVENTS_PATH, 'utf8');
    const events = JSON.parse(eventsData);
    
    // Load tickets to calculate real attendance
    let tickets = [];
    if (fs.existsSync(TICKETS_PATH)) {
      try {
        const ticketsData = fs.readFileSync(TICKETS_PATH, 'utf8');
        tickets = JSON.parse(ticketsData);
      } catch (e) {
        console.error('Error parsing tickets.json:', e);
      }
    }
    
    // Merge live attendance counts
    const enrichedEvents = events.map((event: any) => {
      const liveCount = tickets.filter((t: any) => t.eventId === event.id).length;
      return {
        ...event,
        registeredCount: liveCount,
        attendees: liveCount === 0 ? "No one yet" : `${liveCount} attending`
      };
    });

    return NextResponse.json(enrichedEvents);
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}
