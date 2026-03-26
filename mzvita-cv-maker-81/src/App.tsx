
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { AuthProvider } from "@/hooks/useAuth";
import { useIsMobile } from "@/hooks/use-mobile";
import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import AdsterraBodyAd from "@/components/ads/AdsterraBodyAd";
import PWAInstallPrompt from "@/components/PWAInstallPrompt";
import CookieBanner from "@/components/CookieBanner";
import MobileNav from "@/components/ui/mobile-nav";
import Index from "./pages/Index";
import CreateCV from "./pages/CreateCV";
import BlogPostTemplate from "./pages/BlogPostTemplate";
import Preview from "./pages/Preview";
import ComoFunciona from "./pages/ComoFunciona";
import Contato from "./pages/Contato";
import Exemplos from "./pages/Exemplos";
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
import MeuEmprego from "./pages/MeuEmprego";
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
import { useSubscription } from "@/hooks/useSubscription";
import { AuthGuard } from "@/components/auth/AuthGuard";

const queryClient = new QueryClient();

const App = () => {
  const isMobile = useIsMobile();
  
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <HelmetProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <SidebarProvider defaultOpen={!isMobile}>
                <div className="min-h-screen flex w-full overflow-x-hidden">
                  {!isMobile && <AppSidebar />}
                  <SidebarInset className="overflow-x-hidden w-full">
                    <Routes>
                      <Route path="*" element={<ConditionalHeader />} />
                    </Routes>

                    {/* Anúncio Adsterra - Logo após o header (Ocultar para usuários Premium) */}
                    <AdsterraAdWithSubscription />

                    <div className="flex flex-1 flex-col gap-4 sm:gap-6 md:gap-8 p-2 sm:p-4 md:p-6 overflow-x-hidden max-w-full">
                      <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/criar-cv" element={<AuthGuard><CreateCV /></AuthGuard>} />
                        <Route path="/meu-emprego" element={<MeuEmprego />} />
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
                        
                        {/* Rotas Protegidas de Cartas */}
                        <Route path="/carta-apresentacao" element={<AuthGuard><CartaApresentacao /></AuthGuard>} />
                        <Route path="/carta-pedido-estagio" element={<AuthGuard><CartaPedidoEstagio /></AuthGuard>} />
                        <Route path="/carta-requisicao" element={<AuthGuard><CartaRequisicao /></AuthGuard>} />
                        <Route path="/carta-demissao" element={<AuthGuard><CartaDemissao /></AuthGuard>} />
                        <Route path="/carta-recomendacao" element={<AuthGuard><CartaRecomendacao /></AuthGuard>} />
                        <Route path="/carta-pedido-bolsa" element={<AuthGuard><CartaPedidoBolsa /></AuthGuard>} />
                        <Route path="/carta-agradecimento" element={<AuthGuard><CartaAgradecimento /></AuthGuard>} />
                        
                        <Route path="/preview" element={<AuthGuard><Preview /></AuthGuard>} />
                        <Route path="/como-funciona" element={<ComoFunciona />} />
                        <Route path="/contato" element={<Contato />} />
                        <Route path="/exemplos" element={<AuthGuard><Exemplos /></AuthGuard>} />
                        <Route path="/comunidade" element={<AuthGuard><Comunidade /></AuthGuard>} />
                        <Route path="/sobre-nos" element={<SobreNos />} />
                        <Route path="/politica-de-privacidade" element={<PoliticaPrivacidade />} />
                        <Route path="/termos-de-uso" element={<TermosUso />} />
                        <Route path="/cv-mocambique" element={<CVMocambique />} />
                        <Route path="/modelo-cv-mocambique" element={<ModeloCVMocambique />} />
                        <Route path="/cv-mocambique-pdf" element={<CVMocambiquePDF />} />
                        <Route path="/exemplos-cv-mocambique" element={<ExemplosCVMocambique />} />
                        <Route path="/cv-em-ingles-mocambique" element={<CVEmInglesMocambique />} />
                        <Route path="/perfil" element={<AuthGuard><Profile /></AuthGuard>} />
                        <Route path="/precos" element={<Pricing />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </div>
                    <Routes>
                      <Route path="*" element={<ConditionalFooter />} />
                    </Routes>
                    <PWAInstallPrompt />
                    <CookieBanner />
                    {isMobile && <MobileNav />}
                  </SidebarInset>
                </div>
              </SidebarProvider>
            </BrowserRouter>
          </TooltipProvider>
        </HelmetProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

const ConditionalHeader = () => {
  const location = useLocation();
  const isCreatorPage = location.pathname === '/criar-cv';

  if (isCreatorPage) return null;
  return <Header />;
};

const ConditionalFooter = () => {
  const location = useLocation();
  const isCreatorPage = location.pathname === '/criar-cv';

  if (isCreatorPage) return null;
  return <Footer />;
};

const AdsterraAdWithSubscription = () => {
  const { isPremiumActive } = useSubscription();

  if (isPremiumActive) return null;
  return <AdsterraBodyAd />;
};

export default App;
