
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { FileText, Shield, Lock, Eye, Database, UserCheck } from 'lucide-react';
import Footer from '@/components/ui/footer';

const PoliticaPrivacidade = () => {
  const navigate = useNavigate();

  const sections = [
    {
      icon: <Shield className="w-6 h-6 text-google-blue" />,
      title: "Coleta de Informações",
      content: "Coletamos informações pessoais que você nos fornece voluntariamente, como nome, email, telefone e dados profissionais para criar seu CV. Também coletamos dados de uso para melhorar nossos serviços."
    },
    {
      icon: <Lock className="w-6 h-6 text-google-green" />,
      title: "Uso das Informações",
      content: "Utilizamos suas informações para criar e personalizar CVs, processar pagamentos, fornecer suporte ao cliente e enviar comunicações relacionadas ao serviço."
    },
    {
      icon: <Eye className="w-6 h-6 text-google-red" />,
      title: "Compartilhamento de Dados",
      content: "Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros, exceto quando necessário para prestar nossos serviços ou quando exigido por lei."
    },
    {
      icon: <Database className="w-6 h-6 text-google-yellow" />,
      title: "Armazenamento e Segurança",
      content: "Seus dados são armazenados em servidores seguros com criptografia. Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações."
    },
    {
      icon: <UserCheck className="w-6 h-6 text-google-blue" />,
      title: "Seus Direitos",
      content: "Você tem direito de acessar, corrigir, excluir ou portar seus dados pessoais. Entre em contato conosco para exercer esses direitos a qualquer momento."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
              <div className="w-10 h-10 bg-gradient-to-r from-google-blue to-google-green rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-google-blue to-google-green bg-clip-text text-transparent">
                MzVita CV
              </h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="/" className="text-gray-600 hover:text-google-blue transition-colors">Início</a>
              <a href="/como-funciona" className="text-gray-600 hover:text-google-blue transition-colors">Como Funciona</a>
              <a href="/precos" className="text-gray-600 hover:text-google-blue transition-colors">Preços</a>
              <a href="/contato" className="text-gray-600 hover:text-google-blue transition-colors">Contato</a>
            </nav>
            <Button variant="outline" className="border-google-blue text-google-blue hover:bg-google-blue hover:text-white">
              Entrar
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-google-blue via-google-red to-google-green bg-clip-text text-transparent">
            Política de Privacidade
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Sua privacidade é nossa prioridade. Saiba como coletamos, usamos e protegemos suas informações pessoais.
          </p>
          <p className="text-sm text-gray-500">
            Última atualização: Janeiro de 2024
          </p>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-8">
            {sections.map((section, index) => (
              <Card key={index} className="p-8 border-0 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    {section.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{section.content}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Detailed Information */}
          <Card className="mt-12 p-8 border-0 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Informações Detalhadas</h2>
            <div className="space-y-6 text-gray-600">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Cookies e Tecnologias Similares</h3>
                <p>Utilizamos cookies para melhorar sua experiência de navegação, analisar o tráfego do site e personalizar conteúdo. Você pode controlar o uso de cookies através das configurações do seu navegador.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Retenção de Dados</h3>
                <p>Mantemos suas informações pessoais pelo tempo necessário para cumprir os propósitos descritos nesta política, a menos que um período de retenção mais longo seja exigido ou permitido por lei.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Transferências Internacionais</h3>
                <p>Seus dados podem ser transferidos e processados em países fora de Moçambique. Garantimos que essas transferências são realizadas com as devidas proteções de segurança.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Alterações na Política</h3>
                <p>Podemos atualizar esta política periodicamente. Notificaremos sobre mudanças significativas através do email ou aviso em nosso site.</p>
              </div>
            </div>
          </Card>

          {/* Contact Section */}
          <Card className="mt-8 p-8 border-0 shadow-lg bg-gradient-to-r from-google-blue to-google-green text-white">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Dúvidas sobre Privacidade?</h2>
              <p className="text-xl mb-6 opacity-90">
                Entre em contato conosco para esclarecer qualquer questão sobre esta política.
              </p>
              <Button 
                size="lg" 
                className="bg-white text-google-blue hover:bg-gray-100"
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
