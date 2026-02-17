import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  FileText, Zap, Shield, Download, Star, Users, CheckCircle,
  User, Briefcase, Search, MessageCircle, ChevronDown, Globe,
  Check, ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cvTemplates } from '@/data/cvTemplates';

const Index = () => {
  const navigate = useNavigate();

  const professionAreas = [
    { name: 'Professor', path: '/area-profissional' },
    { name: 'Pedreiro', path: '/area-profissional' },
    { name: 'Enfermeira', path: '/area-profissional' },
    { name: 'Motorista', path: '/blog/cv-motorista-mocambique' },
    { name: 'Contador', path: '/area-profissional' },
    { name: 'Vendedor', path: '/area-profissional' },
    { name: 'Técnico de IT', path: '/area-profissional' },
    { name: 'Mecânico', path: '/area-profissional' }
  ];

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
        "name": "O Mozvita é gratuito?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sim, o Mozvita permite criar e baixar seu cv moçambique de forma totalmente gratuita e sem custos ocultos."
        }
      },
      {
        "@type": "Question",
        "name": "Posso baixar o cv moçambique pdf no telemóvel?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sim, nossa plataforma é mobile-first e permite que você gere e baixe seu cv moçambique pdf diretamente do seu telemóvel."
        }
      },
      {
        "@type": "Question",
        "name": "Como fazer um cv em inglês moçambique?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Temos uma seção dedicada para cv em inglês moçambique, ideal para quem busca vagas em multinacionais de Oil & Gas ou ONGs internacionais no país."
        }
      },
      {
        "@type": "Question",
        "name": "Quais são os melhores modelos de cv moçambique?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Os melhores modelos de cv moçambique são aqueles que equilibram sobriedade e modernidade. Oferecemos designs testados e aprovados por recrutadores moçambicanos."
        }
      },
      {
        "@type": "Question",
        "name": "Existem exemplos cv moçambique para diferentes áreas?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sim, fornecemos exemplos cv moçambique para diversas profissões, ajudando você a descrever suas competências de forma eficaz."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden max-w-full">
      <SEO
        title="Criar CV Moçambique Online e Grátis | MozVita"
        description="A principal plataforma para criar seu cv moçambique profissional. Modelos modernos, download de cv moçambique pdf e exemplos reais para o mercado nacional."
        keywords="cv moçambique, cv moçambique pdf, modelo de cv moçambique, exemplos cv moçambique, cv em inglês moçambique"
        canonical="/"
        schemaData={faqSchema}
      />

      {/* 1. Hero Section */}
      <section className="relative bg-white pt-16 pb-20 lg:pt-24 lg:pb-28 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <Breadcrumbs />
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-left">
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-slate-900 leading-tight mb-6">
                Criar <span className="text-google-blue">CV Moçambique</span> Profissional Online e Grátis
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl">
                Destaque-se no mercado de trabalho com um currículo adaptado às exigências de Moçambique.
                Rápido, simples e pronto para baixar em PDF.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-google-blue hover:bg-blue-600 text-white px-8 h-14 text-lg rounded-xl shadow-lg shadow-blue-200"
                  onClick={() => navigate('/criar-cv')}
                >
                  <FileText className="mr-2 h-5 w-5" />
                  Criar meu CV Agora
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-slate-200 text-slate-700 hover:bg-slate-50 px-8 h-14 text-lg rounded-xl"
                  onClick={() => navigate('/exemplos')}
                >
                  Ver Modelos
                </Button>
              </div>
              <div className="mt-8 flex items-center gap-4 text-sm text-slate-500">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center">
                      <User className="w-4 h-4" />
                    </div>
                  ))}
                </div>
                <p>Junte-se a mais de <strong>5.000 profissionais</strong> em Moçambique.</p>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="relative z-10 bg-white p-4 rounded-2xl shadow-2xl border border-slate-100 rotate-2 hover:rotate-0 transition-transform duration-500">
                <img
                  src="/lovable-uploads/hero-woman.jpg"
                  alt="MozVita CV - Criar Currículo Profissional em Moçambique"
                  className="rounded-lg w-full h-auto object-cover shadow-xl"
                />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-50 rounded-full blur-3xl -z-10 opacity-60"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Benefícios do Mozvita */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Vantagens de usar o Mozvita</h2>
            <p className="text-slate-600 max-w-2xl mx-auto italic">Otimizado para o mercado moçambicano</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Zap className="text-yellow-500" />, title: 'Rápido e Prático', desc: 'Gere seu cv moçambique em menos de 10 minutos.' },
              { icon: <Globe className="text-blue-500" />, title: 'Padrão Nacional', desc: 'Modelos alinhados com o que os RHs de Moçambique esperam.' },
              { icon: <Shield className="text-green-500" />, title: '100% Seguro', desc: 'Seus dados protegidos e exportação limpa em PDF.' },
              { icon: <Star className="text-purple-500" />, title: 'Alta Conversão', desc: 'Aumente suas chances de entrevista em até 60%.' }
            ].map((b, i) => (
              <Card key={i} className="border-none shadow-sm hover:shadow-md transition-shadow bg-white rounded-2xl p-2">
                <CardHeader>
                  <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center mb-4">
                    {b.icon}
                  </div>
                  <CardTitle className="text-xl font-bold">{b.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">{b.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Modelos de CV Moçambique */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Modelo de CV Moçambique</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Nossos designs são criados pensando na clareza e profissionalismo. Cada <strong>modelo de cv moçambique</strong>
                disponível na plataforma respeita as normas de recrutamento das maiores empresas do país.
              </p>
              <div className="flex flex-wrap gap-3">
                <Badge variant="secondary" className="bg-slate-100 text-slate-600">Moderno</Badge>
                <Badge variant="secondary" className="bg-slate-100 text-slate-600">Clássico</Badge>
                <Badge variant="secondary" className="bg-slate-100 text-slate-600">Criativo</Badge>
                <Badge variant="secondary" className="bg-slate-100 text-slate-600">ATS Friendly</Badge>
              </div>
            </div>
            <Button
              variant="link"
              className="text-google-blue font-bold p-0 flex items-center"
              onClick={() => navigate('/modelo-cv-mocambique')}
            >
              Ver todos os modelos <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-8">
            {cvTemplates.slice(0, 5).map((template) => (
              <div
                key={template.id}
                className="group relative rounded-xl overflow-hidden border border-slate-100 shadow-sm transition-all duration-500"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={template.previewImage}
                    alt={template.nome}
                    className="w-full h-full object-cover transition-transform duration-700"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CV Moçambique PDF */}
      <section className="py-20 bg-google-blue text-white rounded-[3rem] mx-4 mb-20 overflow-hidden relative">
        <div className="container mx-auto px-8 relative z-10">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-8">Download de CV Moçambique PDF</h2>
            <p className="text-xl opacity-90 mb-10 leading-relaxed">
              O formato PDF é o preferido pelos recrutadores em Moçambique. Ele garante que seu layout
              não se quebre e seja legível em qualquer dispositivo. Gere seu <strong>cv moçambique pdf</strong>
              rapidamente e esteja pronto para enviar via e-mail ou WhatsApp.
            </p>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Check className="w-6 h-6" />
                </div>
                <span>Leve e compacto</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Check className="w-6 h-6" />
                </div>
                <span>Compatibilidade ATS</span>
              </div>
            </div>
            <Button
              size="lg"
              className="mt-12 bg-white text-google-blue hover:bg-slate-100 px-10 h-14 text-lg rounded-xl font-bold"
              onClick={() => navigate('/cv-mocambique-pdf')}
            >
              Saiba mais sobre PDF
            </Button>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-[-20deg] translate-x-1/2"></div>
      </section>

      {/* 5. Exemplos de CV */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Exemplos CV Moçambique por Profissão</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Inspire-se em nossos <strong>exemplos cv moçambique</strong> reais e saiba o que destacar no seu setor.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {professionAreas.map((area, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-16 text-slate-700 hover:border-google-blue hover:text-google-blue transition-all bg-white rounded-xl shadow-sm border-slate-100"
                onClick={() => navigate(area.path)}
              >
                CV para {area.name}
              </Button>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button
              variant="link"
              className="text-google-blue font-bold text-lg"
              onClick={() => navigate('/exemplos-cv-mocambique')}
            >
              Ver todos os exemplos <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* 6. CV em Inglês Moçambique */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1">
              <div className="inline-block bg-blue-500/20 text-blue-400 px-4 py-1 rounded-full text-sm font-bold mb-6">
                International Careers
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-8">CV em Inglês Moçambique</h2>
              <p className="text-lg opacity-80 mb-10 leading-relaxed">
                Multinacionais de Oil & Gas e ONGs internacionais em Moçambique exigem currículos em inglês.
                Oferecemos as ferramentas para você traduzir sua experiência e brilhar em processos seletivos globais.
              </p>
              <ul className="space-y-4 mb-10">
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-blue-500 w-6 h-6" />
                  <span>Vocabulário corporativo adequado</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-blue-500 w-6 h-6" />
                  <span>Dicas para multinacionais (Total, Eni, Exxon)</span>
                </li>
              </ul>
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 h-12 text-lg rounded-xl"
                onClick={() => navigate('/cv-em-ingles-mocambique')}
              >
                Guia de CV em Inglês
              </Button>
            </div>
            <div className="flex-1 bg-slate-800 p-8 rounded-[2rem] border border-slate-700">
              <div className="space-y-4 opacity-40 select-none pointer-events-none">
                <div className="h-4 bg-slate-600 rounded w-1/4"></div>
                <div className="h-8 bg-slate-600 rounded w-3/4"></div>
                <div className="h-4 bg-slate-600 rounded w-full"></div>
                <div className="h-4 bg-slate-600 rounded w-full"></div>
                <div className="h-32 bg-slate-600 rounded w-full mt-8"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ Estruturado */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Perguntas Frequentes</h2>
            <p className="text-slate-600">Tudo o que você precisa saber sobre o seu <strong>cv moçambique</strong>.</p>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left font-bold py-6 hover:no-underline hover:text-google-blue">
                  Como criar um cv moçambique profissional?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 pb-6">
                  Para criar um <strong>cv moçambique</strong> profissional, basta escolher um modelo na nossa plataforma,
                  preencher seus dados e baixar o arquivo em PDF. Todo o processo é adaptado ao mercado local.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left font-bold py-6 hover:no-underline hover:text-google-blue">
                  O Mozvita é gratuito?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 pb-6">
                  Sim, o Mozvita permite criar e baixar seu <strong>cv moçambique</strong> de forma totalmente gratuita.
                  Nossa missão é facilitar o acesso ao emprego para todos os moçambicanos.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left font-bold py-6 hover:no-underline hover:text-google-blue">
                  Posso baixar o cv moçambique pdf no telemóvel?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 pb-6">
                  Com certeza! Nossa plataforma é 100% responsiva (mobile-first), o que significa que você pode fazer tudo
                  pelo seu smartphone e baixar seu <strong>cv moçambique pdf</strong> instantaneamente.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left font-bold py-6 hover:no-underline hover:text-google-blue">
                  Como fazer um cv em inglês moçambique?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 pb-6">
                  Aceda à nossa página dedicada de <strong>cv em inglês moçambique</strong>. Lá você encontrará dicas de tradução
                  e termos específicos usados por multinacionais no país.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left font-bold py-6 hover:no-underline hover:text-google-blue">
                  Quais são os melhores modelos de cv moçambique?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 pb-6">
                  Oferecemos uma variedade de <strong>modelos de cv moçambique</strong>. O "melhor" depende do seu cargo,
                  mas os modelos limpos e organizados são os mais valorizados pelos RHs nacionais.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-6">
                <AccordionTrigger className="text-left font-bold py-6 hover:no-underline hover:text-google-blue">
                  Existem exemplos cv moçambique para diferentes áreas?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 pb-6">
                  Sim, temos uma vasta biblioteca de <strong>exemplos cv moçambique</strong> para professores, motoristas,
                  contadores e muitas outras profissões.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* 8. Conteúdo Educativo (Mini Artigo) */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white p-10 md:p-16 rounded-[2rem] shadow-sm border border-slate-100">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Importância do CV Moçambique em 2026</h2>
            <div className="prose prose-slate prose-lg max-w-none">
              <p>
                Em 2026, o mercado de trabalho em Moçambique está a passar por uma transformação digital acelerada.
                As empresas agora utilizam sistemas de triagem automática e esperam currículos mais objetivos e focados em competências específicas.
              </p>
              <p>
                Ter um <strong>cv moçambique</strong> bem feito não é apenas sobre estética; é sobre comunicação estratégica.
                Saber como estruturar suas experiências em Moçambique, destacar certificações locais e demonstrar
                domínio de línguas além do português, como o inglês e línguas nacionais, são diferenciais imensos.
              </p>
              <p>
                Nossa plataforma foca em consolidar a autoridade local. Cada link interno e cada <strong>modelo de cv moçambique</strong>
                foi desenhado por especialistas que entendem a realidade de quem procura emprego em Maputo, Beira, Nampula e Tete.
              </p>
            </div>
            <div className="mt-10 pt-8 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Search className="text-google-blue w-5 h-5" />
                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">SEO Authority Hub</span>
              </div>
              <Button variant="link" onClick={() => navigate('/blog/guia-cv-2026')}>Ler artigo completo</Button>
            </div>
          </div>
        </div>
      </section>

      {/* 9. CTA Final */}
      <section className="py-24 bg-gradient-to-br from-google-blue via-blue-700 to-slate-900 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-8">
            Dê o próximo passo na sua carreira hoje
          </h2>
          <p className="text-xl opacity-90 mb-12 max-w-2xl mx-auto">
            Não perca mais tempo. Crie seu <strong>cv moçambique</strong> agora e destaque-se para os melhores empregadores do país.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Button
              size="lg"
              className="bg-white text-google-blue hover:bg-slate-100 px-12 h-16 text-xl rounded-2xl font-bold shadow-2xl"
              onClick={() => navigate('/criar-cv')}
            >
              Criar CV Grátis Agora
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 px-12 h-16 text-xl rounded-2xl"
              onClick={() => navigate('/comunidade')}
            >
              Comunidade WhatsApp
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
};

// Helper components
const Badge = ({ children, variant, className }: { children: React.ReactNode, variant?: string, className?: string }) => (
  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${className}`}>
    {children}
  </span>
);

export default Index;
