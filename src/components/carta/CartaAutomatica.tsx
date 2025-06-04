
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Eye, Wand2, Edit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CartaAutomaticaData {
  nomeCompleto: string;
  cargoDesejado: string;
  nomeEmpresa: string;
  experienciaPrincipal: string;
  habilidadesPrincipais: string;
  motivacaoVaga: string;
  email?: string;
  telefone?: string;
}

export const CartaAutomatica = () => {
  const [formData, setFormData] = useState<CartaAutomaticaData>({
    nomeCompleto: '',
    cargoDesejado: '',
    nomeEmpresa: '',
    experienciaPrincipal: '',
    habilidadesPrincipais: '',
    motivacaoVaga: '',
    email: '',
    telefone: '',
  });
  const [cartaGerada, setCartaGerada] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: keyof CartaAutomaticaData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateCarta = () => {
    if (!formData.nomeCompleto || !formData.cargoDesejado || !formData.nomeEmpresa || 
        !formData.experienciaPrincipal || !formData.habilidadesPrincipais || !formData.motivacaoVaga) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulação de geração de carta (em produção, isso seria uma chamada para IA)
    setTimeout(() => {
      const cartaTemplate = `Tenho grande interesse na vaga de ${formData.cargoDesejado} em ${formData.nomeEmpresa}, pois acredito que minha experiência e habilidades se alinham perfeitamente com os requisitos da posição.

Com experiência em ${formData.experienciaPrincipal}, desenvolvi um sólido conhecimento nas áreas que considero fundamentais para o sucesso nesta função. Durante minha trajetória profissional, pude aprimorar habilidades em ${formData.habilidadesPrincipais}, que considero essenciais para contribuir efetivamente com os objetivos da empresa.

${formData.motivacaoVaga}

Estou confiante de que posso agregar valor significativo à equipe e contribuir para o crescimento contínuo da ${formData.nomeEmpresa}. Seria uma honra ter a oportunidade de discutir como minha experiência e entusiasmo podem beneficiar a organização.

Agradeço pela consideração de minha candidatura e fico à disposição para uma entrevista quando for conveniente.`;

      setCartaGerada(cartaTemplate);
      setIsGenerating(false);
      setShowPreview(true);
    }, 2000);
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
          pdf.save(`carta_apresentacao_automatica_${formData.nomeCompleto.replace(/\s+/g, '_')}.pdf`);
          
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
        <div className="flex justify-between items-center flex-wrap gap-4">
          <Button 
            variant="outline" 
            onClick={() => setShowPreview(false)}
          >
            Voltar para Formulário
          </Button>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-2"
            >
              <Edit className="w-4 h-4" />
              {isEditing ? 'Finalizar Edição' : 'Editar Texto'}
            </Button>
            <Button onClick={handleDownloadPDF} className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Baixar PDF
            </Button>
          </div>
        </div>

        {isEditing && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Editar Conteúdo da Carta</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={cartaGerada}
                onChange={(e) => setCartaGerada(e.target.value)}
                className="min-h-[300px] resize-none"
              />
            </CardContent>
          </Card>
        )}
        
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
                {cartaGerada}
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

          <div>
            <Label htmlFor="experienciaPrincipal">Experiência Principal *</Label>
            <Textarea
              id="experienciaPrincipal"
              value={formData.experienciaPrincipal}
              onChange={(e) => handleInputChange('experienciaPrincipal', e.target.value)}
              placeholder="Descreva sua principal experiência profissional..."
              className="min-h-[80px] resize-none"
            />
          </div>

          <div>
            <Label htmlFor="habilidadesPrincipais">Habilidades Principais *</Label>
            <Textarea
              id="habilidadesPrincipais"
              value={formData.habilidadesPrincipais}
              onChange={(e) => handleInputChange('habilidadesPrincipais', e.target.value)}
              placeholder="Liste suas principais habilidades..."
              className="min-h-[80px] resize-none"
            />
          </div>

          <div>
            <Label htmlFor="motivacaoVaga">Motivação para a Vaga *</Label>
            <Textarea
              id="motivacaoVaga"
              value={formData.motivacaoVaga}
              onChange={(e) => handleInputChange('motivacaoVaga', e.target.value)}
              placeholder="Por que você quer trabalhar nesta empresa/cargo?"
              className="min-h-[80px] resize-none"
            />
          </div>
        </div>

        <Button 
          onClick={generateCarta} 
          disabled={isGenerating}
          className="w-full flex items-center gap-2"
        >
          <Wand2 className="w-4 h-4" />
          {isGenerating ? 'Gerando Carta...' : 'Gerar Carta Automaticamente'}
        </Button>
      </div>

      <div className="lg:block hidden">
        <Card className="bg-gray-50">
          <CardHeader>
            <CardTitle className="text-lg">Como funciona</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p>• Preencha todos os campos obrigatórios</p>
            <p>• Nossa IA analisará suas informações</p>
            <p>• Uma carta profissional será gerada automaticamente</p>
            <p>• Você poderá editar o texto antes de baixar</p>
            <p>• O resultado final será um PDF formatado</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
