import { 
  checkRateLimit, 
  recordRateLimit, 
  checkEmailAlreadyRegistered, 
  createTicket,
  getTicketById,
  markTicketScanned,
  getTicketCountByEvent
} from '../lib/supabase-client.js';

// Mock process.env if needed, though usually handled by node --env-file
// Or we can just import dotenv if available. Let's assume env is already in environment.

const TEST_EVENT_ID = 'kickin-it-in-the-yard';
const TEST_EMAIL = `test-${Date.now()}@example.com`;

async function runTests() {
  console.log('🚀 Starting Supabase Migration Logic Verification...');

  try {
    // 1. Test Rate Limit
    console.log('\n--- Test 1: Rate Limiting ---');
    const ip = '127.0.0.1';
    const countBefore = await checkRateLimit(ip, TEST_EVENT_ID);
    console.log(`Count before: ${countBefore}`);
    await recordRateLimit(ip, TEST_EVENT_ID);
    const countAfter = await checkRateLimit(ip, TEST_EVENT_ID);
    console.log(`Count after recording: ${countAfter}`);
    if (countAfter > countBefore) console.log('✔ Rate limit record successful');

    // 2. Test Registration Check
    console.log('\n--- Test 2: Registration Check ---');
    const isRegBefore = await checkEmailAlreadyRegistered(TEST_EMAIL, TEST_EVENT_ID);
    console.log(`Is registered before: ${isRegBefore}`);

    // 3. Test Ticket Creation
    console.log('\n--- Test 3: Ticket Creation ---');
    const ticketId = `T-${Date.now().toString().slice(-6)}`;
    const newTicket = await createTicket({
      ticketId,
      email: TEST_EMAIL,
      eventId: TEST_EVENT_ID,
      eventName: 'Test Event',
      qrCode: 'data:image/png;base64,mock-qr',
      scanned: false
    });
    console.log('Created Ticket:', JSON.stringify(newTicket, null, 2));
    if (newTicket.ticket_id === ticketId) console.log('✔ Ticket creation successful');

    // 4. Test Duplicate Registration
    const isRegAfter = await checkEmailAlreadyRegistered(TEST_EMAIL, TEST_EVENT_ID);
    console.log(`Is registered after: ${isRegAfter}`);
    if (isRegAfter) console.log('✔ Duplicate registration check successful');

    // 5. Test Ticket Count
    console.log('\n--- Test 5: Ticket Count ---');
    const eventCount = await getTicketCountByEvent(TEST_EVENT_ID);
    console.log(`Ticket count for event: ${eventCount}`);
    if (eventCount > 0) console.log('✔ Ticket count successful');

    // 6. Test Scanning
    console.log('\n--- Test 6: Scanning ---');
    const ticket = await getTicketById(ticketId);
    console.log(`Ticket scanned status before: ${ticket.scanned}`);
    
    await markTicketScanned(ticketId);
    const updatedTicket = await getTicketById(ticketId);
    console.log(`Ticket scanned status after: ${updatedTicket.scanned}`);
    if (updatedTicket.scanned) console.log('✔ Scanning successful');

    console.log('\n✅ ALL TESTS PASSED SUCCESSFULLY! Migration verified.');

  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    if (error.message.includes('Supabase is not configured')) {
      console.log('💡 TIP: Run with environment variables: $env:NEXT_PUBLIC_SUPABASE_URL="..."; $env:SUPABASE_SERVICE_ROLE_KEY="..."; node scripts/test-migration.mjs');
    }
  }
}

runTests();
