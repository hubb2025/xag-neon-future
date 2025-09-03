-- Função para criar usuário admin diretamente
CREATE OR REPLACE FUNCTION create_admin_user()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  admin_user_id uuid;
  admin_email text := 'leandroaugustomiranda761@gmail.com';
  admin_password text := 'Leandro$2005';
  admin_full_name text := 'Leandro Augusto Miranda';
BEGIN
  -- Criar usuário usando a função auth do Supabase
  SELECT id INTO admin_user_id 
  FROM auth.users 
  WHERE email = admin_email;
  
  -- Se o usuário não existir, inserir manualmente na tabela auth.users
  IF admin_user_id IS NULL THEN
    admin_user_id := gen_random_uuid();
    
    INSERT INTO auth.users (
      id,
      instance_id,
      email,
      encrypted_password,
      email_confirmed_at,
      created_at,
      updated_at,
      confirmation_token,
      email_change,
      email_change_token_new,
      recovery_token,
      raw_app_meta_data,
      raw_user_meta_data,
      is_super_admin,
      role,
      aud
    ) VALUES (
      admin_user_id,
      '00000000-0000-0000-0000-000000000000',
      admin_email,
      crypt(admin_password, gen_salt('bf')),
      now(),
      now(),
      now(),
      '',
      '',
      '',
      '',
      '{"provider": "email", "providers": ["email"]}',
      format('{"full_name": "%s"}', admin_full_name)::jsonb,
      false,
      'authenticated',
      'authenticated'
    );
  END IF;
  
  -- Inserir ou atualizar o perfil do usuário
  INSERT INTO public.profiles (user_id, email, full_name, role)
  VALUES (admin_user_id, admin_email, admin_full_name, 'admin')
  ON CONFLICT (user_id) 
  DO UPDATE SET 
    email = EXCLUDED.email,
    full_name = EXCLUDED.full_name,
    role = 'admin';
    
  -- Garantir que o usuário tem papel de admin
  INSERT INTO public.user_roles (user_id, role)
  VALUES (admin_user_id, 'admin')
  ON CONFLICT (user_id, role) DO NOTHING;
END;
$$;

-- Executar a função para criar o usuário admin
SELECT create_admin_user();