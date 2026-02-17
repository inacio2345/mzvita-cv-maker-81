import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { CVData } from '@/services/cvService';

// CSS overrides to force desktop layout in cloned elements
const DESKTOP_OVERRIDES_CSS = `
  /* Force all block (mobile) layouts back to flex (desktop) */
  .cv-pdf-clone .block { display: flex !important; }
  .cv-pdf-clone [class*="w-full mb-6"] { width: 33.333% !important; margin-bottom: 0 !important; }
  .cv-pdf-clone [class*="w-full mb-"] { width: 33.333% !important; }
  
  /* Force desktop font sizes */
  .cv-pdf-clone .text-2xl { font-size: 1.5rem !important; }
  .cv-pdf-clone .text-xl { font-size: 1.25rem !important; }
  .cv-pdf-clone .text-lg { font-size: 1.125rem !important; }
  .cv-pdf-clone .text-base { font-size: 1rem !important; }
  
  /* Force desktop heading sizes */
  h1.text-2xl, .cv-pdf-clone h1 { font-size: 2.25rem !important; }
  
  /* Force sidebar layouts to flex (not stacked) */
  .cv-pdf-clone > div > div:first-child { display: flex !important; }
  
  /* Ensure images render at desktop size */
  .cv-pdf-clone .w-24.h-24 { width: 8rem !important; height: 8rem !important; }
  .cv-pdf-clone .w-12.h-12 { width: 4rem !important; height: 4rem !important; }

  /* Force sidebar width for sidebar templates */
  .cv-pdf-clone [class*="w-full py-6 px-4"] { 
    width: 33.333% !important; 
    padding: 1.5rem !important; 
  }
  
  /* Force main content width */
  .cv-pdf-clone .flex-1 { flex: 1 !important; }
`;

/**
 * Clone the CV element and force desktop A4 layout for capture
 */
const createDesktopClone = (previewElement: Element): { container: HTMLDivElement; cleanup: () => void } => {
  const tempContainer = document.createElement('div');
  tempContainer.style.position = 'absolute';
  tempContainer.style.left = '-9999px';
  tempContainer.style.top = '0';
  tempContainer.style.width = '210mm';
  tempContainer.style.minHeight = '297mm';
  tempContainer.style.backgroundColor = 'white';
  tempContainer.style.fontFamily = 'Inter, Arial, sans-serif';
  tempContainer.style.zoom = '1';

  // Inject desktop CSS overrides
  const styleEl = document.createElement('style');
  styleEl.textContent = DESKTOP_OVERRIDES_CSS;
  tempContainer.appendChild(styleEl);

  // Clone and force A4 desktop dimensions
  const clonedElement = previewElement.cloneNode(true) as HTMLElement;
  clonedElement.classList.add('cv-pdf-clone');
  clonedElement.style.width = '210mm';
  clonedElement.style.minHeight = '297mm';
  clonedElement.style.maxWidth = 'none';
  clonedElement.style.margin = '0';
  clonedElement.style.padding = '15mm';
  clonedElement.style.boxShadow = 'none';
  clonedElement.style.border = 'none';

  // Force all direct children with "block" display to "flex" (undo mobile stacking)
  const allChildren = clonedElement.querySelectorAll('*');
  allChildren.forEach((child: Element) => {
    const el = child as HTMLElement;
    const classes = el.className;
    if (typeof classes === 'string') {
      // Fix mobile-specific width classes
      if (classes.includes('w-full') && (classes.includes('mb-6') || classes.includes('py-6'))) {
        el.style.width = '33.333%';
        el.style.marginBottom = '0';
      }
      // Force mobile "block" containers back to "flex"
      if (classes.includes('block') && !classes.includes('inline-block')) {
        el.style.display = 'flex';
      }
      // Fix text sizes from mobile to desktop
      if (classes.includes('text-2xl') && !classes.includes('sm:text-4xl')) {
        el.style.fontSize = '2.25rem';
      }
      if (classes.includes('text-lg') && (classes.includes('sm:text-xl') || classes.includes('font-bold'))) {
        el.style.fontSize = '1.25rem';
      }
      if (classes.includes('text-xl') && classes.includes('sm:text-2xl')) {
        el.style.fontSize = '1.5rem';
      }
      if (classes.includes('text-base') && classes.includes('sm:text-lg')) {
        el.style.fontSize = '1.125rem';
      }
      // Fix photo sizes
      if (classes.includes('w-24') && classes.includes('h-24')) {
        el.style.width = '8rem';
        el.style.height = '8rem';
      }
    }
  });

  tempContainer.appendChild(clonedElement);
  document.body.appendChild(tempContainer);

  return {
    container: tempContainer,
    cleanup: () => document.body.removeChild(tempContainer)
  };
};

