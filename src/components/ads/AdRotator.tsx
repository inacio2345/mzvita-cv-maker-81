
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
    <div className="w-full flex flex-col justify-center items-center overflow-visible min-h-[90px] pb-8 pt-4 z-[130] bg-transparent">
      <div className="text-[10px] uppercase tracking-[0.3em] text-slate-400 mb-3 font-black opacity-40 select-none">
        Publicidade MozVita
      </div>
      <div className="relative w-full max-w-[320px] h-[50px] shadow-[0_10px_30px_-15px_rgba(0,0,0,0.2)] rounded-lg overflow-hidden bg-white/5 backdrop-blur-sm border border-white/5 flex justify-center items-center">
        {/* Clever Ad Slot */}
        <div 
          ref={cleverRef} 
          id="clever-slot"
          className={`absolute inset-0 w-full h-full flex justify-center items-center transition-all duration-700 transform ${
            currentIndex === 0 ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-2 pointer-events-none'
          }`}
        />
        
        {/* Adsterra Ad Slot */}
        <div 
          ref={adsterraRef} 
          id="adsterra-slot"
          className={`absolute inset-0 w-full h-full flex justify-center items-center transition-all duration-700 transform ${
            currentIndex === 1 ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-2 pointer-events-none'
          }`}
        />
      </div>
    </div>
  );
};

export default AdRotator;
