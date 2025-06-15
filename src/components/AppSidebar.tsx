import { Home, FileText, HelpCircle, DollarSign, Mail, FileImage, Shield, PenTool, ChevronDown, Briefcase, BookOpen, Users, Info } from "lucide-react";
import { Link } from "react-router-dom";
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

const menuItems = [
  {
    title: "Início",
    url: "/",
    icon: Home,
  },
  {
    title: "Criar CV",
    url: "/criar-cv",
    icon: FileText,
  },
  {
    title: "Área Profissional",
    url: "/area-profissional",
    icon: Briefcase,
  },
  {
    title: "Blog",
    url: "/blog",
    icon: BookOpen,
  },
  {
    title: "Comunidade",
    url: "/comunidade",
    icon: Users,
  },
  {
    title: "Sobre Nós",
    url: "/sobre-nos",
    icon: Info,
  },
  {
    title: "Como Funciona",
    url: "/como-funciona",
    icon: HelpCircle,
  },
  {
    title: "Preços",
    url: "/precos",
    icon: DollarSign,
  },
  {
    title: "Exemplos",
    url: "/exemplos",
    icon: FileImage,
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

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="px-4 py-2">
          <h2 className="text-lg font-semibold text-sidebar-foreground">MozVita</h2>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegação Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
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
      <SidebarFooter>
        <div className="px-4 py-2 text-xs text-sidebar-foreground/70">
          © 2024 MozVita
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
