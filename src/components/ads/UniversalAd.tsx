import React, { useEffect, useState, useRef, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Advertisement } from '@/types/ads';

interface UniversalAdProps {
  slotName: string;
  className?: string;
}

/**
 * UniversalAd — Injeção Direta de Scripts Adsterra no DOM.
 *
 * CAUSA RAIZ DO BUG ANTERIOR (mobile ads não aparecem):
 * Quando os scripts do Adsterra (invoke.js) são executados DENTRO de um <iframe>
 * (via srcDoc ou Blob URL), o script cria elementos posicionados relativamente
 * ao container do iframe. No mobile com overflow-x:clip, esses elementos
 * ficam renderizados fora da viewport (ex: X=468 numa tela de 375px) e são
 * cortados/invisíveis.
 *
 * SOLUÇÃO: Injetar os scripts diretamente no DOM real da página (sem iframe).
 * Isso permite que o Adsterra detete o viewport real e posicione o anúncio
 * corretamente dentro da área visível do ecrã.
 */
const UniversalAd: React.FC<UniversalAdProps> = ({ slotName, className = '' }) => {
  const [ad, setAd] = useState<Advertisement | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const injectedRef = useRef(false);

  // 1. Deteção Responsiva
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // 2. Buscar Anúncio Ativo
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        let { data, error } = await supabase
          .from('advertisements')
          .select('*')
          .eq('slot_name', slotName)
          .eq('is_active', true)
          .order('updated_at', { ascending: false });

        if (error) throw error;

        // Fallback inteligente para slots sem anúncio próprio
        if (!data || data.length === 0) {
          const fallbackSlots = ['job_feed_1', 'header', 'blog_content'];
          const fb = await supabase
            .from('advertisements')
            .select('*')
            .in('slot_name', fallbackSlots)
            .eq('is_active', true)
            .order('updated_at', { ascending: false });
          data = fb.data;
        }

        if (alive && data && data.length > 0) {
          let selectedAd = data[0];
          if (isMobile) {
            const mobileAd = data.find(item => item.mobile_content && item.mobile_content.trim() !== '');
            if (mobileAd) selectedAd = mobileAd;
          }
          setAd(selectedAd as Advertisement);
        } else if (alive) {
          setAd(null);
        }
      } catch (err) {
        console.error(`[UniversalAd] Erro slot "${slotName}":`, err);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [slotName, isMobile]);

  // Escolher conteúdo com fallback Desktop↔Mobile
  const getContent = useCallback(() => {
    if (!ad) return null;
    const dc = (ad.desktop_content || '').trim();
    const mc = (ad.mobile_content || '').trim();
    const dt = ad.desktop_type;
    const mt = ad.mobile_type;

    if (isMobile) {
      return mc ? { content: mc, type: mt } : dc ? { content: dc, type: dt } : null;
    }
    return dc ? { content: dc, type: dt } : mc ? { content: mc, type: mt } : null;
  }, [ad, isMobile]);

  const adData = getContent();

  // 3. Injetar scripts diretamente no DOM (SEM iframe)
  useEffect(() => {
    if (!containerRef.current || !adData || adData.type !== 'code' || !adData.content) return;
    if (injectedRef.current) return; // Evitar dupla injeção

    const container = containerRef.current;
    container.innerHTML = ''; // Limpar conteúdo anterior
    injectedRef.current = true;

    const rawHtml = adData.content;

    // Criar um elemento temporário para extrair scripts e HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = rawHtml;

    // 1. Inserir elementos não-script (divs container, etc.)
    const nonScriptNodes = Array.from(tempDiv.childNodes).filter(
      node => !(node instanceof HTMLScriptElement)
    );
    nonScriptNodes.forEach(node => {
      container.appendChild(node.cloneNode(true));
    });

    // 2. Extrair e criar novos scripts (appendChild não executa scripts do innerHTML)
    const scriptTags = tempDiv.querySelectorAll('script');
    scriptTags.forEach((oldScript, index) => {
      const newScript = document.createElement('script');
      newScript.type = oldScript.type || 'text/javascript';

      // Copiar todos os atributos (src, async, data-cfasync, etc.)
      Array.from(oldScript.attributes).forEach(attr => {
        newScript.setAttribute(attr.name, attr.value);
      });

      if (oldScript.src) {
        // Corrigir URLs relativas ao protocolo
        let src = oldScript.src;
        if (src.startsWith('//')) {
          src = 'https:' + src;
        }
        newScript.src = src;
        newScript.async = true;
      } else {
        // Script inline (como atOptions)
        newScript.text = oldScript.text;
      }

      container.appendChild(newScript);
    });

    // Cleanup ao desmontar
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
      injectedRef.current = false;
    };
  }, [adData]);

  // Reset injectedRef quando o ad muda
  useEffect(() => {
    injectedRef.current = false;
  }, [ad, isMobile]);

  // Não renderizar nada se vazio
  if (loading || !ad || !adData || !adData.content) {
    return null;
  }

  const isImage = adData.type === 'image';

  if (isImage) {
    const img = (
      <img
        src={adData.content}
        alt={ad.title || 'Patrocinado'}
        className="max-w-full h-auto object-contain rounded-xl shadow-sm"
        style={{ maxHeight: '280px' }}
      />
    );
    return (
      <div className={`w-full max-w-full flex justify-center items-center my-3 overflow-hidden ${className}`}>
        {ad.redirect_url ? (
          <a href={ad.redirect_url} target="_blank" rel="noopener noreferrer">{img}</a>
        ) : img}
      </div>
    );
  }

  // Calcular altura mínima para o container
  const getMinHeight = () => {
    const c = adData.content;
    const isNative = c.includes('container-') || c.includes('native') || (ad.title || '').toLowerCase().includes('nativ');

    if (isNative) return isMobile ? '300px' : '280px';
    if (c.includes("'height' : 90") || c.includes('"height": 90') || c.includes('728x90')) return isMobile ? '0px' : '100px';
    if (c.includes("'height' : 50") || c.includes('"height": 50') || c.includes('320x50')) return '60px';
    if (c.includes("'height' : 250") || c.includes('"height": 250') || c.includes('300x250')) return '260px';
    if (c.includes("'height' : 600") || c.includes('"height": 600')) return '610px';
    return isMobile ? '60px' : '100px';
  };

  return (
    <div className={`w-full max-w-full flex justify-center items-center my-3 overflow-hidden ${className}`}>
      <div
        ref={containerRef}
        className="w-full max-w-full flex justify-center items-center overflow-hidden"
        style={{ minHeight: getMinHeight() }}
      />
    </div>
  );
};

export default UniversalAd;

