import React from 'react';
import AdsterraIframe from './AdsterraIframe';

const AdRotator = () => {
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

  return (
    <div className="w-full bg-white border-b border-slate-100 shadow-sm transition-all duration-700 animate-in fade-in slide-in-from-top-4 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-2 py-2 sm:py-3 text-center">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2 inline-block opacity-90">Publicidade</span>
        <div className="relative w-full flex justify-center items-center mx-auto overflow-hidden rounded-lg bg-slate-50 ring-1 ring-slate-100 shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)]" style={{ minHeight: isMobile ? '50px' : '90px' }}>
          <AdsterraIframe 
            adKey="544871108327156f752c8856d6a40dc6"
            format="iframe"
            width={isMobile ? 320 : 728}
            height={isMobile ? 50 : 90}
          />
        </div>
      </div>
    </div>
  );
};

export default AdRotator;
