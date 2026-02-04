import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import {
  getTicketById,
  markTicketScanned,
  validateAdminSession,
} from '@/lib/supabase-client'

const scanSchema = z.object({
  ticketId: z.string().min(1, 'Ticket ID is required'),
  sessionToken: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = scanSchema.parse(body)
    const { ticketId, sessionToken } = validatedData

    console.log('[v0] Scan request:', { ticketId })

    // Get client IP for session validation
    const clientIp = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'

    // If sessionToken provided, validate it
    if (sessionToken) {
      const session = await validateAdminSession(sessionToken, clientIp)
      if (!session) {
        console.log('[v0] Invalid or expired session')
        return NextResponse.json(
          {
            success: false,
            message: 'Session expired. Please log in again.',
          },
          { status: 401 }
        )
      }
    }

    // 1. Look up ticket by ID
    const ticket = await getTicketById(ticketId)

    if (!ticket) {
      console.log('[v0] Ticket not found:', ticketId)
      return NextResponse.json(
        {
          success: false,
          message: 'Ticket not found. Please check the ticket ID.',
          scanned: false,
        },
        { status: 404 }
      )
    }

    console.log('[v0] Ticket found:', { ticketId, email: ticket.email, scanned: ticket.scanned })

    // 2. Check if already scanned
    if (ticket.scanned) {
      console.log('[v0] Ticket already scanned:', ticketId)
      return NextResponse.json(
        {
          success: false,
          message: `This ticket was already scanned at ${new Date(ticket.scanned_at).toLocaleString()}`,
          scanned: true,
          attendee: {
            email: ticket.email,
            eventName: ticket.event_name,
            scannedAt: ticket.scanned_at,
          },
        },
        { status: 400 }
      )
    }

    // 3. Mark ticket as scanned
    const updatedTicket = await markTicketScanned(ticketId)

    console.log('[v0] Ticket marked as scanned:', ticketId)

    return NextResponse.json(
      {
        success: true,
        message: 'Ticket verified successfully!',
        scanned: true,
        attendee: {
          email: updatedTicket.email,
          eventName: updatedTicket.event_name,
          scannedAt: updatedTicket.scanned_at,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('[v0] Scan error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid request. Please provide a valid ticket ID.',
          errors: error.errors,
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred while scanning the ticket.',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
