# Yrdly Ticketing System Walkthrough

This document provides a concise overview of the Yrdly event ticketing and digital validation system, which utilizes a **JSON-based** storage architecture for high performance and zero-config deployment.

## 1. System Overview
- **Storage**: **Supabase PostgreSQL** for v2 ticketing (Persistence, real-time). Legacy v1 API tracks JSON metadata.
- **Email**: Transactional tickets with QR codes sent via **Brevo**.
- **Scanning**: Admin interface at `/scanner` with camera QR detection and manual fallback.

## 2. Initial Setup
Add these environment variables to your production environment (e.g., Vercel):
- `BREVO_API_KEY`: Brevo API key for transactional emails.
- `SCANNER_ADMIN_PASSWORD`: Admin password for `/scanner` authentication.

## 3. Core Workflows

### Registration
1. **Trigger**: User registers via the event modal on the site.
2. **Logic**: System checks rate limits and prevents duplicate emails via **Supabase**.
3. **Issuance**: A unique 8-char ID and QR code are generated and stored in the Supabase `tickets` table.
4. **Delivery**: Attendee receives an email via Brevo and is added to the "Yrdly Attendees" contact list.

### Validation (Scanner)
1. **Access**: Navigate to `/scanner`. Enter the admin password to access the tools.
2. **Method**: Use a device camera to scan QR codes or type the ID manually.
3. **Outcome**: The `scanned` status is updated in Supabase. Unauthorized or duplicate scans are flagged immediately.

## 4. Technical Reference

### Key API Endpoints
- **Registration**: `POST /api/events/register-v2` (Handles rate limiting, capacity, and email).
- **Verification**: `POST /api/events/scan-v2` (Atomic updates to ticket status).
- **Event List**: `GET /api/events` (Fetches active events and real attendance counts).

### Data Storage (`lib/data/`)
- `tickets.json`: Core ledger for all issued tickets and usage status.
- `events.json`: Metadata, descriptions, and capacity for community events.
- `rate_limits.json`: IP-based registration logs to mitigate spam.

## 5. Troubleshooting
- **Camera Access**: Ensure HTTPS is used and browser permissions are granted.
- **Email Delivery**: Verify `BREVO_API_KEY` is set correctly and check Brevo dashboard logs.
- **Supabase Logs**: Check the Supabase dashboard if tickets aren't appearing or scanning fails.
- **Environment Variables**: Ensure `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are set in Vercel.

---
*Note: The system is now fully migrated to Supabase for v2 ticketing to ensure persistence in serverless environments.*
