# Yrdly Ticketing System Documentation

## System Overview

Yrdly has a complete event ticketing and QR code scanning system built-in. Here's how it works:

### Current Implementation

**1. Registration Flow:**
- Users enter their email on event pages to register
- Email is validated and checked against existing registrations
- A unique ticket ID is generated (8 characters, uppercase)
- QR code is generated from the ticket ID
- Ticket is saved to `/lib/data/tickets.json`
- Email is sent to attendee with QR code via Brevo
- Attendee email is stored in Brevo as a contact for future marketing

**2. Ticket Storage:**
- Location: `/lib/data/tickets.json`
- Contains: ticket ID, email, event ID, event name, device fingerprint, creation date, used status
- Rate limiting: 5 registrations per device per hour
- Duplicate prevention: Same email/device cannot register twice per event
- Capacity checking: Events have ticket limits

**3. Email Integration (Brevo):**
- Ticket email includes QR code as attachment
- Attendee emails stored in Brevo list ID 2 ("Yrdly Attendees")
- Custom attributes track: EVENT_NAME, REGISTRATION_DATE
- Allows future segmented email campaigns

**4. QR Code Scanning:**
- Access via: `/scanner`
- Admin authentication required (default: YRDLY-ADMIN-2026)
- Endpoint: `POST /api/events/scan`
- Marks ticket as used once scanned
- Prevents duplicate entries

## How to Access the Scanner

### Direct URL Access:
```
https://yourdomain.com/scanner
```

### Admin Password:
- Default: `YRDLY-ADMIN-2026`
- Can be customized via `SCANNER_ADMIN_PASSWORD` environment variable

### Scanner Features:
- Admin login page
- Ticket ID input (case-insensitive)
- Real-time verification
- Shows attendee details: name, email, event, usage status
- Prevents duplicate scans

## Troubleshooting QR Code Scanning

### Issue: Scanner page not loading
**Solution:**
- Ensure you're visiting `/scanner` directly
- Check that the browser supports JavaScript
- Try a different device (some mobile browsers have issues with password fields)

### Issue: "Invalid Admin Password"
**Solution:**
- Default password is `YRDLY-ADMIN-2026`
- If customized, check `SCANNER_ADMIN_PASSWORD` environment variable
- Reset to default if unsure

### Issue: "Invalid Ticket - does not exist"
**Solution:**
- Verify the ticket ID is correct (8 character alphanumeric)
- Check if the attendee email is registered in the system
- Ensure you're using the exact ticket from their email

### Issue: "Ticket already used"
**Solution:**
- This ticket has already been scanned
- Cannot process the same ticket twice
- Ask attendee for confirmation they're the same person

## Environment Setup

Required environment variables:
```
BREVO_API_KEY=your_brevo_api_key
SCANNER_ADMIN_PASSWORD=your_custom_password (optional, defaults to YRDLY-ADMIN-2026)
```

## API Endpoints

### Register for Event
**POST** `/api/events/register`
```json
{
  "email": "user@example.com",
  "eventId": "event123",
  "eventName": "Community Meetup"
}
```

Response:
```json
{
  "success": true,
  "message": "Registration successful! Your ticket has been sent to your email."
}
```

### Scan Ticket
**POST** `/api/events/scan`
```json
{
  "ticketId": "A1B2C3D4",
  "adminPassword": "YRDLY-ADMIN-2026"
}
```

Response:
```json
{
  "success": true,
  "message": "Ticket Validated: Entry granted!",
  "ticket": {
    "id": "A1B2C3D4",
    "email": "user@example.com",
    "eventName": "Community Meetup",
    "used": true,
    "usedAt": "2026-02-04T10:30:00Z"
  }
}
```

## Email Templates

### Ticket Email
- Subject: "Your Ticket for [Event Name] - [Ticket ID]"
- Includes QR code as attachment
- Displays ticket ID in monospace font for manual entry if needed
- Warning that tickets can only be scanned once

### Welcome Email
- Sent to newsletter subscribers
- Lists community benefits
- Includes signup source and date

### Contact Form Email
- Admin notification of contact form submission
- Includes reply link and admin dashboard link

## Data Files

Location: `/lib/data/`

**tickets.json** - All event tickets and their status
**events.json** - Event details and registration counts
**rate_limits.json** - Device fingerprints for rate limiting

## Best Practices

1. **For Event Organizers:**
   - Share the scanner URL on event day
   - Use the admin password securely
   - Screenshot ticket counts before and after event

2. **For Attendees:**
   - Save the email with QR code
   - Arrive early to allow scanning time
   - Have backup: your ticket ID (8 characters)

3. **For Administrators:**
   - Change default admin password before going live
   - Monitor Brevo list for accurate attendee data
   - Regular backups of tickets.json file
   - Clean up old events monthly

## Future Enhancements

Potential improvements:
- Database migration (from JSON to PostgreSQL/Supabase)
- Mobile app QR scanner
- Real-time attendance dashboard
- Email reminders before events
- Refund/cancellation system
- Waitlist functionality
