-- Criar o usuário admin com todos os campos necessários
DO $$
DECLARE
  admin_user_id uuid;
  admin_email text := 'leandroaugustomiranda761@gmail.com';
  admin_password text := 'Leandro$2005';
  admin_full_name text := 'Leandro Augusto Miranda';
  encrypted_pw text;
  identity_id uuid;
BEGIN
  -- Verificar se o usuário já existe
  SELECT id INTO admin_user_id 
  FROM auth.users 
  WHERE email = admin_email;
  
  -- Se não existir, criar o usuário
  IF admin_user_id IS NULL THEN
    admin_user_id := gen_random_uuid();
    identity_id := gen_random_uuid();
    
    -- Gerar senha criptografada
    encrypted_pw := crypt(admin_password, gen_salt('bf'));
    
    -- Inserir na tabela auth.users
    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      admin_user_id,
      'authenticated',
      'authenticated',
      admin_email,
      encrypted_pw,
      NOW(),
      '{"provider":"email","providers":["email"]}',
      format('{"full_name":"%s"}', admin_full_name)::jsonb,
      NOW(),
      NOW()
    );
    
    -- Inserir na tabela auth.identities com provider_id
    INSERT INTO auth.identities (
      provider_id,
      id,
      user_id,
      identity_data,
      provider,
      created_at,
      updated_at,
      email
    ) VALUES (
      admin_user_id::text,
      identity_id,
      admin_user_id,
      format('{"sub":"%s","email":"%s","email_verified":true,"phone_verified":false}', admin_user_id, admin_email)::jsonb,
      'email',
      NOW(),
      NOW(),
      admin_email
    );
    
    -- Inserir perfil manualmente
    INSERT INTO public.profiles (user_id, email, full_name, role)
    VALUES (admin_user_id, admin_email, admin_full_name, 'admin');
    
    -- Inserir role se a tabela existir
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_roles' AND table_schema = 'public') THEN
      INSERT INTO public.user_roles (user_id, role)
      VALUES (admin_user_id, 'admin')
      ON CONFLICT (user_id, role) DO NOTHING;
    END IF;
    
    RAISE NOTICE 'Admin user created successfully with ID: %', admin_user_id;
  ELSE
    RAISE NOTICE 'Admin user already exists with ID: %', admin_user_id;
  END IF;
END $$;