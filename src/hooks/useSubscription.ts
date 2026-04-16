
import { useUserProfile } from './useUserProfile';
import { supabase } from '@/lib/supabase';
import { useToast } from './use-toast';
import { useAuth } from './useAuth';
import { getReferralCode } from '@/utils/referralTracking';
import { SecureDbService } from '@/services/secureDbService';

export const useSubscription = () => {
  const { profile, loadProfile } = useUserProfile();
  const { user } = useAuth();
  const { toast } = useToast();

  const isPremiumActive = () => {
    if (!profile) return false;
    
    // Admin tem acesso ilimitado sempre
    if (profile.is_admin) return true;
    
    // Tanto Mensal como Anual precisam de verificação de expiração
    if (profile.plan_type === 'monthly' || profile.plan_type === 'annual') {
      const expiry = profile.subscription_expires_at ? new Date(profile.subscription_expires_at) : null;
      return expiry ? expiry > new Date() : false;
    }

    return false;
  };

  const currentCredits = profile?.cv_limit ? Math.max(0, profile.cv_limit - (profile.cv_used || 0)) : 0;

  const canDownload = async (cvId?: string) => {
    if (!profile) return false;
    
    // Admin pode baixar sempre
    if (profile.is_admin) return true;
    
    // Se for premium (mensal/anual) e estiver activo, pode baixar qualquer CV
    if (isPremiumActive()) return true;
    
    // Se tivermos um ID de CV, verificar se este CV específico foi pago
    if (cvId) {
      const { data: pay } = await supabase
        .from('payments')
        .select('id')
        .eq('cv_id', cvId)
        .eq('status', 'paid')
        .limit(1)
        .maybeSingle();
      
      if (pay) return true;
    }

    // Fallback: Verificar se tem créditos avulsos genéricos
    return (profile.cv_limit || 0) > (profile.cv_used || 0);
  };

  /**
   * O PORTÃO DE FERRO 🛡️
   * Verifica o acesso E consome o crédito se necessário.
   * Use isto nos pontos finais de download (PrintCV, DownloadOptions).
   */
  const checkAndConsumeAccess = async (cvId?: string) => {
    if (!profile) return false;

    // 1. Admin ou Premium Mensal/Anual: Acesso total sem consumo de créditos
    if (profile.is_admin || isPremiumActive()) return true;

    // 2. Já pago individualmente (Pay-per-CV): Acesso ilimitado a este documento sem consumo de créditos extras
    if (cvId) {
      const { data: pay } = await supabase
        .from('payments')
        .select('id')
        .eq('cv_id', cvId)
        .eq('status', 'paid')
        .limit(1)
        .maybeSingle();
      
      if (pay) return true;
    }

    // 3. Tentar usar crédito global
    if ((profile.cv_limit || 0) > (profile.cv_used || 0)) {
      try {
        // Tentar vincular este CV a um pagamento "single" vago (para acessos futuros ilimitados ao MESMO CV)
        if (cvId) {
          const { data: unlinkedPayment } = await supabase
            .from('payments')
            .select('id')
            .eq('user_id', profile.id)
            .eq('status', 'paid')
            .eq('plan_type', 'single')
            .is('cv_id', null)
            .limit(1)
            .maybeSingle();

          if (unlinkedPayment) {
             await supabase.from('payments').update({ cv_id: cvId }).eq('id', unlinkedPayment.id);
          }
        }

        await SecureDbService.incrementDownloadsSecurely();
        await loadProfile(); // Recarrega o perfil para atualizar o saldo no UI
        return true;
      } catch (error) {
        console.error("Erro ao consumir crédito:", error);
        return false;
      }
    }

    return false;
  };

  const initiatePayment = async (planType: 'single' | 'monthly' | 'annual', forcedUserId?: string) => {
    const finalUserId = forcedUserId || user?.id;
    
    if (!finalUserId) {
      toast({
        title: "Login necessário",
        description: "Você precisa estar logado para realizar uma compra.",
        variant: "destructive"
      });
      return;
    }

    const affiliateCode = getReferralCode();

    try {
      const response = await supabase.functions.invoke('create-paysuite-payment', {
        body: {
          plan_type: planType,
          user_id: finalUserId,
          affiliate_code: affiliateCode,
          return_url: window.location.origin + '/pagamento-sucesso'
        }
      });

      if (response.error) throw response.error;

      if (response.data?.checkout_url) {
        window.location.href = response.data.checkout_url;
      } else {
        throw new Error("Checkout URL não recebida");
      }
    } catch (error: any) {
      console.error('Erro ao iniciar pagamento:', error);
      toast({
        title: "Erro no pagamento",
        description: "Não foi possível iniciar o processo de pagamento. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  const checkPaymentStatus = async (paysuiteId: string) => {
    const { data, error } = await supabase
      .from('payments')
      .select('status')
      .eq('paysuite_id', paysuiteId)
      .single();

    if (error) return 'error';
    return data?.status || 'pending';
  };

  const checkCVPaid = async (cvId: string) => {
    if (!cvId) return { paid: false };
    try {
      const { data: cv, error: cvErr } = await supabase
        .from('saved_cvs')
        .select('current_version')
        .eq('id', cvId)
        .single();
      if (cvErr || !cv) return { paid: false };

      const { data: pay, error: payErr } = await supabase
        .from('payments')
        .select('status, pdf_url')
        .eq('cv_id', cvId)
        .eq('cv_version', cv.current_version)
        .eq('status', 'paid')
        .maybeSingle();
      
      return { 
        paid: !!pay, 
        pdfUrl: pay?.pdf_url || null,
        version: cv.current_version 
      };
    } catch {
      return { paid: false };
    }
  };

  return {
    profile,
    isPremiumActive: isPremiumActive(),
    currentCredits,
    canDownload,
    checkAndConsumeAccess,
    initiatePayment,
    checkPaymentStatus,
    checkCVPaid,
    refreshSubscription: loadProfile
  };
};
