
import React, { useEffect, useState, useRef } from 'react';

const AdRotator = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const adsterraRef = useRef<HTMLDivElement>(null);
  
  // LOG DE DIAGNÓSTICO (V3.0.0 - CLEAN STATE)
  console.log("AD_ROTATOR_CLEAN_STATE_ACTIVE");

  useEffect(() => {
    // Apenas Adsterra ativo nesta fase de limpeza
    const injectAdsterra = () => {
      const container = document.getElementById('container-3ab88cc45aad291af06779a7141d0c78');
      if (container && !container.innerHTML.includes('invoke.js')) {
        const scriptConfig = document.createElement('script');
        scriptConfig.type = 'text/javascript';
        scriptConfig.innerHTML = `
          atOptions = {
            'key' : '3ab88cc45aad291af06779a7141d0c78',
            'format' : 'iframe',
            'height' : 50,
            'width' : 320,
            'params' : {}
          };
        `;
        
        const scriptInvoke = document.createElement('script');
        scriptInvoke.type = 'text/javascript';
        scriptInvoke.src = '//www.highperformanceformat.com/3ab88cc45aad291af06779a7141d0c78/invoke.js';
        
        container.appendChild(scriptConfig);
        container.appendChild(scriptInvoke);
      }
    };

    setTimeout(injectAdsterra, 2000);

    // Rotação desativada temporariamente por haver apenas 1 rede
  }, []);

  return (
    <div className="w-full flex flex-col justify-center items-center overflow-visible min-h-[140px] pb-12 pt-4 z-[130] bg-transparent">
      {/* Header com indicador de estado */}
      <div className="flex items-center gap-3 mb-4">
        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500 scale-110">
          Publicidade MozVita
        </div>
      </div>

      {/* Container Principal do Anúncio */}
      <div className="relative w-full max-w-[728px] min-w-[320px] min-h-[90px] shadow-sm rounded-xl overflow-visible bg-slate-100/30 flex justify-center items-center mx-auto">
        
        {/* Slot Adsterra Único */}
        <div 
          ref={adsterraRef} 
          id="container-3ab88cc45aad291af06779a7141d0c78"
          className="w-full h-full flex justify-center items-center opacity-100 scale-100"
          style={{ minHeight: '90px', display: 'flex' }}
        />

        {/* Barra de Progresso (Estática) */}
        <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-[60%] h-[2px] bg-slate-200 rounded-full overflow-hidden">
          <div className="h-full bg-orange-500/30 w-full" />
        </div>
      </div>
    </div>
  );
};

export default AdRotator;
