-- CRITICAL SECURITY FIX: Restrict drone business data access
-- Remove overly permissive policy that exposes all drone details including pricing and stock
DROP POLICY IF EXISTS "Authenticated users can view full drone details" ON public.drones;

-- Keep only the policy that restricts to available drones for general access
-- Admin policy remains for full access

-- CRITICAL SECURITY FIX: Secure drone categories access
-- Remove overly permissive policy that allows unauthenticated access
DROP POLICY IF EXISTS "Authenticated users can view categories" ON public.drone_categories;

-- Create a more secure policy that requires authentication
CREATE POLICY "Authenticated users can view categories" 
ON public.drone_categories 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

-- Create a public view for categories that only exposes safe marketing data
CREATE OR REPLACE VIEW public.drone_categories_public AS
SELECT 
  id,
  name
FROM public.drone_categories;

-- Enable RLS on the public categories view
ALTER VIEW public.drone_categories_public ENABLE ROW LEVEL SECURITY;

-- Allow public access to the safe categories view
CREATE POLICY "Public can view category names" 
ON public.drone_categories_public
FOR SELECT 
USING (true);

-- Update the drones_public view to be more restrictive
CREATE OR REPLACE VIEW public.drones_public AS
SELECT 
  id,
  name,
  model,
  description,
  image_url,
  category_id,
  -- Remove pricing and stock information from public view
  CASE WHEN status = 'available' THEN status ELSE NULL END as status,
  created_at
FROM public.drones
WHERE status = 'available';

-- Update the existing policy for the public drones view
DROP POLICY IF EXISTS "Public can view safe drone data" ON public.drones_public;
CREATE POLICY "Public can view safe drone data" 
ON public.drones_public
FOR SELECT 
USING (true);