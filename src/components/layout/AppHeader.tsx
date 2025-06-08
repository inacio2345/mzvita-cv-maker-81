import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FileText, ArrowLeft } from 'lucide-react';
interface AppHeaderProps {
  showBackButton?: boolean;
  title?: string;
  onBackClick?: () => void;
}
const AppHeader = ({
  showBackButton,
  title = "MozVita",
  onBackClick
}: AppHeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Automatically show back button on all pages except home
  const shouldShowBackButton = showBackButton !== false && location.pathname !== '/';
  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      navigate(-1); // Go back to previous page
    }
  };
  return <div className="container mx-auto px-4 py-4 sm:py-6 md:py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          {shouldShowBackButton && <button onClick={handleBackClick} className="mr-4 p-2 text-gray-600 hover:text-google-blue transition-colors rounded-lg hover:bg-gray-100" aria-label="Voltar">
              <ArrowLeft className="w-6 h-6" />
            </button>}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
            
            
          </div>
        </div>
      </div>
    </div>;
};
export default AppHeader;