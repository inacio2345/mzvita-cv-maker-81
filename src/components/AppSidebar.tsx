import { 
  Home, FileText, HelpCircle, Mail, FileImage, 
  Shield, PenTool, ChevronDown, Briefcase, 
  BookOpen, Users, Info, Star, User, LogOut, Loader2, Megaphone, ShoppingCart, LayoutDashboard
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
    title: "Meu Painel",
    url: "/perfil",
    icon: Home,
  },
  {
    title: "Vagas & Assistente IA",
    url: "/meu-emprego",
    icon: Briefcase,
  },
  {
    title: "Criar currículo",
    url: "/modelos",
    icon: FileText,
  },
  {
    title: "Planos Premium",
    url: "/precos",
    icon: Star,
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
    <Sidebar className="border-r border-slate-200 bg-[#FAFAFA]">
      <SidebarHeader className="border-b border-slate-200/60">
        <div className="px-4 py-3 flex items-center">
          <Link to="/perfil" className="flex items-center">
            <img 
              src="/logo.png" 
              alt="MozVita Logo" 
              className="h-8 w-auto object-contain" 
            />
          </Link>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="bg-[#FAFAFA] px-2 py-3 gap-1">
        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-500 font-semibold uppercase tracking-wider text-[11px] px-2 mb-1">Visão Geral</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="hover:bg-slate-200/50 hover:text-slate-900 transition-none h-8 rounded-md px-2">
                    <Link to={item.url} className="flex items-center w-full">
                      <item.icon className="w-4 h-4 text-slate-500 mr-2 shrink-0" />
                      <span className="text-sm font-medium text-slate-700">{item.title}</span>
                      {item.title === "Planos Premium" && (
                        <Badge variant="outline" className="ml-auto text-[10px] bg-white border-slate-300 text-slate-700 px-1.5 py-0 rounded">NOVO</Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="px-2 mb-1">
            <button
              className="flex items-center justify-between w-full text-left text-slate-500 font-semibold uppercase tracking-wider text-[11px] hover:text-slate-800 transition-none"
              onClick={() => setCartasExpanded(!cartasExpanded)}
            >
              <span>Cartas Oficiais</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform ${cartasExpanded ? 'rotate-180' : ''}`}
              />
            </button>
          </SidebarGroupLabel>
          {cartasExpanded && (
            <SidebarGroupContent>
              <SidebarMenu className="gap-0.5">
                {cartasOficiaisItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className="hover:bg-slate-200/50 hover:text-slate-900 transition-none h-8 rounded-md px-2">
                      <Link to={item.url} className="flex items-center w-full pl-6">
                        <span className="text-sm font-medium text-slate-600">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          )}
        </SidebarGroup>


        {profile?.is_admin && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-slate-500 font-semibold uppercase tracking-wider text-[11px] px-2 mb-1">Administração</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-0.5">
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="hover:bg-slate-200/50 hover:text-slate-900 transition-none h-8 rounded-md px-2">
                    <Link to="/admin" className="flex items-center w-full">
                      <LayoutDashboard className="w-4 h-4 text-slate-500 mr-2 shrink-0" />
                      <span className="text-sm font-medium text-slate-700">Dashboard Admin</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="hover:bg-slate-200/50 hover:text-slate-900 transition-none h-8 rounded-md px-2">
                    <Link to="/admin/afiliados" className="flex items-center w-full">
                      <Users className="w-4 h-4 text-slate-500 mr-2 shrink-0" />
                      <span className="text-sm font-medium text-slate-700">Gerir Afiliados</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="hover:bg-slate-200/50 hover:text-slate-900 transition-none h-8 rounded-md px-2">
                    <Link to="/admin/anuncios" className="flex items-center w-full">
                      <Megaphone className="w-4 h-4 text-slate-500 mr-2 shrink-0" />
                      <span className="text-sm font-medium text-slate-700">Gerir Anúncios</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="hover:bg-slate-200/50 hover:text-slate-900 transition-none h-8 rounded-md px-2">
                    <Link to="/admin/carrinhos-abandonados" className="flex items-center w-full">
                      <ShoppingCart className="w-4 h-4 text-slate-500 mr-2 shrink-0" />
                      <span className="text-sm font-medium text-slate-700">Carrinhos Abandonados</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="p-3 border-t border-slate-200/60 bg-[#FAFAFA]">
        {loading ? (
          <div className="flex items-center justify-center p-2">
            <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
          </div>
        ) : user ? (
          <div className="space-y-1">
            <div 
              onClick={() => navigate('/perfil')}
              className="flex items-center gap-2 p-2 rounded-md hover:bg-slate-200/50 cursor-pointer transition-none group border border-transparent hover:border-slate-200"
            >
              <div className="w-8 h-8 rounded bg-white flex items-center justify-center border border-slate-200 shrink-0">
                <span className="text-xs font-bold text-slate-700 uppercase">
                  {user.email?.charAt(0)}
                </span>
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-xs font-medium text-slate-900 truncate">
                  {profile?.full_name || user.email?.split('@')[0]}
                </p>
                <div className="flex items-center mt-0.5">
                  <span className="text-[10px] text-slate-500 font-medium truncate">
                    {isPremiumActive ? "Plano PRO" : "Plano Gratuito"}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-1 pt-1">
              <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => navigate('/perfil')}
                  className="flex-1 text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 h-7 rounded text-[11px] font-medium transition-none"
              >
                Perfil
              </Button>
              <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleSignOut}
                  className="flex-1 text-slate-600 hover:text-red-700 hover:bg-red-50 h-7 rounded text-[11px] font-medium transition-none"
              >
                Sair
              </Button>
            </div>
          </div>
        ) : (
          <Button 
            onClick={() => navigate('/', { state: { showAuth: true } })}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm h-8 rounded-md transition-none"
          >
            Entrar
          </Button>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
