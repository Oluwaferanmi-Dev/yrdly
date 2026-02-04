import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import QRCode from 'qrcode'
import { v4 as uuidv4 } from 'uuid'
import { createHash } from 'node:crypto'
import fs from 'fs'
import path from 'path'
import { sendTicketEmail, addAttendeeContact } from '@/lib/brevo-email'
import { 
  checkRateLimit, 
  recordRateLimit, 
  checkEmailAlreadyRegistered, 
  createTicket,
  getTicketCountByEvent
} from '@/lib/supabase-client'

const registrationSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  eventId: z.string(),
  eventName: z.string(),
})

// JSON Persistence paths (for metadata only)
const EVENTS_JSON_PATH = path.join(process.cwd(), 'lib/data/events.json')


export async function POST(request: NextRequest) {
  try {
    
    const body = await request.json()
    const validatedData = registrationSchema.parse(body)
    const { email, eventId, eventName } = validatedData

    // Get IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'

    console.log('[v0] Registration request (JSON):', { email, eventId, eventName, ip })

    // 1. Check Rate Limit
    const rateLimitCount = await checkRateLimit(ip, eventId);
    if (rateLimitCount >= 20) {
      console.warn('[v0] Rate limit hit for:', ip);
      return NextResponse.json(
        { success: false, message: 'Rate limit exceeded. Too many registrations in a short time. Please try again in an hour.' },
        { status: 429 }
      )
    }
    
    // Update rate limits in Supabase
    await recordRateLimit(ip, eventId);

    console.log('[v0] Rate limit check passed');

    // 2. Check Capacity & Event Existence
    let events = [];
    if (fs.existsSync(EVENTS_JSON_PATH)) {
      events = JSON.parse(fs.readFileSync(EVENTS_JSON_PATH, 'utf8'));
    }
    
    const event = events.find((e: any) => e.id === eventId);
    if (!event) {
      return NextResponse.json(
        { success: false, message: 'Event not found.' },
        { status: 404 }
      )
    }

    // 2. Check if email already registered via Supabase
    const alreadyRegistered = await checkEmailAlreadyRegistered(email, eventId);
    if (alreadyRegistered) {
      return NextResponse.json(
        { success: false, message: 'This email is already registered for this event.' },
        { status: 400 }
      )
    }

    // 3. Check Capacity via Supabase
    const registeredCount = await getTicketCountByEvent(eventId);
    if (registeredCount >= (event.ticketCapacity || 100)) {
      return NextResponse.json(
        { success: false, message: `This event is sold out. All ${event.ticketCapacity} tickets have been taken.` },
        { status: 400 }
      )
    }

    // 4. Generate Ticket ID
    const ticketId = uuidv4().replace(/-/g, '').substring(0, 8).toUpperCase()

    // 5. Generate QR Code
    const qrCodeData = `${ticketId}|${email}|${eventId}`
    const qrCode = await QRCode.toDataURL(qrCodeData, {
      errorCorrectionLevel: 'H',
      type: 'image/png',
      margin: 1,
      width: 300,
    })

    // 6. Save ticket to Supabase
    const newTicket = await createTicket({
      ticketId,
      email,
      eventId,
      eventName,
      qrCode, // Base64 stored for direct access
      scanned: false
    });
    
    console.log('[v0] Ticket saved to Supabase:', ticketId);

    // 8. Send ticket email
    console.log('[v0] Attempting to send email to:', email);
    const emailResult = await sendTicketEmail({
      email,
      ticketId,
      eventName,
      qrCode,
    })

    console.log('[v0] Email result:', emailResult);

    if (!emailResult.success) {
      console.error('[v0] Failed to send ticket email:', emailResult.error)
      // We still return success for registration but warn about email
      return NextResponse.json(
        {
          success: true,
          message: `Registration successful, but email delivery failed: ${emailResult.error}. Please ensure BREVO_API_KEY is configured correctly.`,
          ticket: { ticketId, email, eventName, qrCode },
        },
        { status: 200 }
      )
    }

    // 9. Store attendee in Brevo contacts
    console.log('[v0] Storing contact in Brevo...');
    try {
      await addAttendeeContact({
        email,
        name: email.split('@')[0],
        eventName,
      })
      console.log('[v0] Contact stored successfully');
    } catch (contactError) {
      console.error('[v0] Non-critical error storing contact:', contactError);
    }

    console.log('[v0] Registration complete, returning success');

    return NextResponse.json(
      {
        success: true,
        message: 'Registration successful! Check your email for your ticket.',
        ticket: { ticketId, email, eventName, qrCode },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('[v0] Registration error:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred during registration. Please try again.',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
