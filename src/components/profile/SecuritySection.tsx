
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
        <CardTitle className="flex items-center space-x-2 text-lg md:text-xl">
          <Shield className="w-5 h-5" />
          <span>Segurança</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 md:space-y-6">
        {/* Status do E-mail */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg space-y-4 sm:space-y-0">
          <div className="flex items-start space-x-3 flex-1">
            <Mail className="w-5 h-5 text-gray-500 mt-1 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm md:text-base">Verificação de E-mail</p>
              <p className="text-xs md:text-sm text-gray-500 mt-1">
                Status da verificação do seu e-mail
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
            {profile.email_verificado ? (
              <div className="flex items-center space-x-2 text-green-600">
                <Check className="w-4 h-4" />
                <span className="text-sm font-medium">Verificado</span>
              </div>
            ) : (
              <>
                <div className="flex items-center space-x-2 text-red-600">
                  <X className="w-4 h-4" />
                  <span className="text-sm">Não verificado</span>
                </div>
                <Button size="sm" variant="outline" onClick={handleVerifyEmail} className="w-full sm:w-auto">
                  Verificar
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Alterar Senha */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg space-y-4 sm:space-y-0">
          <div className="flex items-start space-x-3 flex-1">
            <Key className="w-5 h-5 text-gray-500 mt-1 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm md:text-base">Senha</p>
              <p className="text-xs md:text-sm text-gray-500 mt-1">
                Altere sua senha regularmente para maior segurança
              </p>
            </div>
          </div>
          <Button variant="outline" onClick={handleChangePassword} className="w-full sm:w-auto">
            Alterar Senha
          </Button>
        </div>

        {/* Autenticação 2FA */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg space-y-4 sm:space-y-0">
          <div className="flex items-start space-x-3 flex-1">
            <Shield className="w-5 h-5 text-gray-500 mt-1 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm md:text-base">Autenticação em Dois Fatores (2FA)</p>
              <p className="text-xs md:text-sm text-gray-500 mt-1">
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
