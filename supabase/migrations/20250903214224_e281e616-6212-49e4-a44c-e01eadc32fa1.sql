-- Remove security definer from public view since it only contains safe data
ALTER VIEW public.drones_public SET (security_barrier = false);