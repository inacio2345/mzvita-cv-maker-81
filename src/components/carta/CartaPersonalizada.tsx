
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CartaData {
  nomeCompleto: string;
  cargoDesejado: string;
  nomeEmpresa: string;
  textoPersonalizado: string;
  email?: string;
  telefone?: string;
}

export const CartaPersonalizada = () => {
  const [formData, setFormData] = useState<CartaData>({
    nomeCompleto: '',
    cargoDesejado: '',
    nomeEmpresa: '',
    textoPersonalizado: '',
    email: '',
    telefone: '',
  });
  const [showPreview, setShowPreview] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: keyof CartaData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePreview = () => {
    if (!formData.nomeCompleto || !formData.cargoDesejado || !formData.nomeEmpresa || !formData.textoPersonalizado) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }
    setShowPreview(true);
  };

  const handleDownloadPDF = () => {
    const cartaContent = document.querySelector('.carta-preview') as HTMLElement;
    if (!cartaContent) return;

    import('html2canvas').then((html2canvas) => {
      html2canvas.default(cartaContent, {
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

          pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
          pdf.save(`carta_apresentacao_${formData.nomeCompleto.replace(/\s+/g, '_')}.pdf`);
          
          toast({
            title: "Download concluído!",
            description: "Sua carta de apresentação foi baixada como PDF.",
          });
        });
      });
    });
  };

  if (showPreview) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Button 
            variant="outline" 
            onClick={() => setShowPreview(false)}
          >
            Voltar para Edição
          </Button>
          <Button onClick={handleDownloadPDF} className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Baixar PDF
          </Button>
        </div>
        
        <Card className="carta-preview bg-white p-8 shadow-lg">
          <CardContent className="space-y-6">
            <div className="text-right text-sm text-gray-600">
              {new Date().toLocaleDateString('pt-BR')}
            </div>
            
            <div>
              <p className="font-medium">{formData.nomeCompleto}</p>
              {formData.email && <p className="text-sm text-gray-600">{formData.email}</p>}
              {formData.telefone && <p className="text-sm text-gray-600">{formData.telefone}</p>}
            </div>

            <div>
              <p className="font-medium">{formData.nomeEmpresa}</p>
            </div>

            <div>
              <p className="font-medium mb-4">
                Prezados Senhores,
              </p>
              <p className="mb-4">
                Venho por meio desta candidatar-me à vaga de <strong>{formData.cargoDesejado}</strong> em sua empresa.
              </p>
              <div className="whitespace-pre-wrap leading-relaxed">
                {formData.textoPersonalizado}
              </div>
            </div>

            <div className="mt-8">
              <p>Atenciosamente,</p>
              <p className="mt-4 font-medium">{formData.nomeCompleto}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="nomeCompleto">Nome Completo *</Label>
            <Input
              id="nomeCompleto"
              value={formData.nomeCompleto}
              onChange={(e) => handleInputChange('nomeCompleto', e.target.value)}
              placeholder="Seu nome completo"
            />
          </div>

          <div>
            <Label htmlFor="cargoDesejado">Cargo Desejado *</Label>
            <Input
              id="cargoDesejado"
              value={formData.cargoDesejado}
              onChange={(e) => handleInputChange('cargoDesejado', e.target.value)}
              placeholder="Ex: Desenvolvedor Frontend"
            />
          </div>

          <div>
            <Label htmlFor="nomeEmpresa">Nome da Empresa *</Label>
            <Input
              id="nomeEmpresa"
              value={formData.nomeEmpresa}
              onChange={(e) => handleInputChange('nomeEmpresa', e.target.value)}
              placeholder="Nome da empresa"
            />
          </div>

          <div>
            <Label htmlFor="email">E-mail (Opcional)</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <Label htmlFor="telefone">Telefone (Opcional)</Label>
            <Input
              id="telefone"
              value={formData.telefone}
              onChange={(e) => handleInputChange('telefone', e.target.value)}
              placeholder="(11) 99999-9999"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="textoPersonalizado">Texto da Carta *</Label>
          <Textarea
            id="textoPersonalizado"
            value={formData.textoPersonalizado}
            onChange={(e) => handleInputChange('textoPersonalizado', e.target.value)}
            placeholder="Escreva o conteúdo principal da sua carta de apresentação..."
            className="min-h-[200px] resize-none"
          />
        </div>

        <Button 
          onClick={handlePreview} 
          className="w-full flex items-center gap-2"
        >
          <Eye className="w-4 h-4" />
          Visualizar Carta
        </Button>
      </div>

      <div className="lg:block hidden">
        <Card className="bg-gray-50">
          <CardHeader>
            <CardTitle className="text-lg">Dicas para uma boa carta</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p>• Seja conciso e objetivo</p>
            <p>• Destaque suas principais qualificações</p>
            <p>• Demonstre conhecimento sobre a empresa</p>
            <p>• Use um tom profissional mas caloroso</p>
            <p>• Mencione suas principais conquistas</p>
            <p>• Finalize com uma chamada para ação</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
