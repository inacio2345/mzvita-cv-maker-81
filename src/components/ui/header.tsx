
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileText, User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import AuthModal from '@/components/auth/AuthModal';
import MobileNav from '@/components/ui/mobile-nav';
import { useIsMobile } from '@/hooks/use-mobile';

const Header = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const isMobile = useIsMobile();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Erro ao sair:', error);
    }
  };

  return (
    <>
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div 
              className="flex items-center space-x-2 cursor-pointer" 
              onClick={() => navigate('/')}
            >
              <div className="w-8 md:w-10 h-8 md:h-10 bg-gradient-to-r from-google-blue to-google-green rounded-lg flex items-center justify-center">
                <FileText className="w-5 md:w-6 h-5 md:h-6 text-white" />
              </div>
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-google-blue to-google-green bg-clip-text text-transparent">
                MzVita CV
              </h1>
            </div>

            {/* Desktop Navigation */}
            {!isMobile && (
              <nav className="hidden lg:flex items-center space-x-8">
                <Button
                  variant="ghost"
                  onClick={() => navigate('/como-funciona')}
                  className="text-gray-600 hover:text-google-blue"
                >
                  Como Funciona
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => navigate('/precos')}
                  className="text-gray-600 hover:text-google-blue"
                >
                  Preços
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => navigate('/contato')}
                  className="text-gray-600 hover:text-google-blue"
                >
                  Contato
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => navigate('/exemplos')}
                  className="text-gray-600 hover:text-google-blue"
                >
                  Exemplos
                </Button>
              </nav>
            )}

            {/* Auth Section */}
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <User className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700 font-medium hidden sm:inline">
                      {user.email}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => navigate('/perfil')}
                    className="hidden sm:flex items-center"
                  >
                    Meu Perfil
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleSignOut}
                    className="flex items-center"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Sair</span>
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => setShowAuthModal(true)}
                  className="bg-google-blue hover:bg-blue-600 text-white"
                >
                  Entrar
                </Button>
              )}

              {/* Mobile Navigation */}
              {isMobile && (
                <MobileNav 
                  showAuthButton={!user} 
                  onAuthClick={() => setShowAuthModal(true)} 
                />
              )}
            </div>
          </div>
        </div>
      </header>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </>
  );
};

export default Header;
