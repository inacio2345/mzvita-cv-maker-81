import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { FileText, Phone, Mail, MessageCircle, MapPin, Clock, Users, Headphones } from 'lucide-react';


const Contato = () => {
  const navigate = useNavigate();

  const contactMethods = [
    {
      type: "Telefone",
      icon: <Phone className="w-6 h-6 sm:w-8 sm:h-8 text-white" />,
      details: ["+258 869 824 047", "+258 841 524 822"],
      description: "Ligue para nós durante o horário comercial",
      bgColor: "bg-blue-500"
    },
    {
      type: "Email",
      icon: <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-white" />,
      details: ["SUPORTMZVITA@GMAIL.COM"],
      description: "Envie-nos um email e responderemos em 24h",
      bgColor: "bg-red-500"
    },
    {
      type: "WhatsApp",
      icon: <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />,
      details: ["+258 841 524 822"],
      description: "Chat direto conosco via WhatsApp",
      link: "https://api.whatsapp.com/send?phone=258841524822&text=Ol%C3%A1%2C%20tenho%20interesse%20nos%20seus%20servi%C3%A7os.%20Pode%20me%20dar%20mais%20informa%C3%A7%C3%B5es%3F",
      bgColor: "bg-green-500"
    }
  ];

  const supportInfo = [
    {
      icon: <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-google-blue" />,
      title: "Localização",
      description: "Maputo, Moçambique"
    },
    {
      icon: <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-google-green" />,
      title: "Tempo de Resposta",
      description: "WhatsApp: 1h | Email: 24h"
    },
    {
      icon: <Users className="w-5 h-5 sm:w-6 sm:h-6 text-google-red" />,
      title: "Equipe Especializada",
      description: "Suporte técnico dedicado"
    },
    {
      icon: <Headphones className="w-5 h-5 sm:w-6 sm:h-6 text-google-yellow" />,
      title: "Suporte Premium",
      description: "Prioridade para assinantes"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-google-blue to-google-green rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-google-blue to-google-green bg-clip-text text-transparent">
                MozVita
              </h1>
            </div>
            <nav className="hidden md:flex space-x-4 lg:space-x-8">
              <Button variant="ghost" onClick={() => navigate('/')} className="text-gray-600 hover:text-google-blue text-sm lg:text-base">
                Início
              </Button>
              <Button variant="ghost" onClick={() => navigate('/como-funciona')} className="text-gray-600 hover:text-google-blue text-sm lg:text-base">
                Como Funciona
              </Button>
              <Button variant="ghost" onClick={() => navigate('/precos')} className="text-gray-600 hover:text-google-blue text-sm lg:text-base">
                Preços
              </Button>
              <span className="text-google-blue font-semibold text-sm lg:text-base">Contato</span>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-8 sm:py-12 lg:py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-google-blue via-google-red to-google-green bg-clip-text text-transparent leading-tight">
            Entre em Contato
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-2">
            Tem dúvidas ou precisa de ajuda? Nossa equipe especializada está pronta para ajudá-lo a criar o CV perfeito e conseguir o emprego dos seus sonhos.
          </p>
        </div>
      </section>

      {/* Support Info Cards */}
      <section className="py-8 sm:py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 max-w-4xl mx-auto mb-8 sm:mb-16">
            {supportInfo.map((info, index) => (
              <Card key={index} className="p-3 sm:p-6 text-center border-0 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-2 sm:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-50 rounded-xl flex items-center justify-center">
                    {info.icon}
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-xs sm:text-base">{info.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600">{info.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-8 sm:py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-gray-900">Como Podemos Ajudar?</h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600">Escolha a melhor forma de entrar em contato conosco</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto mb-8 sm:mb-16">
            {contactMethods.map((method, index) => (
              <Card key={index} className="p-4 sm:p-6 lg:p-8 text-center hover:shadow-xl transition-all duration-300 border-0 shadow-lg transform hover:scale-105">
                <div className={`w-12 h-12 sm:w-16 sm:h-16 ${method.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6`}>
                  {method.icon}
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 text-gray-900">{method.type}</h3>
                <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">{method.description}</p>
                <div className="space-y-2 sm:space-y-3">
                  {method.details.map((detail, i) => (
                    <div key={i}>
                      {method.link ? (
                        <a 
                          href={method.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block w-full"
                        >
                          <Button className="bg-green-600 hover:bg-green-700 text-white w-full text-sm sm:text-base lg:text-lg py-2 sm:py-3">
                            Abrir WhatsApp
                          </Button>
                        </a>
                      ) : (
                        <div className="bg-gray-50 rounded-lg p-2 sm:p-3">
                          <p className="text-gray-800 font-medium text-xs sm:text-sm lg:text-base break-all">{detail}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Support Hours */}
      <section className="py-8 sm:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-12">Horário de Atendimento</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
              <Card className="p-4 sm:p-6 lg:p-8 border-0 shadow-lg">
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-xl flex items-center justify-center mr-3 sm:mr-4">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Atendimento Telefônico</h3>
                </div>
                <ul className="space-y-2 sm:space-y-3 text-gray-600">
                  <li className="flex justify-between text-sm sm:text-base">
                    <span>Segunda a Sexta:</span>
                    <span className="font-medium">8h às 18h</span>
                  </li>
                  <li className="flex justify-between text-sm sm:text-base">
                    <span>Sábado:</span>
                    <span className="font-medium">8h às 13h</span>
                  </li>
                  <li className="flex justify-between text-sm sm:text-base">
                    <span>Domingo:</span>
                    <span className="font-medium text-red-500">Fechado</span>
                  </li>
                </ul>
              </Card>
              
              <Card className="p-4 sm:p-6 lg:p-8 border-0 shadow-lg">
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500 rounded-xl flex items-center justify-center mr-3 sm:mr-4">
                    <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">WhatsApp & Email</h3>
                </div>
                <ul className="space-y-2 sm:space-y-3 text-gray-600">
                  <li className="flex justify-between text-sm sm:text-base">
                    <span>WhatsApp:</span>
                    <span className="font-medium text-green-600">24h (resposta em 1h)</span>
                  </li>
                  <li className="flex justify-between text-sm sm:text-base">
                    <span>Email:</span>
                    <span className="font-medium">24h (resposta em 24h)</span>
                  </li>
                  <li className="flex justify-between text-sm sm:text-base">
                    <span>Assinantes:</span>
                    <span className="font-medium text-blue-600">Prioridade</span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-8 sm:py-20 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gray-900">Perguntas Mais Comuns</h2>
          <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
            {[
              {
                question: "Como posso pagar pelos serviços?",
                answer: "Aceitamos pagamentos via M-Pesa, E-Mola e Mkesh. Após escolher seu plano, você receberá instruções detalhadas para completar o pagamento de forma segura."
              },
              {
                question: "Quanto tempo leva para criar um CV?",
                answer: "Com nosso sistema otimizado e templates profissionais, você pode criar seu CV completo em menos de 10 minutos. O processo é rápido e intuitivo."
              },
              {
                question: "Posso editar meu CV depois de criado?",
                answer: "Sim! Com os planos Mensal e Anual, você pode editar e atualizar seus CVs quantas vezes precisar, mantendo-os sempre atualizados."
              },
              {
                question: "O CV funciona para todas as áreas profissionais?",
                answer: "Sim! Nossos templates são versáteis e adequados para todas as áreas profissionais, desde tecnologia até educação, saúde, negócios e muito mais."
              },
              {
                question: "Preciso de cartão de crédito para o primeiro CV gratuito?",
                answer: "Não! Seu primeiro CV é completamente gratuito, sem necessidade de cartão de crédito ou qualquer informação de pagamento."
              },
              {
                question: "Vocês oferecem suporte personalizado?",
                answer: "Sim! Nossa equipe especializada oferece suporte personalizado via WhatsApp, email e telefone. Assinantes têm atendimento prioritário."
              }
            ].map((faq, index) => (
              <Card key={index} className="p-4 sm:p-6 border-0 shadow-md hover:shadow-lg transition-shadow">
                <h3 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-base sm:text-lg">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 sm:py-20 bg-gradient-to-r from-google-blue to-google-green">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">Ainda tem dúvidas?</h2>
          <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 opacity-90 max-w-2xl mx-auto px-2">
            Entre em contato conosco agora mesmo! Nossa equipe especializada está sempre pronta para ajudar você a criar o CV perfeito e conseguir o emprego dos seus sonhos.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <a 
              href="https://api.whatsapp.com/send?phone=258841524822&text=Ol%C3%A1%2C%20tenho%20interesse%20nos%20seus%20servi%C3%A7os.%20Pode%20me%20dar%20mais%20informa%C3%A7%C3%B5es%3F"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button 
                size="default" 
                className="bg-green-600 hover:bg-green-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105 w-full sm:w-auto"
              >
                <MessageCircle className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                Falar no WhatsApp
              </Button>
            </a>
            <Button 
              size="default" 
              className="bg-white text-google-blue hover:bg-gray-100 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105 w-full sm:w-auto"
              onClick={() => navigate('/criar-cv')}
            >
              Criar CV Grátis
              <FileText className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Contato;
