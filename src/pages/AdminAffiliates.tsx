
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

const AdminAffiliates = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'pending' | 'approved' | 'payouts'>('pending');
  const [affiliates, setAffiliates] = useState<AdminAffiliate[]>([]);
  const [payouts, setPayouts] = useState<AdminPayout[]>([]);
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
            { key: 'payouts', label: 'Pagamentos', count: pendingPayouts.length },
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
      </div>
    </div>
  );
};

export default AdminAffiliates;
