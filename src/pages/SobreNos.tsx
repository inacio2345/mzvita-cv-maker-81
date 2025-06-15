import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { 
  Target, 
  Eye, 
  Heart, 
  Users, 
  Shield, 
  MessageCircle, 
  Mail,
  CheckCircle,
  Lightbulb,
  Sparkles,
  Award,
  Globe
} from 'lucide-react';

const SobreNos = () => {
  const navigate = useNavigate();

  const valores = [
    'Acessibilidade e equidade digital',
    'Inovação contínua e adaptabilidade',
    'Compromisso com o usuário',
    'Ética na gestão de dados e transparência',
    'Empoderamento por meio do conhecimento'
  ];

  const solucoes = [
    'Criação automatizada de currículos com design responsivo',
    'Modelos de carta de apresentação prontos para uso',
    'Acesso à comunidade MozVita via WhatsApp para suporte e oportunidades',
    'Primeiros currículos gratuitos com acompanhamento personalizado',
    'Interface intuitiva, segura e disponível 24/7'
  ];

  const publico = [
    'Jovens em busca do primeiro emprego',
    'Profissionais em transição de carreira',
    'Trabalhadores informais que desejam se posicionar no mercado',
    'Estudantes, freelancers e técnicos de todas as áreas'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      {/* Hero Section with Enhanced Design */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 border-b">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 py-16 max-w-4xl relative">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Sobre a MozVita</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-6">
              Transformando Carreiras
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              A plataforma líder em Moçambique para criar currículos profissionais e acelerar oportunidades de emprego
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-5xl">

        {/* Quem Somos - Enhanced */}
        <section className="mb-16">
          <Card className="border-0 shadow-2xl bg-gradient-to-br from-card via-card to-primary/5 hover:shadow-3xl transition-all duration-300">
            <CardContent className="p-8 md:p-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-gradient-to-r from-primary to-secondary rounded-xl">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  Quem Somos
                </h2>
              </div>
              <div className="space-y-4">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  A MozVita é uma <span className="text-primary font-semibold">solução tecnológica desenvolvida em Moçambique</span>, com o propósito de 
                  <span className="text-secondary font-semibold"> democratizar o acesso à empregabilidade</span>. 
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Nossa plataforma permite que qualquer pessoa, independentemente de conhecimento técnico, crie um currículo profissional em poucos minutos. 
                  Através da automação, inovação digital e inclusão produtiva, estamos transformando a forma como os moçambicanos se apresentam ao mercado de trabalho.
                </p>
                <div className="flex items-center gap-2 pt-4">
                  <Globe className="w-5 h-5 text-accent" />
                  <span className="text-accent font-medium">Moçambique • Tecnologia • Empregabilidade</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Missão e Visão - Enhanced */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="group border-0 shadow-xl bg-gradient-to-br from-primary/5 to-primary/10 hover:shadow-2xl hover:scale-105 transition-all duration-300">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-gradient-to-r from-primary to-primary/80 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">Missão</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Nossa missão é <span className="text-primary font-semibold">simplificar a criação de currículos de alto impacto</span>, 
                reduzindo barreiras técnicas e acelerando o acesso a oportunidades profissionais. A MozVita atua como um instrumento 
                de transformação social e profissional.
              </p>
            </CardContent>
          </Card>

          <Card className="group border-0 shadow-xl bg-gradient-to-br from-secondary/5 to-secondary/10 hover:shadow-2xl hover:scale-105 transition-all duration-300">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-gradient-to-r from-secondary to-secondary/80 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <Eye className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">Visão</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">
                <span className="text-secondary font-semibold">Tornar-se a principal referência digital</span> de geração de currículos 
                e documentos profissionais em Moçambique, contribuindo para um ecossistema mais inclusivo e eficiente de recrutamento 
                e desenvolvimento de carreira.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Nossos Valores - Enhanced */}
        <section className="mb-16">
          <Card className="border-0 shadow-2xl bg-gradient-to-br from-accent/5 to-accent/10 hover:shadow-3xl transition-all duration-300">
            <CardContent className="p-8 md:p-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-gradient-to-r from-accent to-accent/80 rounded-xl">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  Nossos Valores
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                {valores.map((valor, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-background/50 hover:bg-background/80 transition-colors duration-200">
                    <div className="p-2 bg-gradient-to-r from-green-500 to-green-600 rounded-lg mt-1">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-muted-foreground font-medium leading-relaxed">{valor}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Soluções Oferecidas - Enhanced */}
        <section className="mb-16">
          <Card className="border-0 shadow-2xl bg-gradient-to-br from-blue-50/50 to-indigo-50/50 hover:shadow-3xl transition-all duration-300">
            <CardContent className="p-8 md:p-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl">
                  <Lightbulb className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  Soluções Oferecidas
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {solucoes.map((solucao, index) => (
                  <div key={index} className="flex items-start gap-3 p-5 rounded-xl bg-background/70 hover:bg-background/90 border border-blue-100 hover:border-blue-200 transition-all duration-200">
                    <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg mt-1">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-muted-foreground font-medium leading-relaxed">{solucao}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Nosso Público - Enhanced */}
        <section className="mb-16">
          <Card className="border-0 shadow-2xl bg-gradient-to-br from-purple-50/50 to-pink-50/50 hover:shadow-3xl transition-all duration-300">
            <CardContent className="p-8 md:p-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  Nosso Público
                </h2>
              </div>
              <p className="text-lg text-muted-foreground mb-8 font-medium">Quem pode se beneficiar da MozVita:</p>
              <div className="grid sm:grid-cols-2 gap-6">
                {publico.map((grupo, index) => (
                  <div key={index} className="flex items-start gap-3 p-5 rounded-xl bg-background/70 hover:bg-background/90 border border-purple-100 hover:border-purple-200 transition-all duration-200">
                    <div className="p-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg mt-1">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-muted-foreground font-medium leading-relaxed">{grupo}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Conecte-se Connosco - Enhanced */}
        <section className="mb-16">
          <Card className="border-0 shadow-2xl bg-gradient-to-br from-green-50/50 to-emerald-50/50 hover:shadow-3xl transition-all duration-300">
            <CardContent className="p-8 md:p-12 text-center">
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 bg-green-100 rounded-full px-6 py-3 mb-6">
                  <MessageCircle className="w-5 h-5 text-green-600" />
                  <span className="text-green-600 font-semibold">Conecte-se Connosco</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Faça Parte da Nossa Comunidade
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                  Junte-se à nossa comunidade ou entre em contato para tirar dúvidas e descobrir oportunidades exclusivas
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button 
                  onClick={() => navigate('/comunidade')}
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <MessageCircle className="w-5 h-5 mr-3" />
                  Entrar na Comunidade MozVita
                </Button>
                <Button 
                  onClick={() => navigate('/contato')}
                  variant="outline"
                  size="lg"
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Mail className="w-5 h-5 mr-3" />
                  Fale Connosco
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Privacidade e Confiabilidade - Enhanced */}
        <section className="mb-16">
          <Card className="border-0 shadow-2xl bg-gradient-to-br from-slate-50/50 to-gray-50/50 hover:shadow-3xl transition-all duration-300">
            <CardContent className="p-8 md:p-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-gradient-to-r from-slate-600 to-slate-700 rounded-xl">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  Privacidade e Confiabilidade
                </h2>
              </div>
              <div className="bg-background/70 rounded-xl p-6 border border-slate-100">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  A MozVita mantém um <span className="text-slate-600 font-semibold">compromisso firme com a proteção de dados pessoais</span>, 
                  respeitando a privacidade dos usuários e atualizando constantemente a plataforma conforme as melhores práticas do mercado 
                  digital e de recursos humanos. <span className="text-slate-600 font-semibold">Sua informação está segura connosco.</span>
                </p>
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-100">
                  <Award className="w-5 h-5 text-slate-600" />
                  <span className="text-slate-600 font-medium">Certificado em Segurança Digital</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Fundadores e Equipa - Enhanced */}
        <section className="mb-16">
          <Card className="border-0 shadow-2xl bg-gradient-to-br from-orange-50/50 to-amber-50/50 hover:shadow-3xl transition-all duration-300">
            <CardContent className="p-8 md:p-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  Fundadores e Equipa
                </h2>
              </div>
              <div className="bg-background/70 rounded-xl p-6 border border-orange-100">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  A MozVita foi fundada por <span className="text-orange-600 font-semibold">Inácio Langa</span>, jovem empreendedor 
                  moçambicano com histórico de superação e dedicação ao ensino digital. Inspirado por sua própria trajetória de busca 
                  por emprego, ele criou a plataforma com o objetivo de gerar impacto direto e positivo na vida de outras pessoas.
                </p>
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-orange-100">
                  <Sparkles className="w-5 h-5 text-orange-600" />
                  <span className="text-orange-600 font-medium">Empreendedorismo • Inovação • Impacto Social</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Junte-se à Transformação - Enhanced CTA */}
        <section className="mb-16">
          <Card className="border-0 shadow-3xl bg-gradient-to-r from-primary via-secondary to-accent relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-secondary/90 to-accent/90"></div>
            <CardContent className="relative p-8 md:p-12 text-center text-white">
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-6 py-3 mb-6">
                  <Sparkles className="w-5 h-5 text-white" />
                  <span className="text-white font-semibold">Transformação Digital</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                  Junte-se à Revolução
                </h2>
                <p className="text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto text-white/90">
                  "Faça parte da revolução digital que está mudando a forma como os moçambicanos se apresentam ao mercado de trabalho. 
                  Transforme seu futuro com a MozVita."
                </p>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => navigate('/criar-cv')}
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 hover:text-primary/90 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 font-semibold px-8 py-4"
                >
                  <Sparkles className="w-5 h-5 mr-3" />
                  Criar Meu CV Agora
                </Button>
                <Button 
                  onClick={() => navigate('/comunidade')}
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white hover:text-primary shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 font-semibold px-8 py-4"
                >
                  <Users className="w-5 h-5 mr-3" />
                  Ver Comunidade
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default SobreNos;