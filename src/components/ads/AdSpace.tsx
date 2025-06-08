
import React, { useEffect, useRef } from 'react';

interface AdSpaceProps {
  id: string;
  type: 'header' | 'footer' | 'blog-inline' | 'blog-end';
  className?: string;
  scriptCode?: string;
}

const AdSpace = ({ id, type, className = '', scriptCode }: AdSpaceProps) => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scriptCode && adRef.current) {
      // Limpar conteúdo anterior
      adRef.current.innerHTML = '';
      
      // Criar um script temporário para executar o código do anúncio
      const script = document.createElement('script');
      script.innerHTML = scriptCode;
      
      // Adicionar o script ao container do anúncio
      adRef.current.appendChild(script);
      
      // Se o scriptCode contém src, criar script com src
      if (scriptCode.includes('src=')) {
        const srcMatch = scriptCode.match(/src="([^"]+)"/);
        if (srcMatch) {
          const externalScript = document.createElement('script');
          externalScript.src = srcMatch[1];
          externalScript.type = 'text/javascript';
          externalScript.async = true;
          adRef.current.appendChild(externalScript);
        }
      }
    }
  }, [scriptCode]);

  const getPlaceholderContent = () => {
    switch (type) {
      case 'header':
        return (
          <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
            <span className="text-gray-500 text-sm">Espaço reservado para Native Banner ou Banner (Header)</span>
            <div className="text-xs text-gray-400 mt-1">728x90 ou responsivo</div>
          </div>
        );
      case 'footer':
        return (
          <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-3 text-center">
            <span className="text-gray-500 text-sm">Espaço reservado para Banner (Footer)</span>
            <div className="text-xs text-gray-400 mt-1">320x50 ou responsivo</div>
          </div>
        );
      case 'blog-inline':
        return (
          <div className="bg-blue-50 border-2 border-dashed border-blue-200 rounded-lg p-4 text-center my-6">
            <span className="text-blue-600 text-sm">Espaço reservado para Native Banner (Após 1º parágrafo)</span>
            <div className="text-xs text-blue-400 mt-1">300x250 ou Native</div>
          </div>
        );
      case 'blog-end':
        return (
          <div className="bg-green-50 border-2 border-dashed border-green-200 rounded-lg p-4 text-center my-6">
            <span className="text-green-600 text-sm">Espaço reservado para Direct Link ou Native Banner (Final do artigo)</span>
            <div className="text-xs text-green-400 mt-1">300x250 ou Native</div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      id={id}
      className={`ad-space ad-space-${type} ${className}`}
      ref={adRef}
    >
      {!scriptCode && getPlaceholderContent()}
    </div>
  );
};

export default AdSpace;
