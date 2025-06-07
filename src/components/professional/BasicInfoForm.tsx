
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProfessionalFormData } from '@/types/professional';

interface BasicInfoFormProps {
  data: Partial<ProfessionalFormData>;
  onUpdate: (updates: Partial<ProfessionalFormData>) => void;
}

const BasicInfoForm = ({ data, onUpdate }: BasicInfoFormProps) => {
  const handleChange = (field: string, value: string) => {
    onUpdate({ [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Informações Pessoais
        </h3>
        <p className="text-gray-600">
          Preencha seus dados pessoais básicos
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="fullName">Nome Completo *</Label>
          <Input
            id="fullName"
            placeholder="Seu nome completo"
            value={data.fullName || ''}
            onChange={(e) => handleChange('fullName', e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            placeholder="seu.email@exemplo.com"
            value={data.email || ''}
            onChange={(e) => handleChange('email', e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="phone">Telefone *</Label>
          <Input
            id="phone"
            placeholder="+258 84 123 4567"
            value={data.phone || ''}
            onChange={(e) => handleChange('phone', e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="birthDate">Data de Nascimento</Label>
          <Input
            id="birthDate"
            type="date"
            value={data.birthDate || ''}
            onChange={(e) => handleChange('birthDate', e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="nationality">Nacionalidade</Label>
          <Input
            id="nationality"
            placeholder="Moçambicana"
            value={data.nationality || ''}
            onChange={(e) => handleChange('nationality', e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="idNumber">Bilhete de Identidade</Label>
          <Input
            id="idNumber"
            placeholder="123456789N"
            value={data.idNumber || ''}
            onChange={(e) => handleChange('idNumber', e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="maritalStatus">Estado Civil</Label>
          <Select
            value={data.maritalStatus || ''}
            onValueChange={(value) => handleChange('maritalStatus', value)}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Selecione..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="solteiro">Solteiro(a)</SelectItem>
              <SelectItem value="casado">Casado(a)</SelectItem>
              <SelectItem value="divorciado">Divorciado(a)</SelectItem>
              <SelectItem value="viuvo">Viúvo(a)</SelectItem>
              <SelectItem value="uniao-estavel">União Estável</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="address">Endereço Completo *</Label>
        <Input
          id="address"
          placeholder="Cidade, Bairro, Rua, Número"
          value={data.address || ''}
          onChange={(e) => handleChange('address', e.target.value)}
          className="mt-1"
        />
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Nota:</strong> Os campos marcados com * são obrigatórios para gerar seu CV.
        </p>
      </div>
    </div>
  );
};

export default BasicInfoForm;
