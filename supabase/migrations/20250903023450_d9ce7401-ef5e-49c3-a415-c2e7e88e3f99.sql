-- Criar enum para roles de usuários
CREATE TYPE public.app_role AS ENUM ('admin', 'support', 'user');

-- Criar tabela user_roles
CREATE TABLE public.user_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Habilitar RLS na tabela user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Criar função de segurança para verificar roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Políticas RLS para user_roles
CREATE POLICY "Users can view their own roles" 
ON public.user_roles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Admin can view all roles" 
ON public.user_roles 
FOR SELECT 
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admin can manage all roles" 
ON public.user_roles 
FOR ALL 
USING (public.has_role(auth.uid(), 'admin'));

-- Atualizar função para criar usuário admin sem inserir direto na auth.users
CREATE OR REPLACE FUNCTION create_admin_user_simple()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  admin_email text := 'leandroaugustomiranda761@gmail.com';
  admin_full_name text := 'Leandro Augusto Miranda';
BEGIN
  -- Inserir diretamente na tabela profiles (será criado via auth quando o usuário fizer login)
  INSERT INTO public.profiles (user_id, email, full_name, role)
  SELECT 
    gen_random_uuid(),
    admin_email,
    admin_full_name,
    'admin'
  WHERE NOT EXISTS (
    SELECT 1 FROM public.profiles WHERE email = admin_email
  );
END;
$$;

-- Executar função
SELECT create_admin_user_simple();