import React, { useEffect } from 'react';

interface AdsterraSocialBarProps {
  atOptionsKey: string;
}

/**
 * Componente para exibição do Social Bar do Adsterra (Anúncios flutuantes interativos de alta conversão)
 */
export const AdsterraSocialBar: React.FC<AdsterraSocialBarProps> = ({ atOptionsKey }) => {
  useEffect(() => {
    if (!atOptionsKey) return;
    
    const scriptId = `adsterra-socialbar-${atOptionsKey}`;
    if (document.getElementById(scriptId)) return;

    const script = document.createElement('script');
    script.id = scriptId;
    script.type = 'text/javascript';
    script.src = `//pl12345678.highcpmgate.com/${atOptionsKey}/invoke.js`;
    script.async = true;

    document.body.appendChild(script);

    return () => {
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [atOptionsKey]);

  return null;
};
