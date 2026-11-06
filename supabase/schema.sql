-- ==============================================================================
-- ADNOV Creative Media & Digital Solutions - Database Schema
-- Supabase PostgreSQL Migration for 'enquiries' Table & RLS Policies
-- ==============================================================================

-- 1. Create enquiries table
CREATE TABLE IF NOT EXISTS public.enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    company TEXT,
    service TEXT NOT NULL,
    budget TEXT,
    contact_method TEXT DEFAULT 'Email' NOT NULL,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'new' NOT NULL, -- 'new', 'in_review', 'contacted', 'closed'
    source TEXT DEFAULT 'website_enquiry_form' NOT NULL
);

-- 2. Add indexes for performance & administrative queries
CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON public.enquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_enquiries_service ON public.enquiries (service);
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON public.enquiries (status);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

-- 4. Grants: public visitors only need INSERT permission. Table privileges are separate from RLS policies.
GRANT INSERT ON TABLE public.enquiries TO anon;
GRANT USAGE, SELECT ON SEQUENCE IF EXISTS public.enquiries_id_seq TO anon;

-- 5. Policy: Allow anonymous public visitors to INSERT their enquiry
DROP POLICY IF EXISTS "Allow anonymous visitor enquiry submissions" ON public.enquiries;
CREATE POLICY "Allow anonymous visitor enquiry submissions"
ON public.enquiries
FOR INSERT
TO anon
WITH CHECK (true);

-- 6. Policy: Restrict SELECT, UPDATE, DELETE to authenticated administrators only
DROP POLICY IF EXISTS "Allow authenticated staff to view enquiries" ON public.enquiries;
CREATE POLICY "Allow authenticated staff to view enquiries"
ON public.enquiries
FOR SELECT
TO authenticated
USING (true);

DROP POLICY IF EXISTS "Allow authenticated staff to update enquiries" ON public.enquiries;
CREATE POLICY "Allow authenticated staff to update enquiries"
ON public.enquiries
FOR UPDATE
TO authenticated
USING (true);

-- ==============================================================================
-- Instructions: Run this SQL script in your Supabase SQL Editor.
-- ==============================================================================
