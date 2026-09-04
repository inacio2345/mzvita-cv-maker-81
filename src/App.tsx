
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Link, useNavigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";
import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import PWAInstallPrompt from "@/components/PWAInstallPrompt";
import CookieBanner from "@/components/CookieBanner";
import MobileNav from "@/components/ui/mobile-nav";
import FacebookPixel from "@/components/FacebookPixel";
import GlobalAdsManager from "@/components/ads/GlobalAdsManager";
import Index from "./pages/Index";
import CreateCV from "./pages/CreateCV";
import BlogPostTemplate from "./pages/BlogPostTemplate";
import Preview from "./pages/Preview";
import ComoFunciona from "./pages/ComoFunciona";
import Contato from "./pages/Contato";
import Exemplos from "./pages/Exemplos";
import Auth from "./pages/Auth";
import PoliticaPrivacidade from "./pages/PoliticaPrivacidade";
import TermosUso from "./pages/TermosUso";
import CartaApresentacao from "./pages/CartaApresentacao";
import CartaPedidoEstagio from "./pages/CartaPedidoEstagio";
import CartaRequisicao from "./pages/CartaRequisicao";
import CartaDemissao from "./pages/CartaDemissao";
import CartaRecomendacao from "./pages/CartaRecomendacao";
import CartaPedidoBolsa from "./pages/CartaPedidoBolsa";
import CartaAgradecimento from "./pages/CartaAgradecimento";
import Blog from "./pages/Blog";
import JobFeed from "./pages/JobFeed";
import IaAssistant from "./pages/IaAssistant";
import NotFound from "./pages/NotFound";
import CVProfissionalMocambique from "./pages/blog/CVProfissionalMocambique";
import ErrosComuns from "./pages/blog/ErrosComuns";
import CVSemExperiencia from "./pages/blog/CVSemExperiencia";
import TendenciasMercado2024 from "./pages/blog/TendenciasMercado2024";
import AdaptarCVPorArea from "./pages/blog/AdaptarCVPorArea";
import FotoNoCurriculo from "./pages/blog/FotoNoCurriculo";
import Comunidade from "./pages/Comunidade";
import SobreNos from "./pages/SobreNos";
import Profile from "./pages/Profile";
import CVMocambique from "./pages/seo/CVMocambique";
import ModeloCVMocambique from "./pages/seo/ModeloCVMocambique";
import CVMocambiquePDF from "./pages/seo/CVMocambiquePDF";
import ExemplosCVMocambique from "./pages/seo/ExemplosCVMocambique";
import CVEmInglesMocambique from "./pages/seo/CVEmInglesMocambique";
import GuiaCV2026 from "./pages/blog/GuiaCV2026";
import CVMotoristaMocambique from "./pages/blog/CVMotoristaMocambique";
import VagasTeteCaboDelgado from "./pages/blog/VagasTeteCaboDelgado";
import EntrevistaEmpregoMoz from "./pages/blog/EntrevistaEmpregoMoz";
import EmpreendedorismoDigital from "./pages/blog/EmpreendedorismoDigital";
import CartaApresentacaoGuia from "./pages/blog/CartaApresentacaoGuia";
import SoftSkillsMoz from "./pages/blog/SoftSkillsMoz";
import LinkedinMoz from "./pages/blog/LinkedinMoz";
import Pricing from "./pages/Pricing";
import PagamentoSucesso from "./pages/PagamentoSucesso";
import Afiliado from "./pages/Afiliado";
import AffiliateDashboard from "./pages/AffiliateDashboard";
import AdminAffiliates from "./pages/AdminAffiliates";
import AdminAds from "./pages/AdminAds";
import AdminAbandonedCarts from "./pages/AdminAbandonedCarts";
import AdminJobs from "./pages/AdminJobs";
import AdminBlog from "./pages/AdminBlog";
import PrintCV from "./pages/PrintCV";
import ModeloProfissao from "./pages/ModeloProfissao";
import ReferralTracker from "@/components/ReferralTracker";
import { useSubscription } from "@/hooks/useSubscription";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { AdminGuard } from "@/components/auth/AdminGuard";
import { GuestGuard } from "@/components/auth/GuestGuard";
import AdminDashboard from "./pages/AdminDashboard";

const queryClient = new QueryClient();

