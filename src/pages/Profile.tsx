
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useSubscription } from '@/hooks/useSubscription';
import { useAffiliate } from '@/hooks/useAffiliate';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Mail, CreditCard, LogOut, Crown, Zap, CheckCircle2, Users, Clock, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, signOut } = useAuth();
  const { profile, isPremiumActive, currentCredits } = useSubscription();
  const { affiliateProfile, isApproved, isPending, isRejected } = useAffiliate();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  // Check admin
  const isAdmin = (profile as any)?.is_admin === true;

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 pb-20 pt-6 px-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Profile Header */}
        <div className="flex flex-col items-center text-center space-y-4 pt-4">
          <div className="w-24 h-24 rounded-full bg-google-blue/10 flex items-center justify-center border-4 border-white shadow-sm">
            <User className="w-12 h-12 text-google-blue" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 leading-tight">
              {profile?.full_name || 'Utilizador MozVita'}
            </h1>
            <p className="text-slate-500 flex items-center justify-center gap-2 text-sm mt-1">
              <Mail className="w-4 h-4" />
              {user.email}
            </p>
          </div>
        </div>

        {/* Subscription Card */}
        <Card className="border-none shadow-xl shadow-slate-200/50 overflow-hidden rounded-3xl">
          <div className={`h-2 w-full ${isPremiumActive ? 'bg-google-green' : 'bg-google-blue'}`} />
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg font-bold">Status do Plano</CardTitle>
              <Badge 
                variant={isPremiumActive ? "default" : "secondary"}
                className={isPremiumActive ? "bg-google-green" : "bg-slate-100 text-slate-600"}
              >
                {isPremiumActive ? 'PRO Ativo' : 'Plano Free'}
              </Badge>
            </div>
            <CardDescription>
              {isPremiumActive 
                ? 'Você tem acesso ilimitado às ferramentas premium.' 
                : 'Aproveite o plano básico ou faça upgrade.'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-4">
            {/* Credits Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Downloads</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-slate-900">{currentCredits}</span>
                  <span className="text-xs text-slate-500 font-bold">docs</span>
                </div>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Status</p>
                <div className="flex items-center gap-2">
                  {isPremiumActive ? (
                    <Crown className="w-5 h-5 text-amber-500" />
                  ) : (
                    <Zap className="w-5 h-5 text-google-blue" />
                  )}
                  <span className="text-sm font-black text-slate-900">
                    {profile?.plan_type === 'annual' ? 'Anual' : profile?.plan_type === 'monthly' ? 'Mensal' : 'Avulso'}
                  </span>
                </div>
              </div>
            </div>

            {!isPremiumActive && (
              <Button 
                onClick={() => navigate('/precos')}
                className="w-full bg-google-blue hover:bg-blue-600 h-12 rounded-xl font-bold text-base shadow-lg shadow-blue-100"
              >
                <Zap className="w-4 h-4 mr-2" />
                Fazer Upgrade para PRO
              </Button>
            )}

            {isPremiumActive && (
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl border border-green-100">
                <CheckCircle2 className="w-5 h-5 text-google-green" />
                <p className="text-sm font-medium text-green-800">Assinatura ativa e segura</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action List */}
        <div className="space-y-3">
          <Button 
            variant="outline" 
            className="w-full justify-start h-14 rounded-2xl border-slate-100 hover:bg-white text-slate-700 font-bold px-5"
            onClick={() => navigate('/criar-cv')}
          >
            <FileText className="w-5 h-5 mr-3 text-google-blue" />
            Meus Currículos
          </Button>

          {/* Affiliate Section */}
          {isApproved ? (
            <Button 
              variant="outline" 
              className="w-full justify-start h-14 rounded-2xl border-emerald-100 hover:bg-emerald-50 text-emerald-700 font-bold px-5"
              onClick={() => navigate('/perfil/afiliado')}
            >
              <Users className="w-5 h-5 mr-3 text-emerald-500" />
              Dashboard de Afiliado
              <CheckCircle2 className="w-4 h-4 ml-auto text-emerald-500" />
            </Button>
          ) : isPending ? (
            <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-100">
              <Clock className="w-5 h-5 text-amber-500" />
              <div>
                <p className="text-sm font-bold text-amber-800">Candidatura em análise</p>
                <p className="text-xs text-amber-600">Aguardando aprovação do programa de afiliados</p>
              </div>
            </div>
          ) : isRejected ? (
            <div className="flex items-center gap-3 p-4 bg-red-50 rounded-2xl border border-red-100">
              <p className="text-sm text-red-600">Candidatura não aprovada</p>
            </div>
          ) : (
            <Button 
              variant="outline" 
              className="w-full justify-start h-14 rounded-2xl border-slate-100 hover:bg-emerald-50 text-slate-700 font-bold px-5"
              onClick={() => navigate('/afiliado')}
            >
              <Users className="w-5 h-5 mr-3 text-emerald-500" />
              Tornar-se Afiliado
              <Badge className="ml-auto bg-emerald-100 text-emerald-700 text-[10px]">30%</Badge>
            </Button>
          )}

          {/* Admin Section */}
          {isAdmin && (
            <Button 
              variant="outline" 
              className="w-full justify-start h-14 rounded-2xl border-slate-200 hover:bg-slate-100 text-slate-700 font-bold px-5"
              onClick={() => navigate('/admin/afiliados')}
            >
              <Shield className="w-5 h-5 mr-3 text-slate-500" />
              Painel Admin
            </Button>
          )}

          <Button 
            variant="ghost" 
            className="w-full justify-start h-14 rounded-2xl text-red-500 hover:text-red-600 hover:bg-red-50 font-bold px-5"
            onClick={handleSignOut}
          >
            <LogOut className="w-5 h-5 mr-3" />
            Terminar Sessão
          </Button>
        </div>

        <p className="text-center text-xs text-slate-400 font-medium pt-4">
          MozVita CV • Versão 2.5.0
        </p>
      </div>
    </div>
  );
};

// Mock FileText icon since it was not imported but used in action list
const FileText = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <line x1="10" y1="9" x2="8" y2="9"/>
  </svg>
);

export default Profile;
