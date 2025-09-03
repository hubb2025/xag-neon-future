-- Remover políticas restritivas desnecessárias e corrigir as existentes
DROP POLICY IF EXISTS "Authenticated users can manage customers" ON public.customers;
DROP POLICY IF EXISTS "Authenticated users can view customers" ON public.customers;
DROP POLICY IF EXISTS "Only admin can access customers" ON public.customers;

DROP POLICY IF EXISTS "Authenticated users can manage drones" ON public.drones;
DROP POLICY IF EXISTS "Authenticated users can view drones" ON public.drones;
DROP POLICY IF EXISTS "Only admin can access drones" ON public.drones;

DROP POLICY IF EXISTS "Authenticated users can manage orders" ON public.orders;
DROP POLICY IF EXISTS "Authenticated users can view orders" ON public.orders;
DROP POLICY IF EXISTS "Only admin can access orders" ON public.orders;

-- Recriar políticas mais flexíveis para permitir o primeiro admin funcionar
CREATE POLICY "Admin can manage customers" 
ON public.customers 
FOR ALL 
USING (public.is_admin_user());

CREATE POLICY "Admin can manage drones" 
ON public.drones 
FOR ALL 
USING (public.is_admin_user());

CREATE POLICY "Admin can manage orders" 
ON public.orders 
FOR ALL 
USING (public.is_admin_user());

-- Garantir que todas as outras tabelas também tenham políticas adequadas
CREATE POLICY "Admin can manage addresses" 
ON public.addresses 
FOR ALL 
USING (public.is_admin_user());

CREATE POLICY "Admin can manage support_tickets" 
ON public.support_tickets 
FOR ALL 
USING (public.is_admin_user());

CREATE POLICY "Admin can manage support_messages" 
ON public.support_messages 
FOR ALL 
USING (public.is_admin_user());

-- Remover políticas antigas que podem estar causando conflito
DROP POLICY IF EXISTS "Authenticated users can manage addresses" ON public.addresses;
DROP POLICY IF EXISTS "Authenticated users can view addresses" ON public.addresses;
DROP POLICY IF EXISTS "Authenticated users can manage tickets" ON public.support_tickets;
DROP POLICY IF EXISTS "Authenticated users can view tickets" ON public.support_tickets;
DROP POLICY IF EXISTS "Authenticated users can manage messages" ON public.support_messages;
DROP POLICY IF EXISTS "Authenticated users can view messages" ON public.support_messages;