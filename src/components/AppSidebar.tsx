import { 
  Home, FileText, HelpCircle, Mail, FileImage, 
  Shield, PenTool, ChevronDown, Briefcase, 
  BookOpen, Users, Info, Star, User, LogOut, Loader2
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/useAuth";
import { useSubscription } from "@/hooks/useSubscription";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const menuItems = [
  {
    title: "Início",
    url: "/",
    icon: Home,
  },
  {
    title: "Criar currículo",
    url: "/criar-cv",
    icon: FileText,
  },
  {
    title: "Planos Premium",
    url: "/precos",
    icon: Star,
    className: "text-amber-500 font-bold"
  },
  {
    title: "Blog",
    url: "/blog",
    icon: BookOpen,
  },
];

const cartasOficiaisItems = [
  {
    title: "Carta de Apresentação",
    url: "/carta-apresentacao",
  },
  {
    title: "Carta de Pedido de Estágio",
    url: "/carta-pedido-estagio",
  },
  {
    title: "Carta de Requisição",
    url: "/carta-requisicao",
  },
  {
    title: "Carta de Demissão",
    url: "/carta-demissao",
  },
  {
    title: "Carta de Recomendação",
    url: "/carta-recomendacao",
  },
  {
    title: "Carta de Pedido de Bolsa",
    url: "/carta-pedido-bolsa",
  },
  {
    title: "Carta de Agradecimento",
    url: "/carta-agradecimento",
  },
];

const legalItems = [
  {
    title: "Sobre Nós",
    url: "/sobre-nos",
    icon: Info,
  },
  {
    title: "Política de Privacidade",
    url: "/politica-de-privacidade",
    icon: Shield,
  },
  {
    title: "Termos de Uso",
    url: "/termos-de-uso",
    icon: FileText,
  },
  {
    title: "Contato",
    url: "/contato",
    icon: Mail,
  },
];

export function AppSidebar() {
  const [cartasExpanded, setCartasExpanded] = useState(false);
  const { user, signOut, loading } = useAuth();
  const { isPremiumActive, profile } = useSubscription();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="px-6 py-4 flex items-center">
          <Link to="/" className="flex items-center">
            <img 
              src="/logo.png" 
              alt="MozVita Logo" 
              className="h-16 w-auto object-contain transition-all hover:scale-105" 
            />
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegação Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className={item.className}>
                    <Link to={item.url}>
                      <item.icon className={item.title === "Planos Premium" ? "text-amber-500" : ""} />
                      <span>{item.title}</span>
                      {item.title === "Planos Premium" && (
                        <Badge variant="outline" className="ml-auto text-[10px] bg-amber-50 border-amber-200 text-amber-600 px-1 py-0">NOVO</Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>
            <button
              className="flex items-center justify-between w-full text-left"
              onClick={() => setCartasExpanded(!cartasExpanded)}
            >
              <span>Cartas Oficiais</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${cartasExpanded ? 'rotate-180' : ''}`}
              />
            </button>
          </SidebarGroupLabel>
          {cartasExpanded && (
            <SidebarGroupContent>
              <SidebarMenu>
                {cartasOficiaisItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link to={item.url} className="pl-6">
                        <PenTool className="w-4 h-4" />
                        <span className="text-sm">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          )}
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Documentos Legais</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {legalItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t bg-slate-50/50">
        {loading ? (
          <div className="flex items-center justify-center p-2">
            <Loader2 className="w-5 h-5 animate-spin text-slate-400" />
          </div>
        ) : user ? (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-google-blue/10 flex items-center justify-center border border-google-blue/20">
                <User className="w-5 h-5 text-google-blue" />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-bold text-slate-900 truncate">
                  {profile?.full_name || user.email?.split('@')[0]}
                </p>
                <div className="flex items-center gap-1.5">
                  <Badge variant={isPremiumActive ? "default" : "secondary"} className={isPremiumActive ? "bg-google-green text-white text-[9px] px-1.5 py-0" : "text-[9px] px-1.5 py-0"}>
                    {isPremiumActive ? "PRO ACTIVE" : "FREE PLAN"}
                  </Badge>
                  {profile?.cv_limit !== undefined && !isPremiumActive && (
                    <span className="text-[9px] text-slate-500 font-medium">
                      {profile.cv_used}/{profile.cv_limit} CVs
                    </span>
                  )}
                </div>
              </div>
            </div>
            <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleSignOut}
                className="w-full justify-start text-slate-500 hover:text-red-500 hover:bg-red-50 h-8"
            >
              <LogOut className="w-4 h-4 mr-2" />
              <span className="text-xs font-semibold">Sair da Conta</span>
            </Button>
          </div>
        ) : (
          <Button 
            onClick={() => navigate('/', { state: { showAuth: true } })}
            className="w-full bg-google-blue hover:bg-blue-600 font-bold shadow-md"
          >
            Entrar / Criar Conta
          </Button>
        )}
        <div className="mt-4 pt-4 border-t border-slate-200">
           <span className="text-[10px] block text-slate-400 font-medium italic">© 2024 MozVita v2.0</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
