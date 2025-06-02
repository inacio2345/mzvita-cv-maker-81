
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { UserProfile, useUserProfile } from '@/hooks/useUserProfile';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
}

const EditProfileModal = ({ isOpen, onClose, profile }: EditProfileModalProps) => {
  const { updateProfile } = useUserProfile();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome_completo: profile.nome_completo || '',
    profissao: profile.profissao || '',
    foto_perfil_url: profile.foto_perfil_url || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const success = await updateProfile(formData);
    if (success) {
      onClose();
    }
    
    setLoading(false);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Editar Perfil</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nome_completo">Nome Completo</Label>
            <Input
              id="nome_completo"
              value={formData.nome_completo}
              onChange={(e) => handleChange('nome_completo', e.target.value)}
              placeholder="Seu nome completo"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="profissao">Profissão</Label>
            <Input
              id="profissao"
              value={formData.profissao}
              onChange={(e) => handleChange('profissao', e.target.value)}
              placeholder="Sua profissão atual"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="foto_perfil_url">URL da Foto de Perfil</Label>
            <Input
              id="foto_perfil_url"
              value={formData.foto_perfil_url}
              onChange={(e) => handleChange('foto_perfil_url', e.target.value)}
              placeholder="https://..."
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancelar
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;
