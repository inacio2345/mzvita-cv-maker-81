-- Adicionando versionamento aos CVs salvos
ALTER TABLE public.saved_cvs
ADD COLUMN current_version INTEGER NOT NULL DEFAULT 1;

-- Adicionando dados do snapshot e referências na tabela de pagamentos
ALTER TABLE public.payments
ADD COLUMN cv_id UUID REFERENCES public.saved_cvs(id) ON DELETE SET NULL,
ADD COLUMN cv_version INTEGER,
ADD COLUMN snapshot_data JSONB,
ADD COLUMN affiliate_id UUID,
ADD COLUMN pdf_url TEXT;

-- Criando tabela de comissões de afiliados
CREATE TABLE public.affiliate_commissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    payment_id UUID NOT NULL UNIQUE REFERENCES public.payments(id) ON DELETE CASCADE,
    affiliate_id UUID NOT NULL,
    amount NUMERIC NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid_out', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Habilitando RLS para a nova tabela
ALTER TABLE public.affiliate_commissions ENABLE ROW LEVEL SECURITY;

-- Políticas de segurança
CREATE POLICY "Afiliados podem ver suas próprias comissões" 
ON public.affiliate_commissions 
FOR SELECT 
USING (auth.uid() = affiliate_id);

-- Criar trigger para atualizar o updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_affiliate_commissions_updated_at
    BEFORE UPDATE ON public.affiliate_commissions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
