-- Remove the insecure policies that allow any authenticated user to access all order items
DROP POLICY IF EXISTS "Authenticated users can view order items" ON public.order_items;
DROP POLICY IF EXISTS "Authenticated users can manage order items" ON public.order_items;

-- Create secure admin-only policies for order_items
CREATE POLICY "Admin can view order_items" 
ON public.order_items 
FOR SELECT 
USING (is_admin_user());

CREATE POLICY "Admin can manage order_items" 
ON public.order_items 
FOR ALL 
USING (is_admin_user());

-- Also ensure orders table is properly secured (it should already be admin-only)
-- Let's check if there are any other insecure policies on orders
DROP POLICY IF EXISTS "Authenticated users can view orders" ON public.orders;
DROP POLICY IF EXISTS "Authenticated users can manage orders" ON public.orders;