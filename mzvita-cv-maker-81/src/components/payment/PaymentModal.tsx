
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Check, Lock, Star, Zap, Crown, CreditCard, ExternalLink, Loader2, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

const PaymentModal = ({ isOpen, onClose, onSuccess }: PaymentModalProps) => {
    const [selectedPlan, setSelectedPlan] = useState<'single' | 'monthly' | 'annual' | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [waitingPayment, setWaitingPayment] = useState(false);
    const [paysuiteId, setPaysuiteId] = useState<string | null>(null);
    const { toast } = useToast();

    // Polling: verifica a cada 4 segundos se o pagamento foi confirmado
    useEffect(() => {
        if (!waitingPayment || !paysuiteId) return;

        const interval = setInterval(async () => {
            const { data } = await supabase
                .from('payments')
                .select('status')
                .eq('paysuite_id', paysuiteId)
                .single();

            if (data?.status === 'paid') {
                clearInterval(interval);
                setWaitingPayment(false);
                setPaysuiteId(null);
                toast({
                    title: "Pagamento Confirmado! 🎉",
                    description: "Seu plano foi ativado com sucesso. Aproveite!",
                });
                if (onSuccess) onSuccess();
                onClose();
            }
        }, 4000);

        return () => clearInterval(interval);
    }, [waitingPayment, paysuiteId]);

    const plans = [
        {
            id: 'single' as const,
            name: 'Plano Avulso',
            price: '25,00 MT',
            description: 'Perfeito para um único uso',
            icon: <Zap className="w-5 h-5 text-blue-500" />,
            features: ['1 Download de CV ou Carta', 'Alta Resolução', 'Acesso Vitalício ao item'],
            color: 'border-blue-100 bg-blue-50/30'
        },
        {
            id: 'monthly' as const,
            name: 'Plano Mensal',
            price: '200,00 MT',
            description: 'Ideal para quem busca emprego',
            icon: <Star className="w-5 h-5 text-green-500" />,
            features: ['10 Downloads por mês', 'CVs e Cartas ilimitados', 'Sem Anúncios', 'Templates Premium'],
            recommended: true,
            color: 'border-green-200 bg-green-50/30'
        },
        {
            id: 'annual' as const,
            name: 'Plano Anual',
            price: '1.290,00 MT',
            description: 'A melhor economia para sua carreira',
            icon: <Crown className="w-5 h-5 text-amber-500" />,
            features: ['Downloads Ilimitados', 'Sem Anúncios Permanente', 'Economia de 1.110 MT', 'Suporte Prioritário'],
            color: 'border-amber-200 bg-amber-50/50'
        }
    ];

    const handlePayment = async () => {
        if (!selectedPlan) return;
        setIsProcessing(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error("Utilizador não autenticado");

            const { data: sessionData } = await supabase.auth.getSession();
            const accessToken = sessionData.session?.access_token;

            const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-paysuite-payment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                    plan_type: selectedPlan,
                    user_id: user.id,
                    return_url: window.location.origin + '/dashboard?payment=success'
                })
            });

            const result = await response.json();

            if (!response.ok || !result.checkout_url) {
                throw new Error(result.error || "Erro ao gerar link de pagamento");
            }

            // Abrir o checkout do PaySuite numa nova aba (evita CSRF 419)
            window.open(result.checkout_url, '_blank');

            // Guardar o ID e iniciar o modo de espera com polling
            setPaysuiteId(result.paysuite_id);
            setWaitingPayment(true);

        } catch (error: any) {
            console.error(error);
            toast({
                title: "Erro no pagamento",
                description: error.message || "Não foi possível iniciar o checkout. Tente novamente.",
                variant: "destructive"
            });
        } finally {
            setIsProcessing(false);
        }
    };

    // Estado: aguardando confirmação do pagamento
    if (waitingPayment) {
        return (
            <Dialog open={isOpen} onOpenChange={() => {}}>
                <DialogContent className="sm:max-w-md">
                    <div className="flex flex-col items-center text-center gap-6 py-8 px-4">
                        <div className="relative">
                            <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <CheckCircle2 className="w-8 h-8 text-blue-300" />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Aguardando Pagamento</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">
                                O checkout do PaySuite foi aberto numa <strong>nova aba</strong>.<br />
                                Complete o pagamento lá e esta janela irá atualizar automaticamente.
                            </p>
                        </div>
                        <div className="bg-blue-50 rounded-xl p-4 w-full text-left text-sm text-blue-700 border border-blue-100">
                            <p className="font-semibold mb-1">📋 Instruções:</p>
                            <ol className="list-decimal list-inside space-y-1 text-blue-600">
                                <li>Escolha M-Pesa, E-Mola ou Cartão na nova aba</li>
                                <li>Insira os seus dados e confirme o pagamento</li>
                                <li>Volte aqui — o plano ativa automaticamente</li>
                            </ol>
                        </div>
                        <Button
                            variant="ghost"
                            className="text-slate-400 hover:text-red-500 text-sm"
                            onClick={() => { setWaitingPayment(false); setPaysuiteId(null); }}
                        >
                            Cancelar e voltar
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border-blue-200/20">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-2xl font-bold">
                        <Lock className="w-6 h-6 text-blue-500" />
                        Escolha o seu Plano Premium
                    </DialogTitle>
                    <DialogDescription className="text-lg">
                        Invista no seu futuro profissional com ferramentas de elite.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-6">
                    {plans.map((plan) => (
                        <div
                            key={plan.id}
                            onClick={() => setSelectedPlan(plan.id)}
                            className={cn(
                                "relative cursor-pointer rounded-2xl border-2 p-4 transition-all hover:scale-[1.02] duration-300 flex flex-col h-full",
                                selectedPlan === plan.id
                                    ? "border-blue-500 bg-blue-50/30 ring-4 ring-blue-100/50 shadow-xl"
                                    : cn("border-transparent shadow-sm", plan.color)
                            )}
                        >
                            {plan.recommended && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider z-20 shadow-md">
                                    Mais Popular
                                </div>
                            )}
                            <div className="mb-4">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="p-2 bg-white rounded-lg shadow-sm border border-slate-100">
                                        {plan.icon}
                                    </div>
                                    {selectedPlan === plan.id && (
                                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-sm">
                                            <Check className="w-4 h-4 text-white" />
                                        </div>
                                    )}
                                </div>
                                <h3 className="font-bold text-slate-900">{plan.name}</h3>
                                <p className="text-xs text-slate-500 leading-tight">{plan.description}</p>
                            </div>
                            <div className="mt-auto">
                                <div className="text-xl font-black text-slate-900 mb-4">{plan.price}</div>
                                <ul className="space-y-2 mb-2">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-[11px] text-slate-600 font-medium">
                                            <Check className="w-3 h-3 text-green-500 mt-0.5 shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col gap-3 mt-4 border-t pt-6">
                    <Button
                        disabled={!selectedPlan || isProcessing}
                        onClick={handlePayment}
                        className={cn(
                            "w-full h-14 text-lg font-bold shadow-xl transition-all duration-300 flex items-center justify-center gap-2",
                            selectedPlan
                                ? "bg-blue-600 hover:bg-blue-700 scale-[1.01]"
                                : "bg-slate-200"
                        )}
                    >
                        {isProcessing ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Iniciando pagamento seguro...
                            </>
                        ) : (
                            <>
                                <ExternalLink className="w-5 h-5" />
                                Pagar com M-Pesa / E-Mola / Cartão
                            </>
                        )}
                    </Button>
                    <div className="flex items-center justify-center gap-4 mt-2 opacity-70 hover:opacity-100 transition-all">
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-50 border border-red-200 rounded-full text-xs font-bold text-red-600">
                          <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                          M-Pesa
                        </span>
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-50 border border-orange-200 rounded-full text-xs font-bold text-orange-600">
                          <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                          E-Mola
                        </span>
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-slate-50 border border-slate-200 rounded-full text-xs font-bold text-slate-600">
                          <CreditCard className="w-3 h-3" />
                          Cartão
                        </span>
                    </div>
                    <p className="text-[10px] text-center text-slate-400 font-medium max-w-xs mx-auto">
                        Pagamento processado de forma criptografada pelo PaySuite.
                        Ao prosseguir, você concorda com nossos Termos de Uso.
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default PaymentModal;
