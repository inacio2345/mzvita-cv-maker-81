
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { LogIn, LogOut, User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import AuthModal from './AuthModal';

const AuthHeader = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Logout realizado",
        description: "Você foi desconectado com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro no logout",
        description: "Não foi possível desconectar.",
        variant: "destructive",
      });
    }
  };

  if (user) {
    return (
      <div className="flex items-center space-x-2">
        <Avatar className="w-8 h-8">
          <AvatarFallback>
            {user.email?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <span className="text-sm text-gray-600 hidden sm:inline">
          {user.email}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSignOut}
          className="flex items-center space-x-1"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Sair</span>
        </Button>
      </div>
    );
  }

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowAuthModal(true)}
        className="flex items-center space-x-1"
      >
        <LogIn className="w-4 h-4" />
        <span>Entrar</span>
      </Button>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
};

export default AuthHeader;
