
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import CartaBase from '@/components/cartas/CartaBase';

const CartaRecomendacao = () => {
  const [formData, setFormData] = useState({
    nomeRecomendador: '',
    nomeRecomendado: '',
    area: '',
    tempoConvivencia: '',
    pontosFortes: ''
  });

  const [previewContent, setPreviewContent] = useState('');

  useEffect(() => {
    const hoje = new Date().toLocaleDateString('pt-BR');
    
    const content = `CARTA DE RECOMENDAÇÃO

${hoje}

A quem possa interessar,

Eu, ${formData.nomeRecomendador || '[Nome do Recomendador]'}, venho por meio desta carta recomendar ${formData.nomeRecomendado || '[Nome do Recomendado]'} para ${formData.area || '[Área/Cargo Pretendido]'}.

Tive a oportunidade de trabalhar/conviver com ${formData.nomeRecomendado || '[Nome do Recomendado]'} por ${formData.tempoConvivencia || '[Tempo de Convivência]'}, período durante o qual pude observar suas qualidades profissionais e pessoais.

Entre os pontos fortes que destaco em ${formData.nomeRecomendado || '[Nome do Recomendado]'}, posso mencionar:

${formData.pontosFortes || '[Pontos fortes do recomendado]'}

Baseado na minha experiência e convivência, recomendo ${formData.nomeRecomendado || '[Nome do Recomendado]'} sem reservas, pois tenho certeza de que será uma excelente adição a qualquer equipe.

Estou à disposição para quaisquer esclarecimentos adicionais.

Atenciosamente,

${formData.nomeRecomendador || '[Nome do Recomendador]'}`;

    setPreviewContent(content);
  }, [formData]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <CartaBase 
      title="Carta de Recomendação"
      previewContent={previewContent}
      fileName="carta_recomendacao"
    >
      <div className="space-y-4">
        <div>
          <Label htmlFor="nomeRecomendador">Nome de Quem Escreve (Recomendador)</Label>
          <Input
            id="nomeRecomendador"
            value={formData.nomeRecomendador}
            onChange={(e) => handleInputChange('nomeRecomendador', e.target.value)}
            placeholder="Seu nome (quem faz a recomendação)"
          />
        </div>

        <div>
          <Label htmlFor="nomeRecomendado">Nome de Quem Será Recomendado</Label>
          <Input
            id="nomeRecomendado"
            value={formData.nomeRecomendado}
            onChange={(e) => handleInputChange('nomeRecomendado', e.target.value)}
            placeholder="Nome da pessoa sendo recomendada"
          />
        </div>

        <div>
          <Label htmlFor="area">Área ou Cargo Pretendido</Label>
          <Input
            id="area"
            value={formData.area}
            onChange={(e) => handleInputChange('area', e.target.value)}
            placeholder="Área ou cargo para o qual está sendo recomendado"
          />
        </div>

        <div>
          <Label htmlFor="tempoConvivencia">Tempo de Convivência/Trabalho Juntos</Label>
          <Input
            id="tempoConvivencia"
            value={formData.tempoConvivencia}
            onChange={(e) => handleInputChange('tempoConvivencia', e.target.value)}
            placeholder="Ex: 2 anos, 6 meses, etc."
          />
        </div>

        <div>
          <Label htmlFor="pontosFortes">Pontos Fortes do Recomendado</Label>
          <Textarea
            id="pontosFortes"
            value={formData.pontosFortes}
            onChange={(e) => handleInputChange('pontosFortes', e.target.value)}
            placeholder="Descreva as principais qualidades e pontos fortes da pessoa"
            rows={4}
          />
        </div>
      </div>
    </CartaBase>
  );
};

export default CartaRecomendacao;
