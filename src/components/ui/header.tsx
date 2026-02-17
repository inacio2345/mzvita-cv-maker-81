import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import MobileNav from '@/components/ui/mobile-nav';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, FileText, Mail, PenTool, LogOut, Award, Briefcase, GraduationCap, Heart, Sparkles } from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const officialLetters = [
    { title: "Carta de Apresentação", url: "/carta-apresentacao", icon: PenTool },
    { title: "Carta de Pedido de Estágio", url: "/carta-pedido-estagio", icon: PenTool },
    { title: "Carta de Requisição", url: "/carta-requisicao", icon: PenTool },
    { title: "Carta de Demissão", url: "/carta-demissao", icon: PenTool },
    { title: "Carta de Recomendação", url: "/carta-recomendacao", icon: PenTool },
    { title: "Carta de Pedido de Bolsa", url: "/carta-pedido-bolsa", icon: PenTool },
    { title: "Carta de Agradecimento", url: "/carta-agradecimento", icon: PenTool },
  ];

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-sm border-b sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {/* Desktop Navigation */}
            {!isMobile && (
              <nav className="hidden lg:flex items-center space-x-6">
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger asChild>
                    <button
                      className="nav-button-premium text-slate-700 hover:bg-transparent font-bold flex items-center gap-1.5 group px-3 py-2 rounded-lg outline-none"
                    >
                      <Sparkles className="w-4 h-4 text-google-yellow group-hover:animate-pulse" />
                      Criar outros documentos
                      <ChevronDown className="w-4 h-4 transition-transform group-data-[state=open]:rotate-180 text-slate-400 group-hover:text-google-blue" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    className="w-72 p-2 shadow-2xl border-slate-100 bg-white/98 backdrop-blur-xl rounded-2xl animate-in fade-in zoom-in slide-in-from-top-2 duration-300 z-[100]"
                  >
                    <div className="px-3 py-2 pb-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Cartas Oficiais</div>
                    {officialLetters.map((item) => (
                      <DropdownMenuItem
                        key={item.url}
                        className="dropdown-item-premium group cursor-pointer mb-0.5 last:mb-0"
                        onClick={() => navigate(item.url)}
                      >
                        <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center mr-1 group-hover:bg-google-blue/10 transition-colors">
                          <item.icon className="w-4 h-4 text-slate-400 group-hover:text-google-blue" />
                        </div>
                        <span className="flex-1">{item.title}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button
                  variant="ghost"
                  onClick={() => navigate('/criar-cv')}
                  className="nav-button-premium text-slate-700 hover:bg-transparent font-bold px-3 py-2 btn-shine-sweep"
                >
                  Criar Currículo
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => navigate('/blog')}
                  className="nav-button-premium text-slate-700 hover:bg-transparent font-bold px-3 py-2"
                >
                  Blog
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => navigate('/contato')}
                  className="nav-button-premium text-slate-700 hover:bg-transparent font-bold px-3 py-2"
                >
                  Contato
                </Button>
              </nav>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => navigate('/exemplos')}
              className="bg-google-blue hover:bg-blue-600 text-white font-black px-8 py-6 rounded-full shadow-lg hover:shadow-blue-200/50 transition-all hover:scale-105 active:scale-95 animate-premium-pulse"
            >
              Ver Modelos
            </Button>

            {isMobile && (
              <MobileNav />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
