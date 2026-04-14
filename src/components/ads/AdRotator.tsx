
import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    atOptions?: any;
  }
}

const AdRotator = () => {
  const adsterraRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // MÉTODO EXPERT: Injeção Global Blindada
    const injectAdsterra = () => {
      const container = document.getElementById('container-544871108327156f752c8856d6a40dc6');
      
      if (container && container.innerHTML === '') {
        window.atOptions = {
          'key' : '544871108327156f752c8856d6a40dc6',
          'format' : 'iframe',
          'height' : 90,
          'width' : 728,
          'params' : {}
        };
        
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://www.highperformanceformat.com/544871108327156f752c8856d6a40dc6/invoke.js';
        script.async = true;
        
        container.appendChild(script);
        console.log("ADSTERRA_ENGINE_STARTED_TOP");
      }
    };

    // Pequeno fôlego para o DOM estabilizar - REDUZIDO para 100ms
    const timeout = setTimeout(injectAdsterra, 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="w-full bg-slate-50/50 border-y border-slate-100/80 transition-all duration-500 overflow-hidden">
      <div className="container mx-auto px-4 py-2">
        <div className="flex flex-col items-center">
          <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest mb-1.5 self-center">Publicidade</span>
          <div className="relative w-full max-w-[728px] min-w-[320px] flex justify-center items-center mx-auto overflow-hidden rounded-lg shadow-sm border border-slate-100 bg-white">
            <div 
              ref={adsterraRef} 
              id="container-544871108327156f752c8856d6a40dc6"
              className="w-full h-full flex justify-center items-center"
              style={{ minHeight: '90px' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdRotator;
