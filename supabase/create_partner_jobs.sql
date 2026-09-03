CREATE TABLE IF NOT EXISTS public.partner_jobs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    company TEXT NOT NULL,
    location TEXT NOT NULL,
    category TEXT NOT NULL,
    job_type TEXT DEFAULT 'Tempo Inteiro',
    salary TEXT,
    description TEXT,
    requirements TEXT[],
    responsibilities TEXT[],
    deadline TEXT,
    application_url TEXT,
    application_email TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Habilitar RLS
ALTER TABLE public.partner_jobs ENABLE ROW LEVEL SECURITY;

-- Políticas de segurança
-- Qualquer um pode ler vagas ativas
CREATE POLICY "Public pode ver vagas ativas" 
ON public.partner_jobs FOR SELECT 
USING (is_active = true);

-- Apenas admins podem gerir
CREATE POLICY "Admins podem inserir vagas" 
ON public.partner_jobs FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.user_profiles 
    WHERE id = auth.uid() AND is_admin = true
  )
);

CREATE POLICY "Admins podem atualizar vagas" 
ON public.partner_jobs FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.user_profiles 
    WHERE id = auth.uid() AND is_admin = true
  )
);

CREATE POLICY "Admins podem apagar vagas" 
ON public.partner_jobs FOR DELETE 
USING (
  EXISTS (
    SELECT 1 FROM public.user_profiles 
    WHERE id = auth.uid() AND is_admin = true
  )
);

CREATE POLICY "Admins podem ler todas vagas" 
ON public.partner_jobs FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.user_profiles 
    WHERE id = auth.uid() AND is_admin = true
  )
);
