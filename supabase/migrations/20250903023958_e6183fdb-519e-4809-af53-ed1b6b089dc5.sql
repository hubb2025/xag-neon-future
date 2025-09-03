-- Criar o usuário admin diretamente usando a extensão pgcrypto
-- Primeiro verificar se o usuário já existe
DO $$
DECLARE
  admin_user_id uuid;
  admin_email text := 'leandroaugustomiranda761@gmail.com';
  admin_password text := 'Leandro$2005';
  admin_full_name text := 'Leandro Augusto Miranda';
  encrypted_pw text;
BEGIN
  -- Verificar se o usuário já existe
  SELECT id INTO admin_user_id 
  FROM auth.users 
  WHERE email = admin_email;
  
  -- Se não existir, criar o usuário
  IF admin_user_id IS NULL THEN
    admin_user_id := gen_random_uuid();
    
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
      invited_at,
      confirmation_token,
      confirmation_sent_at,
      recovery_token,
      recovery_sent_at,
      email_change_token_new,
      email_change,
      email_change_sent_at,
      last_sign_in_at,
      raw_app_meta_data,
      raw_user_meta_data,
      is_super_admin,
      created_at,
      updated_at,
      phone,
      phone_confirmed_at,
      phone_change,
      phone_change_token,
      phone_change_sent_at,
      email_change_token_current,
      email_change_confirm_status,
      banned_until,
      reauthentication_token,
      reauthentication_sent_at
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      admin_user_id,
      'authenticated',
      'authenticated',
      admin_email,
      encrypted_pw,
      NOW(),
      NULL,
      '',
      NULL,
      '',
      NULL,
      '',
      '',
      NULL,
      NULL,
      '{"provider":"email","providers":["email"]}',
      format('{"full_name":"%s"}', admin_full_name)::jsonb,
      FALSE,
      NOW(),
      NOW(),
      NULL,
      NULL,
      '',
      '',
      NULL,
      '',
      0,
      NULL,
      '',
      NULL
    );
    
    -- Inserir na tabela auth.identities
    INSERT INTO auth.identities (
      id,
      user_id,
      identity_data,
      provider,
      last_sign_in_at,
      created_at,
      updated_at
    ) VALUES (
      gen_random_uuid(),
      admin_user_id,
      format('{"sub":"%s","email":"%s"}', admin_user_id, admin_email)::jsonb,
      'email',
      NOW(),
      NOW(),
      NOW()
    );
    
    RAISE NOTICE 'Admin user created with ID: %', admin_user_id;
  ELSE
    RAISE NOTICE 'Admin user already exists with ID: %', admin_user_id;
  END IF;
END $$;