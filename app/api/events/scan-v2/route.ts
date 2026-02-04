import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import QRCode from 'qrcode'
import fs from 'fs'
import path from 'path'

const scanSchema = z.object({
  ticketId: z.string().min(1, 'Ticket ID is required'),
})

const TICKETS_JSON_PATH = path.join(process.cwd(), 'lib/data/tickets.json')

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = scanSchema.parse(body)
    const { ticketId } = validatedData

    console.log('[v0] Scan request (Pure JSON):', { ticketId })

    // 1. Look up ticket by ID
    let ticket: any = null
    if (fs.existsSync(TICKETS_JSON_PATH)) {
      const tickets = JSON.parse(fs.readFileSync(TICKETS_JSON_PATH, 'utf8'))
      ticket = tickets.find((t: any) => t.id === ticketId || t.ticketId === ticketId)
    }

    if (!ticket) {
      console.log('[v0] Ticket not found:', ticketId)
      return NextResponse.json(
        { success: false, message: 'Ticket not found. Please check the ticket ID.', scanned: false },
        { status: 404 }
      )
    }

    // 2. Check if already scanned
    if (ticket.used) {
      console.log('[v0] Ticket already scanned:', ticketId)
      
      return NextResponse.json(
        {
          success: false,
          message: `This ticket was already scanned at ${new Date(ticket.usedAt).toLocaleString()}`,
          scanned: true,
          attendee: {
            email: ticket.email,
            eventName: ticket.eventName,
            scannedAt: ticket.usedAt,
            qrCode: ticket.qrCode,
          },
        },
        { status: 400 }
      )
    }

    // 3. Mark ticket as scanned
    const currentTickets = JSON.parse(fs.readFileSync(TICKETS_JSON_PATH, 'utf8'))
    const index = currentTickets.findIndex((t: any) => t.id === ticketId || t.ticketId === ticketId)
    
    if (index !== -1) {
      currentTickets[index].used = true
      currentTickets[index].usedAt = new Date().toISOString()
      fs.writeFileSync(TICKETS_JSON_PATH, JSON.stringify(currentTickets, null, 2))
      
      const updatedTicket = currentTickets[index]
      console.log('[v0] Ticket marked as scanned in JSON:', ticketId)

      return NextResponse.json(
        {
          success: true,
          message: 'Ticket verified successfully!',
          scanned: true,
          attendee: {
            email: updatedTicket.email,
            eventName: updatedTicket.eventName,
            scannedAt: updatedTicket.usedAt,
          },
        },
        { status: 200 }
      )
    }

    return NextResponse.json(
      { success: false, message: 'Failed to update ticket status.' },
      { status: 500 }
    )

  } catch (error) {
    console.error('[v0] Scan error:', error)
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
