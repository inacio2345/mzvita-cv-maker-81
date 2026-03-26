
import { useUserProfile } from './useUserProfile';
import { supabase } from '@/lib/supabase';
import { useToast } from './use-toast';
import { useAuth } from './useAuth';

export const useSubscription = () => {
  const { profile, loadProfile } = useUserProfile();
  const { user } = useAuth();
  const { toast } = useToast();

  const isPremiumActive = () => {
    if (!profile) return false;
    
    // Plano Anual e Mensal dão status premium
    if (profile.plan_type === 'annual') return true;
    
    if (profile.plan_type === 'monthly') {
      const expiry = profile.subscription_expires_at ? new Date(profile.subscription_expires_at) : null;
      return expiry ? expiry > new Date() : false;
    }

    return false;
  };

  const currentCredits = profile?.cv_limit ? Math.max(0, profile.cv_limit - (profile.cv_used || 0)) : 0;

  const canDownload = () => {
    if (!profile) return false;
    if (profile.plan_type === 'annual') return true;
    
    // Verificar validade para plano mensal
    if (profile.plan_type === 'monthly') {
      const expiry = profile.subscription_expires_at ? new Date(profile.subscription_expires_at) : null;
      if (!expiry || expiry < new Date()) return false;
    }

    // Verificar créditos (incluindo plano 'single')
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

    try {
      const response = await supabase.functions.invoke('create-paysuite-payment', {
        body: {
          plan_type: planType,
          user_id: finalUserId,
          return_url: window.location.origin + '/dashboard?payment=success'
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
