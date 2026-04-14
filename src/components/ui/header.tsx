import React, { useRef, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
import AdRotator from '@/components/ads/AdRotator';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

const Header = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { user } = useAuth();
  const { isPremiumActive, profile } = useSubscription();
  const location = useLocation();

  const excludedPages = ['/preview', '/criar-cv'];
  const shouldShowAds = !excludedPages.includes(location.pathname);

  // Secret admin access: tap logo 5 times
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
    <header className="bg-white/95 backdrop-blur-md shadow-sm border-b sticky top-0 z-50 transition-all duration-300">
      <AdRotator />
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div 
              className="flex items-center gap-2 mr-4 lg:mr-6 cursor-pointer select-none" 
              onClick={(e) => {
                handleLogoTap();
                // Only navigate home on single tap after brief delay
                if (tapCountRef.current <= 1) {
                  navigate('/');
                }
              }}
            >
              <img
                src="/logo.png"
                alt="MozVita Logo"
                className="h-20 w-auto object-contain"
              />
            </div>
            
            {/* Profile Button - always visible when logged in */}
            {user && (
              <button 
                onClick={() => navigate('/perfil')}
                className="flex items-center gap-2 px-3 py-2 rounded-full border border-slate-100 hover:border-google-blue/30 hover:bg-google-blue/5 transition-all active:scale-95 group"
              >
                <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-google-blue/10 transition-colors">
                  <User className="w-4 h-4 text-slate-400 group-hover:text-google-blue" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-[11px] font-bold text-slate-600 group-hover:text-google-blue leading-tight">Meu Perfil</span>
                  <Badge 
                    variant={isPremiumActive ? "default" : "secondary"}
                    className={`text-[8px] font-black uppercase tracking-wider px-1.5 py-0 h-3.5 pointer-events-none ${
                      isPremiumActive 
                        ? "bg-google-green text-white" 
                        : "bg-slate-50 text-slate-400 border-slate-200"
                    }`}
                  >
                    {isPremiumActive ? "PRO" : "FREE"}
                  </Badge>
                </div>
              </button>
            )}

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
          <div className="flex items-center space-x-3">
            <Button
              onClick={() => navigate('/exemplos')}
              className="bg-google-blue hover:bg-blue-600 text-white font-black px-8 py-6 rounded-full shadow-lg hover:shadow-blue-200/50 transition-all hover:scale-105 active:scale-95 animate-premium-pulse"
            >
              {isMobile ? "Modelos" : "Ver Modelos"}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
