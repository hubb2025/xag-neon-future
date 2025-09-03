-- Criar enum para status de membros da equipe
CREATE TYPE public.member_status AS ENUM ('pendente', 'ativo', 'suspenso');

-- Adicionar coluna status na tabela profiles
ALTER TABLE public.profiles 
ADD COLUMN status public.member_status DEFAULT 'pendente';

-- Atualizar membros existentes para ativo (que já têm user_id)
UPDATE public.profiles 
SET status = 'ativo' 
WHERE user_id IS NOT NULL;