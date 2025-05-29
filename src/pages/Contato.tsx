
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { FileText, Circle } from 'lucide-react';

const Contato = () => {
  const navigate = useNavigate();

  const contactMethods = [
    {
      type: "Telefone",
      icon: "📞",
      details: ["+258 869 824 047", "+258 841 524 822"],
      description: "Ligue para nós durante o horário comercial"
    },
    {
      type: "Email",
      icon: "📧",
      details: ["SUPORTMZVITA@GMAIL.COM"],
      description: "Envie-nos um email e responderemos em 24h"
    },
    {
      type: "WhatsApp",
      icon: "💬",
      details: ["+258 841 524 822"],
      description: "Chat direto conosco via WhatsApp",
      link: "https://api.whatsapp.com/send?phone=258841524822&text=Ol%C3%A1%2C%20tenho%20interesse%20nos%20seus%20servi%C3%A7os.%20Pode%20me%20dar%20mais%20informa%C3%A7%C3%B5es%3F"
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
              <a href="/contato" className="text-google-blue font-semibold">Contato</a>
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
            Entre em Contato
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Tem dúvidas ou precisa de ajuda? Nossa equipe está pronta para ajudá-lo a criar o CV perfeito.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
            {contactMethods.map((method, index) => (
              <Card key={index} className="p-8 text-center hover:shadow-lg transition-shadow border-0 shadow-md">
                <div className="text-4xl mb-4">{method.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{method.type}</h3>
                <p className="text-gray-600 mb-6">{method.description}</p>
                <div className="space-y-2">
                  {method.details.map((detail, i) => (
                    <div key={i}>
                      {method.link ? (
                        <a 
                          href={method.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block"
                        >
                          <Button className="bg-green-600 hover:bg-green-700 text-white w-full">
                            Abrir WhatsApp
                          </Button>
                        </a>
                      ) : (
                        <p className="text-gray-800 font-medium">{detail}</p>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          {/* Support Hours */}
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Horário de Atendimento</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">📞 Telefone</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>Segunda a Sexta: 8h às 18h</li>
                  <li>Sábado: 8h às 13h</li>
                  <li>Domingo: Fechado</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">💬 WhatsApp & Email</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>WhatsApp: 24h (resposta em até 1h)</li>
                  <li>Email: 24h (resposta em até 24h)</li>
                  <li>Suporte prioritário para assinantes</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Perguntas Mais Comuns</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "Como posso pagar pelos serviços?",
                answer: "Aceitamos pagamentos via M-Pesa, E-Mola e Mkesh. Após escolher seu plano, você receberá instruções detalhadas para completar o pagamento."
              },
              {
                question: "Quanto tempo leva para criar um CV?",
                answer: "Com nosso sistema otimizado, você pode criar seu CV completo em menos de 10 minutos. O processo é rápido e intuitivo."
              },
              {
                question: "Posso editar meu CV depois de criado?",
                answer: "Sim! Com os planos Mensal e Anual, você pode editar e atualizar seus CVs quantas vezes precisar."
              },
              {
                question: "O CV funciona para todas as áreas profissionais?",
                answer: "Sim! Nosso modelo é versátil e adequado para todas as áreas profissionais, desde tecnologia até educação, saúde e negócios."
              },
              {
                question: "Preciso de cartão de crédito para o primeiro CV gratuito?",
                answer: "Não! Seu primeiro CV é completamente gratuito, sem necessidade de cartão de crédito ou qualquer informação de pagamento."
              }
            ].map((faq, index) => (
              <Card key={index} className="p-6 border-0 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-google-blue to-google-green">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Ainda tem dúvidas?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Entre em contato conosco! Nossa equipe está sempre pronta para ajudar você a criar o CV perfeito.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://api.whatsapp.com/send?phone=258841524822&text=Ol%C3%A1%2C%20tenho%20interesse%20nos%20seus%20servi%C3%A7os.%20Pode%20me%20dar%20mais%20informa%C3%A7%C3%B5es%3F"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button 
                size="lg" 
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                Falar no WhatsApp
              </Button>
            </a>
            <Button 
              size="lg" 
              className="bg-white text-google-blue hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              onClick={() => navigate('/criar-cv')}
            >
              Criar CV Grátis
              <FileText className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contato;
