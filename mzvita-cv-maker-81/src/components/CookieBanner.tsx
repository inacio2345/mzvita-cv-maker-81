
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
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
    <>
      {/* Backdrop for mobile only to focus attention and avoid conflicts */}
      <div className="lg:hidden fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[115] animate-in fade-in duration-300" />
      
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[400px] lg:top-auto lg:bottom-6 lg:left-1/2 lg:-translate-y-0 lg:w-max lg:max-w-4xl bg-slate-900/95 backdrop-blur-md text-white p-6 lg:p-6 z-[120] flex flex-col lg:flex-row justify-between items-center gap-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-3xl border border-white/10 animate-in fade-in zoom-in-95 duration-500">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 text-center lg:text-left">
          <div className="bg-blue-500/20 p-3 rounded-2xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="font-bold text-lg lg:hidden">Privacidade e Cookies</h3>
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
        </div>
        <div className="flex gap-2 w-full lg:w-auto mt-2 lg:mt-0">
          <Button
            onClick={acceptCookies}
            size="sm"
            className="w-full lg:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold px-10 py-6 h-auto rounded-2xl shadow-lg shadow-blue-600/20 transition-all active:scale-95"
          >
            Entendido
          </Button>
        </div>
      </div>
    </>
  );
};

export default CookieBanner;