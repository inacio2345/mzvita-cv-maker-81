
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { UserProfile, useUserProfile } from '@/hooks/useUserProfile';

interface PreferencesSectionProps {
  profile: UserProfile;
}

const PreferencesSection = ({ profile }: PreferencesSectionProps) => {
  const { updateProfile } = useUserProfile();
  const [loading, setLoading] = useState(false);

  const handleLanguageChange = async (value: string) => {
    setLoading(true);
    await updateProfile({ idioma: value });
    setLoading(false);
  };

  const handleThemeChange = async (value: string) => {
    setLoading(true);
    await updateProfile({ tema: value as 'claro' | 'escuro' });
    setLoading(false);
  };

  const handleNotificationsChange = async (checked: boolean) => {
    setLoading(true);
    await updateProfile({ notificacoes_ativadas: checked });
    setLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Preferências</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Idioma */}
        <div className="space-y-2">
          <Label>Idioma</Label>
          <Select value={profile.idioma} onValueChange={handleLanguageChange} disabled={loading}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pt">Português</SelectItem>
              <SelectItem value="en">English</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tema */}
        <div className="space-y-2">
          <Label>Tema</Label>
          <Select value={profile.tema} onValueChange={handleThemeChange} disabled={loading}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="claro">Claro</SelectItem>
              <SelectItem value="escuro">Escuro</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Notificações */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Notificações por E-mail</Label>
            <p className="text-sm text-gray-500">
              Receber atualizações e novidades por e-mail
            </p>
          </div>
          <Switch
            checked={profile.notificacoes_ativadas}
            onCheckedChange={handleNotificationsChange}
            disabled={loading}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PreferencesSection;
