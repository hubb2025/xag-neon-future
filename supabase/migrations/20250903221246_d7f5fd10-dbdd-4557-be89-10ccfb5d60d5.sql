-- Fix duplicate profiles for admin@dronesxag.com.br
-- Delete the support profile first, then update the admin profile

-- Remove the duplicate support profile for admin@dronesxag.com.br
DELETE FROM profiles 
WHERE email = 'admin@dronesxag.com.br' 
AND user_id = 'e88eae83-bd2a-4a53-95d3-c6f2705b6ffc' 
AND role = 'support';

-- Update the orphaned admin profile to link to the correct user
UPDATE profiles 
SET user_id = 'e88eae83-bd2a-4a53-95d3-c6f2705b6ffc',
    status = 'ativo',
    updated_at = now()
WHERE email = 'admin@dronesxag.com.br' 
AND user_id IS NULL 
AND role = 'admin';

-- Add NOT NULL constraint to prevent this issue in the future
ALTER TABLE profiles 
ALTER COLUMN user_id SET NOT NULL;