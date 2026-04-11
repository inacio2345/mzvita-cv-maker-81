
import React, { useEffect, useState, useRef } from 'react';

const AdRotator = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const adsterraRef = useRef<HTMLDivElement>(null);
  
  // LOG DE DIAGNÓSTICO PROFUNDO
  console.log("AD_ROTATOR_VISIBILITY_TEST_ACTIVE");

  useEffect(() => {
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
        console.log("ADSTERRA_SCRIPTS_APPENDED");
      }
    };

    const timer = setTimeout(injectAdsterra, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full flex flex-col justify-center items-center overflow-visible min-h-[120px] pb-8 pt-4 z-[9999] bg-transparent">
      {/* Texto de diagnóstico para o utilizador */}
      <span className="text-[8px] text-gray-300 mb-1">Zona de Adsterra (Se vir isto e não o anúncio, verifique o AdBlock)</span>
      
      {/* Container com Borda de Teste (Remover depois de confirmar) */}
      <div className="relative w-full max-w-[728px] min-w-[320px] min-h-[90px] border-2 border-dashed border-red-500/30 flex justify-center items-center mx-auto">
        
        {/* Slot Adsterra */}
        <div 
          ref={adsterraRef} 
          id="container-3ab88cc45aad291af06779a7141d0c78"
          className="w-full h-full flex justify-center items-center"
          style={{ minHeight: '90px', display: 'flex' }}
        />
      </div>
    </div>
  );
};

export default AdRotator;
