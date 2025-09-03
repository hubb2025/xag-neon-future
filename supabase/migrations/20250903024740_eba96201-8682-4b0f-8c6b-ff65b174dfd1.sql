-- Criar políticas RLS que permitam apenas login do primeiro admin
-- Primeiro, remover o admin pré-criado para permitir que o primeiro registro seja o admin
DELETE FROM public.profiles WHERE email = 'leandroaugustomiranda761@gmail.com';
DELETE FROM auth.users WHERE email = 'leandroaugustomiranda761@gmail.com';
DELETE FROM auth.identities WHERE email = 'leandroaugustomiranda761@gmail.com';

-- Criar função para verificar se é admin
CREATE OR REPLACE FUNCTION public.is_admin_user()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE user_id = auth.uid()
    AND role = 'admin'
  );
$$;

-- Atualizar políticas RLS para permitir apenas admin fazer login
-- Remover políticas existentes nos profiles
DROP POLICY IF EXISTS "Admin can insert profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;

-- Criar novas políticas mais restritivas
CREATE POLICY "Only admin can view profiles" 
ON public.profiles 
FOR SELECT 
USING (public.is_admin_user() OR auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Only admin can update profiles" 
ON public.profiles 
FOR UPDATE 
USING (public.is_admin_user() OR auth.uid() = user_id);

-- Política para restringir acesso a outras tabelas apenas para admin
CREATE POLICY "Only admin can access customers" 
ON public.customers 
FOR ALL 
USING (public.is_admin_user());

CREATE POLICY "Only admin can access drones" 
ON public.drones 
FOR ALL 
USING (public.is_admin_user());

CREATE POLICY "Only admin can access orders" 
ON public.orders 
FOR ALL 
USING (public.is_admin_user());