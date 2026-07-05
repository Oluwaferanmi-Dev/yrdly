import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import fs from 'fs';
import path from 'path';

const scanSchema = z.object({
  ticketId: z.string().min(1, 'Ticket ID is required'),
  adminPassword: z.string().min(1, 'Admin password is required'),
});

const ADMIN_PASSWORD = process.env.SCANNER_ADMIN_PASSWORD;
if (!ADMIN_PASSWORD) {
  // Crash loudly at module load time in prod so the deployment is blocked, not silently broken.
  throw new Error('[scanner] SCANNER_ADMIN_PASSWORD environment variable is not set. Refusing to start with no password protection.');
}

const DATA_PATH = path.join(process.cwd(), 'lib/data/tickets.json');

function getTickets() {
  if (!fs.existsSync(DATA_PATH)) return [];
  const data = fs.readFileSync(DATA_PATH, 'utf8');
  return JSON.parse(data);
}

function updateTicket(updatedTicket: any) {
  const tickets = getTickets();
  const index = tickets.findIndex((t: any) => t.id === updatedTicket.id);
  if (index !== -1) {
    tickets[index] = updatedTicket;
    fs.writeFileSync(DATA_PATH, JSON.stringify(tickets, null, 2));
    return true;
  }
  return false;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = scanSchema.parse(body);
    const { ticketId, adminPassword } = validatedData;

    // Check admin password
    if (adminPassword !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: false, message: 'Invalid Admin Password' },
        { status: 401 }
      );
    }

    const tickets = getTickets();
    const ticket = tickets.find((t: any) => t.id.toUpperCase() === ticketId.toUpperCase());

    if (!ticket) {
      return NextResponse.json(
        { success: false, message: 'Invalid Ticket: This ticket does not exist.' },
        { status: 404 }
      );
    }

    if (ticket.used) {
      return NextResponse.json(
        { 
          success: false, 
          message: `Ticket already used at ${new Date(ticket.usedAt).toLocaleString()}.`,
          ticket 
        },
        { status: 400 }
      );
    }

    // Mark as used
    ticket.used = true;
    ticket.usedAt = new Date().toISOString();

    updateTicket(ticket);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Ticket Validated: Entry granted!',
        ticket 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Ticket scan error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Ticket ID is required' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Internal server error during scanning.' },
      { status: 500 }
    );
  }
}
