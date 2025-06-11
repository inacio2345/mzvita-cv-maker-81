
import { jsPDF } from 'jspdf';
import { CVData } from '@/services/cvService';

interface TemplateColors {
  primary: string;
  secondary: string;
  accent: string;
}

// Função auxiliar para converter hex para RGB
const hexToRgb = (hex: string): [number, number, number] => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ] : [37, 99, 235];
};

// Função auxiliar para verificar se skills é um objeto com technical e languages
const isSkillsObject = (skills: any): skills is { technical?: string[]; languages?: string[] } => {
  return skills && typeof skills === 'object' && !Array.isArray(skills);
};

// Função auxiliar para adicionar texto com quebra automática
const addTextBlock = (
  pdf: jsPDF, 
  text: string, 
  x: number, 
  y: number, 
  maxWidth: number, 
  fontSize: number = 11, 
  isBold: boolean = false
): number => {
  if (!text || text.trim() === '') return y;
  
  pdf.setFontSize(fontSize);
  pdf.setFont('helvetica', isBold ? 'bold' : 'normal');
  const lines = pdf.splitTextToSize(text.trim(), maxWidth);
  pdf.text(lines, x, y);
  return y + (lines.length * (fontSize * 0.4));
};

// TEMPLATE 1: Profissional Clássico
export const generateProfissionalClassico = (pdf: jsPDF, cvData: CVData, colors: TemplateColors) => {
  const pageWidth = 210;
  const margin = 15;
  const contentWidth = pageWidth - (margin * 2);
  const [r, g, b] = hexToRgb(colors.primary);
  let yPosition = margin;

  // Cabeçalho centralizado
  pdf.setFillColor(r, g, b);
  pdf.rect(0, 0, pageWidth, 35, 'F');
  
  // Nome
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(22);
  pdf.setFont('helvetica', 'bold');
  const fullName = cvData.personalData?.fullName || 'NOME COMPLETO';
  pdf.text(fullName.toUpperCase(), margin, 20);
  
  // Profissão
  if (cvData.personalData?.profession) {
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'normal');
    pdf.text(cvData.personalData.profession, margin, 28);
  }

  yPosition = 45;

  // Informações de contato
  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(10);
  const contactInfo = [];
  if (cvData.personalData?.email) contactInfo.push(`Email: ${cvData.personalData.email}`);
  if (cvData.personalData?.phone) contactInfo.push(`Telefone: ${cvData.personalData.phone}`);
  if (cvData.personalData?.address) contactInfo.push(`Endereço: ${cvData.personalData.address}`);
  
  if (contactInfo.length > 0) {
    const contactText = contactInfo.join(' | ');
    yPosition = addTextBlock(pdf, contactText, margin, yPosition, contentWidth, 10);
    yPosition += 8;
  }

  // Layout de duas colunas
  const leftColumnWidth = contentWidth * 0.3;
  const rightColumnWidth = contentWidth * 0.65;
  const columnGap = contentWidth * 0.05;

  // Coluna esquerda - Informações secundárias
  let leftY = yPosition;
  
  // Habilidades na coluna esquerda
  if (isSkillsObject(cvData.skills) && cvData.skills.technical?.length > 0) {
    pdf.setFillColor(245, 245, 245);
    pdf.rect(margin, leftY - 2, leftColumnWidth, 6, 'F');
    
    pdf.setTextColor(r, g, b);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text('HABILIDADES', margin + 2, leftY + 2);
    leftY += 8;
    
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(9);
    cvData.skills.technical.forEach((skill: string) => {
      pdf.text(`• ${skill}`, margin + 2, leftY);
      leftY += 4;
    });
    leftY += 5;
  }

  // Idiomas na coluna esquerda
  if (isSkillsObject(cvData.skills) && cvData.skills.languages?.length > 0) {
    pdf.setFillColor(245, 245, 245);
    pdf.rect(margin, leftY - 2, leftColumnWidth, 6, 'F');
    
    pdf.setTextColor(r, g, b);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text('IDIOMAS', margin + 2, leftY + 2);
    leftY += 8;
    
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(9);
    cvData.skills.languages.forEach((language: string) => {
      pdf.text(`• ${language}`, margin + 2, leftY);
      leftY += 4;
    });
  }

  // Coluna direita - Conteúdo principal
  const rightX = margin + leftColumnWidth + columnGap;
  let rightY = yPosition;

  // Perfil
  if (cvData.about) {
    pdf.setTextColor(r, g, b);
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('PERFIL PROFISSIONAL', rightX, rightY);
    rightY += 8;
    
    pdf.setTextColor(0, 0, 0);
    rightY = addTextBlock(pdf, cvData.about, rightX, rightY, rightColumnWidth, 10);
    rightY += 10;
  }

  // Experiência
  if (cvData.experience?.length > 0) {
    if (rightY > 240) {
      pdf.addPage();
      rightY = margin;
    }
    
    pdf.setTextColor(r, g, b);
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('EXPERIÊNCIA PROFISSIONAL', rightX, rightY);
    rightY += 8;
    
    cvData.experience.forEach((exp: any) => {
      if (rightY > 250) {
        pdf.addPage();
        rightY = margin;
      }
      
      pdf.setTextColor(r, g, b);
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      if (exp.position) {
        rightY = addTextBlock(pdf, exp.position, rightX, rightY, rightColumnWidth, 12, true);
        rightY += 2;
      }
      
      pdf.setTextColor(0, 0, 0);
      const companyInfo = [];
      if (exp.company) companyInfo.push(exp.company);
      if (exp.startDate) {
        const endDate = exp.current ? 'Presente' : exp.endDate;
        companyInfo.push(`${exp.startDate} - ${endDate}`);
      }
      
      if (companyInfo.length > 0) {
        rightY = addTextBlock(pdf, companyInfo.join(' | '), rightX, rightY, rightColumnWidth, 10);
        rightY += 2;
      }
      
      if (exp.description) {
        rightY = addTextBlock(pdf, exp.description, rightX, rightY, rightColumnWidth, 9);
      }
      
      rightY += 8;
    });
  }

  // Formação
  if (cvData.education?.length > 0) {
    if (rightY > 230) {
      pdf.addPage();
      rightY = margin;
    }
    
    pdf.setTextColor(r, g, b);
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('FORMAÇÃO ACADÉMICA', rightX, rightY);
    rightY += 8;
    
    cvData.education.forEach((edu: any) => {
      if (rightY > 250) {
        pdf.addPage();
        rightY = margin;
      }
      
      pdf.setTextColor(r, g, b);
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'bold');
      if (edu.degree) {
        rightY = addTextBlock(pdf, edu.degree, rightX, rightY, rightColumnWidth, 11, true);
        rightY += 2;
      }
      
      pdf.setTextColor(0, 0, 0);
      const eduInfo = [];
      if (edu.institution) eduInfo.push(edu.institution);
      if (edu.startYear && edu.endYear) {
        eduInfo.push(`${edu.startYear} - ${edu.endYear}`);
      }
      
      if (eduInfo.length > 0) {
        rightY = addTextBlock(pdf, eduInfo.join(' | '), rightX, rightY, rightColumnWidth, 9);
      }
      
      rightY += 6;
    });
  }

  return pdf;
};

