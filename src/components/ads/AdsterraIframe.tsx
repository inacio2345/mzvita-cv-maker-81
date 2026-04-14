import React, { useEffect, useRef } from 'react';

interface AdsterraIframeProps {
  adKey: string;
  format: 'iframe' | 'js';
  width: number | string;
  height: number | string;
  className?: string;
}

const AdsterraIframe: React.FC<AdsterraIframeProps> = ({ adKey, format, width, height, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      // Limpar container anterior caso haja re-render
      containerRef.current.innerHTML = '';
      
      const iframe = document.createElement('iframe');
      iframe.style.width = typeof width === 'number' ? `${width}px` : width;
      iframe.style.height = typeof height === 'number' ? `${height}px` : height;
      iframe.style.border = 'none';
      iframe.style.overflow = 'hidden';
      iframe.scrolling = 'no';
      iframe.className = className || '';
      
      // Construir o conteúdo do iframe isolado
      const atOptions = {
        'key': adKey,
        'format': format,
        'height': typeof height === 'number' ? height : parseInt(height as string),
        'width': typeof width === 'number' ? width : parseInt(width as string),
        'params': {}
      };

      const docContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; overflow: hidden; }
            </style>
          </head>
          <body>
            <script type="text/javascript">
              var atOptions = ${JSON.stringify(atOptions)};
            </script>
            <script type="text/javascript" src="https://www.highperformanceformat.com/${adKey}/invoke.js"></script>
          </body>
        </html>
      `;

      containerRef.current.appendChild(iframe);
      
      // Injetar o conteúdo no iframe
      const doc = iframe.contentWindow || iframe.contentDocument;
      if (doc) {
        try {
          // Use srcdoc if supported, otherwise fallback to document methods
          iframe.srcdoc = docContent;
        } catch (e) {
          console.error("AdsterraIframe failed to inject srcdoc", e);
        }
      }
    }
  }, [adKey, format, width, height]);

  return (
    <div 
      ref={containerRef} 
      className="flex justify-center items-center w-full overflow-hidden" 
      style={{ minHeight: typeof height === 'number' ? `${height}px` : height }}
    />
  );
};

export default AdsterraIframe;
