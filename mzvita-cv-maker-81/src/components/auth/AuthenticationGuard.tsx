
import React from 'react';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';

interface AuthenticationGuardProps {
  user: any;
  children: React.ReactNode;
  onAuthRequired: () => void;
  showWarning?: boolean;
}

const AuthenticationGuard = ({ user, children, onAuthRequired, showWarning = true }: AuthenticationGuardProps) => {
  if (!user) {
    return (
      <>
        {showWarning && (
          <div className="mb-4 sm:mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <Lock className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-orange-800 font-medium text-sm sm:text-base">Autenticação Necessária</p>
                <p className="text-orange-700 text-xs sm:text-sm">
                  Você precisa fazer login para criar e salvar seus CVs.
                </p>
                <Button 
                  onClick={onAuthRequired}
                  className="mt-2 bg-orange-600 hover:bg-orange-700 text-white text-sm"
                  size="sm"
                >
                  Fazer Login
                </Button>
              </div>
            </div>
          </div>
        )}
        <div className="relative">
          <div className="opacity-50">{children}</div>
          <div className="absolute inset-0 bg-white bg-opacity-75 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Lock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">Faça login para continuar</p>
              <Button 
                onClick={onAuthRequired}
                className="bg-google-blue hover:bg-blue-600 text-white"
              >
                Fazer Login
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return <>{children}</>;
};

export default AuthenticationGuard;
