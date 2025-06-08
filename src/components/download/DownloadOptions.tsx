import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FileImage, FileText, X, Share2, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { generateProfessionalCV } from '@/services/cvGenerator';
import PDFPreviewModal from './PDFPreviewModal';
import AuthModal from '@/components/auth/AuthModal';

interface DownloadOptionsProps {
  isOpen: boolean;
  onClose: () => void;
  cvTitle?: string;
  cvData?: any;
}

const DownloadOptions = ({ isOpen, onClose, cvTitle = "Meu CV", cvData }: DownloadOptionsProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [showPreview, setShowPreview] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const requireAuth = (callback: () => void) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    callback();
  };

  const downloadAsPNG = () => {
    requireAuth(() => {
      const element = document.querySelector('.cv-content') as HTMLElement;
      if (!element) return;

      import('html2canvas').then((html2canvas) => {
        html2canvas.default(element, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff'
        }).then((canvas) => {
          const link = document.createElement('a');
          link.download = `${cvTitle}.png`;
          link.href = canvas.toDataURL('image/png');
          link.click();
          toast({
            title: "Download concluído!",
            description: "Seu CV foi baixado como PNG.",
          });
        });
      });
      onClose();
    });
  };

  const downloadAsJPG = () => {
    requireAuth(() => {
      const element = document.querySelector('.cv-content') as HTMLElement;
      if (!element) return;

      import('html2canvas').then((html2canvas) => {
        html2canvas.default(element, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff'
        }).then((canvas) => {
          const link = document.createElement('a');
          link.download = `${cvTitle}.jpg`;
          link.href = canvas.toDataURL('image/jpeg', 0.95);
          link.click();
          toast({
            title: "Download concluído!",
            description: "Seu CV foi baixado como JPG.",
          });
        });
      });
      onClose();
    });
  };

  const downloadProfessionalPDF = async () => {
    requireAuth(async () => {
      if (!cvData) {
        toast({
          title: "Erro",
          description: "Dados do CV não encontrados.",
          variant: "destructive"
        });
        return;
      }

      try {
        await generateProfessionalCV(cvData);
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
    });
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

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    toast({
      title: "Login realizado!",
      description: "Agora você pode baixar seu CV.",
    });
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
            {!user && (
              <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <p className="text-orange-800 text-sm text-center">
                  🔒 Faça login para baixar seus CVs
                </p>
              </div>
            )}

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

            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={downloadProfessionalPDF}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <FileText className="w-8 h-8 text-red-600" />
                  <div>
                    <h3 className="font-semibold">PDF Profissional</h3>
                    <p className="text-sm text-gray-500">Formato otimizado e limpo</p>
                  </div>
                  {!user && <span className="text-xs text-orange-600 ml-auto">🔒 Login necessário</span>}
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={downloadAsPNG}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <FileImage className="w-8 h-8 text-green-600" />
                  <div>
                    <h3 className="font-semibold">Baixar como PNG</h3>
                    <p className="text-sm text-gray-500">Imagem de alta qualidade</p>
                  </div>
                  {!user && <span className="text-xs text-orange-600 ml-auto">🔒 Login necessário</span>}
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={downloadAsJPG}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <FileImage className="w-8 h-8 text-orange-600" />
                  <div>
                    <h3 className="font-semibold">Baixar como JPG</h3>
                    <p className="text-sm text-gray-500">Imagem compactada</p>
                  </div>
                  {!user && <span className="text-xs text-orange-600 ml-auto">🔒 Login necessário</span>}
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
        </DialogContent>
      </Dialog>

      <PDFPreviewModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        cvData={cvData}
      />

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </>
  );
};

export default DownloadOptions;
