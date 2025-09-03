-- CRITICAL SECURITY FIX: Remove dangerous public access policies

-- Drop the dangerous "Anyone can create customers" policy
DROP POLICY IF EXISTS "Anyone can create customers" ON public.customers;

-- Drop the dangerous "Anyone can create support_tickets" policy  
DROP POLICY IF EXISTS "Anyone can create support_tickets" ON public.support_tickets;

-- Ensure only admins can manage customers (this policy should already exist)
-- But let's make sure it's properly defined
DROP POLICY IF EXISTS "Admin can manage customers" ON public.customers;
CREATE POLICY "Admin can manage customers" 
ON public.customers 
FOR ALL 
USING (is_admin_user())
WITH CHECK (is_admin_user());

-- Ensure only admins can manage support tickets (this policy should already exist)
-- But let's make sure it's properly defined  
DROP POLICY IF EXISTS "Admin can manage support_tickets" ON public.support_tickets;
CREATE POLICY "Admin can manage support_tickets"
ON public.support_tickets
FOR ALL
USING (is_admin_user())
WITH CHECK (is_admin_user());

-- Add public read access to drones table for product browsing
-- First ensure current policy exists and is correct
DROP POLICY IF EXISTS "Admin can manage drones" ON public.drones;
CREATE POLICY "Admin can manage drones"
ON public.drones
FOR ALL
USING (is_admin_user())
WITH CHECK (is_admin_user());

-- Add public read access for drones (product catalog)
CREATE POLICY "Public can view available drones"
ON public.drones
FOR SELECT
USING (status = 'available');

-- Ensure the get_or_create_customer function has proper security
-- This function should be the ONLY way to create customers from the contact form