
import React, { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const PWAInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowInstallPrompt(true);
    };

    const handleAppInstalled = () => {
      setShowInstallPrompt(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setShowInstallPrompt(false);
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
  };

  if (!showInstallPrompt || !deferredPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-28 left-4 right-4 sm:bottom-6 sm:left-auto sm:right-6 sm:max-w-sm bg-card border rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] p-4 z-[90] animate-in slide-in-from-bottom-2 duration-300">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 flex-1">
          <div className="w-10 h-10 bg-gradient-to-r from-google-blue to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Download className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-sm text-slate-900">Instalar MozVita</h3>
            <p className="text-xs text-slate-500">
              Acesse rapidamente criando CVs do seu dispositivo
            </p>
          </div>
        </div>
        <button
          onClick={handleDismiss}
          className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-4 h-4 text-slate-400" />
        </button>
      </div>
      <div className="flex gap-2 mt-4">
        <Button
          onClick={handleInstallClick}
          size="sm"
          className="flex-1 bg-google-blue hover:bg-blue-700 text-white font-bold rounded-xl h-10 shadow-md shadow-blue-500/10"
        >
          Instalar Agora
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleDismiss}
          className="px-4 border-slate-200 text-slate-500 font-bold rounded-xl h-10"
        >
          Agora não
        </Button>
      </div>
    </div>
  );
};

export default PWAInstallPrompt;