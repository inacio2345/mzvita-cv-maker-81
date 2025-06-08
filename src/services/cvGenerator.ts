import { CVData } from '@/services/cvService';
import { jsPDF } from 'jspdf';

export const generateProfessionalCV = async (cvData: CVData) => {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  // Configurações básicas
  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 15;
  const contentWidth = pageWidth - (margin * 2);
  
  // Cores profissionais
  const primaryColor = cvData.colorPalette?.primary || '#2563eb';
  const secondaryColor = cvData.colorPalette?.secondary || '#64748b';
  const accentColor = cvData.colorPalette?.accent || '#10b981';
  
  // Converter hex para RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16)
    ] : [37, 99, 235];
  };

  const [r, g, b] = hexToRgb(primaryColor);
  let yPosition = margin;

  // Função para adicionar texto com quebra automática
  const addTextBlock = (text: string, x: number, y: number, maxWidth: number, fontSize: number = 11, isBold: boolean = false) => {
    if (!text || text.trim() === '' || /^[s\s]*$/.test(text)) return y;
    
    pdf.setFontSize(fontSize);
    pdf.setFont('helvetica', isBold ? 'bold' : 'normal');
    const lines = pdf.splitTextToSize(text.trim(), maxWidth);
    pdf.text(lines, x, y);
    return y + (lines.length * (fontSize * 0.4));
  };

  // Função para adicionar seção com título
  const addSection = (title: string, yPos: number) => {
    // Linha decorativa
    pdf.setFillColor(r, g, b);
    pdf.rect(margin, yPos - 2, contentWidth, 0.5, 'F');
    
    // Título da seção
    pdf.setTextColor(r, g, b);
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text(title.toUpperCase(), margin, yPos + 5);
    
    pdf.setTextColor(0, 0, 0);
    return yPos + 12;
  };

  // CABEÇALHO PROFISSIONAL
  pdf.setFillColor(r, g, b);
  pdf.rect(0, 0, pageWidth, 35, 'F');
  
  // Nome
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(22);
  pdf.setFont('helvetica', 'bold');
  const fullName = cvData.personalData?.fullName || 'NOME COMPLETO';
  pdf.text(fullName.toUpperCase(), margin, 20);
  
  // Profissão/Cargo
  if (cvData.personalData?.profession) {
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'normal');
    pdf.text(cvData.personalData.profession, margin, 28);
  }

  yPosition = 45;

  // INFORMAÇÕES DE CONTATO
  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  
  const contactInfo = [];
  if (cvData.personalData?.email) contactInfo.push(`Email: ${cvData.personalData.email}`);
  if (cvData.personalData?.phone) contactInfo.push(`Telefone: ${cvData.personalData.phone}`);
  if (cvData.personalData?.address) contactInfo.push(`Endereço: ${cvData.personalData.address}`);
  
  if (contactInfo.length > 0) {
    const contactText = contactInfo.join(' | ');
    yPosition = addTextBlock(contactText, margin, yPosition, contentWidth, 10);
    yPosition += 8;
  }

  // PERFIL PROFISSIONAL
  if (cvData.about && cvData.about.trim() !== '' && !/^[s\s]*$/.test(cvData.about)) {
    yPosition = addSection('PERFIL PROFISSIONAL', yPosition);
    yPosition = addTextBlock(cvData.about, margin, yPosition, contentWidth, 11);
    yPosition += 10;
  }

  // EXPERIÊNCIA PROFISSIONAL
  if (cvData.experience && cvData.experience.length > 0) {
    yPosition = addSection('EXPERIÊNCIA PROFISSIONAL', yPosition);
    
    cvData.experience.forEach((exp, index) => {
      if (yPosition > 250) {
        pdf.addPage();
        yPosition = margin;
      }
      
      // Cargo
      if (exp.position) {
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(r, g, b);
        yPosition = addTextBlock(exp.position, margin, yPosition, contentWidth, 12, true);
        yPosition += 2;
      }
      
      // Empresa e datas
      pdf.setTextColor(0, 0, 0);
      const companyInfo = [];
      if (exp.company) companyInfo.push(exp.company);
      if (exp.startDate) {
        const endDate = exp.current ? 'Presente' : exp.endDate;
        companyInfo.push(`${exp.startDate} - ${endDate}`);
      }
      
      if (companyInfo.length > 0) {
        yPosition = addTextBlock(companyInfo.join(' | '), margin, yPosition, contentWidth, 10);
        yPosition += 2;
      }
      
      // Descrição
      if (exp.description && exp.description.trim() !== '') {
        yPosition = addTextBlock(exp.description, margin, yPosition, contentWidth, 10);
      }
      
      yPosition += 8;
    });
  }

  // FORMAÇÃO ACADÊMICA
  if (cvData.education && cvData.education.length > 0) {
    if (yPosition > 230) {
      pdf.addPage();
      yPosition = margin;
    }
    
    yPosition = addSection('FORMAÇÃO ACADÊMICA', yPosition);
    
    cvData.education.forEach((edu, index) => {
      if (yPosition > 250) {
        pdf.addPage();
        yPosition = margin;
      }
      
      // Curso
      if (edu.degree) {
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(r, g, b);
        yPosition = addTextBlock(edu.degree, margin, yPosition, contentWidth, 12, true);
        yPosition += 2;
      }
      
      // Instituição e ano
      pdf.setTextColor(0, 0, 0);
      const eduInfo = [];
      if (edu.institution) eduInfo.push(edu.institution);
      if (edu.startYear && edu.endYear) {
        eduInfo.push(`${edu.startYear} - ${edu.endYear}`);
      }
      
      if (eduInfo.length > 0) {
        yPosition = addTextBlock(eduInfo.join(' | '), margin, yPosition, contentWidth, 10);
      }
      
      yPosition += 8;
    });
  }

  // HABILIDADES
  const skills = cvData.skills;
  if (skills && Array.isArray(skills) && skills.length > 0) {
    if (yPosition > 240) {
      pdf.addPage();
      yPosition = margin;
    }
    
    yPosition = addSection('COMPETÊNCIAS TÉCNICAS', yPosition);
    const skillsText = skills.join(' • ');
    yPosition = addTextBlock(skillsText, margin, yPosition, contentWidth, 10);
    yPosition += 8;
  } else if (skills && typeof skills === 'object' && skills.technical && skills.technical.length > 0) {
    if (yPosition > 240) {
      pdf.addPage();
      yPosition = margin;
    }
    
    yPosition = addSection('COMPETÊNCIAS TÉCNICAS', yPosition);
    const skillsText = skills.technical.join(' • ');
    yPosition = addTextBlock(skillsText, margin, yPosition, contentWidth, 10);
    yPosition += 8;
  }

  // IDIOMAS
  if (skills && typeof skills === 'object' && skills.languages && skills.languages.length > 0) {
    if (yPosition > 250) {
      pdf.addPage();
      yPosition = margin;
    }
    
    yPosition = addSection('IDIOMAS', yPosition);
    const languagesText = skills.languages.join(' • ');
    yPosition = addTextBlock(languagesText, margin, yPosition, contentWidth, 10);
  }

  // Salvar PDF
  const fileName = `CV_${cvData.personalData?.fullName?.replace(/\s+/g, '_') || 'Curriculum'}.pdf`;
  pdf.save(fileName);
  
  return pdf;
};

// Função para gerar preview do PDF
export const generatePDFPreview = async (cvData: CVData): Promise<string> => {
  const pdf = await generateProfessionalCV(cvData);
  return pdf.output('datauristring');
};
