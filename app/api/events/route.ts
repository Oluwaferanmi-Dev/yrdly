import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Connects to the Web App's Supabase project to read live published events.
// Uses the anon key — RLS on the events table must allow public SELECT on
// visible, published events (which it does by default in the app project).
const APP_SUPABASE_URL = process.env.NEXT_PUBLIC_APP_SUPABASE_URL;
const APP_SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_APP_SUPABASE_ANON_KEY;

export async function GET() {
  try {
    if (!APP_SUPABASE_URL || !APP_SUPABASE_ANON_KEY) {
      console.error('[events/api] App Supabase env vars not set. Returning empty list.');
      return NextResponse.json([]);
    }

    const supabase = createClient(APP_SUPABASE_URL, APP_SUPABASE_ANON_KEY);

    const { data: events, error } = await supabase
      .from('events')
      .select(`
        id,
        title,
        description,
        category,
        cover_image_url,
        location_address,
        location_online,
        lga,
        state,
        start_time,
        end_time,
        status,
        visibility,
        attendee_count,
        ticket_tiers (
          id,
          name,
          price,
          capacity,
          sold,
          is_visible
        )
      `)
      .eq('status', 'PUBLISHED')
      .eq('visibility', 'PUBLIC')
      .order('start_time', { ascending: true })
      .limit(20);

    if (error) {
      console.error('[events/api] Supabase query error:', error.message);
      return NextResponse.json([]);
    }

    // Transform to match the shape expected by the marketing events page
    const transformed = (events || []).map((event) => {
      const tiers = (event.ticket_tiers as any[]) || [];
      const lowestPrice = tiers.length
        ? Math.min(...tiers.map((t) => Number(t.price)))
        : 0;
      const totalCapacity = tiers.reduce(
        (sum, t) => sum + (t.capacity ?? 0),
        0
      );
      const totalSold = tiers.reduce((sum, t) => sum + (t.sold ?? 0), 0);
      const remainingTickets = Math.max(0, totalCapacity - totalSold);

      const startDate = new Date(event.start_time);
      const formattedDate = startDate.toLocaleDateString('en-NG', {
        day: '2-digit',
        month: 'short',
      });

      const location = event.location_online
        ? 'Online Event'
        : [event.location_address, event.lga, event.state]
            .filter(Boolean)
            .join(', ');

      const attendeesLabel =
        totalCapacity > 0
          ? remainingTickets === 0
            ? 'Sold Out'
            : `${remainingTickets} tickets left`
          : `${event.attendee_count ?? 0} attending`;

      return {
        id: event.id,
        name: event.title,
        date: formattedDate,
        location,
        attendees: attendeesLabel,
        image: event.cover_image_url || '/hero-image.png',
        description: event.description || '',
        category: event.category || '',
        ticketCapacity: totalCapacity || null,
        lowestPrice,
        // Used by the events page to build the deep-link to app.yrdly.ng
        appEventUrl: `/events/${event.id}`,
      };
    });

    return NextResponse.json(transformed);
  } catch (error) {
    console.error('[events/api] Unexpected error:', error);
    return NextResponse.json([]);
  }
}
