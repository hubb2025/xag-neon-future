-- Fix the orphaned admin profile by linking it to the correct user
-- and ensure proper admin access

-- First, let's update the orphaned admin profile to link to the correct user
-- We'll use the admin@dronesxag.com.br user that should be the admin
UPDATE profiles 
SET user_id = 'e88eae83-bd2a-4a53-95d3-c6f2705b6ffc'
WHERE email = 'admin@dronesxag.com.br' AND user_id IS NULL AND role = 'admin';

-- Remove the duplicate support profile for admin@dronesxag.com.br
DELETE FROM profiles 
WHERE email = 'admin@dronesxag.com.br' 
AND user_id = 'e88eae83-bd2a-4a53-95d3-c6f2705b6ffc' 
AND role = 'support';

-- Ensure the admin profile has the correct status
UPDATE profiles 
SET status = 'ativo', updated_at = now()
WHERE user_id = 'e88eae83-bd2a-4a53-95d3-c6f2705b6ffc';

-- Add NOT NULL constraint to prevent this issue in the future
ALTER TABLE profiles 
ALTER COLUMN user_id SET NOT NULL;