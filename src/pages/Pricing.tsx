
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Star, Zap, Crown, ShieldCheck, ArrowRight } from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import AuthModal from '@/components/auth/AuthModal';
import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';

const Pricing = () => {
    const { initiatePayment } = useSubscription();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [pendingPlan, setPendingPlan] = useState<string | null>(null);

    const handleBuyClick = (planId: 'single' | 'monthly' | 'annual') => {
        if (!user) {
            setPendingPlan(planId);
            setIsAuthModalOpen(true);
            return;
        }
        initiatePayment(planId);
    };

    const handleAuthSuccess = (userId: string) => {
        if (pendingPlan) {
            initiatePayment(pendingPlan as any, userId);
            setPendingPlan(null);
        }
    };

    const plans = [
        {
            id: 'single' as const,
            name: 'Plano Avulso',
            price: '50',
            period: 'item',
            description: 'Ideal para uma necessidade rápida e pontual.',
            icon: <Zap className="w-8 h-8 text-blue-500" />,
            features: [
                '1 Download Profissional (PDF)',
                'Remoção de marca d\'água',
                'Alta resolução garantida',
                'Acesso vitalício ao documento'
            ],
            cta: 'Comprar Agora',
            color: 'from-blue-50 to-white'
        },
        {
            id: 'monthly' as const,
            name: 'Plano Mensal',
            price: '200',
            period: 'mês',
            description: 'Para quem está focado em conseguir o emprego ideal.',
            icon: <Star className="w-8 h-8 text-google-green" />,
            features: [
                '10 Downloads (CVs ou Cartas)',
                'Sem Anúncios no sistema',
                'Acesso a Templates Premium',
                'Cartas de Apresentação ilimitadas',
                'Dicas exclusivas de carreira'
            ],
            recommended: true,
            cta: 'Assinar Mensal',
            color: 'from-green-50 to-white border-google-green/30'
        },
        {
            id: 'annual' as const,
            name: 'Plano Anual',
            price: '1.290',
            period: 'ano',
            description: 'A solução definitiva para o profissional moderno.',
            icon: <Crown className="w-8 h-8 text-amber-500" />,
            features: [
                'Downloads Ilimitados',
                'Sem Anúncios Permanente',
                'Economia de 1.110 MT',
                'Todos os Templates Premium',
                'Suporte Prioritário 24/7',
                'Criação de Cartas Ilimitadas'
            ],
            cta: 'Assinar Anual',
            color: 'from-amber-50 to-white border-amber-300/30'
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 py-10 md:py-20 px-4 overflow-x-hidden">
            <div className="max-w-7xl mx-auto text-center mb-10 md:mb-16">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-4 md:mb-6 tracking-tight">
                    Invista na sua <span className="text-google-blue">Carreira</span>
                </h1>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                    Escolha o plano que melhor se adapta às suas necessidades e desbloqueie todo o potencial do seu currículo.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {plans.map((plan) => (
                    <Card 
                        key={plan.id} 
                        className={cn(
                            "relative overflow-hidden transition-all duration-500 md:hover:scale-[1.03] hover:shadow-2xl border-2 max-w-md mx-auto w-full md:max-w-none",
                            plan.recommended ? "border-google-green shadow-xl md:scale-[1.05] z-10" : "border-slate-100",
                        )}
                    >
                        {plan.recommended && (
                            <div className="absolute top-0 right-0 bg-google-green text-white text-[10px] font-bold px-6 py-1 rotate-45 translate-x-[20px] translate-y-[10px] shadow-sm uppercase">
                                Recomendado
                            </div>
                        )}
                        
                        <div className={cn("absolute inset-0 bg-gradient-to-b opacity-50", plan.color)} />

                        <CardHeader className="relative pb-2">
                            <div className="mb-4 inline-block p-3 bg-white rounded-2xl shadow-sm border border-slate-100">
                                {plan.icon}
                            </div>
                            <CardTitle className="text-2xl font-bold text-slate-900">{plan.name}</CardTitle>
                            <CardDescription className="text-slate-500 min-h-[40px]">{plan.description}</CardDescription>
                        </CardHeader>

                        <CardContent className="relative">
                            <div className="flex items-baseline gap-1 mb-6">
                                <span className="text-4xl font-black text-slate-900">{plan.price}</span>
                                <span className="text-lg font-bold text-slate-500">MT</span>
                                <span className="text-slate-400 font-medium">/{plan.period}</span>
                            </div>

                            <div className="space-y-4">
                                {plan.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-start gap-3">
                                        <div className="mt-1 bg-green-100 rounded-full p-0.5">
                                            <Check className="w-3 h-3 text-green-600" />
                                        </div>
                                        <span className="text-sm text-slate-600 font-medium">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>

                        <CardFooter className="relative pt-6">
                            <Button 
                                onClick={() => handleBuyClick(plan.id)}
                                className={cn(
                                    "w-full h-14 text-lg font-bold rounded-xl shadow-lg transition-all",
                                    plan.recommended 
                                        ? "bg-google-green hover:bg-green-600 text-white" 
                                        : "bg-google-blue hover:bg-blue-600 text-white"
                                )}
                            >
                                {plan.cta}
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            <div className="mt-24 max-w-4xl mx-auto">
                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 flex flex-col md:flex-row items-center gap-8">
                    <div className="bg-blue-50 p-4 rounded-2xl">
                        <ShieldCheck className="w-16 h-16 text-google-blue" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">Pagamento 100% Seguro</h3>
                        <p className="text-slate-600">
                            Processamos seus dados através do PaySuite, garantindo que suas transações via M-Pesa ou E-Mola sejam rápidas, seguras e criptografadas.
                        </p>
                    </div>
                </div>
                
                <div className="text-center mt-12 text-slate-400 text-sm">
                    Dúvidas? Entre em contato com nosso <span className="text-google-blue font-bold cursor-pointer" onClick={() => navigate('/contato')}>Suporte</span>
                </div>
            </div>
            <AuthModal 
                isOpen={isAuthModalOpen} 
                onClose={() => setIsAuthModalOpen(false)} 
                onAuthSuccess={handleAuthSuccess}
            />
        </div>
    );
};

export default Pricing;
