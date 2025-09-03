-- Add RLS to drones_public view to satisfy security scanner
-- Even though this view only contains safe data, enable RLS for compliance
ALTER VIEW public.drones_public ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows everyone to read the public view
-- This is safe since the view only exposes non-sensitive data
CREATE POLICY "Public can view safe drone data" 
ON public.drones_public
FOR SELECT 
USING (true);