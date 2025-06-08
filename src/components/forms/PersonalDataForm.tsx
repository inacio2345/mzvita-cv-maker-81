
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Mail, MapPin, Briefcase } from 'lucide-react';
import PhoneInput from './PhoneInput';

interface PersonalDataFormProps {
  data: any;
  onUpdate: (updates: any) => void;
  errors?: Record<string, string>;
}

const PersonalDataForm = ({ data, onUpdate, errors = {} }: PersonalDataFormProps) => {
  const personalData = data.personalData || {};

  const handleChange = (field: string, value: string) => {
    onUpdate({
      personalData: {
        ...personalData,
        [field]: value
      }
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Informações Pessoais
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fullName">
                Nome Completo <span className="text-red-500">*</span>
              </Label>
              <Input
                id="fullName"
                value={personalData.fullName || ''}
                onChange={(e) => handleChange('fullName', e.target.value)}
                placeholder="Seu nome completo"
                className={errors.fullName ? 'border-red-500' : ''}
                required
              />
              {errors.fullName && <p className="text-sm text-red-500 mt-1">{errors.fullName}</p>}
            </div>

            <div>
              <Label htmlFor="profession">
                Profissão <span className="text-red-500">*</span>
              </Label>
              <Input
                id="profession"
                value={personalData.profession || ''}
                onChange={(e) => handleChange('profession', e.target.value)}
                placeholder="Sua profissão ou área de atuação"
                className={errors.profession ? 'border-red-500' : ''}
                required
              />
              {errors.profession && <p className="text-sm text-red-500 mt-1">{errors.profession}</p>}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">
                Email <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  value={personalData.email || ''}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="seu.email@exemplo.com"
                  className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                  required
                />
              </div>
              {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
            </div>

            <div>
              <PhoneInput
                value={personalData.phone || ''}
                onChange={(value) => handleChange('phone', value)}
                error={errors.phone}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="address">
              Endereço Completo <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                id="address"
                value={personalData.address || ''}
                onChange={(e) => handleChange('address', e.target.value)}
                placeholder="Cidade, Bairro, Rua - Moçambique"
                className={`pl-10 ${errors.address ? 'border-red-500' : ''}`}
                required
              />
            </div>
            {errors.address && <p className="text-sm text-red-500 mt-1">{errors.address}</p>}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="birthDate">Data de Nascimento</Label>
              <Input
                id="birthDate"
                type="date"
                value={personalData.birthDate || ''}
                onChange={(e) => handleChange('birthDate', e.target.value)}
                max={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div>
              <Label htmlFor="website">Site/LinkedIn (Opcional)</Label>
              <Input
                id="website"
                value={personalData.website || ''}
                onChange={(e) => handleChange('website', e.target.value)}
                placeholder="https://linkedin.com/in/seuperfil"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h4 className="font-medium text-blue-900 mb-2">📋 Campos Obrigatórios</h4>
        <p className="text-sm text-blue-800">
          Os campos marcados com <span className="text-red-500">*</span> são obrigatórios e devem ser preenchidos para continuar.
        </p>
      </div>
    </div>
  );
};

export default PersonalDataForm;
