import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, Sparkles, Search, MapPin, Building2, Calendar, 
  ChevronRight, Send, Bot, User, CheckCircle2, Award, 
  HelpCircle, ArrowRight, Lock, FileText, Copy, Check, LogIn, UserPlus,
  Plus, SquarePen, ChevronDown, ArrowUp, Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import SEO from '@/components/SEO';

interface JobOpportunity {
  id: string;
  title: string;
  company: string;
  location: string;
  category: string;
  type: string;
  postedDate: string;
  deadline: string;
  salary: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  featured?: boolean;
}

const mockJobs: JobOpportunity[] = [
  {
    id: '1',
    title: 'Assistente Administrativo & Logística',
    company: 'Sasol Moçambique',
    location: 'Maputo / Inhambane',
    category: 'Oil & Gas / Logística',
    type: 'Tempo Inteiro',
    postedDate: 'Hoje',
    deadline: '15 de Setembro de 2026',
    salary: '45.000 - 65.000 MT',
    featured: true,
    description: 'Gestão de documentação de processos logísticos, atendimento e suporte às operações de escritório em Maputo e Pande.',
    requirements: [
      'Licenciatura em Administração, Gestão ou Contabilidade',
      'Mínimo de 2 anos de experiência comprovada',
      'Domínio de MS Excel avançado e software ERP',
      'Fluência em Português e Inglês funcional'
    ],
    responsibilities: [
      'Organizar dossiers de fornecedores e ordens de compra',
      'Coordenar transporte e logística de equipas',
      'Elaborar relatórios mensais de desempenho operacional'
    ]
  },
  {
    id: '2',
    title: 'Analista de Operações Bancárias',
    company: 'Millennium bim',
    location: 'Maputo (Sede)',
    category: 'Banca & Finanças',
    type: 'Tempo Inteiro',
    postedDate: 'Há 1 dia',
    deadline: '20 de Setembro de 2026',
    salary: '50.000 - 75.000 MT',
    featured: true,
    description: 'Análise de operações de crédito, compliance financeiro e atendimento a clientes empresariais corporativos.',
    requirements: [
      'Licenciatura em Economia, Finanças ou Gestão Bancária',
      'Conhecimento do sistema bancário moçambicano (Banco de Moçambique)',
      'Capacidade analítica e atenção ao detalhe'
    ],
    responsibilities: [
      'Avaliar propostas de crédito e risco operacional',
      'Garantir conformidade com regulamentos do BM',
      'Acompanhar carteira de clientes corporate'
    ]
  },
  {
    id: '3',
    title: 'Técnico de Manutenção Industrial',
    company: 'TotalEnergies EP Mozambique',
    location: 'Pemba / Afungi (Cabo Delgado)',
    category: 'Oil & Gas / Engenharia',
    type: 'Regime Rotação (28/28)',
    postedDate: 'Há 2 dias',
    deadline: '18 de Setembro de 2026',
    salary: '85.000 - 120.000 MT',
    featured: true,
    description: 'Manutenção preventiva e corretiva de equipamentos mecânicos e elétricos na base logística de Palma/Pemba.',
    requirements: [
      'Nível Técnico Médio ou Superior em Engenharia Mecânica/Eletrotécnica',
      'Carta de Condução válida',
      'Certificados de Segurança no Trabalho (HSE)',
      'Disponibilidade para trabalhar em rotação'
    ],
    responsibilities: [
      'Inspecionar bombas e geradores industriais',
      'Registar avarias e emitir ordens de reparação',
      'Cumprir rigorosamente normas internacionais de HSE'
    ]
  },
  {
    id: '4',
    title: 'Oficial de Recursos Humanos',
    company: 'Organização Internacional de Saúde (ONG)',
    location: 'Beira (Sofala)',
    category: 'Saúde & ONGs',
    type: 'Tempo Inteiro',
    postedDate: 'Há 3 dias',
    deadline: '22 de Setembro de 2026',
    salary: '55.000 - 80.000 MT',
    description: 'Gestão de contratações, processamento de salários (payroll) e gestão de desempenho do pessoal de campo.',
    requirements: [
      'Licenciatura em Gestão de Recursos Humanos ou Psicologia Organizacional',
      'Mínimo de 3 anos de experiência no setor de ONGs em Moçambique',
      'Conhecimento aprofundado da Lei do Trabalho de Moçambique (Lei 23/2007)'
    ],
    responsibilities: [
      'Conduzir processos de recrutamento e seleção',
      'Gerir contratos e benefícios dos trabalhadores',
      'Coordenar formações de capacitação técnica'
    ]
  },
  {
    id: '5',
    title: 'Desenvolvedor Web & Suporte TI',
    company: 'Vodacom Moçambique',
    location: 'Maputo',
    category: 'TI & Tecnologia',
    type: 'Híbrido',
    postedDate: 'Há 4 dias',
    deadline: '25 de Setembro de 2026',
    salary: '60.000 - 90.000 MT',
    description: 'Manutenção de sistemas internos, suporte a aplicações web e integração de APIs de pagamento M-Pesa.',
    requirements: [
      'Licenciatura ou Experiência Prática em Engenharia Informática',
      'Conhecimentos em React, JavaScript/TypeScript, SQL e Node.js',
      'Familiaridade com segurança da informação'
    ],
    responsibilities: [
      'Desenvolver módulos para portais internos',
      'Prestar suporte de 2º nível às equipas operacionais',
      'Monitorar estabilidade de serviços críticos'
    ]
  },
  {
    id: '6',
    title: 'Motorista Profissional de Pesados',
    company: 'Bolloré Logistics Moçambique',
    location: 'Nampula / Nacala',
    category: 'Logística & Condução',
    type: 'Tempo Inteiro',
    postedDate: 'Há 5 dias',
    deadline: '30 de Setembro de 2026',
    salary: '35.000 - 50.000 MT',
    description: 'Condução de camiões articulados para transporte de mercadorias no corredor de Nacala e centro do país.',
    requirements: [
      'Carta de Condução Profissional (Serviços / Pesados)',
      'Experiência mínima de 4 anos no transporte de carga',
      'Registo criminal limpo e certificado de saúde válido'
    ],
    responsibilities: [
      'Transportar mercadorias com segurança nas rotas designadas',
      'Verificar estado mecânico do veículo antes de cada viagem',
      'Preencher guias de marcha e relatórios de combustível'
    ]
  }
];

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

