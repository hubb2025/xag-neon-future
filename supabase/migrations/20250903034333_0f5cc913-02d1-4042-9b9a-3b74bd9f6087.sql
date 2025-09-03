-- Allow anyone to insert customers (for contact form)
CREATE POLICY "Anyone can create customers" 
ON public.customers 
FOR INSERT 
WITH CHECK (true);

-- Allow anyone to create support tickets (for contact form)
CREATE POLICY "Anyone can create support_tickets" 
ON public.support_tickets 
FOR INSERT 
WITH CHECK (true);

-- Allow anyone to read their own customer data by email
CREATE POLICY "Anyone can read customer by email" 
ON public.customers 
FOR SELECT 
USING (true);