
import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    atOptions?: any;
  }
}

const AdRotator = () => {
  const adsterraRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const injectAdsterra = () => {
      const container = document.getElementById('container-3ab88cc45aad291af06779a7141d0c78');
      
      if (container && container.innerHTML === '') {
        // Injeção Global Blindada para a Adsterra encontrar as chaves
        window.atOptions = {
          'key' : '3ab88cc45aad291af06779a7141d0c78',
          'format' : 'iframe',
          'height' : 90,
          'width' : 728,
          'params' : {}
        };
        
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://www.highperformanceformat.com/3ab88cc45aad291af06779a7141d0c78/invoke.js';
        script.async = true;
        
        container.appendChild(script);
        console.log("ADSTERRA_ENGINE_STARTED_TOP_NESTED");
      }
    };

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
