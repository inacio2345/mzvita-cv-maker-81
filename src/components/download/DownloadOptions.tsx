
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FileImage, FileText, Printer, X, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DownloadOptionsProps {
  isOpen: boolean;
  onClose: () => void;
  cvTitle?: string;
}

const DownloadOptions = ({ isOpen, onClose, cvTitle = "Meu CV" }: DownloadOptionsProps) => {
  const { toast } = useToast();

  const downloadAsPNG = () => {
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
  };

  const downloadAsJPG = () => {
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
  };

  const downloadAsPDF = () => {
    const element = document.querySelector('.cv-content') as HTMLElement;
    if (!element) return;

    import('html2canvas').then((html2canvas) => {
      html2canvas.default(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        
        import('jspdf').then((jsPDF) => {
          const pdf = new jsPDF.jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
          });

          const imgWidth = 210;
          const pageHeight = 297;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          let heightLeft = imgHeight;
          let position = 0;

          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;

          while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
          }

          pdf.save(`${cvTitle}.pdf`);
          
          toast({
            title: "Download concluído!",
            description: "Seu CV foi baixado como PDF.",
          });
        });
      });
    });
    onClose();
  };

  const downloadForPrint = () => {
    const element = document.querySelector('.cv-content') as HTMLElement;
    if (!element) return;

    import('html2canvas').then((html2canvas) => {
      html2canvas.default(element, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        
        import('jspdf').then((jsPDF) => {
          const pdf = new jsPDF.jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
          });

          const imgWidth = 210;
          const pageHeight = 297;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          let heightLeft = imgHeight;
          let position = 0;

          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;

          while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
          }

          pdf.save(`${cvTitle}_para_impressao.pdf`);
          
          toast({
            title: "Download concluído!",
            description: "PDF otimizado para impressão foi baixado.",
          });
        });
      });
    });
    onClose();
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
        // Fallback para copiar link
        navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link copiado!",
          description: "Link do CV copiado para a área de transferência.",
        });
      });
    } else {
      // Fallback para copiar link
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copiado!",
        description: "Link do CV copiado para a área de transferência.",
      });
    }
    onClose();
  };

  return (
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
          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={downloadAsPNG}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <FileImage className="w-8 h-8 text-blue-600" />
                <div>
                  <h3 className="font-semibold">Baixar como PNG</h3>
                  <p className="text-sm text-gray-500">Imagem de alta qualidade</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={downloadAsJPG}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <FileImage className="w-8 h-8 text-green-600" />
                <div>
                  <h3 className="font-semibold">Baixar como JPG</h3>
                  <p className="text-sm text-gray-500">Imagem compactada</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={downloadAsPDF}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <FileText className="w-8 h-8 text-red-600" />
                <div>
                  <h3 className="font-semibold">Baixar como PDF</h3>
                  <p className="text-sm text-gray-500">Documento padrão</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={downloadForPrint}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Printer className="w-8 h-8 text-purple-600" />
                <div>
                  <h3 className="font-semibold">PDF para Impressão</h3>
                  <p className="text-sm text-gray-500">Alta qualidade para imprimir</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={handleShare}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Share2 className="w-8 h-8 text-orange-600" />
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
  );
};

export default DownloadOptions;
