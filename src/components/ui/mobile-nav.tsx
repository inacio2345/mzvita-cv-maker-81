
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, FileText, User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface MobileNavProps {
  showAuthButton?: boolean;
  onAuthClick?: () => void;
}

const MobileNav = ({ showAuthButton = true, onAuthClick }: MobileNavProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Erro ao sair:', error);
    }
  };

  return (
    <div className="lg:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="sm" className="p-2">
            <Menu className="w-5 h-5" />
            <span className="sr-only">Abrir menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[280px] sm:w-[350px]">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-google-blue to-google-green rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold bg-gradient-to-r from-google-blue to-google-green bg-clip-text text-transparent">
                  MzVita CV
                </span>
              </div>
            </div>

            {/* User Info */}
            {user && (
              <div className="py-4 border-b">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-google-blue to-google-green rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {user.email?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{user.email}</p>
                    <p className="text-xs text-gray-500">Usuário logado</p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Links */}
            <nav className="flex flex-col space-y-4 py-6 flex-1">
              <Button
                variant="ghost"
                className="justify-start text-base font-medium hover:bg-gray-100"
                onClick={() => handleNavigation('/')}
              >
                Início
              </Button>
              <Button
                variant="ghost"
                className="justify-start text-base font-medium hover:bg-gray-100"
                onClick={() => handleNavigation('/como-funciona')}
              >
                Como Funciona
              </Button>
              <Button
                variant="ghost"
                className="justify-start text-base font-medium hover:bg-gray-100"
                onClick={() => handleNavigation('/precos')}
              >
                Preços
              </Button>
              <Button
                variant="ghost"
                className="justify-start text-base font-medium hover:bg-gray-100"
                onClick={() => handleNavigation('/contato')}
              >
                Contato
              </Button>
              <Button
                variant="ghost"
                className="justify-start text-base font-medium hover:bg-gray-100"
                onClick={() => handleNavigation('/exemplos')}
              >
                Exemplos
              </Button>

              {/* User-specific links */}
              {user && (
                <>
                  <div className="border-t pt-4">
                    <Button
                      variant="ghost"
                      className="justify-start text-base font-medium hover:bg-gray-100 w-full"
                      onClick={() => handleNavigation('/perfil')}
                    >
                      <User className="w-4 h-4 mr-2" />
                      Meu Perfil
                    </Button>
                    <Button
                      variant="ghost"
                      className="justify-start text-base font-medium hover:bg-gray-100 w-full"
                      onClick={() => handleNavigation('/criar-cv')}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Criar CV
                    </Button>
                  </div>
                </>
              )}
            </nav>

            {/* Auth Button */}
            <div className="border-t pt-4">
              {user ? (
                <Button
                  variant="outline"
                  className="w-full text-red-600 border-red-200 hover:bg-red-50"
                  onClick={handleSignOut}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair
                </Button>
              ) : showAuthButton && (
                <Button
                  className="w-full bg-google-blue hover:bg-blue-600 text-white"
                  onClick={() => {
                    setIsOpen(false);
                    if (onAuthClick) {
                      onAuthClick();
                    }
                  }}
                >
                  Entrar
                </Button>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
