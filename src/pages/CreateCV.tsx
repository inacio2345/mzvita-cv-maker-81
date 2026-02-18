
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate, useLocation } from 'react-router-dom';
import { cvTemplates } from '@/data/cvTemplates';
import {
  ArrowLeft, Settings2, Download, Eye, Sparkles, PenLine
} from 'lucide-react';
import { useCVData } from '@/hooks/useCVData';
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
  const {
    cvData,
    updateCVData,
    reorderSections,
    toggleSectionVisibility,
    resetLayoutConfig,
    layoutConfig
  } = useCVData(templateData);

  // Persistence Logic
  // Persistence Logic
  // The 'activeTemplate' state initialization below handles recovery from localStorage correctly.
  // We don't need these useEffects anymore.

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
    if (!location.state?.templateData) {
      const savedData = localStorage.getItem('mz_cv_data');
      if (savedData) {
        try {
          const parsed = JSON.parse(savedData);
          updateCVData(parsed);
        } catch (e) {
          console.error("Failed to load saved CV data", e);
        }
      }
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

  const goToPreview = () => {
    navigate('/preview', {
      state: {
        cvData,
        selectedTemplate: activeTemplate,
        userPhoto: cvData.personalData?.photo
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
    <div className="min-h-screen bg-slate-100 flex flex-col h-screen overflow-hidden">
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
              <h2 className="font-bold flex items-center gap-2">
                <Settings2 className="w-5 h-5 text-google-blue" />
                Editor de CV Profissional
              </h2>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            variant="outline"
            size="sm"
            className="hidden sm:flex"
            onClick={goToPreview}
          >
            <Eye className="w-4 h-4 mr-2" /> Visualizar
          </Button>
          <Button
            size="sm"
            className="bg-google-blue hover:bg-blue-600"
            onClick={goToPreview}
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline ml-2 text-white">Pronto / Baixar CV</span>
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
            isMobile ? "p-4 pb-24" : "p-6"
          )}>
            <div className="space-y-4 sm:space-y-6">
              <AdvancedCVEditor
                layoutConfig={layoutConfig}
                onReorderSections={reorderSections}
                onToggleVisibility={toggleSectionVisibility}
                onReset={resetLayoutConfig}
                onSave={() => {
                  // The data is automatically saved in state/hook. 
                  // We can show a feedback message or just rely on the automatic preview.
                }}
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

              <div className="bg-emerald-50 p-3 sm:p-4 rounded-xl border border-emerald-100">
                <h4 className="font-bold text-emerald-900 flex items-center gap-2 mb-1 text-sm">
                  <Sparkles className="w-4 h-4" /> Dica Pro
                </h4>
                <p className="text-xs sm:text-sm text-emerald-700">
                  {isMobile
                    ? 'Você está no modo de edição visual. Toque nos textos para editar!'
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
          "flex-1 bg-slate-200/50 overflow-y-auto items-start justify-center",
          isMobile
            ? cn("w-full absolute inset-0", mobileView !== 'preview' ? "hidden" : "flex pb-20")
            : "hidden lg:flex p-8"
        )}>
          <div className={cn(
            "bg-white shadow-2xl origin-top transition-transform duration-500",
            isMobile
              ? "w-full min-h-full"
              : "w-[210mm] cv-a4-preview scale-[0.85] xl:scale-100"
          )}>
            <CVLayoutRenderer
              data={cvData}
              template={activeTemplate}
              layoutConfig={layoutConfig}
              isAdvancedMode={true}
              onDataChange={updateCVData}
              isMobile={isMobile}
            />
          </div>
        </section>
      </main>

      {/* Mobile Bottom Tab Bar — fixed at bottom */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t shadow-[0_-4px_12px_rgba(0,0,0,0.1)]">
          <div className="flex">
            <button
              onClick={() => setMobileView('editor')}
              className={cn(
                "flex-1 flex flex-col items-center justify-center py-3 gap-1 transition-colors min-h-[56px]",
                mobileView === 'editor'
                  ? "text-google-blue bg-blue-50 font-semibold"
                  : "text-slate-500"
              )}
            >
              <Settings2 className="w-5 h-5" />
              <span className="text-xs">Dados</span>
            </button>
            <div className="w-px bg-slate-200" />
            <button
              onClick={() => setMobileView('preview')}
              className={cn(
                "flex-1 flex flex-col items-center justify-center py-3 gap-1 transition-colors min-h-[56px]",
                mobileView === 'preview'
                  ? "text-google-blue bg-blue-50 font-semibold"
                  : "text-slate-500"
              )}
            >
              <PenLine className="w-5 h-5" />
              <span className="text-xs">Editar</span>
            </button>
            <div className="w-px bg-slate-200" />
            <button
              onClick={goToPreview}
              className="flex-1 flex flex-col items-center justify-center py-3 gap-1 text-emerald-600 min-h-[56px]"
            >
              <Download className="w-5 h-5" />
              <span className="text-xs font-semibold">Pronto</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateCV;
