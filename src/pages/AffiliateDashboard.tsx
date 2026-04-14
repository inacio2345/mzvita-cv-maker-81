
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MousePointerClick, Users, ShoppingCart, Wallet, 
  Clock, CheckCircle2, DollarSign, Copy, ExternalLink,
  TrendingUp, ArrowDownToLine, History
} from 'lucide-react';
import { useAffiliate } from '@/hooks/useAffiliate';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const statusColors: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-700',
  available: 'bg-emerald-100 text-emerald-700',
  paid: 'bg-blue-100 text-blue-700',
  cancelled: 'bg-red-100 text-red-700',
};

const statusLabels: Record<string, string> = {
  pending: 'Pendente',
  available: 'Disponível',
  paid: 'Pago',
  cancelled: 'Cancelada',
};

const payoutStatusColors: Record<string, string> = {
  requested: 'bg-amber-100 text-amber-700',
  processing: 'bg-blue-100 text-blue-700',
  completed: 'bg-emerald-100 text-emerald-700',
  failed: 'bg-red-100 text-red-700',
};

const payoutStatusLabels: Record<string, string> = {
  requested: 'Solicitado',
  processing: 'Processando',
  completed: 'Concluído',
  failed: 'Falhou',
};

const AffiliateDashboard = () => {
  const { 
    affiliateProfile, commissions, payouts, stats, 
    loading, requestPayout, getReferralLink, isApproved 
  } = useAffiliate();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [payoutLoading, setPayoutLoading] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500" />
      </div>
    );
  }

  if (!affiliateProfile || !isApproved) {
    navigate('/afiliado');
    return null;
  }

  const referralLink = getReferralLink();
  const availableBalance = stats?.available_balance || 0;
  const canRequestPayout = availableBalance >= 50;

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast({
      title: "Link copiado! 📋",
      description: "Cole e partilhe com a sua rede.",
    });
  };

  const handleRequestPayout = async () => {
    setPayoutLoading(true);
    await requestPayout();
    setPayoutLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20 pt-6 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900">Dashboard de Afiliado</h1>
            <p className="text-slate-500 text-sm mt-1">
              Código: <span className="font-mono font-bold text-emerald-600">{affiliateProfile.code}</span>
            </p>
          </div>
          <Badge className="bg-emerald-100 text-emerald-700 font-bold">
            <CheckCircle2 className="w-3 h-3 mr-1" /> Ativo
          </Badge>
        </div>

        {/* Referral Link */}
        <Card className="border-none shadow-lg rounded-2xl overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-emerald-500 to-teal-400" />
          <CardContent className="p-5">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Seu link de indicação
            </p>
            <div className="flex gap-2">
              <div className="flex-1 bg-slate-50 rounded-xl px-4 py-3 font-mono text-sm text-slate-700 truncate border border-slate-100">
                {referralLink}
              </div>
              <Button 
                onClick={copyLink} 
                className="bg-emerald-600 hover:bg-emerald-700 rounded-xl px-4"
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Cliques', value: stats?.total_clicks || 0, icon: <MousePointerClick className="w-5 h-5" />, color: 'text-blue-500 bg-blue-50' },
            { label: 'Registos', value: stats?.total_referrals || 0, icon: <Users className="w-5 h-5" />, color: 'text-purple-500 bg-purple-50' },
            { label: 'Conversões', value: stats?.total_conversions || 0, icon: <ShoppingCart className="w-5 h-5" />, color: 'text-emerald-500 bg-emerald-50' },
            { label: 'Total Ganho', value: `${stats?.total_earned || 0} MT`, icon: <TrendingUp className="w-5 h-5" />, color: 'text-amber-500 bg-amber-50' },
          ].map((stat, i) => (
            <Card key={i} className="border-none shadow-md rounded-2xl">
              <CardContent className="p-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${stat.color}`}>
                  {stat.icon}
                </div>
                <p className="text-2xl font-black text-slate-900">{stat.value}</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Balance + Payout */}
        <Card className="border-none shadow-lg rounded-2xl">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Saldo disponível</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-emerald-600">{availableBalance}</span>
                  <span className="text-lg font-bold text-slate-400">MZN</span>
                </div>
                {(stats?.pending_balance || 0) > 0 && (
                  <p className="text-xs text-slate-400 mt-1">
                    <Clock className="w-3 h-3 inline mr-1" />
                    {stats?.pending_balance} MZN em holdback (7 dias)
                  </p>
                )}
              </div>
              <Button 
                onClick={handleRequestPayout}
                disabled={!canRequestPayout || payoutLoading}
                className="bg-emerald-600 hover:bg-emerald-700 rounded-xl h-12 px-8 font-bold shadow-lg disabled:opacity-50"
              >
                <ArrowDownToLine className="w-4 h-4 mr-2" />
                {payoutLoading ? 'Processando...' : canRequestPayout ? 'Solicitar Pagamento' : 'Mínimo: 50 MZN'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Commissions Table */}
        <Card className="border-none shadow-lg rounded-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-500" />
              Comissões
            </CardTitle>
          </CardHeader>
          <CardContent>
            {commissions.length === 0 ? (
              <div className="text-center py-8 text-slate-400">
                <DollarSign className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="font-bold">Nenhuma comissão ainda</p>
                <p className="text-sm mt-1">Partilhe o seu link para começar a ganhar!</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="text-left py-3 px-2 text-xs font-bold text-slate-400 uppercase">Data</th>
                      <th className="text-right py-3 px-2 text-xs font-bold text-slate-400 uppercase">Valor Venda</th>
                      <th className="text-right py-3 px-2 text-xs font-bold text-slate-400 uppercase">Comissão</th>
                      <th className="text-center py-3 px-2 text-xs font-bold text-slate-400 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {commissions.map((c) => (
                      <tr key={c.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                        <td className="py-3 px-2 text-sm text-slate-600">
                          {new Date(c.created_at).toLocaleDateString('pt-MZ')}
                        </td>
                        <td className="py-3 px-2 text-sm text-slate-600 text-right font-mono">
                          {Number(c.payment_amount).toFixed(0)} MT
                        </td>
                        <td className="py-3 px-2 text-sm font-bold text-emerald-600 text-right font-mono">
                          +{Number(c.commission_amount).toFixed(0)} MT
                        </td>
                        <td className="py-3 px-2 text-center">
                          <Badge className={`text-[10px] font-bold ${statusColors[c.status]}`}>
                            {statusLabels[c.status]}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Payouts History */}
        {payouts.length > 0 && (
          <Card className="border-none shadow-lg rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <History className="w-5 h-5 text-blue-500" />
                Histórico de Pagamentos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {payouts.map((p) => (
                  <div key={p.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div>
                      <p className="font-bold text-slate-900">{Number(p.total_amount).toFixed(0)} MZN</p>
                      <p className="text-xs text-slate-400">
                        {new Date(p.requested_at).toLocaleDateString('pt-MZ')}
                        {p.processed_at && ` • Processado: ${new Date(p.processed_at).toLocaleDateString('pt-MZ')}`}
                      </p>
                    </div>
                    <Badge className={`font-bold ${payoutStatusColors[p.status]}`}>
                      {payoutStatusLabels[p.status]}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AffiliateDashboard;
