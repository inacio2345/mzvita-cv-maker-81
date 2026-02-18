import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FileText, ArrowLeft, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
interface AppHeaderProps {
  showBackButton?: boolean;
  title?: string;
  onBackClick?: () => void;
  customBackPath?: string;
  customBackText?: string;
}
const AppHeader = ({
  showBackButton,
  title = "MozVita",
  onBackClick,
  customBackPath,
  customBackText
}: AppHeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Automatically show back button on all pages except home
  const shouldShowBackButton = showBackButton !== false && location.pathname !== '/';
  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else if (customBackPath) {
      navigate(customBackPath);
    } else {
      navigate(-1); // Go back to previous page
    }
  };
  const getBackButtonText = () => {
    if (customBackText) return customBackText;
    if (customBackPath === '/') return 'Voltar ao Início';
    return 'Voltar';
  };
  const getBackButtonIcon = () => {
    if (customBackPath === '/') return <Home className="w-4 h-4" />;
    return <ArrowLeft className="w-4 h-4" />;
  };
  return <div className="container mx-auto px-4 py-4 sm:py-6 md:py-8">
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        {shouldShowBackButton && <Button variant="outline" onClick={handleBackClick} className="flex items-center gap-2">
          {getBackButtonIcon()}
          {getBackButtonText()}
        </Button>}

        {/* Área do logo removida conforme solicitação */}
        <div></div>

        {/* Spacer para equilibrar o layout quando há botão de voltar */}
        {shouldShowBackButton && <div className="w-[100px]"></div>}
      </div>
    </div>
  </div>;
};
export default AppHeader;