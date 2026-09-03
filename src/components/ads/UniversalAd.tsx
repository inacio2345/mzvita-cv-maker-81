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
 * Solução definitiva para Telemóveis (Android / iOS) e Computador (Desktop).
 * Utiliza iFrames isolados com srcDoc para contornar o bloqueio de `document.write` do Chrome Mobile/Safari.
 * Calcula automaticamente a altura correta (incluindo empilhamento vertical de Bandeiras Nativas no telemóvel).
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

  // 2. Buscar Anúncios Ativos para este Slot (com Fallback inteligente)
  useEffect(() => {
    let isMounted = true;
    const fetchAd = async () => {
      try {
        let { data, error } = await supabase
          .from('advertisements')
          .select('*')
          .eq('slot_name', slotName)
          .eq('is_active', true)
          .order('updated_at', { ascending: false });

        if (error) throw error;

        // Fallback automático para o Blog caso o slot específico esteja vazio
        if ((!data || data.length === 0) && (slotName === 'blog_content' || slotName === 'blog_sidebar')) {
          const fallbackRes = await supabase
            .from('advertisements')
            .select('*')
            .eq('slot_name', 'job_feed_1')
            .eq('is_active', true)
            .order('updated_at', { ascending: false });
          data = fallbackRes.data;
        }

        if (isMounted && data && data.length > 0) {
          // Selecionar o melhor anúncio que possua conteúdo válido
          let bestAd = data.find((a: Advertisement) => {
            const hasMobile = a.mobile_content && a.mobile_content.trim() !== '';
            const hasDesktop = a.desktop_content && a.desktop_content.trim() !== '';
            return isMobile ? (hasMobile || hasDesktop) : (hasDesktop || hasMobile);
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

  // Escolher o código de anúncio adequado com suporte a fallback de string vazia
  const getAdContent = () => {
    if (!ad) return null;
    const dType = ad.desktop_type;
    const dContent = ad.desktop_content ? ad.desktop_content.trim() : '';
    const mType = ad.mobile_type;
    const mContent = ad.mobile_content ? ad.mobile_content.trim() : '';

    if (isMobile) {
      if (mContent !== '') {
        return { content: mContent, type: mType };
      }
      return { content: dContent, type: dType };
    } else {
      if (dContent !== '') {
        return { content: dContent, type: dType };
      }
      return { content: mContent, type: mType };
    }
  };

  const adData = getAdContent();

  // Se estiver a carregar, sem anúncio ou com conteúdo vazio, RETORNAR NULL (Zero espaço em branco!)
  if (loading || !ad || !adData || !adData.content || adData.content === '') {
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

  // Calcular a altura exata do iFrame considerando o comportamento em Telemóveis e Computador
  const getCalculatedHeight = () => {
    if (fallbackHeight !== 'auto') return fallbackHeight;

    const content = adData.content;
    const isNative = content.includes('container-') || content.includes('native') || ad.title.toLowerCase().includes('nativa') || ad.title.toLowerCase().includes('native');

    // Bandeiras Nativas no telemóvel precisam de ~600px porque os 4 itens ficam empilhados verticalmente numa coluna
    if (isNative) {
      return isMobile ? '620px' : '260px';
    }

    if (content.includes("'height' : 90") || content.includes('"height": 90') || content.includes('728x90')) {
      return '90px';
    }
    if (content.includes("'height' : 50") || content.includes('"height": 50') || content.includes('320x50')) {
      return '60px';
    }
    if (content.includes("'height' : 250") || content.includes('"height": 250') || content.includes('300x250')) {
      return '250px';
    }
    if (content.includes("'height' : 600") || content.includes('"height": 600') || content.includes('160x600')) {
      return '600px';
    }
    return isMobile ? '300px' : '250px';
  };

  // Renderizar Código Adsterra via iFrame Isolar que Funciona 100% em Telemóveis Físicos
  const renderCodeAd = () => {
    const calculatedHeight = getCalculatedHeight();
    const docContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
          <style>
            * { box-sizing: border-box; }
            html, body {
              margin: 0;
              padding: 0;
              width: 100%;
              height: 100%;
              background: transparent;
              display: flex;
              justify-content: center;
              align-items: center;
              text-align: center;
              overflow: hidden;
            }
            div { max-width: 100% !important; }
            iframe { max-width: 100% !important; }
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
        className="w-full border-none overflow-hidden bg-transparent mx-auto"
        style={{ height: calculatedHeight, minHeight: calculatedHeight }}
        scrolling="no"
        title={ad.title || `Anúncio ${slotName}`}
      />
    );
  };

  return (
    <div className={`w-full flex justify-center items-center my-3 relative overflow-hidden ${className}`}>
      {isImage ? renderImageAd() : renderCodeAd()}
    </div>
  );
};

export default UniversalAd;
