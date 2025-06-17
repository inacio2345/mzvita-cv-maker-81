
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { sanitizeString, personalDataSchema } from '@/services/securityService';
import { useToast } from '@/hooks/use-toast';

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  address?: string;
  profession?: string;
  idNumber?: string;
  website?: string;
}

const PersonalDataForm = ({ data, onUpdate }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: data.personalData?.fullName || '',
    email: data.personalData?.email || '',
    phone: data.personalData?.phone || '',
    address: data.personalData?.address || '',
    profession: data.personalData?.profession || '',
    idNumber: data.personalData?.idNumber || '',
    website: data.personalData?.website || '',
    profileImage: data.personalData?.profileImage || ''
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateField = (field: string, value: string) => {
    try {
      const fieldSchema = personalDataSchema.shape[field as keyof typeof personalDataSchema.shape];
      if (fieldSchema) {
        fieldSchema.parse(value);
      }
      return null;
    } catch (error: any) {
      return error.errors?.[0]?.message || 'Valor inválido';
    }
  };

  const handleChange = (field, value) => {
    // Sanitize input
    const sanitizedValue = sanitizeString(value);
    
    // Validate field
    const error = validateField(field, sanitizedValue);
    setErrors(prev => ({
      ...prev,
      [field]: error
    }));

    const newData = {
      ...formData,
      [field]: sanitizedValue
    };
    setFormData(newData);
    
    // Only update if no errors
    if (!error) {
      onUpdate({
        personalData: newData
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Informações Pessoais</h3>
        <p className="text-gray-600">Preencha seus dados pessoais para começar seu CV</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="fullName">Nome Completo *</Label>
          <Input 
            id="fullName" 
            placeholder="Seu nome completo" 
            value={formData.fullName} 
            onChange={e => handleChange('fullName', e.target.value)} 
            className={`mt-1 ${errors.fullName ? 'border-red-500' : ''}`}
            maxLength={100}
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
          )}
        </div>

        <div>
          <Label htmlFor="profession">Profissão *</Label>
          <Input 
            id="profession" 
            placeholder="Ex: Designer Gráfico, Engenheiro, Professor" 
            value={formData.profession} 
            onChange={e => handleChange('profession', e.target.value)} 
            className="mt-1" 
          />
        </div>

        <div>
          <Label htmlFor="email">Email *</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="seu.email@exemplo.com" 
            value={formData.email} 
            onChange={e => handleChange('email', e.target.value)} 
            className={`mt-1 ${errors.email ? 'border-red-500' : ''}`}
            maxLength={255}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <Label htmlFor="phone">Telefone *</Label>
          <Input 
            id="phone" 
            placeholder="+258 84 123 4567" 
            value={formData.phone} 
            onChange={e => handleChange('phone', e.target.value)} 
            className={`mt-1 ${errors.phone ? 'border-red-500' : ''}`}
            maxLength={20}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="address">Endereço *</Label>
          <Input 
            id="address" 
            placeholder="Cidade, Bairro, Rua" 
            value={formData.address} 
            onChange={e => handleChange('address', e.target.value)} 
            className={`mt-1 ${errors.address ? 'border-red-500' : ''}`}
            maxLength={500}
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">{errors.address}</p>
          )}
        </div>

        <div>
          <Label htmlFor="idNumber">Número do BI (opcional)</Label>
          <Input 
            id="idNumber" 
            placeholder="123456789N" 
            value={formData.idNumber} 
            onChange={e => handleChange('idNumber', e.target.value)} 
            className={`mt-1 ${errors.idNumber ? 'border-red-500' : ''}`}
            maxLength={50}
          />
          {errors.idNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.idNumber}</p>
          )}
        </div>

        <div>
          <Label htmlFor="website">Website/Blog (opcional)</Label>
          <Input 
            id="website" 
            type="url"
            placeholder="https://meuportfolio.com" 
            value={formData.website} 
            onChange={e => handleChange('website', e.target.value)} 
            className={`mt-1 ${errors.website ? 'border-red-500' : ''}`}
            maxLength={255}
          />
          {errors.website && (
            <p className="text-red-500 text-sm mt-1">{errors.website}</p>
          )}
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Dica:</strong> Certifique-se de que todos os campos obrigatórios (*) estão preenchidos. 
          Essas informações aparecerão no cabeçalho do seu CV.
        </p>
      </div>
    </div>
  );
};

export default PersonalDataForm;
