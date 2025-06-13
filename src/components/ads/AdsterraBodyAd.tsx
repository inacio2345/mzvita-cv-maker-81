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
      // Remove existing ad container if it exists
      const existingAdContainer = document.querySelector('.ad-header');
      if (existingAdContainer) {
        existingAdContainer.remove();
      }

      // Create the ad container div
      const adContainer = document.createElement('div');
      adContainer.className = 'ad-header';
      adContainer.style.cssText = `
        display: flex;
        justify-content: center;
        width: 100%;
        padding: 10px 0;
        background: transparent;
      `;

      // Create and configure the first script (atOptions)
      const optionsScript = document.createElement('script');
      optionsScript.type = 'text/javascript';
      optionsScript.innerHTML = `
        atOptions = {
          'key': '3ab88cc45aad291af06779a7141d0c78',
          'format': 'iframe',
          'height': 90,
          'width': 728,
          'params': {}
        };
      `;

      // Create and configure the invoke script
      const invokeScript = document.createElement('script');
      invokeScript.type = 'text/javascript';
      invokeScript.src = '//www.highperformanceformat.com/3ab88cc45aad291af06779a7141d0c78/invoke.js';

      // Append scripts to the ad container
      adContainer.appendChild(optionsScript);
      adContainer.appendChild(invokeScript);

      // Append the ad container to the end of body
      document.body.appendChild(adContainer);

      return () => {
        // Cleanup when component unmounts
        const adToRemove = document.querySelector('.ad-header');
        if (adToRemove && document.body.contains(adToRemove)) {
          document.body.removeChild(adToRemove);
        }
        // Clean up global atOptions
        if ((window as any).atOptions) {
          delete (window as any).atOptions;
        }
      };
    }
  }, [shouldShowAds, location.pathname]);

  // This component doesn't render anything in the React tree
  // The ad is injected directly into the DOM at the end of body
  return null;
};

export default AdsterraBodyAd;