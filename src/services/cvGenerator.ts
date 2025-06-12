
import { CVData } from '@/services/cvService';
import { jsPDF } from 'jspdf';
import { 
  generateProfissionalClassico,
  generateBarraLateralEsquerda,
  generateLayoutSimplesDestaques,
  generateCriativoProfissional
} from '@/services/templatePdfGenerators';
import { generatePDFFromHTML, generatePDFPreviewFromHTML } from '@/services/htmlToPdfConverter';

export const generateProfessionalCV = async (cvData: CVData, selectedTemplate?: any) => {
  try {
    // Usar o novo método que converte HTML para PDF
    await generatePDFFromHTML(cvData, selectedTemplate);
    console.log('PDF gerado com sucesso usando conversão HTML-to-PDF');
  } catch (error) {
    console.error('Erro na conversão HTML-to-PDF, usando método fallback:', error);
    
    // Fallback para o método original se houver erro
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const colors = {
      primary: selectedTemplate?.colorPalette?.primary || '#2563eb',
      secondary: selectedTemplate?.colorPalette?.secondary || '#64748b',
      accent: selectedTemplate?.colorPalette?.accent || '#10b981'
    };

    const templateId = selectedTemplate?.id || 'cv03';

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
      default:
        generateLayoutSimplesDestaques(pdf, cvData, colors);
    }

    const fileName = `CV_${cvData.personalData?.fullName?.replace(/\s+/g, '_') || 'Curriculum'}.pdf`;
    pdf.save(fileName);
    
    return pdf;
  }
};

// Função para gerar preview do PDF
export const generatePDFPreview = async (cvData: CVData, selectedTemplate?: any): Promise<string> => {
  try {
    // Usar o novo método que converte HTML para PDF
    return await generatePDFPreviewFromHTML(cvData, selectedTemplate);
  } catch (error) {
    console.error('Erro na conversão HTML-to-PDF preview, usando método fallback:', error);
    
    // Fallback para o método original se houver erro
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const colors = {
      primary: selectedTemplate?.colorPalette?.primary || '#2563eb',
      secondary: selectedTemplate?.colorPalette?.secondary || '#64748b',
      accent: selectedTemplate?.colorPalette?.accent || '#10b981'
    };

    const templateId = selectedTemplate?.id || 'cv03';

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
      default:
        generateLayoutSimplesDestaques(pdf, cvData, colors);
    }
    
    return pdf.output('datauristring');
  }
};