// TEMPLATE 2: Barra Lateral Esquerda
export const generateBarraLateralEsquerda = (pdf: jsPDF, cvData: CVData, colors: TemplateColors) => {
  const pageWidth = 210;
  const pageHeight = 297;
  const sidebarWidth = 70;
  const mainContentX = sidebarWidth + 5;
  const mainContentWidth = pageWidth - mainContentX - 10;
  const [r, g, b] = hexToRgb(colors.primary);
  const [rSec, gSec, bSec] = hexToRgb(colors.secondary);

  // Sidebar colorida
  pdf.setFillColor(r, g, b);
  pdf.rect(0, 0, sidebarWidth, pageHeight, 'F');

  // Nome e profissão na sidebar
  let sidebarY = 20;
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  const fullName = cvData.personalData?.fullName || 'NOME';
  const nameLines = pdf.splitTextToSize(fullName.toUpperCase(), sidebarWidth - 10);
  pdf.text(nameLines, 5, sidebarY);
  sidebarY += nameLines.length * 6 + 5;
  
  if (cvData.personalData?.profession) {
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    const professionLines = pdf.splitTextToSize(cvData.personalData.profession, sidebarWidth - 10);
    pdf.text(professionLines, 5, sidebarY);
    sidebarY += professionLines.length * 5 + 10;
  }

  // Contacto na sidebar
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.text('CONTACTO', 5, sidebarY);
  sidebarY += 8;
  
  pdf.setFontSize(8);
  pdf.setFont('helvetica', 'normal');
  if (cvData.personalData?.phone) {
    pdf.text(cvData.personalData.phone, 5, sidebarY);
    sidebarY += 5;
  }
  if (cvData.personalData?.email) {
    const emailLines = pdf.splitTextToSize(cvData.personalData.email, sidebarWidth - 10);
    pdf.text(emailLines, 5, sidebarY);
    sidebarY += emailLines.length * 5;
  }
  if (cvData.personalData?.address) {
    const addressLines = pdf.splitTextToSize(cvData.personalData.address, sidebarWidth - 10);
    pdf.text(addressLines, 5, sidebarY);
    sidebarY += addressLines.length * 5 + 10;
  }

  // Habilidades na sidebar
  if (isSkillsObject(cvData.skills) && cvData.skills.technical?.length > 0) {
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text('HABILIDADES', 5, sidebarY);
    sidebarY += 8;
    
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'normal');
    cvData.skills.technical.forEach((skill: string) => {
      const skillLines = pdf.splitTextToSize(skill, sidebarWidth - 10);
      pdf.text(skillLines, 5, sidebarY);
      sidebarY += skillLines.length * 4 + 1;
    });
    sidebarY += 5;
  }

  // Idiomas na sidebar
  if (isSkillsObject(cvData.skills) && cvData.skills.languages?.length > 0) {
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text('IDIOMAS', 5, sidebarY);
    sidebarY += 8;
    
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'normal');
    cvData.skills.languages.forEach((language: string) => {
      pdf.text(language, 5, sidebarY);
      sidebarY += 4;
    });
  }

  // Conteúdo principal
  let mainY = 20;
  pdf.setTextColor(0, 0, 0);

  // Perfil
  if (cvData.about) {
    pdf.setTextColor(r, g, b);
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('PERFIL PROFISSIONAL', mainContentX, mainY);
    mainY += 10;
    
    pdf.setTextColor(0, 0, 0);
    mainY = addTextBlock(pdf, cvData.about, mainContentX, mainY, mainContentWidth, 11);
    mainY += 15;
  }

  // Experiência
  if (cvData.experience?.length > 0) {
    if (mainY > 240) {
      pdf.addPage();
      // Recriar sidebar na nova página
      pdf.setFillColor(r, g, b);
      pdf.rect(0, 0, sidebarWidth, pageHeight, 'F');
      mainY = 20;
    }
    
    pdf.setTextColor(r, g, b);
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('EXPERIÊNCIA PROFISSIONAL', mainContentX, mainY);
    mainY += 10;
    
    cvData.experience.forEach((exp: any) => {
      if (mainY > 250) {
        pdf.addPage();
        pdf.setFillColor(r, g, b);
        pdf.rect(0, 0, sidebarWidth, pageHeight, 'F');
        mainY = 20;
      }
      
      pdf.setTextColor(r, g, b);
      pdf.setFontSize(13);
      pdf.setFont('helvetica', 'bold');
      if (exp.position) {
        mainY = addTextBlock(pdf, exp.position, mainContentX, mainY, mainContentWidth, 13, true);
        mainY += 3;
      }
      
      pdf.setTextColor(rSec, gSec, bSec);
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'normal');
      if (exp.company) {
        mainY = addTextBlock(pdf, exp.company, mainContentX, mainY, mainContentWidth, 11);
        mainY += 2;
      }
      
      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(9);
      if (exp.startDate) {
        const endDate = exp.current ? 'Presente' : exp.endDate;
        mainY = addTextBlock(pdf, `${exp.startDate} - ${endDate}`, mainContentX, mainY, mainContentWidth, 9);
        mainY += 3;
      }
      
      if (exp.description) {
        mainY = addTextBlock(pdf, exp.description, mainContentX, mainY, mainContentWidth, 10);
      }
      
      mainY += 10;
    });
  }

  // Formação
  if (cvData.education?.length > 0) {
    if (mainY > 230) {
      pdf.addPage();
      pdf.setFillColor(r, g, b);
      pdf.rect(0, 0, sidebarWidth, pageHeight, 'F');
      mainY = 20;
    }
    
    pdf.setTextColor(r, g, b);
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('FORMAÇÃO ACADÉMICA', mainContentX, mainY);
    mainY += 10;
    
    cvData.education.forEach((edu: any) => {
      if (mainY > 250) {
        pdf.addPage();
        pdf.setFillColor(r, g, b);
        pdf.rect(0, 0, sidebarWidth, pageHeight, 'F');
        mainY = 20;
      }
      
      pdf.setTextColor(r, g, b);
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      if (edu.degree) {
        mainY = addTextBlock(pdf, edu.degree, mainContentX, mainY, mainContentWidth, 12, true);
        mainY += 3;
      }
      
      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(10);
      if (edu.institution) {
        mainY = addTextBlock(pdf, edu.institution, mainContentX, mainY, mainContentWidth, 10);
        mainY += 2;
      }
      
      if (edu.startYear && edu.endYear) {
        mainY = addTextBlock(pdf, `${edu.startYear} - ${edu.endYear}`, mainContentX, mainY, mainContentWidth, 9);
      }
      
      mainY += 8;
    });
  }

  return pdf;
};

