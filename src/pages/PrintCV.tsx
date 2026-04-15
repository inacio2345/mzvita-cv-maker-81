
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CVLayoutRenderer from '@/components/cv/CVLayoutRenderer';
import { useSubscription } from '@/hooks/useSubscription';
import { useUserProfile } from '@/hooks/useUserProfile';
import { cvTemplates, getTemplateById } from '@/data/cvTemplates';
import PaymentModal from '@/components/payment/PaymentModal';

const PrintCV = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { canDownload, profile } = useSubscription();
  const { loading: profileLoading } = useUserProfile();
  const [ready, setReady] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const cvData = location.state?.cvData;
  const selectedTemplate = location.state?.selectedTemplate;

  // Resolve the full template object from the ID
  const resolvedTemplate = (() => {
    if (selectedTemplate?.colorPalette) return selectedTemplate;
    const id = selectedTemplate?.id || 'cv-classico-elegante';
    return getTemplateById(id) || cvTemplates[0];
  })();

  // Security: Wait for profile to load, then check permissions
  useEffect(() => {
    const checkAccess = async () => {
      if (!cvData) {
        navigate(-1);
        return;
      }

      // Still loading profile → wait
      if (profileLoading) return;

      // Admin always allowed
      if (profile?.is_admin) {
        setReady(true);
        return;
      }

      const cvId = location.state?.cvId;
      const hasAccess = await canDownload(cvId);

      // Has credits or premium or specifically paid for this CV → allowed
      if (hasAccess) {
        setReady(true);
        return;
      }

      // No permission → show payment popup
      setShowPayment(true);
    };

    checkAccess();
  }, [cvData, canDownload, profile, profileLoading, navigate, location.state?.cvId]);

  // Auto-trigger print once the CV is rendered
  useEffect(() => {
    if (!ready) return;

    const timer = setTimeout(() => {
      window.print();
    }, 1500);

    return () => clearTimeout(timer);
  }, [ready]);

  const handlePaymentSuccess = () => {
    setShowPayment(false);
    setReady(true);
  };

  // Handle responsive scaling for the preview
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const handleResize = () => {
      const containerWidth = window.innerWidth - 32; // padding
      if (containerWidth < 794) {
        setScale(containerWidth / 794);
      } else {
        setScale(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Loading state
  if (!ready && !showPayment) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium text-sm sm:text-base">A preparar o seu documento...</p>
        </div>
      </div>
    );
  }

  // Payment required state
  if (showPayment && !ready) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 sm:p-6">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-sm w-full no-print">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl" role="img" aria-label="lock">🔒</span>
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">Download Bloqueado</h2>
          <p className="text-slate-500 mb-6 text-sm">Este modelo requer um plano ativo ou crédito de download para ser descarregado.</p>
          <button 
            onClick={() => navigate('/precos')}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-colors mb-4"
          >
            Ver Planos & Créditos
          </button>
          <button 
            onClick={() => navigate(-1)}
            className="w-full py-2 text-slate-400 text-xs hover:text-slate-600 font-medium"
          >
            Voltar ao Editor
          </button>
        </div>
        <PaymentModal
          isOpen={true}
          onClose={() => navigate(-1)}
          onSuccess={handlePaymentSuccess}
        />
      </div>
    );
  }

  return (
    <>
      <style>{`
        @media print {
          header, footer, nav, aside, 
          .sidebar, .mobile-nav, .no-print,
          [data-radix-popper-content-wrapper],
          .print-toolbar {
            display: none !important;
          }
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
            background: white !important;
            height: auto !important;
            min-height: 0 !important;
          }
          .print-cv-wrapper {
            padding: 0 !important;
            background: white !important;
            display: block !important;
            overflow: visible !important;
            height: auto !important;
            min-height: 0 !important;
          }
          .print-cv-container {
            width: 210mm !important;
            height: auto !important;
            min-height: 297mm !important; /* Keep 1 page minimum for aesthetics, but allowed to grow */
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            border: none !important;
            transform: none !important;
            background: white !important;
            display: block !important;
            overflow: visible !important;
          }
          /* Prevent extra blank page at the end */
          html, body {
            overflow: visible !important;
            height: auto !important;
          }
          /* Ensure sections don't break in ugly ways if possible */
          .cv-section-item {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
        @media screen {
          .print-cv-container {
            box-shadow: 0 10px 40px rgba(0,0,0,0.12);
          }
        }
      `}</style>

      {/* Floating toolbar - responsive and hidden when printing */}
      <div className="print-toolbar no-print fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b shadow-sm">
        <div className="max-w-[800px] mx-auto flex items-center justify-between px-4 py-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 font-medium text-xs sm:text-sm transition-colors"
          >
            ← Voltar
          </button>
          
          <h1 className="text-sm font-bold text-slate-800 hidden xs:block">Baixar Documento</h1>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-bold text-xs sm:text-sm transition-colors shadow-md shadow-emerald-500/10"
          >
            📄 Guardar PDF
          </button>
        </div>
      </div>

      {/* CV container - responsive scaling for mobile */}
      <div className="print-cv-wrapper pt-20 pb-12 px-4 bg-slate-50 min-h-screen flex justify-center items-start overflow-x-hidden">
        <div
          className="print-cv-container bg-white origin-top transition-transform duration-200"
          style={{
            width: '794px',
            minHeight: '297mm',
            transform: `scale(${scale})`,
          }}
        >
          <CVLayoutRenderer
            data={cvData}
            template={resolvedTemplate}
            className="cv-content"
            isAdvancedMode={false}
          />
        </div>
      </div>
    </>
  );
};

export default PrintCV;
