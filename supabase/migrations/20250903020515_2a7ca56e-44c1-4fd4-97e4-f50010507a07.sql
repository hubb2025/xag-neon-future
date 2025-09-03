-- Create enum types
CREATE TYPE public.user_role AS ENUM ('admin', 'support', 'it');
CREATE TYPE public.drone_status AS ENUM ('available', 'maintenance', 'sold', 'reserved');
CREATE TYPE public.order_status AS ENUM ('pending', 'processing', 'shipped', 'delivered', 'cancelled');
CREATE TYPE public.support_status AS ENUM ('open', 'in_progress', 'resolved', 'closed');
CREATE TYPE public.support_priority AS ENUM ('low', 'medium', 'high', 'critical');

-- Create profiles table for user management
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'support',
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create customers table
CREATE TABLE public.customers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  company TEXT,
  document TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create addresses table
CREATE TABLE public.addresses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
  street TEXT NOT NULL,
  number TEXT NOT NULL,
  complement TEXT,
  neighborhood TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip_code TEXT NOT NULL,
  country TEXT NOT NULL DEFAULT 'Brasil',
  is_primary BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create drone categories table
CREATE TABLE public.drone_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create drones table
CREATE TABLE public.drones (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  model TEXT NOT NULL,
  category_id UUID REFERENCES public.drone_categories(id),
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  specifications JSONB,
  status drone_status NOT NULL DEFAULT 'available',
  stock_quantity INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create orders table
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number TEXT NOT NULL UNIQUE,
  customer_id UUID NOT NULL REFERENCES public.customers(id),
  total_amount DECIMAL(10,2) NOT NULL,
  status order_status NOT NULL DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create order items table
CREATE TABLE public.order_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  drone_id UUID NOT NULL REFERENCES public.drones(id),
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create support tickets table
CREATE TABLE public.support_tickets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ticket_number TEXT NOT NULL UNIQUE,
  customer_id UUID NOT NULL REFERENCES public.customers(id),
  assigned_to UUID REFERENCES public.profiles(id),
  subject TEXT NOT NULL,
  description TEXT NOT NULL,
  status support_status NOT NULL DEFAULT 'open',
  priority support_priority NOT NULL DEFAULT 'medium',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create support messages table
CREATE TABLE public.support_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ticket_id UUID NOT NULL REFERENCES public.support_tickets(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES public.profiles(id),
  message TEXT NOT NULL,
  is_internal BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create API tokens table
CREATE TABLE public.api_tokens (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  token_hash TEXT NOT NULL UNIQUE,
  created_by UUID NOT NULL REFERENCES public.profiles(id),
  permissions JSONB,
  expires_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN NOT NULL DEFAULT true,
  last_used_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.drone_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.drones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_tokens ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Admin can insert profiles" ON public.profiles FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND role = 'admin')
);

-- Create RLS policies for customers (all authenticated users can access)
CREATE POLICY "Authenticated users can view customers" ON public.customers FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can manage customers" ON public.customers FOR ALL USING (auth.uid() IS NOT NULL);

-- Create RLS policies for addresses
CREATE POLICY "Authenticated users can view addresses" ON public.addresses FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can manage addresses" ON public.addresses FOR ALL USING (auth.uid() IS NOT NULL);

-- Create RLS policies for drone categories
CREATE POLICY "Authenticated users can view categories" ON public.drone_categories FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Admin can manage categories" ON public.drone_categories FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND role = 'admin')
);

-- Create RLS policies for drones
CREATE POLICY "Authenticated users can view drones" ON public.drones FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can manage drones" ON public.drones FOR ALL USING (auth.uid() IS NOT NULL);

-- Create RLS policies for orders
CREATE POLICY "Authenticated users can view orders" ON public.orders FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can manage orders" ON public.orders FOR ALL USING (auth.uid() IS NOT NULL);

-- Create RLS policies for order items
CREATE POLICY "Authenticated users can view order items" ON public.order_items FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can manage order items" ON public.order_items FOR ALL USING (auth.uid() IS NOT NULL);

-- Create RLS policies for support tickets
CREATE POLICY "Authenticated users can view tickets" ON public.support_tickets FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can manage tickets" ON public.support_tickets FOR ALL USING (auth.uid() IS NOT NULL);

-- Create RLS policies for support messages
CREATE POLICY "Authenticated users can view messages" ON public.support_messages FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can manage messages" ON public.support_messages FOR ALL USING (auth.uid() IS NOT NULL);

-- Create RLS policies for API tokens
CREATE POLICY "Users can view own tokens" ON public.api_tokens FOR SELECT USING (
  created_by IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())
);
CREATE POLICY "Admin can view all tokens" ON public.api_tokens FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Users can manage own tokens" ON public.api_tokens FOR ALL USING (
  created_by IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())
);

-- Create function to auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.email),
    'support'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON public.customers FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_addresses_updated_at BEFORE UPDATE ON public.addresses FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_drone_categories_updated_at BEFORE UPDATE ON public.drone_categories FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_drones_updated_at BEFORE UPDATE ON public.drones FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_support_tickets_updated_at BEFORE UPDATE ON public.support_tickets FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_api_tokens_updated_at BEFORE UPDATE ON public.api_tokens FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample drone categories
INSERT INTO public.drone_categories (name, description) VALUES
('Agricultura', 'Drones especializados para uso agrícola'),
('Vigilância', 'Drones para monitoramento e segurança'),
('Entrega', 'Drones para transporte e entrega de produtos'),
('Corrida', 'Drones para competições e racing');

-- Insert sample drones
INSERT INTO public.drones (name, model, category_id, description, price, specifications, stock_quantity) VALUES
('XAG Phantom Pro', 'P4-2024', (SELECT id FROM public.drone_categories WHERE name = 'Agricultura'), 'Drone profissional para agricultura de precisão', 15999.99, '{"camera": "4K", "autonomia": "35min", "alcance": "10km"}', 5),
('XAG Stealth Elite', 'SE-2024', (SELECT id FROM public.drone_categories WHERE name = 'Vigilância'), 'Drone tático para vigilância e segurança', 24999.99, '{"camera": "Thermal + 4K", "autonomia": "45min", "alcance": "15km"}', 3),
('XAG Cargo Master', 'CM-2024', (SELECT id FROM public.drone_categories WHERE name = 'Entrega'), 'Drone para transporte de cargas até 25kg', 32999.99, '{"carga": "25kg", "autonomia": "60min", "alcance": "20km"}', 2);