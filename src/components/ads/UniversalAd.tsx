import React, { useEffect, useState, useRef, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Advertisement } from '@/types/ads';

interface UniversalAdProps {
  slotName: string;
  className?: string;
}

/**
 * UniversalAd — Solução definitiva para exibir anúncios Adsterra em Telemóveis Físicos e Desktop.
 *
 * CAUSA RAIZ do bug anterior: iFrames com `srcDoc` têm protocolo `about:srcdoc`.
 * Os scripts do Adsterra usam URLs relativas ao protocolo (`//www.highperformanceformat.com/...`),
 * que dentro de srcDoc resolviam para `about://www...` — URL inválida. O script nunca carregava.
 *
 * SOLUÇÃO: Usar Blob URL com protocolo HTTPS explícito, garantindo que os scripts externos
 * carreguem corretamente em TODOS os navegadores móveis (Chrome Android, Safari iOS, Firefox).
 */
const UniversalAd: React.FC<UniversalAdProps> = ({ slotName, className = '' }) => {
  const [ad, setAd] = useState<Advertisement | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const blobUrlRef = useRef<string | null>(null);

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

        // Fallback: se o blog não tem anúncio próprio, reutilizar o do feed de vagas
        if ((!data || data.length === 0) && (slotName === 'blog_content' || slotName === 'blog_sidebar')) {
          const fb = await supabase
            .from('advertisements')
            .select('*')
            .eq('slot_name', 'job_feed_1')
            .eq('is_active', true)
            .order('updated_at', { ascending: false });
          data = fb.data;
        }

        if (alive && data && data.length > 0) {
          setAd(data[0] as Advertisement);
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
  }, [slotName]);

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

  // Limpar blob URL anterior ao desmontar
  useEffect(() => {
    return () => {
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
      }
    };
  }, []);

  // 3. Montar o iFrame via Blob URL (NÃO srcDoc!) — resolve o bug de protocolo em telemóveis
  useEffect(() => {
    if (!iframeRef.current || !adData || adData.type !== 'code' || !adData.content) return;

    // Limpar blob anterior
    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
      blobUrlRef.current = null;
    }

    // CORREÇÃO CRÍTICA: Substituir URLs relativas ao protocolo por HTTPS absoluto
    const fixedContent = adData.content
      .replace(/src=["'](\/\/)/g, 'src="https://')
      .replace(/src=["'](\/\/)/g, "src='https://");

    const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:100%;background:transparent;overflow-x:hidden}
body{display:flex;justify-content:center;align-items:flex-start;min-height:50px}
div,iframe{max-width:100%!important}
</style>
</head>
<body>
${fixedContent}
</body>
</html>`;

    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    blobUrlRef.current = url;

    iframeRef.current.src = url;
  }, [adData]);

  // Não renderizar nada se vazio
  if (loading || !ad || !adData || !adData.content) {
    return null;
  }

  const isImage = adData.type === 'image';

  // Calcular altura adequada
  const getHeight = () => {
    const c = adData.content;
    const isNative = c.includes('container-') || c.includes('native') || (ad.title || '').toLowerCase().includes('nativ');

    if (isNative) return isMobile ? '620px' : '280px';
    if (c.includes("'height' : 90") || c.includes('"height": 90') || c.includes('728x90')) return '100px';
    if (c.includes("'height' : 50") || c.includes('"height": 50') || c.includes('320x50')) return '60px';
    if (c.includes("'height' : 250") || c.includes('"height": 250') || c.includes('300x250')) return '260px';
    if (c.includes("'height' : 600") || c.includes('"height": 600')) return '610px';
    return isMobile ? '320px' : '260px';
  };

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
      <div className={`w-full flex justify-center items-center my-3 ${className}`}>
        {ad.redirect_url ? (
          <a href={ad.redirect_url} target="_blank" rel="noopener noreferrer">{img}</a>
        ) : img}
      </div>
    );
  }

  const height = getHeight();

  return (
    <div className={`w-full flex justify-center items-center my-3 overflow-hidden ${className}`}>
      <iframe
        ref={iframeRef}
        className="w-full border-none bg-transparent"
        style={{ height, minHeight: height }}
        scrolling="no"
        sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
        title={`Ad ${slotName}`}
      />
    </div>
  );
};

export default UniversalAd;
