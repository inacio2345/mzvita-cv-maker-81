
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, CheckCircle2, XCircle, Clock, DollarSign, 
  Eye, ChevronDown, ChevronUp, Shield, AlertTriangle
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface AdminAffiliate {
  id: string;
  user_id: string;
  code: string;
  name: string;
  email: string;
  phone: string;
  channel: string | null;
  channel_url: string | null;
  commission_rate: number;
  status: string;
  created_at: string;
  approved_at: string | null;
}

interface AdminPayout {
  id: string;
  affiliate_id: string;
  total_amount: number;
  payment_method: string;
  payment_reference: string | null;
  status: string;
  requested_at: string;
  processed_at: string | null;
  affiliates?: { name: string; phone: string; code: string };
}

interface AdminPayment {
  id: string;
  user_id: string;
  amount: number;
  plan_type: string;
  status: string;
  affiliate_code: string | null;
  created_at?: string;
  updated_at: string;
  buyer_email?: string;
  affiliate_name?: string;
}

const AdminAffiliates = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'pending' | 'approved' | 'payouts' | 'sales'>('pending');
  const [affiliates, setAffiliates] = useState<AdminAffiliate[]>([]);
  const [payouts, setPayouts] = useState<AdminPayout[]>([]);
  const [payments, setPayments] = useState<AdminPayment[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [processing, setProcessing] = useState<string | null>(null);

  useEffect(() => {
    checkAdmin();
  }, [user]);

  const checkAdmin = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    const { data: profile } = await supabase
      .from('user_profiles')
      .select('is_admin')
      .eq('id', user.id)
      .single();

    if (!profile?.is_admin) {
      navigate('/');
      return;
    }

    setIsAdmin(true);
    await loadData();
    setLoading(false);
  };

  const loadData = async () => {
    // Carregar afiliados
    const { data: allAffiliates } = await supabase
      .from('affiliates')
      .select('*')
      .order('created_at', { ascending: false });

    setAffiliates(allAffiliates || []);

    // Carregar pedidos de pagamento
    const { data: allPayouts } = await supabase
      .from('payouts')
      .select('*, affiliates(name, phone, code)')
      .order('requested_at', { ascending: false });

    setPayouts(allPayouts || []);

    // Carregar vendas
    const { data: allPayments } = await supabase
      .from('payments')
      .select('*')
      .order('updated_at', { ascending: false });

    if (allPayments) {
       const userIds = [...new Set(allPayments.map(p => p.user_id))];
       const { data: profiles } = await supabase
         .from('user_profiles')
         .select('id, email')
         .in('id', userIds);
       
       const profileMap = (profiles || []).reduce((acc: Record<string, string>, p: any) => ({ ...acc, [p.id]: p.email }), {});

       const enrichedPayments = allPayments.map(p => {
         const aff = (allAffiliates || []).find(a => a.code === p.affiliate_code);
         return {
           ...p,
           buyer_email: profileMap[p.user_id] || 'Desconhecido',
           affiliate_name: aff ? aff.name : null
         };
       });
       setPayments(enrichedPayments);
    }
  };

  const updateAffiliateStatus = async (affiliateId: string, newStatus: 'approved' | 'rejected') => {
    setProcessing(affiliateId);
    try {
      const updateData: Record<string, unknown> = { status: newStatus };
      if (newStatus === 'approved') {
        updateData.approved_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from('affiliates')
        .update(updateData)
        .eq('id', affiliateId);

      if (error) throw error;

      toast({
        title: newStatus === 'approved' ? 'Afiliado aprovado ✅' : 'Afiliado rejeitado',
        description: newStatus === 'approved' 
          ? 'O afiliado foi aprovado e pode começar a indicar.'
          : 'A candidatura foi rejeitada.',
      });

      await loadData();
    } catch (error: any) {
      toast({
        title: 'Erro',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setProcessing(null);
    }
  };

  const processPayoutAdmin = async (payoutId: string) => {
    setProcessing(payoutId);
    try {
      const reference = prompt('Referência do pagamento (ex: M-Pesa ID):');
      if (!reference) {
        setProcessing(null);
        return;
      }

      const { error } = await supabase
        .from('payouts')
        .update({
          status: 'completed',
          payment_reference: reference,
          processed_at: new Date().toISOString(),
          processed_by: user?.email || 'admin'
        })
        .eq('id', payoutId);

      if (error) throw error;

      toast({
        title: 'Pagamento processado ✅',
        description: `Referência: ${reference}`,
      });

      await loadData();
    } catch (error: any) {
      toast({
        title: 'Erro',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setProcessing(null);
    }
  };

  const processManualPayment = async (payment: AdminPayment) => {
    if (!confirm('Aprovar este pagamento manual? O cliente receberá os créditos e o afiliado receberá comissão se aplicável.')) return;
    
    setProcessing(payment.id);
    try {
      const { error: pError } = await supabase
        .from('payments')
        .update({ status: 'paid', updated_at: new Date().toISOString() })
        .eq('id', payment.id);
        
      if (pError) throw pError;
      
      const now = new Date();
      const { data: currentProfile } = await supabase
        .from('user_profiles')
        .select('cv_limit, subscription_expires_at, plan_type')
        .eq('id', payment.user_id)
        .single();
        
      let newLimit = (currentProfile?.cv_limit || 0);
      let is_premium = true;
      let newPlanType = payment.plan_type;
      
      if (payment.plan_type === 'single') {
         newLimit += 1;
         is_premium = currentProfile?.plan_type === 'monthly' || currentProfile?.plan_type === 'annual';
         newPlanType = currentProfile?.plan_type || 'single';
      } else if (payment.plan_type === 'monthly') {
         newLimit += 10;
      }
      
      await supabase
        .from('user_profiles')
        .update({
          plan_type: newPlanType,
          cv_limit: newLimit,
          is_premium: is_premium
        })
        .eq('id', payment.user_id);
        
      if (payment.affiliate_code) {
        const affiliate = affiliates.find(a => a.code === payment.affiliate_code);
        if (affiliate) {
          const commissionRate = affiliate.commission_rate ? Number(affiliate.commission_rate) / 100 : 0.30;
          const commissionAmount = Number(payment.amount) * commissionRate;
          const availableAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString();
          
          await supabase.from('commissions').insert({
            affiliate_id: affiliate.id,
            payment_id: payment.id,
            referred_user_id: payment.user_id,
            payment_amount: payment.amount,
            commission_rate: commissionRate * 100,
            commission_amount: commissionAmount,
            status: 'pending',
            available_at: availableAt,
            created_at: now.toISOString()
          });
        }
      }
      
      toast({ title: 'Venda aprovada com sucesso!' });
      await loadData();
    } catch (error: any) {
      toast({ title: 'Erro ao aprovar', description: error.message, variant: 'destructive' });
    } finally {
      setProcessing(null);
    }
  };

  // Liberar comissões manualmente
  const releaseCommissions = async () => {
    try {
      const { data, error } = await supabase.rpc('release_available_commissions');
      if (error) throw error;
      toast({
        title: 'Comissões liberadas',
        description: `${data || 0} comissões foram actualizadas para "disponível".`,
      });
    } catch (error: any) {
      toast({
        title: 'Erro',
        description: error.message,
        variant: 'destructive'
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500" />
      </div>
    );
  }

  if (!isAdmin) return null;

  const pendingAffiliates = affiliates.filter(a => a.status === 'pending');
  const approvedAffiliates = affiliates.filter(a => a.status === 'approved');
  const pendingPayouts = payouts.filter(p => p.status === 'requested' || p.status === 'processing');

  return (
    <div className="min-h-screen bg-slate-50 pb-20 pt-6 px-4">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 shrink-0 bg-slate-900 rounded-xl flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0">
            <h1 className="text-xl md:text-2xl font-black text-slate-900 truncate">Admin — Afiliados</h1>
            <p className="text-xs md:text-sm text-slate-400">Gerir candidaturas, afiliados e pagamentos</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="border-none shadow-md rounded-2xl">
            <CardContent className="p-4">
              <p className="text-2xl font-black text-amber-500">{pendingAffiliates.length}</p>
              <p className="text-xs font-bold text-slate-400 uppercase">Pendentes</p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-md rounded-2xl">
            <CardContent className="p-4">
              <p className="text-2xl font-black text-emerald-500">{approvedAffiliates.length}</p>
              <p className="text-xs font-bold text-slate-400 uppercase">Ativos</p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-md rounded-2xl">
            <CardContent className="p-4">
              <p className="text-2xl font-black text-blue-500">{pendingPayouts.length}</p>
              <p className="text-xs font-bold text-slate-400 uppercase">Pagam. Pendentes</p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-md rounded-2xl">
            <CardContent className="p-4">
              <p className="text-2xl font-black text-slate-900">{affiliates.length}</p>
              <p className="text-xs font-bold text-slate-400 uppercase">Total</p>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={releaseCommissions}
            className="rounded-xl text-xs font-bold"
          >
            <Clock className="w-3 h-3 mr-1" /> Liberar Comissões (holdback)
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-slate-200 pb-0 overflow-x-auto scrollbar-hide -mx-4 px-4">
          {[
            { key: 'pending', label: 'Candidaturas', count: pendingAffiliates.length },
            { key: 'approved', label: 'Ativos', count: approvedAffiliates.length },
            { key: 'payouts', label: 'Pag. Afiliados', count: pendingPayouts.length },
            { key: 'sales', label: 'Vendas', count: payments.length },
          ].map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key as typeof tab)}
              className={`px-3 md:px-4 py-3 text-xs md:text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
                tab === t.key 
                  ? 'border-emerald-500 text-emerald-600' 
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              {t.label}
              {t.count > 0 && (
                <span className="ml-1.5 bg-slate-100 text-slate-600 text-[10px] px-1.5 py-0.5 rounded-full">
                  {t.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab Content: Candidaturas */}
        {tab === 'pending' && (
          <div className="space-y-3">
            {pendingAffiliates.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                <CheckCircle2 className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="font-bold">Nenhuma candidatura pendente</p>
              </div>
            ) : (
              pendingAffiliates.map(affiliate => (
                <Card key={affiliate.id} className="border-none shadow-md rounded-2xl overflow-hidden">
                  <CardContent className="p-0">
                    <div 
                      className="p-4 cursor-pointer hover:bg-slate-50 flex justify-between items-center"
                      onClick={() => setExpandedId(expandedId === affiliate.id ? null : affiliate.id)}
                    >
                      <div>
                        <p className="font-bold text-slate-900">{affiliate.name}</p>
                        <p className="text-sm text-slate-400">{affiliate.email} • {affiliate.phone}</p>
                      </div>
                      {expandedId === affiliate.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                    
                    {expandedId === affiliate.id && (
                      <div className="px-4 pb-4 border-t border-slate-100 pt-3 space-y-3">
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <p className="text-slate-400 text-xs font-bold uppercase">Canal</p>
                            <p className="text-slate-700">{affiliate.channel || '—'}</p>
                          </div>
                          <div>
                            <p className="text-slate-400 text-xs font-bold uppercase">URL</p>
                            <p className="text-slate-700 truncate">{affiliate.channel_url || '—'}</p>
                          </div>
                          <div>
                            <p className="text-slate-400 text-xs font-bold uppercase">Data</p>
                            <p className="text-slate-700">{new Date(affiliate.created_at).toLocaleDateString('pt-MZ')}</p>
                          </div>
                          <div>
                            <p className="text-slate-400 text-xs font-bold uppercase">Código</p>
                            <p className="text-slate-700 font-mono">{affiliate.code}</p>
                          </div>
                        </div>
                        <div className="flex gap-2 pt-2">
                          <Button 
                            className="flex-1 bg-emerald-600 hover:bg-emerald-700 rounded-xl font-bold"
                            onClick={() => updateAffiliateStatus(affiliate.id, 'approved')}
                            disabled={processing === affiliate.id}
                          >
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            Aprovar
                          </Button>
                          <Button 
                            variant="outline" 
                            className="flex-1 rounded-xl font-bold text-red-500 border-red-200 hover:bg-red-50"
                            onClick={() => updateAffiliateStatus(affiliate.id, 'rejected')}
                            disabled={processing === affiliate.id}
                          >
                            <XCircle className="w-4 h-4 mr-2" />
                            Rejeitar
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}

        {/* Tab Content: Afiliados Ativos */}
        {tab === 'approved' && (
          <div className="space-y-3">
            {approvedAffiliates.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="font-bold">Nenhum afiliado ativo</p>
              </div>
            ) : (
              approvedAffiliates.map(affiliate => (
                <Card key={affiliate.id} className="border-none shadow-md rounded-2xl">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-bold text-slate-900">{affiliate.name}</p>
                        <p className="text-sm text-slate-400">
                          {affiliate.email} • <span className="font-mono">{affiliate.code}</span>
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-400">
                          Desde {new Date(affiliate.approved_at || affiliate.created_at).toLocaleDateString('pt-MZ')}
                        </p>
                        <p className="text-xs text-slate-400">{affiliate.phone}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}

        {/* Tab Content: Pagamentos */}
        {tab === 'payouts' && (
          <div className="space-y-3">
            {payouts.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                <DollarSign className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="font-bold">Nenhum pedido de pagamento</p>
              </div>
            ) : (
              payouts.map(payout => (
                <Card key={payout.id} className="border-none shadow-md rounded-2xl">
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                      <div className="min-w-0">
                        <p className="font-bold text-slate-900">
                          {Number(payout.total_amount).toFixed(0)} MZN
                        </p>
                        <p className="text-sm text-slate-400 truncate">
                          {(payout as any).affiliates?.name || '—'} •{' '}
                          {(payout as any).affiliates?.phone || '—'}
                        </p>
                        <p className="text-xs text-slate-300 mt-1">
                          {new Date(payout.requested_at).toLocaleDateString('pt-MZ')}
                          {payout.payment_reference && ` • Ref: ${payout.payment_reference}`}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <Badge className={`font-bold text-[10px] ${payoutStatusColors[payout.status]}`}>
                          {payoutStatusLabels[payout.status]}
                        </Badge>
                        {(payout.status === 'requested' || payout.status === 'processing') && (
                          <Button
                            size="sm"
                            className="bg-emerald-600 hover:bg-emerald-700 rounded-xl font-bold text-xs"
                            onClick={() => processPayoutAdmin(payout.id)}
                            disabled={processing === payout.id}
                          >
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Processar
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}
        {/* Tab Content: Vendas Globais */}
        {tab === 'sales' && (
          <div className="space-y-6">
            
            {/* Dashboard Financeiro */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-none shadow-md rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                <CardContent className="p-4 md:p-6">
                  <p className="text-blue-100 text-sm font-bold uppercase tracking-wider mb-1">Receita Total Bruta</p>
                  <p className="text-3xl md:text-4xl font-black">
                    {payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + Number(p.amount), 0).toFixed(2)} <span className="text-xl">MZN</span>
                  </p>
                  <p className="text-blue-100 opacity-80 text-xs mt-2 font-medium">Vendas concluídas</p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md rounded-2xl">
                <CardContent className="p-4 md:p-6">
                  <p className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-1">Este Mês</p>
                  <p className="text-2xl md:text-3xl font-black text-slate-800">
                    {payments.filter(p => p.status === 'paid' && new Date(p.updated_at).getMonth() === new Date().getMonth()).reduce((sum, p) => sum + Number(p.amount), 0).toFixed(2)} MZN
                  </p>
                  <p className="text-slate-400 text-xs mt-2 font-medium">
                    {payments.filter(p => p.status === 'paid' && new Date(p.updated_at).getMonth() === new Date().getMonth()).length} pagamentos no mês atual
                  </p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md rounded-2xl">
                <CardContent className="p-4 md:p-6">
                  <p className="text-emerald-500 text-sm font-bold uppercase tracking-wider mb-1">Vendas Pendentes</p>
                  <p className="text-2xl md:text-3xl font-black text-emerald-600">
                    {payments.filter(p => p.status === 'pending').length} aguardando
                  </p>
                  <p className="text-slate-400 text-xs mt-2 font-medium">
                    M-Pesa direto ou abandonos
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-black text-slate-800 mb-2">Registo de Transações</h3>
              {payments.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <DollarSign className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p className="font-bold">Nenhuma venda registada.</p>
                </div>
              ) : (
              payments.map(p => (
                <Card key={p.id} className="border-none shadow-md rounded-2xl overflow-hidden group hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                      
                      <div className="w-full md:w-auto">
                        <p className="font-bold text-slate-900 truncate max-w-[280px] md:max-w-md">{p.buyer_email}</p>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-[10px] font-bold uppercase bg-slate-50">
                            Plano: {p.plan_type}
                          </Badge>
                          {p.affiliate_code && (
                            <Badge className="bg-emerald-50 text-emerald-600 border-none text-[10px] uppercase font-bold flex items-center gap-1">
                              Ref: {p.affiliate_code} {p.affiliate_name ? `(${p.affiliate_name})` : ''}
                            </Badge>
                          )}
                        </div>
                        <p className="text-[10px] text-slate-400 font-mono mt-1">ID: {p.id}</p>
                      </div>

                      <div className="flex w-full md:w-auto items-center justify-between md:justify-end gap-4 shrink-0">
                        <div className="text-right">
                          <p className="text-xl font-black text-slate-800">{Number(p.amount).toFixed(2)} MZN</p>
                          <p className="text-[10px] uppercase font-bold text-slate-400">
                            {new Date(p.updated_at).toLocaleDateString('pt-MZ')}
                          </p>
                        </div>

                        {p.status === 'pending' ? (
                          <Button 
                            onClick={() => processManualPayment(p)}
                            disabled={processing === p.id}
                            size="sm"
                            className="bg-blue-600 w-full md:w-auto hover:bg-blue-700 text-white rounded-xl font-bold transition-all"
                          >
                            {processing === p.id ? 'A processar...' : 'Aprovar Venda'}
                          </Button>
                        ) : (
                          <div className="bg-emerald-50 px-3 py-1.5 border border-emerald-100 rounded-lg text-center flex-1 md:flex-initial">
                            <p className="text-xs font-black text-emerald-600 uppercase flex items-center justify-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> Pago
                            </p>
                          </div>
                        )}
                      </div>
                      
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default AdminAffiliates;
