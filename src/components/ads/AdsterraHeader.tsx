import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface AdsterraHeaderProps {
  className?: string;
}

const AdsterraHeader: React.FC<AdsterraHeaderProps> = ({ className = '' }) => {
  const location = useLocation();
  
  // List of pages where ads should not be shown
  const excludedPages = [
    '/preview',
    '/criar-cv',
    '/precos'
  ];
  
  // Check if the current page should show the ad
  const shouldShowAds = !excludedPages.includes(location.pathname);

  useEffect(() => {
    if (shouldShowAds) {
      // Remove existing script if it exists
      const existingScript = document.querySelector('script[src*="3ab88cc45aad291af06779a7141d0c78"]');
      if (existingScript) {
        existingScript.remove();
      }

      // Create atOptions
      (window as any).atOptions = {
        'key': '3ab88cc45aad291af06779a7141d0c78',
        'format': 'iframe',
        'height': 90,
        'width': 728,
        'params': {}
      };

      // Create and append new script
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = '//www.highperformanceformat.com/3ab88cc45aad291af06779a7141d0c78/invoke.js';
      
      // Add script to head for header ads
      document.head.appendChild(script);

      return () => {
        // Cleanup script when component unmounts
        const scriptToRemove = document.querySelector('script[src*="3ab88cc45aad291af06779a7141d0c78"]');
        if (scriptToRemove && document.head.contains(scriptToRemove)) {
          document.head.removeChild(scriptToRemove);
        }
        // Clean up atOptions
        delete (window as any).atOptions;
      };
    }
  }, [shouldShowAds, location.pathname]);

  if (!shouldShowAds) {
    return null;
  }

  return (
    <div className={`ad-header w-full flex justify-center py-2 mb-2 ${className}`}>
      <div 
        className="flex justify-center items-center max-w-full overflow-hidden"
        style={{ 
          minHeight: '90px',
          maxWidth: '728px',
          width: '100%',
          display: 'block',
          visibility: 'visible'
        }}
      >
        {/* O conteúdo do anúncio será inserido aqui automaticamente pelo script da Adsterra */}
      </div>
    </div>
  );
};

export default AdsterraHeader;