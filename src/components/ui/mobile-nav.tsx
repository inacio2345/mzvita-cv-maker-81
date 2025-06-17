
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
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
                  MozVita
                </span>
              </div>
            </div>

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
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
