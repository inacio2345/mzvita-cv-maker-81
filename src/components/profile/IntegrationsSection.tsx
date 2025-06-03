
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link, Check, X } from 'lucide-react';
import { UserProfile, useUserProfile } from '@/hooks/useUserProfile';
import { useToast } from '@/hooks/use-toast';

interface IntegrationsSectionProps {
  profile: UserProfile;
}

const IntegrationsSection = ({ profile }: IntegrationsSectionProps) => {
  const { updateProfile } = useUserProfile();
  const { toast } = useToast();
  const [loading, setLoading] = useState<string | null>(null);

  const handleGoogleConnect = async () => {
    setLoading('google');
    setTimeout(async () => {
      const success = await updateProfile({ google_conectado: !profile.google_conectado });
      if (success) {
        toast({
          title: profile.google_conectado ? "Google Desconectado" : "Google Conectado",
          description: profile.google_conectado 
            ? "Sua conta Google foi desconectada."
            : "Sua conta Google foi conectada com sucesso.",
        });
      }
      setLoading(null);
    }, 1000);
  };

  const handleLinkedInConnect = async () => {
    setLoading('linkedin');
    setTimeout(async () => {
      const success = await updateProfile({ linkedin_conectado: !profile.linkedin_conectado });
      if (success) {
        toast({
          title: profile.linkedin_conectado ? "LinkedIn Desconectado" : "LinkedIn Conectado",
          description: profile.linkedin_conectado 
            ? "Sua conta LinkedIn foi desconectada."
            : "Sua conta LinkedIn foi conectada com sucesso.",
        });
      }
      setLoading(null);
    }, 1000);
  };

  const integrations = [
    {
      name: 'Google',
      description: 'Sincronize seus dados pessoais e profissionais do Google',
      connected: profile.google_conectado,
      onToggle: handleGoogleConnect,
      isLoading: loading === 'google',
      icon: (
        <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-sm">G</span>
        </div>
      ),
    },
    {
      name: 'LinkedIn',
      description: 'Importe automaticamente suas informações profissionais',
      connected: profile.linkedin_conectado,
      onToggle: handleLinkedInConnect,
      isLoading: loading === 'linkedin',
      icon: (
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-sm">in</span>
        </div>
      ),
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-lg md:text-xl">
          <Link className="w-5 h-5" />
          <span>Integrações</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {integrations.map((integration) => (
          <div key={integration.name} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg space-y-4 sm:space-y-0">
            <div className="flex items-start space-x-3 flex-1">
              {integration.icon}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm md:text-base">{integration.name}</p>
                <p className="text-xs md:text-sm text-gray-500 mt-1">{integration.description}</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
              {integration.connected ? (
                <div className="flex items-center space-x-2 text-green-600">
                  <Check className="w-4 h-4" />
                  <span className="text-sm font-medium">Conectado</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2 text-gray-500">
                  <X className="w-4 h-4" />
                  <span className="text-sm">Não conectado</span>
                </div>
              )}
              
              <Button
                size="sm"
                variant={integration.connected ? "outline" : "default"}
                onClick={integration.onToggle}
                disabled={integration.isLoading}
                className={`w-full sm:w-auto ${integration.connected ? "text-red-600 hover:bg-red-50" : ""}`}
              >
                {integration.isLoading 
                  ? "Processando..." 
                  : integration.connected 
                    ? "Desconectar" 
                    : "Conectar"
                }
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default IntegrationsSection;
