import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Advertisement } from '@/types/ads';

interface UniversalAdProps {
  slotName: string;
  className?: string;
  fallbackHeight?: string; 
}

/**
 * UniversalAd: Componente oficial de exibição de anúncios por Slot no MozVita.
 * Funciona nativamente no Desktop e no Telemóvel (Mobile), executando scripts do Adsterra
 * (Banner 728x90, Banner 320x50, Bandeiras Nativas) diretamente no DOM sem aninhamento de iFrames bloqueados.
 */
const UniversalAd: React.FC<UniversalAdProps> = ({ slotName, className = '', fallbackHeight = 'auto' }) => {
  const [ad, setAd] = useState<Advertisement | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // 1. Deteção Responsiva em Tempo Real (Mobile <= 768px vs Desktop)
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 2. Buscar Anúncios Ativos para este Slot
  useEffect(() => {
    let isMounted = true;
    const fetchAd = async () => {
      try {
        const { data, error } = await supabase
          .from('advertisements')
          .select('*')
          .eq('slot_name', slotName)
          .eq('is_active', true)
          .order('updated_at', { ascending: false });

        if (error) throw error;

        if (isMounted && data && data.length > 0) {
          // Selecionar o melhor anúncio para o dispositivo atual
          let bestAd = data.find((a: Advertisement) => {
            if (isMobile) {
              return a.mobile_content && a.mobile_content.trim() !== '' && a.mobile_content !== a.desktop_content;
            } else {
              return a.desktop_content && a.desktop_content.trim() !== '';
            }
          });

          if (!bestAd) {
            bestAd = data[0];
          }

          setAd(bestAd as Advertisement);
        } else if (isMounted) {
          setAd(null);
        }
      } catch (err) {
        console.error(`Erro ao carregar anúncio do slot "${slotName}":`, err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchAd();
    return () => {
      isMounted = false;
    };
  }, [slotName, isMobile]);

  // Escolher conteúdo baseado no dispositivo com fallback inteligente
  const getAdContent = () => {
    if (!ad) return null;
    const dType = ad.desktop_type;
    const dContent = ad.desktop_content;
    const mType = ad.mobile_type;
    const mContent = ad.mobile_content;

    if (isMobile) {
      if (mContent && mContent.trim() !== '') {
        return { content: mContent, type: mType };
      }
      return { content: dContent, type: dType };
    } else {
      if (dContent && dContent.trim() !== '') {
        return { content: dContent, type: dType };
      }
      return { content: mContent, type: mType };
    }
  };

  const adData = getAdContent();

  // Executar e injetar scripts de código Adsterra diretamente no DOM para funcionamento 100% no Telemóvel e PC
  useEffect(() => {
    if (!containerRef.current || !adData || adData.type !== 'code' || !adData.content) return;

    const container = containerRef.current;
    container.innerHTML = '';

    const scriptWrapper = document.createElement('div');
    scriptWrapper.className = 'w-full flex justify-center items-center overflow-hidden';
    scriptWrapper.innerHTML = adData.content;
    container.appendChild(scriptWrapper);

    // Re-executar scripts extraídos para garantir que o navegador (mobile e desktop) os processe
    const scripts = scriptWrapper.querySelectorAll('script');
    scripts.forEach((oldScript) => {
      const newScript = document.createElement('script');
      Array.from(oldScript.attributes).forEach((attr) => {
        newScript.setAttribute(attr.name, attr.value);
      });
      newScript.text = oldScript.text;
      oldScript.parentNode?.replaceChild(newScript, oldScript);
    });
  }, [adData, isMobile]);

  // Se estiver a carregar, sem anúncio ou com conteúdo vazio, RETORNAR NULL (Sem caixas brancas vazias!)
  if (loading || !ad || !adData || !adData.content || adData.content.trim() === '') {
    return null; 
  }

  const isImage = adData.type === 'image';

  // Renderizar Anúncio por Imagem
  const renderImageAd = () => {
    const imageElement = (
      <img 
        src={adData.content} 
        alt={ad.title || "Patrocinado"} 
        className="max-w-full h-auto object-contain rounded-xl shadow-sm transition-transform hover:scale-[1.01]"
        style={{ maxHeight: fallbackHeight !== 'auto' ? fallbackHeight : '280px' }}
      />
    );

    if (ad.redirect_url) {
      return (
        <a href={ad.redirect_url} target="_blank" rel="noopener noreferrer" className="block cursor-pointer">
          {imageElement}
        </a>
      );
    }
    return imageElement;
  };

  return (
    <div className={`w-full flex justify-center items-center my-4 relative ${className}`}>
      {isImage ? renderImageAd() : <div ref={containerRef} className="w-full flex justify-center items-center min-h-[50px]" />}
    </div>
  );
};

export default UniversalAd;
