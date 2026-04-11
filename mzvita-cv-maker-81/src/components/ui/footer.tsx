
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  
  useEffect(() => {
    // 1. Injeção Adsterra (Banner de Rodapé)
    const injectFooterAdsterra = () => {
      const container = document.getElementById('container-544871108327156f752c8856d6a40dc6');
      if (container && !container.innerHTML.includes('invoke.js')) {
        const scriptConfig = document.createElement('script');
        scriptConfig.type = 'text/javascript';
        scriptConfig.innerHTML = `
          atOptions = {
            'key' : '544871108327156f752c8856d6a40dc6',
            'format' : 'iframe',
            'height' : 50,
            'width' : 320,
            'params' : {}
          };
        `;
        
        const scriptInvoke = document.createElement('script');
        scriptInvoke.type = 'text/javascript';
        scriptInvoke.src = '//www.highperformanceformat.com/544871108327156f752c8856d6a40dc6/invoke.js';
        
        container.appendChild(scriptConfig);
        container.appendChild(scriptInvoke);
      }
    };

    // 2. Injeção OFICIAL Clever (Conforme instruções: "Antes do </body>")
    const injectOfficialClever = () => {
      if (document.getElementById('CleverCoreLoader101963_nested')) return;

      const script = document.createElement('script');
      script.id = 'CleverCoreLoader101963_nested';
      script.src = 'https://scripts.cleverwebserver.com/e33df5c988bded1f653fd89a591de8db.js';
      script.async = true;
      script.type = 'text/javascript';
      
      script.setAttribute('data-target', window.name || '');
      script.setAttribute('data-callback', 'put-your-callback-function-here');
      script.setAttribute('data-callback-url-click', 'put-your-click-macro-here');
      script.setAttribute('data-callback-url-view', 'put-your-view-macro-here');

      document.body.appendChild(script);
      console.log("CLEVER_OFFICIAL_LOADED_FOOTER_NESTED");
    };

    setTimeout(() => {
      injectFooterAdsterra();
      injectOfficialClever();
    }, 3000);
  }, []);

  return (
    <footer className="bg-gray-900 text-white py-6 sm:py-8 md:py-12 overflow-x-hidden">
      <div className="container mx-auto px-4 overflow-x-hidden max-w-full">
        
        {/* Adsterra Footer Banner */}
        <div className="w-full flex justify-center mb-10 overflow-hidden min-h-[60px]">
          <div id="container-544871108327156f752c8856d6a40dc6" className="flex justify-center items-center w-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4 justify-center sm:justify-start">
              <img src="/logo.png" alt="MozVita Logo" className="h-24 w-auto object-contain" />
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
              <li><Link to="/sobre-nos" className="hover:text-white transition-colors">Sobre Nós</Link></li>
              <li><Link to="/criar-cv" className="hover:text-white transition-colors">Criar CV</Link></li>
            </ul>
          </div>
          <div className="text-center sm:text-left">
            <h4 className="font-semibold mb-3 sm:mb-4 text-base sm:text-lg">Suporte</h4>
            <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
              <li><Link to="/contato" className="hover:text-white transition-colors">Central de Ajuda</Link></li>
              <li><Link to="/contato" className="hover:text-white transition-colors">Contato</Link></li>
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
