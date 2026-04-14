
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/hooks/useAuth';
import { 
  Home, 
  PlusCircle, 
  PenTool, 
  MoreHorizontal, 
  FileText, 
  Zap, 
  MessageCircle, 
  Info,
  Layout,
  LogOut,
  ChevronRight,
  BookOpen,
  ChevronDown,
  ChevronUp,
  DollarSign
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const MobileNav = () => {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMoreOpen(false);
    window.scrollTo(0, 0);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    setIsMoreOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  const NavItem = React.forwardRef(({ 
    icon: Icon, 
    label, 
    path, 
    onClick, 
    active,
    ...props 
  }: { 
    icon: any, 
    label: string, 
    path?: string, 
    onClick?: () => void,
    active?: boolean 
  }, ref: any) => (
    <button 
      ref={ref}
      onClick={onClick || (() => path && handleNavigation(path))}
      className={`flex flex-col items-center justify-center gap-1 min-w-[56px] transition-all duration-300 ${
        active ? 'text-google-blue scale-110' : 'text-slate-400'
      }`}
      {...props}
    >
      <div className={`p-2 rounded-xl transition-all ${active ? 'bg-google-blue/10' : 'hover:bg-slate-50'}`}>
        <Icon className={`w-5 h-5 ${active ? 'stroke-[2.5px]' : 'stroke-[2px]'}`} />
      </div>
      <span className={`text-[9px] font-bold uppercase tracking-tighter transition-all ${active ? 'opacity-100' : 'opacity-60'}`}>
        {label}
      </span>
    </button>
  ));

  NavItem.displayName = 'NavItem';

  return (
    <div className="lg:hidden">
      {/* Botão de Recuperar Menu (Floating Toggle) */}
      <button
        onClick={() => setIsCollapsed(false)}
        className={`fixed bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md border border-slate-100 shadow-xl rounded-full px-6 py-2 z-[110] flex items-center gap-2 text-slate-800 font-black text-[10px] uppercase tracking-widest transition-all duration-500 hover:bg-white ${
          isCollapsed ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
        }`}
      >
        <ChevronUp className="w-4 h-4 text-google-blue animate-bounce" />
        Mostrar Menu
      </button>

      {/* Bottom Bar Main */}
      <nav className={`fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-slate-100 px-2 pt-2 transition-all duration-500 z-[100] flex justify-around items-end rounded-t-[32px] shadow-[0_-15px_40px_-20px_rgba(0,0,0,0.15)] ${
        isCollapsed ? 'translate-y-[100%] pointer-events-none' : 'translate-y-0'
      }`}>
        
        {/* Botão de Minimizar Integrado */}
        <button 
          onClick={() => setIsCollapsed(true)}
          className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white border border-slate-100 rounded-full p-1.5 shadow-md text-slate-300 hover:text-google-blue transition-all active:scale-95"
        >
          <ChevronDown className="w-4 h-4" />
        </button>

        <div className="flex w-full justify-around items-center pb-6 pt-1">
          <NavItem 
            icon={Home} 
            label="Início" 
            path="/" 
            active={isActive('/')} 
          />
          
          <NavItem 
            icon={PlusCircle} 
            label="Criar CV" 
            path="/criar-cv" 
            active={isActive('/criar-cv')} 
          />

          <NavItem 
            icon={Layout} 
            label="Modelos" 
            path="/exemplos" 
            active={isActive('/exemplos')} 
          />

          <NavItem 
            icon={Zap} 
            label="Planos" 
            path="/precos" 
            active={isActive('/precos')} 
          />

          {/* More Trigger */}
          <Sheet open={isMoreOpen} onOpenChange={setIsMoreOpen}>
            <SheetTrigger asChild>
              <NavItem 
                icon={MoreHorizontal} 
                label="Mais" 
                active={isMoreOpen} 
              />
            </SheetTrigger>
            <SheetContent side="bottom" className="rounded-t-[32px] p-0 h-[85vh] border-none">
              <div className="bg-white h-full rounded-t-[32px] overflow-hidden flex flex-col">
                <SheetHeader className="p-6 pb-2">
                  <div className="w-12 h-1.5 bg-slate-100 rounded-full mx-auto mb-4" />
                  <SheetTitle className="text-2xl font-black text-slate-900">Menu Principal</SheetTitle>
                </SheetHeader>
                <ScrollArea className="flex-1 px-6 pb-10">
                  <div className="space-y-8">
                    {/* Cartas Section */}
                    <div>
                      <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 ml-1">Cartas Oficiais</h3>
                      <div className="grid grid-cols-1 gap-2">
                        {[
                          { label: "Carta de Apresentação", path: "/carta-apresentacao" },
                          { label: "Pedido de Estágio", path: "/carta-pedido-estagio" },
                          { label: "Carta de Requisição", path: "/carta-requisicao" },
                          { label: "Carta de Demissão", path: "/carta-demissao" },
                          { label: "Carta de Recomendação", path: "/carta-recomendacao" },
                          { label: "Pedido de Bolsa", path: "/carta-pedido-bolsa" },
                          { label: "Agradecimento", path: "/carta-agradecimento" },
                        ].map((item) => (
                          <button 
                            key={item.path}
                            className="flex items-center justify-between w-full h-14 px-4 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors group"
                            onClick={() => handleNavigation(item.path)}
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
                                <PenTool className="w-4 h-4 text-google-green" />
                              </div>
                              <span className="font-bold text-slate-700 text-sm">{item.label}</span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-google-blue transition-colors" />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Explore Section */}
                    <div>
                      <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 ml-1">Explorar</h3>
                      <div className="grid grid-cols-3 gap-3">
                        <button 
                          className="flex flex-col items-center justify-center h-28 gap-2 rounded-3xl bg-blue-50/50 border border-blue-100"
                          onClick={() => handleNavigation('/blog')}
                        >
                          <BookOpen className="w-6 h-6 text-google-blue" />
                          <span className="font-bold text-xs uppercase text-google-blue">Blog</span>
                        </button>
                        <button 
                          className="flex flex-col items-center justify-center h-28 gap-2 rounded-3xl bg-red-50/50 border border-red-100"
                          onClick={() => handleNavigation('/contato')}
                        >
                          <MessageCircle className="w-6 h-6 text-google-red" />
                          <span className="font-bold text-xs uppercase text-google-red">Contato</span>
                        </button>
                        <button 
                          className="flex flex-col items-center justify-center h-28 gap-2 rounded-3xl bg-emerald-50/50 border border-emerald-100"
                          onClick={() => handleNavigation('/afiliado')}
                        >
                          <DollarSign className="w-6 h-6 text-emerald-600" />
                          <span className="font-bold text-[10px] uppercase text-emerald-600">Afiliados</span>
                        </button>
                      </div>
                    </div>

                    {/* Account Section */}
                    <div className="pt-4 border-t border-slate-100">
                      <button 
                        className="flex items-center gap-3 w-full h-14 px-4 rounded-2xl text-red-500 hover:bg-red-50 transition-colors font-bold"
                        onClick={handleSignOut}
                      >
                        <LogOut className="w-5 h-5" />
                        Terminar Sessão
                      </button>
                      <button 
                        className="flex items-center gap-2 w-full justify-center mt-6 py-2 text-slate-400 font-bold text-[10px] uppercase"
                        onClick={() => handleNavigation('/sobre-nos')}
                      >
                        <Info className="w-3 h-3" />
                        Sobre a MozVita Moz
                      </button>
                    </div>
                  </div>
                </ScrollArea>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
      {/* Spacer to prevent content being hidden behind bottom nav */}
      <div className={`h-24 lg:hidden transition-all duration-500 ${isCollapsed ? 'h-0' : 'h-24'}`} />
    </div>
  );
};

export default MobileNav;
