
import { useUserProfile } from './useUserProfile';
import { supabase } from '@/lib/supabase';
import { useToast } from './use-toast';
import { useAuth } from './useAuth';
import { getReferralCode } from '@/utils/referralTracking';

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

  const canDownload = () => {
    if (!profile) return false;
    
    // Admin pode baixar sempre
    if (profile.is_admin) return true;
    
    // Se for premium (mensal/anual) e estiver activo, pode baixar
    if (isPremiumActive()) return true;
    
    // Caso contrário (plano free ou expirado), verificar se tem créditos avulsos (single)
    // Nota: Mesmo que o plano mensal expire, os créditos 'single' acumulados podem permanecer se a lógica de negócio assim o desejar.
    // Na nossa implementação actual, cv_limit é o saldo total.
    return (profile.cv_limit || 0) > (profile.cv_used || 0);
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

  return {
    profile,
    isPremiumActive: isPremiumActive(),
    currentCredits,
    canDownload: canDownload(),
    initiatePayment,
    checkPaymentStatus,
    refreshSubscription: loadProfile
  };
};
