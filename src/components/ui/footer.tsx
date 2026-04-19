import React from 'react';
import { Link } from 'react-router-dom';
import UniversalAd from '../ads/UniversalAd';

const Footer = () => {
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

  return (
    <footer className="bg-slate-900 text-white py-12 border-t border-slate-800">
      <div className="container mx-auto px-4">
        {/* Universal Ad Section - Collapses gracefully if null */}
        <UniversalAd slotName="footer" className="mb-12" fallbackHeight="250px" />

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
              <li><Link to="/afiliado" className="hover:text-emerald-400 transition-colors font-medium">💰 Programa de Afiliados</Link></li>
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
