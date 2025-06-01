
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { FileText, Shield, Lock, Eye, Database, UserCheck } from 'lucide-react';
import Footer from '@/components/ui/footer';
import MobileNav from '@/components/ui/mobile-nav';

const PoliticaPrivacidade = () => {
  const navigate = useNavigate();

  const sections = [
    {
      icon: <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-google-blue" />,
      title: "Coleta de Informações",
      content: "Coletamos informações pessoais que você nos fornece voluntariamente, como nome, email, telefone e dados profissionais para criar seu CV. Também coletamos dados de uso para melhorar nossos serviços."
    },
    {
      icon: <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-google-green" />,
      title: "Uso das Informações",
      content: "Utilizamos suas informações para criar e personalizar CVs, processar pagamentos, fornecer suporte ao cliente e enviar comunicações relacionadas ao serviço."
    },
    {
      icon: <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-google-red" />,
      title: "Compartilhamento de Dados",
      content: "Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros, exceto quando necessário para prestar nossos serviços ou quando exigido por lei."
    },
    {
      icon: <Database className="w-5 h-5 sm:w-6 sm:h-6 text-google-yellow" />,
      title: "Armazenamento e Segurança",
      content: "Seus dados são armazenados em servidores seguros com criptografia. Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações."
    },
    {
      icon: <UserCheck className="w-5 h-5 sm:w-6 sm:h-6 text-google-blue" />,
      title: "Seus Direitos",
      content: "Você tem direito de acessar, corrigir, excluir ou portar seus dados pessoais. Entre em contato conosco para exercer esses direitos a qualquer momento."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div 
              className="flex items-center space-x-2 cursor-pointer" 
              onClick={() => navigate('/')}
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-gradient-to-r from-google-blue to-google-green rounded-lg flex items-center justify-center">
                <FileText className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
              </div>
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-google-blue to-google-green bg-clip-text text-transparent">
                MzVita CV
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-4 xl:space-x-6 2xl:space-x-8">
              <a href="/" className="text-sm xl:text-base text-gray-600 hover:text-google-blue transition-colors">Início</a>
              <a href="/como-funciona" className="text-sm xl:text-base text-gray-600 hover:text-google-blue transition-colors">Como Funciona</a>
              <a href="/precos" className="text-sm xl:text-base text-gray-600 hover:text-google-blue transition-colors">Preços</a>
              <a href="/contato" className="text-sm xl:text-base text-gray-600 hover:text-google-blue transition-colors">Contato</a>
            </nav>

            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                className="hidden md:flex border-google-blue text-google-blue hover:bg-google-blue hover:text-white text-sm xl:text-base"
                size="sm"
              >
                Entrar
              </Button>
              <MobileNav />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 bg-gradient-to-r from-google-blue via-google-red to-google-green bg-clip-text text-transparent leading-tight">
            Política de Privacidade
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-4 sm:mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed px-2">
            Sua privacidade é nossa prioridade. Saiba como coletamos, usamos e protegemos suas informações pessoais.
          </p>
          <p className="text-xs sm:text-sm text-gray-500">
            Última atualização: Janeiro de 2024
          </p>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:gap-8">
            {sections.map((section, index) => (
              <Card key={index} className="p-4 sm:p-6 md:p-8 border-0 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex flex-col space-y-3 sm:space-y-4 md:flex-row md:space-y-0 md:space-x-4 lg:space-x-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0 mx-auto md:mx-0">
                    {section.icon}
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4">{section.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{section.content}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Detailed Information */}
          <Card className="mt-6 sm:mt-8 md:mt-12 p-4 sm:p-6 md:p-8 border-0 shadow-lg">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 text-center md:text-left">Informações Detalhadas</h2>
            <div className="space-y-4 sm:space-y-6 text-gray-600">
              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-2 md:mb-3">Cookies e Tecnologias Similares</h3>
                <p className="text-sm sm:text-base leading-relaxed">Utilizamos cookies para melhorar sua experiência de navegação, analisar o tráfego do site e personalizar conteúdo. Você pode controlar o uso de cookies através das configurações do seu navegador.</p>
              </div>
              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-2 md:mb-3">Retenção de Dados</h3>
                <p className="text-sm sm:text-base leading-relaxed">Mantemos suas informações pessoais pelo tempo necessário para cumprir os propósitos descritos nesta política, a menos que um período de retenção mais longo seja exigido ou permitido por lei.</p>
              </div>
              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-2 md:mb-3">Transferências Internacionais</h3>
                <p className="text-sm sm:text-base leading-relaxed">Seus dados podem ser transferidos e processados em países fora de Moçambique. Garantimos que essas transferências são realizadas com as devidas proteções de segurança.</p>
              </div>
              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-2 md:mb-3">Alterações na Política</h3>
                <p className="text-sm sm:text-base leading-relaxed">Podemos atualizar esta política periodicamente. Notificaremos sobre mudanças significativas através do email ou aviso em nosso site.</p>
              </div>
            </div>
          </Card>

          {/* Contact Section */}
          <Card className="mt-6 sm:mt-8 p-4 sm:p-6 md:p-8 border-0 shadow-lg bg-gradient-to-r from-google-blue to-google-green text-white">
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 md:mb-4">Dúvidas sobre Privacidade?</h2>
              <p className="text-base sm:text-lg md:text-xl mb-4 md:mb-6 opacity-90">
                Entre em contato conosco para esclarecer qualquer questão sobre esta política.
              </p>
              <Button 
                size="default"
                className="bg-white text-google-blue hover:bg-gray-100 text-sm sm:text-base px-6 py-2 sm:px-8 sm:py-3"
                onClick={() => navigate('/contato')}
              >
                Falar Conosco
              </Button>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PoliticaPrivacidade;
