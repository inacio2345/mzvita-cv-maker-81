
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { SecureDbService } from '@/services/secureDbService';

export interface UserProfile {
  id: string;
  nome_completo: string;
  email: string;
  foto_perfil_url?: string;
  profissao?: string;
  descricao?: string;
  idioma: string;
  tema: 'claro' | 'escuro';
  notificacoes_ativadas: boolean;
  data_criacao: string;
  ultimo_login: string;
  email_verificado: boolean;
  autenticacao_2fa: boolean;
  google_conectado: boolean;
  linkedin_conectado: boolean;
  total_cvs: number;
  cv_mais_recente?: string;
  downloads_realizados: number;
}

export const useUserProfile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const loadProfile = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      // RLS policies will automatically filter to user's profile
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .maybeSingle();

      if (error) throw error;
      
      if (!data) {
        // Se não existe perfil, criar um novo
        const newProfile = {
          id: user.id,
          email: user.email || '',
          nome_completo: user.user_metadata?.full_name || user.email || '',
          descricao: '',
          idioma: 'pt',
          tema: 'claro' as const,
          notificacoes_ativadas: true,
          email_verificado: false,
          autenticacao_2fa: false,
          google_conectado: false,
          linkedin_conectado: false,
          total_cvs: 0,
          downloads_realizados: 0
        };

        const { data: createdProfile, error: createError } = await supabase
          .from('user_profiles')
          .insert([newProfile])
          .select()
          .single();

        if (createError) throw createError;
        setProfile(createdProfile);
      } else {
        setProfile(data);
      }
    } catch (error) {
      console.error('Erro ao carregar perfil:', error);
      toast({
        title: "Erro ao carregar perfil",
        description: "Não foi possível carregar seus dados.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return false;

    try {
      const data = await SecureDbService.updateProfileSecurely(updates);

      setProfile(data);
      toast({
        title: "Perfil atualizado!",
        description: "Suas alterações foram salvas com sucesso.",
      });

      return true;
    } catch (error: any) {
      console.error('Erro ao atualizar perfil:', error);
      toast({
        title: "Erro ao atualizar",
        description: error.message || "Não foi possível salvar as alterações.",
        variant: "destructive",
      });
      return false;
    }
  };

  const incrementDownloads = async () => {
    if (!user) return;

    try {
      await SecureDbService.incrementDownloadsSecurely();
      
      // Atualizar localmente
      setProfile(prev => prev ? {
        ...prev,
        downloads_realizados: prev.downloads_realizados + 1
      } : null);
    } catch (error: any) {
      console.error('Erro ao incrementar downloads:', error);
      // Don't show error to user for this background operation
    }
  };

  useEffect(() => {
    loadProfile();
  }, [user]);

  return {
    profile,
    loading,
    updateProfile,
    incrementDownloads,
    loadProfile,
  };
};
