
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Users, DollarSign, Link2, TrendingUp, CheckCircle2, Clock, Send, ArrowRight } from 'lucide-react';
import { useAffiliate } from '@/hooks/useAffiliate';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import AuthModal from '@/components/auth/AuthModal';

const Afiliado = () => {
  const { user } = useAuth();
  const { affiliateProfile, applyAsAffiliate, isPending, isApproved, isRejected, loading } = useAffiliate();
  const navigate = useNavigate();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    channel: '',
    channel_url: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    setSubmitting(true);
    const success = await applyAsAffiliate(formData);
    if (success) {
      setFormData({ name: '', email: '', phone: '', channel: '', channel_url: '' });
    }
    setSubmitting(false);
  };

  // Se já é afiliado aprovado, redirecionar para dashboard
  if (isApproved) {
    navigate('/perfil/afiliado');
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-400 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyem0wLTMwVjBoLTEydjRoMTJ6TTI0IDI0aDEydi0ySDI0djJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
        
        <div className="relative max-w-5xl mx-auto px-4 py-16 md:py-24 text-center">
          <Badge className="bg-white/20 text-white border-white/30 mb-6 text-sm px-4 py-1">
            💰 Programa de Afiliados MozVita
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight tracking-tight">
            Ganhe <span className="text-yellow-300">30%</span> de comissão<br />por cada indicação
          </h1>
          
          <p className="text-lg md:text-xl text-emerald-50 max-w-2xl mx-auto mb-10 leading-relaxed">
            Partilhe o MozVita com a sua rede e ganhe dinheiro sempre que alguém compra através do seu link. 
            Simples, transparente e sem limites.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-3xl font-black text-yellow-300 mb-1">15 MT</div>
              <div className="text-sm text-emerald-100">por CV Avulso (50 MT)</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-3xl font-black text-yellow-300 mb-1">60 MT</div>
              <div className="text-sm text-emerald-100">por Plano Mensal (200 MT)</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-3xl font-black text-yellow-300 mb-1">387 MT</div>
              <div className="text-sm text-emerald-100">por Plano Anual (1.290 MT)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Como funciona */}
      <div className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-black text-center text-slate-900 mb-12">Como funciona?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { icon: <Send className="w-8 h-8" />, title: "Candidate-se", desc: "Preencha o formulário abaixo e aguarde a aprovação." },
            { icon: <Link2 className="w-8 h-8" />, title: "Receba seu link", desc: "Após aprovação, receba um link único de indicação." },
            { icon: <Users className="w-8 h-8" />, title: "Partilhe", desc: "Divulgue nas redes sociais, grupos e canais." },
            { icon: <DollarSign className="w-8 h-8" />, title: "Ganhe", desc: "Receba 30% cada vez que alguém compra." },
          ].map((step, i) => (
            <div key={i} className="text-center">
              <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-emerald-600">
                {step.icon}
              </div>
              <h3 className="font-bold text-slate-900 mb-2">{step.title}</h3>
              <p className="text-sm text-slate-500">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Formulário / Status */}
      <div className="max-w-xl mx-auto px-4 pb-16">
        {isPending && (
          <Card className="border-none shadow-xl rounded-3xl overflow-hidden">
            <div className="h-2 w-full bg-amber-400" />
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-amber-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Candidatura em análise</h3>
              <p className="text-slate-500">
                A sua candidatura está sendo analisada pela nossa equipa. 
                Receberá uma notificação quando for aprovada.
              </p>
            </CardContent>
          </Card>
        )}

        {isRejected && (
          <Card className="border-none shadow-xl rounded-3xl overflow-hidden">
            <div className="h-2 w-full bg-red-400" />
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Candidatura não aprovada</h3>
              <p className="text-slate-500">
                Infelizmente a sua candidatura não foi aprovada desta vez. 
                Entre em contacto connosco para mais informações.
              </p>
            </CardContent>
          </Card>
        )}

        {!affiliateProfile && !loading && (
          <Card className="border-none shadow-xl rounded-3xl overflow-hidden">
            <div className="h-2 w-full bg-emerald-500" />
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-bold">Candidatar-se como Afiliado</CardTitle>
              <CardDescription>
                Preencha os dados abaixo para se candidatar ao programa de afiliados.
                {!user && " É necessário ter uma conta MozVita."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Nome completo *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Seu nome completo"
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="seu@email.com"
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Número M-Pesa (para pagamento) *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="84 123 4567"
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="channel">Onde pretende divulgar?</Label>
                  <Input
                    id="channel"
                    value={formData.channel}
                    onChange={(e) => setFormData(prev => ({ ...prev, channel: e.target.value }))}
                    placeholder="Ex: Facebook, Instagram, YouTube, WhatsApp..."
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="channel_url">Link do canal/página (opcional)</Label>
                  <Input
                    id="channel_url"
                    value={formData.channel_url}
                    onChange={(e) => setFormData(prev => ({ ...prev, channel_url: e.target.value }))}
                    placeholder="https://..."
                    className="mt-1"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-14 text-lg font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 shadow-lg mt-4"
                  disabled={submitting}
                >
                  {submitting ? 'Enviando...' : user ? 'Enviar Candidatura' : 'Fazer Login e Candidatar-se'}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onAuthSuccess={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
};

export default Afiliado;
