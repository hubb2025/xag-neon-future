-- Drop the problematic policy
DROP POLICY IF EXISTS "Admin can create team member profiles" ON public.profiles;

-- Create security definer function to check if current user is admin
CREATE OR REPLACE FUNCTION public.is_current_user_admin()
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE user_id = auth.uid()
    AND role = 'admin'
  );
$$;

-- Add policy for admins to create profiles for team members using the function
CREATE POLICY "Admin can create team member profiles" 
ON public.profiles 
FOR INSERT 
WITH CHECK (public.is_current_user_admin());