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
  Lightbulb
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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Sobre Nós
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Conheça a história, missão e visão da MozVita - a plataforma que está transformando a empregabilidade em Moçambique
          </p>
        </div>

        {/* Quem Somos */}
        <section className="mb-12">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">Quem Somos</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                A MozVita é uma solução tecnológica desenvolvida em Moçambique, com o propósito de <strong>democratizar o acesso à empregabilidade</strong>. 
                Nossa plataforma permite que qualquer pessoa, independentemente de conhecimento técnico, crie um currículo profissional em poucos minutos. 
                Através da automação, inovação digital e inclusão produtiva, estamos transformando a forma como os moçambicanos se apresentam ao mercado de trabalho.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Missão e Visão */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-bold text-foreground">Missão</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Nossa missão é <strong>simplificar a criação de currículos de alto impacto</strong>, reduzindo barreiras técnicas e 
                acelerando o acesso a oportunidades profissionais. A MozVita atua como um instrumento de transformação social e profissional.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Eye className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-bold text-foreground">Visão</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                <strong>Tornar-se a principal referência digital de geração de currículos e documentos profissionais em Moçambique</strong>, 
                contribuindo para um ecossistema mais inclusivo e eficiente de recrutamento e desenvolvimento de carreira.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Nossos Valores */}
        <section className="mb-12">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">Nossos Valores</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {valores.map((valor, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-muted-foreground">{valor}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Soluções Oferecidas */}
        <section className="mb-12">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Lightbulb className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">Soluções Oferecidas</h2>
              </div>
              <div className="space-y-3">
                {solucoes.map((solucao, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{solucao}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Nosso Público */}
        <section className="mb-12">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">Nosso Público</h2>
              </div>
              <p className="text-muted-foreground mb-4">Quem pode se beneficiar da MozVita:</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {publico.map((grupo, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-600 flex-shrink-0" />
                    <span className="text-muted-foreground">{grupo}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Conecte-se Connosco */}
        <section className="mb-12">
          <Card>
            <CardContent className="p-6 text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">Conecte-se Connosco</h2>
              <p className="text-muted-foreground mb-6">
                Junte-se à nossa comunidade ou entre em contato para tirar dúvidas e descobrir oportunidades
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => navigate('/comunidade')}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Entrar na Comunidade MozVita
                </Button>
                <Button 
                  onClick={() => navigate('/contato')}
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Fale Connosco
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Privacidade e Confiabilidade */}
        <section className="mb-12">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">Privacidade e Confiabilidade</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                A MozVita mantém um <strong>compromisso firme com a proteção de dados pessoais</strong>, respeitando a privacidade dos usuários e 
                atualizando constantemente a plataforma conforme as melhores práticas do mercado digital e de recursos humanos. 
                Sua informação está segura connosco.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Fundadores e Equipa */}
        <section className="mb-12">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">Fundadores e Equipa</h2>
              <p className="text-muted-foreground leading-relaxed">
                A MozVita foi fundada por <strong>Inácio Langa</strong>, jovem empreendedor moçambicano com histórico de superação e 
                dedicação ao ensino digital. Inspirado por sua própria trajetória de busca por emprego, ele criou a plataforma com o 
                objetivo de gerar impacto direto e positivo na vida de outras pessoas.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Junte-se à Transformação */}
        <section className="mb-12">
          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">Junte-se à Transformação</h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                "Faça parte da revolução digital que está mudando a forma como os moçambicanos se apresentam ao mercado de trabalho. 
                Junte-se à nossa comunidade ou entre em contato e transforme seu futuro com a MozVita."
              </p>
              <div className="mt-6">
                <Button 
                  onClick={() => navigate('/criar-cv')}
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Criar Meu CV Agora
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