// Routes that use the App layout (with sidebar, no public header/footer)
const appRoutes = [
  '/ia',
  '/vagas',
  '/criar-cv',
  '/preview',
  '/perfil',
  '/carta-apresentacao',
  '/carta-pedido-estagio',
  '/carta-requisicao',
  '/carta-demissao',
  '/carta-recomendacao',
  '/carta-pedido-bolsa',
  '/carta-agradecimento',
  '/comunidade',
  '/admin',
  '/admin/afiliados',
  '/admin/anuncios',
  '/admin/carrinhos-abandonados',
  '/admin/vagas',
  '/admin/blog',
  '/pagamento-sucesso',
  '/modelos',
  '/precos',
];

const printRoutes = ['/imprimir'];

function useLayoutType() {
  const location = useLocation();
  const { user } = useAuth();
  const path = location.pathname;
  
  if (printRoutes.includes(path)) return 'print';
  if (path === '/ia' || path === '/vagas') return user ? 'app' : 'public';
  if (appRoutes.includes(path) || path.startsWith('/perfil/')) return 'app';
  return 'public';
}

// Public Layout: clean header + footer, no sidebar
const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useIsMobile();
  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden">
      <Header />
      <main className="flex-1 flex flex-col overflow-x-hidden max-w-full">
        {children}
      </main>
      <Footer />
      <PWAInstallPrompt />
      <CookieBanner />
      {isMobile && <MobileNav />}
    </div>
  );
};

