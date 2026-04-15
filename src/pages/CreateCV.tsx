
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
import { getDefaultTemplate } from '@/data/cvTemplates';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

  // Calculate scale for mobile preview
  useEffect(() => {
    if (!isMobile) {
      setCvScale(1);
      return;
    }

    const calculateScale = () => {
      const padding = 0;
      const screenWidth = window.innerWidth;
      const a4WidthInPx = 794; 
      // Multiplicamos por 1.02 para garantir que o CV preencha 100% e as bordas "sangrem" ligeiramente
      const newScale = (screenWidth / a4WidthInPx) * 1.02;
      setCvScale(newScale);
    };

    calculateScale();
    window.addEventListener('resize', calculateScale);
    return () => window.removeEventListener('resize', calculateScale);
  }, [isMobile]);

  const handleZoomIn = () => setUserZoom(prev => Math.min(prev + 0.1, 2.0));
  const handleZoomOut = () => setUserZoom(prev => Math.max(prev - 0.1, 0.5));
  const resetZoom = () => setUserZoom(1);

  const finalScale = isMobile ? cvScale * userZoom : 0.8;

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
    if (!activeTemplate && !location.state?.fromExamples) {
      navigate('/exemplos');
    }
  }, [activeTemplate, location.state, navigate]);

  if (!activeTemplate && !location.state?.fromExamples) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col h-screen overflow-hidden">
      {/* Compact Header */}
      <header className={cn(
        "bg-white border-b flex items-center justify-between z-20 shadow-sm",
        isMobile ? "px-3 py-2" : "px-6 py-3"
      )}>
        <div className="flex items-center gap-2 sm:gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/exemplos')} className="p-2">
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline ml-2">Mudar Modelo</span>
          </Button>
          {!isMobile && (
            <>
              <div className="h-6 w-px bg-slate-200" />
              <div className="flex flex-col">
                <h2 className="font-bold flex items-center gap-2 text-slate-800">
                  <Settings2 className="w-4 h-4 text-google-blue" />
                  Editor Profissional
                </h2>
                {cvId && (
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                      v{currentDbVersion}
                    </span>
                    {isCheckingPayment ? (
                      <div className="w-2 h-2 rounded-full bg-slate-200 animate-pulse" />
                    ) : (
                      <span className={cn(
                        "text-[9px] px-1.5 py-0.5 rounded-md font-bold uppercase tracking-wider",
                        isVersionPaid 
                          ? "bg-emerald-100 text-emerald-700 border border-emerald-200" 
                          : "bg-amber-100 text-amber-700 border border-amber-200"
                      )}>
                        {isVersionPaid ? "✓ Paga" : "⚡ Edição"}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex flex-col items-end relative">
            <Button
              size="sm"
              variant="ghost"
              onClick={handleSaveCV}
              disabled={isSavingCV}
              className="text-google-blue border-google-blue/30 bg-blue-50 hover:bg-blue-100 p-2 sm:px-4 h-9"
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
                "text-[10px] font-medium absolute -bottom-4 right-0 px-1 transition-all duration-300 whitespace-nowrap",
                autoSaveStatus === 'saving' && "text-blue-500 animate-pulse",
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

      <main className="flex-1 flex overflow-hidden relative">
        {/* Left Side: Controls/Forms — visible on desktop always, on mobile only when mobileView='editor' */}
        <aside className={cn(
          "bg-white border-r flex flex-col shadow-xl z-10 transition-all duration-300",
          isMobile
            ? cn("w-full absolute inset-0", mobileView !== 'editor' && "hidden")
            : "w-[400px]"
        )}>
          <div className={cn(
            "flex-1 overflow-y-auto",
            isMobile ? "p-4 pb-32" : "p-6"
          )}>
            <div className="space-y-4 sm:space-y-6">
              <AdvancedCVEditor
                layoutConfig={layoutConfig}
                onReorderSections={reorderSections}
                onToggleVisibility={toggleSectionVisibility}
                onReset={resetLayoutConfig}
                onSave={handleSaveCV}
                isDirty={false}
                colors={cvData.colorPalette || activeTemplate?.colorPalette}
                fonts={cvData.fonts || activeTemplate?.fonts}
                onUpdateStyle={(type, value) => {
                  if (type === 'colors') {
                    updateCVData({ colorPalette: value });
                  } else if (type === 'fonts') {
                    updateCVData({ fonts: value });
                  }
                }}
              />

              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                <h4 className="font-bold text-emerald-900 flex items-center gap-2 mb-1 text-sm">
                  <Sparkles className="w-4 h-4" /> Dica Pro
                </h4>
                <p className="text-xs text-emerald-700 leading-relaxed">
                  {isMobile
                    ? 'Toque nos textos do currículo para editar diretamente! O layout será exatamente igual ao final.'
                    : 'Você pode clicar em qualquer texto do currículo ao lado para editá-lo diretamente!'
                  }
                </p>
              </div>
            </div>
          </div>

          {!isMobile && (
            <div className="p-4 border-t bg-slate-50 text-center text-[10px] text-slate-400">
              Powered by MozVita - Seu Sucesso Profissional
            </div>
          )}
        </aside>

        {/* Right Side: Live Preview — visible on desktop always, on mobile only when mobileView='preview' */}
        <section className={cn(
          "flex-1 bg-slate-200/70 overflow-y-auto flex items-start transition-all duration-300 relative",
          isMobile
            ? (mobileView !== 'preview' ? "hidden" : "w-full absolute inset-0 pt-6 pb-40 px-0 justify-start")
            : "p-8 justify-center"
        )}>
          {/* Floating Zoom Controls - Mobile ONLY */}
          {isMobile && mobileView === 'preview' && (
            <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2">
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
          )}

          <div 
            className="bg-transparent origin-top transition-transform duration-300 rounded-[2px] transform-gpu overflow-visible relative"
            style={{
              width: "794px", 
              transform: `scale(${isMobile ? finalScale : 0.8})`,
              minHeight: "1122px", 
              marginBottom: isMobile ? `-${(1 - finalScale) * 1122}px` : `-${(1 - 0.8) * 1122}px`, 
              willChange: "transform",
              backfaceVisibility: "hidden"
            }}
          >
            <CVLayoutRenderer
              data={cvData}
              template={activeTemplate}
              layoutConfig={layoutConfig}
              isAdvancedMode={true}
              onDataChange={updateCVData}
              isMobile={false}
            />
          </div>
        </section>
      </main>

      {/* Mobile Bottom Tab Bar — fixed at bottom */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t shadow-[0_-8px_20px_rgba(0,0,0,0.05)]">
          <div className="flex h-20 px-2 items-center">
            <button
              onClick={() => setMobileView('editor')}
              className={cn(
                "flex-1 flex flex-col items-center justify-center py-2 gap-1.5 transition-all",
                mobileView === 'editor'
                  ? "text-google-blue"
                  : "text-slate-400"
              )}
            >
              <div className={cn(
                "p-2 rounded-xl transition-all font-bold",
                mobileView === 'editor' ? "bg-blue-50" : ""
              )}>
                <Settings2 className="w-5 h-5 font-bold" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-center">Configurações</span>
            </button>

            <button
              onClick={() => setMobileView('preview')}
              className={cn(
                "flex-1 flex flex-col items-center justify-center py-2 gap-1.5 transition-all",
                mobileView === 'preview'
                  ? "text-google-blue"
                  : "text-slate-400"
              )}
            >
              <div className={cn(
                "p-2 rounded-xl transition-all",
                mobileView === 'preview' ? "bg-blue-50" : ""
              )}>
                <PenLine className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-center">Editar Texto</span>
            </button>

            <button
              onClick={goToPreview}
              className="flex-[1.2] flex flex-col items-center justify-center py-2 gap-1.5 text-white"
            >
              <div className="bg-google-blue p-3 rounded-2xl shadow-lg shadow-blue-200 active:scale-95 transition-transform flex items-center justify-center w-full max-w-[110px]">
                <Download className="w-5 h-5 mr-2" />
                <span className="text-[11px] font-bold uppercase tracking-tight">Baixar CV</span>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateCV;
