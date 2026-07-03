
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
      // Redirecionar para a página de auth dedicada se não estiver logado
      // Passamos a origem e todo o state original para podermos retornar após o login sem perder dados do CV
      navigate('/auth', { state: { from: location.pathname, originalState: location.state } });
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
