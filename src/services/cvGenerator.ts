
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

  // Configurar fonte padrão
  pdf.setFont('helvetica', 'normal');
  
  // Cores do template
  const colors = profession.cvTemplate.colors;
  const primaryColor = hexToRgb(colors.primary);
  const accentColor = hexToRgb(colors.accent);
  
  let yPosition = 25;
  const margin = 20;
  const pageWidth = 170; // A4 width minus margins
  const lineHeight = 6;
  
  // Função para adicionar texto com quebra automática
  const addText = (text: string, x: number, y: number, maxWidth: number, fontSize: number = 11, style: 'normal' | 'bold' = 'normal') => {
    pdf.setFontSize(fontSize);
    pdf.setFont('helvetica', style);
    const lines = pdf.splitTextToSize(text, maxWidth);
    pdf.text(lines, x, y);
    return y + (lines.length * lineHeight);
  };

  // Função para adicionar seção com título
  const addSection = (title: string, yPos: number) => {
    pdf.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    pdf.rect(margin, yPos - 5, pageWidth, 10, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text(title, margin + 5, yPos + 2);
    pdf.setTextColor(0, 0, 0);
    return yPos + 15;
  };

  // Cabeçalho principal
  pdf.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  pdf.rect(0, 0, 210, 35, 'F');
  
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  pdf.text(formData.fullName || 'NOME COMPLETO', margin, 20);
  
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'normal');
  pdf.text(profession.name, margin, 28);

  // Resetar cor do texto
  pdf.setTextColor(0, 0, 0);
  yPosition = 50;

  // DADOS PESSOAIS
  yPosition = addSection('DADOS PESSOAIS', yPosition);
  
  const personalInfo = [
    `📧 Email: ${formData.email}`,
    `📞 Telefone: ${formData.phone}`,
    `📍 Endereço: ${formData.address}`,
    formData.birthDate && `📅 Data de Nascimento: ${formatDate(formData.birthDate)}`,
    formData.nationality && `🌍 Nacionalidade: ${formData.nationality}`,
    formData.idNumber && `🆔 BI: ${formData.idNumber}`,
    formData.maritalStatus && `👥 Estado Civil: ${formData.maritalStatus}`
  ].filter(Boolean);

  personalInfo.forEach(info => {
    yPosition = addText(info as string, margin, yPosition, pageWidth, 10);
    yPosition += 3;
  });

  yPosition += 10;

  // OBJETIVO PROFISSIONAL
  yPosition = addSection('PERFIL PROFISSIONAL', yPosition);
  yPosition = addText(profession.objectives, margin, yPosition, pageWidth, 11);
  yPosition += 10;

  // EXPERIÊNCIA E QUALIFICAÇÕES
  yPosition = addSection('EXPERIÊNCIA E QUALIFICAÇÕES', yPosition);

  if (formData.specificAnswers) {
    profession.specificQuestions.forEach(question => {
      const answer = formData.specificAnswers?.[question.id];
      if (answer) {
        yPosition = addText(`${question.question}:`, margin, yPosition, pageWidth, 11, 'bold');
        yPosition += 2;
        yPosition = addText(answer, margin, yPosition, pageWidth, 10);
        yPosition += 8;
      }
    });
  }

  // COMPETÊNCIAS
  yPosition += 5;
  yPosition = addSection('COMPETÊNCIAS PROFISSIONAIS', yPosition);
  yPosition = addText(profession.description, margin, yPosition, pageWidth, 11);

  // Rodapé
  pdf.setFontSize(8);
  pdf.setTextColor(100, 100, 100);
  pdf.text('CV gerado automaticamente pela MozVita - mozvita.com', margin, 285);

  // Salvar PDF com nome formatado
  const fileName = `CV_${profession.name.replace(/\s+/g, '_')}_${formData.fullName?.replace(/\s+/g, '_')}_${new Date().getFullYear()}.pdf`;
  pdf.save(fileName);
};

// Função para formatar datas corretamente
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  
  if (isNaN(date.getTime())) {
    return 'Data inválida';
  }
  
  return `${months[date.getMonth()]} de ${date.getFullYear()}`;
};

// Função auxiliar para converter hex para RGB
const hexToRgb = (hex: string): number[] => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ] : [33, 150, 243]; // Cor padrão azul
};