// TEMPLATE 3: Layout Simples com Destaques
export const generateLayoutSimplesDestaques = (pdf: jsPDF, cvData: CVData, colors: TemplateColors) => {
  const pageWidth = 210;
  const margin = 15;
  const contentWidth = pageWidth - (margin * 2);
  const [r, g, b] = hexToRgb(colors.primary);
  let yPosition = margin;

  // Nome e título no topo
  pdf.setTextColor(r, g, b);
  pdf.setFontSize(24);
  pdf.setFont('helvetica', 'bold');
  const fullName = cvData.personalData?.fullName || 'SEU NOME';
  pdf.text(fullName.toUpperCase(), margin, yPosition + 10);
  yPosition += 15;
  
  if (cvData.personalData?.profession) {
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'normal');
    pdf.text(cvData.personalData.profession, margin, yPosition + 5);
    yPosition += 10;
  }

  // Linha separadora
  pdf.setLineWidth(1);
  pdf.setDrawColor(r, g, b);
  pdf.line(margin, yPosition + 3, pageWidth - margin, yPosition + 3);
  yPosition += 10;

  // Informações de contato
  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(10);
  const contactInfo = [];
  if (cvData.personalData?.email) contactInfo.push(cvData.personalData.email);
  if (cvData.personalData?.phone) contactInfo.push(cvData.personalData.phone);
  if (cvData.personalData?.address) contactInfo.push(cvData.personalData.address);
  
  if (contactInfo.length > 0) {
    const contactText = contactInfo.join(' | ');
    yPosition = addTextBlock(pdf, contactText, margin, yPosition, contentWidth, 10);
    yPosition += 15;
  }

  // Perfil em bloco destacado
  if (cvData.about) {
    // Fundo destacado
    pdf.setFillColor(248, 250, 252);
    pdf.rect(margin, yPosition - 5, contentWidth, 25, 'F');
    
    pdf.setTextColor(r, g, b);
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('PERFIL PROFISSIONAL', margin + 5, yPosition + 5);
    yPosition += 12;
    
    pdf.setTextColor(0, 0, 0);
    yPosition = addTextBlock(pdf, cvData.about, margin + 5, yPosition, contentWidth - 10, 11);
    yPosition += 15;
  }

  // Experiência em bloco com borda
  if (cvData.experience?.length > 0) {
    // Borda colorida
    pdf.setDrawColor(r, g, b);
    pdf.setLineWidth(2);
    pdf.rect(margin, yPosition - 5, contentWidth, 20, 'S');
    
    pdf.setTextColor(r, g, b);
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('EXPERIÊNCIA PROFISSIONAL', margin + 5, yPosition + 5);
    yPosition += 15;
    
    cvData.experience.forEach((exp: any, index: number) => {
      if (yPosition > 250) {
        pdf.addPage();
        yPosition = margin;
      }
      
      pdf.setTextColor(r, g, b);
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      if (exp.position) {
        yPosition = addTextBlock(pdf, exp.position, margin + 5, yPosition, contentWidth - 10, 12, true);
        yPosition += 3;
      }
      
      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'normal');
      if (exp.company) {
        yPosition = addTextBlock(pdf, exp.company, margin + 5, yPosition, contentWidth - 10, 11);
        yPosition += 2;
      }
      
      pdf.setFontSize(9);
      if (exp.startDate) {
        const endDate = exp.current ? 'Presente' : exp.endDate;
        yPosition = addTextBlock(pdf, `${exp.startDate} - ${endDate}`, margin + 5, yPosition, contentWidth - 10, 9);
        yPosition += 3;
      }
      
      if (exp.description) {
        yPosition = addTextBlock(pdf, exp.description, margin + 5, yPosition, contentWidth - 10, 10);
      }
      
      yPosition += 8;
      
      // Linha separadora entre experiências
      if (index < cvData.experience.length - 1) {
        pdf.setDrawColor(200, 200, 200);
        pdf.setLineWidth(0.5);
        pdf.line(margin + 5, yPosition - 2, pageWidth - margin - 5, yPosition - 2);
        yPosition += 2;
      }
    });
    yPosition += 10;
  }

  // Formação em bloco destacado
  if (cvData.education?.length > 0) {
    if (yPosition > 230) {
      pdf.addPage();
      yPosition = margin;
    }
    
    // Fundo destacado
    pdf.setFillColor(248, 250, 252);
    const eduHeight = cvData.education.length * 15 + 15;
    pdf.rect(margin, yPosition - 5, contentWidth, eduHeight, 'F');
    
    pdf.setTextColor(r, g, b);
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('FORMAÇÃO ACADÉMICA', margin + 5, yPosition + 5);
    yPosition += 12;
    
    cvData.education.forEach((edu: any) => {
      pdf.setTextColor(r, g, b);
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'bold');
      if (edu.degree) {
        yPosition = addTextBlock(pdf, edu.degree, margin + 5, yPosition, contentWidth - 10, 11, true);
        yPosition += 2;
      }
      
      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(10);
      if (edu.institution) {
        yPosition = addTextBlock(pdf, edu.institution, margin + 5, yPosition, contentWidth - 10, 10);
        yPosition += 2;
      }
      
      if (edu.startYear && edu.endYear) {
        yPosition = addTextBlock(pdf, `${edu.startYear} - ${edu.endYear}`, margin + 5, yPosition, contentWidth - 10, 9);
      }
      
      yPosition += 6;
    });
    yPosition += 10;
  }

  // Competências com tags
  if (isSkillsObject(cvData.skills) && (cvData.skills.technical?.length > 0 || cvData.skills.languages?.length > 0)) {
    if (yPosition > 240) {
      pdf.addPage();
      yPosition = margin;
    }
    
    // Borda colorida
    pdf.setDrawColor(r, g, b);
    pdf.setLineWidth(2);
    pdf.rect(margin, yPosition - 5, contentWidth, 30, 'S');
    
    pdf.setTextColor(r, g, b);
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('COMPETÊNCIAS', margin + 5, yPosition + 5);
    yPosition += 15;
    
    if (cvData.skills.technical?.length > 0) {
      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Habilidades Técnicas:', margin + 5, yPosition);
      yPosition += 6;
      
      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'normal');
      const skillsText = cvData.skills.technical.join(' • ');
      yPosition = addTextBlock(pdf, skillsText, margin + 5, yPosition, contentWidth - 10, 9);
      yPosition += 8;
    }
    
    if (cvData.skills.languages?.length > 0) {
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Idiomas:', margin + 5, yPosition);
      yPosition += 6;
      
      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'normal');
      const languagesText = cvData.skills.languages.join(' • ');
      yPosition = addTextBlock(pdf, languagesText, margin + 5, yPosition, contentWidth - 10, 9);
    }
  }

  return pdf;
};

