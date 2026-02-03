import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import QRCode from 'qrcode';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import { sendTicketEmail } from '@/lib/brevo-email';

const registrationSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  eventId: z.string(),
  eventName: z.string(),
});

const TICKETS_PATH = path.join(process.cwd(), 'lib/data/tickets.json');
const EVENTS_PATH = path.join(process.cwd(), 'lib/data/events.json');

function getTickets() {
  if (!fs.existsSync(TICKETS_PATH)) return [];
  const data = fs.readFileSync(TICKETS_PATH, 'utf8');
  return JSON.parse(data);
}

function getEvents() {
  if (!fs.existsSync(EVENTS_PATH)) return [];
  const data = fs.readFileSync(EVENTS_PATH, 'utf8');
  return JSON.parse(data);
}

function saveTicket(ticket: any) {
  const tickets = getTickets();
  tickets.push(ticket);
  fs.writeFileSync(TICKETS_PATH, JSON.stringify(tickets, null, 2));
}

function updateEventTicketCount(eventId: string) {
  const events = getEvents();
  const tickets = getTickets();
  
  // Count registered tickets for this event
  const eventTickets = tickets.filter((t: any) => t.eventId === eventId);
  const registeredCount = eventTickets.length;
  
  const eventIndex = events.findIndex((e: any) => e.id === eventId);
  if (eventIndex !== -1) {
    events[eventIndex].registeredCount = registeredCount;
    events[eventIndex].attendees = `${registeredCount} attending`;
    fs.writeFileSync(EVENTS_PATH, JSON.stringify(events, null, 2));
  }
}

const RATE_LIMIT_PATH = path.join(process.cwd(), 'lib/data/rate_limits.json');

function checkRateLimit(deviceId: string) {
  if (!fs.existsSync(RATE_LIMIT_PATH)) {
    fs.writeFileSync(RATE_LIMIT_PATH, JSON.stringify({}));
  }
  const data = JSON.parse(fs.readFileSync(RATE_LIMIT_PATH, 'utf8'));
  const now = Date.now();
  const oneHourAgo = now - 60 * 60 * 1000;

  let deviceRequests = data[deviceId] || [];
  // Filter for requests in the last hour
  deviceRequests = deviceRequests.filter((timestamp: number) => timestamp > oneHourAgo);

  if (deviceRequests.length >= 5) {
    return false;
  }

  deviceRequests.push(now);
  data[deviceId] = deviceRequests;
  fs.writeFileSync(RATE_LIMIT_PATH, JSON.stringify(data, null, 2));
  return true;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = registrationSchema.parse(body);
    const { email, eventId, eventName } = validatedData;

    // Use a hash of the user-agent and IP as a simple device ID
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const deviceId = Buffer.from(`${ip}-${userAgent}`).toString('base64');

    // 1. Check Rate Limit (5 per hour)
    if (!checkRateLimit(deviceId)) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Rate limit exceeded. Please try again in an hour.' 
        },
        { status: 429 }
      );
    }

    const tickets = getTickets();
    const events = getEvents();

    // 2. Check ticket capacity
    const event = events.find((e: any) => e.id === eventId);
    if (!event) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Event not found.' 
        },
        { status: 404 }
      );
    }

    // Count existing tickets for this event
    const eventTickets = tickets.filter((t: any) => t.eventId === eventId);
    const currentRegistrations = eventTickets.length;

    if (currentRegistrations >= event.ticketCapacity) {
      return NextResponse.json(
        { 
          success: false, 
          message: `This event is sold out. All ${event.ticketCapacity} tickets have been taken.` 
        },
        { status: 400 }
      );
    }

    // 3. Check for duplicate device/email for this event
    const existingTicket = tickets.find(
      (t: any) => (t.deviceId === deviceId || t.email === email) && t.eventId === eventId
    );

    if (existingTicket) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'You have already registered for this event from this device/email.' 
        },
        { status: 400 }
      );
    }

    // Generate unique ticket ID
    const ticketId = uuidv4().slice(0, 8).toUpperCase();

    // Generate QR Code as Data URL
    const qrCodeDataUrl = await QRCode.toDataURL(ticketId);

    // Save ticket record
    const newTicket = {
      id: ticketId,
      email,
      eventId,
      eventName,
      deviceId,
      createdAt: new Date().toISOString(),
      used: false,
      usedAt: null
    };

    saveTicket(newTicket);

    // Update event ticket count
    updateEventTicketCount(eventId);

    // Send email via Brevo
    const emailResult = await sendTicketEmail({
      email,
      eventName,
      ticketId,
      qrCodeDataUrl
    });

    if (!emailResult.success) {
      console.error('Failed to send ticket email:', emailResult.error);
    }

    // 4. Hide ticketId in response for security
    return NextResponse.json(
      { 
        success: true, 
        message: 'Registration successful! Your ticket has been sent to your email.'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Event registration error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Invalid registration data', errors: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Failed to register. Please try again later.' },
      { status: 500 }
    );
  }
}
