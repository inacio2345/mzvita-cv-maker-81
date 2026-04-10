
import React, { useEffect, useState, useRef } from 'react';

const AdRotator = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cleverRef = useRef<HTMLDivElement>(null);
  const adsterraRef = useRef<HTMLDivElement>(null);
  
  // LOG DE DIAGNÓSTICO FINAL (v2.0.0)
  console.log("AD_ROTATOR_NESTED_v2_ACTIVE");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? 1 : 0));
    }, 6000);

    // INJEÇÃO NO HEAD - CLEVER (Formato PushDown exige estar no topo)
    const injectCleverHead = () => {
      if (document.getElementById('CleverCoreLoader101963_nested')) return;
      
      const script = document.createElement('script');
      script.id = 'CleverCoreLoader101963_nested';
      script.src = 'https://scripts.cleverwebserver.com/e33df5c988bded1f653fd89a591de8db.js';
      script.async = true;
      script.type = 'text/javascript';
      script.setAttribute('data-target', window.name || '');
      
      const firstScript = document.head.getElementsByTagName('script')[0];
      if (firstScript) {
        firstScript.parentNode?.insertBefore(script, firstScript);
      } else {
        document.head.appendChild(script);
      }
    };

    // INJEÇÃO NO CONTENTOR - ADSTERRA (Meme Coin)
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

    setTimeout(() => {
      injectCleverHead();
      injectAdsterra();
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex flex-col justify-center items-center overflow-visible min-h-[140px] pb-12 pt-4 z-[130] bg-transparent">
      {/* Header com indicador de rotação */}
      <div className="flex items-center gap-3 mb-4">
        <div className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${currentIndex === 0 ? 'text-blue-500 scale-110' : 'text-slate-500 opacity-20'}`}>
          Anúncio 1
        </div>
        <div className="flex gap-1.5 px-2">
          <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${currentIndex === 0 ? 'bg-blue-500 scale-125' : 'bg-slate-300'}`} />
          <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${currentIndex === 1 ? 'bg-orange-500 scale-125' : 'bg-slate-300'}`} />
        </div>
        <div className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${currentIndex === 1 ? 'text-orange-500 scale-110' : 'text-slate-500 opacity-20'}`}>
          Anúncio 2
        </div>
      </div>

      {/* Container Principal do Anúncio - Medidas fixas para Mobile */}
      <div className="relative w-full max-w-[728px] min-w-[320px] min-h-[90px] shadow-sm rounded-xl overflow-visible bg-slate-100/30 flex justify-center items-center mx-auto">
        
        {/* Slot Ads */}
        <div 
          ref={cleverRef} 
          id="clever-ad-container"
          className={`absolute inset-0 w-full h-full flex justify-center items-center transition-all duration-1000 ${
            currentIndex === 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
          }`}
          style={{ minHeight: '90px' }}
        />
        
        {/* Slot Ads */}
        <div 
          ref={adsterraRef} 
          id="container-3ab88cc45aad291af06779a7141d0c78"
          className={`absolute inset-0 w-full h-full flex justify-center items-center transition-all duration-1000 ${
            currentIndex === 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
          }`}
          style={{ minHeight: '90px' }}
        />

        {/* Barra de Progresso */}
        <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-[60%] h-[2px] bg-slate-200 rounded-full overflow-hidden">
          <div 
            key={currentIndex}
            className="h-full bg-slate-400/50"
            style={{ 
              animation: 'progress 6s linear forwards'
            }}
          />
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}} />
    </div>
  );
};

export default AdRotator;
