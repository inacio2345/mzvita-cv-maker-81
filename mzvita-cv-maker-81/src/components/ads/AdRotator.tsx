
import React, { useEffect, useState, useRef } from 'react';
import { useSubscription } from '@/hooks/useSubscription';

const AdRotator = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cleverRef = useRef<HTMLDivElement>(null);
  const adsterraRef = useRef<HTMLDivElement>(null);
  const { isPremiumActive } = useSubscription();

  useEffect(() => {
    // Inject Clever Script
    if (cleverRef.current && !cleverRef.current.innerHTML) {
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

    // Inject Adsterra Script
    if (adsterraRef.current && !adsterraRef.current.innerHTML) {
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

      const invokeScript = document.createElement('script');
      invokeScript.type = "text/javascript";
      invokeScript.src = "//www.highperformanceformat.com/544871108327156f752c8856d6a40dc6/invoke.js";
      adsterraRef.current.appendChild(invokeScript);
    }

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? 1 : 0));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex flex-col justify-center items-center overflow-visible min-h-[110px] pb-4 pt-2 z-[130] bg-slate-50/50 border-b border-google-blue/10">
      <div className="flex items-center gap-3 mb-2">
        <div className={`text-[9px] font-black uppercase tracking-widest transition-all duration-300 ${currentIndex === 0 ? 'text-google-blue scale-110' : 'text-slate-400 opacity-40'}`}>
          Clever
        </div>
        <div className="flex gap-1.5">
          <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${currentIndex === 0 ? 'bg-google-blue scale-125 shadow-[0_0_8px_rgba(66,133,244,0.5)]' : 'bg-slate-300'}`} />
          <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${currentIndex === 1 ? 'bg-google-yellow scale-125 shadow-[0_0_8px_rgba(251,188,4,0.5)]' : 'bg-slate-300'}`} />
        </div>
        <div className={`text-[9px] font-black uppercase tracking-widest transition-all duration-300 ${currentIndex === 1 ? 'text-google-yellow scale-110' : 'text-slate-400 opacity-40'}`}>
          Adsterra
        </div>
      </div>

      <div className="relative w-full max-w-[320px] h-[50px] bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden">
        <div 
          ref={cleverRef} 
          className={`absolute inset-0 w-full h-full flex justify-center items-center transition-all duration-1000 ${
            currentIndex === 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
          }`}
        />
        <div 
          ref={adsterraRef} 
          className={`absolute inset-0 w-full h-full flex justify-center items-center transition-all duration-1000 ${
            currentIndex === 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
          }`}
        />
        <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-slate-100">
          <div 
            key={currentIndex}
            className="h-full bg-google-blue/30"
            style={{ animation: 'progress 4s linear forward' }}
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
