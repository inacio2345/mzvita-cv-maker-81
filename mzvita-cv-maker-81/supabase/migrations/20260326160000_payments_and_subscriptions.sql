-- Adicionar campos de subscrição à tabela user_profiles
ALTER TABLE public.user_profiles
ADD COLUMN IF NOT EXISTS plan_type TEXT DEFAULT 'free',
ADD COLUMN IF NOT EXISTS cv_limit INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS cv_used INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS subscription_expires_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS is_premium BOOLEAN DEFAULT false;

-- Criar tabela de pagamentos
CREATE TABLE IF NOT EXISTS public.payments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  paysuite_id TEXT UNIQUE,
  amount NUMERIC(10, 2) NOT NULL,
  currency TEXT DEFAULT 'MZN',
  status TEXT DEFAULT 'pending',
  reference TEXT UNIQUE,
  plan_type TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS para payments
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para payments
CREATE POLICY "Users can view their own payments"
  ON public.payments
  FOR SELECT
  USING (auth.uid() = user_id);

-- Trigger para atualizar updated_at em payments
CREATE TRIGGER update_payments_updated_at
  BEFORE UPDATE ON public.payments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Função para verificar créditos antes de download (RPC)
CREATE OR REPLACE FUNCTION public.check_can_download(user_uuid UUID)
RETURNS BOOLEAN AS $$
DECLARE
  v_plan TEXT;
  v_limit INTEGER;
  v_used INTEGER;
  v_expires TIMESTAMP WITH TIME ZONE;
BEGIN
  SELECT plan_type, cv_limit, cv_used, subscription_expires_at
  INTO v_plan, v_limit, v_used, v_expires
  FROM public.user_profiles
  WHERE id = user_uuid;

  -- Plano Anual é ilimitado
  IF v_plan = 'annual' THEN
    RETURN TRUE;
  END IF;

  -- Verificar se o plano expirou (para mensal)
  IF v_expires IS NOT NULL AND v_expires < now() THEN
    RETURN FALSE;
  END IF;

  -- Verificar limite
  IF v_used < v_limit THEN
    RETURN TRUE;
  END IF;

  RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Função para registrar download e decrementar créditos (RPC)
CREATE OR REPLACE FUNCTION public.record_download(user_uuid UUID)
RETURNS BOOLEAN AS $$
DECLARE
  v_plan TEXT;
  v_limit INTEGER;
  v_used INTEGER;
  v_expires TIMESTAMP WITH TIME ZONE;
BEGIN
  SELECT plan_type, cv_limit, cv_used, subscription_expires_at
  INTO v_plan, v_limit, v_used, v_expires
  FROM public.user_profiles
  WHERE id = user_uuid;

  -- 1. Verificar se pode baixar
  IF v_plan = 'annual' THEN
    -- Anual apenas incrementa estatística total, sem limite
    UPDATE public.user_profiles 
    SET total_downloads = total_downloads + 1 
    WHERE id = user_uuid;
    RETURN TRUE;
  END IF;

  -- Para Mensal, verificar expiração
  IF v_plan = 'monthly' AND (v_expires IS NULL OR v_expires < now()) THEN
    RETURN FALSE;
  END IF;

  -- Verificar limites para Single e Monthly
  IF v_used < v_limit THEN
    UPDATE public.user_profiles 
    SET 
      cv_used = cv_used + 1,
      total_downloads = total_downloads + 1
    WHERE id = user_uuid;
    RETURN TRUE;
  END IF;

  RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
