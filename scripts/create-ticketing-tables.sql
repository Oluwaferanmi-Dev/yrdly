
CREATE TABLE IF NOT EXISTS public.tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id VARCHAR(8) UNIQUE NOT NULL,
  email VARCHAR(255) NOT NULL,
  event_id VARCHAR(255) NOT NULL,
  event_name VARCHAR(255) NOT NULL,
  qr_code TEXT NOT NULL,
  scanned BOOLEAN DEFAULT FALSE,
  scanned_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.events (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  date VARCHAR(255),
  location VARCHAR(255),
  image VARCHAR(255),
  description TEXT,
  capacity INT,
  registered_count INT DEFAULT 0,
  attendees VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.admin_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_token TEXT NOT NULL,
  ip_address VARCHAR(45),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.rate_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address VARCHAR(45) NOT NULL,
  event_id VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create indexes
CREATE INDEX IF NOT EXISTS idx_tickets_email ON public.tickets(email);
CREATE INDEX IF NOT EXISTS idx_tickets_event_id ON public.tickets(event_id);
CREATE INDEX IF NOT EXISTS idx_tickets_ticket_id ON public.tickets(ticket_id);
CREATE INDEX IF NOT EXISTS idx_tickets_used ON public.tickets(used);
CREATE INDEX IF NOT EXISTS idx_events_id ON public.events(id);

-- 3. Enable RLS
ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

-- 4. Re-create Policies (Clean slate for Each)
DROP POLICY IF EXISTS "Enable read for all users" ON public.tickets;
CREATE POLICY "Enable read for all users" ON public.tickets FOR SELECT USING (true);

DROP POLICY IF EXISTS "Enable insert for registration" ON public.tickets;
CREATE POLICY "Enable insert for registration" ON public.tickets FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Enable update for scan verification" ON public.tickets;
CREATE POLICY "Enable update for scan verification" ON public.tickets FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Enable read events for all" ON public.events;
CREATE POLICY "Enable read events for all" ON public.events FOR SELECT USING (true);

DROP POLICY IF EXISTS "Enable read admin sessions" ON public.admin_sessions;
CREATE POLICY "Enable read admin sessions" ON public.admin_sessions FOR SELECT USING (true);

DROP POLICY IF EXISTS "Enable read rate limit" ON public.rate_limits;
CREATE POLICY "Enable read rate limit" ON public.rate_limits FOR SELECT USING (true);

DROP POLICY IF EXISTS "Enable insert rate limit" ON public.rate_limits;
CREATE POLICY "Enable insert rate limit" ON public.rate_limits FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Enable update rate limit" ON public.rate_limits;
CREATE POLICY "Enable update rate limit" ON public.rate_limits FOR UPDATE USING (true);
