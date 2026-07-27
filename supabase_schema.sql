-- ============================================================
-- SUPABASE DATABASE SCHEMA FOR HVAC WEBSITE FORMS
-- Paste this script into your Supabase Dashboard -> SQL Editor and click RUN
-- ============================================================

-- ------------------------------------------------------------
-- TABLE 1: priority_requests (For 'Our Priority Request' Form)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.priority_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now(),
    required_service TEXT,
    property_type TEXT,
    approx_sq_footage TEXT,
    urgency_level TEXT,
    full_name TEXT,
    phone_number TEXT,
    service_zip_code TEXT
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.priority_requests ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Allow anonymous insert for priority_requests" ON public.priority_requests;
DROP POLICY IF EXISTS "Allow anonymous select for priority_requests" ON public.priority_requests;

-- RLS Policy: Allow public/anonymous users to INSERT data
CREATE POLICY "Allow anonymous insert for priority_requests"
    ON public.priority_requests
    FOR INSERT
    WITH CHECK (true);

-- RLS Policy: Allow public/anonymous users to SELECT data
CREATE POLICY "Allow anonymous select for priority_requests"
    ON public.priority_requests
    FOR SELECT
    USING (true);


-- ------------------------------------------------------------
-- TABLE 2: service_visits (For 'Schedule Service Visit' Modal Form)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.service_visits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now(),
    select_service TEXT,
    preferred_date TEXT,
    arrival_window TEXT,
    full_name TEXT,
    phone_number TEXT,
    property_address TEXT
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.service_visits ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Allow anonymous insert for service_visits" ON public.service_visits;
DROP POLICY IF EXISTS "Allow anonymous select for service_visits" ON public.service_visits;

-- RLS Policy: Allow public/anonymous users to INSERT data
CREATE POLICY "Allow anonymous insert for service_visits"
    ON public.service_visits
    FOR INSERT
    WITH CHECK (true);

-- RLS Policy: Allow public/anonymous users to SELECT data
CREATE POLICY "Allow anonymous select for service_visits"
    ON public.service_visits
    FOR SELECT
    USING (true);
