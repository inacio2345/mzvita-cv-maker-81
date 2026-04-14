
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Eye, Wand2, Edit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { generateLetterText } from '@/utils/letterGenerator';
import DownloadOptions from '@/components/download/DownloadOptions';

interface CartaAutomaticaData {
  nomeCompleto: string;
  cargoDesejado: string;
  nomeEmpresa: string;
  experienciaPrincipal: string;
  habilidadesPrincipais: string;
  motivacaoVaga: string;
  email?: string;
  telefone?: string;
  linkedin?: string;
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
    linkedin: '',
  });
  const [cartaGerada, setCartaGerada] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showWatermark, setShowWatermark] = useState(true);
  const [tone, setTone] = useState<'formal' | 'modern' | 'simple'>('formal');
  const [experience, setExperience] = useState<'junior' | 'mid' | 'senior'>('mid');
  const [font, setFont] = useState('Times New Roman'); // New state
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);
  const { toast } = useToast();
  
  const containerRef = useRef<HTMLDivElement>(null);
  const [scaleFactor, setScaleFactor] = useState(1);

  useEffect(() => {
    const calculateScale = () => {
      if (!containerRef.current) return;
      const parentWidth = containerRef.current.parentElement?.clientWidth || window.innerWidth;
      const a4WidthPx = 794; 
      
      if (parentWidth < a4WidthPx + 40) {
        setScaleFactor(parentWidth / (a4WidthPx + 40));
      } else {
        setScaleFactor(1);
      }
    };

    if (showPreview) {
      calculateScale();
      window.addEventListener('resize', calculateScale);
      return () => window.removeEventListener('resize', calculateScale);
    }
  }, [showPreview]);

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
      const dateStr = new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
      const cartaTemplate = generateLetterText(dateStr, formData, tone, experience);

      setCartaGerada(cartaTemplate);
      setIsGenerating(false);
      setShowPreview(true);
    }, 1500);
  };

  const handleDownloadPDF = async () => {
    const cartaContent = document.querySelector('.carta-preview') as HTMLElement;
    if (!cartaContent) return;

    try {
        const html2canvas = (await import('html2canvas')).default;
        const canvas = await html2canvas(cartaContent, {
            scale: 3,
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#ffffff',
            width: 794,
            height: 1123,
        });
        
        const imgData = canvas.toDataURL('image/png', 0.8);
        const { jsPDF } = await import('jspdf');
        
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
            compress: true
        });

        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

        const fileName = `carta_automatica_${formData.nomeCompleto.replace(/\s+/g, '_')}.pdf`;
        pdf.save(fileName);

        toast({
            title: "Download concluído!",
            description: "Sua carta automática foi baixada como PDF.",
        });
    } catch (error) {
        console.error('Erro ao gerar carta:', error);
        toast({
            title: "Erro",
            description: "Não foi possível gerar a carta.",
            variant: "destructive"
        });
    }
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
            <Button onClick={() => setShowDownloadOptions(true)} className="flex items-center gap-2">
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

        <div className="flex items-center space-x-2 mb-4 bg-gray-50 p-4 rounded-lg">
          <Switch
            id="watermark-mode-auto"
            checked={showWatermark}
            onCheckedChange={setShowWatermark}
          />
          <Label htmlFor="watermark-mode-auto" className="cursor-pointer">
            Exibir marca d'água "MozVita" no PDF
          </Label>
        </div>

        <div className="w-full overflow-hidden pb-8 flex justify-center bg-slate-100/50 rounded-xl p-4 md:p-8">
          <div ref={containerRef} className="carta-preview bg-white shadow-2xl origin-top transition-transform duration-300" style={{
            width: '794px',
            minHeight: '1123px',
            fontFamily: font + ', serif', // Dynamic font
            fontSize: '12pt',
            lineHeight: '1.5',
            color: '#000000',
            padding: '76px', // 2cm margins = 76px
            position: 'relative',
            transform: `scale(${scaleFactor})`,
            marginBottom: `calc((1123px * ${scaleFactor}) - 1123px)`
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
              {cartaGerada}
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
            {showWatermark && (
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
            )}
          </div>
        </div>

        <DownloadOptions
            isOpen={showDownloadOptions}
            onClose={() => setShowDownloadOptions(false)}
            documentType="letter"
            cvTitle={`Carta - ${formData.nomeCompleto}`}
            onCustomDownload={handleDownloadPDF}
        />
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Tom da Carta</Label>
            <Select value={tone} onValueChange={(v: any) => setTone(v)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="formal">Formal / Corporativo</SelectItem>
                <SelectItem value="modern">Moderno / Startup</SelectItem>
                <SelectItem value="simple">Simples / Direto</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Nível de Experiência</Label>
            <Select value={experience} onValueChange={(v: any) => setExperience(v)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="junior">Iniciante / Estágio</SelectItem>
                <SelectItem value="mid">Intermediário / Pleno</SelectItem>
                <SelectItem value="senior">Sênior / Especialista</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="md:col-span-2">
            <Label>Fonte do PDF</Label>
            <Select value={font} onValueChange={setFont}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Times New Roman">Clássica (Times New Roman)</SelectItem>
                <SelectItem value="Arial">Moderna (Arial)</SelectItem>
                <SelectItem value="Georgia">Elegante (Georgia)</SelectItem>
                <SelectItem value="Courier New">Máquina de Escrever (Courier)</SelectItem>
              </SelectContent>
            </Select>
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
