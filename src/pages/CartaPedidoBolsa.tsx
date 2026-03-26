
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import CartaBase from '@/components/cartas/CartaBase';

const CartaPedidoBolsa = () => {
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    instituicao: '',
    curso: '',
    situacaoFinanceira: '',
    motivoBolsa: ''
  });

  const [previewContent, setPreviewContent] = useState('');

  useEffect(() => {
    const hoje = new Date().toLocaleDateString('pt-BR');
    
    const content = `${formData.instituicao || '[Nome da Instituição]'}
Setor de Bolsas de Estudo

${hoje}

Prezados Senhores,

Eu, ${formData.nomeCompleto || '[Seu Nome]'}, venho por meio desta solicitar uma bolsa de estudos para o curso de ${formData.curso || '[Nome do Curso]'} nesta conceituada instituição.

SITUAÇÃO FINANCEIRA:
${formData.situacaoFinanceira || '[Breve descrição da sua situação financeira]'}

JUSTIFICATIVA:
${formData.motivoBolsa || '[Motivo pelo qual solicita a bolsa]'}

Acredito que, com esta oportunidade, poderei dedicar-me integralmente aos estudos e contribuir positivamente para a comunidade acadêmica. Comprometo-me a manter um excelente desempenho acadêmico e a cumprir todas as obrigações inerentes ao benefício.

Anexo os documentos comprobatórios necessários e aguardo análise favorável do meu pedido.

Atenciosamente,

${formData.nomeCompleto || '[Seu Nome]'}`;

    setPreviewContent(content);
  }, [formData]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <CartaBase 
      title="Carta de Pedido de Bolsa de Estudos"
      previewContent={previewContent}
      fileName="carta_pedido_bolsa"
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
          <Label htmlFor="instituicao">Instituição Pretendida</Label>
          <Input
            id="instituicao"
            value={formData.instituicao}
            onChange={(e) => handleInputChange('instituicao', e.target.value)}
            placeholder="Nome da instituição onde deseja estudar"
          />
        </div>

        <div>
          <Label htmlFor="curso">Curso Pretendido</Label>
          <Input
            id="curso"
            value={formData.curso}
            onChange={(e) => handleInputChange('curso', e.target.value)}
            placeholder="Nome do curso"
          />
        </div>

        <div>
          <Label htmlFor="situacaoFinanceira">Situação Financeira Resumida</Label>
          <Textarea
            id="situacaoFinanceira"
            value={formData.situacaoFinanceira}
            onChange={(e) => handleInputChange('situacaoFinanceira', e.target.value)}
            placeholder="Descreva brevemente sua situação financeira"
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="motivoBolsa">Motivo para Solicitar a Bolsa</Label>
          <Textarea
            id="motivoBolsa"
            value={formData.motivoBolsa}
            onChange={(e) => handleInputChange('motivoBolsa', e.target.value)}
            placeholder="Explique por que você merece esta bolsa de estudos"
            rows={4}
          />
        </div>
      </div>
    </CartaBase>
  );
};

export default CartaPedidoBolsa;
