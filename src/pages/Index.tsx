
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Zap, Shield, Download, Star, Users, CheckCircle, User, Briefcase, Clock, Search, MessageCircle, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const Index = () => {
  const navigate = useNavigate();

  const professionAreas = [
    'Professor',
    'Pedreiro', 
    'Enfermeira',
    'Designer Gráfico',
    'Técnico de Informática',
    'Contador',
    'Vendedor',
    'Mecânico'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section - Otimizada para SEO */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Crie Seu <span className="bg-gradient-to-r from-google-blue to-google-green bg-clip-text text-transparent">
                CV Profissional Online
              </span> em Moçambique
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Rápido, gratuito e adaptado para o mercado de trabalho local. 
              Em poucos minutos, você terá seu currículo pronto para imprimir ou enviar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-google-blue hover:bg-blue-600 text-white px-8 py-6 text-lg"
                onClick={() => navigate('/criar-cv')}
              >
                <FileText className="mr-2 h-5 w-5" />
                Começar Agora
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-google-blue text-google-blue hover:bg-google-blue hover:text-white px-8 py-6 text-lg"
                onClick={() => navigate('/exemplos')}
              >
                Ver Modelos de CV
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Como funciona o MozVita?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Criar seu CV profissional nunca foi tão simples
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-google-blue" />
              </div>
              <h3 className="text-lg font-semibold mb-2">1. Escolha sua área profissional</h3>
              <p className="text-gray-600 text-sm">Selecione entre dezenas de profissões disponíveis</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-google-green" />
              </div>
              <h3 className="text-lg font-semibold mb-2">2. Preencha seus dados</h3>
              <p className="text-gray-600 text-sm">Insira suas informações pessoais e profissionais</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">3. Revise o conteúdo</h3>
              <p className="text-gray-600 text-sm">Confira todas as informações do seu CV</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">4. Baixe em PDF</h3>
              <p className="text-gray-600 text-sm">Seu currículo estará pronto para impressão</p>
            </div>
          </div>
          <div className="text-center mt-8">
            <p className="text-lg font-medium text-gray-700">
              Tudo online, gratuito e com visual profissional.
            </p>
          </div>
        </div>
      </section>

      {/* Benefícios Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Por que usar o MozVita?
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Descubra os benefícios de usar nossa plataforma para criar um currículo profissional e 
              aumentar suas chances de sucesso no mercado de trabalho moçambicano.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center text-xl font-semibold">
                  <Briefcase className="mr-2 h-5 w-5 text-blue-500" />
                  CVs Adaptados por Área
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-500">
                  Geração de CVs profissionais adaptados à sua área de atuação, destacando as competências certas para cada profissão.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center text-xl font-semibold">
                  <FileText className="mr-2 h-5 w-5 text-green-500" />
                  Modelos Modernos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-500">
                  Modelos modernos e prontos para impressão, com design limpo e profissional que impressiona recrutadores.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center text-xl font-semibold">
                  <Star className="mr-2 h-5 w-5 text-yellow-500" />
                  Primeiro Emprego
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-500">
                  Ideal para quem busca o primeiro emprego ou deseja atualizar o currículo com foco no mercado moçambicano.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center text-xl font-semibold">
                  <Zap className="mr-2 h-5 w-5 text-orange-500" />
                  Geração Rápida
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-500">
                  Geração rápida de PDF com design limpo e organizado, pronto para envio em questão de minutos.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center text-xl font-semibold">
                  <Shield className="mr-2 h-5 w-5 text-purple-500" />
                  Otimizado para RH
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-500">
                  CVs otimizados para recrutadores e plataformas de emprego, seguindo as melhores práticas do mercado.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center text-xl font-semibold">
                  <Clock className="mr-2 h-5 w-5 text-red-500" />
                  100% Gratuito
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-500">
                  Plataforma completamente gratuita, sem custos ocultos ou limitações para criar seu CV profissional.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Depoimentos Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Quem já usou o MozVita
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Veja o que nossos usuários estão falando sobre a experiência de criar seus currículos 
              com o MozVita e como conseguiram suas oportunidades de emprego.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardContent className="pt-6 relative">
                <Star className="absolute top-2 right-2 h-4 w-4 text-yellow-400" />
                <p className="text-gray-700 mb-4">
                  "Consegui meu primeiro emprego como pedreiro depois de usar o CV gerado pelo MozVita. Foi fácil e rápido."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-200 mr-4">
                    <Users className="w-6 h-6 text-gray-500 mx-auto mt-2" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">João</p>
                    <p className="text-gray-500 text-sm">Maputo</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardContent className="pt-6 relative">
                <Star className="absolute top-2 right-2 h-4 w-4 text-yellow-400" />
                <p className="text-gray-700 mb-4">
                  "Sou professora e o modelo de currículo ficou muito melhor do que o que eu tinha antes."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-200 mr-4">
                    <Users className="w-6 h-6 text-gray-500 mx-auto mt-2" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Elsa</p>
                    <p className="text-gray-500 text-sm">Beira</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardContent className="pt-6 relative">
                <Star className="absolute top-2 right-2 h-4 w-4 text-yellow-400" />
                <p className="text-gray-700 mb-4">
                  "Criei meu CV de enfermeira em menos de 10 minutos. O resultado foi muito profissional!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-200 mr-4">
                    <Users className="w-6 h-6 text-gray-500 mx-auto mt-2" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Ana</p>
                    <p className="text-gray-500 text-sm">Nampula</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Blog/Dicas Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Dicas para se destacar no mercado
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Artigos e dicas essenciais para melhorar seu currículo e aumentar suas chances de conseguir emprego
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  Como montar um currículo profissional em Moçambique
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-500">
                  Evite erros comuns e destaque suas habilidades mesmo sem muita experiência. 
                  Dicas específicas para o mercado moçambicano.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  5 erros que você deve evitar no seu CV
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-500">
                  Erros simples podem eliminar você da seleção. Saiba o que não fazer e 
                  como criar um currículo que impressiona.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  Currículo para primeiro emprego: por onde começar?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-500">
                  Veja como apresentar suas qualidades mesmo sem experiência profissional 
                  e conquistar sua primeira oportunidade.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Áreas Profissionais Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Crie seu CV por área profissional
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Escolha sua área de atuação e crie um CV personalizado com as competências 
              e habilidades específicas da sua profissão
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {professionAreas.map((area, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-12 text-sm hover:bg-google-blue hover:text-white transition-colors"
                onClick={() => navigate('/area-profissional')}
              >
                CV para {area}
              </Button>
            ))}
          </div>
          <div className="text-center">
            <Button
              variant="default"
              className="bg-google-green hover:bg-green-600 text-white px-8 py-3"
              onClick={() => navigate('/area-profissional')}
            >
              Ver todas as áreas
            </Button>
          </div>
        </div>
      </section>

      {/* Comunidade WhatsApp Section */}
      <section className="py-12 bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Nossa Comunidade no WhatsApp
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              Junte-se à maior comunidade de profissionais de Moçambique! Receba dicas exclusivas, 
              oportunidades de emprego, suporte técnico e muito mais diretamente no seu WhatsApp.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => navigate('/comunidade')}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Conhecer Nossa Comunidade
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-6 text-lg rounded-full transition-all duration-300"
                onClick={() => window.open('https://chat.whatsapp.com/Fr5JP6FK5352kVOdoaU2XP', '_blank')}
              >
                <Users className="mr-2 h-5 w-5" />
                Entrar Direto no WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Perguntas frequentes
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Tire suas dúvidas sobre como criar um CV profissional com o MozVita
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left">
                  Como criar um CV profissional em Moçambique?
                </AccordionTrigger>
                <AccordionContent>
                  Com o MozVita, você escolhe sua área profissional e preenche um formulário adaptado. 
                  O sistema gera automaticamente seu currículo com o layout e conteúdo adequados 
                  para o mercado de trabalho moçambicano.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left">
                  Posso incluir minha foto no currículo?
                </AccordionTrigger>
                <AccordionContent>
                  Sim. O gerador permite que você envie sua foto e ela será incluída no PDF final 
                  de forma profissional e adequada ao layout escolhido.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left">
                  Preciso pagar para gerar meu currículo?
                </AccordionTrigger>
                <AccordionContent>
                  Não. O MozVita é completamente gratuito e acessível a todos. Você pode criar 
                  e baixar quantos CVs quiser sem nenhum custo.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left">
                  Que formato de arquivo posso baixar?
                </AccordionTrigger>
                <AccordionContent>
                  Seu currículo é gerado em formato PDF, pronto para impressão ou envio digital. 
                  O PDF mantém a formatação profissional em qualquer dispositivo.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left">
                  Posso editar meu CV depois de criado?
                </AccordionTrigger>
                <AccordionContent>
                  Você pode criar novos CVs a qualquer momento com informações atualizadas. 
                  Recomendamos manter seus dados sempre atualizados para melhores resultados.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-google-blue mb-2">
                5000+
              </p>
              <p className="text-gray-600">
                Currículos Criados
              </p>
            </div>

            <div>
              <p className="text-4xl font-bold text-google-green mb-2">
                98%
              </p>
              <p className="text-gray-600">
                Satisfação dos Usuários
              </p>
            </div>

            <div>
              <p className="text-4xl font-bold text-yellow-500 mb-2">
                25+
              </p>
              <p className="text-gray-600">
                Áreas Profissionais
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-100 to-green-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Comece agora a criar o seu currículo de sucesso!
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            Não perca mais tempo, crie um currículo profissional e destaque-se no mercado de trabalho moçambicano. 
            Seu próximo emprego está a um clique de distância.
          </p>
          <Button 
            size="lg" 
            className="bg-google-blue hover:bg-blue-600 text-white px-8 py-6 text-lg"
            onClick={() => navigate('/criar-cv')}
          >
            <CheckCircle className="mr-2 h-5 w-5" />
            Criar Meu CV Agora
          </Button>
        </div>
      </section>
      
    </div>
  );
};

export default Index;
