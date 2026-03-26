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
            const adSlotId = 'ad-mobile-banner-slot';
            const adSlot = document.getElementById(adSlotId);

            if (adSlot) {
                // Check if script already exists to prevent double loading
                if (adSlot.querySelector('script[src*="544871108327156f752c8856d6a40dc6"]')) {
                    return;
                }

                // Configure atOptions globally
                (window as any).atOptions = {
                    'key': '544871108327156f752c8856d6a40dc6',
                    'format': 'iframe',
                    'height': 50,
                    'width': 320,
                    'params': {}
                };

                // Create script
                const script = document.createElement('script');
                script.type = 'text/javascript';
                script.async = true;
                script.src = '//www.highperformanceformat.com/544871108327156f752c8856d6a40dc6/invoke.js';

                // Append
                adSlot.appendChild(script);
            }

            // Cleanup function - ONLY remove if component unmounts/route changes
            return () => {
                const adSlot = document.getElementById(adSlotId);
                if (adSlot) {
                    adSlot.innerHTML = ''; // Clean slot content completely
                }
                // We do NOT delete window.atOptions here immediately to avoid race conditions 
                // if the user navigates back quickly.
            };
        }
    }, [shouldShowAds, location.pathname]);

    if (!shouldShowAds) {
        return null;
    }

    return (
        <div
            className="ad-mobile-banner w-full flex justify-center py-4 bg-slate-50/50 my-4 overflow-hidden border-y border-slate-100 min-h-[82px]"
            style={{ minHeight: '82px' }}
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
