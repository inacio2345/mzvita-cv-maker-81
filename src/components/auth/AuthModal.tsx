import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { FileText, Mail, Lock, LogIn, UserPlus } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess?: (userId: string) => void;
}

const AuthModal = ({ isOpen, onClose, onAuthSuccess }: AuthModalProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, signInWithGoogle } = useAuth();
  const { toast } = useToast();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await signIn(email, password);
      toast({
        title: "🚀 Bem-vindo de volta!",
        description: "Login realizado com sucesso. Agora pode aproveitar o melhor da plataforma!",
      });
      if (data.user) {
        onAuthSuccess?.(data.user.id);
      }
      onClose();
    } catch (error: any) {
      toast({
        title: "Ops! Algo correu mal no login",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await signUp(email, password);
      toast({
        title: "✨ Conta criada com sucesso!",
        description: "Bem-vindo ao MozVita! Agora pode aproveitar o melhor da nossa plataforma para alavancar a sua carreira.",
      });
      if (data.user) {
        onAuthSuccess?.(data.user.id);
      }
      onClose();
    } catch (error: any) {
      toast({
        title: "Erro ao criar conta",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      toast({
        title: "🎉 Autenticação Concluída!",
        description: "Bem-vindo ao MozVita CV. Estamos prontos para criar o seu futuro profissional!",
      });
      onAuthSuccess?.('');
      onClose();
    } catch (error: any) {
      toast({
        title: "Erro no login com Google",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[400px] p-0 overflow-hidden border-0 shadow-2xl rounded-2xl">
        <div className="px-6 pt-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center">
              <img 
                src="/logo.png" 
                alt="MozVita Logo" 
                className="h-16 w-auto object-contain" 
              />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Bem-vindo</h2>
              <p className="text-xs text-slate-500">Aceda à sua conta MzVita</p>
            </div>
          </div>

          <div className="mb-6 p-3 bg-blue-50/50 border border-blue-100 rounded-xl">
            <p className="text-blue-700 text-[11px] leading-relaxed text-center font-medium">
              Crie e salve seus CVs profissionais com segurança.
            </p>
          </div>
        </div>

        <div className="px-6 pb-6 space-y-4">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-slate-100 p-1 h-11 rounded-xl">
              <TabsTrigger value="login" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Entrar</TabsTrigger>
              <TabsTrigger value="register" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Criar Conta</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="mt-4">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs font-semibold text-slate-700">Email</Label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400 group-focus-within:text-google-blue transition-colors" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-11 rounded-xl border-slate-200 focus:border-google-blue transition-all"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="password" title="password label" className="text-xs font-semibold text-slate-700">Senha</Label>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400 group-focus-within:text-google-blue transition-colors" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Sua senha"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 h-11 rounded-xl border-slate-200 focus:border-google-blue transition-all"
                      required
                    />
                  </div>
                </div>
                <Button 
                  type="submit" 
                  className="w-full h-11 bg-google-blue hover:bg-blue-600 rounded-xl font-bold shadow-lg shadow-blue-100 transition-all active:scale-[0.98]"
                  disabled={loading}
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  {loading ? 'Processando...' : 'Fazer Login'}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register" className="mt-4">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="email-register" className="text-xs font-semibold text-slate-700">Email</Label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400 group-focus-within:text-google-green transition-colors" />
                    <Input
                      id="email-register"
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-11 rounded-xl border-slate-200 focus:border-google-green transition-all"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="password-register" className="text-xs font-semibold text-slate-700">Senha</Label>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400 group-focus-within:text-google-green transition-colors" />
                    <Input
                      id="password-register"
                      type="password"
                      placeholder="Mínimo 6 caracteres"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 h-11 rounded-xl border-slate-200 focus:border-google-green transition-all"
                      required
                      minLength={6}
                    />
                  </div>
                </div>
                <Button 
                  type="submit" 
                  className="w-full h-11 bg-google-green hover:bg-green-600 rounded-xl font-bold shadow-lg shadow-green-100 transition-all active:scale-[0.98]"
                  disabled={loading}
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  {loading ? 'Criando conta...' : 'Registrar Agora'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-100" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold">
              <span className="bg-white px-3 text-slate-400">Ou use</span>
            </div>
          </div>

          <Button 
            onClick={handleGoogleSignIn}
            variant="outline"
            className="w-full h-11 rounded-xl border-slate-200 hover:bg-slate-50 font-medium transition-all"
            disabled={loading}
          >
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Google
          </Button>

          <p className="text-[10px] text-center text-slate-400 px-4">
            Ao continuar, aceita os nossos <span className="text-slate-600 font-medium hover:underline cursor-pointer">Termos de Serviço</span>.
          </p>
        </div>

      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
