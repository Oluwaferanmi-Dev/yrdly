-- Create tickets table
CREATE TABLE IF NOT EXISTS public.tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id VARCHAR(8) UNIQUE NOT NULL,
  email VARCHAR(255) NOT NULL,
  event_id VARCHAR(255) NOT NULL,
  event_name VARCHAR(255) NOT NULL,
  qr_code_data TEXT NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  used_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create events table
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

-- Create admin sessions table
CREATE TABLE IF NOT EXISTS public.admin_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  password_hash VARCHAR(255) NOT NULL,
  last_used TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create rate limiting table
CREATE TABLE IF NOT EXISTS public.registration_rate_limit (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  device_ip VARCHAR(45),
  registration_count INT DEFAULT 1,
  window_start TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_tickets_email ON public.tickets(email);
CREATE INDEX IF NOT EXISTS idx_tickets_event_id ON public.tickets(event_id);
CREATE INDEX IF NOT EXISTS idx_tickets_ticket_id ON public.tickets(ticket_id);
CREATE INDEX IF NOT EXISTS idx_tickets_used ON public.tickets(used);
CREATE INDEX IF NOT EXISTS idx_events_id ON public.events(id);

-- Enable Row Level Security
ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registration_rate_limit ENABLE ROW LEVEL SECURITY;

-- Create policies (for now, allow all - customize based on your auth)
CREATE POLICY "Enable read for all users" ON public.tickets
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for registration" ON public.tickets
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for scan verification" ON public.tickets
  FOR UPDATE USING (true);

CREATE POLICY "Enable read events for all" ON public.events
  FOR SELECT USING (true);

CREATE POLICY "Enable read admin sessions" ON public.admin_sessions
  FOR SELECT USING (true);

CREATE POLICY "Enable read rate limit" ON public.registration_rate_limit
  FOR SELECT USING (true);

CREATE POLICY "Enable insert rate limit" ON public.registration_rate_limit
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update rate limit" ON public.registration_rate_limit
  FOR UPDATE USING (true);
