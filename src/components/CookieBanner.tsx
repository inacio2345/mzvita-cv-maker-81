import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if cookies have been accepted previously
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (cookiesAccepted !== 'true') {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    setIsVisible(false);
    localStorage.setItem('cookiesAccepted', 'true');
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50 flex justify-between items-center flex-wrap gap-3 shadow-lg">
      <span className="text-sm max-w-full lg:max-w-[85%] leading-relaxed">
        Este site utiliza cookies para melhorar sua experiência. Ao continuar navegando, você concorda com o uso de cookies. Leia nossa{' '}
        <Link 
          to="/politica-de-privacidade" 
          className="text-blue-400 underline hover:text-blue-300 transition-colors"
        >
          Política de Privacidade
        </Link>
        .
      </span>
      <Button
        onClick={acceptCookies}
        size="sm"
        className="bg-blue-500 hover:bg-blue-600 text-white border-none px-4 py-2 rounded-md cursor-pointer transition-colors flex-shrink-0"
      >
        Aceitar
      </Button>
    </div>
  );
};

export default CookieBanner;