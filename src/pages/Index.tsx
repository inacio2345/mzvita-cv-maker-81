import React from 'react';
import { Button } from '@/components/ui/button';
import {
  FileText, Shield, Download, Star, CheckCircle,
  User, Briefcase, ChevronRight, Globe,
  Check, ArrowRight, MousePointerClick, FileEdit, Award, Layout, Zap, Crown, ShieldCheck
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import SEO from '@/components/SEO';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cvTemplates } from '@/data/cvTemplates';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import UniversalAd from '@/components/ads/UniversalAd';
import { useSubscription } from '@/hooks/useSubscription';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { initiatePayment } = useSubscription();
  const isMobile = useIsMobile();

  const professions = [
    {
      id: 'engenharia',
      label: 'Engenharia & Obras',
      name: 'Eng. Sérgio Macamo',
      title: 'Engenheiro Civil & Gestor de Obras',
      tags: ['Gestão de Obras', 'AutoCAD', 'Segurança HST'],
      image: '/lovable-uploads/template-01.jpg',
      color: 'from-blue-600 to-indigo-600',
      badge: 'Multinacionais & Gás'
    },
    {
      id: 'banca',
      label: 'Banca & Finanças',
      name: 'Dra. Carla Matusse',
      title: 'Analista Financeira & Tesouraria',
      tags: ['Análise Financeira', 'Excel Avançado', 'SAP'],
      image: '/lovable-uploads/template-02.jpg',
      color: 'from-emerald-600 to-teal-600',
      badge: 'Bancos (bim, BCI, Standard)'
    },
    {
      id: 'saude',
      label: 'Saúde & Enfermagem',
      name: 'Enf. Júlia Langa',
      title: 'Enfermeira Geral & Cuidados Intensivos',
      tags: ['Primeiros Socorros', 'Triagem', 'Atendimento'],
      image: '/lovable-uploads/template-03.jpg',
      color: 'from-cyan-600 to-blue-600',
      badge: 'Hospitais & ONGs'
    },
    {
      id: 'it',
      label: 'TI & Programação',
      name: 'Eng. Nelson Sitoe',
      title: 'Desenvolvedor Full Stack & Cloud',
      tags: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
      image: '/lovable-uploads/template-05.jpg',
      color: 'from-amber-500 to-orange-600',
      badge: 'Tecnologia & Remoto'
    }
  ];

  const [activeProfIndex, setActiveProfIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'elegante' | 'moderno' | 'criativo'>('all');

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveProfIndex((prev) => (prev + 1) % professions.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handleProtectedAction = (path: string) => {
    if (!user) {
      navigate('/auth', { state: { from: path } });
    } else {
      navigate(path);
    }
  };

  const handleBuyClick = (planId: 'single' | 'monthly' | 'annual') => {
      if (!user) {
          navigate('/auth', { state: { from: '/precos' } });
          return;
      }
      initiatePayment(planId);
  };

  const richSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "MozVita CV",
      "url": "https://www.mozvita.online",
      "logo": "https://www.mozvita.online/logo.png",
      "description": "Plataforma líder para criação de currículos profissionais em Moçambique com pagamento via M-Pesa."
    },
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "MozVita CV Maker",
      "url": "https://www.mozvita.online",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "All",
      "offers": {
        "@type": "Offer",
        "price": "50.00",
        "priceCurrency": "MZN"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Como fazer um Curriculum Vitae (CV) profissional para Moçambique?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Para criar um cv profissional em Moçambique, basta escolher um modelo na nossa plataforma, preencher os seus dados no formulário e baixar o arquivo em formato PDF adaptado ao mercado local."
          }
        },
        {
          "@type": "Question",
          "name": "O que os recrutadores moçambicanos e multinacionais procuram?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Os recrutadores procuram organização, clareza e resultados. As empresas em Moçambique valorizam estruturas onde a experiência profissional mais recente aparece primeiro, juntamente com competências e referências."
          }
        },
        {
          "@type": "Question",
          "name": "Devo colocar foto no meu CV?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Em Moçambique, a maioria dos empregadores (especialmente nas áreas de atendimento, banca e vendas) aprecia fotos profissionais no CV. Recomendamos foto formal com fundo neutro."
          }
        },
        {
          "@type": "Question",
          "name": "O MozVita tem custos?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "O MozVita possui criação e edição sem compromisso. É cobrada apenas uma taxa simbólica (a partir de 50 MT) via M-Pesa no momento de baixar o PDF final sem marca d'água."
          }
        }
      ]
    }
  ];

  const plans = [
    {
        id: 'single' as const,
        name: 'Plano Avulso',
        price: '100',
        period: 'item',
        description: 'Ideal para uma necessidade rápida e pontual.',
        icon: <Zap className="w-8 h-8 text-blue-500" />,
        features: [
            '1 Download Profissional (PDF)',
            "Remoção de marca d'água",
            'Alta resolução garantida',
            'Acesso vitalício ao documento'
        ],
        recommended: false
    },
    {
        id: 'monthly' as const,
        name: 'Plano Mensal',
        price: '200',
        period: 'mês',
        description: 'Para quem está focado em conseguir o emprego ideal.',
        icon: <Star className="w-8 h-8 text-green-500" />,
        features: [
            '10 Downloads (CVs ou Cartas)',
            'Sem Anúncios no sistema',
            'Acesso a Templates Premium',
            'Cartas de Apresentação ilimitadas',
            'Dicas exclusivas de carreira'
        ],
        recommended: true
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
        recommended: false
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden max-w-full font-sans">
      <SEO
        title="CV Moçambique 2026: Criar e Baixar Curriculum Vitae em PDF | MozVita"
        description="Crie seu curriculum vitae moçambique em minutos no celular ou computador. Modelos profissionais aprovados por recrutadores, download rápido em PDF e pagamento via M-Pesa."
        keywords="curriculum vitae moçambique, cv moçambique, baixar curriculum vitae pdf moçambique, curriculum vitae moçambique pdf 2026, cv moz, cv profissional moçambique, modelo de cv moçambique, criar cv online"
        canonical="/"
        schemaData={richSchemas}
      />

      {/* 1. Hero Section (Parallax & Premium) */}
      <section className="pt-24 md:pt-36 pb-16 lg:pb-24 overflow-hidden bg-gradient-to-br from-slate-50 via-brand-50/40 to-slate-100 relative max-w-full">
        {/* Decorative background blobs */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] lg:w-[600px] lg:h-[600px] bg-brand-300/20 rounded-full blur-3xl opacity-50 animate-pulse pointer-events-none max-w-full overflow-hidden" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px] bg-blue-300/20 rounded-full blur-3xl opacity-50 pointer-events-none max-w-full overflow-hidden" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-20">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex-1 text-center md:text-left z-10"
            >
              <Badge variant="outline" className="mb-6 px-4 py-1.5 text-sm font-medium text-brand-700 border-brand-200 bg-brand-50 rounded-full">
                <SparklesIcon className="w-4 h-4 inline-block mr-2 text-brand-500" />
                A Plataforma Nº1 de CVs em Moçambique
              </Badge>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.1] mb-6 tracking-tight">
                Seu Próximo <br className="hidden lg:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-blue-500">
                  Emprego Começa
                </span> Aqui.
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl mx-auto md:mx-0 leading-relaxed">
                Crie um <strong>CV profissional</strong> aprovado por recrutadores moçambicanos em minutos. Modelos modernos, fáceis de editar e prontos para impressionar multinacionais.
              </p>
              
              {/* Interactive Profession Selector Pills */}
              <div className="mb-6 flex flex-wrap gap-2 justify-center md:justify-start">
                <span className="text-xs font-bold text-slate-400 self-center mr-1">Simular Área:</span>
                {professions.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => setActiveProfIndex(idx)}
                    className={cn(
                      "px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-300 flex items-center gap-1.5 cursor-pointer",
                      activeProfIndex === idx
                        ? "bg-slate-900 text-white shadow-md scale-105"
                        : "bg-white/80 text-slate-600 hover:bg-white hover:text-slate-900 border border-slate-200/80"
                    )}
                  >
                    <span className={cn("w-2 h-2 rounded-full", activeProfIndex === idx ? "bg-brand-400 animate-ping" : "bg-slate-300")} />
                    {p.label}
                  </button>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-gradient-to-r from-brand-600 to-blue-600 hover:from-brand-700 hover:to-blue-700 text-white px-8 h-14 text-lg rounded-2xl shadow-[0_8px_30px_rgb(93,37,231,0.3)] transition-all border-0 btn-shine-sweep"
                    onClick={() => handleProtectedAction('/modelos')}
                  >
                    <FileText className="mr-2 h-5 w-5" />
                    Criar meu CV Agora
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-2 border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-brand-700 px-8 h-14 text-lg rounded-2xl font-bold transition-all shadow-sm"
                    onClick={() => navigate('/modelos')}
                  >
                    Ver Modelos de CV
                  </Button>
                </motion.div>
              </div>

              <div className="mt-10 flex items-center justify-center md:justify-start gap-4 text-sm text-slate-500">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 overflow-hidden shadow-sm">
                      <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${i}&backgroundColor=e2e8f0`} alt="User" />
                    </div>
                  ))}
                </div>
                <div className="text-left leading-tight">
                  <div className="flex items-center gap-1 text-yellow-400">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="font-medium text-slate-700 mt-1">Mais de <strong>10.000+</strong> CVs criados em Moçambique</p>
                </div>
              </div>
            </motion.div>

            {/* Interactive Dynamic CV Showcase (Right Side) */}
            <div className="flex-1 relative hidden md:block">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeProfIndex}
                  initial={{ opacity: 0, y: 20, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.96 }}
                  transition={{ duration: 0.4 }}
                  className="relative w-full max-w-[480px] mx-auto aspect-[1/1.25] rounded-[2.5rem] bg-white/60 backdrop-blur-3xl border border-white/80 shadow-[0_25px_60px_rgba(93,37,231,0.12)] p-4 transform rotate-1 hover:rotate-0 transition-transform duration-500"
                >
                  <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl relative border border-slate-100 bg-white">
                    <img
                      src={professions[activeProfIndex].image}
                      alt={professions[activeProfIndex].title}
                      className="w-full h-full object-cover object-top"
                    />

                    {/* Floating Badges & Live Information Overlay */}
                    <div className="absolute top-4 right-4 z-20">
                      <Badge className={`bg-gradient-to-r ${professions[activeProfIndex].color} text-white shadow-lg border-0 text-xs px-3 py-1 font-bold`}>
                        {professions[activeProfIndex].badge}
                      </Badge>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 z-20 bg-slate-900/90 backdrop-blur-md text-white p-4 rounded-2xl border border-white/10 shadow-2xl">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-extrabold text-sm text-white">{professions[activeProfIndex].name}</h4>
                          <p className="text-xs text-brand-300 font-medium">{professions[activeProfIndex].title}</p>
                        </div>
                        <span className="bg-green-500/20 text-green-400 text-[10px] font-black px-2 py-0.5 rounded-full border border-green-500/30 flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" /> Aprovado
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {professions[activeProfIndex].tags.map((tag, tIdx) => (
                          <span key={tIdx} className="bg-white/10 text-slate-200 text-[10px] px-2 py-0.5 rounded-md font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Slot de Anúncio 1: Hero Adsterra */}
      <div className="container mx-auto px-4 my-4 max-w-full overflow-hidden">
        <UniversalAd slotName="home_hero" />
      </div>

      {/* Estatísticas e Diferenciais Competitivos (Por que o MozVita é o Nº 1) */}
      <section className="py-20 bg-gradient-to-b from-white via-slate-50 to-white relative border-y border-slate-100 overflow-hidden">
        <div className="container mx-auto px-4">
          {/* Live Stats Bar com Efeito Spring Pop de Alta Visibilidade */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-20">
            {[
              { label: "CVs Baixados", value: "10.000+", subText: "Em todo Moçambique", icon: <Download className="w-6 h-6 text-brand-600" /> },
              { label: "Aprovação em Vagas", value: "98%", subText: "Avaliado por recrutadores", icon: <Award className="w-6 h-6 text-green-600" /> },
              { label: "Tempo Médio", value: "2 min", subText: "Pronto no celular", icon: <Zap className="w-6 h-6 text-amber-500" /> },
              { label: "Pagamento Local", value: "M-Pesa", subText: "Rápido & sem cartão", icon: <ShieldCheck className="w-6 h-6 text-blue-600" /> }
            ].map((stat, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 60, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-30px" }}
                whileHover={{ y: -10, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 260, damping: 18, delay: idx * 0.12 }}
                key={idx}
                className="bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_rgba(93,37,231,0.15)] hover:border-brand-200 transition-all text-center flex flex-col items-center cursor-pointer group"
              >
                <div className="w-14 h-14 rounded-2xl bg-slate-50 group-hover:bg-brand-50 flex items-center justify-center mb-4 transition-colors">
                  {stat.icon}
                </div>
                <span className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight group-hover:text-brand-600 transition-colors">{stat.value}</span>
                <span className="text-sm font-bold text-slate-700 mt-1">{stat.label}</span>
                <span className="text-xs text-slate-400 mt-0.5">{stat.subText}</span>
              </motion.div>
            ))}
          </div>

          {/* Comparativo de Diferenciais Competitivos com 3D Tilt Pop */}
          <motion.div 
            initial={{ opacity: 0, y: 80, scale: 0.92 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", stiffness: 180, damping: 20 }}
            className="max-w-5xl mx-auto bg-gradient-to-br from-slate-900 via-slate-800 to-brand-950 rounded-[2.5rem] p-8 md:p-14 text-white shadow-[0_30px_80px_rgba(15,23,42,0.4)] relative overflow-hidden border border-white/10"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
            
            <div className="text-center max-w-2xl mx-auto mb-12 relative z-10">
              <Badge className="mb-4 bg-brand-500/30 text-brand-300 border-brand-400/40 text-xs px-4 py-1.5 font-bold shadow-lg shadow-brand-500/20">
                Líder Absoluto no Mercado Moçambicano
              </Badge>
              <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight leading-tight">Por que o MozVita é imbatível?</h2>
              <p className="text-slate-300 text-base md:text-lg">
                Ao contrário de geradores estrangeiros genéricos e complicados, o MozVita foi feito sob medida para o trabalhador moçambicano.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
              {[
                {
                  title: "🇲🇿 Padrão Exigido em Moçambique",
                  desc: "Campos nativos para NUIT, BBI, Estado Civil, Carta de Condução e Referências Profissionais válidas."
                },
                {
                  title: "📱 100% Funcional no Telemóvel",
                  desc: "Crie, edite e baixe seu CV em PDF direto pelo celular sem precisar de computador nem instalar aplicativos."
                },
                {
                  title: "⚡ M-Pesa & e-Mola Integrados",
                  desc: "Sem necessidade de cartões de crédito internacionais ou dólares. Pague em Meticais com confirmação em segundos."
                },
                {
                  title: "🤖 Formulário Inteligente com IA",
                  desc: "Sugestões de textos prontos para descrever suas experiências, habilidades e objetivos profissionais."
                }
              ].map((item, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: isMobile ? 0 : (i % 2 === 0 ? -40 : 40), y: 30 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 200, damping: 18, delay: i * 0.12 }}
                  whileHover={{ scale: 1.03, translateY: -6 }}
                  key={i} 
                  className="bg-white/10 backdrop-blur-md rounded-3xl p-7 border border-white/15 hover:border-brand-400/50 hover:bg-white/15 transition-all shadow-xl cursor-pointer group"
                >
                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-brand-300 transition-colors">{item.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 text-center relative z-10">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-brand-500 to-blue-600 hover:from-brand-600 hover:to-blue-700 text-white font-black px-10 h-16 text-lg rounded-2xl shadow-[0_10px_30px_rgba(93,37,231,0.4)] border-0 btn-shine-sweep"
                  onClick={() => handleProtectedAction('/modelos')}
                >
                  Experimentar Gratuitamente Agora <ChevronRight className="ml-2 w-6 h-6" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Como Funciona Section com Linha de Progresso & Bouncing Steps */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: "spring" }}
            className="text-center mb-20"
          >
            <Badge className="mb-4 bg-brand-100 text-brand-700 hover:bg-brand-200 border-none shadow-none text-sm px-4 py-1.5 font-bold">Processo Simples</Badge>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Como criar o seu CV em 3 passos</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">Sem complicações. O nosso sistema foi desenhado para ser rápido e eficaz.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto relative">
            {/* Connecting Line Animada de Alto Impacto */}
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
              className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-1 bg-gradient-to-r from-blue-500 via-brand-500 to-green-500 -translate-y-1/2 z-0 rounded-full shadow-md origin-left"
            ></motion.div>

            {[
              { 
                icon: <Layout className="w-8 h-8 text-white" />, 
                title: "1. Escolha um Modelo", 
                desc: "Explore a nossa biblioteca de modelos profissionais, desenhados especificamente para o mercado moçambicano e multinacionais.",
                color: "from-blue-500 to-cyan-500"
              },
              { 
                icon: <FileEdit className="w-8 h-8 text-white" />, 
                title: "2. Preencha os Dados", 
                desc: "Use o nosso formulário inteligente e fácil de usar. Receba dicas automáticas sobre como descrever a sua experiência.",
                color: "from-brand-500 to-purple-500"
              },
              { 
                icon: <Download className="w-8 h-8 text-white" />, 
                title: "3. Pague e Baixe o PDF", 
                desc: "Faça o pagamento da taxa e baixe o seu currículo instantaneamente. Formatação perfeita, sem surpresas e sem marcas d'água.",
                color: "from-green-500 to-emerald-500"
              }
            ].map((step, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 80, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ y: -12, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 220, damping: 16, delay: i * 0.2 }}
                key={i} 
                className="relative z-10 flex flex-col items-center text-center bg-white p-8 md:p-10 rounded-[2.5rem] shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_25px_60px_rgba(93,37,231,0.15)] border border-slate-100 hover:border-brand-200 transition-all group cursor-pointer"
              >
                <motion.div 
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: i * 0.5 }}
                  className={`w-20 h-20 rounded-3xl flex items-center justify-center bg-gradient-to-br ${step.color} shadow-xl mb-6 transform -rotate-3 group-hover:rotate-0 transition-transform`}
                >
                  {step.icon}
                </motion.div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-600 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Slot de Anúncio 2: Mid-Page Adsterra */}
      <div className="container mx-auto px-4 my-6 max-w-full overflow-hidden">
        <UniversalAd slotName="home_mid" />
      </div>

      {/* 3. Modelos Premium Slider / Showcase */}
      <section className="py-24 bg-slate-900 overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <Badge className="mb-4 bg-brand-500/20 text-brand-300 border-none shadow-none text-sm px-4 py-1">Design Vencedor</Badge>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Modelos que os Recrutadores Amam</h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                Esqueça o Word desformatado. Oferecemos templates <strong>modernos e elegantes</strong>.
              </p>
            </div>
            <Button 
              variant="outline" 
              className="bg-transparent border-slate-700 text-white hover:bg-slate-800 hover:text-white rounded-xl px-6 h-12"
              onClick={() => navigate('/modelos')}
            >
              Ver todos os Modelos <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
          
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-3 mb-10">
            {[
              { id: 'all', label: 'Todos os Modelos' },
              { id: 'elegante', label: 'Elegantes & Clássicos' },
              { id: 'moderno', label: 'Modernos & Sidebar' },
              { id: 'criativo', label: 'Criativos & Destaque' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={cn(
                  "px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border cursor-pointer",
                  selectedCategory === cat.id
                    ? "bg-brand-500 text-white border-brand-400 shadow-lg shadow-brand-500/25 scale-105"
                    : "bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700 hover:text-white"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex gap-6 overflow-x-auto pb-10 hide-scrollbar snap-x">
            <AnimatePresence mode="popLayout">
              {cvTemplates.filter(template => {
                if (!template.previewImage) return false;
                if (selectedCategory === 'all') return true;
                if (selectedCategory === 'elegante') return template.layout.includes('elegant') || template.id.includes('classico');
                if (selectedCategory === 'moderno') return template.layout.includes('modern') || template.layout.includes('sidebar');
                if (selectedCategory === 'criativo') return template.layout.includes('creative') || template.layout.includes('diagonal');
                return true;
              }).map((template, i) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  key={template.id} 
                  className="min-w-[280px] md:min-w-[350px] snap-center group cursor-pointer"
                  onClick={() => handleProtectedAction('/modelos')}
                >
                  <div className="bg-slate-800 rounded-3xl p-4 transition-all duration-300 group-hover:bg-slate-700 border border-slate-700 group-hover:border-brand-500 shadow-xl">
                    <div className="aspect-[1/1.4] rounded-2xl overflow-hidden mb-4 relative shadow-2xl">
                      <img 
                        src={template.previewImage} 
                        alt={`Modelo ${template.nome}`}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-brand-600/0 group-hover:bg-brand-600/20 transition-colors duration-300 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-white text-brand-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-xl">
                          <MousePointerClick className="w-8 h-8" />
                        </div>
                      </div>
                    </div>
                    <div className="px-2">
                      <h3 className="text-white font-bold text-xl">{template.nome}</h3>
                      <p className="text-slate-400 text-sm mt-1">{template.layout === 'single-column-elegant' ? 'Layout Elegante' : 'Design Profissional e Moderno'}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-white relative" id="planos">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <Badge className="mb-4 bg-green-100 text-green-700 border-none shadow-none text-sm px-4 py-1">Preços Justos</Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Pague apenas quando estiver perfeito</h2>
            <p className="text-slate-600 text-lg">Crie e edite sem compromisso. Só cobramos uma taxa simbólica para baixar o seu <strong>cv moçambique pdf</strong> final. Pagamentos facilitados via M-Pesa e e-Mola.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 80, scale: plan.recommended ? 0.85 : 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: plan.recommended ? 1.05 : 1 }}
                viewport={{ once: true, margin: "-40px" }}
                whileHover={{ y: -12, scale: plan.recommended ? 1.08 : 1.04 }}
                transition={{ type: "spring", stiffness: 240, damping: 16, delay: i * 0.15 }}
                key={plan.id}
                className="h-full"
              >
                <Card 
                  className={cn(
                    "relative rounded-[2.5rem] border-2 transition-all duration-300 hover:shadow-[0_25px_60px_rgba(93,37,231,0.2)] overflow-hidden flex flex-col bg-white h-full",
                    plan.recommended ? "border-brand-500 shadow-[0_15px_50px_rgba(93,37,231,0.25)] transform md:-translate-y-4" : "border-slate-100 shadow-md"
                  )}
                >
                  {plan.recommended && (
                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-brand-600 to-blue-600 text-white text-xs font-black py-2 text-center uppercase tracking-widest z-10 shadow-md">
                      Mais Popular
                    </div>
                  )}
                  <CardHeader className={cn("pt-8 pb-4", plan.recommended ? "mt-4" : "")}>
                    <div className="mb-6 inline-flex p-4 rounded-2xl bg-slate-50 border border-slate-100">
                      {plan.icon}
                    </div>
                    <CardTitle className="text-2xl font-bold text-slate-900">{plan.name}</CardTitle>
                    <CardDescription className="text-slate-500 mt-2 min-h-[40px] text-base">{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-8 flex-1">
                    <div className="mb-8 flex items-end gap-1">
                      <span className="text-5xl font-black text-slate-900 tracking-tight">{plan.price}</span>
                      <span className="text-xl font-bold text-slate-500 mb-1">MT</span>
                      <span className="text-slate-400 font-medium">/{plan.period}</span>
                    </div>
                    <div className="space-y-4">
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-50 flex items-center justify-center">
                            <Check className="w-3.5 h-3.5 text-brand-600 font-bold" />
                          </div>
                          <span className="text-slate-700 font-medium text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0 pb-8 px-6">
                    <Button
                      size="lg"
                      className={cn(
                        "w-full h-14 text-lg rounded-2xl font-bold transition-all btn-shine-sweep",
                        plan.recommended 
                          ? "bg-gradient-to-r from-brand-600 to-blue-600 hover:from-brand-700 hover:to-blue-700 text-white shadow-xl shadow-brand-500/25 border-0" 
                          : "bg-slate-100 hover:bg-slate-200 text-slate-900 border-0"
                      )}
                      onClick={() => handleBuyClick(plan.id)}
                    >
                      Começar Agora
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO & Text Content Section com Revelação 3D 2 Colunas */}
      <section className="py-24 bg-slate-100/70 border-t border-slate-200 overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Card Principal da Seção com Respiro e Design 2 Colunas */}
          <motion.div 
            initial={{ opacity: 0, y: 80, scale: 0.92 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", stiffness: 180, damping: 20 }}
            className="bg-white rounded-[2.5rem] p-8 md:p-14 shadow-2xl border border-slate-200/80 mb-16"
          >
            <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14">
              
              {/* Lado Esquerdo: Conteúdo Estruturado */}
              <div className="flex-1">
                <Badge className="mb-4 bg-brand-50 text-brand-700 border-brand-200 text-xs px-3.5 py-1 font-semibold">
                  Guia Profissional & Mercado Local
                </Badge>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight tracking-tight">
                  A Importância de um Bom Curriculum Vitae em Moçambique
                </h2>
                
                <div className="space-y-4 text-slate-600 leading-relaxed text-base">
                  {[
                    {
                      icon: <Briefcase className="w-5 h-5" />,
                      color: "bg-brand-100 text-brand-600",
                      title: "Mercado de Alta Competitividade",
                      desc: "Em cidades como Maputo, Matola, Beira e Nampula, vagas na Função Pública e em Multinacionais (Oil & Gas, Banca, Telecomunicações) recebem centenas de candidaturas. O seu CV é a chave para garantir chamadas de entrevista."
                    },
                    {
                      icon: <FileText className="w-5 h-5" />,
                      color: "bg-blue-100 text-blue-600",
                      title: "Triagem Automática e Formato PDF",
                      desc: "Currículos feitos em Word ou sem estrutura clara são rapidamente descartados. O nosso gerador cria CVs em PDF (ATS Friendly) com margens perfeitas e prontos para impressão."
                    },
                    {
                      icon: <CheckCircle className="w-5 h-5" />,
                      color: "bg-green-100 text-green-600",
                      title: "Adequado às Exigências Moçambicanas",
                      desc: "Integramos os campos certos para informações vitais no contexto moçambicano (como NUIT, BBI, Nacionalidade e Referências Profissionais)."
                    }
                  ].map((benefit, bIdx) => (
                    <motion.div 
                      key={bIdx}
                      initial={{ opacity: 0, x: isMobile ? 0 : -50, y: isMobile ? 20 : 0 }}
                      whileInView={{ opacity: 1, x: 0, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 200, damping: 18, delay: bIdx * 0.15 }}
                      whileHover={{ scale: 1.02, x: 6 }}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3 hover:bg-slate-100/80 transition-all cursor-pointer"
                    >
                      <div className={`p-2 rounded-xl ${benefit.color} font-bold mt-0.5 shadow-sm`}>
                        {benefit.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm mb-1">{benefit.title}</h4>
                        <p className="text-sm text-slate-600">{benefit.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Lado Direito: Imagem de Destaque / Mockup Profissional com Entrada 3D */}
              <motion.div 
                initial={{ opacity: 0, x: isMobile ? 0 : 60, y: isMobile ? 30 : 0, rotate: isMobile ? 0 : 6, scale: 0.9 }}
                whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 180, damping: 16, delay: 0.2 }}
                className="w-full lg:w-[420px] flex-shrink-0"
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-100 bg-gradient-to-br from-brand-900 to-slate-900 p-6 text-white group">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-brand-500/20 rounded-full blur-2xl pointer-events-none" />
                  
                  {/* Capa de Exemplo em Destaque */}
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-xl border border-white/20 mb-4 bg-white">
                    <img 
                      src="/lovable-uploads/template-01.jpg" 
                      alt="Modelo de CV Profissional Moçambique"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs font-medium pt-2 text-slate-300 border-t border-white/10">
                    <span className="flex items-center gap-1 text-green-400 font-bold">
                      <CheckCircle className="w-4 h-4" /> 100% Padrão Moçambique
                    </span>
                    <span className="bg-brand-500/30 px-2.5 py-1 rounded-full text-brand-200 font-semibold">
                      PDF HD
                    </span>
                  </div>
                </div>
              </motion.div>

            </div>
          </motion.div>

          {/* Slot de Anúncio 3: Footer/FAQ Adsterra */}
          <div className="container mx-auto px-4 my-6 max-w-full overflow-hidden">
            <UniversalAd slotName="home_footer" />
          </div>

          <div className="mb-8">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-slate-900 mb-8 tracking-tight text-center"
            >
              Perguntas Frequentes (FAQ)
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Accordion type="single" collapsible className="w-full bg-white rounded-3xl p-6 shadow-xl border border-slate-100">
                <AccordionItem value="item-1" className="border-b-slate-100 py-2">
                  <AccordionTrigger className="text-left font-bold text-slate-800 text-lg hover:text-brand-600 hover:no-underline">
                    Como fazer um Curriculum Vitae (CV) profissional para Moçambique?
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 text-base leading-relaxed pt-2">
                    Para criar um cv profissional em Moçambique, evite o clássico "Word" desformatado. No Mozvita, basta selecionar um modelo da nossa biblioteca (ex: Clássico Elegante ou Moderno), preencher os seus dados académicos e profissionais no nosso formulário passo a passo, e o sistema trata da formatação perfeita automaticamente. No final, só precisa de baixar em PDF.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="border-b-slate-100 py-2">
                  <AccordionTrigger className="text-left font-bold text-slate-800 text-lg hover:text-brand-600 hover:no-underline">
                    O que os recrutadores moçambicanos e multinacionais procuram?
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 text-base leading-relaxed pt-2">
                    Os recrutadores procuram organização, clareza e resultados. As empresas em Moçambique valorizam uma estrutura onde a sua Experiência Profissional mais recente aparece primeiro. Além disso, ter uma secção de "Soft Skills" (Liderança, Comunicação) e contatos de 2 a 3 referências profissionais válidas é um diferencial enorme no nosso mercado.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" className="border-b-slate-100 py-2">
                  <AccordionTrigger className="text-left font-bold text-slate-800 text-lg hover:text-brand-600 hover:no-underline">
                    Devo colocar foto no meu CV?
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 text-base leading-relaxed pt-2">
                    Embora não seja obrigatório por lei, no contexto moçambicano, a maioria dos empregadores (especialmente nas áreas de atendimento ao público, hotelaria, banca e vendas) aprecia e até exige uma fotografia. Recomendamos o uso de uma foto profissional, com fundo neutro e roupa formal. O nosso sistema ajusta a sua foto perfeitamente ao formato do documento.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4" className="border-b-slate-100 py-2">
                  <AccordionTrigger className="text-left font-bold text-slate-800 text-lg hover:text-brand-600 hover:no-underline">
                    Como baixar o meu currículo em formato PDF?
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 text-base leading-relaxed pt-2">
                    Após terminar de preencher e pré-visualizar o seu currículo, clique no botão "Baixar PDF". O nosso sistema gera um documento de alta qualidade que preserva todas as fontes, cores e margens, independentemente do computador, celular ou gráfica onde for aberto e impresso.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </motion.div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-24 bg-brand-700 text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3"></div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="container mx-auto px-4 relative z-10 text-center"
        >
          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
            Preparado para ser notado <br className="hidden md:block"/> pelos recrutadores?
          </h2>
          <p className="text-xl text-brand-100 mb-12 max-w-2xl mx-auto">
            Junte-se a milhares de moçambicanos que já conseguiram emprego usando os nossos modelos de CV.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="bg-white text-brand-700 hover:bg-slate-50 px-10 h-16 text-xl rounded-2xl font-bold shadow-2xl btn-shine-sweep"
                onClick={() => handleProtectedAction('/modelos')}
              >
                Começar a Criar o Meu CV
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

const SparklesIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5z" clipRule="evenodd" />
  </svg>
)

export default Index;
