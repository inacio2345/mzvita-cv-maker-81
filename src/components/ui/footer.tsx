import React from 'react';
import { FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import AdSpace from '@/components/ads/AdSpace';

const Footer = () => {
  const footerAdScript = `
    <script type="text/javascript">
      atOptions = {
        'key' : '544871108327156f752c8856d6a40dc6',
        'format' : 'iframe',
        'height' : 50,
        'width' : 320,
        'params' : {}
      };
    </script>
    <script type="text/javascript" src="//www.highperformanceformat.com/544871108327156f752c8856d6a40dc6/invoke.js"></script>
  `;

  return (
    <footer className="bg-gray-900 text-white py-6 sm:py-8 md:py-12">
      {/* Espaço para anúncio no footer */}
      <div className="container mx-auto px-4 mb-6">
        <AdSpace 
          id="footer-ad" 
          type="footer" 
          className="max-w-4xl mx-auto"
          scriptCode={footerAdScript}
        />
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4 justify-center sm:justify-start">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-google-blue to-google-green rounded-lg flex items-center justify-center">
                <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <span className="text-lg sm:text-xl font-bold">MzVita CV</span>
            </Link>
            <p className="text-gray-400 text-sm sm:text-base text-center sm:text-left max-w-xs mx-auto sm:mx-0">
              A melhor plataforma para criar CVs profissionais em Moçambique.
            </p>
          </div>
          <div className="text-center sm:text-left">
            <h4 className="font-semibold mb-3 sm:mb-4 text-base sm:text-lg">Produto</h4>
            <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
              <li><Link to="/como-funciona" className="hover:text-white transition-colors">Como funciona</Link></li>
              <li><Link to="/exemplos" className="hover:text-white transition-colors">Modelos</Link></li>
              <li><Link to="/precos" className="hover:text-white transition-colors">Preços</Link></li>
              <li><Link to="/criar-cv" className="hover:text-white transition-colors">Criar CV</Link></li>
            </ul>
          </div>
          <div className="text-center sm:text-left">
            <h4 className="font-semibold mb-3 sm:mb-4 text-base sm:text-lg">Suporte</h4>
            <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
              <li><Link to="/contato" className="hover:text-white transition-colors">Central de Ajuda</Link></li>
              <li><Link to="/contato" className="hover:text-white transition-colors">Contato</Link></li>
              <li>
                <a 
                  href="https://api.whatsapp.com/send?phone=258841524822&text=Ol%C3%A1%2C%20tenho%20interesse%20nos%20seus%20servi%C3%A7os.%20Pode%20me%20dar%20mais%20informa%C3%A7%C3%B5es%3F" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition-colors block"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
          <div className="text-center sm:text-left">
            <h4 className="font-semibold mb-3 sm:mb-4 text-base sm:text-lg">Legal</h4>
            <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
              <li><Link to="/termos-de-uso" className="hover:text-white transition-colors">Termos de Uso</Link></li>
              <li><Link to="/politica-de-privacidade" className="hover:text-white transition-colors">Privacidade</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-gray-400 text-xs sm:text-sm md:text-base">
          <p>&copy; 2024 MzVita CV. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
