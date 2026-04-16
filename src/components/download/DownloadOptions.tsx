
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FileImage, FileText, X, Share2, Eye, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateProfessionalCV } from '@/services/cvGenerator';
import { captureDesktopCanvas } from '@/services/htmlToPdfConverter';
import PDFPreviewModal from './PDFPreviewModal';
import AdsterraMobileBanner from '@/components/ads/AdsterraMobileBanner';
import PaymentModal from '@/components/payment/PaymentModal';
import { useSubscription } from '@/hooks/useSubscription';
import { useAuth } from '@/hooks/useAuth';
import CVLayoutRenderer from '@/components/cv/CVLayoutRenderer';
import { SecureDbService } from '@/services/secureDbService';

interface DownloadOptionsProps {
  isOpen: boolean;
  onClose: () => void;
  cvTitle?: string;
  cvData?: any;
  selectedTemplate?: any;
  documentType?: 'cv' | 'letter';
  onCustomDownload?: () => Promise<void>;
  cvId?: string;
}

const DownloadOptions = ({ 
  isOpen, 
  onClose, 
  cvTitle = "Meu Documento", 
  cvData, 
  selectedTemplate,
  documentType = 'cv',
  onCustomDownload,
  cvId
}: DownloadOptionsProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showPreview, setShowPreview] = useState(false);
  const [isPreparing, setIsPreparing] = useState(false);

  const [countdown, setCountdown] = useState(5);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => Promise<void>) | null>(null);

  const [isVersionPaid, setIsVersionPaid] = useState<boolean>(false);
  const [paidPdfUrl, setPaidPdfUrl] = useState<string | null>(null);
  const [isCheckingPayment, setIsCheckingPayment] = useState(false);

  const { checkAndConsumeAccess, isPremiumActive, profile, checkCVPaid, refreshSubscription } = useSubscription();
  const { user } = useAuth();

  React.useEffect(() => {
    if (isOpen && cvId) {
      setIsCheckingPayment(true);
      checkCVPaid(cvId).then(res => {
        setIsVersionPaid(res.paid);
        setPaidPdfUrl(res.pdfUrl || null);
        setIsCheckingPayment(false);
      });
    } else {
      setIsVersionPaid(false);
      setPaidPdfUrl(null);
      setIsCheckingPayment(false);
    }
  }, [isOpen, cvId]);

  const startDownloadWithGate = async (downloadFn: () => Promise<void>) => {
    // O PORTÃO DE FERRO 🛡️
    // Verifica acesso e CONSOME crédito se necessário num único passo seguro
    const hasAccess = await checkAndConsumeAccess(cvId);

    if (!hasAccess) {
      setPendingAction(() => downloadFn);
      setShowPaymentModal(true);
      return;
    }

    // Skip countdown and ads for Premium users (Monthly/Annual), specifically paid versions, or Admins
    if (profile?.is_admin || isPremiumActive || isVersionPaid) {
      downloadFn();
      return;
    }

    // Single plan or Free users with credits still see the preparation screen
    setIsPreparing(true);
    setCountdown(5);

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Trigger download after 5 seconds
    setTimeout(async () => {
      await downloadFn();
      setIsPreparing(false);
    }, 5500);
  };

  const handlePaymentSuccess = () => {
    if (pendingAction) {
      startDownloadWithGate(pendingAction);
    }
  };

  const downloadAsPNG = async () => {
    const canvas = await captureDesktopCanvas();
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `${cvTitle}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    toast({
      title: "Download concluído!",
      description: "Seu documento foi baixado como PNG.",
    });
    onClose();
  };

  const downloadAsJPG = async () => {
    const canvas = await captureDesktopCanvas();
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `${cvTitle}.jpg`;
    link.href = canvas.toDataURL('image/jpeg', 0.95);
    link.click();
    toast({
      title: "Download concluído!",
      description: "Seu documento foi baixado como JPG.",
    });
    onClose();
  };

  const downloadProfessionalPDF = async () => {
    if (documentType === 'letter' && onCustomDownload) {
        await onCustomDownload();
        onClose();
        return;
    }

    if (!cvData) {
      toast({
        title: "Erro",
        description: "Dados do documento não encontrados.",
        variant: "destructive"
      });
      return;
    }

    // Fast Download Logic: If a stored PDF exists for this paid version, use it!
    if (paidPdfUrl) {
      window.open(paidPdfUrl, '_blank');
      onClose();
      return;
    }

    // Navigate to the dedicated print page for pixel-perfect PDF generation
    onClose();
    navigate('/imprimir', {
      state: {
        cvData,
        selectedTemplate,
        cvId 
      }
    });
  };

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: cvTitle,
        text: 'Confira meu documento profissional criado no MozVita',
        url: url
      }).then(() => {
        toast({
          title: "Compartilhado!",
          description: "Link compartilhado com sucesso.",
        });
      }).catch(() => {
        navigator.clipboard.writeText(url);
        toast({
          title: "Link copiado!",
          description: "Link copiado para a área de transferência.",
        });
      });
    } else {
      navigator.clipboard.writeText(url);
      toast({
        title: "Link copiado!",
        description: "Link copiado para a área de transferência.",
      });
    }
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[420px] p-0 overflow-hidden border-0 shadow-2xl rounded-2xl">
          <div className="px-6 pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                  <Download className="w-5 h-5 transition-transform group-hover:scale-110" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 leading-tight">Descarregar CV</h3>
                  <p className="text-xs text-slate-500">Escolha o seu formato ideal</p>
                  {isOpen && !isCheckingPayment && cvId && (
                    <div className="mt-2">
                       {profile?.is_admin || isPremiumActive || isVersionPaid ? (
                        <span className="inline-block bg-emerald-100/80 text-emerald-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
                          ✓ Acesso Gratuito Integrado
                        </span>
                      ) : (
                        <span className="inline-block bg-amber-100/80 text-amber-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-amber-200">
                          ⚠️ Edição Recente (Requer Crédito)
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full h-8 w-8 hover:bg-slate-100">
                <X className="w-4 h-4 text-slate-400" />
              </Button>
            </div>
          </div>

          <div className="px-6 pb-6 space-y-3">
            <div 
              className="group cursor-pointer bg-slate-50 hover:bg-white p-3.5 rounded-2xl border border-slate-100 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300"
              onClick={() => startDownloadWithGate(downloadProfessionalPDF)}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-slate-100 shadow-sm group-hover:shadow-md transition-all">
                  <FileText className="w-6 h-6 text-red-500" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900 text-sm">PDF Profissional</h4>
                  <p className="text-[11px] text-slate-500">Formato original recomendado</p>
                </div>
              </div>
            </div>

            {documentType === 'cv' && (
              <div className="grid grid-cols-2 gap-3">
                <div 
                  className="group cursor-pointer bg-slate-50 hover:bg-white p-3 rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300"
                  onClick={() => startDownloadWithGate(downloadAsPNG)}
                >
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-slate-100 shadow-sm group-hover:shadow-md transition-all">
                      <FileImage className="w-5 h-5 text-blue-500" />
                    </div>
                    <h4 className="font-bold text-slate-900 text-[11px]">Imagem PNG</h4>
                  </div>
                </div>

                <div 
                  className="group cursor-pointer bg-slate-50 hover:bg-white p-3 rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-300"
                  onClick={() => startDownloadWithGate(downloadAsJPG)}
                >
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-slate-100 shadow-sm group-hover:shadow-md transition-all">
                      <FileImage className="w-5 h-5 text-orange-500" />
                    </div>
                    <h4 className="font-bold text-slate-900 text-[11px]">Imagem JPG</h4>
                  </div>
                </div>
              </div>
            )}

            <div 
              className="group cursor-pointer bg-white p-3 rounded-2xl border border-dashed border-slate-200 hover:border-purple-300 hover:bg-purple-50 transition-all text-center"
              onClick={handleShare}
            >
              <div className="flex items-center justify-center gap-2">
                <Share2 className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-semibold text-purple-700">Partilhar Link</span>
              </div>
            </div>
          </div>

          {/* Interstitial Gate Overlay */}
          {isPreparing && (
            <div className="absolute inset-0 z-50 bg-white flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-300">
              <div className="mb-6">
                <div className="relative w-20 h-20 mb-4 mx-auto">
                  <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
                  <div
                    className="absolute inset-0 border-4 border-google-blue rounded-full border-t-transparent animate-spin"
                    style={{ animationDuration: '2s' }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-google-blue">
                    {countdown}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Preparando seu documento...</h3>
                <p className="text-slate-600 text-sm">
                  O download começará automaticamente em alguns segundos.
                </p>
              </div>

              {!isPremiumActive && (
                <div className="w-full mt-4">
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-2">Anúncio</p>
                  <div className="min-h-[50px] flex justify-center items-center bg-slate-50 rounded-lg overflow-hidden border border-slate-100 italic text-slate-400 text-xs">
                    <AdsterraMobileBanner />
                  </div>
                </div>
              )}

              <Button
                variant="ghost"
                size="sm"
                className="mt-8 text-slate-400 hover:text-slate-600"
                onClick={() => setIsPreparing(false)}
              >
                Cancelar
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {documentType === 'cv' && (
        <PDFPreviewModal
            isOpen={showPreview}
            onClose={() => setShowPreview(false)}
            cvData={cvData}
            selectedTemplate={selectedTemplate}
        />
      )}

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onSuccess={handlePaymentSuccess}
        cvId={cvId}
      />

      {/* Invisible Renderer for background PDF capture (Fixes Download Mismatch on Profile Page) */}
      {isOpen && cvData && (
        <div 
          className="fixed pointer-events-none opacity-0" 
          style={{ left: '-5000px', top: '0', width: '210mm' }}
          aria-hidden="true"
        >
          <CVLayoutRenderer 
            data={cvData} 
            template={selectedTemplate} 
            className="cv-content" // This is searched by htmlToPdfConverter
          />
        </div>
      )}
    </>
  );
};

export default DownloadOptions;
