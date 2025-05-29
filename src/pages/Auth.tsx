
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import StatisticsForm from '@/components/auth/StatisticsForm';

const Auth = () => {
  const [mode, setMode] = useState<'login' | 'register' | 'statistics'>('login');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (userData: any) => {
    setUser(userData);
    setMode('statistics');
  };

  const handleRegister = (userData: any) => {
    setUser(userData);
    setMode('statistics');
  };

  const handleStatisticsComplete = () => {
    navigate('/perfil');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      {mode === 'login' && (
        <LoginForm 
          onLogin={handleLogin} 
          onSwitchToRegister={() => setMode('register')} 
        />
      )}
      
      {mode === 'register' && (
        <RegisterForm 
          onRegister={handleRegister} 
          onSwitchToLogin={() => setMode('login')} 
        />
      )}
      
      {mode === 'statistics' && (
        <StatisticsForm onComplete={handleStatisticsComplete} />
      )}
    </div>
  );
};

export default Auth;
