import React, { useEffect, useRef } from 'react';

interface AdsterraBannerProps {
  keyId: string;
  format?: '728x90' | '300x250' | '160x600' | '468x60';
  className?: string;
}

/**
 * Componente para exibição de Banners de Anúncios do Adsterra (Display / Nativos)
 */
export const AdsterraBanner: React.FC<AdsterraBannerProps> = ({
  keyId,
  format = '300x250',
  className = ''
}) => {
  const bannerRef = useRef<HTMLDivElement>(null);

  const formatDimensions = {
    '728x90': { width: 728, height: 90 },
    '300x250': { width: 300, height: 250 },
    '160x600': { width: 160, height: 600 },
    '468x60': { width: 468, height: 60 },
  };

  const { width, height } = formatDimensions[format] || formatDimensions['300x250'];

  useEffect(() => {
    if (!bannerRef.current || !keyId) return;

    bannerRef.current.innerHTML = '';

    const atOptionsScript = document.createElement('script');
    atOptionsScript.type = 'text/javascript';
    atOptionsScript.text = `
      atOptions = {
        'key' : '${keyId}',
        'format' : 'iframe',
        'height' : ${height},
        'width' : ${width},
        'params' : {}
      };
    `;

    const invokeScript = document.createElement('script');
    invokeScript.type = 'text/javascript';
    invokeScript.src = `//www.highperformanceformat.com/${keyId}/invoke.js`;

    bannerRef.current.appendChild(atOptionsScript);
    bannerRef.current.appendChild(invokeScript);
  }, [keyId, format, width, height]);

  return (
    <div className={`flex justify-center items-center my-4 overflow-hidden ${className}`}>
      <div ref={bannerRef} style={{ width: `${width}px`, height: `${height}px` }} />
    </div>
  );
};
