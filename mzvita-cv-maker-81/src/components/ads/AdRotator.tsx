
import React, { useEffect, useState, useRef } from 'react';
import { useSubscription } from '@/hooks/useSubscription';

const AdRotator = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cleverRef = useRef<HTMLDivElement>(null);
  const adsterraRef = useRef<HTMLDivElement>(null);
  const { isPremiumActive } = useSubscription();

  useEffect(() => {
    console.log("AD_ROTATOR_NESTED_ACTIVE");
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? 1 : 0));
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  // No checks for diagnostics

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

      <div className="relative w-full max-w-[728px] min-h-[90px] bg-slate-50/50 rounded-lg shadow-sm border border-slate-100 overflow-visible">
        <div 
          ref={cleverRef} 
          id="clever-ad-container"
          className={`absolute inset-0 w-full h-full flex justify-center items-center transition-all duration-1000 ${
            currentIndex === 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
          }`}
        />
        
        {/* Slot Adsterra */}
        <div 
          ref={adsterraRef} 
          id="container-3ab88cc45aad291af06779a7141d0c78"
          className={`absolute inset-0 w-full h-full flex justify-center items-center transition-all duration-1000 ${
            currentIndex === 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
          }`}
        />
        <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-slate-100">
          <div 
            key={currentIndex}
            className="h-full bg-google-blue/30"
            style={{ animation: 'progress 6s linear forward' }}
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
