
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface AffiliateProfile {
  id: string;
  user_id: string;
  code: string;
  name: string;
  email: string;
  phone: string;
  channel: string | null;
  channel_url: string | null;
  commission_rate: number;
  status: 'pending' | 'approved' | 'rejected' | 'suspended';
  approved_at: string | null;
  created_at: string;
}

interface Commission {
  id: string;
  payment_amount: number;
  commission_rate: number;
  commission_amount: number;
  status: 'pending' | 'available' | 'paid' | 'cancelled';
  available_at: string;
  paid_at: string | null;
  created_at: string;
}

interface Payout {
  id: string;
  total_amount: number;
  payment_method: string;
  payment_reference: string | null;
  status: 'requested' | 'processing' | 'completed' | 'failed';
  requested_at: string;
  processed_at: string | null;
}

interface AffiliateStats {
  total_clicks: number;
  total_referrals: number;
  total_conversions: number;
  total_earned: number;
  available_balance: number;
  pending_balance: number;
  paid_total: number;
}

interface ApplyData {
  name: string;
  email: string;
  phone: string;
  channel?: string;
  channel_url?: string;
}

export const useAffiliate = () => {
  const [affiliateProfile, setAffiliateProfile] = useState<AffiliateProfile | null>(null);
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [stats, setStats] = useState<AffiliateStats | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const loadAffiliate = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      // Buscar perfil de afiliado
      const { data: affiliate } = await supabase
        .from('affiliates')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      setAffiliateProfile(affiliate);

      if (affiliate && affiliate.status === 'approved') {
        // Buscar comissões
        const { data: comms } = await supabase
          .from('commissions')
          .select('*')
          .eq('affiliate_id', affiliate.id)
          .order('created_at', { ascending: false });

        setCommissions(comms || []);

        // Buscar repasses
        const { data: pays } = await supabase
          .from('payouts')
          .select('*')
          .eq('affiliate_id', affiliate.id)
          .order('requested_at', { ascending: false });

        setPayouts(pays || []);

        // Buscar estatísticas
        const { data: statsData } = await supabase
          .rpc('get_affiliate_stats', { p_affiliate_id: affiliate.id });

        if (statsData && statsData.length > 0) {
          setStats(statsData[0]);
        } else if (statsData && !Array.isArray(statsData)) {
          setStats(statsData);
        }
      }
    } catch (error) {
      console.error('Erro ao carregar dados de afiliado:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadAffiliate();
  }, [loadAffiliate]);

  const applyAsAffiliate = async (data: ApplyData) => {
    if (!user) {
      toast({
        title: "Login necessário",
        description: "Você precisa estar logado para se candidatar.",
        variant: "destructive"
      });
      return false;
    }

    try {
      const response = await supabase.functions.invoke('apply-affiliate', {
        body: data
      });

      if (response.error) {
        const errorData = response.error;
        throw new Error(typeof errorData === 'string' ? errorData : 'Erro ao candidatar-se');
      }

      toast({
        title: "Candidatura enviada! 🎉",
        description: "A sua candidatura será analisada em breve. Receberá uma notificação quando for aprovada.",
      });

      await loadAffiliate();
      return true;
    } catch (error: any) {
      console.error('Erro na candidatura:', error);
      toast({
        title: "Erro na candidatura",
        description: error.message || "Não foi possível enviar a candidatura. Tente novamente.",
        variant: "destructive"
      });
      return false;
    }
  };

  const requestPayout = async () => {
    if (!affiliateProfile) return false;

    try {
      const response = await supabase.functions.invoke('request-payout', {
        body: { payment_method: 'mpesa' }
      });

      if (response.error) throw response.error;

      toast({
        title: "Pagamento solicitado! 💸",
        description: `Valor de ${response.data?.total_amount} MZN será processado em breve.`,
      });

      await loadAffiliate();
      return true;
    } catch (error: any) {
      console.error('Erro ao solicitar pagamento:', error);
      toast({
        title: "Erro ao solicitar pagamento",
        description: error.message || "Não foi possível solicitar o pagamento.",
        variant: "destructive"
      });
      return false;
    }
  };

  const getReferralLink = () => {
    if (!affiliateProfile) return '';
    return `${window.location.origin}/?ref=${affiliateProfile.code}`;
  };

  return {
    affiliateProfile,
    commissions,
    payouts,
    stats,
    loading,
    applyAsAffiliate,
    requestPayout,
    getReferralLink,
    refreshAffiliate: loadAffiliate,
    isAffiliate: !!affiliateProfile,
    isApproved: affiliateProfile?.status === 'approved',
    isPending: affiliateProfile?.status === 'pending',
    isRejected: affiliateProfile?.status === 'rejected',
  };
};
