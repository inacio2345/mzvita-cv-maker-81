import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, SquarePen, Copy, Check, Lock, UserPlus, LogIn, ArrowUp, Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import SEO from '@/components/SEO';
import { getAllJobsForAiContext } from '@/services/jobsService';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

const GUEST_MAX_MESSAGES = 2;

const IaAssistant: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { toast } = useToast();
  
  // Auth Gate Modal State
  const [showAuthGate, setShowAuthGate] = useState(false);
  const [authGateReason, setAuthGateReason] = useState<string>('');

  // AI Chatbot State & Guest Limits
  const [guestMessageCount, setGuestMessageCount] = useState(0);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isInterviewMode, setIsInterviewMode] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isAiLoading]);

  // Handle initial prompt passed from another page (e.g. JobFeed)
  useEffect(() => {
    if (location.state && location.state.initialPrompt) {
      handleQuickPrompt(location.state.initialPrompt);
      // Clear state so it doesn't run again on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const triggerAuthGate = (reason: string) => {
    setAuthGateReason(reason);
    setShowAuthGate(true);
  };

  const handleNewChat = () => {
    setChatMessages([]);
    setIsInterviewMode(false);
  };

  const handleQuickPrompt = (promptText: string, isInterviewPrompt = false) => {
    if (!user && isInterviewPrompt) {
      triggerAuthGate('Para usar o Simulador de Entrevista de Emprego com a IA, crie a sua conta gratuita no MozVita!');
      return;
    }
    if (isInterviewPrompt) {
      setIsInterviewMode(true);
    }
    sendMessage(promptText);
  };

  const sendMessage = async (customText?: string) => {
    const textToSend = customText || inputPrompt;
    if (!textToSend.trim() || isAiLoading) return;

    if (!user && guestMessageCount >= GUEST_MAX_MESSAGES) {
      triggerAuthGate('Atingiu o limite de demonstração gratuita (2/2 mensagens). Crie a sua conta gratuita para usar a Inteligência Artificial sem limites!');
      return;
    }

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMessage]);
    if (!customText) setInputPrompt('');
    setIsAiLoading(true);

    if (!user) {
      setGuestMessageCount(prev => prev + 1);
    }

    try {
      // Obter contexto de vagas ativas
      const activeJobsContext = await getAllJobsForAiContext();
      
      let systemInstruction = `Você é o assistente virtual oficial de carreira do MozVita Moçambique (Especialista em RH Moçambicano).
Responda sempre em Português de Moçambique claro, empático e altamente profissional.
Forneça dicas práticas e estratégicas adaptadas ao mercado de trabalho moçambicano.

[CONTEXTO DE VAGAS ATUAIS DISPONÍVEIS NA PLATAFORMA]
Caso o utilizador pergunte por vagas, recomende com base nesta lista abaixo, indicando que podem ser encontradas na secção de Vagas:
${activeJobsContext}
[FIM DO CONTEXTO DE VAGAS]
`;

      if (isInterviewMode || textToSend.toLowerCase().includes('entrevista') || textToSend.toLowerCase().includes('simular')) {
        systemInstruction += `\nMODO SIMULADOR DE ENTREVISTA ATIVO: Aja como um recrutador moçambicano exigente mas construtivo. Faça 1 pergunta de entrevista de cada vez, espere pela resposta do candidato, dê uma pontuação (0-100%) e sugestão de melhoria antes de fazer a próxima pergunta.`;
      }

      const { data, error } = await supabase.functions.invoke('generate-cv-text', {
        body: {
          prompt: `Instrução de contexto: ${systemInstruction}\n\nPergunta do usuário: ${textToSend}`,
          fieldType: 'chat',
          tone: 'Profissional e Encorajador'
        }
      });

      let aiResponseText = '';
      if (!error && data?.text) {
        aiResponseText = data.text;
      } else {
        aiResponseText = generateSmartFallback(textToSend, isInterviewMode);
      }

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      console.error('Chat AI Error:', err);
      const fallbackMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: generateSmartFallback(textToSend, isInterviewMode),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsAiLoading(false);
    }
  };

  const generateSmartFallback = (query: string, interviewMode: boolean): string => {
    const q = query.toLowerCase();
    if (interviewMode || q.includes('entrevista') || q.includes('simular')) {
      return `🎙️ **Simulador de Entrevista de Emprego (Pergunta 1/3)**:\n\n"Seja bem-vindo à nossa entrevista. Conte-me sobre uma situação profissional desafiante que enfrentou no seu último emprego ou durante os seus estudos em Moçambique e como conseguiu superá-la?"\n\n*Por favor, responda com detalhes como agiu nessa situação para que eu possa avaliar a sua resposta!*`;
    }
    if (q.includes('linkedin')) {
      return `💡 **Como encontrar as melhores vagas no LinkedIn em Moçambique**:\n\n1. **Ajuste a Localização**: Defina seu perfil com a cidade exata.\n2. **Palavras-chave de Pesquisa**: Digite termos como \`"Vaga Moçambique"\`.\n3. **Siga as Principais Empresas**: Siga empresas como Sasol, TotalEnergies, etc.`;
    }
    return `Obrigado pela mensagem! Estou temporariamente em modo restrito, mas recomendo que acesse a nossa página de Vagas para ver as oportunidades atuais.`;
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast({ title: 'Texto copiado!', description: 'Resposta copiada para a área de transferência.' });
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 top-0 left-0 right-0 bottom-0 z-[60] flex flex-col bg-white text-slate-900 font-sans overflow-hidden m-0 p-0">
      <SEO 
        title="ChatGPT MozVita AI"
        description="O seu assistente de carreira inteligente em Moçambique."
        canonical="/ia"
      />

      <header className="h-14 border-b border-slate-100 px-4 flex items-center justify-between shrink-0 bg-white z-20">
        <div className="flex items-center gap-4">
          <button 
            onClick={handleNewChat}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            title="Nova conversa"
          >
            <SquarePen className="w-5 h-5" />
          </button>
          
          <div className="font-extrabold text-base text-slate-900 flex items-center gap-2">
            {isInterviewMode ? 'Simulador de Entrevista 🎙️' : 'ChatGPT MozVita ⚡'}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!user ? (
            <Button
              size="sm"
              onClick={() => navigate('/auth')}
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-full px-4 h-8"
            >
              Entrar
            </Button>
          ) : (
            <div 
              onClick={() => navigate('/perfil')}
              className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 font-bold text-xs cursor-pointer hover:bg-slate-200 transition-colors"
            >
              {user.email?.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
      </header>

      <div className="flex-1 flex flex-col overflow-hidden relative bg-white">
        <AnimatePresence mode="wait">
          <motion.div 
            key="chatgpt-ai"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col h-full overflow-hidden relative"
          >
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
              
              {chatMessages.length === 0 && (
                <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-4 max-w-lg mx-auto my-auto space-y-6">
                  <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Em que posso ajudar hoje?
                  </h2>

                  <div className="w-full space-y-2.5">
                    {[
                      { prompt: "Que vagas estão disponíveis atualmente na plataforma?", label: "Ver Vagas Recomendadas" },
                      { prompt: "Simular Entrevista de Emprego (Modo Recrutador)", label: "Simular Entrevista de Emprego 🎙️", isInterview: true },
                      { prompt: "Dicas de palavras-chave ATS para meu CV", label: "Palavras-chave ATS para meu CV" },
                      { prompt: "Qual a média salarial para minha área em Maputo?", label: "Faixa salarial média por província" }
                    ].map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleQuickPrompt(item.prompt, item.isInterview)}
                        className="w-full p-3.5 rounded-2xl border border-slate-200/90 hover:bg-slate-50 text-slate-700 text-sm font-semibold transition-all text-left flex items-center justify-between group shadow-sm"
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-slate-400 group-hover:text-slate-900 transition-colors font-bold">+</span>
                          {item.label}
                        </span>
                        <ArrowUp className="w-4 h-4 text-slate-300 group-hover:text-slate-900 transition-colors rotate-45" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="max-w-2xl mx-auto space-y-6">
                {chatMessages.map((msg) => (
                  <motion.div 
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.sender === 'ai' && (
                      <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs shrink-0 mt-1 shadow-sm">
                        <Bot className="w-4 h-4" />
                      </div>
                    )}

                    <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed max-w-[85%] ${
                      msg.sender === 'user'
                        ? 'bg-slate-900 text-white font-medium rounded-tr-none'
                        : 'bg-slate-100/80 text-slate-800 border border-slate-200/60 rounded-tl-none font-normal'
                    }`}>
                      <div className="whitespace-pre-wrap font-sans">
                        {msg.text}
                      </div>
                      {msg.sender === 'ai' && (
                        <div className="flex justify-end mt-1 pt-1">
                          <button 
                            onClick={() => copyToClipboard(msg.text, msg.id)}
                            className="text-[10px] text-slate-400 hover:text-slate-700 flex items-center gap-1 font-bold"
                          >
                            {copiedId === msg.id ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                            {copiedId === msg.id ? 'Copiado' : 'Copiar'}
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}

                {isAiLoading && (
                  <div className="flex gap-3 items-center text-slate-400 text-xs font-bold pl-2">
                    <div className="w-6 h-6 rounded-full bg-slate-900 flex items-center justify-center text-white">
                      <Bot className="w-3.5 h-3.5 animate-spin text-brand-400" />
                    </div>
                    <span>A pesquisar contexto e escrever...</span>
                  </div>
                )}

                <div ref={chatBottomRef} />
              </div>
            </div>

            <div className="shrink-0 z-30 bg-white border-t border-slate-100 p-3 pb-24 lg:pb-4 pointer-events-auto shadow-sm">
              <div className="max-w-2xl mx-auto">
                <div className="rounded-full border border-slate-200 bg-slate-50/90 shadow-lg px-3 py-1.5 flex items-center gap-2 backdrop-blur-md focus-within:border-slate-400 transition-colors">
                  <button 
                    onClick={() => handleQuickPrompt("Como otimizar meu CV para o mercado moçambicano?")}
                    className="w-8 h-8 rounded-full bg-slate-200/70 hover:bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-base transition-colors shrink-0"
                    title="Sugestões"
                  >
                    +
                  </button>

                  <input
                    type="text"
                    placeholder="Pergunte algo sobre vagas ou carreira..."
                    value={inputPrompt}
                    onChange={(e) => setInputPrompt(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                    className="flex-1 bg-transparent border-0 outline-none px-2 text-sm text-slate-900 placeholder:text-slate-400 font-medium"
                  />

                  <button
                    onClick={() => sendMessage()}
                    disabled={isAiLoading || !inputPrompt.trim()}
                    className="w-9 h-9 rounded-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-200 disabled:opacity-40 text-white flex items-center justify-center transition-all shrink-0 shadow-sm"
                  >
                    <ArrowUp className="w-4 h-4 font-bold" />
                  </button>
                </div>

                <p className="text-[10px] text-center text-slate-400 mt-2 font-medium">
                  Ao conversar com o MozVita AI, concorda com os nossos <button onClick={() => navigate('/termos-de-uso')} className="underline hover:text-slate-600">Termos</button>.
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <Dialog open={showAuthGate} onOpenChange={setShowAuthGate}>
        <DialogContent className="max-w-md rounded-3xl p-6 md:p-8 text-center">
          <div className="w-16 h-16 rounded-3xl bg-slate-900 flex items-center justify-center text-white mx-auto mb-4 shadow-xl">
            <Lock className="w-8 h-8" />
          </div>
          <DialogTitle className="text-2xl font-black text-slate-900 mb-2">
            Crie a sua Conta Gratuita 🚀
          </DialogTitle>
          <DialogDescription className="text-sm text-slate-600 leading-relaxed mb-6">
            {authGateReason || 'Para usar a Inteligência Artificial ilimitadamente, crie a sua conta gratuita no MozVita em 10 segundos.'}
          </DialogDescription>

          <div className="space-y-3">
            <Button
              size="lg"
              onClick={() => {
                setShowAuthGate(false);
                navigate('/auth', { state: { isSignUp: true } });
              }}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-black h-13 rounded-2xl shadow-lg"
            >
              <UserPlus className="w-5 h-5 mr-2" /> Criar Conta Grátis Agora
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                setShowAuthGate(false);
                navigate('/auth');
              }}
              className="w-full border-2 border-slate-200 hover:bg-slate-50 font-bold text-slate-700 h-13 rounded-2xl"
            >
              <LogIn className="w-5 h-5 mr-2 text-brand-600" /> Já tenho conta (Entrar)
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default IaAssistant;
