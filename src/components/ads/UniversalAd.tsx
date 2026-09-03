import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Advertisement } from '@/types/ads';

interface UniversalAdProps {
  slotName: string;
  className?: string;
  fallbackHeight?: string; 
}

/**
 * UniversalAd: Componente oficial de exibição de anúncios por Slot no MozVita.
 * Totalmente compatível com os códigos propostos pelo Adsterra (Banners 728x90, 320x50, Nativos e Popunders).
 * Suporta múltiplos registros para o mesmo slot (ex: um registro 320x50 e outro 728x90) selecionando
 * automaticamente o melhor anúncio para a resolução de ecrã do utilizador.
 */
const UniversalAd: React.FC<UniversalAdProps> = ({ slotName, className = '', fallbackHeight = 'auto' }) => {
  const [ad, setAd] = useState<Advertisement | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);

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

  // Determinar altura sugerida para o iFrame de acordo com o código do Adsterra
  const getCalculatedHeight = () => {
    if (fallbackHeight !== 'auto') return fallbackHeight;

    const content = adData.content;
    if (content.includes("'height' : 90") || content.includes('"height": 90') || content.includes('728x90')) {
      return '90px';
    }
    if (content.includes("'height' : 50") || content.includes('"height": 50') || content.includes('320x50')) {
      return '50px';
    }
    if (content.includes("'height' : 250") || content.includes('"height": 250') || content.includes('300x250')) {
      return '250px';
    }
    if (content.includes("'height' : 600") || content.includes('"height": 600') || content.includes('160x600')) {
      return '600px';
    }
    return '250px';
  };

  // Renderizar Código Adsterra via IFrame com Escopo Isolado
  const renderCodeAd = () => {
    const calculatedHeight = getCalculatedHeight();
    const docContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            html, body {
              margin: 0;
              padding: 0;
              width: 100%;
              height: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              background: transparent;
              overflow: hidden;
            }
          </style>
        </head>
        <body>
          ${adData.content}
        </body>
      </html>
    `;

    return (
      <iframe
        srcDoc={docContent}
        className="w-full border-none overflow-hidden bg-transparent"
        style={{ height: calculatedHeight, minHeight: calculatedHeight }}
        scrolling="no"
        title={ad.title || `Anúncio ${slotName}`}
      />
    );
  };

  return (
    <div className={`w-full flex justify-center items-center my-4 relative ${className}`}>
      {isImage ? renderImageAd() : renderCodeAd()}
    </div>
  );
};

export default UniversalAd;
