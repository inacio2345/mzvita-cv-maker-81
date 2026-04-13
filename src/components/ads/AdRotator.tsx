
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
      const container = document.getElementById('container-3ab88cc45aad291af06779a7141d0c78');
      
      if (container && container.innerHTML === '') {
        // 1. Definimos no objeto global do navegador para que o script o encontre sem falhas
        window.atOptions = {
          'key' : '3ab88cc45aad291af06779a7141d0c78',
          'format' : 'iframe',
          'height' : 90,
          'width' : 728,
          'params' : {}
        };
        
        // 2. Criamos o script de execução
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://www.highperformanceformat.com/3ab88cc45aad291af06779a7141d0c78/invoke.js';
        script.async = true;
        
        container.appendChild(script);
        console.log("ADSTERRA_ENGINE_STARTED_TOP");
      }
    };

    // Pequeno fôlego para o DOM estabilizar
    const timeout = setTimeout(injectAdsterra, 500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="w-full flex justify-center items-center overflow-hidden min-h-[90px] py-4 bg-transparent">
      <div className="relative w-full max-w-[728px] min-w-[320px] min-h-[90px] flex justify-center items-center mx-auto">
        <div 
          ref={adsterraRef} 
          id="container-3ab88cc45aad291af06779a7141d0c78"
          className="w-full h-full flex justify-center items-center"
          style={{ minHeight: '90px' }}
        />
      </div>
    </div>
  );
};

export default AdRotator;
