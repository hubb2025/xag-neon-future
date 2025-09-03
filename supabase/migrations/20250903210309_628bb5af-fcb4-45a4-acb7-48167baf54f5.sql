-- Remove foreign key constraint to allow team member profiles without auth users
ALTER TABLE public.profiles 
DROP CONSTRAINT IF EXISTS profiles_user_id_fkey;

-- Update the is_current_user_admin function to handle edge cases better
CREATE OR REPLACE FUNCTION public.is_current_user_admin()
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(
    (SELECT role = 'admin' 
     FROM public.profiles 
     WHERE user_id = auth.uid() 
     LIMIT 1), 
    false
  );
$$;

-- Make user_id nullable to support team members without auth accounts
ALTER TABLE public.profiles 
ALTER COLUMN user_id DROP NOT NULL;