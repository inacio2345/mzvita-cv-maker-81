
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Shield, Mail, Key, Check, X } from 'lucide-react';
import { UserProfile, useUserProfile } from '@/hooks/useUserProfile';
import { useToast } from '@/hooks/use-toast';

interface SecuritySectionProps {
  profile: UserProfile;
}

const SecuritySection = ({ profile }: SecuritySectionProps) => {
  const { updateProfile } = useUserProfile();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleChangePassword = () => {
    toast({
      title: "Funcionalidade em desenvolvimento",
      description: "A alteração de senha será implementada em breve.",
    });
  };

  const handleVerifyEmail = () => {
    toast({
      title: "Funcionalidade em desenvolvimento",
      description: "A verificação de e-mail será implementada em breve.",
    });
  };

  const handle2FAToggle = async (checked: boolean) => {
    setLoading(true);
    const success = await updateProfile({ autenticacao_2fa: checked });
    if (success) {
      toast({
        title: checked ? "2FA Ativado" : "2FA Desativado",
        description: checked 
          ? "Autenticação em dois fatores foi ativada com sucesso."
          : "Autenticação em dois fatores foi desativada.",
      });
    }
    setLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Shield className="w-5 h-5" />
          <span>Segurança</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Status do E-mail */}
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-gray-500" />
            <div>
              <p className="font-medium">Verificação de E-mail</p>
              <p className="text-sm text-gray-500">
                Status da verificação do seu e-mail
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {profile.email_verificado ? (
              <>
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-green-600 font-medium">Verificado</span>
              </>
            ) : (
              <>
                <X className="w-5 h-5 text-red-600" />
                <span className="text-red-600 font-medium">Não verificado</span>
                <Button size="sm" variant="outline" onClick={handleVerifyEmail}>
                  Verificar
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Alterar Senha */}
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center space-x-3">
            <Key className="w-5 h-5 text-gray-500" />
            <div>
              <p className="font-medium">Senha</p>
              <p className="text-sm text-gray-500">
                Altere sua senha regularmente para maior segurança
              </p>
            </div>
          </div>
          <Button variant="outline" onClick={handleChangePassword}>
            Alterar Senha
          </Button>
        </div>

        {/* Autenticação 2FA */}
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center space-x-3">
            <Shield className="w-5 h-5 text-gray-500" />
            <div>
              <p className="font-medium">Autenticação em Dois Fatores (2FA)</p>
              <p className="text-sm text-gray-500">
                Adicione uma camada extra de segurança à sua conta
              </p>
            </div>
          </div>
          <Switch
            checked={profile.autenticacao_2fa}
            onCheckedChange={handle2FAToggle}
            disabled={loading}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default SecuritySection;
