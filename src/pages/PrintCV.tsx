
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
    // No CV data at all → go back
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

    // Has credits or premium → allowed
    if (canDownload) {
      setReady(true);
      return;
    }

    // No permission → show payment popup
    setShowPayment(true);
  }, [cvData, canDownload, profile, profileLoading, navigate]);

  // Auto-trigger print once the CV is rendered
  useEffect(() => {
    if (!ready) return;

    const timer = setTimeout(() => {
      window.print();
    }, 1200);

    return () => clearTimeout(timer);
  }, [ready]);

  const handlePaymentSuccess = () => {
    setShowPayment(false);
    setReady(true);
  };

  // Loading state (waiting for profile)
  if (!ready && !showPayment) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">A preparar o seu documento...</p>
        </div>
      </div>
    );
  }

  // Payment required state → show popup over a blurred preview
  if (showPayment && !ready) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="text-center p-8">
          <h2 className="text-xl font-bold text-slate-800 mb-2">Pagamento Necessário</h2>
          <p className="text-slate-600 mb-4">Efetue o pagamento para descarregar o seu CV.</p>
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
          [data-radix-popper-content-wrapper] {
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
          }
          .print-cv-container {
            width: 210mm !important;
            min-height: 297mm !important;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            border: none !important;
          }
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
        @media screen {
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
