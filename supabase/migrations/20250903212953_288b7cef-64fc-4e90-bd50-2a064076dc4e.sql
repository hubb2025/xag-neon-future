-- CRITICAL SECURITY FIX: Create secure team invitation system

-- Create invitation tokens table for secure team member invitations
CREATE TABLE public.team_invitations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'support',
  invitation_token TEXT NOT NULL UNIQUE,
  invited_by UUID NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + interval '7 days'),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'expired')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  accepted_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE public.team_invitations ENABLE ROW LEVEL SECURITY;

-- Create policies for team invitations
CREATE POLICY "Admins can manage invitations" 
ON public.team_invitations 
FOR ALL 
USING (is_admin_user())
WITH CHECK (is_admin_user());

-- Add foreign key constraint to link profiles to auth.users (if user_id is not null)
-- This ensures data integrity for authenticated team members
ALTER TABLE public.profiles 
ADD CONSTRAINT profiles_user_id_fkey 
FOREIGN KEY (user_id) 
REFERENCES auth.users(id) 
ON DELETE CASCADE;

-- Create unique constraint to prevent duplicate profiles for same user
CREATE UNIQUE INDEX idx_profiles_user_id 
ON public.profiles(user_id) 
WHERE user_id IS NOT NULL;

-- Create index for better performance on email lookups
CREATE INDEX idx_profiles_email ON public.profiles(email);
CREATE INDEX idx_team_invitations_token ON public.team_invitations(invitation_token);
CREATE INDEX idx_team_invitations_email ON public.team_invitations(email);

-- Update the handle_new_user function to handle team invitations
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  is_first_user boolean;
  user_role user_role;
  invitation_record record;
BEGIN
  -- Check if there's a pending invitation for this email
  SELECT * INTO invitation_record
  FROM public.team_invitations
  WHERE email = NEW.email 
  AND status = 'pending' 
  AND expires_at > now()
  ORDER BY created_at DESC
  LIMIT 1;
  
  -- If invitation exists, use the invited role
  IF invitation_record.id IS NOT NULL THEN
    user_role := invitation_record.role;
    
    -- Mark invitation as accepted
    UPDATE public.team_invitations
    SET status = 'accepted', accepted_at = now()
    WHERE id = invitation_record.id;
  ELSE
    -- Check if this is the first user (excluding admin)
    SELECT COUNT(*) = 0 INTO is_first_user
    FROM public.profiles 
    WHERE email != 'leandroaugustomiranda761@gmail.com';
    
    -- If first user, make admin; otherwise support
    IF is_first_user THEN
      user_role := 'admin';
    ELSE
      user_role := 'support';
    END IF;
  END IF;
  
  -- Insert or update profile with proper user_id linkage
  INSERT INTO public.profiles (user_id, email, full_name, role, status)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(
      invitation_record.full_name,
      NEW.raw_user_meta_data ->> 'full_name', 
      NEW.email
    ),
    user_role,
    'ativo'
  )
  ON CONFLICT (user_id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = EXCLUDED.full_name,
    role = EXCLUDED.role,
    status = 'ativo',
    updated_at = now();
  
  RETURN NEW;
END;
$$;