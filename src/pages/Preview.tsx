
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Download, Edit, FileText } from 'lucide-react';
import CVLayoutRenderer from '@/components/cv/CVLayoutRenderer';

const Preview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cvData = location.state?.cvData || {};
  const selectedTemplate = location.state?.selectedTemplate;

  const handleDownloadPDF = () => {
    window.print();
  };

  // Default template if none selected
  const defaultTemplate = {
    id: "default",
    nome: "CV Padrão",
    layout: "duas_colunas",
    foto_posicao: "esquerda",
    paleta: "azul_profissional",
    colorPalette: {
      primary: '#2563eb',
      secondary: '#1e40af',
      accent: '#3b82f6'
    }
  };

  const template = selectedTemplate || defaultTemplate;

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
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Editor
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-google-blue to-google-green rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Visualização do CV</h1>
              {template.nome && (
                <span className="text-sm text-gray-500">({template.nome})</span>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => navigate('/criar-cv', { state: { templateData: cvData, selectedTemplate: template } })}
                className="flex items-center border-google-blue text-google-blue hover:bg-google-blue hover:text-white"
              >
                <Edit className="w-4 h-4 mr-2" />
                Editar
              </Button>
              <Button
                onClick={handleDownloadPDF}
                className="bg-google-green hover:bg-green-600 text-white flex items-center"
              >
                <Download className="w-4 h-4 mr-2" />
                Baixar PDF
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 print:p-0">
        {/* CV Preview */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white shadow-lg print:shadow-none print:border-none overflow-hidden">
            <CVLayoutRenderer 
              data={cvData} 
              template={template}
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
              font-family: 'Times New Roman', serif !important;
              font-size: 12pt !important;
              line-height: 1.4 !important;
            }
            .container {
              max-width: none !important;
              padding: 0 !important;
            }
          }
        `
      }} />
    </div>
  );
};

export default Preview;
