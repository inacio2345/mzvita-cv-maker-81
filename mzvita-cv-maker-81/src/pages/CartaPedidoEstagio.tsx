
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CartaBase from '@/components/cartas/CartaBase';

const CartaPedidoEstagio = () => {
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    curso: '',
    instituicao: '',
    empresa: '',
    turno: '',
    dataInicio: ''
  });

  const [previewContent, setPreviewContent] = useState('');

  useEffect(() => {
    const hoje = new Date().toLocaleDateString('pt-BR');
    
    const content = `${formData.empresa || '[Nome da Empresa]'}

${hoje}

Prezados Senhores,

Eu, ${formData.nomeCompleto || '[Seu Nome]'}, estudante do curso de ${formData.curso || '[Seu Curso]'} na ${formData.instituicao || '[Sua Instituição]'}, venho por meio desta solicitar uma oportunidade de estágio em sua conceituada empresa.

Gostaria de estagiar no turno da ${formData.turno || '[Turno]'}, com previsão de início em ${formData.dataInicio || '[Data de Início]'}. Acredito que esta experiência será fundamental para minha formação profissional e para o desenvolvimento das competências necessárias em minha área de atuação.

Estou comprometido(a) com o aprendizado e disposto(a) a contribuir com dedicação e responsabilidade para o crescimento da empresa.

Agradeço desde já pela atenção dispensada e aguardo retorno.

Atenciosamente,

${formData.nomeCompleto || '[Seu Nome]'}`;

    setPreviewContent(content);
  }, [formData]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <CartaBase 
      title="Carta de Pedido de Estágio"
      previewContent={previewContent}
      fileName="carta_pedido_estagio"
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
          <Label htmlFor="curso">Curso</Label>
          <Input
            id="curso"
            value={formData.curso}
            onChange={(e) => handleInputChange('curso', e.target.value)}
            placeholder="Nome do seu curso"
          />
        </div>

        <div>
          <Label htmlFor="instituicao">Instituição de Ensino</Label>
          <Input
            id="instituicao"
            value={formData.instituicao}
            onChange={(e) => handleInputChange('instituicao', e.target.value)}
            placeholder="Nome da sua instituição"
          />
        </div>

        <div>
          <Label htmlFor="empresa">Empresa</Label>
          <Input
            id="empresa"
            value={formData.empresa}
            onChange={(e) => handleInputChange('empresa', e.target.value)}
            placeholder="Nome da empresa onde deseja estagiar"
          />
        </div>

        <div>
          <Label>Turno Pretendido</Label>
          <Select onValueChange={(value) => handleInputChange('turno', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o turno" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="manhã">Manhã</SelectItem>
              <SelectItem value="tarde">Tarde</SelectItem>
              <SelectItem value="noite">Noite</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="dataInicio">Data de Início Prevista</Label>
          <Input
            id="dataInicio"
            type="date"
            value={formData.dataInicio}
            onChange={(e) => handleInputChange('dataInicio', e.target.value)}
          />
        </div>
      </div>
    </CartaBase>
  );
};

export default CartaPedidoEstagio;
