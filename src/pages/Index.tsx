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
import { motion } from 'framer-motion';
import UniversalAd from '@/components/ads/UniversalAd';
import { useSubscription } from '@/hooks/useSubscription';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { initiatePayment } = useSubscription();

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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Como criar um cv moçambique profissional?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Para criar um cv moçambique profissional, basta escolher um modelo na nossa plataforma, preencher seus dados e baixar o arquivo em PDF. Todo o processo é adaptado ao mercado local."
        }
      },
      {
        "@type": "Question",
        "name": "O Mozvita tem custos?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "O Mozvita utiliza um sistema Pay-per-CV super acessível. Pode criar e editar à vontade. Só paga uma taxa única simbólica na hora de baixar o currículo final."
        }
      }
    ]
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
        title="Criar CV Moçambique Profissional Online | MozVita"
        description="A principal plataforma para criar seu cv moçambique profissional. Modelos modernos, download de cv moçambique pdf e exemplos reais para o mercado nacional."
        keywords="cv moçambique, cv moçambique pdf, modelo de cv moçambique, criar currículo online moçambique, fazer cv grátis maputo, cv online moçambique, formato de cv moçambique, cv primeiro emprego, exemplos cv moçambique, cv em inglês moçambique"
        canonical="/"
        schemaData={faqSchema}
      />

      {/* 1. Hero Section (Parallax & Premium) */}
      {/* REDUZIDO O ESPAÇO BRANCO: pt-12 pb-16 em vez de pt-24 pb-32 */}
      <section className="relative pt-8 pb-12 lg:pt-12 lg:pb-24 overflow-hidden bg-gradient-to-br from-slate-50 via-brand-50/40 to-slate-100">
        {/* Decorative background blobs */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-brand-300/20 rounded-full blur-3xl opacity-50 animate-pulse pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[500px] h-[500px] bg-blue-300/20 rounded-full blur-3xl opacity-50 pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex-1 text-center lg:text-left"
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
              <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Crie um <strong>CV profissional</strong> aprovado por recrutadores moçambicanos em minutos. Modelos modernos, fáceis de editar e prontos para impressionar multinacionais.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-gradient-to-r from-brand-600 to-blue-600 hover:from-brand-700 hover:to-blue-700 text-white px-8 h-14 text-lg rounded-2xl shadow-[0_8px_30px_rgb(93,37,231,0.3)] transition-all border-0"
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

              <div className="mt-10 flex items-center justify-center lg:justify-start gap-4 text-sm text-slate-500">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 overflow-hidden">
                      <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${i}&backgroundColor=e2e8f0`} alt="User" />
                    </div>
                  ))}
                </div>
                <div className="text-left leading-tight">
                  <div className="flex items-center gap-1 text-yellow-400">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="font-medium text-slate-700 mt-1">Mais de <strong>10.000+</strong> CVs criados</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50, rotate: 5 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
              className="flex-1 relative hidden md:block"
            >
              {/* Glassmorphism Presentation of a CV */}
              <div className="relative w-full max-w-[500px] mx-auto aspect-[1/1.2] rounded-[2rem] bg-white/40 backdrop-blur-3xl border border-white/60 shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)] p-4 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl relative border border-slate-100">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
                  <img
                    src="/lovable-uploads/template-01.jpg"
                    alt="Modelo de CV Profissional"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute bottom-6 left-6 right-6 z-20 flex gap-4">
                    <div className="bg-white/90 backdrop-blur-md rounded-xl p-3 flex-1 shadow-lg transform -translate-y-4 hover:-translate-y-6 transition-transform">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mb-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                      <p className="text-xs font-bold text-slate-900">ATS Friendly</p>
                    </div>
                    <div className="bg-brand-600/90 backdrop-blur-md rounded-xl p-3 flex-1 shadow-lg transform translate-y-4 hover:translate-y-2 transition-transform">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mb-2">
                        <Star className="w-5 h-5 text-white" />
                      </div>
                      <p className="text-xs font-bold text-white">Top Recrutadores</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Como Funciona Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-brand-100 text-brand-700 hover:bg-brand-200 border-none shadow-none text-sm px-4 py-1">Processo Simples</Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Como criar o seu CV em 3 passos</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">Sem complicações. O nosso sistema foi desenhado para ser rápido e eficaz.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-brand-200 via-brand-400 to-brand-200 -translate-y-1/2 z-0 opacity-30"></div>

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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                key={i} 
                className="relative z-10 flex flex-col items-center text-center bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100"
              >
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center bg-gradient-to-br ${step.color} shadow-lg mb-6 transform -rotate-3 hover:rotate-0 transition-transform`}>
                  {step.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-600 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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

          <div className="flex gap-6 overflow-x-auto pb-10 hide-scrollbar snap-x">
            {cvTemplates.map((template, i) => (
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                key={template.id} 
                className="min-w-[280px] md:min-w-[350px] snap-center group cursor-pointer"
                onClick={() => handleProtectedAction('/modelos')}
              >
                <div className="bg-slate-800 rounded-3xl p-4 transition-all duration-300 group-hover:bg-slate-700 border border-slate-700 group-hover:border-brand-500">
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
          </div>
        </div>
      </section>

      {/* Pricing Section CORRIGIDO O PROBLEMA DOS TEXTOS DESAPARECIDOS */}
      <section className="py-24 bg-white relative" id="planos">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4 bg-green-100 text-green-700 border-none shadow-none text-sm px-4 py-1">Preços Justos</Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Pague apenas quando estiver perfeito</h2>
            <p className="text-slate-600 text-lg">Crie e edite sem compromisso. Só cobramos uma taxa simbólica para baixar o seu <strong>cv moçambique pdf</strong> final. Pagamentos facilitados via M-Pesa e e-Mola.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => (
              <Card 
                key={plan.id} 
                className={cn(
                  "relative rounded-[2rem] border-2 transition-all duration-300 hover:shadow-2xl overflow-hidden flex flex-col bg-white",
                  plan.recommended ? "border-brand-500 shadow-xl transform md:-translate-y-4" : "border-slate-100 shadow-sm"
                )}
              >
                {plan.recommended && (
                  <div className="absolute top-0 left-0 right-0 bg-brand-500 text-white text-xs font-bold py-1.5 text-center uppercase tracking-widest z-10">
                    Mais Popular
                  </div>
                )}
                <CardHeader className={cn("pt-8 pb-4", plan.recommended ? "mt-4" : "")}>
                  <div className="mb-6 inline-flex p-4 rounded-2xl bg-slate-50">
                    {plan.icon}
                  </div>
                  <CardTitle className="text-2xl font-bold text-slate-900">{plan.name}</CardTitle>
                  <CardDescription className="text-slate-500 mt-2 min-h-[40px] text-base">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-8 flex-1">
                  <div className="mb-8 flex items-end gap-1">
                    <span className="text-5xl font-black text-slate-900">{plan.price}</span>
                    <span className="text-xl font-bold text-slate-500 mb-1">MT</span>
                    <span className="text-slate-400 font-medium">/{plan.period}</span>
                  </div>
                  <div className="space-y-4">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-50 flex items-center justify-center">
                          <Check className="w-3 h-3 text-brand-600 font-bold" />
                        </div>
                        <span className="text-slate-700 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="pt-0 pb-8 px-6">
                  <Button
                    size="lg"
                    className={cn(
                      "w-full h-14 text-lg rounded-xl font-bold transition-all",
                      plan.recommended 
                        ? "bg-brand-600 hover:bg-brand-700 text-white shadow-lg shadow-brand-200" 
                        : "bg-slate-100 hover:bg-slate-200 text-slate-900"
                    )}
                    onClick={() => handleBuyClick(plan.id)}
                  >
                    Começar Agora
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* SEO & Text Content Section */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 tracking-tight">
              A Importância de um Bom Curriculum Vitae em Moçambique
            </h2>
            <div className="prose prose-lg text-slate-600 space-y-6">
              <p>
                O mercado de trabalho em Moçambique, especialmente em cidades como Maputo, Matola, Beira e Nampula, está cada vez mais competitivo. Quer pretenda ingressar na <strong>Função Pública</strong>, candidatar-se a vagas em <strong>Multinacionais (Oil & Gas, Banca, Telecomunicações)</strong> ou buscar o seu primeiro emprego, o seu currículo é a chave que abre as portas para as entrevistas.
              </p>
              <p>
                Recrutadores recebem centenas de candidaturas por dia. Currículos desformatados, feitos em Word ou sem uma estrutura clara são rapidamente descartados. É por isso que criar um <strong>CV Moçambique PDF</strong> utilizando formatos profissionais (ATS Friendly) é essencial para garantir que o seu perfil não passa despercebido pelos sistemas automáticos de triagem.
              </p>
              <p>
                No Mozvita, desenvolvemos modelos de <strong>curriculum vitae modernos e elegantes</strong> que respeitam as exigências locais. Integramos os espaços certos para informações cruciais no nosso contexto (como Nacionalidade, NUIT, Referências Profissionais), garantindo que não se esquece de nenhum detalhe importante.
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 tracking-tight text-center">
              Perguntas Frequentes (FAQ)
            </h2>
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
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-24 bg-brand-700 text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
            Preparado para ser notado <br className="hidden md:block"/> pelos recrutadores?
          </h2>
          <p className="text-xl text-brand-100 mb-12 max-w-2xl mx-auto">
            Junte-se a milhares de moçambicanos que já conseguiram emprego usando os nossos modelos de CV.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Button
              size="lg"
              className="bg-white text-brand-700 hover:bg-slate-50 px-10 h-16 text-xl rounded-2xl font-bold shadow-2xl"
              onClick={() => handleProtectedAction('/modelos')}
            >
              Começar a Criar o Meu CV
            </Button>
          </div>
        </div>
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
