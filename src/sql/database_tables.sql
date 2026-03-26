-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    nome_completo TEXT,
    email TEXT NOT NULL,
    foto_perfil_url TEXT,
    profissao TEXT,
    descricao TEXT,
    idioma TEXT DEFAULT 'pt' CHECK (idioma IN ('pt', 'en', 'es')),
    tema TEXT DEFAULT 'claro' CHECK (tema IN ('claro', 'escuro')),
    notificacoes_ativadas BOOLEAN DEFAULT true,
    data_criacao TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ultimo_login TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    email_verificado BOOLEAN DEFAULT false,
    autenticacao_2fa BOOLEAN DEFAULT false,
    google_conectado BOOLEAN DEFAULT false,
    linkedin_conectado BOOLEAN DEFAULT false,
    total_cvs INTEGER DEFAULT 0,
    cv_mais_recente TIMESTAMP WITH TIME ZONE,
    downloads_realizados INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create saved_cvs table
CREATE TABLE IF NOT EXISTS saved_cvs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    template_name TEXT NOT NULL,
    cv_data JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_id ON user_profiles(id);
CREATE INDEX IF NOT EXISTS idx_saved_cvs_user_id ON saved_cvs(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_cvs_updated_at ON saved_cvs(updated_at DESC);

-- Create triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON user_profiles;
CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_saved_cvs_updated_at ON saved_cvs;
CREATE TRIGGER update_saved_cvs_updated_at
    BEFORE UPDATE ON saved_cvs
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create trigger to automatically create user profile on signup
CREATE OR REPLACE FUNCTION create_user_profile()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO user_profiles (id, email, nome_completo)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
    );
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS create_user_profile_trigger ON auth.users;
CREATE TRIGGER create_user_profile_trigger
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION create_user_profile();