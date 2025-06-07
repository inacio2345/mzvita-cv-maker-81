
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import CartaBase from '@/components/cartas/CartaBase';

const CartaRequisicao = () => {
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    entidade: '',
    motivo: '',
    tipoDocumento: ''
  });

  const [previewContent, setPreviewContent] = useState('');

  useEffect(() => {
    const hoje = new Date().toLocaleDateString('pt-BR');
    
    const content = `${formData.entidade || '[Nome da Entidade]'}

${hoje}

Prezados Senhores,

Eu, ${formData.nomeCompleto || '[Seu Nome]'}, venho por meio desta solicitar ${formData.tipoDocumento || '[Tipo de Documento/Ação]'}.

${formData.motivo || '[Motivo detalhado do pedido]'}

Desde já agradeço a atenção dispensada e aguardo retorno.

Atenciosamente,

${formData.nomeCompleto || '[Seu Nome]'}`;

    setPreviewContent(content);
  }, [formData]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <CartaBase 
      title="Carta de Requisição"
      previewContent={previewContent}
      fileName="carta_requisicao"
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
          <Label htmlFor="entidade">Entidade Destinatária</Label>
          <Input
            id="entidade"
            value={formData.entidade}
            onChange={(e) => handleInputChange('entidade', e.target.value)}
            placeholder="Nome da entidade que receberá a carta"
          />
        </div>

        <div>
          <Label htmlFor="tipoDocumento">Tipo de Documento/Ação Requerida</Label>
          <Input
            id="tipoDocumento"
            value={formData.tipoDocumento}
            onChange={(e) => handleInputChange('tipoDocumento', e.target.value)}
            placeholder="Ex: declaração de matrícula, acesso a documentos, etc."
          />
        </div>

        <div>
          <Label htmlFor="motivo">Motivo do Pedido</Label>
          <Textarea
            id="motivo"
            value={formData.motivo}
            onChange={(e) => handleInputChange('motivo', e.target.value)}
            placeholder="Explique detalhadamente o motivo da requisição"
            rows={4}
          />
        </div>
      </div>
    </CartaBase>
  );
};

export default CartaRequisicao;
