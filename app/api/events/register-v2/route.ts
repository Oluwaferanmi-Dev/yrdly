import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import QRCode from 'qrcode'
import { v4 as uuidv4 } from 'uuid'
import { createHash } from 'node:crypto'
import { sendTicketEmail, addAttendeeContact } from '@/lib/brevo-email'
import {
  createTicket,
  checkEmailAlreadyRegistered,
  checkRateLimit,
  recordRateLimit,
} from '@/lib/supabase-client'

const registrationSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  eventId: z.string(),
  eventName: z.string(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = registrationSchema.parse(body)
    const { email, eventId, eventName } = validatedData

    // Get IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'

    console.log('[v0] Registration request:', { email, eventId, eventName, ip })

    // 1. Check Rate Limit (5 registrations per IP per event per hour)
    const rateLimitCount = await checkRateLimit(ip, eventId)
    if (rateLimitCount >= 5) {
      console.log('[v0] Rate limit exceeded for IP:', ip)
      return NextResponse.json(
        {
          success: false,
          message: 'Rate limit exceeded. Please try again in an hour.',
        },
        { status: 429 }
      )
    }

    // 2. Check if email already registered for this event
    const alreadyRegistered = await checkEmailAlreadyRegistered(email, eventId)
    if (alreadyRegistered) {
      console.log('[v0] Email already registered:', { email, eventId })
      return NextResponse.json(
        {
          success: false,
          message: 'This email is already registered for this event.',
        },
        { status: 400 }
      )
    }

    // 3. Generate Ticket ID (8 alphanumeric characters)
    const ticketId = uuidv4().replace(/-/g, '').substring(0, 8).toUpperCase()
    console.log('[v0] Generated ticket ID:', ticketId)

    // 4. Generate QR Code
    const qrCodeData = `${ticketId}|${email}|${eventId}`
    const qrCode = await QRCode.toDataURL(qrCodeData, {
      errorCorrectionLevel: 'H',
      type: 'image/png',
      quality: 0.95,
      margin: 1,
      width: 300,
    })

    // 5. Create ticket in Supabase
    const ticket = await createTicket({
      ticketId,
      email,
      eventId,
      eventName,
      qrCode,
      scanned: false,
    })

    console.log('[v0] Ticket created in Supabase:', ticket.id)

    // 6. Send ticket email
    const emailResult = await sendTicketEmail({
      email,
      ticketId,
      eventName,
      qrCode,
    })

    if (!emailResult.success) {
      console.error('[v0] Failed to send ticket email:', emailResult.error)
      return NextResponse.json(
        {
          success: false,
          message: `Ticket generation failed: ${emailResult.error}. Please ensure BREVO_API_KEY is configured.`,
        },
        { status: 500 }
      )
    }

    console.log('[v0] Ticket email sent successfully')

    // 7. Store attendee in Brevo contacts
    const contactResult = await addAttendeeContact({
      email,
      name: email.split('@')[0],
      eventName,
    })

    console.log('[v0] Attendee contact result:', contactResult)

    // 8. Record rate limit
    await recordRateLimit(ip, eventId)

    return NextResponse.json(
      {
        success: true,
        message: 'Registration successful! Check your email for your ticket.',
        ticket: {
          ticketId,
          email,
          eventName,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('[v0] Registration error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid input. Please check your email address.',
          errors: error.errors,
        },
        { status: 400 }
      )
    }

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
