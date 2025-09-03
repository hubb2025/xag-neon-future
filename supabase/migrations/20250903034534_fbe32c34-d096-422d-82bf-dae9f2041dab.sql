-- Remove the insecure policy that exposes customer data to everyone
DROP POLICY IF EXISTS "Anyone can read customer by email" ON public.customers;

-- Add unique constraint on email to prevent duplicates
ALTER TABLE public.customers ADD CONSTRAINT customers_email_unique UNIQUE (email);

-- Create a secure policy for admins to read customer data
CREATE POLICY "Admin can read customers" 
ON public.customers 
FOR SELECT 
USING (is_admin_user());