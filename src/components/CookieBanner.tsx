import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if cookies have been accepted previously
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (cookiesAccepted !== 'true') {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    setIsVisible(false);
    localStorage.setItem('cookiesAccepted', 'true');
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-[110px] lg:bottom-6 left-4 right-4 lg:left-1/2 lg:-translate-x-1/2 lg:w-max lg:max-w-4xl bg-slate-900/95 backdrop-blur-md text-white p-4 lg:p-6 z-[120] flex flex-col lg:flex-row justify-between items-center gap-4 shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-3xl border border-white/10 animate-in fade-in slide-in-from-bottom-5 duration-500">
      <div className="flex items-start gap-3">
        <div className="bg-blue-500/20 p-2 rounded-xl hidden sm:block">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        </div>
        <span className="text-sm leading-relaxed text-slate-300">
          Este site utiliza cookies para melhorar sua experiência. Ao continuar navegando, você concorda com o uso de cookies. Leia nossa{' '}
          <Link 
            to="/politica-de-privacidade" 
            className="text-white font-bold underline decoration-blue-500/50 hover:decoration-blue-500 transition-all"
          >
            Política de Privacidade
          </Link>
          .
        </span>
      </div>
      <div className="flex gap-2 w-full lg:w-auto">
        <Button
          onClick={acceptCookies}
          size="sm"
          className="w-full lg:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 h-auto rounded-xl shadow-lg shadow-blue-600/20 transition-all active:scale-95"
        >
          Entendido
        </Button>
      </div>
    </div>
  );
};

export default CookieBanner;