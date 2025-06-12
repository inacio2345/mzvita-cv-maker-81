import React, { useEffect } from 'react';

interface AdsterraFooterProps {
  className?: string;
}

const AdsterraFooter: React.FC<AdsterraFooterProps> = ({ className = '' }) => {
  useEffect(() => {
    // Create and append the script element
    const script = document.createElement('script');
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    script.src = '//pl26870458.profitableratecpm.com/61eba68a47e0ac2b98ec3fed6c320ba9/invoke.js';
    
    document.body.appendChild(script);
    
    return () => {
      // Clean up script when component unmounts
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);
  
  return (
    <div className={`adsterra-footer-native w-full mx-auto mt-5 max-w-full ${className}`}>
      <div id="container-61eba68a47e0ac2b98ec3fed6c320ba9" className="flex justify-center"></div>
    </div>
  );
};

export default AdsterraFooter;