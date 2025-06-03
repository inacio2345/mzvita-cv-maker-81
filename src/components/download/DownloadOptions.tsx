
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Download, FileImage, FileText, Printer, X } from 'lucide-react';
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
    window.print();
    toast({
      title: "Download PDF iniciado",
      description: "Use a opção 'Salvar como PDF' na tela de impressão.",
    });
    onClose();
  };

  const downloadForPrint = () => {
    const printWindow = window.open('', '_blank');
    const cvContent = document.querySelector('.cv-content')?.innerHTML;
    
    if (printWindow && cvContent) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>${cvTitle}</title>
          <style>
            @page { 
              margin: 0; 
              size: A4 portrait;
            }
            body { 
              margin: 0;
              padding: 20mm;
              font-family: 'Inter', Arial, sans-serif;
              print-color-adjust: exact;
              -webkit-print-color-adjust: exact;
            }
            * {
              box-sizing: border-box;
            }
          </style>
        </head>
        <body>
          ${cvContent}
        </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
    
    toast({
      title: "Versão para impressão aberta",
      description: "Uma nova janela foi aberta com a versão otimizada para impressão.",
    });
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
                  <p className="text-sm text-gray-500">Otimizado para imprimir</p>
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