// TEMPLATE 4: Criativo Profissional
export const generateCriativoProfissional = (pdf: jsPDF, cvData: CVData, colors: TemplateColors) => {
  const pageWidth = 210;
  const margin = 15;
  const contentWidth = pageWidth - (margin * 2);
  const [r, g, b] = hexToRgb(colors.primary);
  const [rSec, gSec, bSec] = hexToRgb(colors.secondary);
  const [rAcc, gAcc, bAcc] = hexToRgb(colors.accent);
  
  let yPosition = margin;

  // Header criativo com gradiente simulado
  pdf.setFillColor(r, g, b);
  pdf.rect(0, 0, pageWidth, 50, 'F');
  
  // Círculo decorativo
  pdf.setFillColor(rAcc, gAcc, bAcc);
  pdf.circle(pageWidth - 30, 25, 15, 'F');

  // Nome e profissão no header
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(26);
  pdf.setFont('helvetica', 'bold');
  const fullName = cvData.personalData?.fullName || 'SEU NOME';
  pdf.text(fullName.toUpperCase(), margin, 25);
  
  if (cvData.personalData?.profession) {
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'normal');
    pdf.text(cvData.personalData.profession, margin, 35);
  }

  // Informações de contato no header
  pdf.setFontSize(10);
  let contactY = 42;
  if (cvData.personalData?.email) {
    pdf.text(`✉ ${cvData.personalData.email}`, margin, contactY);
    contactY += 4;
  }
  if (cvData.personalData?.phone) {
    pdf.text(`📞 ${cvData.personalData.phone}`, margin + 60, 42);
  }
  if (cvData.personalData?.address) {
    pdf.text(`📍 ${cvData.personalData.address}`, margin + 120, 42);
  }

  yPosition = 60;

  // Seções com ícones grandes e divisores coloridos
  if (cvData.about) {
    // Círculo com ícone
    pdf.setFillColor(r, g, b);
    pdf.circle(margin + 6, yPosition + 6, 6, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(12);
    pdf.text('👤', margin + 3, yPosition + 9);
    
    // Título da seção
    pdf.setTextColor(r, g, b);
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Perfil Profissional', margin + 20, yPosition + 8);
    
    // Linha decorativa
    pdf.setFillColor(rAcc, gAcc, bAcc);
    pdf.rect(margin + 20, yPosition + 12, 20, 1, 'F');
    
    yPosition += 20;
    
    pdf.setTextColor(0, 0, 0);
    yPosition = addTextBlock(pdf, cvData.about, margin + 20, yPosition, contentWidth - 20, 12);
    yPosition += 15;
  }

  // Experiência com timeline
  if (cvData.experience?.length > 0) {
    if (yPosition > 240) {
      pdf.addPage();
      yPosition = margin;
    }
    
    // Círculo com ícone
    pdf.setFillColor(rSec, gSec, bSec);
    pdf.circle(margin + 6, yPosition + 6, 6, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(12);
    pdf.text('💼', margin + 3, yPosition + 9);
    
    // Título da seção
    pdf.setTextColor(r, g, b);
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Experiência', margin + 20, yPosition + 8);
    
    // Linha decorativa
    pdf.setFillColor(rAcc, gAcc, bAcc);
    pdf.rect(margin + 20, yPosition + 12, 20, 1, 'F');
    
    yPosition += 20;
    
    cvData.experience.forEach((exp: any) => {
      if (yPosition > 250) {
        pdf.addPage();
        yPosition = margin;
      }
      
      // Ponto da timeline
      pdf.setFillColor(rAcc, gAcc, bAcc);
      pdf.circle(margin + 6, yPosition + 2, 2, 'F');
      
      pdf.setTextColor(r, g, b);
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      if (exp.position) {
        yPosition = addTextBlock(pdf, exp.position, margin + 20, yPosition, contentWidth - 20, 14, true);
        yPosition += 3;
      }
      
      pdf.setTextColor(rSec, gSec, bSec);
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      if (exp.company) {
        yPosition = addTextBlock(pdf, exp.company, margin + 20, yPosition, contentWidth - 20, 12);
        yPosition += 2;
      }
      
      pdf.setTextColor(100, 100, 100);
      pdf.setFontSize(10);
      if (exp.startDate) {
        const endDate = exp.current ? 'Presente' : exp.endDate;
        yPosition = addTextBlock(pdf, `${exp.startDate} - ${endDate}`, margin + 20, yPosition, contentWidth - 20, 10);
        yPosition += 3;
      }
      
      pdf.setTextColor(0, 0, 0);
      if (exp.description) {
        yPosition = addTextBlock(pdf, exp.description, margin + 20, yPosition, contentWidth - 20, 11);
      }
      
      yPosition += 12;
    });
  }

  // Formação
  if (cvData.education?.length > 0) {
    if (yPosition > 230) {
      pdf.addPage();
      yPosition = margin;
    }
    
    // Círculo com ícone
    pdf.setFillColor(rAcc, gAcc, bAcc);
    pdf.circle(margin + 6, yPosition + 6, 6, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(12);
    pdf.text('🎓', margin + 3, yPosition + 9);
    
    // Título da seção
    pdf.setTextColor(r, g, b);
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Formação', margin + 20, yPosition + 8);
    
    // Linha decorativa
    pdf.setFillColor(rAcc, gAcc, bAcc);
    pdf.rect(margin + 20, yPosition + 12, 20, 1, 'F');
    
    yPosition += 20;
    
    cvData.education.forEach((edu: any) => {
      if (yPosition > 250) {
        pdf.addPage();
        yPosition = margin;
      }
      
      // Ponto da timeline
      pdf.setFillColor(rSec, gSec, bSec);
      pdf.circle(margin + 6, yPosition + 2, 2, 'F');
      
      pdf.setTextColor(r, g, b);
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      if (edu.degree) {
        yPosition = addTextBlock(pdf, edu.degree, margin + 20, yPosition, contentWidth - 20, 12, true);
        yPosition += 2;
      }
      
      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(10);
      if (edu.institution) {
        yPosition = addTextBlock(pdf, edu.institution, margin + 20, yPosition, contentWidth - 20, 10);
        yPosition += 2;
      }
      
      if (edu.startYear && edu.endYear) {
        yPosition = addTextBlock(pdf, `${edu.startYear} - ${edu.endYear}`, margin + 20, yPosition, contentWidth - 20, 9);
      }
      
      yPosition += 8;
    });
    yPosition += 10;
  }

  // Competências com design criativo
  if (isSkillsObject(cvData.skills) && (cvData.skills.technical?.length > 0 || cvData.skills.languages?.length > 0)) {
    if (yPosition > 240) {
      pdf.addPage();
      yPosition = margin;
    }
    
    // Círculo com ícone
    pdf.setFillColor(r, g, b);
    pdf.circle(margin + 6, yPosition + 6, 6, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(12);
    pdf.text('⭐', margin + 3, yPosition + 9);
    
    // Título da seção
    pdf.setTextColor(r, g, b);
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Competências', margin + 20, yPosition + 8);
    
    // Linha decorativa
    pdf.setFillColor(rAcc, gAcc, bAcc);
    pdf.rect(margin + 20, yPosition + 12, 20, 1, 'F');
    
    yPosition += 20;
    
    if (cvData.skills.technical?.length > 0) {
      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Habilidades Técnicas', margin + 20, yPosition);
      yPosition += 8;
      
      // Tags coloridas para habilidades
      let xPos = margin + 20;
      let lineHeight = 0;
      cvData.skills.technical.forEach((skill: string, index: number) => {
        pdf.setFontSize(9);
        const skillWidth = pdf.getTextWidth(skill) + 8;
        
        if (xPos + skillWidth > pageWidth - margin) {
          xPos = margin + 20;
          yPosition += 8;
          lineHeight = 0;
        }
        
        // Fundo da tag
        pdf.setFillColor(rSec, gSec, bSec);
        pdf.roundedRect(xPos, yPosition - 3, skillWidth, 6, 2, 2, 'F');
        
        // Texto da tag
        pdf.setTextColor(255, 255, 255);
        pdf.text(skill, xPos + 4, yPosition + 1);
        
        xPos += skillWidth + 5;
      });
      yPosition += 12;
    }
    
    if (cvData.skills.languages?.length > 0) {
      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Idiomas', margin + 20, yPosition);
      yPosition += 8;
      
      // Tags coloridas para idiomas
      let xPos = margin + 20;
      cvData.skills.languages.forEach((language: string) => {
        pdf.setFontSize(9);
        const langWidth = pdf.getTextWidth(language) + 8;
        
        if (xPos + langWidth > pageWidth - margin) {
          xPos = margin + 20;
          yPosition += 8;
        }
        
        // Fundo da tag
        pdf.setFillColor(rAcc, gAcc, bAcc);
        pdf.roundedRect(xPos, yPosition - 3, langWidth, 6, 2, 2, 'F');
        
        // Texto da tag
        pdf.setTextColor(255, 255, 255);
        pdf.text(language, xPos + 4, yPosition + 1);
        
        xPos += langWidth + 5;
      });
    }
  }

  return pdf;
};
