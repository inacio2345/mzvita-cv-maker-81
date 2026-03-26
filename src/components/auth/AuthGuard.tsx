
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !user) {
      // Redirecionar para o início se não estiver logado
      // Passamos a origem para podermos retornar após o login se necessário
      navigate('/', { state: { from: location.pathname, showAuth: true } });
    }
  }, [user, loading, navigate, location]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-10 h-10 text-google-blue animate-spin" />
        <p className="text-slate-500 font-medium animate-pulse">Verificando acesso...</p>
      </div>
    );
  }

  if (!user) {
    return null; // Será redirecionado pelo useEffect
  }

  return <>{children}</>;
};
