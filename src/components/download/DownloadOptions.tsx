
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FileImage, FileText, X, Share2, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateProfessionalCV } from '@/services/cvGenerator';
import { captureDesktopCanvas } from '@/services/htmlToPdfConverter';
import PDFPreviewModal from './PDFPreviewModal';
import AdsterraMobileBanner from '@/components/ads/AdsterraMobileBanner';

interface DownloadOptionsProps {
  isOpen: boolean;
  onClose: () => void;
  cvTitle?: string;
  cvData?: any;
  selectedTemplate?: any;
}

const DownloadOptions = ({ isOpen, onClose, cvTitle = "Meu CV", cvData, selectedTemplate }: DownloadOptionsProps) => {
  const { toast } = useToast();
  const [showPreview, setShowPreview] = useState(false);
  const [isPreparing, setIsPreparing] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [pendingDownload, setPendingDownload] = useState<(() => Promise<void>) | null>(null);

  const startDownloadWithGate = (downloadFn: () => Promise<void>) => {
    setPendingDownload(() => downloadFn);
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
      setPendingDownload(null);
    }, 5500);
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
      description: "Seu CV foi baixado como PNG.",
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
      description: "Seu CV foi baixado como JPG.",
    });
    onClose();
  };

  const downloadProfessionalPDF = async () => {
    if (!cvData) {
      toast({
        title: "Erro",
        description: "Dados do CV não encontrados.",
        variant: "destructive"
      });
      return;
    }

    try {
      // Baixando PDF com template: selectedTemplate
      await generateProfessionalCV(cvData, selectedTemplate);
      toast({
        title: "Download concluído!",
        description: "Seu CV profissional foi baixado como PDF.",
      });
      onClose();
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      toast({
        title: "Erro",
        description: "Não foi possível gerar o PDF.",
        variant: "destructive"
      });
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: cvTitle,
        text: 'Confira meu CV profissional',
        url: window.location.href
      }).then(() => {
        toast({
          title: "Compartilhado!",
          description: "Link do CV compartilhado com sucesso.",
        });
      }).catch(() => {
        navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link copiado!",
          description: "Link do CV copiado para a área de transferência.",
        });
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copiado!",
        description: "Link do CV copiado para a área de transferência.",
      });
    }
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Opções de Download</span>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setShowPreview(true)}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Eye className="w-8 h-8 text-blue-600" />
                  <div>
                    <h3 className="font-semibold">Visualizar CV</h3>
                    <p className="text-sm text-gray-500">Ver como ficará o PDF final</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => startDownloadWithGate(downloadProfessionalPDF)}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <FileText className="w-8 h-8 text-red-600" />
                  <div>
                    <h3 className="font-semibold">PDF Profissional</h3>
                    <p className="text-sm text-gray-500">Formato otimizado e limpo</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => startDownloadWithGate(downloadAsPNG)}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <FileImage className="w-8 h-8 text-green-600" />
                  <div>
                    <h3 className="font-semibold">Baixar como PNG</h3>
                    <p className="text-sm text-gray-500">Imagem de alta qualidade</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => startDownloadWithGate(downloadAsJPG)}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <FileImage className="w-8 h-8 text-orange-600" />
                  <div>
                    <h3 className="font-semibold">Baixar como JPG</h3>
                    <p className="text-sm text-gray-500">Imagem compactada</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={handleShare}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Share2 className="w-8 h-8 text-purple-600" />
                  <div>
                    <h3 className="font-semibold">Compartilhar</h3>
                    <p className="text-sm text-gray-500">Enviar link do CV</p>
                  </div>
                </div>
              </CardContent>
            </Card>
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
                <h3 className="text-xl font-bold text-slate-900 mb-2">Preparando seu CV...</h3>
                <p className="text-slate-600 text-sm">
                  O download começará automaticamente em alguns segundos.
                </p>
              </div>

              <div className="w-full mt-4">
                <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-2">Anúncio</p>
                <div className="min-h-[50px] flex justify-center items-center bg-slate-50 rounded-lg overflow-hidden border border-slate-100 italic text-slate-400 text-xs">
                  <AdsterraMobileBanner />
                </div>
              </div>

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

      <PDFPreviewModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        cvData={cvData}
        selectedTemplate={selectedTemplate}
      />
    </>
  );
};

export default DownloadOptions;
