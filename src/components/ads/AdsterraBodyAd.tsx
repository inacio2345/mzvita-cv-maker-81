import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const AdsterraBodyAd: React.FC = () => {
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
      const loadAdScript = () => {
        const adSlot = document.getElementById('ad-header-slot');
        if (adSlot) {
          // Configure atOptions
          (window as any).atOptions = {
            'key': '3ab88cc45aad291af06779a7141d0c78',
            'format': 'iframe',
            'height': 90,
            'width': 728,
            'params': {}
          };

          // Create and append the invoke script
          const script = document.createElement('script');
          script.type = 'text/javascript';
          script.src = '//www.highperformanceformat.com/3ab88cc45aad291af06779a7141d0c78/invoke.js';
          adSlot.appendChild(script);
        }
      };

      // Ensure DOM is ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadAdScript);
      } else {
        loadAdScript();
      }

      return () => {
        // Cleanup script when component unmounts
        const adSlot = document.getElementById('ad-header-slot');
        if (adSlot) {
          const scriptToRemove = adSlot.querySelector('script[src*="3ab88cc45aad291af06779a7141d0c78"]');
          if (scriptToRemove) {
            adSlot.removeChild(scriptToRemove);
          }
        }
        // Clean up atOptions
        if ((window as any).atOptions) {
          delete (window as any).atOptions;
        }
        // Remove event listener if it was added
        document.removeEventListener('DOMContentLoaded', loadAdScript);
      };
    }
  }, [shouldShowAds, location.pathname]);

  if (!shouldShowAds) {
    return null;
  }

  // Render the ad container in the React tree instead of injecting into DOM
  return (
    <div 
      className="ad-header w-full flex justify-center py-2 mb-4 border-b border-gray-200"
      style={{
        background: '#f8f9fa',
        minHeight: '90px'
      }}
    >
      <div
        id="ad-header-slot"
        style={{
          width: '728px',
          height: '90px',
          maxWidth: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {/* O conteúdo do anúncio será inserido aqui automaticamente pelo script da Adsterra */}
      </div>
    </div>
  );
};

export default AdsterraBodyAd;