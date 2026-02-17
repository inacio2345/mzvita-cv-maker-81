import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const AdsterraMobileBanner: React.FC = () => {
    const location = useLocation();
    const isMobile = useIsMobile();

    // List of pages where ads should not be shown (optional, but good for critical flows)
    const excludedPages = [
        '/criar-cv'
    ];

    const shouldShowAds = isMobile && !excludedPages.includes(location.pathname);

    useEffect(() => {
        if (shouldShowAds) {
            const loadAdScript = () => {
                const adSlot = document.getElementById('ad-mobile-banner-slot');
                if (adSlot) {
                    // Configure atOptions for 320x50 Banner
                    (window as any).atOptions = {
                        'key': '544871108327156f752c8856d6a40dc6',
                        'format': 'iframe',
                        'height': 50,
                        'width': 320,
                        'params': {}
                    };

                    // Create and append the invoke script
                    const script = document.createElement('script');
                    script.type = 'text/javascript';
                    script.async = true;
                    script.src = '//www.highperformanceformat.com/544871108327156f752c8856d6a40dc6/invoke.js';
                    adSlot.appendChild(script);
                }
            };

            loadAdScript();

            return () => {
                const adSlot = document.getElementById('ad-mobile-banner-slot');
                if (adSlot) {
                    const scriptToRemove = adSlot.querySelector('script[src*="544871108327156f752c8856d6a40dc6"]');
                    if (scriptToRemove) {
                        adSlot.removeChild(scriptToRemove);
                    }
                }
                if ((window as any).atOptions) {
                    delete (window as any).atOptions;
                }
            };
        }
    }, [shouldShowAds, location.pathname]);

    if (!shouldShowAds) {
        return null;
    }

    return (
        <div
            className="ad-mobile-banner w-full flex justify-center py-4 bg-slate-50/50 my-4 overflow-hidden border-y border-slate-100"
            style={{ minHeight: '60px' }}
        >
            <div
                id="ad-mobile-banner-slot"
                className="flex justify-center items-center"
                style={{ width: '320px', height: '50px' }}
            >
                {/* Adsterra content injected here */}
            </div>
        </div>
    );
};

export default AdsterraMobileBanner;
