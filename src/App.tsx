
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Index from "./pages/Index";
import CreateCV from "./pages/CreateCV";
import Preview from "./pages/Preview";
import ComoFunciona from "./pages/ComoFunciona";
import Precos from "./pages/Precos";
import Contato from "./pages/Contato";
import Exemplos from "./pages/Exemplos";
import PoliticaPrivacidade from "./pages/PoliticaPrivacidade";
import TermosUso from "./pages/TermosUso";
import ProfessionalProfile from "./pages/ProfessionalProfile";
import CartaApresentacao from "./pages/CartaApresentacao";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
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
                    <Route path="/carta-apresentacao" element={<CartaApresentacao />} />
                    <Route path="/preview" element={<Preview />} />
                    <Route path="/como-funciona" element={<ComoFunciona />} />
                    <Route path="/precos" element={<Precos />} />
                    <Route path="/contato" element={<Contato />} />
                    <Route path="/exemplos" element={<Exemplos />} />
                    <Route path="/politica-de-privacidade" element={<PoliticaPrivacidade />} />
                    <Route path="/termos-de-uso" element={<TermosUso />} />
                    <Route path="/perfil" element={<ProfessionalProfile />} />
                    <Route path="/perfil-profissional" element={<ProfessionalProfile />} />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </div>
              </SidebarInset>
            </div>
          </SidebarProvider>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
