
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText } from 'lucide-react';

interface AppHeaderProps {
  showBackButton?: boolean;
  title?: string;
  onBackClick?: () => void;
}

const AppHeader = ({ showBackButton = false, title = "MozVita", onBackClick }: AppHeaderProps) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      navigate('/');
    }
  };

  return (
    <div className="container mx-auto px-4 py-4 sm:py-6 md:py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          {showBackButton && (
            <button
              onClick={handleBackClick}
              className="mr-4 p-2 text-gray-600 hover:text-google-blue transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-google-blue to-google-green rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-google-blue to-google-green bg-clip-text text-transparent">
              {title}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppHeader;
