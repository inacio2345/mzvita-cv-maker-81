
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Download, Edit, FileText, Layers, ClipboardList, Plus, Minus, Eye } from 'lucide-react';
import CVLayoutRenderer from '@/components/cv/CVLayoutRenderer';
import AdvancedCVEditor from '@/components/cv/AdvancedCVEditor';
import { getDefaultTemplate } from '@/data/cvTemplates';
import { getDefaultLayoutConfig, LayoutConfig } from '@/services/cvService';
import MobileNav from '@/components/ui/mobile-nav';
import DownloadOptions from '@/components/download/DownloadOptions';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLayoutPersistence } from '@/hooks/useLayoutPersistence';
import { cn } from '@/lib/utils';

const Preview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);
  const [editorMode, setEditorMode] = useState<'simple' | 'advanced'>('simple');

  const cvData = location.state?.cvData || {};
  const selectedTemplate = location.state?.selectedTemplate || getDefaultTemplate();
  const userPhoto = location.state?.userPhoto;
  const cvId = location.state?.cvId;

  // Use layout persistence hook
  const {
    layoutConfig,
    reorderSections,
    toggleSectionVisibility,
    resetLayout,
    forceSave,
    isDirty
  } = useLayoutPersistence(cvId);

  const [cvScale, setCvScale] = useState(1);
  const [userZoom, setUserZoom] = useState(1);

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

  const finalScale = isMobile ? cvScale * userZoom : 1;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Hide when printing */}
      <header className="bg-white shadow-sm border-b print:hidden sticky top-0 z-40">
        <div className="container mx-auto px-2 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Logo e Título */}
            <div className="flex items-center space-x-2 flex-1">
              <Button
                variant="ghost"
                onClick={() => navigate('/criar-cv')}
                className="flex items-center text-gray-600 hover:text-google-blue p-1 sm:p-2"
                size="sm"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">Voltar</span>
              </Button>

              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-google-blue to-google-green rounded-lg flex items-center justify-center">
                  <FileText className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-lg font-bold text-gray-900">Visualização do CV</h1>
                  {selectedTemplate.nome && (
                    <span className="text-xs text-gray-500">({selectedTemplate.nome})</span>
                  )}
                </div>
              </div>
            </div>

            {/* Desktop Actions */}
            {!isMobile && (
              <div className="flex gap-2">
                {/* Mode Toggle */}
                <div className="flex rounded-lg border overflow-hidden mr-2">
                  <Button
                    variant={editorMode === 'simple' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setEditorMode('simple')}
                    className={cn(
                      "rounded-none border-0",
                      editorMode === 'simple' && "bg-primary text-primary-foreground"
                    )}
                  >
                    <ClipboardList className="w-4 h-4 mr-1" />
                    Simples
                  </Button>
                  <Button
                    variant={editorMode === 'advanced' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setEditorMode('advanced')}
                    className={cn(
                      "rounded-none border-0",
                      editorMode === 'advanced' && "bg-primary text-primary-foreground"
                    )}
                  >
                    <Layers className="w-4 h-4 mr-1" />
                    Avançado
                  </Button>
                </div>

                <Button
                  variant="outline"
                  onClick={() => navigate('/criar-cv', {
                    state: {
                      templateData: cvData,
                      selectedTemplate: selectedTemplate
                    }
                  })}
                  className="flex items-center border-google-blue text-google-blue hover:bg-google-blue hover:text-white"
                  size="sm"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Editar
                </Button>
                <Button
                  onClick={() => setShowDownloadOptions(true)}
                  className="bg-google-green hover:bg-green-600 text-white flex items-center"
                  size="sm"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Baixar
                </Button>
              </div>
            )}

            {/* Mobile Navigation */}
            {isMobile && (
              <MobileNav />
            )}
          </div>

          {/* Mobile Mode Toggle */}
          {isMobile && (
            <div className="flex gap-2 mt-3 pt-3 border-t border-gray-200">
              <div className="flex rounded-lg border overflow-hidden flex-1">
                <Button
                  variant={editorMode === 'simple' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setEditorMode('simple')}
                  className={cn(
                    "flex-1 rounded-none border-0 text-xs",
                    editorMode === 'simple' && "bg-primary text-primary-foreground"
                  )}
                >
                  <ClipboardList className="w-3 h-3 mr-1" />
                  Simples
                </Button>
                <Button
                  variant={editorMode === 'advanced' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setEditorMode('advanced')}
                  className={cn(
                    "flex-1 rounded-none border-0 text-xs",
                    editorMode === 'advanced' && "bg-primary text-primary-foreground"
                  )}
                >
                  <Layers className="w-3 h-3 mr-1" />
                  Avançado
                </Button>
              </div>
            </div>
          )}

          {/* Mobile Actions Row */}
          {isMobile && (
            <div className="flex gap-2 mt-2">
              <Button
                variant="outline"
                onClick={() => navigate('/criar-cv', {
                  state: {
                    templateData: cvData,
                    selectedTemplate: selectedTemplate
                  }
                })}
                className="flex-1 flex items-center justify-center border-google-blue text-google-blue hover:bg-google-blue hover:text-white"
                size="sm"
              >
                <Edit className="w-4 h-4 mr-1" />
                Editar
              </Button>
              <Button
                onClick={() => setShowDownloadOptions(true)}
                className="flex-1 bg-google-green hover:bg-green-600 text-white flex items-center justify-center"
                size="sm"
              >
                <Download className="w-4 h-4 mr-1" />
                Baixar
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* CV Preview Container */}
      <div className={cn(
        "flex-1 bg-slate-200/70 overflow-y-auto flex items-start transition-all duration-300 min-h-[calc(100vh-140px)] print:p-0 print:bg-white relative",
        isMobile ? "p-0 justify-start" : "p-12 justify-center"
      )}>
        {/* Floating Zoom Controls - Mobile ONLY */}
        {isMobile && (
          <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2 print:hidden">
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
        <div className={cn(
          "max-w-5xl mx-auto w-full flex justify-center",
          editorMode === 'advanced' && !isMobile && "grid grid-cols-[300px_1fr] gap-8"
        )}>

          {/* Advanced Editor Panel */}
          {editorMode === 'advanced' && (
            <div className={cn(isMobile && "mb-8")}>
              <AdvancedCVEditor
                layoutConfig={layoutConfig}
                onReorderSections={reorderSections}
                onToggleVisibility={toggleSectionVisibility}
                onReset={resetLayout}
                onSave={forceSave}
                isDirty={isDirty}
                colors={cvData?.colorPalette}
                fonts={cvData?.fonts}
                onUpdateStyle={() => {}} // Simple view, no style editing from preview
              />
            </div>
          )}

          {/* A4 Preview Card */}
          <div 
            className="bg-white shadow-[0_30px_60px_rgba(0,0,0,0.2)] origin-top transition-transform duration-300 rounded-[2px] print:shadow-none print:border-none overflow-hidden transform-gpu"
            style={{
              width: "794px",
              transform: `scale(${finalScale})`,
              minHeight: "1122px",
              marginBottom: isMobile ? `-${(1 - finalScale) * 1122}px` : "0",
              willChange: "transform",
              backfaceVisibility: "hidden"
            }}
          >
            <CVLayoutRenderer
              data={{
                ...cvData,
                layoutConfig: layoutConfig
              }}
              template={selectedTemplate}
              userPhoto={userPhoto}
              className="w-full h-full"
              layoutConfig={layoutConfig}
              isAdvancedMode={editorMode === 'advanced'}
              isMobile={false} // Force desktop layout for A4 preservation
            />
          </div>
        </div>
      </div>

      {/* Mobile Tip */}
      {isMobile && (
        <div className="fixed bottom-24 left-4 right-4 z-10 animate-bounce print:hidden">
          <div className="bg-google-blue/90 backdrop-blur text-white p-3 rounded-xl shadow-xl border border-white/20 text-center text-xs font-bold uppercase tracking-wider">
            ✨ Este é o seu CV final! Pronto para baixar?
          </div>
        </div>
      )}

      {/* Download Options Modal */}
      <DownloadOptions
        isOpen={showDownloadOptions}
        onClose={() => setShowDownloadOptions(false)}
        cvTitle={cvData.personalData?.fullName || 'Meu CV'}
        cvData={{
          ...cvData,
          layoutConfig: layoutConfig
        }}
        selectedTemplate={selectedTemplate}
      />

      {/* Clean Print Styles - Only CV content */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @media print {
            @page { 
              margin: 0; 
              size: A4 portrait;
            }
            
            body { 
              print-color-adjust: exact !important;
              -webkit-print-color-adjust: exact !important;
              margin: 0 !important;
              padding: 0 !important;
            }
            
            .print\\:hidden { 
              display: none !important; 
            }
            
            * {
              font-family: 'Inter', 'Arial', sans-serif !important;
            }
            
            .cv-content {
              width: 100% !important;
              max-width: none !important;
              margin: 0 !important;
              padding: 15mm !important;
              box-shadow: none !important;
              border: none !important;
            }
            
            /* Hide all non-CV content */
            header, footer, nav, .header, .footer, .nav {
              display: none !important;
            }
            
            /* Hide container styling */
            .container {
              max-width: none !important;
              padding: 0 !important;
              margin: 0 !important;
            }
            
            .cv-section {
              page-break-inside: avoid;
              break-inside: avoid;
            }
            
            h1, h2, h3, h4, h5, h6 {
              page-break-after: avoid;
              break-after: avoid;
            }
          }
        `
      }} />
    </div>
  );
};

export default Preview;
