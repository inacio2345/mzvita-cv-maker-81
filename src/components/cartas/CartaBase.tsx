
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CartaBaseProps {
  title: string;
  children: React.ReactNode;
  previewContent: string;
  fileName?: string;
}

const CartaBase = ({ title, children, previewContent, fileName = "carta" }: CartaBaseProps) => {
  const { toast } = useToast();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(previewContent);
    toast({
      title: "Copiado!",
      description: "Conteúdo da carta copiado para a área de transferência.",
    });
  };

  const downloadAsPDF = () => {
    import('jspdf').then((jsPDF) => {
      const pdf = new jsPDF.jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Configurar fonte
      pdf.setFont('times', 'normal');
      pdf.setFontSize(12);

      // Dividir o texto em linhas
      const lines = pdf.splitTextToSize(previewContent, 170);
      
      // Adicionar texto ao PDF
      pdf.text(lines, 20, 30);
      
      // Salvar PDF
      pdf.save(`${fileName}.pdf`);
      
      toast({
        title: "Download concluído!",
        description: "Sua carta foi baixada como PDF.",
      });
    });
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {title}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Formulário */}
        <Card>
          <CardHeader>
            <CardTitle>Dados da Carta</CardTitle>
          </CardHeader>
          <CardContent>
            {children}
          </CardContent>
        </Card>

        {/* Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Pré-visualização</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-white p-6 border rounded-lg min-h-[400px] font-serif text-sm leading-relaxed">
              <pre className="whitespace-pre-wrap font-serif">{previewContent}</pre>
            </div>
            <div className="flex gap-2 mt-4">
              <Button onClick={copyToClipboard} variant="outline" size="sm">
                <Copy className="w-4 h-4 mr-2" />
                Copiar
              </Button>
              <Button onClick={downloadAsPDF} size="sm">
                <Download className="w-4 h-4 mr-2" />
                Baixar PDF
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CartaBase;
