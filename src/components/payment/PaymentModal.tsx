
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Check, Lock, Star, Zap, Crown, CreditCard, X, Loader2 } from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

const PaymentModal = ({ isOpen, onClose, onSuccess }: PaymentModalProps) => {
    const { initiatePayment, checkPaymentStatus, refreshSubscription } = useSubscription();
    const [selectedPlan, setSelectedPlan] = useState<'single' | 'monthly' | 'annual' | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
    const [paysuiteId, setPaysuiteId] = useState<string | null>(null);
    const { toast } = useToast();

    // Polling para verificar se o pagamento foi concluído
    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;

        if (checkoutUrl && paysuiteId) {
            interval = setInterval(async () => {
                const status = await checkPaymentStatus(paysuiteId);
                if (status === 'paid') {
                    clearInterval(interval);
                    handleSuccess();
                }
            }, 3000);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [checkoutUrl, paysuiteId]);

    const handleSuccess = async () => {
        setCheckoutUrl(null);
        setPaysuiteId(null);
        await refreshSubscription();
        toast({
            title: "Pagamento Confirmado!",
            description: "Seu plano foi ativado com sucesso. Aproveite!",
        });
        if (onSuccess) onSuccess();
        onClose();
    };

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
            icon: <Star className="w-5 h-5 text-google-green" />,
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
            const { supabase } = await import('@/integrations/supabase/client');
            const { data: { user } } = await supabase.auth.getUser();
            
            const response = await supabase.functions.invoke('create-paysuite-payment', {
                body: {
                    plan_type: selectedPlan,
                    user_id: user?.id,
                    return_url: window.location.origin + '/pagamento-sucesso'
                }
            });

            if (response.error) throw response.error;
            const result = response.data;
            
            if (result.checkout_url) {
                setPaysuiteId(result.paysuite_id);
                setCheckoutUrl(result.checkout_url);
                window.open(result.checkout_url, '_blank');
            } else {
                throw new Error("Erro ao gerar link de pagamento");
            }
        } catch (error) {
            console.error(error);
            toast({
                title: "Erro no pagamento",
                description: "Não foi possível iniciar o checkout. Tente novamente.",
                variant: "destructive"
            });
        } finally {
            setIsProcessing(false);
        }
    };

    if (checkoutUrl) {
        return (
            <Dialog open={isOpen} onOpenChange={() => {}}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader className="sr-only">
                        <DialogTitle>Pagamento em processamento</DialogTitle>
                        <DialogDescription>Aguarde enquanto processamos o seu pagamento</DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col items-center gap-6 py-8 text-center">
                        <Loader2 className="w-12 h-12 text-primary animate-spin" />
                        <div>
                            <h3 className="text-lg font-bold text-foreground mb-2">Aguardando pagamento...</h3>
                            <p className="text-sm text-muted-foreground">
                                Complete o pagamento na aba que foi aberta. Esta janela será atualizada automaticamente.
                            </p>
                        </div>
                        <div className="flex gap-3 w-full">
                            <Button
                                variant="outline"
                                className="flex-1"
                                onClick={() => window.open(checkoutUrl, '_blank')}
                            >
                                Reabrir Checkout
                            </Button>
                            <Button
                                variant="ghost"
                                className="flex-1 hover:bg-destructive/10 hover:text-destructive"
                                onClick={() => { setCheckoutUrl(null); setPaysuiteId(null); }}
                            >
                                <X className="w-4 h-4 mr-2" />
                                Cancelar
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border-google-blue/20">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-2xl font-bold">
                        <Lock className="w-6 h-6 text-google-blue" />
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
                                    ? "border-google-blue bg-blue-50/30 ring-4 ring-blue-100/50 shadow-xl" 
                                    : cn("border-transparent shadow-sm", plan.color)
                            )}
                        >
                            {plan.recommended && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-google-green text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider z-20 shadow-md">
                                    Mais Popular
                                </div>
                            )}

                            <div className="mb-4">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="p-2 bg-white rounded-lg shadow-sm border border-slate-100">
                                        {plan.icon}
                                    </div>
                                    {selectedPlan === plan.id && (
                                        <div className="w-6 h-6 bg-google-blue rounded-full flex items-center justify-center shadow-sm">
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
                            "w-full h-14 text-lg font-bold shadow-xl transition-all duration-300",
                            selectedPlan 
                                ? "bg-google-blue hover:bg-blue-600 scale-[1.01] hover:shadow-blue-200" 
                                : "bg-slate-200"
                        )}
                    >
                        {isProcessing ? (
                            <div className="flex items-center gap-2">
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Iniciando pagamento seguro...
                            </div>
                        ) : (
                            <>
                                <CreditCard className="w-6 h-6 mr-3" />
                                Pagar com M-Pesa / E-Mola
                            </>
                        )}
                    </Button>
                    <div className="grid grid-cols-2 gap-3 mt-2">
                        <div className="flex items-center justify-center gap-2 p-3 bg-red-50 border border-red-100 rounded-xl">
                          <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_5px_rgba(239,68,68,0.5)]"></span>
                          <span className="text-xs font-black text-red-700 uppercase tracking-tighter">M-Pesa</span>
                        </div>
                        <div className="flex items-center justify-center gap-2 p-3 bg-orange-50 border border-orange-100 rounded-xl">
                          <span className="w-2.5 h-2.5 bg-orange-500 rounded-full animate-pulse shadow-[0_0_5px_rgba(249,115,22,0.5)]"></span>
                          <span className="text-xs font-black text-orange-700 uppercase tracking-tighter">E-Mola</span>
                        </div>
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
