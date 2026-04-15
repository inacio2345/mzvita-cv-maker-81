
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { SecureDbService } from '@/services/secureDbService';
import { getReferralCode, clearReferralCode } from '@/utils/referralTracking';

export interface UserProfile {
  id: string;
  nome_completo: string;
  full_name?: string;
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
  plan_type?: 'free' | 'single' | 'monthly' | 'annual';
  cv_limit?: number;
  cv_used?: number;
  subscription_expires_at?: string;
  is_premium?: boolean;
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
      // Explicitamente procuramos pelo ID porque Admin agora pode ler todos os perfis
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (error) throw error;
      
      if (!data) {
        // Se não existe perfil, criar um novo
        const referralCode = getReferralCode();
        
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
          downloads_realizados: 0,
          plan_type: 'free',
          cv_limit: 0,
          cv_used: 0,
          is_premium: false,
          ...(referralCode ? { referred_by: referralCode } : {})
        };

        const { data: createdProfile, error: createError } = await supabase
          .from('user_profiles')
          .insert([newProfile])
          .select()
          .single();

        if (createError) throw createError;
        setProfile(createdProfile);
        
        // Limpar referral tracking apenas após sucesso
        if (referralCode && createdProfile) {
          clearReferralCode();
        }
      } else {
        // Perfil já existe, mas vamos verificar se podemos associar um afiliado agora (first-touch persistente)
        const referralCodeSelection = getReferralCode();
        
        if (referralCodeSelection && !data.referred_by) {
          console.log("Associando afiliado a perfil existente...");
          const { data: updatedProfile, error: updateError } = await supabase
            .from('user_profiles')
            .update({ referred_by: referralCodeSelection })
            .eq('id', user.id)
            .select()
            .single();
            
          if (!updateError && updatedProfile) {
            setProfile(updatedProfile);
            clearReferralCode();
            return;
          }
        }
        
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
      const { data: success, error } = await supabase.rpc('record_download', {
        user_uuid: user.id
      });
      
      if (error) throw error;
      
      if (success) {
        // Atualizar localmente para refletir o uso de créditos imediatamente
        setProfile(prev => prev ? {
          ...prev,
          cv_used: (prev.cv_used || 0) + 1,
          downloads_realizados: (prev.downloads_realizados || 0) + 1
        } : null);
      } else {
        toast({
          title: "Limite atingido",
          description: "Você não possui créditos suficientes para este download.",
          variant: "destructive"
        });
      }
    } catch (error: any) {
      console.error('Erro ao registrar download:', error);
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
