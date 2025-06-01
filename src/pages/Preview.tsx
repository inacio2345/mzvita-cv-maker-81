
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Download, Edit, FileText, Share2 } from 'lucide-react';
import CVLayoutRenderer from '@/components/cv/CVLayoutRenderer';
import { getDefaultTemplate } from '@/data/cvTemplates';
import MobileNav from '@/components/ui/mobile-nav';
import { useIsMobile } from '@/hooks/use-mobile';

const Preview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const cvData = location.state?.cvData || {};
  const selectedTemplate = location.state?.selectedTemplate || getDefaultTemplate();
  const userPhoto = location.state?.userPhoto;

  const handleDownloadPDF = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Meu CV - MzVita',
        text: 'Veja meu currículo criado com MzVita',
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copiado para a área de transferência!');
    }
  };

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
                  variant="outline"
                  onClick={handleShare}
                  className="flex items-center border-gray-300 text-gray-600 hover:bg-gray-100"
                  size="sm"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Compartilhar
                </Button>
                <Button
                  onClick={handleDownloadPDF}
                  className="bg-google-green hover:bg-green-600 text-white flex items-center"
                  size="sm"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Baixar PDF
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
                onClick={handleDownloadPDF}
                className="flex-1 bg-google-green hover:bg-green-600 text-white flex items-center justify-center"
                size="sm"
              >
                <Download className="w-4 h-4 mr-1" />
                PDF
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
              className="mx-auto bg-white print:min-h-[297mm] relative"
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
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-700 text-center">
                📱 Visualização otimizada para mobile. O PDF final será no formato A4 padrão.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Print Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @media print {
            /* Remove header, footer e outros elementos do navegador */
            @page { 
              margin: 20mm 15mm 15mm 15mm; 
              size: A4 portrait;
            }
            
            /* Esconder elementos desnecessários */
            body { 
              print-color-adjust: exact !important;
              -webkit-print-color-adjust: exact !important;
              margin: 0 !important;
              padding: 0 !important;
            }
            
            /* Remove elementos de interface */
            .print\\:hidden { 
              display: none !important; 
            }
            .print\\:p-0 { 
              padding: 0 !important; 
            }
            .print\\:shadow-none { 
              box-shadow: none !important; 
            }
            .print\\:border-none { 
              border: none !important; 
            }
            .print\\:min-h-\\[297mm\\] { 
              min-height: 297mm !important; 
            }
            
            /* Estilos de fonte e texto para impressão */
            * {
              font-family: 'Inter', 'Arial', sans-serif !important;
              line-height: 1.4 !important;
            }
            
            /* Remove margens e padding do container principal */
            .container {
              max-width: none !important;
              padding: 0 !important;
              margin: 0 !important;
            }
            
            /* Layout fixes para impressão */
            .flex {
              display: flex !important;
            }
            .w-1\\/3 {
              width: 33.333333% !important;
            }
            .flex-1 {
              flex: 1 1 0% !important;
            }
            
            /* Quebras de página apropriadas */
            .cv-section {
              page-break-inside: avoid;
              break-inside: avoid;
              orphans: 3;
              widows: 3;
            }
            
            /* Evita quebras de página indesejadas */
            h1, h2, h3, h4, h5, h6 {
              page-break-after: avoid;
              break-after: avoid;
            }
            
            /* Espaçamento adequado entre seções */
            .cv-section + .cv-section {
              margin-top: 1rem;
            }
            
            /* Força quebra de página quando necessário */
            .page-break {
              page-break-before: always;
              break-before: page;
            }
            
            /* Remove elementos específicos do browser */
            header, footer, nav, .header, .footer, .nav {
              display: none !important;
            }
            
            /* Otimizações de cor para impressão */
            * {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            
            /* Remove background patterns desnecessários */
            body::before, body::after {
              display: none !important;
            }
            
            /* Garante que o conteúdo ocupe toda a página */
            html, body {
              width: 100% !important;
              height: auto !important;
              overflow: visible !important;
            }
            
            /* Remove scrollbars */
            ::-webkit-scrollbar {
              display: none !important;
            }
            
            /* Limpa elementos flutuantes */
            .clearfix::after {
              content: "";
              display: table;
              clear: both;
            }
          }
          
          /* Mobile responsive adjustments */
          @media (max-width: 768px) {
            .container {
              padding-left: 0.5rem !important;
              padding-right: 0.5rem !important;
            }
            
            /* Mobile CV adjustments */
            .cv-mobile-text {
              font-size: 0.875rem !important;
              line-height: 1.25rem !important;
            }
            
            .cv-mobile-title {
              font-size: 1.125rem !important;
              line-height: 1.375rem !important;
            }
            
            .cv-mobile-name {
              font-size: 1.5rem !important;
              line-height: 1.75rem !important;
            }
          }
        `
      }} />
    </div>
  );
};

export default Preview;
