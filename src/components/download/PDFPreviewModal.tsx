
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Download, X, Eye } from 'lucide-react';
import { generateProfessionalCV, generatePDFPreview } from '@/services/cvGenerator';
import { CVData } from '@/services/cvService';
import { useToast } from '@/hooks/use-toast';

interface PDFPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  cvData: CVData;
}

const PDFPreviewModal = ({ isOpen, onClose, cvData }: PDFPreviewModalProps) => {
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen && cvData) {
      generatePreview();
    }
  }, [isOpen, cvData]);

  const generatePreview = async () => {
    setIsGenerating(true);
    try {
      const preview = await generatePDFPreview(cvData);
      setPreviewUrl(preview);
    } catch (error) {
      console.error('Erro ao gerar preview:', error);
      toast({
        title: "Erro",
        description: "Não foi possível gerar a visualização do PDF.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async () => {
    try {
      await generateProfessionalCV(cvData);
      toast({
        title: "Download concluído!",
        description: "Seu CV foi baixado com sucesso.",
      });
      onClose();
    } catch (error) {
      console.error('Erro ao baixar PDF:', error);
      toast({
        title: "Erro",
        description: "Não foi possível baixar o PDF.",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              <span>Visualização do CV</span>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 flex flex-col">
          {isGenerating ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Gerando visualização...</p>
              </div>
            </div>
          ) : previewUrl ? (
            <div className="flex-1 bg-gray-100 rounded-lg overflow-hidden">
              <iframe
                src={previewUrl}
                className="w-full h-full border-0"
                title="Preview do CV"
              />
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-gray-500">Não foi possível carregar a visualização</p>
            </div>
          )}
          
          <div className="flex justify-end gap-3 mt-4 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={handleDownload} className="bg-green-600 hover:bg-green-700">
              <Download className="w-4 h-4 mr-2" />
              Baixar CV
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PDFPreviewModal;
