-- Fix drone data access - remove public access to sensitive fields
-- First, drop the current policy that still allows access to all fields
DROP POLICY IF EXISTS "Public can view basic drone info" ON public.drones;

-- Create a more restrictive public access policy that truly limits what can be seen
-- For security, we'll create a view that exposes only safe fields to public

-- Create a completely secure public view for drones
CREATE OR REPLACE VIEW public.drones_public AS
SELECT 
  id,
  name,
  model,
  description,
  image_url,
  category_id,
  status,
  created_at
FROM public.drones 
WHERE status = 'available'::drone_status;

-- Grant SELECT access to the public view
GRANT SELECT ON public.drones_public TO anon;
GRANT SELECT ON public.drones_public TO authenticated;

-- Create RLS policy for the public view (allows everyone to read)
ALTER VIEW public.drones_public SET (security_barrier = true);

-- Remove public access to the main drones table entirely
-- Only authenticated users and admins should access the full table
CREATE POLICY "Authenticated users can view full drone details" 
ON public.drones 
FOR SELECT 
TO authenticated
USING (true);

-- Ensure anon users cannot access the main drones table at all
-- (This is implicitly handled by not having an anon policy, but let's be explicit)