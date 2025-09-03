-- CRITICAL SECURITY FIX: Add explicit deny policies for public access to sensitive data
-- This ensures no unauthenticated access to customer PII and business data

-- Deny public access to customers table
DROP POLICY IF EXISTS "Deny public access to customers" ON public.customers;
CREATE POLICY "Deny public access to customers" 
ON public.customers 
FOR ALL 
TO anon 
USING (false);

-- Deny public access to addresses table
DROP POLICY IF EXISTS "Deny public access to addresses" ON public.addresses;
CREATE POLICY "Deny public access to addresses" 
ON public.addresses 
FOR ALL 
TO anon 
USING (false);

-- Deny public access to orders table
DROP POLICY IF EXISTS "Deny public access to orders" ON public.orders;
CREATE POLICY "Deny public access to orders" 
ON public.orders 
FOR ALL 
TO anon 
USING (false);

-- Deny public access to order_items table
DROP POLICY IF EXISTS "Deny public access to order_items" ON public.order_items;
CREATE POLICY "Deny public access to order_items" 
ON public.order_items 
FOR ALL 
TO anon 
USING (false);

-- Deny public access to support_tickets table
DROP POLICY IF EXISTS "Deny public access to support_tickets" ON public.support_tickets;
CREATE POLICY "Deny public access to support_tickets" 
ON public.support_tickets 
FOR ALL 
TO anon 
USING (false);

-- Deny public access to support_messages table
DROP POLICY IF EXISTS "Deny public access to support_messages" ON public.support_messages;
CREATE POLICY "Deny public access to support_messages" 
ON public.support_messages 
FOR ALL 
TO anon 
USING (false);

-- Deny public access to team_invitations table
DROP POLICY IF EXISTS "Deny public access to team_invitations" ON public.team_invitations;
CREATE POLICY "Deny public access to team_invitations" 
ON public.team_invitations 
FOR ALL 
TO anon 
USING (false);

-- Deny public access to profiles table
DROP POLICY IF EXISTS "Deny public access to profiles" ON public.profiles;
CREATE POLICY "Deny public access to profiles" 
ON public.profiles 
FOR ALL 
TO anon 
USING (false);

-- Deny public access to api_tokens table
DROP POLICY IF EXISTS "Deny public access to api_tokens" ON public.api_tokens;
CREATE POLICY "Deny public access to api_tokens" 
ON public.api_tokens 
FOR ALL 
TO anon 
USING (false);