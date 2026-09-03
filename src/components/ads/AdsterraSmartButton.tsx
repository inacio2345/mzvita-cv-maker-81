import React from 'react';
import { ExternalLink } from 'lucide-react';

interface AdsterraSmartButtonProps {
  smartLinkUrl: string;
  label: string;
  className?: string;
}

/**
 * Botão com direcionamento para SmartLink / Direct Link do Adsterra para monetização direta
 */
export const AdsterraSmartButton: React.FC<AdsterraSmartButtonProps> = ({
  smartLinkUrl,
  label,
  className = '',
}) => {
  const handleClick = () => {
    if (smartLinkUrl) {
      window.open(smartLinkUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold rounded-xl shadow-md transition-all transform active:scale-95 cursor-pointer ${className}`}
    >
      <span>{label}</span>
      <ExternalLink className="w-4 h-4 opacity-80" />
    </button>
  );
};
