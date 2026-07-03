import React, { useRef, useCallback, useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from '@/hooks/useAuth';
import { useSubscription } from '@/hooks/useSubscription';
import { Badge } from '@/components/ui/badge';
import { User, ChevronDown, FileText, Mail, PenTool, LogOut, Award, Briefcase, GraduationCap, Heart, Sparkles, Crown, Zap } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const Header = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { user } = useAuth();
  const { isPremiumActive, profile } = useSubscription();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const excludedPages = ['/preview', '/criar-cv'];
  const shouldShowAds = !excludedPages.includes(location.pathname);

  const tapCountRef = useRef(0);
  const tapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleLogoTap = useCallback(async () => {
    tapCountRef.current += 1;
    
    if (tapTimerRef.current) clearTimeout(tapTimerRef.current);
    tapTimerRef.current = setTimeout(() => { tapCountRef.current = 0; }, 2000);

    if (tapCountRef.current >= 5) {
      tapCountRef.current = 0;
      if (!user) return;

      const { data: profile } = await supabase
        .from('user_profiles')
        .select('is_admin')
        .eq('id', user.id)
        .single();

      if (profile?.is_admin) {
        navigate('/admin/afiliados');
      }
    }
  }, [user, navigate]);

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
    <header className={`header-glass ${scrolled ? 'scrolled' : ''}`}>
      <div className="container mx-auto px-4 py-4 md:py-6 flex items-center justify-between">
        
        {/* Navigation Left + Logo */}
        <div className="flex items-center gap-8">
            {/* Logo */}
            <div 
              className="flex items-center gap-2 cursor-pointer select-none mr-12 lg:mr-20" 
              onClick={(e) => {
                handleLogoTap();
                if (tapCountRef.current <= 1) {
                  navigate('/');
                }
              }}
            >
              <img 
                src="/logo.png" 
                alt="MozVita Logo" 
                className="h-10 md:h-12 lg:h-14 w-auto object-contain origin-left hover:scale-105 transition-transform"
              />
            </div>
            
            {/* Desktop Links */}
            {!isMobile && (
              <nav className="hidden lg:flex items-center space-x-6 font-semibold text-slate-700">
                <Link to="/modelos" className="hover:text-brand-600 transition-colors">Modelos</Link>
                
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger asChild>
                    <button className="hover:text-brand-600 transition-colors flex items-center gap-1 outline-none group">
                      Ferramentas
                      <ChevronDown className="w-4 h-4 transition-transform group-data-[state=open]:rotate-180 text-slate-400 group-hover:text-brand-600" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    className="w-64 p-2 shadow-2xl border-slate-100 bg-white/98 backdrop-blur-xl rounded-2xl"
                  >
                    <div className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Cartas Oficiais</div>
                    {officialLetters.map((item) => (
                      <DropdownMenuItem
                        key={item.url}
                        className="dropdown-item-premium group cursor-pointer mb-1 last:mb-0"
                        onClick={() => navigate(item.url)}
                      >
                        <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center mr-2 group-hover:bg-brand-50 transition-colors">
                          <item.icon className="w-4 h-4 text-slate-400 group-hover:text-brand-600" />
                        </div>
                        <span className="font-medium text-slate-700">{item.title}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <Link to="/blog" className="hover:text-brand-600 transition-colors">Blog</Link>
                <Link to="/precos" className="hover:text-brand-600 transition-colors">Preços</Link>
                <Link to="/contato" className="hover:text-brand-600 transition-colors">Contato</Link>
              </nav>
            )}
        </div>

        {/* Actions Right */}
        <div className="flex items-center space-x-4">
          {!user ? (
            <>
              {!isMobile && (
                <Button variant="ghost" onClick={() => navigate('/auth')} className="font-bold text-slate-700 hover:text-brand-600 hover:bg-brand-50">
                  Entrar
                </Button>
              )}
              <Button 
                onClick={() => navigate('/modelos')} 
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-md font-semibold px-6 transition-all hover:scale-105 active:scale-95"
              >
                <FileText className="w-4 h-4 mr-2" />
                Criar Meu CV
              </Button>
            </>
          ) : (
            <button 
                onClick={() => navigate('/perfil')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 border border-slate-100 hover:border-brand-200 hover:bg-brand-50 transition-all active:scale-95 group"
            >
                <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center group-hover:bg-brand-100 transition-colors">
                  <User className="w-4 h-4 text-slate-500 group-hover:text-brand-600" />
                </div>
                <div className="flex flex-col items-start hidden sm:flex">
                  <span className="text-xs font-bold text-slate-700 group-hover:text-brand-700 leading-tight">Meu Perfil</span>
                  <Badge 
                    variant={isPremiumActive ? "default" : "secondary"}
                    className={`text-[9px] font-black uppercase tracking-wider px-1.5 py-0 h-3.5 pointer-events-none mt-0.5 ${
                      isPremiumActive 
                        ? "bg-brand-500 text-white border-0" 
                        : "bg-slate-200 text-slate-500 border-0"
                    }`}
                  >
                    {isPremiumActive ? "PRO" : "FREE"}
                  </Badge>
                </div>
            </button>
          )}
        </div>

      </div>
    </header>
  );
};

export default Header;
