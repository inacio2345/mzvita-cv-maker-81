
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate, useLocation } from 'react-router-dom';
import { cvTemplates } from '@/data/cvTemplates';
import {
  ArrowLeft, Settings2, Download, Eye, Sparkles, PenLine, Plus, Minus, Save
} from 'lucide-react';
import { useCVData } from '@/hooks/useCVData';
import { useSavedCVs } from '@/hooks/useSavedCVs';
import CVLayoutRenderer from '@/components/cv/CVLayoutRenderer';
import AdvancedCVEditor from '@/components/cv/AdvancedCVEditor';
import CVFormEditor from '@/components/cv/CVFormEditor';
import { getDefaultTemplate } from '@/data/cvTemplates';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSubscription } from '@/hooks/useSubscription';
import { trackLead } from '@/utils/pixelEvents';
import { SidebarTrigger } from '@/components/ui/sidebar';

const CreateCV = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const templateData = location.state?.templateData;
  /* Removed duplicate declarations */

  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('preview');
  const [cvScale, setCvScale] = useState(1);
  const [userZoom, setUserZoom] = useState(1);
  const {
    cvData,
    updateCVData,
    reorderSections,
    toggleSectionVisibility,
    resetLayoutConfig,
    layoutConfig
  } = useCVData(templateData);

  const [autoSaveStatus, setAutoSaveStatus] = useState<'saved' | 'saving' | 'error' | null>(null);
  const [lastSavedJson, setLastSavedJson] = useState<string>('');
  const [isVersionPaid, setIsVersionPaid] = useState<boolean>(false);
  const [isCheckingPayment, setIsCheckingPayment] = useState(false);
  const [currentDbVersion, setCurrentDbVersion] = useState<number>(1);

  const { saveCV, updateCV, loading: isSavingCV } = useSavedCVs();
  const { checkCVPaid } = useSubscription();

  const cvId = location.state?.cvId;

  // Check if current version is paid
  useEffect(() => {
    if (cvId) {
      setIsCheckingPayment(true);
      checkCVPaid(cvId).then(res => {
        setIsVersionPaid(res.paid);
        if (res.version) setCurrentDbVersion(res.version);
        setIsCheckingPayment(false);
      });
    }
  }, [cvId, lastSavedJson, checkCVPaid]);

  // Calculate scale for preview (both mobile and desktop fit-to-screen)
  useEffect(() => {
    const calculateScale = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const a4WidthInPx = 794; 
      const a4HeightInPx = 1123;
      
      if (isMobile) {
        // Mobile: fit by width
        const newScale = (screenWidth / a4WidthInPx) * 1.02;
        setCvScale(newScale);
      } else {
        // Desktop: fit by height (leaving padding for header)
        const availableHeight = screenHeight - 140;
        let newScale = availableHeight / a4HeightInPx;
        
        if (newScale > 1.2) newScale = 1.2;
        if (newScale < 0.3) newScale = 0.3;
        
        setCvScale(newScale);
      }
    };

    calculateScale();
    window.addEventListener('resize', calculateScale);
    return () => window.removeEventListener('resize', calculateScale);
  }, [isMobile]);

  const handleZoomIn = () => setUserZoom(prev => Math.min(prev + 0.1, 2.0));
  const handleZoomOut = () => setUserZoom(prev => Math.max(prev - 0.1, 0.5));
  const resetZoom = () => setUserZoom(1);

  const finalScale = cvScale * userZoom;

  // Initialize selectedTemplate with priority: location.state -> localStorage -> default
  const [activeTemplate, setActiveTemplate] = useState(() => {
    if (location.state?.selectedTemplate) return location.state.selectedTemplate;

    const savedId = localStorage.getItem('mz_selected_template_id');
    if (savedId) {
      const found = cvTemplates.find(t => t.id === savedId);
      if (found) return found;
    }
    return getDefaultTemplate();
  });

  // Load saved CV Data on mount if available and no fresh template data passed
  useEffect(() => {
    // Limpar flags de pagamentos anteriores para permitir novos fluxos
    localStorage.removeItem('mz_payment_saved_flag');

    if (!location.state?.templateData && !location.state?.cvData) {
      const savedData = localStorage.getItem('mz_cv_data');
      if (savedData) {
        try {
          const parsed = JSON.parse(savedData);
          updateCVData(parsed);
        } catch (e) {
          console.error("Failed to load saved CV data", e);
        }
      }
    } else if (location.state?.cvData) {
      updateCVData(location.state.cvData);
    }
    
    // Disparar evento de Lead no Pixel
    trackLead();
  }, []);

  // Save Template ID and CV Data when they change
  useEffect(() => {
    if (activeTemplate?.id) {
      localStorage.setItem('mz_selected_template_id', activeTemplate.id);
    }
    if (cvData) {
      localStorage.setItem('mz_cv_data', JSON.stringify(cvData));
    }
  }, [activeTemplate, cvData]);

  // Real-time Auto-save Logic
  useEffect(() => {
    const cvId = location.state?.cvId;
    if (!cvId || !cvData) return;

    // Check if data actually changed since last save to avoid redundant API calls
    const currentJson = JSON.stringify(cvData);
    if (currentJson === lastSavedJson) return;

    const timer = setTimeout(async () => {
      setAutoSaveStatus('saving');
      try {
        const title = cvData?.personalData?.fullName 
          ? `CV de ${cvData.personalData.fullName}` 
          : `Meu CV Profissional - ${new Date().toLocaleDateString('pt-BR')}`;
          
        await updateCV(cvId, title, activeTemplate?.id || 'cv03', cvData);
        setLastSavedJson(currentJson);
        setAutoSaveStatus('saved');
        
        // Clear "saved" status after 3 seconds
        setTimeout(() => setAutoSaveStatus(null), 3000);
      } catch (error) {
        console.error("Auto-save failed", error);
        setAutoSaveStatus('error');
      }
    }, 3000); // 3 seconds debounce

    return () => clearTimeout(timer);
  }, [cvData, location.state?.cvId, updateCV, lastSavedJson]);

  const handleSaveCV = async () => {
    const title = cvData?.personalData?.fullName ? `CV de ${cvData.personalData.fullName}` : `Meu CV Profissional - ${new Date().toLocaleDateString('pt-BR')}`;
    const cvId = location.state?.cvId;

    if (cvId) {
      await updateCV(cvId, title, activeTemplate?.id || 'cv03', cvData);
    } else {
      const data = await saveCV(title, activeTemplate?.id || 'cv03', cvData);
      if (data) {
        // Atualizar estado de rota para garantir que próximos saves atualizarão o mesmo ID
        navigate('/criar-cv', { replace: true, state: { ...location.state, cvId: data.id, cvData, selectedTemplate: activeTemplate } });
      }
    }
  };

  const goToPreview = () => {
    navigate('/preview', {
      state: {
        cvData,
        selectedTemplate: activeTemplate,
        userPhoto: cvData.personalData?.photo,
        cvId: location.state?.cvId
      }
    });
  };

  useEffect(() => {
    if (!location.state?.fromExamples && !location.state?.cvId && !location.state?.cvData) {
      navigate('/modelos', { replace: true });
    } else if (!activeTemplate && !location.state?.fromExamples) {
      navigate('/modelos', { replace: true });
    }
  }, [activeTemplate, location.state, navigate]);

  if (!location.state?.fromExamples && !location.state?.cvId && !location.state?.cvData) {
    return null;
  }

  return (
    <div className="bg-slate-50 flex flex-col fixed inset-0 z-[60] overflow-hidden">
      {/* Global Header */}
      {!isMobile && (
        <header className="py-1 min-h-[40px] flex items-center justify-between px-2 sm:px-8 bg-white z-20 shrink-0 border-b border-slate-100">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/modelos')}
            className="text-slate-500 hover:text-slate-800 flex items-center gap-2 text-sm font-medium w-fit transition-colors hidden sm:flex"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar aos Modelos
          </button>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex flex-col items-end relative">
            <Button
              size="sm"
              variant="ghost"
              onClick={handleSaveCV}
              disabled={isSavingCV}
              className="text-google-blue bg-blue-50 hover:bg-blue-100 p-2 sm:px-4 h-9"
            >
              {isSavingCV ? (
                <div className="w-4 h-4 mr-0 sm:mr-2 border-2 border-google-blue border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Save className="w-4 h-4 sm:mr-2" />
              )}
              <span className="hidden sm:inline">Salvar</span>
            </Button>
            
            {autoSaveStatus && (
              <span className={cn(
                "text-[10px] font-medium absolute -bottom-4 right-0 px-1 whitespace-nowrap",
                autoSaveStatus === 'saving' && "text-blue-500",
                autoSaveStatus === 'saved' && "text-emerald-500",
                autoSaveStatus === 'error' && "text-red-500"
              )}>
                {autoSaveStatus === 'saving' && "A guardar..."}
                {autoSaveStatus === 'saved' && "Guardado ✓"}
                {autoSaveStatus === 'error' && "Erro"}
              </span>
            )}
          </div>

          <Button
            size="sm"
            className="bg-google-blue hover:bg-blue-600 px-6 font-bold"
            onClick={goToPreview}
          >
            <Download className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Baixar CV</span>
            <span className="sm:hidden">Baixar</span>
          </Button>
        </div>
      </header>
      )}

      <main className="flex-1 flex flex-col md:flex-row overflow-hidden relative bg-slate-50">
        
        <aside className={cn(
          "bg-white z-20 shrink-0 h-full overflow-y-auto transition-all duration-300 relative flex flex-col",
          isMobile
            ? cn("w-full absolute inset-0 pb-20 pt-0 pl-2 pr-4 sm:px-4", mobileView !== 'editor' && "hidden")
            : "w-[400px] lg:w-[450px] shadow-sm border-r border-slate-200"
        )}>
          {/* Form Header — removed duplicate, CVFormEditor has its own */}

          <div className="w-full flex-1">
            <CVFormEditor 
              cvData={cvData} 
              onUpdateCVData={updateCVData}
              colors={cvData.colorPalette || activeTemplate?.colorPalette}
              fonts={cvData.fonts || activeTemplate?.fonts}
              layoutConfig={layoutConfig}
              onUpdateStyle={(type, value) => {
                if (type === 'colors') {
                  updateCVData({ colorPalette: value });
                } else if (type === 'fonts') {
                  updateCVData({ fonts: value });
                }
              }}
            />
          </div>
          {/* Mobile Preview FAB */}
          {isMobile && mobileView === 'editor' && (
            <div className="fixed bottom-6 right-4 sm:right-6 z-50">
              <Button 
                onClick={() => setMobileView('preview')}
                className="rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-blue-600 hover:bg-blue-700 text-white gap-2 px-5 py-6 font-bold text-base border-2 border-white transition-transform hover:scale-105"
              >
                <Eye className="w-5 h-5" />
                <span>Ver CV</span>
              </Button>
            </div>
          )}
        </aside>

        {/* Right Area: Preview Canvas */}
        <div className={cn(
          "flex-1 flex flex-col bg-transparent relative overflow-hidden transition-all duration-300",
          isMobile
            ? cn("w-full absolute inset-0", mobileView !== 'preview' && "hidden")
            : ""
        )}>
          
          {/* Live Preview Canvas */}
          <div className={cn(
            "flex-1 overflow-y-auto flex items-start justify-center",
            isMobile ? "pt-6 pb-40 px-0" : "pt-2 pb-8"
          )}>
            {/* Floating Zoom & Back Controls */}
            {((isMobile && mobileView === 'preview') || !isMobile) && (
              <>
                {isMobile && (
                  <div className="fixed left-4 top-24 z-50">
                    <Button 
                      variant="secondary" 
                      size="icon" 
                      className="rounded-full shadow-lg bg-white border-blue-100 h-12 w-12" 
                      onClick={() => setMobileView('editor')}
                    >
                      <ArrowLeft className="w-6 h-6 text-slate-700" />
                    </Button>
                  </div>
                )}
                <div className={cn(
                  "fixed z-50 flex flex-col gap-2",
                  isMobile ? "right-4 top-1/2 -translate-y-1/2" : "right-8 top-1/2 -translate-y-1/2"
                )}>
                <Button 
                  variant="secondary" 
                  size="icon" 
                  className="rounded-full shadow-lg bg-white/90 backdrop-blur border-blue-100 h-10 w-10" 
                  onClick={handleZoomIn}
                >
                  <Plus className="w-5 h-5 text-google-blue" />
                </Button>
                <Button 
                  variant="secondary" 
                  size="icon" 
                  className="rounded-full shadow-lg bg-white/90 backdrop-blur border-blue-100 h-10 w-10 font-bold text-[10px]"
                  onClick={resetZoom}
                >
                  {Math.round(userZoom * 100)}%
                </Button>
                <Button 
                  variant="secondary" 
                  size="icon" 
                  className="rounded-full shadow-lg bg-white/90 backdrop-blur border-blue-100 h-10 w-10" 
                  onClick={handleZoomOut}
                >
                  <Minus className="w-5 h-5 text-google-blue" />
                </Button>
              </div>
            </>
          )}

          <div
              className="bg-white border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] origin-top rounded-[2px] overflow-visible relative transition-transform duration-300"
              style={{
                width: '794px',
                transform: `scale(${finalScale})`,
                minHeight: '1122px',
                marginBottom: `-${(1 - finalScale) * 1122}px`,
                backfaceVisibility: 'hidden',
              }}
            >
              {/* isAdvancedMode={false} disables direct canvas editing! */}
              <CVLayoutRenderer
                data={cvData}
                template={activeTemplate}
                layoutConfig={layoutConfig}
                isAdvancedMode={false} 
                onDataChange={updateCVData}
                isMobile={false}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Tab Bar — fixed at bottom */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t shadow-[0_-8px_20px_rgba(0,0,0,0.05)]">
          <div className="flex h-20 px-1 sm:px-2 w-full max-w-md mx-auto items-center justify-between">
            <button
              onClick={() => setMobileView('editor')}
              className={cn(
                "flex-1 flex flex-col items-center justify-center py-2 gap-1 transition-all",
                mobileView === 'editor'
                  ? "text-google-blue"
                  : "text-slate-400"
              )}
            >
              <div className={cn(
                "p-2 rounded-xl transition-all font-bold",
                mobileView === 'editor' ? "bg-blue-50" : ""
              )}>
                <PenLine className="w-5 h-5 font-bold" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-center">Editar CV</span>
            </button>

            <button
              onClick={() => setMobileView('preview')}
              className={cn(
                "flex-1 flex flex-col items-center justify-center py-2 gap-1 transition-all",
                mobileView === 'preview'
                  ? "text-google-blue"
                  : "text-slate-400"
              )}
            >
              <div className={cn(
                "p-2 rounded-xl transition-all",
                mobileView === 'preview' ? "bg-blue-50" : ""
              )}>
                <Eye className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-center">Ver CV</span>
            </button>

            <button
              onClick={goToPreview}
              className="flex-1 flex flex-col items-center justify-center py-2 gap-1 text-google-blue hover:text-blue-700 transition-all"
            >
              <div className="bg-google-blue text-white p-2 rounded-xl shadow-lg shadow-blue-200 active:scale-95 transition-transform">
                <Download className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-center text-google-blue">Baixar CV</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateCV;