const GUEST_MAX_MESSAGES = 2;

const MeuEmprego: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'ai' | 'vagas'>('ai');
  
  // Vagas State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('Todas');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [selectedJob, setSelectedJob] = useState<JobOpportunity | null>(null);

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

  // Filter Jobs Logic
  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = selectedCity === 'Todas' || job.location.includes(selectedCity);
    const matchesCategory = selectedCategory === 'Todas' || job.category.includes(selectedCategory);
    return matchesSearch && matchesCity && matchesCategory;
  });

  const cities = ['Todas', 'Maputo', 'Beira', 'Nampula', 'Pemba', 'Inhambane'];
  const categories = ['Todas', 'Oil & Gas', 'Banca & Finanças', 'TI & Tecnologia', 'Saúde & ONGs', 'Logística & Condução'];

  const triggerAuthGate = (reason: string) => {
    setAuthGateReason(reason);
    setShowAuthGate(true);
  };

  const handleNewChat = () => {
    setChatMessages([]);
    setIsInterviewMode(false);
  };

  // Handle Quick Prompts
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

  // AI Send Message Logic
  const sendMessage = async (customText?: string) => {
    const textToSend = customText || inputPrompt;
    if (!textToSend.trim() || isAiLoading) return;

    // Check Guest Limit
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
      let systemInstruction = `Você é o assistente virtual oficial de carreira do MozVita Moçambique (Especialista em RH Moçambicano).
Responda sempre em Português de Moçambique claro, empático e altamente profissional.
Forneça dicas práticas e estratégicas adaptadas ao mercado de trabalho moçambicano (Maputo, Beira, Nampula, Tete, Pemba), citando exigências reais como NUIT, Carta de Apresentação, LinkedIn e formatação ATS.`;

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
      return `💡 **Como encontrar as melhores vagas no LinkedIn em Moçambique**:\n\n1. **Ajuste a Localização**: Defina seu perfil com a cidade exata (ex: *Maputo, Moçambique* ou *Pemba, Cabo Delgado*).\n2. **Palavras-chave de Pesquisa**: Digite termos como \`"Vaga Moçambique"\`, \`"Recrutamento Maputo"\`, ou \`"Hiring Mozambique"\` na barra de pesquisa e filtre por "Publicações".\n3. **Siga as Principais Empresas**: Siga empresas como Sasol, TotalEnergies, Mozal, BCI, Millennium bim, Vodacom e Tmcel.\n4. **Headline Atraente**: No seu título, use o formato: \`[Sua Profissão] | Especialista em [Área] | Disponível para Oportunidades\`.`;
    }
    if (q.includes('ats') || q.includes('palavras') || q.includes('cv')) {
      return `📄 **Dicas para passar na Triagem Automática (ATS) em Moçambique**:\n\n- **Evite colunas duplas ou gráficos complexos**: Use modelos limpos como os do MozVita.\n- **Inclua Dados Essenciais**: NUIT, Cidade/Província, Contacto Telefónico e Email Profissional.\n- **Termos Exigidos**: Inclua verbos de ação como *Gerenciei, Coordenei, Implementei, Elaborei*.\n- **Formato Obrigatório**: Baixe sempre em formato **PDF** para manter a formatação intacta.`;
    }
    return `Obrigado pela mensagem! Para ter o máximo impacto na sua procura de emprego em Moçambique, certifique-se de que o seu CV está atualizado no MozVita e acompanhe diariamente o nosso **Feed de Vagas**. Posso ajudar-te com mais algum detalhe sobre a tua carreira?`;
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast({ title: 'Texto copiado!', description: 'Resposta copiada para a área de transferência.' });
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleApplyClick = (job: JobOpportunity) => {
    if (!user) {
      setSelectedJob(null);
      triggerAuthGate(`Para se candidatar à vaga de "${job.title}" na empresa "${job.company}" com o seu CV do MozVita, crie a sua conta gratuita!`);
      return;
    }
    setSelectedJob(null);
    toast({
      title: 'Candidatura Iniciada! 🚀',
      description: `A redirecionar para a criação da Carta de Apresentação preenchida para a vaga de ${job.title} na ${job.company}.`
    });
    navigate('/carta-apresentacao', { state: { jobTitle: job.title, company: job.company } });
  };

  const askAiAboutJob = (job: JobOpportunity) => {
    if (!user && guestMessageCount >= GUEST_MAX_MESSAGES) {
      setSelectedJob(null);
      triggerAuthGate('Crie a sua conta gratuita para consultar a Inteligência Artificial sobre esta vaga!');
      return;
    }
    setSelectedJob(null);
    setActiveTab('ai');
    handleQuickPrompt(`Como me posso destacar e preparar o meu CV para a vaga de "${job.title}" na empresa "${job.company}" em ${job.location}?`);
  };

  return (
    <div className="fixed inset-0 top-0 left-0 right-0 bottom-0 z-[60] flex flex-col bg-white text-slate-900 font-sans overflow-hidden m-0 p-0">
      <SEO 
        title="MozVita ChatGPT AI & Vagas Moçambique"
        description="Interface estilo ChatGPT para orientação de carreira e vagas de emprego em Moçambique."
        canonical="/meu-emprego"
      />

      {/* 1. TOP MINIMALIST HEADER BAR (EXACT CHATGPT APP STYLE) */}
      <header className="h-14 border-b border-slate-100 px-4 flex items-center justify-between shrink-0 bg-white z-20">
        <div className="flex items-center gap-2">
          {/* New Chat Button */}
          <button 
            onClick={handleNewChat}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            title="Nova conversa"
          >
            <SquarePen className="w-5 h-5" />
          </button>

          {/* Model & Mode Selector Dropdown */}
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1.5 font-extrabold text-base text-slate-900 hover:bg-slate-100 px-3 py-1.5 rounded-xl transition-colors outline-none">
                <span>{activeTab === 'ai' ? (isInterviewMode ? 'Simulador de Entrevista 🎙️' : 'ChatGPT MozVita ⚡') : 'Feed de Vagas 💼'}</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56 p-1.5 rounded-2xl shadow-xl border-slate-100 bg-white">
              <DropdownMenuItem 
                onClick={() => { setActiveTab('ai'); setIsInterviewMode(false); }}
                className="font-semibold text-xs py-2.5 px-3 rounded-xl cursor-pointer hover:bg-slate-50 flex items-center gap-2"
              >
                <Bot className="w-4 h-4 text-brand-600" /> ChatGPT MozVita AI
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => {
                  if (!user) {
                    triggerAuthGate('Para usar o Simulador de Entrevista de Emprego com a IA, crie a sua conta gratuita!');
                    return;
                  }
                  setActiveTab('ai');
                  setIsInterviewMode(true);
                }}
                className="font-semibold text-xs py-2.5 px-3 rounded-xl cursor-pointer hover:bg-slate-50 flex items-center gap-2 text-amber-600"
              >
                <Award className="w-4 h-4 text-amber-500" /> Simulador de Entrevistas
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setActiveTab('vagas')}
                className="font-semibold text-xs py-2.5 px-3 rounded-xl cursor-pointer hover:bg-slate-50 flex items-center gap-2"
              >
                <Briefcase className="w-4 h-4 text-blue-600" /> Feed de Vagas ({mockJobs.length})
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* User Profile / Auth State Badge */}
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

      {/* 2. CHATGPT MAIN CANVAS WORKSPACE */}
      <div className="flex-1 flex flex-col overflow-hidden relative bg-white">
        <AnimatePresence mode="wait">

          {/* CHAT TAB (CHATGPT EXACT LOOK) */}
          {activeTab === 'ai' && (
            <motion.div 
              key="chatgpt-ai"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col h-full overflow-hidden relative"
            >
              {/* CHAT MESSAGES SCROLL AREA */}
              <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
                
                {/* CHATGPT EMPTY STATE (CENTRALized QUESTION LIKE IMAGE 2) */}
                {chatMessages.length === 0 && (
                  <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-4 max-w-lg mx-auto my-auto space-y-6">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                      Em que posso ajudar hoje?
                    </h2>

                    {/* PROMPT PRESET PILLS (CHATGPT STYLE) */}
                    <div className="w-full space-y-2.5">
                      {[
                        { prompt: "Como achar vagas no LinkedIn em Moçambique?", label: "Vagas no LinkedIn em Moçambique" },
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

                {/* MESSAGES LIST */}
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
                      <span>A escrever...</span>
                    </div>
                  )}

                  <div ref={chatBottomRef} />
                </div>
              </div>

              {/* 3. FLOATING INPUT CONTAINER (EXACT CHATGPT APP STYLE AS IMAGE 2) */}
              <div className="shrink-0 z-30 bg-white border-t border-slate-100 p-3 pb-24 lg:pb-4 pointer-events-auto shadow-sm">
                <div className="max-w-2xl mx-auto">
                  <div className="rounded-full border border-slate-200 bg-slate-50/90 shadow-lg px-3 py-1.5 flex items-center gap-2 backdrop-blur-md focus-within:border-slate-400 transition-colors">
                    {/* Plus Button */}
                    <button 
                      onClick={() => handleQuickPrompt("Como otimizar meu CV para o mercado moçambicano?")}
                      className="w-8 h-8 rounded-full bg-slate-200/70 hover:bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-base transition-colors shrink-0"
                      title="Sugestões"
                    >
                      +
                    </button>

                    {/* Input Field */}
                    <input
                      type="text"
                      placeholder="Pergunte algo..."
                      value={inputPrompt}
                      onChange={(e) => setInputPrompt(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                      className="flex-1 bg-transparent border-0 outline-none px-2 text-sm text-slate-900 placeholder:text-slate-400 font-medium"
                    />

                    {/* Circular Send Button (Up Arrow like ChatGPT) */}
                    <button
                      onClick={() => sendMessage()}
                      disabled={isAiLoading || !inputPrompt.trim()}
                      className="w-9 h-9 rounded-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-200 disabled:opacity-40 text-white flex items-center justify-center transition-all shrink-0 shadow-sm"
                    >
                      <ArrowUp className="w-4 h-4 font-bold" />
                    </button>
                  </div>

                  {/* Legal Disclaimer Footer (ChatGPT Minimal) */}
                  <p className="text-[10px] text-center text-slate-400 mt-2 font-medium">
                    Ao conversar com o MozVita AI, concorda com os nossos <button onClick={() => navigate('/termos-de-uso')} className="underline hover:text-slate-600">Termos</button> e <button onClick={() => navigate('/politica-de-privacidade')} className="underline hover:text-slate-600">Privacidade</button>.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB: FEED DE VAGAS EM MOÇAMBIQUE */}
          {activeTab === 'vagas' && (
            <motion.div 
              key="vagas-feed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 overflow-y-auto p-4 md:p-8 max-w-4xl mx-auto w-full space-y-6 pb-20"
            >
              {/* Search & Filter Controls */}
              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input 
                    type="text"
                    placeholder="Buscar cargo ou empresa (ex: Logística, Sasol, Contabilidade)..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-11 h-12 rounded-2xl text-sm border-slate-200 focus:border-slate-400 bg-slate-50/50"
                  />
                </div>

                {/* City Filters */}
                <div className="flex flex-wrap gap-1.5">
                  {cities.map(city => (
                    <button
                      key={city}
                      onClick={() => setSelectedCity(city)}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                        selectedCity === city
                          ? 'bg-slate-900 text-white shadow-sm'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>

              {/* Job Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredJobs.length > 0 ? (
                  filteredJobs.map(job => (
                    <Card key={job.id} className="rounded-2xl border-slate-200 shadow-sm hover:shadow-md transition-all bg-white flex flex-col h-full border">
                      <CardHeader className="pb-2 pt-4 px-4">
                        <div className="flex justify-between items-start gap-2 mb-1">
                          <Badge className="bg-slate-100 text-slate-800 border-0 text-[10px] px-2.5 py-0.5 font-bold">
                            {job.category}
                          </Badge>
                        </div>
                        <CardTitle className="text-base font-bold text-slate-900 hover:text-brand-600 transition-colors cursor-pointer" onClick={() => setSelectedJob(job)}>
                          {job.title}
                        </CardTitle>
                        <CardDescription className="text-xs font-semibold text-slate-500 flex items-center gap-1 mt-0.5">
                          <Building2 className="w-3.5 h-3.5 text-slate-400" /> {job.company} — {job.location}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="flex-1 flex flex-col justify-between pt-0 pb-4 px-4">
                        <p className="text-slate-600 text-xs line-clamp-2 my-2 leading-relaxed">
                          {job.description}
                        </p>

                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-[11px] font-bold text-slate-700 bg-slate-50 px-2.5 py-1 rounded-lg">
                            {job.salary}
                          </span>
                          <Button 
                            size="sm"
                            onClick={() => setSelectedJob(job)}
                            className="bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs h-8 px-3"
                          >
                            Ver Vaga <ChevronRight className="w-3.5 h-3.5 ml-1" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-full rounded-2xl p-8 text-center border border-slate-200 bg-white">
                    <HelpCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <h3 className="text-sm font-bold text-slate-800">Nenhuma vaga encontrada</h3>
                  </div>
                )}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* JOB DETAIL DIALOG MODAL */}
      <Dialog open={!!selectedJob} onOpenChange={() => setSelectedJob(null)}>
        {selectedJob && (
          <DialogContent className="max-w-2xl rounded-3xl p-6 md:p-8 max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-brand-50 text-brand-700 border-brand-200 text-xs px-3 py-1 font-bold">
                  {selectedJob.category}
                </Badge>
                <Badge variant="outline" className="text-slate-500 text-xs">
                  {selectedJob.type}
                </Badge>
              </div>
              <DialogTitle className="text-2xl font-black text-slate-900 leading-tight">
                {selectedJob.title}
              </DialogTitle>
              <DialogDescription className="text-base font-bold text-slate-700 flex items-center gap-2 mt-1">
                <Building2 className="w-4 h-4 text-brand-600" /> {selectedJob.company} — <MapPin className="w-4 h-4 text-slate-400" /> {selectedJob.location}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 my-4 text-sm text-slate-700">
              <div>
                <h4 className="font-bold text-slate-900 text-base mb-2">Descrição da Função:</h4>
                <p className="leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">{selectedJob.description}</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-base mb-2">Requisitos Exigidos:</h4>
                <ul className="space-y-2">
                  {selectedJob.requirements.map((req, rIdx) => (
                    <li key={rIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-amber-800 block">Faixa Salarial Estimada:</span>
                  <span className="text-base font-black text-slate-900">{selectedJob.salary}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-amber-800 block">Prazo de Candidatura:</span>
                  <span className="text-xs font-bold text-slate-900">{selectedJob.deadline}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-100">
              <Button
                size="lg"
                onClick={() => handleApplyClick(selectedJob)}
                className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-black h-13 rounded-2xl shadow-md"
              >
                <FileText className="w-5 h-5 mr-2" /> Candidatar com CV & Criar Carta
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => askAiAboutJob(selectedJob)}
                className="border-2 border-slate-200 hover:bg-slate-50 text-slate-800 font-bold h-13 rounded-2xl"
              >
                <Bot className="w-5 h-5 mr-2 text-brand-600" /> Dicas da IA para esta vaga
              </Button>
            </div>
          </DialogContent>
        )}
      </Dialog>

      {/* AUTH GATE DIALOG MODAL (For Visitors trying Protected Actions) */}
      <Dialog open={showAuthGate} onOpenChange={setShowAuthGate}>
        <DialogContent className="max-w-md rounded-3xl p-6 md:p-8 text-center">
          <div className="w-16 h-16 rounded-3xl bg-slate-900 flex items-center justify-center text-white mx-auto mb-4 shadow-xl">
            <Lock className="w-8 h-8" />
          </div>
          <DialogTitle className="text-2xl font-black text-slate-900 mb-2">
            Crie a sua Conta Gratuita 🚀
          </DialogTitle>
          <DialogDescription className="text-sm text-slate-600 leading-relaxed mb-6">
            {authGateReason || 'Para candidatar-se a vagas com 1 clique, simular entrevistas de emprego e usar a Inteligência Artificial ilimitadamente, crie a sua conta gratuita no MozVita em 10 segundos.'}
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

export default MeuEmprego;
