
import { ProfessionalFormData, Profession } from '@/types/professional';
import { jsPDF } from 'jspdf';

export const generateProfessionalCV = async (
  formData: ProfessionalFormData,
  profession: Profession
) => {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  // Configurar fonte (Times New Roman equivalente)
  pdf.setFont('times', 'normal');
  
  // Cores baseadas no template da profissão
  const colors = profession.cvTemplate.colors;
  
  let yPosition = 30;
  const margin = 20;
  const pageWidth = 190; // A4 width minus margins
  
  // Função auxiliar para adicionar texto com quebra de linha
  const addText = (text: string, x: number, y: number, maxWidth: number, fontSize: number = 12) => {
    pdf.setFontSize(fontSize);
    const lines = pdf.splitTextToSize(text, maxWidth);
    pdf.text(lines, x, y);
    return y + (lines.length * fontSize * 0.5);
  };

  // Cabeçalho com nome e profissão
  const primaryColor = hexToRgb(colors.primary);
  pdf.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  pdf.rect(0, 0, 210, 40, 'F');
  
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(24);
  pdf.setFont('times', 'bold');
  pdf.text(formData.fullName || '', margin, 20);
  
  pdf.setFontSize(16);
  pdf.setFont('times', 'normal');
  pdf.text(profession.name, margin, 30);

  // Resetar cor do texto
  pdf.setTextColor(0, 0, 0);
  yPosition = 60;

  // Dados Pessoais
  pdf.setFontSize(14);
  pdf.setFont('times', 'bold');
  yPosition = addText('DADOS PESSOAIS', margin, yPosition, pageWidth, 14);
  yPosition += 5;

  pdf.setFontSize(12);
  pdf.setFont('times', 'normal');
  
  const personalInfo = [
    `Email: ${formData.email}`,
    `Telefone: ${formData.phone}`,
    `Endereço: ${formData.address}`,
    formData.birthDate && `Data de Nascimento: ${new Date(formData.birthDate).toLocaleDateString('pt-BR')}`,
    formData.nationality && `Nacionalidade: ${formData.nationality}`,
    formData.idNumber && `BI: ${formData.idNumber}`,
    formData.maritalStatus && `Estado Civil: ${formData.maritalStatus}`
  ].filter(Boolean);

  personalInfo.forEach(info => {
    yPosition = addText(info as string, margin, yPosition, pageWidth);
    yPosition += 2;
  });

  yPosition += 10;

  // Objetivo Profissional
  pdf.setFontSize(14);
  pdf.setFont('times', 'bold');
  yPosition = addText('OBJETIVO PROFISSIONAL', margin, yPosition, pageWidth, 14);
  yPosition += 5;

  pdf.setFontSize(12);
  pdf.setFont('times', 'normal');
  yPosition = addText(profession.objectives, margin, yPosition, pageWidth);
  yPosition += 10;

  // Experiência/Informações Específicas
  pdf.setFontSize(14);
  pdf.setFont('times', 'bold');
  yPosition = addText('EXPERIÊNCIA E QUALIFICAÇÕES', margin, yPosition, pageWidth, 14);
  yPosition += 5;

  pdf.setFontSize(12);
  pdf.setFont('times', 'normal');

  if (formData.specificAnswers) {
    profession.specificQuestions.forEach(question => {
      const answer = formData.specificAnswers?.[question.id];
      if (answer) {
        pdf.setFont('times', 'bold');
        yPosition = addText(`${question.question}:`, margin, yPosition, pageWidth);
        yPosition += 2;
        
        pdf.setFont('times', 'normal');
        yPosition = addText(answer, margin, yPosition, pageWidth);
        yPosition += 5;
      }
    });
  }

  // Competências da Área
  yPosition += 5;
  pdf.setFontSize(14);
  pdf.setFont('times', 'bold');
  yPosition = addText('COMPETÊNCIAS', margin, yPosition, pageWidth, 14);
  yPosition += 5;

  pdf.setFontSize(12);
  pdf.setFont('times', 'normal');
  yPosition = addText(profession.description, margin, yPosition, pageWidth);

  // Salvar PDF
  const fileName = `CV_${profession.name.replace(/\s+/g, '_')}_${formData.fullName?.replace(/\s+/g, '_')}.pdf`;
  pdf.save(fileName);
};

// Função auxiliar para converter hex para RGB
const hexToRgb = (hex: string): number[] => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ] : [0, 0, 0];
};
