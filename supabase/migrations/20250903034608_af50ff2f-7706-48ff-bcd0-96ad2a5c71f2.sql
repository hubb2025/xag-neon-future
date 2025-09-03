-- Create a secure function to handle customer creation/lookup for contact forms
CREATE OR REPLACE FUNCTION public.get_or_create_customer(
  p_full_name TEXT,
  p_email TEXT,
  p_phone TEXT DEFAULT NULL
) RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  customer_uuid UUID;
BEGIN
  -- Try to get existing customer by email
  SELECT id INTO customer_uuid
  FROM public.customers
  WHERE email = p_email;
  
  -- If customer doesn't exist, create new one
  IF customer_uuid IS NULL THEN
    INSERT INTO public.customers (full_name, email, phone)
    VALUES (p_full_name, p_email, p_phone)
    RETURNING id INTO customer_uuid;
  END IF;
  
  RETURN customer_uuid;
END;
$$;