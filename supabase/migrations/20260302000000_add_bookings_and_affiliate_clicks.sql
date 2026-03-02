-- Create bookings table for admin panel
-- Note: This migration depends on the has_role() function defined in
-- 20260105031400_b503faa8-ecc1-487f-88d7-0332123e5197.sql
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  item_type TEXT,
  course_title TEXT,
  preferred_date TEXT,
  experience_level TEXT,
  addons TEXT,
  addons_json TEXT,
  addons_total NUMERIC NOT NULL DEFAULT 0,
  subtotal_amount NUMERIC,
  total_payable_now NUMERIC,
  internal_notes TEXT,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE
);

-- Enable Row Level Security
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert bookings (public form)
CREATE POLICY "Anyone can submit bookings"
ON public.bookings
FOR INSERT
WITH CHECK (true);

-- Allow admins to view all bookings
CREATE POLICY "Admins can view bookings"
ON public.bookings
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Allow admins to update bookings
CREATE POLICY "Admins can update bookings"
ON public.bookings
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Allow admins to delete bookings
CREATE POLICY "Admins can delete bookings"
ON public.bookings
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create affiliate_clicks table
CREATE TABLE public.affiliate_clicks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  hotel_name TEXT NOT NULL,
  hotel_url TEXT NOT NULL,
  affiliate_id TEXT,
  clicked_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  referrer TEXT,
  user_agent TEXT
);

-- Enable Row Level Security
ALTER TABLE public.affiliate_clicks ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert affiliate clicks
CREATE POLICY "Anyone can insert affiliate clicks"
ON public.affiliate_clicks
FOR INSERT
WITH CHECK (true);

-- Allow admins to view affiliate clicks
CREATE POLICY "Admins can view affiliate clicks"
ON public.affiliate_clicks
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
