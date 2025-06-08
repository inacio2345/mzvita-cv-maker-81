import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import CreateCV from "./pages/CreateCV";
import Preview from "./pages/Preview";
import ComoFunciona from "./pages/ComoFunciona";
import Precos from "./pages/Precos";
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
import AreaProfissional from "./pages/AreaProfissional";
import Blog from "./pages/Blog";
import MeuEmprego from "./pages/MeuEmprego";
import NotFound from "./pages/NotFound";
import CVProfissionalMocambique from "./pages/blog/CVProfissionalMocambique";
import ErrosComuns from "./pages/blog/ErrosComuns";
import CVSemExperiencia from "./pages/blog/CVSemExperiencia";
import TendenciasMercado2024 from "./pages/blog/TendenciasMercado2024";
import AdaptarCVPorArea from "./pages/blog/AdaptarCVPorArea";
import FotoNoCurriculo from "./pages/blog/FotoNoCurriculo";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SidebarProvider>
            <div className="min-h-screen flex w-full">
              <AppSidebar />
              <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 px-4 border-b">
                  <SidebarTrigger className="-ml-1" />
                  <div className="ml-auto">
                    <h1 className="text-lg font-semibold">MozVita</h1>
                  </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/criar-cv" element={<CreateCV />} />
                    <Route path="/area-profissional" element={<AreaProfissional />} />
                    <Route path="/meu-emprego" element={<MeuEmprego />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/cv-profissional-mocambique" element={<CVProfissionalMocambique />} />
                    <Route path="/blog/erros-comuns" element={<ErrosComuns />} />
                    <Route path="/blog/cv-sem-experiencia" element={<CVSemExperiencia />} />
                    <Route path="/blog/tendencias-mercado-2024" element={<TendenciasMercado2024 />} />
                    <Route path="/blog/adaptar-cv-por-area" element={<AdaptarCVPorArea />} />
                    <Route path="/blog/foto-no-curriculo" element={<FotoNoCurriculo />} />
                    <Route path="/carta-apresentacao" element={<CartaApresentacao />} />
                    <Route path="/carta-pedido-estagio" element={<CartaPedidoEstagio />} />
                    <Route path="/carta-requisicao" element={<CartaRequisicao />} />
                    <Route path="/carta-demissao" element={<CartaDemissao />} />
                    <Route path="/carta-recomendacao" element={<CartaRecomendacao />} />
                    <Route path="/carta-pedido-bolsa" element={<CartaPedidoBolsa />} />
                    <Route path="/carta-agradecimento" element={<CartaAgradecimento />} />
                    <Route path="/preview" element={<Preview />} />
                    <Route path="/como-funciona" element={<ComoFunciona />} />
                    <Route path="/precos" element={<Precos />} />
                    <Route path="/contato" element={<Contato />} />
                    <Route path="/exemplos" element={<Exemplos />} />
                    <Route path="/politica-de-privacidade" element={<PoliticaPrivacidade />} />
                    <Route path="/termos-de-uso" element={<TermosUso />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </div>
              </SidebarInset>
            </div>
          </SidebarProvider>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
