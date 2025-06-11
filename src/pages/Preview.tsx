import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Download, Edit, FileText } from 'lucide-react';
import CVLayoutRenderer from '@/components/cv/CVLayoutRenderer';
import { getDefaultTemplate } from '@/data/cvTemplates';
import MobileNav from '@/components/ui/mobile-nav';
import DownloadOptions from '@/components/download/DownloadOptions';
import { useIsMobile } from '@/hooks/use-mobile';

const Preview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);
  const cvData = location.state?.cvData || {};
  const selectedTemplate = location.state?.selectedTemplate || getDefaultTemplate();
  const userPhoto = location.state?.userPhoto;

  console.log('Preview - Template selecionado:', selectedTemplate);
  console.log('Preview - Dados do CV:', cvData);

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
              <MobileNav showAuthButton={false} />
            )}
          </div>

          {/* Mobile Actions Row */}
          {isMobile && (
            <div className="flex gap-2 mt-3 pt-3 border-t border-gray-200">
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
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6 print:p-0">
        <div className="max-w-4xl mx-auto">
          {/* A4 Preview Card */}
          <Card className="bg-white shadow-lg print:shadow-none print:border-none overflow-hidden">
            {/* A4 Size Container */}
            <div 
              className="cv-content mx-auto bg-white print:min-h-[297mm] relative"
              style={{
                width: isMobile ? '100%' : '210mm',
                minHeight: isMobile ? 'auto' : '297mm',
                maxWidth: '100%'
              }}
            >
              <CVLayoutRenderer 
                data={cvData} 
                template={selectedTemplate}
                userPhoto={userPhoto}
                className="w-full h-full"
              />
            </div>
          </Card>

          {/* Mobile Info */}
          {isMobile && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200 print:hidden">
              <p className="text-sm text-blue-700 text-center">
                📱 Visualização otimizada para mobile. O download final será no formato A4 padrão.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Download Options Modal */}
      <DownloadOptions
        isOpen={showDownloadOptions}
        onClose={() => setShowDownloadOptions(false)}
        cvTitle={cvData.personalData?.fullName || 'Meu CV'}
        cvData={cvData}
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
