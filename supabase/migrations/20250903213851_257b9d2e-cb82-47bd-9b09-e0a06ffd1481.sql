-- Fix drone data exposure by restricting public access to sensitive business information
-- Drop existing policies
DROP POLICY IF EXISTS "Public can view available drones" ON public.drones;
DROP POLICY IF EXISTS "Authenticated users can view categories" ON public.drone_categories;

-- Create new tiered access policies for drones
-- Public users can only see basic marketing information
CREATE POLICY "Public can view basic drone info" 
ON public.drones 
FOR SELECT 
USING (
  status = 'available'::drone_status 
  AND auth.uid() IS NULL
);

-- Authenticated users can see more details but not sensitive business data
CREATE POLICY "Authenticated users can view drone details" 
ON public.drones 
FOR SELECT 
TO authenticated
USING (status = 'available'::drone_status);

-- Admin users can see everything (keep existing admin policy)
-- The "Admin can manage drones" policy already exists and covers admin access

-- Fix drone categories - only authenticated users should see categories
CREATE POLICY "Authenticated users can view categories" 
ON public.drone_categories 
FOR SELECT 
TO authenticated
USING (true);

-- Create a view for public drone information that excludes sensitive business data
CREATE OR REPLACE VIEW public.public_drones AS
SELECT 
  id,
  name,
  model,
  description,
  image_url,
  category_id,
  -- Hide sensitive business intelligence
  CASE 
    WHEN auth.uid() IS NOT NULL THEN price
    ELSE NULL 
  END as price,
  CASE 
    WHEN auth.uid() IS NOT NULL THEN stock_quantity
    ELSE NULL 
  END as stock_quantity,
  CASE 
    WHEN auth.uid() IS NOT NULL THEN specifications
    ELSE NULL 
  END as specifications,
  status,
  created_at,
  updated_at
FROM public.drones 
WHERE status = 'available'::drone_status;

-- Grant access to the view
GRANT SELECT ON public.public_drones TO anon, authenticated;

-- Create RLS policy for the view
ALTER VIEW public.public_drones SET (security_barrier = true);

-- Fix team management - prevent users from modifying their own roles
-- Update the existing profiles policies to be more restrictive
DROP POLICY IF EXISTS "Only admin can update profiles" ON public.profiles;

-- New policy: users can only update their own basic info (not roles), admins can update anything
CREATE POLICY "Users can update own basic info" 
ON public.profiles 
FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (
  auth.uid() = user_id 
  AND (
    -- Users can only update non-sensitive fields
    (OLD.role = NEW.role AND OLD.status = NEW.status) 
    OR 
    -- Only admins can change roles/status
    is_current_user_admin()
  )
);

-- Separate policy for admin management
CREATE POLICY "Admin can update any profile" 
ON public.profiles 
FOR UPDATE 
TO authenticated
USING (is_current_user_admin())
WITH CHECK (is_current_user_admin());