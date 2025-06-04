
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Upload, User } from 'lucide-react';

const PersonalDataForm = ({ data, onUpdate }) => {
  const [formData, setFormData] = useState({
    fullName: data.personalData?.fullName || '',
    email: data.personalData?.email || '',
    phone: data.personalData?.phone || '',
    address: data.personalData?.address || '',
    idNumber: data.personalData?.idNumber || '',
    website: data.personalData?.website || '',
    profileImage: data.personalData?.profileImage || ''
  });

  const handleChange = (field, value) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onUpdate({ personalData: newData });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        handleChange('profileImage', e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Informações Pessoais</h3>
        <p className="text-gray-600">Preencha seus dados pessoais para começar seu CV</p>
      </div>

      {/* Profile Image */}
      <div className="flex flex-col items-center space-y-4">
        <Avatar className="w-24 h-24">
          <AvatarImage src={formData.profileImage} />
          <AvatarFallback>
            <User className="w-12 h-12" />
          </AvatarFallback>
        </Avatar>
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="profile-image"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => document.getElementById('profile-image').click()}
            className="flex items-center"
          >
            <Upload className="w-4 h-4 mr-2" />
            Carregar Foto
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="fullName">Nome Completo *</Label>
          <Input
            id="fullName"
            placeholder="Seu nome completo"
            value={formData.fullName}
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
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="phone">Telefone *</Label>
          <Input
            id="phone"
            placeholder="+258 84 123 4567"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="idNumber">Número do BI</Label>
          <Input
            id="idNumber"
            placeholder="123456789N"
            value={formData.idNumber}
            onChange={(e) => handleChange('idNumber', e.target.value)}
            className="mt-1"
          />
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="address">Endereço *</Label>
          <Input
            id="address"
            placeholder="Cidade, Bairro, Rua"
            value={formData.address}
            onChange={(e) => handleChange('address', e.target.value)}
            className="mt-1"
          />
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="website">Website/Blog (opcional)</Label>
          <Input
            id="website"
            placeholder="https://meuportfolio.com"
            value={formData.website}
            onChange={(e) => handleChange('website', e.target.value)}
            className="mt-1"
          />
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Dica:</strong> Certifique-se de que todos os dados estão corretos. 
          Essas informações aparecerão no cabeçalho do seu CV.
        </p>
      </div>
    </div>
  );
};

export default PersonalDataForm;
