
import { Home, FileText, HelpCircle, DollarSign, Mail, FileImage, Shield, User, PenTool } from "lucide-react";
import { Link } from "react-router-dom";
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
    title: "Carta de Apresentação",
    url: "/carta-apresentacao",
    icon: PenTool,
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
  {
    title: "Contato",
    url: "/contato",
    icon: Mail,
  },
  {
    title: "Perfil",
    url: "/perfil",
    icon: User,
  },
];

const legalItems = [
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
];

export function AppSidebar() {
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
