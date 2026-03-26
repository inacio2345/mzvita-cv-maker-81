
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import CartaBase from '@/components/cartas/CartaBase';

const CartaDemissao = () => {
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    cargo: '',
    empresa: '',
    motivo: '',
    dataDesligamento: ''
  });

  const [previewContent, setPreviewContent] = useState('');

  useEffect(() => {
    const hoje = new Date().toLocaleDateString('pt-BR');
    const dataFormatada = formData.dataDesligamento 
      ? new Date(formData.dataDesligamento).toLocaleDateString('pt-BR')
      : '[Data de Desligamento]';
    
    const motivoTexto = formData.motivo 
      ? `\n\nO motivo desta decisão é: ${formData.motivo}` 
      : '';
    
    const content = `${formData.empresa || '[Nome da Empresa]'}
Departamento de Recursos Humanos

${hoje}

Prezados Senhores,

Eu, ${formData.nomeCompleto || '[Seu Nome]'}, ocupante do cargo de ${formData.cargo || '[Seu Cargo]'}, venho por meio desta comunicar minha decisão de desligamento da empresa.

Solicito que meu último dia de trabalho seja ${dataFormatada}.${motivoTexto}

Agradeço pela oportunidade de crescimento profissional e pelas experiências adquiridas durante meu período na empresa.

Atenciosamente,

${formData.nomeCompleto || '[Seu Nome]'}
${formData.cargo || '[Seu Cargo]'}`;

    setPreviewContent(content);
  }, [formData]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <CartaBase 
      title="Carta de Demissão"
      previewContent={previewContent}
      fileName="carta_demissao"
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
          <Label htmlFor="cargo">Cargo Atual</Label>
          <Input
            id="cargo"
            value={formData.cargo}
            onChange={(e) => handleInputChange('cargo', e.target.value)}
            placeholder="Seu cargo atual na empresa"
          />
        </div>

        <div>
          <Label htmlFor="empresa">Nome da Empresa</Label>
          <Input
            id="empresa"
            value={formData.empresa}
            onChange={(e) => handleInputChange('empresa', e.target.value)}
            placeholder="Nome da empresa"
          />
        </div>

        <div>
          <Label htmlFor="dataDesligamento">Data Desejada de Desligamento</Label>
          <Input
            id="dataDesligamento"
            type="date"
            value={formData.dataDesligamento}
            onChange={(e) => handleInputChange('dataDesligamento', e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="motivo">Motivo da Saída (Opcional)</Label>
          <Textarea
            id="motivo"
            value={formData.motivo}
            onChange={(e) => handleInputChange('motivo', e.target.value)}
            placeholder="Motivo da saída (opcional)"
            rows={3}
          />
        </div>
      </div>
    </CartaBase>
  );
};

export default CartaDemissao;
