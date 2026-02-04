# Quick Start Guide: Supabase Ticketing with Camera Scanning

## 1. Initial Setup (First Time Only)

### Add Environment Variables
```bash
# In Vercel Project Settings → Environment Variables
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
BREVO_API_KEY=your_brevo_key
```

### Done! ✅
The Supabase tables were already created when you approved the migration script.

## 2. Test the System

### Test Registration
1. Go to your site and click an event's "Register" button
2. Enter any email
3. Check for:
   - Toast notification "Registration successful!"
   - Email arrives with ticket
   - Attendee appears in Brevo contacts

### Test Scanner
1. Go to `/scanner`
2. Enter admin password (default: `YRDLY-ADMIN-2026`)
3. Choose camera or manual entry
4. Scan a ticket ID or type manually
5. See attendee info displayed

### Test Camera
1. Go to `/scanner` → Login
2. Click "Camera" button
3. Allow camera permission when prompted
4. Point camera at a printed ticket's QR code
5. See "Scanning..." status

## 3. Key API Endpoints

### Register for Event
```bash
POST /api/events/register-v2
Content-Type: application/json

{
  "email": "attendee@example.com",
  "eventId": "event-123",
  "eventName": "Summer Festival"
}
```

### Verify Ticket
```bash
POST /api/events/scan-v2
Content-Type: application/json

{
  "ticketId": "A1B2C3D4"
}
```

## 4. Rate Limiting

**5 registrations per IP per event per hour**

If you hit the limit:
- You'll get error: "Rate limit exceeded. Please try again in an hour."
- This prevents abuse
- Wait 1 hour and try again

## 5. Features Overview

### Registration Flow
1. User enters email → 
2. System validates (no duplicates, rate limit OK) → 
3. Generates 8-char ticket ID → 
4. Creates QR code → 
5. Stores in Supabase → 
6. Sends email via Brevo → 
7. Adds contact to Brevo

### Scanner Flow
1. Admin logs in with password
2. Chooses camera or manual mode
3. Scans ticket or enters ID
4. Ticket marked as verified
5. Attendee info displayed

### Camera Features
- Live video feed from device
- QR pattern detection
- Fallback to keyboard entry
- Mobile-friendly interface

## 6. Troubleshooting

### Issue: "Supabase environment variables not found"
**Fix:** Add env vars to Vercel → Redeploy or restart dev server

### Issue: Camera doesn't appear
**Fix:** 
- Check browser permissions (Settings → Camera)
- Try manual entry mode instead
- HTTPS required in production

### Issue: Email not received
**Fix:**
- Check Brevo API key is correct
- Check email in spam folder
- Verify BREVO_API_KEY in env vars

### Issue: "Email already registered"
**Fix:** This email already has a ticket for this event. Use a different email.

### Issue: "Rate limit exceeded"
**Fix:** Your IP registered 5+ times. Try again in 1 hour.

## 7. Monitoring

### Check Supabase Dashboard
1. Go to supabase.com
2. Select your project
3. View tables: `tickets`, `events`, `admin_sessions`, `rate_limits`

### Check Brevo Contacts
1. Go to brevo.com
2. Contacts → Lists
3. View "Yrdly Attendees" list (ID: 2)

## 8. Common Tasks

### Export Attendee List
```sql
-- Run in Supabase SQL Editor
SELECT email, event_name, created_at 
FROM tickets 
WHERE event_id = 'your-event-id'
ORDER BY created_at DESC;
```

### Verify Scanned Attendees
```sql
SELECT email, event_name, scanned_at 
FROM tickets 
WHERE event_id = 'your-event-id' 
AND scanned = true
ORDER BY scanned_at DESC;
```

### Find Unscanned Tickets
```sql
SELECT email, event_name, ticket_id 
FROM tickets 
WHERE event_id = 'your-event-id' 
AND scanned = false
ORDER BY created_at DESC;
```

## 9. Best Practices

✅ **Do:**
- Use a strong admin password
- Regularly check Supabase backups
- Monitor rate limit hits
- Export attendee lists regularly
- Test camera scanning before event

❌ **Don't:**
- Share admin password
- Commit API keys to Git
- Disable rate limiting
- Store sensitive data in QR codes

## 10. Scale & Performance

The system handles:
- ✅ Unlimited registrations (no file system limits)
- ✅ Multiple concurrent scanners
- ✅ Real-time sync across devices
- ✅ Automatic backups in Supabase
- ✅ Built-in rate limiting

## 11. Advanced: Custom Rate Limit

Edit `/app/api/events/register-v2/route.ts`:
```javascript
const rateLimitCount = await checkRateLimit(ip, eventId)
if (rateLimitCount >= 5) {  // Change 5 to different number
  // Rate limit exceeded
}
```

## 12. API Response Examples

### Successful Registration
```json
{
  "success": true,
  "message": "Registration successful! Check your email for your ticket.",
  "ticket": {
    "ticketId": "ABC12345",
    "email": "user@example.com",
    "eventName": "Summer Festival"
  }
}
```

### Successful Scan
```json
{
  "success": true,
  "message": "Ticket verified successfully!",
  "scanned": true,
  "attendee": {
    "email": "user@example.com",
    "eventName": "Summer Festival",
    "scannedAt": "2026-02-04T15:30:00Z"
  }
}
```

### Already Scanned
```json
{
  "success": false,
  "message": "This ticket was already scanned at 2/4/2026, 3:25 PM",
  "scanned": true,
  "attendee": {
    "email": "user@example.com",
    "eventName": "Summer Festival",
    "scannedAt": "2026-02-04T15:25:00Z"
  }
}
```

## 13. Need Help?

- **Supabase Issues:** supabase.com/docs
- **Brevo Issues:** brevo.com/docs
- **Camera Issues:** Check browser camera permissions
- **QR Code Issues:** Currently uses pattern detection; manual entry works as fallback

---

That's it! Your system is ready to go. Test it, monitor it, and enjoy real-time ticketing with camera scanning! 🎉
