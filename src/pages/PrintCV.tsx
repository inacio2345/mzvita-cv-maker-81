
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CVLayoutRenderer from '@/components/cv/CVLayoutRenderer';
import { useSubscription } from '@/hooks/useSubscription';
import { cvTemplates, getTemplateById } from '@/data/cvTemplates';

const PrintCV = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { canDownload, profile } = useSubscription();
  const [ready, setReady] = useState(false);

  const cvData = location.state?.cvData;
  const selectedTemplate = location.state?.selectedTemplate;

  // Resolve the full template object from the ID
  const resolvedTemplate = (() => {
    if (selectedTemplate?.colorPalette) return selectedTemplate; // Already full object
    const id = selectedTemplate?.id || 'cv-classico-elegante';
    return getTemplateById(id) || cvTemplates[0];
  })();

  // Security: Block access without valid data or permission
  useEffect(() => {
    if (!cvData) {
      navigate('/precos', { replace: true });
      return;
    }

    // Admin always allowed
    if (profile?.is_admin) {
      setReady(true);
      return;
    }

    if (!canDownload) {
      navigate('/precos', { replace: true });
      return;
    }

    setReady(true);
  }, [cvData, canDownload, profile, navigate]);

  // Auto-trigger print once the CV is rendered
  useEffect(() => {
    if (!ready) return;

    // Give the browser time to fully render the CV (fonts, images, layout)
    const timer = setTimeout(() => {
      window.print();
    }, 1200);

    return () => clearTimeout(timer);
  }, [ready]);

  if (!ready || !cvData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">A preparar o seu documento...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Print-specific styles */}
      <style>{`
        /* Hide everything except the CV when printing */
        @media print {
          /* Hide all app chrome */
          header, footer, nav, aside, 
          .sidebar, .mobile-nav, .no-print,
          [data-radix-popper-content-wrapper] {
            display: none !important;
          }
          
          /* Reset page margins - the CV handles its own padding */
          @page {
            size: A4 portrait;
            margin: 0;
          }
          
          body {
            margin: 0 !important;
            padding: 0 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          
          /* Make the print container fill the page */
          .print-cv-container {
            width: 210mm !important;
            min-height: 297mm !important;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            border: none !important;
          }
          
          /* Force background colors to print */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }

        /* Screen preview styles */
        @media screen {
          body {
            background: #e2e8f0 !important;
          }
          .print-cv-container {
            width: 210mm;
            min-height: 297mm;
            margin: 20px auto;
            background: white;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
          }
          .print-back-btn {
            position: fixed;
            top: 20px;
            left: 20px;
            z-index: 1000;
            background: #3b82f6;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
            font-size: 14px;
          }
          .print-back-btn:hover {
            background: #2563eb;
          }
          .print-download-btn {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
            background: #10b981;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
            font-size: 14px;
          }
          .print-download-btn:hover {
            background: #059669;
          }
        }
      `}</style>

      {/* Screen-only navigation buttons */}
      <button 
        className="print-back-btn no-print" 
        onClick={() => navigate(-1)}
      >
        ← Voltar
      </button>
      <button 
        className="print-download-btn no-print" 
        onClick={() => window.print()}
      >
        📄 Salvar como PDF
      </button>

      {/* The CV itself — this is what gets printed */}
      <div className="print-cv-container">
        <CVLayoutRenderer
          data={cvData}
          template={resolvedTemplate}
          className="cv-content"
          isAdvancedMode={false}
        />
      </div>
    </>
  );
};

export default PrintCV;
