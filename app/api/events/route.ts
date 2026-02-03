import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const EVENTS_PATH = path.join(process.cwd(), 'lib/data/events.json');

export async function GET() {
  try {
    if (!fs.existsSync(EVENTS_PATH)) {
      return NextResponse.json([]);
    }
    const data = fs.readFileSync(EVENTS_PATH, 'utf8');
    const events = JSON.parse(data);
    return NextResponse.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}