// Sleek Mobile Header Bar for AppLayout (Eliminates raw white space on mobile screens)
const MobileTopBar = () => {
  const { user } = useAuth();
  const { isPremiumActive } = useSubscription();
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === '/ia' || location.pathname === '/vagas' || location.pathname === '/criar-cv') {
    return null;
  }

  return (
    <header className="lg:hidden sticky top-0 left-0 right-0 z-40 h-14 bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 flex items-center justify-between shrink-0 shadow-sm">
      <Link to="/perfil" className="flex items-center">
        <img src="/logo.png" alt="MozVita Logo" className="h-7 w-auto object-contain" />
      </Link>
      
      <div className="flex items-center gap-2">
        <Badge variant="outline" className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
          isPremiumActive ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-slate-100 text-slate-600 border-slate-200'
        }`}>
          {isPremiumActive ? 'PRO ★' : 'Grátis'}
        </Badge>

        {user && (
          <div 
            onClick={() => navigate('/perfil')}
            className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 font-bold text-xs cursor-pointer active:scale-95 transition-transform"
          >
            {user.email?.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
    </header>
  );
};

// App Layout: sidebar + mobile top bar
const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const hideMobileNav = location.pathname === '/criar-cv';
  
  return (
    <SidebarProvider defaultOpen={!isMobile}>
      {!isMobile && <AppSidebar />}
      <SidebarInset className="overflow-x-hidden w-full overflow-y-auto m-0 p-0">
        <MobileTopBar />
        <div className="flex flex-1 flex-col justify-start items-stretch overflow-x-hidden max-w-full h-full m-0 p-0">
          {children}
        </div>
        <PWAInstallPrompt />
        <CookieBanner />
        {isMobile && !hideMobileNav && <MobileNav />}
      </SidebarInset>
    </SidebarProvider>
  );
};

// Print Layout: nothing — just the CV
const PrintLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

// Layout Router — picks the right shell based on the current route
const LayoutRouter = () => {
  const layoutType = useLayoutType();

  return (
    <>
      {layoutType === 'public' && (
        <PublicLayout>
          <Routes>
            <Route path="/" element={<GuestGuard><Index /></GuestGuard>} />
            <Route path="/vagas" element={<JobFeed />} />
            <Route path="/ia" element={<IaAssistant />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPostTemplate />} />
            <Route path="/blog/cv-profissional-mocambique" element={<CVProfissionalMocambique />} />
            <Route path="/blog/erros-comuns" element={<ErrosComuns />} />
            <Route path="/blog/cv-sem-experiencia" element={<CVSemExperiencia />} />
            <Route path="/blog/tendencias-mercado-2024" element={<TendenciasMercado2024 />} />
            <Route path="/blog/adaptar-cv-por-area" element={<AdaptarCVPorArea />} />
            <Route path="/blog/foto-no-curriculo" element={<FotoNoCurriculo />} />
            <Route path="/blog/guia-cv-2026" element={<GuiaCV2026 />} />
            <Route path="/blog/cv-motorista-mocambique" element={<CVMotoristaMocambique />} />
            <Route path="/blog/vagas-tete-cabo-delgado" element={<VagasTeteCaboDelgado />} />
            <Route path="/blog/entrevista-emprego-mocambique" element={<EntrevistaEmpregoMoz />} />
            <Route path="/blog/empreendedorismo-digital" element={<EmpreendedorismoDigital />} />
            <Route path="/blog/carta-apresentacao-guia" element={<CartaApresentacaoGuia />} />
            <Route path="/blog/soft-skills-mocambique" element={<SoftSkillsMoz />} />
            <Route path="/blog/linkedin-mocambique" element={<LinkedinMoz />} />
            <Route path="/como-funciona" element={<ComoFunciona />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/sobre-nos" element={<SobreNos />} />
            <Route path="/politica-de-privacidade" element={<PoliticaPrivacidade />} />
            <Route path="/termos-de-uso" element={<TermosUso />} />
            <Route path="/cv-mocambique" element={<CVMocambique />} />
            <Route path="/modelo-cv-mocambique" element={<ModeloCVMocambique />} />
            <Route path="/modelo-cv/:slug" element={<ModeloProfissao />} />
            <Route path="/cv-mocambique-pdf" element={<CVMocambiquePDF />} />
            <Route path="/exemplos-cv-mocambique" element={<ExemplosCVMocambique />} />
            <Route path="/cv-em-ingles-mocambique" element={<CVEmInglesMocambique />} />
            <Route path="/afiliado" element={<Afiliado />} />
            <Route path="/auth" element={<GuestGuard><Auth /></GuestGuard>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PublicLayout>
      )}

      {layoutType === 'app' && (
        <AppLayout>
          <Routes>
            <Route path="/vagas" element={<JobFeed />} />
            <Route path="/ia" element={<IaAssistant />} />
            <Route path="/criar-cv" element={<AuthGuard><CreateCV /></AuthGuard>} />
            <Route path="/modelos" element={<AuthGuard><Exemplos /></AuthGuard>} />
            <Route path="/preview" element={<AuthGuard><Preview /></AuthGuard>} />
            <Route path="/perfil" element={<Profile />} />
            <Route path="/perfil/afiliado" element={<AuthGuard><AffiliateDashboard /></AuthGuard>} />
            <Route path="/carta-apresentacao" element={<AuthGuard><CartaApresentacao /></AuthGuard>} />
            <Route path="/carta-pedido-estagio" element={<AuthGuard><CartaPedidoEstagio /></AuthGuard>} />
            <Route path="/carta-requisicao" element={<AuthGuard><CartaRequisicao /></AuthGuard>} />
            <Route path="/carta-demissao" element={<AuthGuard><CartaDemissao /></AuthGuard>} />
            <Route path="/carta-recomendacao" element={<AuthGuard><CartaRecomendacao /></AuthGuard>} />
            <Route path="/carta-pedido-bolsa" element={<AuthGuard><CartaPedidoBolsa /></AuthGuard>} />
            <Route path="/carta-agradecimento" element={<AuthGuard><CartaAgradecimento /></AuthGuard>} />
            <Route path="/comunidade" element={<AuthGuard><Comunidade /></AuthGuard>} />
            <Route path="/admin" element={<AuthGuard><AdminDashboard /></AuthGuard>} />
            <Route path="/admin/afiliados" element={<AdminGuard><AdminAffiliates /></AdminGuard>} />
            <Route path="/admin/anuncios" element={<AdminGuard><AdminAds /></AdminGuard>} />
            <Route path="/admin/carrinhos-abandonados" element={<AdminGuard><AdminAbandonedCarts /></AdminGuard>} />
            <Route path="/admin/vagas" element={<AdminGuard><AdminJobs /></AdminGuard>} />
            <Route path="/admin/blog" element={<AdminGuard><AdminBlog /></AdminGuard>} />
            <Route path="/pagamento-sucesso" element={<AuthGuard><PagamentoSucesso /></AuthGuard>} />
            <Route path="/precos" element={<AuthGuard><Pricing /></AuthGuard>} />
          </Routes>
        </AppLayout>
      )}

      {layoutType === 'print' && (
        <PrintLayout>
          <Routes>
            <Route path="/imprimir" element={<AuthGuard><PrintCV /></AuthGuard>} />
          </Routes>
        </PrintLayout>
      )}
    </>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <HelmetProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
              <FacebookPixel />
              <GlobalAdsManager />
              <ReferralTracker />
              <LayoutRouter />
            </BrowserRouter>
          </TooltipProvider>
        </HelmetProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

// Removido componente de anúncio legado que causava erro de build
export default App;
