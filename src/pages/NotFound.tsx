import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, FileText, BookOpen, Mail } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md w-full">
        <h1 className="text-6xl font-black text-gray-200 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Página não encontrada</h2>
        <p className="text-gray-600 mb-8">
          A página que você procura pode ter sido movida ou não existe mais.
          Que tal voltar para o início ou explorar nossas ferramentas?
        </p>

        <div className="grid gap-3 w-full">
          <Link to="/">
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              <Home className="mr-2 h-4 w-4" />
              Voltar ao Início
            </Button>
          </Link>

          <Link to="/criar-cv">
            <Button variant="outline" className="w-full">
              <FileText className="mr-2 h-4 w-4" />
              Criar Meu Currículo
            </Button>
          </Link>

          <Link to="/blog">
            <Button variant="outline" className="w-full">
              <BookOpen className="mr-2 h-4 w-4" />
              Ler Artigos de Carreira
            </Button>
          </Link>

          <Link to="/contato">
            <Button variant="ghost" className="w-full text-gray-500 hover:text-gray-700">
              <Mail className="mr-2 h-4 w-4" />
              Precisa de ajuda? Fale Conosco
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
