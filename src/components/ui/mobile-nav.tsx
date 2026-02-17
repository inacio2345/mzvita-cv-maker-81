
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, FileText, Zap, MessageCircle, Mail, PenTool } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

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
              <span className="text-lg font-bold text-slate-800">Menu</span>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col space-y-2 py-6 flex-1">
              <Button
                variant="ghost"
                className="justify-start text-base font-bold hover:bg-slate-50 text-slate-700 h-12"
                onClick={() => handleNavigation('/criar-cv')}
              >
                <FileText className="mr-3 h-5 w-5 text-google-blue" />
                Criar Currículo
              </Button>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="others" className="border-none">
                  <AccordionTrigger className="px-4 py-3 text-base font-bold text-slate-700 hover:no-underline hover:bg-slate-50 rounded-md">
                    <div className="flex items-center">
                      <PenTool className="mr-3 h-5 w-5 text-google-green" />
                      Criar outros documentos
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-2 pt-1 pl-4 flex flex-col space-y-1">
                    <Button variant="ghost" className="justify-start font-semibold text-slate-600 text-sm" onClick={() => handleNavigation('/carta-apresentacao')}><PenTool className="mr-2 h-4 w-4 opacity-50" /> Carta de Apresentação</Button>
                    <Button variant="ghost" className="justify-start font-semibold text-slate-600 text-sm" onClick={() => handleNavigation('/carta-pedido-estagio')}><PenTool className="mr-2 h-4 w-4 opacity-50" /> Carta de Pedido de Estágio</Button>
                    <Button variant="ghost" className="justify-start font-semibold text-slate-600 text-sm" onClick={() => handleNavigation('/carta-requisicao')}><PenTool className="mr-2 h-4 w-4 opacity-50" /> Carta de Requisição</Button>
                    <Button variant="ghost" className="justify-start font-semibold text-slate-600 text-sm" onClick={() => handleNavigation('/carta-demissao')}><PenTool className="mr-2 h-4 w-4 opacity-50" /> Carta de Demissão</Button>
                    <Button variant="ghost" className="justify-start font-semibold text-slate-600 text-sm" onClick={() => handleNavigation('/carta-recomendacao')}><PenTool className="mr-2 h-4 w-4 opacity-50" /> Carta de Recomendação</Button>
                    <Button variant="ghost" className="justify-start font-semibold text-slate-600 text-sm" onClick={() => handleNavigation('/carta-pedido-bolsa')}><PenTool className="mr-2 h-4 w-4 opacity-50" /> Carta de Pedido de Bolsa</Button>
                    <Button variant="ghost" className="justify-start font-semibold text-slate-600 text-sm" onClick={() => handleNavigation('/carta-agradecimento')}><PenTool className="mr-2 h-4 w-4 opacity-50" /> Carta de Agradecimento</Button>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Button
                variant="ghost"
                className="justify-start text-base font-bold hover:bg-slate-50 text-slate-700 h-12"
                onClick={() => handleNavigation('/blog')}
              >
                <Zap className="mr-3 h-5 w-5 text-google-yellow" />
                Blog
              </Button>
              <Button
                variant="ghost"
                className="justify-start text-base font-bold hover:bg-slate-50 text-slate-700 h-12"
                onClick={() => handleNavigation('/contato')}
              >
                <MessageCircle className="mr-3 h-5 w-5 text-google-red" />
                Contato
              </Button>
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
