-- Criar função para registrar o primeiro admin
CREATE OR REPLACE FUNCTION create_first_admin()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  admin_user_id uuid;
BEGIN
  -- Verificar se já existe um usuário admin
  IF NOT EXISTS (
    SELECT 1 FROM user_roles ur
    JOIN profiles p ON ur.user_id = p.user_id
    WHERE p.email = 'leandroaugustomiranda761@gmail.com'
    AND ur.role = 'admin'
  ) THEN
    -- Buscar o usuário pelo email na tabela de profiles
    SELECT user_id INTO admin_user_id
    FROM profiles
    WHERE email = 'leandroaugustomiranda761@gmail.com';
    
    -- Se o usuário existir, atribuir papel de admin
    IF admin_user_id IS NOT NULL THEN
      INSERT INTO user_roles (user_id, role)
      VALUES (admin_user_id, 'admin')
      ON CONFLICT (user_id, role) DO NOTHING;
    END IF;
  END IF;
END;
$$;

-- Criar trigger para automaticamente atribuir admin ao email específico quando criado
CREATE OR REPLACE FUNCTION assign_admin_role()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Se o email for o do admin principal, atribuir papel de admin
  IF NEW.email = 'leandroaugustomiranda761@gmail.com' THEN
    INSERT INTO user_roles (user_id, role)
    VALUES (NEW.user_id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Criar trigger para executar após inserção na tabela profiles
CREATE TRIGGER assign_admin_role_trigger
  AFTER INSERT ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION assign_admin_role();