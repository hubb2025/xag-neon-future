-- Recriar as funções necessárias que foram removidas
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Criar trigger para atualizar updated_at nos profiles
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Função para lidar com novos usuários
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  is_first_user boolean;
  user_role user_role;
BEGIN
  -- Verificar se é o primeiro usuário (excluindo o admin já criado)
  SELECT COUNT(*) = 0 INTO is_first_user
  FROM public.profiles 
  WHERE email != 'leandroaugustomiranda761@gmail.com';
  
  -- Se for o primeiro usuário, torná-lo admin
  IF is_first_user THEN
    user_role := 'admin';
  ELSE
    user_role := 'support';
  END IF;
  
  -- Inserir perfil
  INSERT INTO public.profiles (user_id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.email),
    user_role
  );
  
  -- Se existir tabela user_roles, inserir role lá também
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_roles' AND table_schema = 'public') THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, user_role::app_role)
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Criar trigger para novos usuários
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();