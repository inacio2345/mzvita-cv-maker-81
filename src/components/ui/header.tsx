
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MobileNav from '@/components/ui/mobile-nav';
import { useIsMobile } from '@/hooks/use-mobile';

const Header = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  return (
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
              MozVita
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

          {/* Create CV Button */}
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => navigate('/criar-cv')}
              className="bg-google-blue hover:bg-blue-600 text-white"
            >
              Criar CV
            </Button>

            {/* Mobile Navigation */}
            {isMobile && (
              <MobileNav showAuthButton={false} />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
