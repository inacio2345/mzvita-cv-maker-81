
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
  linkedin?: string;
}

export const CartaPersonalizada = () => {
  const [formData, setFormData] = useState<CartaData>({
    nomeCompleto: '',
    cargoDesejado: '',
    nomeEmpresa: '',
    textoPersonalizado: '',
    email: '',
    telefone: '',
    linkedin: '',
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
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: 794, // A4 width in pixels at 96 DPI
        height: 1123, // A4 height in pixels at 96 DPI
      }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png', 0.8);
        
        import('jspdf').then((jsPDF) => {
          const pdf = new jsPDF.jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
            compress: true
          });

          // Add metadata
          pdf.setProperties({
            title: `Carta de Apresentação - ${formData.nomeCompleto}`,
            subject: 'Carta de Apresentação',
            author: formData.nomeCompleto,
            creator: 'MozVita'
          });

          const imgWidth = 210; // A4 width in mm
          const pageHeight = 297; // A4 height in mm
          const imgHeight = (canvas.height * imgWidth) / canvas.width;

          pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
          
          const fileName = `carta_apresentacao_${formData.nomeCompleto.replace(/\s+/g, '_')}.pdf`;
          pdf.save(fileName);
          
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
        
        <div className="carta-preview bg-white mx-auto shadow-lg" style={{
          width: '794px',
          minHeight: '1123px',
          fontFamily: 'Times New Roman, serif',
          fontSize: '12pt',
          lineHeight: '1.5',
          color: '#000000',
          padding: '76px', // 2cm margins = 76px
          position: 'relative'
        }}>
          {/* Header */}
          <div className="mb-6">
            <h1 style={{
              fontSize: '16pt',
              fontWeight: 'bold',
              color: '#1a365d',
              marginBottom: '8px',
              textAlign: 'left'
            }}>
              {formData.nomeCompleto}
            </h1>
            
            <div style={{
              fontSize: '14pt',
              fontWeight: 'bold',
              color: '#2d5a2d',
              marginBottom: '12px'
            }}>
              {formData.cargoDesejado}
            </div>
            
            <div style={{
              fontSize: '11pt',
              color: '#666666',
              textAlign: 'right',
              marginBottom: '16px'
            }}>
              {formData.email && <div>{formData.email}</div>}
              {formData.telefone && <div>{formData.telefone}</div>}
              {formData.linkedin && <div>{formData.linkedin}</div>}
            </div>
            
            <hr style={{
              border: 'none',
              borderTop: '1px solid #cccccc',
              margin: '16px 0'
            }} />
          </div>

          {/* Date */}
          <div style={{
            textAlign: 'right',
            fontSize: '11pt',
            color: '#666666',
            marginBottom: '24px'
          }}>
            {new Date().toLocaleDateString('pt-BR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </div>

          {/* Company Address */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
              {formData.nomeEmpresa}
            </div>
          </div>

          {/* Salutation */}
          <div style={{ marginBottom: '24px' }}>
            Prezados Senhores,
          </div>

          {/* Introduction */}
          <div style={{ 
            marginBottom: '24px',
            textAlign: 'justify'
          }}>
            Venho por meio desta candidatar-me à vaga de <strong>{formData.cargoDesejado}</strong> em sua empresa.
          </div>

          {/* Main content */}
          <div style={{
            marginBottom: '24px',
            textAlign: 'justify',
            whiteSpace: 'pre-wrap'
          }}>
            {formData.textoPersonalizado}
          </div>

          {/* Closing */}
          <div style={{ marginBottom: '24px', textAlign: 'justify' }}>
            Agradeço pela atenção e coloco-me à disposição para uma entrevista.
          </div>

          <div style={{ marginBottom: '8px' }}>
            Atenciosamente,
          </div>

          <div style={{ 
            fontWeight: 'bold',
            marginBottom: '32px'
          }}>
            {formData.nomeCompleto}
          </div>

          {/* Footer with contact info */}
          <div style={{
            position: 'absolute',
            bottom: '40px',
            left: '76px',
            fontSize: '10pt',
            color: '#666666'
          }}>
            {formData.email && <span>{formData.email}</span>}
            {formData.telefone && formData.email && <span> | </span>}
            {formData.telefone && <span>{formData.telefone}</span>}
          </div>

          {/* MozVita logo */}
          <div style={{
            position: 'absolute',
            bottom: '40px',
            right: '76px',
            fontSize: '8pt',
            color: '#1a365d',
            fontWeight: 'bold'
          }}>
            MozVita
          </div>
        </div>
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

          <div>
            <Label htmlFor="linkedin">LinkedIn (Opcional)</Label>
            <Input
              id="linkedin"
              value={formData.linkedin}
              onChange={(e) => handleInputChange('linkedin', e.target.value)}
              placeholder="linkedin.com/in/seu-perfil"
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
