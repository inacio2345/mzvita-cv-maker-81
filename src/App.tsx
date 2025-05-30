
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CreateCV from "./pages/CreateCV";
import Preview from "./pages/Preview";
import ComoFunciona from "./pages/ComoFunciona";
import Precos from "./pages/Precos";
import Contato from "./pages/Contato";
import Exemplos from "./pages/Exemplos";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/criar-cv" element={<CreateCV />} />
          <Route path="/preview" element={<Preview />} />
          <Route path="/como-funciona" element={<ComoFunciona />} />
          <Route path="/precos" element={<Precos />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/exemplos" element={<Exemplos />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
