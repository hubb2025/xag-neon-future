-- Fix the function search path security issue
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
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;