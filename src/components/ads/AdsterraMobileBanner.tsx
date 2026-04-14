import React from 'react';
import { useLocation } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import AdsterraIframe from './AdsterraIframe';

const AdsterraMobileBanner: React.FC = () => {
    const location = useLocation();
    const isMobile = useIsMobile();

    // List of pages where ads should not be shown
    const excludedPages = [
        '/criar-cv'
    ];

    const shouldShowAds = isMobile && !excludedPages.includes(location.pathname);

    if (!shouldShowAds) {
        return null;
    }

    return (
        <div
            className="ad-mobile-banner w-full flex justify-center py-4 bg-slate-50/50 my-4 overflow-hidden border-y border-slate-100 min-h-[82px]"
        >
            <div className="flex justify-center items-center" style={{ width: '320px', height: '50px' }}>
                <AdsterraIframe 
                    adKey="544871108327156f752c8856d6a40dc6"
                    format="iframe"
                    width={320}
                    height={50}
                />
            </div>
        </div>
    );
};

export default AdsterraMobileBanner;