/**
 * Capture a desktop-rendered clone as a canvas
 */
const captureAsCanvas = async (container: HTMLDivElement): Promise<HTMLCanvasElement> => {
  await new Promise(resolve => setTimeout(resolve, 150));

  return html2canvas(container, {
    scale: 2,
    useCORS: true,
    allowTaint: true,
    backgroundColor: '#ffffff',
    width: 794,   // 210mm in px
    height: 1123, // 297mm in px
    scrollX: 0,
    scrollY: 0,
    windowWidth: 1200,  // Force desktop viewport
    windowHeight: 1123
  });
};

/**
 * Create a PDF from a canvas and return the jsPDF instance
 */
const canvasToPdf = (canvas: HTMLCanvasElement): jsPDF => {
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  const pdfWidth = 210;
  const pdfHeight = 297;
  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;

  const scale = Math.min(
    pdfWidth / (canvasWidth * 0.264583),
    pdfHeight / (canvasHeight * 0.264583)
  );

  const scaledWidth = canvasWidth * 0.264583 * scale;
  const scaledHeight = canvasHeight * 0.264583 * scale;
  const x = (pdfWidth - scaledWidth) / 2;
  const y = (pdfHeight - scaledHeight) / 2;

  const imgData = canvas.toDataURL('image/png', 1.0);
  pdf.addImage(imgData, 'PNG', x, y, scaledWidth, scaledHeight, '', 'FAST');

  return pdf;
};

export const generatePDFFromHTML = async (cvData: CVData, selectedTemplate?: any): Promise<void> => {
  try {
    const previewElement = document.querySelector('.cv-content');
    if (!previewElement) throw new Error('Elemento de preview não encontrado');

    const { container, cleanup } = createDesktopClone(previewElement);
    const canvas = await captureAsCanvas(container);
    cleanup();

    const pdf = canvasToPdf(canvas);
    const fileName = `CV_${cvData.personalData?.fullName?.replace(/\s+/g, '_') || 'Curriculum'}.pdf`;
    pdf.save(fileName);
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    throw error;
  }
};

export const generatePDFPreviewFromHTML = async (cvData: CVData, selectedTemplate?: any): Promise<string> => {
  try {
    const previewElement = document.querySelector('.cv-content');
    if (!previewElement) throw new Error('Elemento de preview não encontrado');

    const { container, cleanup } = createDesktopClone(previewElement);
    const canvas = await captureAsCanvas(container);
    cleanup();

    const pdf = canvasToPdf(canvas);
    return pdf.output('datauristring');
  } catch (error) {
    console.error('Erro ao gerar preview PDF:', error);
    throw error;
  }
};

/**
 * Capture the CV as a desktop-rendered canvas for PNG/JPG downloads. 
 * Exported for use in DownloadOptions.
 */
export const captureDesktopCanvas = async (): Promise<HTMLCanvasElement | null> => {
  const previewElement = document.querySelector('.cv-content');
  if (!previewElement) return null;

  const { container, cleanup } = createDesktopClone(previewElement);
  const canvas = await captureAsCanvas(container);
  cleanup();
  return canvas;
};