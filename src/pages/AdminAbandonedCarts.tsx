import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Mail, Clock, Shield, Search, ExternalLink } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface AbandonedCart {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  cv_data: any;
  user_email: string;
  user_name: string;
  user_phone: string;
}

const AdminAbandonedCarts = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [carts, setCarts] = useState<AbandonedCart[]>([]);
  const [failedSales, setFailedSales] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'carts' | 'failed'>('carts');
  const [searchTerm, setSearchTerm] = useState('');

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
    // Buscar CVs que não estão pagos (is_paid = false) e que não são gratuitos (assumindo que "is_paid" controla o acesso).
    // Nota: Como não temos um campo `is_paid` garantido no model do CV em todas as versões,
    // vamos buscar todos os CVs e depois cruzar com `user_profiles.is_premium`.
    
    const { data: cvsData } = await supabase
      .from('cvs')
      .select('*')
      .order('updated_at', { ascending: false });
      
    if (cvsData) {
      // Buscar os e-mails dos donos
      const userIds = [...new Set(cvsData.map(c => c.user_id))];
      
      if (userIds.length > 0) {
        const { data: profiles } = await supabase
          .from('user_profiles')
          .select('id, email, is_premium, plan_type')
          .in('id', userIds);
          
        const profileMap = (profiles || []).reduce((acc: any, p: any) => ({ ...acc, [p.id]: p }), {});

        // Filtrar apenas CVs de pessoas que NÃO são premium
        const abandoned = cvsData
          .filter(cv => {
            const profile = profileMap[cv.user_id];
            return profile && !profile.is_premium && profile.plan_type !== 'monthly' && profile.plan_type !== 'annual';
          })
          .map(cv => {
            const profile = profileMap[cv.user_id];
            return {
              id: cv.id,
              user_id: cv.user_id,
              created_at: cv.created_at,
              updated_at: cv.updated_at,
              cv_data: cv.cv_data,
              user_email: profile.email || 'Desconhecido',
              user_name: cv.cv_data?.personalData?.fullName || 'Sem Nome',
              user_phone: cv.cv_data?.personalData?.phone || 'Sem Telefone',
            };
          });

        setCarts(abandoned);
      } else {
        setCarts([]);
      }
    } else {
      setCarts([]);
    }

    // Reconstruir o mapa de perfis para as vendas falhadas
    const profileMapForPayments: any = {};

    // Buscar Vendas Falhadas/Pendentes
    // Pagamentos com status 'pending' criados/atualizados recentemente (ou apenas pending)
    const { data: pendingPayments } = await supabase
      .from('payments')
      .select('*')
      .eq('status', 'pending')
      .order('updated_at', { ascending: false });

    if (pendingPayments) {
      // Buscar os emails para as vendas falhadas
      const pUserIds = [...new Set(pendingPayments.map(p => p.user_id))];
      const missingUserIds = pUserIds.filter(id => !profileMapForPayments[id]);
      
      if (missingUserIds.length > 0) {
        const { data: missingProfiles } = await supabase
          .from('user_profiles')
          .select('id, email, full_name')
          .in('id', missingUserIds);
          
        (missingProfiles || []).forEach(p => {
          profileMapForPayments[p.id] = p;
        });
      }

      const enrichedFailedSales = pendingPayments.map(p => ({
        ...p,
        user_email: profileMapForPayments[p.user_id]?.email || 'Desconhecido',
        user_name: profileMapForPayments[p.user_id]?.full_name || 'Usuário'
      }));
      setFailedSales(enrichedFailedSales);
    }
  };

  const copyEmailTemplate = (cart: AbandonedCart) => {
    const subject = `O seu Currículo Profissional está quase pronto, ${cart.user_name.split(' ')[0]}!`;
    const body = `Olá ${cart.user_name.split(' ')[0]},\n\nReparámos que começou a criar o seu currículo no MozVita, mas não chegou a concluir o download.\n\nUm currículo profissional aumenta em 70% as suas hipóteses de ser chamado para entrevistas.\n\nClique no link abaixo para aceder ao seu currículo e descarregar a versão final em PDF:\nhttps://mozvita.com/perfil\n\nQualquer dúvida, estamos à disposição!\n\nEquipa MozVita`;
    
    navigator.clipboard.writeText(`${subject}\n\n${body}`);
    toast({
      title: "Template Copiado!",
      description: "O texto do e-mail foi copiado para a área de transferência.",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500" />
      </div>
    );
  }

  if (!isAdmin) return null;

  const filteredCarts = carts.filter(c => 
    c.user_email.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.user_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredFailedSales = failedSales.filter(s => 
    s.user_email.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (s.user_name && s.user_name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen pb-20 pt-2 px-4 max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 shrink-0 bg-red-100 rounded-xl flex items-center justify-center">
            <ShoppingCart className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-black text-slate-900">Recuperação de Vendas</h1>
            <p className="text-xs md:text-sm text-slate-500">Recupere vendas de utilizadores ou carrinhos abandonados</p>
          </div>
        </div>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Buscar por e-mail ou nome..." 
            className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm w-full md:w-64 focus:outline-none focus:border-red-400 transition-colors shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-slate-200 pb-0 overflow-x-auto scrollbar-hide -mx-4 px-4">
        {[
          { key: 'carts', label: 'Carrinhos Abandonados', count: carts.length },
          { key: 'failed', label: 'Vendas Falhadas (Pagamento)', count: failedSales.length },
        ].map(t => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key as any)}
            className={`px-3 md:px-4 py-3 text-xs md:text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === t.key 
                ? 'border-red-500 text-red-600' 
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-none shadow-md rounded-2xl bg-white">
          <CardContent className="p-5">
            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Total {activeTab === 'carts' ? 'Abandonos' : 'Falhadas'}</p>
            <p className="text-3xl font-black text-slate-900">{activeTab === 'carts' ? carts.length : failedSales.length}</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-3">
        {activeTab === 'carts' ? (
          filteredCarts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-100 shadow-sm">
              <ShoppingCart className="w-12 h-12 mx-auto mb-3 text-slate-200" />
              <p className="font-bold text-slate-500">Nenhum carrinho abandonado encontrado.</p>
            </div>
          ) : (
          filteredCarts.map(cart => (
            <Card key={cart.id} className="border-none shadow-sm hover:shadow-md transition-shadow rounded-2xl overflow-hidden">
              <CardContent className="p-4 md:p-5">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-slate-900 truncate">{cart.user_name}</h3>
                      <Badge variant="secondary" className="text-[10px] bg-red-50 text-red-600 border-none">Não Pago</Badge>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs md:text-sm text-slate-500">
                      <span className="flex items-center gap-1 truncate"><Mail className="w-3 h-3" /> {cart.user_email}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Atualizado: {new Date(cart.updated_at).toLocaleString('pt-MZ')}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 w-full md:w-auto">
                    <Button 
                      variant="outline" 
                      onClick={() => copyEmailTemplate(cart)}
                      className="flex-1 md:flex-none border-slate-200 hover:bg-slate-50 font-semibold"
                    >
                      <Mail className="w-4 h-4 mr-2" /> Template Email
                    </Button>
                    <Button 
                      onClick={() => window.open(`mailto:${cart.user_email}?subject=O seu CV Profissional&body=Olá ${cart.user_name.split(' ')[0]}`, '_blank')}
                      className="flex-1 md:flex-none bg-red-600 hover:bg-red-700 text-white font-bold"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" /> Enviar Agora
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )
      ) : (
        filteredFailedSales.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-100 shadow-sm">
              <Shield className="w-12 h-12 mx-auto mb-3 text-slate-200" />
              <p className="font-bold text-slate-500">Nenhuma venda falhada encontrada.</p>
            </div>
          ) : (
            filteredFailedSales.map(sale => (
              <Card key={sale.id} className="border-none shadow-sm hover:shadow-md transition-shadow rounded-2xl overflow-hidden">
                <CardContent className="p-4 md:p-5">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-slate-900 truncate">{sale.user_email}</h3>
                        <Badge variant="secondary" className="text-[10px] bg-amber-50 text-amber-600 border-none">Falhou/Pendente</Badge>
                        <Badge variant="outline" className="text-[10px] font-bold uppercase">{sale.plan_type}</Badge>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs md:text-sm text-slate-500">
                        <span className="flex items-center gap-1 font-mono text-[10px] bg-slate-100 px-1 py-0.5 rounded">ID: {sale.id.substring(0,8)}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Tentativa: {new Date(sale.updated_at).toLocaleString('pt-MZ')}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col w-full md:w-auto gap-2">
                      <p className="text-xs font-bold text-center text-slate-400">Recuperar via Email</p>
                      <Button 
                        onClick={() => window.open(`mailto:${sale.user_email}?subject=Aviso de Falha no Pagamento - MozVita&body=Olá,\n\nNotámos que tentou realizar um pagamento na MozVita mas não conseguimos processá-lo com sucesso.\n\nPedimos imensas desculpas pelo transtorno. Sugerimos que tente novamente utilizando um método de pagamento diferente (E-Mola, M-Pesa ou M-Kesh).\n\nPode tentar novamente acedendo ao nosso site: www.mozvita.online\n\nAtenciosamente,\nEquipa MozVita`, '_blank')}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs"
                      >
                        <Mail className="w-3 h-3 mr-1" /> Enviar Email
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )
        )}
      </div>
    </div>
  );
};

export default AdminAbandonedCarts;
