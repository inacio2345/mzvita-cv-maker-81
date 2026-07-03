import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useSubscription } from '@/hooks/useSubscription';
import { useAffiliate } from '@/hooks/useAffiliate';
import { useSavedCVs } from '@/hooks/useSavedCVs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Mail, LogOut, Crown, Zap, CheckCircle2, Users, Clock, Shield, Download, Edit, CalendarDays, Plus, ArrowRight, FileText, Loader2 } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import DownloadOptions from '@/components/download/DownloadOptions';
import { motion } from 'framer-motion';

const Profile = () => {
  const { user, signOut } = useAuth();
  const { profile, isPremiumActive, currentCredits } = useSubscription();
  const { affiliateProfile, isApproved, isPending, isRejected } = useAffiliate();
  const { savedCVs, loading: loadingCVs } = useSavedCVs();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [showDownloadOptions, setShowDownloadOptions] = React.useState(false);
  const [downloadData, setDownloadData] = React.useState<{cvData: any, selectedTemplate: any, cvId?: string} | null>(null);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  // Check admin
  const isAdmin = (profile as any)?.is_admin === true;

  // bypassed

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-20 pt-4 sm:pt-6 px-4 md:px-8 w-full max-w-[1200px] mx-auto font-sans">
      
      <div className="flex flex-col gap-5 sm:gap-6 mt-0">
        
        {/* 1. Header / Welcome Area */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="text-xl font-semibold text-slate-900 tracking-tight">
              Visão Geral
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Bem-vindo de volta, {profile?.full_name || user?.email?.split('@')[0]}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {isAdmin && (
              <Button 
                variant="outline" 
                size="sm"
                className="h-9 border-slate-200 text-slate-600 font-medium"
                onClick={() => navigate('/admin')}
              >
                Painel Admin
              </Button>
            )}
            <Button 
              onClick={() => navigate('/modelos')} 
              className="bg-slate-900 hover:bg-slate-800 text-white h-9 px-4 font-medium rounded-md shadow-sm"
            >
              <Plus className="w-4 h-4 mr-1.5" />
              Novo Currículo
            </Button>
          </div>
        </div>

        {/* 2. Top Stats / Subscription Card */}
        <div className="grid grid-cols-2 max-[390px]:grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          <div className="bg-white border border-slate-200 rounded-lg p-3 sm:p-5 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1 sm:mb-2 gap-2">
              <h3 className="text-xs sm:text-sm font-medium text-slate-500 truncate">Plano Atual</h3>
              {isPremiumActive ? <Crown className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-amber-500" /> : <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-slate-400" />}
            </div>
            <div className="flex flex-wrap items-baseline gap-1.5 sm:gap-2">
              <span className="text-xl sm:text-2xl font-semibold text-slate-900">
                {isPremiumActive ? 'PRO' : 'Gratuito'}
              </span>
              <Badge variant="outline" className={`text-[9px] sm:text-[10px] px-1 sm:px-1.5 py-0 ${isPremiumActive ? 'bg-amber-50 border-amber-200 text-amber-700' : 'bg-slate-50 border-slate-200 text-slate-600'}`}>
                {isPremiumActive ? 'Ativo' : 'Básico'}
              </Badge>
            </div>
            {!isPremiumActive && (
               <div className="mt-2 sm:mt-4 pt-2 sm:pt-4 border-t border-slate-100">
                 <button onClick={() => navigate('/precos')} className="text-xs sm:text-sm text-brand-600 font-medium hover:text-brand-700">Fazer upgrade →</button>
               </div>
            )}
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-3 sm:p-5 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1 sm:mb-2 gap-2">
              <h3 className="text-xs sm:text-sm font-medium text-slate-500 truncate">Uso de Currículos</h3>
              <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-slate-400" />
            </div>
            <div className="flex items-baseline gap-1.5 sm:gap-2">
              <span className="text-xl sm:text-2xl font-semibold text-slate-900">{profile?.cv_used || 0}</span>
              <span className="text-xs sm:text-sm text-slate-500">/ {isPremiumActive ? '∞' : profile?.cv_limit || 2}</span>
            </div>
            <div className="mt-3 sm:mt-4 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
               <div 
                 className={`h-full ${isPremiumActive ? 'bg-emerald-500' : 'bg-slate-400'}`} 
                 style={{ width: isPremiumActive ? '100%' : `${Math.min(((profile?.cv_used || 0) / (profile?.cv_limit || 2)) * 100, 100)}%` }}
               />
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-3 sm:p-5 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1 sm:mb-2 gap-2">
              <h3 className="text-xs sm:text-sm font-medium text-slate-500 truncate">Programa de Afiliados</h3>
              <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-slate-400" />
            </div>
            <div>
              {isApproved ? (
                <div>
                   <span className="text-base sm:text-lg font-semibold text-slate-900">Ativo</span>
                   <p className="text-[10px] sm:text-sm text-slate-500 mt-0.5 line-clamp-1">30% de comissão</p>
                </div>
              ) : isPending ? (
                <div>
                   <span className="text-base sm:text-lg font-semibold text-amber-600">Em Análise</span>
                   <p className="text-[10px] sm:text-sm text-slate-500 mt-0.5 line-clamp-1">A aguardar aprovação</p>
                </div>
              ) : (
                <div>
                   <span className="text-base sm:text-lg font-semibold text-slate-700">Não inscrito</span>
                   <p className="text-[10px] sm:text-sm text-slate-500 mt-0.5 line-clamp-1">Até 30% de comissão</p>
                </div>
              )}
            </div>
            <div className="mt-2 sm:mt-4 pt-2 sm:pt-4 border-t border-slate-100">
               {isApproved ? (
                 <button onClick={() => navigate('/perfil/afiliado')} className="text-xs sm:text-sm text-slate-900 font-medium hover:underline truncate">Ver Dashboard →</button>
               ) : isPending ? (
                 <span className="text-xs sm:text-sm text-slate-400 font-medium">A aguardar</span>
               ) : (
                 <button onClick={() => navigate('/afiliado')} className="text-xs sm:text-sm text-slate-900 font-medium hover:underline truncate">Saber mais →</button>
               )}
            </div>
          </div>
        </div>

        {/* 3. Recent Documents List */}
        <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
          <div className="px-5 py-4 border-b border-slate-200">
            <h2 className="text-sm font-semibold text-slate-900">Documentos Recentes</h2>
          </div>
          
          <div className="p-0">
            {loadingCVs ? (
              <div className="flex items-center justify-center p-10">
                <Loader2 className="w-5 h-5 animate-spin text-slate-400" />
              </div>
            ) : savedCVs.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center p-10 bg-slate-50/50">
                <FileText className="w-8 h-8 text-slate-300 mb-3" />
                <h3 className="text-sm font-medium text-slate-700 mb-1">Sem documentos</h3>
                <p className="text-xs text-slate-500 mb-4">Crie o seu primeiro currículo para vê-lo aqui.</p>
                <Button 
                  onClick={() => navigate('/modelos')} 
                  variant="outline"
                  size="sm"
                  className="h-8 border-slate-200 text-slate-700 text-xs font-medium"
                >
                  Começar agora
                </Button>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {savedCVs.map((cv) => (
                  <div key={cv.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:px-5 hover:bg-slate-50 transition-colors gap-4">
                    <div className="flex items-start sm:items-center gap-3">
                      <div className="w-8 h-8 rounded border border-slate-200 bg-white flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4 text-slate-400" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-slate-900 line-clamp-1">{cv.title}</h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[11px] text-slate-500 flex items-center gap-1">
                            <CalendarDays className="w-3 h-3"/> 
                            {new Date(cv.updated_at).toLocaleDateString()}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                          <span className="text-[11px] text-slate-500">
                            Template: {cv.template_name === 'default' ? 'Padrão' : cv.template_name}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 sm:ml-auto">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="h-8 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 text-xs font-medium"
                        onClick={() => {
                          const templateId = cv.template_name === 'cv01' ? 'cv-classico-elegante' : 
                                           cv.template_name === 'cv02' ? 'cv-sidebar-professional' :
                                           cv.template_name === 'cv03' ? 'cv-minimalist-clean' :
                                           cv.template_name === 'cv04' ? 'cv-diagonal-modern' :
                                           cv.template_name || 'cv-classico-elegante';
                          navigate('/criar-cv', { state: { cvData: cv.cv_data, cvId: cv.id, selectedTemplate: { id: templateId } } });
                        }}
                      >
                        <Edit className="w-3.5 h-3.5 sm:mr-1.5" /> <span className="hidden sm:inline">Editar</span>
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="h-8 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 text-xs font-medium"
                        onClick={() => {
                            const templateId = cv.template_name === 'cv01' ? 'cv-classico-elegante' : 
                                             cv.template_name === 'cv02' ? 'cv-sidebar-professional' :
                                             cv.template_name === 'cv03' ? 'cv-minimalist-clean' :
                                             cv.template_name === 'cv04' ? 'cv-diagonal-modern' :
                                             cv.template_name || 'cv-classico-elegante';
                            setDownloadData({ 
                              cvData: cv.cv_data, 
                              selectedTemplate: { id: templateId },
                              cvId: cv.id 
                            });
                            setShowDownloadOptions(true);
                        }}
                      >
                        <Download className="w-3.5 h-3.5 sm:mr-1.5" /> <span className="hidden sm:inline">Baixar</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>

      <p className="text-center text-[11px] text-slate-400 font-medium pt-12 pb-4">
        MozVita CV • Versão 2.5.0
      </p>

      {showDownloadOptions && downloadData && (
        <DownloadOptions
          isOpen={showDownloadOptions}
          onClose={() => setShowDownloadOptions(false)}
          cvData={downloadData.cvData}
          selectedTemplate={downloadData.selectedTemplate}
          cvTitle={downloadData.cvData?.personalData?.fullName || "Meu CV Salvo"}
          cvId={downloadData.cvId}
        />
      )}
    </div>
  );
};

export default Profile;
