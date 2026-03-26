
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import CartaBase from '@/components/cartas/CartaBase';

const CartaAgradecimento = () => {
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    destinatario: '',
    motivoAgradecimento: '',
    contexto: ''
  });

  const [previewContent, setPreviewContent] = useState('');

  useEffect(() => {
    const hoje = new Date().toLocaleDateString('pt-BR');
    
    const content = `${formData.destinatario || '[Nome da Pessoa/Empresa]'}

${hoje}

Prezado(a) ${formData.destinatario || '[Nome do Destinatário]'},

Eu, ${formData.nomeCompleto || '[Seu Nome]'}, venho por meio desta expressar minha sincera gratidão.

${formData.motivoAgradecimento || '[Motivo do agradecimento]'}

${formData.contexto ? `Este gesto foi especialmente significativo ${formData.contexto}.` : ''}

Sua atenção e disponibilidade demonstram o profissionalismo e a qualidade humana que tanto admiro. Tenho certeza de que essa experiência contribuiu muito para meu crescimento pessoal e profissional.

Mais uma vez, muito obrigado(a)!

Com os melhores cumprimentos,

${formData.nomeCompleto || '[Seu Nome]'}`;

    setPreviewContent(content);
  }, [formData]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <CartaBase 
      title="Carta de Agradecimento"
      previewContent={previewContent}
      fileName="carta_agradecimento"
    >
      <div className="space-y-4">
        <div>
          <Label htmlFor="nomeCompleto">Nome Completo</Label>
          <Input
            id="nomeCompleto"
            value={formData.nomeCompleto}
            onChange={(e) => handleInputChange('nomeCompleto', e.target.value)}
            placeholder="Seu nome completo"
          />
        </div>

        <div>
          <Label htmlFor="destinatario">Nome da Pessoa/Empresa a Ser Agradecida</Label>
          <Input
            id="destinatario"
            value={formData.destinatario}
            onChange={(e) => handleInputChange('destinatario', e.target.value)}
            placeholder="Nome de quem receberá o agradecimento"
          />
        </div>

        <div>
          <Label htmlFor="motivoAgradecimento">Motivo do Agradecimento</Label>
          <Textarea
            id="motivoAgradecimento"
            value={formData.motivoAgradecimento}
            onChange={(e) => handleInputChange('motivoAgradecimento', e.target.value)}
            placeholder="Descreva o que deseja agradecer"
            rows={4}
          />
        </div>

        <div>
          <Label htmlFor="contexto">Data ou Contexto da Interação</Label>
          <Textarea
            id="contexto"
            value={formData.contexto}
            onChange={(e) => handleInputChange('contexto', e.target.value)}
            placeholder="Quando ou em que contexto aconteceu (opcional)"
            rows={2}
          />
        </div>
      </div>
    </CartaBase>
  );
};

export default CartaAgradecimento;
