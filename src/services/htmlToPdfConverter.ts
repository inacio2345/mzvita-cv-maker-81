import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { CVData } from '@/services/cvService';

export const generatePDFFromHTML = async (cvData: CVData, selectedTemplate?: any): Promise<void> => {
  try {
    // Criar um container temporário para renderizar o CV
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.style.top = '0';
    tempContainer.style.width = '210mm'; // A4 width
    tempContainer.style.minHeight = '297mm'; // A4 height
    tempContainer.style.backgroundColor = 'white';
    tempContainer.style.fontFamily = 'Inter, Arial, sans-serif';
    tempContainer.style.zoom = '1';
    
    document.body.appendChild(tempContainer);

    // Encontrar o elemento do preview existente
    const previewElement = document.querySelector('.cv-content');
    if (!previewElement) {
      throw new Error('Elemento de preview não encontrado');
    }

    // Clonar o conteúdo do preview
    const clonedElement = previewElement.cloneNode(true) as HTMLElement;
    clonedElement.style.width = '210mm';
    clonedElement.style.minHeight = '297mm';
    clonedElement.style.maxWidth = 'none';
    clonedElement.style.margin = '0';
    clonedElement.style.padding = '15mm';
    clonedElement.style.boxShadow = 'none';
    clonedElement.style.border = 'none';
    
    tempContainer.appendChild(clonedElement);

    // Aguardar um momento para que o DOM seja atualizado
    await new Promise(resolve => setTimeout(resolve, 100));

    // Capturar o elemento como canvas
    const canvas = await html2canvas(tempContainer, {
      scale: 2, // Alta qualidade
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: 794, // 210mm em pixels (210 * 3.78)
      height: 1123, // 297mm em pixels (297 * 3.78)
      scrollX: 0,
      scrollY: 0,
      windowWidth: 794,
      windowHeight: 1123
    });

    // Remover o container temporário
    document.body.removeChild(tempContainer);

    // Criar PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Calcular dimensões
    const pdfWidth = 210; // A4 width in mm
    const pdfHeight = 297; // A4 height in mm
    
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    
    // Calcular a escala para manter a proporção
    const scale = Math.min(pdfWidth / (canvasWidth * 0.264583), pdfHeight / (canvasHeight * 0.264583));
    
    const scaledWidth = canvasWidth * 0.264583 * scale;
    const scaledHeight = canvasHeight * 0.264583 * scale;
    
    // Centralizar na página
    const x = (pdfWidth - scaledWidth) / 2;
    const y = (pdfHeight - scaledHeight) / 2;

    // Adicionar a imagem ao PDF
    const imgData = canvas.toDataURL('image/png', 1.0);
    pdf.addImage(imgData, 'PNG', x, y, scaledWidth, scaledHeight, '', 'FAST');

    // Salvar o PDF
    const fileName = `CV_${cvData.personalData?.fullName?.replace(/\s+/g, '_') || 'Curriculum'}.pdf`;
    pdf.save(fileName);

  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    throw error;
  }
};

export const generatePDFPreviewFromHTML = async (cvData: CVData, selectedTemplate?: any): Promise<string> => {
  try {
    // Criar um container temporário para renderizar o CV
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.style.top = '0';
    tempContainer.style.width = '210mm';
    tempContainer.style.minHeight = '297mm';
    tempContainer.style.backgroundColor = 'white';
    tempContainer.style.fontFamily = 'Inter, Arial, sans-serif';
    tempContainer.style.zoom = '1';
    
    document.body.appendChild(tempContainer);

    // Encontrar o elemento do preview existente
    const previewElement = document.querySelector('.cv-content');
    if (!previewElement) {
      throw new Error('Elemento de preview não encontrado');
    }

    // Clonar o conteúdo do preview
    const clonedElement = previewElement.cloneNode(true) as HTMLElement;
    clonedElement.style.width = '210mm';
    clonedElement.style.minHeight = '297mm';
    clonedElement.style.maxWidth = 'none';
    clonedElement.style.margin = '0';
    clonedElement.style.padding = '15mm';
    clonedElement.style.boxShadow = 'none';
    clonedElement.style.border = 'none';
    
    tempContainer.appendChild(clonedElement);

    // Aguardar um momento para que o DOM seja atualizado
    await new Promise(resolve => setTimeout(resolve, 100));

    // Capturar o elemento como canvas
    const canvas = await html2canvas(tempContainer, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: 794,
      height: 1123,
      scrollX: 0,
      scrollY: 0,
      windowWidth: 794,
      windowHeight: 1123
    });

    // Remover o container temporário
    document.body.removeChild(tempContainer);

    // Criar PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Calcular dimensões
    const pdfWidth = 210;
    const pdfHeight = 297;
    
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    
    const scale = Math.min(pdfWidth / (canvasWidth * 0.264583), pdfHeight / (canvasHeight * 0.264583));
    
    const scaledWidth = canvasWidth * 0.264583 * scale;
    const scaledHeight = canvasHeight * 0.264583 * scale;
    
    const x = (pdfWidth - scaledWidth) / 2;
    const y = (pdfHeight - scaledHeight) / 2;

    // Adicionar a imagem ao PDF
    const imgData = canvas.toDataURL('image/png', 1.0);
    pdf.addImage(imgData, 'PNG', x, y, scaledWidth, scaledHeight, '', 'FAST');

    return pdf.output('datauristring');

  } catch (error) {
    console.error('Erro ao gerar preview PDF:', error);
    throw error;
  }
};