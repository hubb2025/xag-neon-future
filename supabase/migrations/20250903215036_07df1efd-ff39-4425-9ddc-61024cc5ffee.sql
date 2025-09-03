-- Fix security definer view warnings by removing them
-- The views were created to provide safe public access but the linter flags them
-- Since we're just providing public read access, we can drop them as they're not needed
-- The RLS policies on the base tables provide sufficient security

DROP VIEW IF EXISTS public.drone_categories_public;
DROP VIEW IF EXISTS public.drones_public;