import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Advertisement } from '@/types/ads';

interface UniversalAdProps {
  slotName: string;
  className?: string;
  fallbackHeight?: string; 
}

const UniversalAd: React.FC<UniversalAdProps> = ({ slotName, className = '', fallbackHeight = 'auto' }) => {
  const [ad, setAd] = useState<Advertisement | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);

  // 1. Deteção de Ecrã (Responsividade)
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 2. Buscar o anúncio ativo para este Slot
  useEffect(() => {
    const fetchAd = async () => {
      try {
        const { data, error } = await supabase
          .from('advertisements')
          .select('*')
          .eq('slot_name', slotName)
          .eq('is_active', true)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (error) throw error;
        setAd(data as Advertisement || null);
      } catch (err) {
        console.error(`Falha ao carregar anúncio do slot ${slotName}:`, err);
      } finally {
        setLoading(false);
      }
    };

    fetchAd();
  }, [slotName]);

  // Se estiver a carregar ou não tiver nenhum anúncio ativo, DEVEMOS retornar null
  // Isto resolve as "Caixas Brancas Vazias"!! O espaço desintegra-se magicamente.
  if (loading || !ad) {
    return null; 
  }

  // 3. Escolher conteúdo com Fallback Inteligente
  const getAdContent = () => {
    const dType = ad.desktop_type;
    const dContent = ad.desktop_content;
    const mType = ad.mobile_type;
    const mContent = ad.mobile_content;

    if (isMobile) {
      // Se estamos no mobile, tentamos mobile. Se não houver mobile, usamos desktop.
      if (mContent && mContent.trim() !== '') {
        return { content: mContent, type: mType };
      }
      return { content: dContent, type: dType };
    } else {
      // Se estamos no desktop, tentamos desktop. Se não houver, tentamos mobile.
      if (dContent && dContent.trim() !== '') {
        return { content: dContent, type: dType };
      }
      return { content: mContent, type: mType };
    }
  };

  const { content, type } = getAdContent();
  const isImage = type === 'image';

  if (!content || content.trim() === '') {
    return null;
  }

  const renderImageAd = () => {
    const imageElement = (
      <img 
        src={content} 
        alt="Sponsor Ad" 
        className="w-full h-auto object-contain rounded-lg shadow-sm"
        style={{ maxHeight: fallbackHeight !== 'auto' ? fallbackHeight : '250px' }}
      />
    );

    if (ad.redirect_url) {
      return (
        <a href={ad.redirect_url} target="_blank" rel="noopener noreferrer" className="block w-full">
          {imageElement}
        </a>
      );
    }
    return imageElement;
  };

  const renderCodeAd = () => {
    // Para códigos brutos (como a Adsterra ou Google AdSense), 
    // Isolar num iframe via srcdoc é a técnica mais segura e previne bugs de CSS globais e injecções maliciosas.
    const docContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; overflow: hidden; background: transparent; }
          </style>
        </head>
        <body>
          ${content}
        </body>
      </html>
    `;

    return (
      <iframe
        srcDoc={docContent}
        className="w-full h-full border-none overflow-hidden bg-transparent"
        style={{ minHeight: fallbackHeight }}
        scrolling="no"
        title="Advertisement"
      />
    );
  };

  return (
    <div className={`w-full flex justify-center items-center my-4 overflow-hidden relative ${className}`}>
      {/* Marca de patrocinado humilde */}
      <div className="absolute top-0 right-0 bg-white/80 text-[9px] text-gray-400 px-1 pt-[2px] rounded-bl-sm z-10 pointer-events-none">
        Patrocinado
      </div>
      
      {isImage ? renderImageAd() : renderCodeAd()}
    </div>
  );
};

export default UniversalAd;
