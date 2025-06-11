
import { CVData } from '@/services/cvService';
import { jsPDF } from 'jspdf';
import { 
  generateProfissionalClassico,
  generateBarraLateralEsquerda,
  generateLayoutSimplesDestaques,
  generateCriativoProfissional
} from '@/services/templatePdfGenerators';

export const generateProfessionalCV = async (cvData: CVData, selectedTemplate?: any) => {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  // Usar as mesmas cores do preview
  const colors = {
    primary: selectedTemplate?.colorPalette?.primary || '#2563eb',
    secondary: selectedTemplate?.colorPalette?.secondary || '#64748b',
    accent: selectedTemplate?.colorPalette?.accent || '#10b981'
  };

  // Determinar qual template usar - MESMA LÓGICA DO PREVIEW
  const templateId = selectedTemplate?.id || 'cv03'; // Default para cv03 que é o "Layout Simples com Destaques"

  console.log('Gerando PDF com template:', templateId);
  console.log('Cores do template:', colors);

  // Gerar PDF baseado no template selecionado - USAR O MESMO MAPEAMENTO
  switch (templateId) {
    case 'cv01':
      generateProfissionalClassico(pdf, cvData, colors);
      break;
    case 'cv02':
      generateBarraLateralEsquerda(pdf, cvData, colors);
      break;
    case 'cv03':
      generateLayoutSimplesDestaques(pdf, cvData, colors);
      break;
    case 'cv04':
      generateCriativoProfissional(pdf, cvData, colors);
      break;
    case 'cv05':
    case 'cv06':
    case 'cv07':
    case 'cv08':
    case 'cv09':
    case 'cv10':
      // Para os outros templates, usar variações
      generateBarraLateralEsquerda(pdf, cvData, colors);
      break;
    default:
      // Se não especificado, usar o Layout Simples com Destaques que parece ser o padrão
      generateLayoutSimplesDestaques(pdf, cvData, colors);
  }

  // Salvar PDF
  const fileName = `CV_${cvData.personalData?.fullName?.replace(/\s+/g, '_') || 'Curriculum'}.pdf`;
  pdf.save(fileName);
  
  return pdf;
};

// Função para gerar preview do PDF
export const generatePDFPreview = async (cvData: CVData, selectedTemplate?: any): Promise<string> => {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  // Usar as mesmas cores do preview
  const colors = {
    primary: selectedTemplate?.colorPalette?.primary || '#2563eb',
    secondary: selectedTemplate?.colorPalette?.secondary || '#64748b',
    accent: selectedTemplate?.colorPalette?.accent || '#10b981'
  };

  // Determinar qual template usar - MESMA LÓGICA DO PREVIEW
  const templateId = selectedTemplate?.id || 'cv03';

  // Gerar PDF baseado no template selecionado (mesmo que o download)
  switch (templateId) {
    case 'cv01':
      generateProfissionalClassico(pdf, cvData, colors);
      break;
    case 'cv02':
      generateBarraLateralEsquerda(pdf, cvData, colors);
      break;
    case 'cv03':
      generateLayoutSimplesDestaques(pdf, cvData, colors);
      break;
    case 'cv04':
      generateCriativoProfissional(pdf, cvData, colors);
      break;
    case 'cv05':
    case 'cv06':
    case 'cv07':
    case 'cv08':
    case 'cv09':
    case 'cv10':
      generateBarraLateralEsquerda(pdf, cvData, colors);
      break;
    default:
      generateLayoutSimplesDestaques(pdf, cvData, colors);
  }
  
  return pdf.output('datauristring');
};
