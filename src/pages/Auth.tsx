import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Mail, Lock, LogIn, UserPlus, Shield, Star, CheckCircle2, FileText } from 'lucide-react';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, signInWithGoogle, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  // If already logged in, redirect to the page they came from or profile
  useEffect(() => {
    if (user) {
      const from = location.state?.from || '/perfil';
      const originalState = location.state?.originalState;
      
      if (originalState) {
        navigate(from, { replace: true, state: originalState });
      } else {
        navigate(from, { replace: true });
      }
    }
  }, [user, navigate, location]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signIn(email, password);
      toast({
        title: "🚀 Bem-vindo de volta!",
        description: "Login realizado com sucesso. Agora pode aproveitar o melhor da plataforma!",
      });
      // Navigation is handled by the useEffect watching 'user'
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
      await signUp(email, password);
      toast({
        title: "✨ Conta criada com sucesso!",
        description: "Bem-vindo ao MozVita! Agora pode aproveitar o melhor da nossa plataforma para alavancar a sua carreira.",
      });
      // Navigation is handled by the useEffect watching 'user'
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
    <div className="min-h-[calc(100vh-80px)] flex flex-col md:flex-row bg-white">
      {/* Formulário (Esquerda) */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:flex-none lg:w-1/2 lg:px-20 xl:px-24 py-12 lg:py-0">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="text-center md:text-left mb-8">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Bem-vindo à MozVita</h2>
            <p className="text-sm text-slate-500">
              Aceda à sua conta e continue a construir o currículo que vai garantir a sua próxima entrevista.
            </p>
          </div>

          <div className="mt-8">
            <Button 
              onClick={handleGoogleSignIn}
              variant="outline"
              className="w-full h-12 rounded-xl border-slate-200 hover:bg-slate-50 font-medium transition-all shadow-sm"
              disabled={loading}
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continuar com o Google
            </Button>

            <div className="relative mt-6 mb-6">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-sm font-medium leading-6">
                <span className="bg-white px-6 text-slate-400">Ou use o seu email</span>
              </div>
            </div>

            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-slate-100 p-1 h-12 rounded-xl mb-6">
                <TabsTrigger value="login" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm font-semibold">Entrar</TabsTrigger>
                <TabsTrigger value="register" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm font-semibold">Criar Conta</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleSignIn} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-semibold text-slate-700">Email</Label>
                    <div className="relative group">
                      <Mail className="absolute left-3 top-3.5 h-5 w-5 text-slate-400 group-focus-within:text-brand-600 transition-colors" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-11 h-12 rounded-xl border-slate-200 focus:border-brand-600 transition-all text-base"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" title="password label" className="text-sm font-semibold text-slate-700">Senha</Label>
                    <div className="relative group">
                      <Lock className="absolute left-3 top-3.5 h-5 w-5 text-slate-400 group-focus-within:text-brand-600 transition-colors" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="Sua senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-11 h-12 rounded-xl border-slate-200 focus:border-brand-600 transition-all text-base"
                        required
                      />
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-brand-600 hover:bg-brand-700 rounded-xl font-bold text-white shadow-lg shadow-brand-200 transition-all active:scale-[0.98] mt-4"
                    disabled={loading}
                  >
                    <LogIn className="w-5 h-5 mr-2" />
                    {loading ? 'Processando...' : 'Fazer Login'}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <form onSubmit={handleSignUp} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="email-register" className="text-sm font-semibold text-slate-700">Email</Label>
                    <div className="relative group">
                      <Mail className="absolute left-3 top-3.5 h-5 w-5 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
                      <Input
                        id="email-register"
                        type="email"
                        placeholder="seu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-11 h-12 rounded-xl border-slate-200 focus:border-emerald-600 transition-all text-base"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password-register" className="text-sm font-semibold text-slate-700">Senha</Label>
                    <div className="relative group">
                      <Lock className="absolute left-3 top-3.5 h-5 w-5 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
                      <Input
                        id="password-register"
                        type="password"
                        placeholder="Mínimo 6 caracteres"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-11 h-12 rounded-xl border-slate-200 focus:border-emerald-600 transition-all text-base"
                        required
                        minLength={6}
                      />
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 rounded-xl font-bold text-white shadow-lg shadow-emerald-200 transition-all active:scale-[0.98] mt-4"
                    disabled={loading}
                  >
                    <UserPlus className="w-5 h-5 mr-2" />
                    {loading ? 'Criando conta...' : 'Registrar Agora'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <p className="mt-8 text-center text-xs text-slate-500">
              Ao continuar, você concorda com os nossos{' '}
              <a href="/termos-de-uso" className="font-semibold text-brand-600 hover:text-brand-500">Termos de Serviço</a> e{' '}
              <a href="/politica-de-privacidade" className="font-semibold text-brand-600 hover:text-brand-500">Política de Privacidade</a>.
            </p>
          </div>
        </div>
      </div>

      {/* Imagem Inspiradora (Direita) */}
      <div className="hidden lg:block lg:flex-1 relative overflow-hidden bg-brand-900 rounded-l-[3rem] shadow-2xl my-4 mr-4">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-600/90 to-brand-900/90 z-10" />
        <img 
          src="/lovable-uploads/template-01.jpg" 
          alt="Exemplo de Currículo" 
          className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
        />
        
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay z-10"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob z-10" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000 z-10" />

        <div className="relative z-20 flex flex-col justify-center h-full px-16 text-white">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 w-max mb-8">
            <Shield className="w-5 h-5 text-emerald-400" />
            <span className="text-sm font-semibold">Plataforma Segura & Profissional</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-extrabold leading-tight mb-6">
            A sua próxima entrevista <br/>começa <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-300">aqui.</span>
          </h2>
          
          <ul className="space-y-5 mb-12">
            <li className="flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/20">
                <FileText className="w-6 h-6 text-brand-100" />
              </div>
              <p className="text-lg font-medium text-brand-50">Crie currículos com design aprovado por recrutadores.</p>
            </li>
            <li className="flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/20">
                <Star className="w-6 h-6 text-google-yellow" />
              </div>
              <p className="text-lg font-medium text-brand-50">Modelos modernos que destacam o seu talento.</p>
            </li>
            <li className="flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/20">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              </div>
              <p className="text-lg font-medium text-brand-50">Rápido, seguro e pronto em poucos minutos.</p>
            </li>
          </ul>

          <div className="mt-auto pt-10 border-t border-white/10">
            <p className="text-brand-200 text-sm italic">
              "A MozVita ajudou-me a conseguir o emprego dos meus sonhos em menos de 2 semanas!"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
