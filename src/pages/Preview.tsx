
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Download, Edit, FileText, Share2 } from 'lucide-react';
import CVLayoutRenderer from '@/components/cv/CVLayoutRenderer';
import { getDefaultTemplate } from '@/data/cvTemplates';

const Preview = () => {
  const navigate = useNavigate();
  const location = useLocation();
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
    <div className="min-h-screen bg-gray-100">
      {/* Header - Hide when printing */}
      <header className="bg-white shadow-sm border-b print:hidden">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate('/criar-cv')}
              className="flex items-center text-gray-600 hover:text-google-blue"
              size="sm"
            >
              <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Voltar ao Editor</span>
              <span className="sm:hidden">Voltar</span>
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-google-blue to-google-green rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-lg sm:text-xl font-bold text-gray-900">Visualização do CV</h1>
                {selectedTemplate.nome && (
                  <span className="text-xs sm:text-sm text-gray-500 block sm:inline">
                    ({selectedTemplate.nome})
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-1 sm:gap-2">
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
                <Edit className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Editar</span>
                <span className="sm:hidden">Edit</span>
              </Button>
              <Button
                variant="outline"
                onClick={handleShare}
                className="flex items-center border-gray-300 text-gray-600 hover:bg-gray-100 sm:flex hidden"
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
                <Download className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Baixar PDF</span>
                <span className="sm:hidden">PDF</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8 print:p-0">
        {/* CV Preview */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white shadow-lg print:shadow-none print:border-none overflow-hidden">
            <CVLayoutRenderer 
              data={cvData} 
              template={selectedTemplate}
              userPhoto={userPhoto}
              className="print:min-h-[297mm]"
            />
          </Card>
        </div>
      </div>

      {/* Print Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @media print {
            body { 
              print-color-adjust: exact !important;
              -webkit-print-color-adjust: exact !important;
            }
            .print\\:hidden { display: none !important; }
            .print\\:p-0 { padding: 0 !important; }
            .print\\:shadow-none { box-shadow: none !important; }
            .print\\:border-none { border: none !important; }
            .print\\:min-h-\\[297mm\\] { min-height: 297mm !important; }
            @page { 
              margin: 15mm; 
              size: A4; 
            }
            * {
              font-family: 'Inter', 'Arial', sans-serif !important;
              line-height: 1.4 !important;
            }
            .container {
              max-width: none !important;
              padding: 0 !important;
            }
            /* Responsive adjustments for print */
            .flex {
              display: flex !important;
            }
            .w-1\\/3 {
              width: 33.333333% !important;
            }
            .flex-1 {
              flex: 1 1 0% !important;
            }
          }
          
          /* Mobile responsiveness */
          @media (max-width: 768px) {
            .container {
              padding-left: 0.5rem !important;
              padding-right: 0.5rem !important;
            }
          }
        `
      }} />
    </div>
  );
};

export default Preview;
