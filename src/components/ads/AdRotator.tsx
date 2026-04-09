
import React, { useEffect, useState, useRef } from 'react';
import { useSubscription } from '@/hooks/useSubscription';

const AdRotator = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cleverRef = useRef<HTMLDivElement>(null);
  const adsterraRef = useRef<HTMLDivElement>(null);
  const { isPremiumActive } = useSubscription();

  useEffect(() => {
    if (isPremiumActive) return;

    // --- Inject Clever Script ---
    if (cleverRef.current) {
      const script = document.createElement('script');
      script.dataset.cfasync = "false";
      script.type = "text/javascript";
      script.id = "clever-core";
      script.innerHTML = `
        (function (document, window) {
            var a, c = document.createElement("script"), f = window.frameElement;
            c.id = "CleverCoreLoader101963";
            c.src = "https://scripts.cleverwebserver.com/e33df5c988bded1f653fd89a591de8db.js";
            c.async = !0;
            c.type = "text/javascript";
            c.setAttribute("data-target", window.name || (f && f.getAttribute("id")));
            c.setAttribute("data-callback", "put-your-callback-function-here");
            c.setAttribute("data-callback-url-click", "put-your-click-macro-here");
            c.setAttribute("data-callback-url-view", "put-your-view-macro-here");
            try {
                a = parent.document.getElementsByTagName("script")[0] || document.getElementsByTagName("script")[0];
            } catch (e) {
                a = !1;
            }
            a || (a = document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]);
            a.parentNode.insertBefore(c, a);
        })(document, window);
      `;
      cleverRef.current.appendChild(script);
    }

    // --- Inject Adsterra Script ---
    if (adsterraRef.current) {
      // Configuration script
      const configScript = document.createElement('script');
      configScript.type = "text/javascript";
      configScript.innerHTML = `
        atOptions = {
          'key' : '544871108327156f752c8856d6a40dc6',
          'format' : 'iframe',
          'height' : 50,
          'width' : 320,
          'params' : {}
        };
      `;
      adsterraRef.current.appendChild(configScript);

      // Invoke script
      const invokeScript = document.createElement('script');
      invokeScript.type = "text/javascript";
      invokeScript.src = "//www.highperformanceformat.com/544871108327156f752c8856d6a40dc6/invoke.js";
      adsterraRef.current.appendChild(invokeScript);
    }

    // --- Rotation Logic ---
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? 1 : 0));
    }, 4000);

    return () => clearInterval(interval);
  }, [isPremiumActive]);

  if (isPremiumActive) return null;

  return (
    <div className="w-full flex flex-col justify-center items-center overflow-visible min-h-[120px] pb-10 pt-4 z-[130] bg-transparent">
      {/* Header com indicador de rotação */}
      <div className="flex items-center gap-3 mb-4">
        <div className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${currentIndex === 0 ? 'text-blue-500 scale-110' : 'text-slate-500 opacity-30'}`}>
          Clever
        </div>
        <div className="flex gap-1.5 px-2">
          <div className={`w-2 h-2 rounded-full transition-all duration-500 ${currentIndex === 0 ? 'bg-blue-500 scale-125 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-slate-700'}`} />
          <div className={`w-2 h-2 rounded-full transition-all duration-500 ${currentIndex === 1 ? 'bg-orange-500 scale-125 shadow-[0_0_10px_rgba(249,115,22,0.5)]' : 'bg-slate-700'}`} />
        </div>
        <div className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${currentIndex === 1 ? 'text-orange-500 scale-110' : 'text-slate-500 opacity-30'}`}>
          Adsterra
        </div>
      </div>

      {/* Container Principal do Anúncio */}
      <div className="relative w-full max-w-[320px] h-[50px] shadow-[0_15px_40px_-15px_rgba(0,0,0,0.4)] rounded-xl overflow-visible bg-slate-800/20 backdrop-blur-md border border-white/5 flex justify-center items-center group">
        
        {/* Slot Clever */}
        <div 
          ref={cleverRef} 
          id="clever-slot"
          className={`absolute inset-0 w-full h-full flex justify-center items-center transition-all duration-1000 transform ${
            currentIndex === 0 ? 'opacity-100 scale-100 translate-x-0' : 'opacity-0 scale-90 -translate-x-10 pointer-events-none'
          }`}
        />
        
        {/* Slot Adsterra */}
        <div 
          ref={adsterraRef} 
          id="adsterra-slot"
          className={`absolute inset-0 w-full h-full flex justify-center items-center transition-all duration-1000 transform ${
            currentIndex === 1 ? 'opacity-100 scale-100 translate-x-0' : 'opacity-0 scale-90 translate-x-10 pointer-events-none'
          }`}
        />

        {/* Barra de Progresso dos 4 segundos */}
        <div className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 w-[80%] h-[2px] bg-slate-800 rounded-full overflow-hidden opacity-50">
          <div 
            key={currentIndex}
            className="h-full bg-white/40"
            style={{ 
              animation: 'progress 4s linear forward'
            }}
          />
        </div>
      </div>
      
      {/* Estilo local para a animação da barra */}
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
