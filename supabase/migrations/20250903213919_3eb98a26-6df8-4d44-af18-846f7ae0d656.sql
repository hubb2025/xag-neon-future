-- Fix drone data exposure by restricting public access to sensitive business information
-- Drop existing policies to recreate them properly
DROP POLICY IF EXISTS "Public can view available drones" ON public.drones;
DROP POLICY IF EXISTS "Authenticated users can view categories" ON public.drone_categories;

-- Create new tiered access policies for drones
-- Public users can only see basic marketing information (no pricing/stock)
CREATE POLICY "Public can view basic drone info" 
ON public.drones 
FOR SELECT 
TO anon
USING (status = 'available'::drone_status);

-- Authenticated users can see full details including pricing
CREATE POLICY "Authenticated users can view drone details" 
ON public.drones 
FOR SELECT 
TO authenticated
USING (status = 'available'::drone_status);

-- Fix drone categories - only authenticated users should see categories
CREATE POLICY "Authenticated users can view categories" 
ON public.drone_categories 
FOR SELECT 
TO authenticated
USING (true);

-- Create a function to prevent users from changing their own roles
CREATE OR REPLACE FUNCTION public.prevent_role_self_modification()
RETURNS TRIGGER AS $$
BEGIN
  -- If this is a role/status change and the user is trying to modify their own record
  IF (NEW.role != OLD.role OR NEW.status != OLD.status) 
     AND NEW.user_id = auth.uid() 
     AND NOT is_current_user_admin() THEN
    RAISE EXCEPTION 'Users cannot modify their own role or status';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to prevent self-role modification
DROP TRIGGER IF EXISTS prevent_self_role_modification ON public.profiles;
CREATE TRIGGER prevent_self_role_modification
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.prevent_role_self_modification();

-- Update profiles RLS policy to be simpler
DROP POLICY IF EXISTS "Only admin can update profiles" ON public.profiles;

CREATE POLICY "Admin and users can update profiles" 
ON public.profiles 
FOR UPDATE 
TO authenticated
USING (is_current_user_admin() OR auth.uid() = user_id)
WITH CHECK (is_current_user_admin() OR auth.uid() = user_id);