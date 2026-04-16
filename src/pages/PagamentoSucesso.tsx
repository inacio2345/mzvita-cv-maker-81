
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Download, FileText, ArrowRight, Sparkles, Shield } from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';
import { useSavedCVs } from '@/hooks/useSavedCVs';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import DownloadOptions from '@/components/download/DownloadOptions';
import { getDefaultTemplate, cvTemplates } from '@/data/cvTemplates';
import { useToast } from '@/hooks/use-toast';

const PagamentoSucesso = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { refreshSubscription, profile, isPremiumActive, currentCredits } = useSubscription();
  const { saveCV } = useSavedCVs();
  const [hasSaved, setHasSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);
  const [downloadData, setDownloadData] = useState<{cvData: any, selectedTemplate: any} | null>(null);
  const [newlySavedCvId, setNewlySavedCvId] = useState<string | undefined>(undefined);

  const { toast } = useToast();
  const [retryCount, setRetryCount] = useState(0);

  // 1. Efeito para salvar o CV apenas UMA vez ao carregar a página (à prova de refresh)
  useEffect(() => {
    const saveCnonce = async () => {
      // Verificar se já salvamos nesta sessão para evitar duplicados no refresh
      const sessionSaved = localStorage.getItem('mz_payment_saved_flag');
      if (hasSaved || sessionSaved === 'true') {
        const storedCvId = localStorage.getItem('mz_newly_saved_cv_id');
        if (storedCvId) setNewlySavedCvId(storedCvId);
        setIsLoading(false);
        return;
      }
      
      const savedCvData = localStorage.getItem('mz_cv_data');
      const savedTemplateId = localStorage.getItem('mz_selected_template_id');

      if (savedCvData) {
        try {
          const cvData = JSON.parse(savedCvData);
          const title = cvData?.personalData?.fullName
            ? `Meu CV Profissional - ${cvData.personalData.fullName}`
            : `Meu CV Profissional - ${new Date().toLocaleDateString('pt-BR')}`;

          const savedItem = await saveCV(title, savedTemplateId || 'default', cvData);
          if (savedItem) {
            setNewlySavedCvId(savedItem.id);
            localStorage.setItem('mz_newly_saved_cv_id', savedItem.id);
          }
          setHasSaved(true);
          // Marcar como salvo no localStorage para bloquear duplicados se o user der refresh
          localStorage.setItem('mz_payment_saved_flag', 'true');
          console.log("CV salvo automaticamente com sucesso.");
          
          // Limpar a flag após um tempo ou quando sair da página (opcional)
        } catch (e) {
          console.error('Erro ao salvar CV automaticamente:', e);
          toast({
            title: "Erro ao salvar CV",
            description: "Ocorreu um problema ao salvar o seu currículo na nuvem. Por favor, tente salvá-lo manualmente no editor.",
            variant: "destructive"
          });
        }
      }
      setIsLoading(false);
    };

    saveCnonce();

    // Limpar flag ao desmontar para permitir futuros pagamentos de outros CVs
    return () => {
      // Nota: Não limpamos aqui para garantir que o refresh não dispare. 
      // A flag será limpa naturalmente quando o user iniciar um novo fluxo de criação.
    };
  }, []);

  // 2. Efeito para Polling de Subscrição (Atualizar status do pagamento)
  useEffect(() => {
    if (!user) return;

    // Se o plano já ativou, não precisamos de polling
    if (profile && profile.plan_type !== 'free') return;

    const interval = setInterval(async () => {
      if (retryCount < 15) {
        console.log(`Polling (${retryCount + 1}/15): Verificando ativação do plano...`);
        await refreshSubscription();
        setRetryCount(prev => prev + 1);
      } else {
        clearInterval(interval);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [user, profile?.plan_type, retryCount]);

  const getPlanLabel = () => {
    if (!profile) return '';
    switch (profile.plan_type) {
      case 'single': return 'Plano Avulso';
      case 'monthly': return 'Plano Mensal';
      case 'annual': return 'Plano Anual';
      default: return 'Plano Free';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-slate-50 flex items-center justify-center px-4 py-10 md:py-20">
      <div className="max-w-lg w-full">
        {/* Card Principal */}
        <div className="bg-white rounded-3xl shadow-2xl border border-green-100 overflow-hidden">
          {/* Header com gradiente */}
          <div className="bg-gradient-to-r from-google-green to-emerald-500 px-6 py-10 md:px-10 md:py-14 text-center relative overflow-hidden">
            {/* Confetti decorativo */}
            <div className="absolute inset-0 opacity-10">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-white rounded-full animate-bounce"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${1 + Math.random() * 2}s`
                  }}
                />
              ))}
            </div>

            <div className="relative z-10">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg border-2 border-white/30">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-white mb-2 tracking-tight">
                Pagamento Confirmado!
              </h1>
              <p className="text-white/80 text-sm md:text-base font-medium">
                Obrigado pela sua confiança. Seu plano foi activado.
              </p>
            </div>
          </div>

          {/* Corpo */}
          <div className="px-6 py-8 md:px-10 md:py-10 space-y-6">
            {/* Resumo do Plano */}
            <div className="bg-green-50 rounded-2xl p-5 border border-green-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white rounded-xl shadow-sm border border-green-100">
                  <Shield className="w-5 h-5 text-google-green" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Seu Plano Activo</h3>
                  <p className="text-xs text-green-700 font-semibold">{getPlanLabel()}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-xl p-3 text-center border border-green-50">
                  <p className="text-2xl font-black text-slate-900">
                    {profile?.plan_type === 'annual' ? '∞' : currentCredits}
                  </p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    Downloads Disponíveis
                  </p>
                </div>
                <div className="bg-white rounded-xl p-3 text-center border border-green-50">
                  <p className="text-2xl font-black text-google-green">
                    {isPremiumActive ? '✓' : '—'}
                  </p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    Status Premium
                  </p>
                </div>
              </div>
            </div>

            {/* CV Salvo automaticamente */}
            {hasSaved && (
              <div className="flex items-center gap-3 bg-blue-50 rounded-xl p-4 border border-blue-100">
                <div className="p-2 bg-white rounded-lg shadow-sm shrink-0">
                  <FileText className="w-5 h-5 text-google-blue" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-900 text-sm">CV Salvo Automaticamente</p>
                  <p className="text-xs text-slate-500 truncate">
                    O seu currículo foi guardado na sua conta. Pode voltar a baixá-lo a qualquer momento.
                  </p>
                </div>
                <Sparkles className="w-5 h-5 text-google-blue shrink-0" />
              </div>
            )}

            {/* Botões de Acção */}
            <div className="space-y-3">
              <Button
                onClick={() => {
                  const savedCvData = localStorage.getItem('mz_cv_data');
                  const savedTemplateId = localStorage.getItem('mz_selected_template_id');
                  if (savedCvData) {
                    const template = cvTemplates.find(t => t.id === savedTemplateId) || getDefaultTemplate();
                    setDownloadData({
                      cvData: JSON.parse(savedCvData),
                      selectedTemplate: template
                    });
                    setShowDownloadOptions(true);
                  } else {
                    toast({
                      title: "Dados não encontrados",
                      description: "Não conseguimos localizar o seu currículo localmente. Por favor, vá ao Editor.",
                      variant: "destructive"
                    });
                    navigate('/criar-cv');
                  }
                }}
                className="w-full h-14 text-base font-bold bg-google-green hover:bg-green-600 text-white rounded-xl shadow-lg shadow-green-200/50 transition-all hover:shadow-xl"
              >
                <Download className="w-5 h-5 mr-2" />
                Baixar Meu CV Agora
              </Button>

              <Button
                variant="outline"
                onClick={() => navigate('/criar-cv')}
                className="w-full h-12 text-sm font-bold border-2 border-slate-200 hover:border-google-blue hover:text-google-blue rounded-xl transition-all"
              >
                <FileText className="w-4 h-4 mr-2" />
                Editar ou Criar Novo CV
              </Button>

              <Button
                variant="ghost"
                onClick={() => navigate('/perfil?view=cvs')}
                className="w-full h-10 text-xs font-medium text-slate-500 hover:text-google-blue rounded-xl"
              >
                Ver Meus CVs Salvos
                <ArrowRight className="w-3 h-3 ml-2" />
              </Button>
            </div>
          </div>
        </div>

        {/* Nota de segurança */}
        <p className="text-center text-[11px] text-slate-400 mt-6 max-w-xs mx-auto">
          O comprovativo do seu pagamento foi enviado para o seu e-mail. Se tiver dúvidas,{' '}
          <span
            onClick={() => navigate('/contato')}
            className="text-google-blue font-bold cursor-pointer hover:underline"
          >
            contacte o suporte
          </span>
          .
        </p>
      </div>

      {showDownloadOptions && downloadData && (
        <DownloadOptions
          isOpen={showDownloadOptions}
          onClose={() => setShowDownloadOptions(false)}
          cvData={downloadData.cvData}
          selectedTemplate={downloadData.selectedTemplate}
          cvTitle={downloadData.cvData?.personalData?.fullName || "Meu CV"}
          cvId={newlySavedCvId}
        />
      )}
    </div>
  );
};

export default PagamentoSucesso;
