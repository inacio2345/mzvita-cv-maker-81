-- Tabela de Artigos do Blog para o MozVita CMS
CREATE TABLE IF NOT EXISTS public.blog_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    meta_description TEXT,
    category TEXT NOT NULL DEFAULT 'Mercado de Trabalho',
    author TEXT NOT NULL DEFAULT 'Equipe MozVita',
    read_time TEXT NOT NULL DEFAULT '7 min',
    image TEXT NOT NULL DEFAULT '/blog/sites-emprego.jpg',
    content TEXT NOT NULL,
    faqs JSONB DEFAULT '[]'::jsonb,
    featured BOOLEAN NOT NULL DEFAULT false,
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Habilitar RLS
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Políticas de Segurança (RLS)

-- 1. Qualquer visitante pode ler artigos publicados
CREATE POLICY "Publico pode ler artigos publicados"
ON public.blog_posts FOR SELECT
USING (is_published = true);

-- 2. Administradores podem ler todos os artigos (incluindo rascunhos)
CREATE POLICY "Admins podem ler todos os artigos"
ON public.blog_posts FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.user_profiles
    WHERE id = auth.uid() AND is_admin = true
  )
);

-- 3. Apenas administradores podem criar novos artigos
CREATE POLICY "Admins podem inserir artigos"
ON public.blog_posts FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.user_profiles
    WHERE id = auth.uid() AND is_admin = true
  )
);

-- 4. Apenas administradores podem atualizar artigos existentes
CREATE POLICY "Admins podem atualizar artigos"
ON public.blog_posts FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.user_profiles
    WHERE id = auth.uid() AND is_admin = true
  )
);

-- 5. Apenas administradores podem apagar artigos
CREATE POLICY "Admins podem apagar artigos"
ON public.blog_posts FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM public.user_profiles
    WHERE id = auth.uid() AND is_admin = true
  )
);

-- Configuração do Bucket de Imagens do Blog no Supabase Storage
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

-- Políticas de acesso ao Bucket blog-images
CREATE POLICY "Imagens do blog públicas para visualização"
ON storage.objects FOR SELECT
USING (bucket_id = 'blog-images');

CREATE POLICY "Apenas admins podem fazer upload de imagens do blog"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'blog-images' AND
  EXISTS (
    SELECT 1 FROM public.user_profiles
    WHERE id = auth.uid() AND is_admin = true
  )
);

CREATE POLICY "Apenas admins podem apagar imagens do blog"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'blog-images' AND
  EXISTS (
    SELECT 1 FROM public.user_profiles
    WHERE id = auth.uid() AND is_admin = true
  )
);

