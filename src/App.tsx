
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "./components/ui/header"
import Footer from "./components/ui/footer"
import Index from "./pages/Index"
import CreateCV from "./pages/CreateCV"
import Preview from "./pages/Preview"
import ComoFunciona from "./pages/ComoFunciona"
import Precos from "./pages/Precos"
import Contato from "./pages/Contato"
import Exemplos from "./pages/Exemplos"
import Blog from "./pages/Blog"
import AreaProfissional from "./pages/AreaProfissional"
import ProfessionalProfile from "./pages/ProfessionalProfile"
import Profile from "./pages/Profile"
import NotFound from "./pages/NotFound"
import PoliticaPrivacidade from "./pages/PoliticaPrivacidade"
import TermosUso from "./pages/TermosUso"
import MeuEmprego from "./pages/MeuEmprego"

// Importações das páginas do blog
import CVProfissionalMocambique from "./pages/blog/CVProfissionalMocambique"
import CVSemExperiencia from "./pages/blog/CVSemExperiencia"
import ErrosComuns from "./pages/blog/ErrosComuns"
import FotoNoCurriculo from "./pages/blog/FotoNoCurriculo"
import TendenciasMercado2024 from "./pages/blog/TendenciasMercado2024"
import AdaptarCVPorArea from "./pages/blog/AdaptarCVPorArea"

// Importações das páginas de cartas
import CartaApresentacao from "./pages/CartaApresentacao"
import CartaPedidoEstagio from "./pages/CartaPedidoEstagio"
import CartaRequisicao from "./pages/CartaRequisicao"
import CartaDemissao from "./pages/CartaDemissao"
import CartaRecomendacao from "./pages/CartaRecomendacao"
import CartaPedidoBolsa from "./pages/CartaPedidoBolsa"
import CartaAgradecimento from "./pages/CartaAgradecimento"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <Routes>
              {/* Rotas principais */}
              <Route path="/" element={<><Header /><Index /><Footer /></>} />
              <Route path="/criar-cv" element={<CreateCV />} />
              <Route path="/meu-emprego" element={<MeuEmprego />} />
              <Route path="/preview" element={<Preview />} />
              <Route path="/como-funciona" element={<><Header /><ComoFunciona /><Footer /></>} />
              <Route path="/precos" element={<><Header /><Precos /><Footer /></>} />
              <Route path="/contato" element={<><Header /><Contato /><Footer /></>} />
              <Route path="/exemplos" element={<><Header /><Exemplos /><Footer /></>} />
              <Route path="/blog" element={<><Header /><Blog /><Footer /></>} />
              <Route path="/area-profissional" element={<AreaProfissional />} />
              <Route path="/perfil-profissional" element={<ProfessionalProfile />} />
              <Route path="/perfil" element={<Profile />} />
              <Route path="/politica-de-privacidade" element={<><Header /><PoliticaPrivacidade /><Footer /></>} />
              <Route path="/termos-de-uso" element={<><Header /><TermosUso /><Footer /></>} />
              
              {/* Rotas do blog */}
              <Route path="/blog/cv-profissional-mocambique" element={<><Header /><CVProfissionalMocambique /><Footer /></>} />
              <Route path="/blog/cv-sem-experiencia" element={<><Header /><CVSemExperiencia /><Footer /></>} />
              <Route path="/blog/erros-comuns-cv" element={<><Header /><ErrosComuns /><Footer /></>} />
              <Route path="/blog/foto-no-curriculo" element={<><Header /><FotoNoCurriculo /><Footer /></>} />
              <Route path="/blog/tendencias-mercado-2024" element={<><Header /><TendenciasMercado2024 /><Footer /></>} />
              <Route path="/blog/adaptar-cv-por-area" element={<><Header /><AdaptarCVPorArea /><Footer /></>} />
              
              {/* Rotas das cartas */}
              <Route path="/carta-apresentacao" element={<CartaApresentacao />} />
              <Route path="/carta-pedido-estagio" element={<CartaPedidoEstagio />} />
              <Route path="/carta-requisicao" element={<CartaRequisicao />} />
              <Route path="/carta-demissao" element={<CartaDemissao />} />
              <Route path="/carta-recomendacao" element={<CartaRecomendacao />} />
              <Route path="/carta-pedido-bolsa" element={<CartaPedidoBolsa />} />
              <Route path="/carta-agradecimento" element={<CartaAgradecimento />} />
              
              {/* Rota 404 */}
              <Route path="*" element={<><Header /><NotFound /><Footer /></>} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  )
}

export default App
