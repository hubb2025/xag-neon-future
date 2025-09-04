-- Add RLS policy to allow admins to delete team member profiles
CREATE POLICY "Admin can delete team member profiles"
ON public.profiles
FOR DELETE
TO authenticated
USING (is_current_user_admin());