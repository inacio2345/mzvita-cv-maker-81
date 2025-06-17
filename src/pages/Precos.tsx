
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { FileText, Circle } from 'lucide-react';

const Precos = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: "Por CV",
      price: "35",
      period: "por CV gerado",
      description: "Perfeito para uso ocasional",
      features: [
        "1 CV profissional",
        "Download em PDF",
        "Design moderno",
        "Formatação Times New Roman",
        "Suporte básico"
      ],
      popular: false,
      buttonText: "Ver Modelos"
    },
    {
      name: "Mensal",
      price: "100",
      period: "por mês",
      description: "Ideal para quem busca emprego ativamente",
      features: [
        "CVs ilimitados",
        "Download em PDF",
        "Design moderno",
        "Formatação Times New Roman",
        "Atualizações ilimitadas",
        "Suporte prioritário",
        "Modelos exclusivos"
      ],
      popular: true,
      buttonText: "Começar Agora"
    },
    {
      name: "Anual",
      price: "500",
      period: "por ano",
      description: "Melhor valor para uso contínuo",
      features: [
        "CVs ilimitados",
        "Download em PDF",
        "Design moderno",
        "Formatação Times New Roman",
        "Atualizações ilimitadas",
        "Suporte prioritário",
        "Modelos exclusivos",
        "Consultoria de carreira",
        "Templates premium"
      ],
      popular: false,
      buttonText: "Assinar Anual",
      savings: "Economize 58%"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="py-8 md:py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-google-blue via-google-red to-google-green bg-clip-text text-transparent">
            Preços Simples
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed">
            Escolha o plano que melhor se adapta às suas necessidades. Comece com seu primeiro CV totalmente grátis!
          </p>
          <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
            ✨ Primeiro CV totalmente GRÁTIS • Sem cartão de crédito
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-8 md:py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative p-6 md:p-8 border-0 shadow-lg hover:shadow-xl transition-all ${
                plan.popular ? 'ring-2 ring-google-blue transform scale-105' : ''
              }`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-google-blue text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Mais Popular
                    </span>
                  </div>
                )}
                {plan.savings && (
                  <div className="absolute -top-4 right-4">
                    <span className="bg-google-green text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {plan.savings}
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6 md:mb-8">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4 text-sm md:text-base">{plan.description}</p>
                  <div className="mb-4">
                    <span className="text-3xl md:text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-lg md:text-xl text-gray-600 ml-1">MT</span>
                  </div>
                  <p className="text-gray-500 text-sm">{plan.period}</p>
                </div>

                <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm md:text-base">
                      <Circle className="w-2 h-2 text-google-green fill-current mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full py-3 text-sm md:text-base ${
                    plan.popular 
                      ? 'bg-google-blue hover:bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                  onClick={() => navigate('/exemplos')}
                >
                  {plan.buttonText}
                </Button>
              </Card>
            ))}
          </div>

          {/* Payment Methods */}
          <div className="mt-12 md:mt-16 text-center">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">Métodos de Pagamento</h3>
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg max-w-2xl mx-auto">
              <div className="flex justify-center items-center space-x-4 md:space-x-8">
                <div className="text-center">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-red-600 font-bold text-lg md:text-xl">M</span>
                  </div>
                  <p className="text-gray-700 font-medium text-sm md:text-base">M-Pesa</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-bold text-lg md:text-xl">E</span>
                  </div>
                  <p className="text-gray-700 font-medium text-sm md:text-base">E-Mola</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-green-600 font-bold text-lg md:text-xl">MB</span>
                  </div>
                  <p className="text-gray-700 font-medium text-sm md:text-base">Mkesh</p>
                </div>
              </div>
              <p className="text-gray-600 mt-4 md:mt-6 text-xs md:text-sm">
                Pagamentos seguros e instantâneos através dos principais métodos de pagamento de Moçambique
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-gray-900">Perguntas Frequentes</h2>
          <div className="max-w-3xl mx-auto space-y-4 md:space-y-6">
            {[
              {
                question: "O primeiro CV é realmente grátis?",
                answer: "Sim! Você pode criar e baixar seu primeiro CV completamente grátis, sem precisar de cartão de crédito."
              },
              {
                question: "Posso cancelar minha assinatura a qualquer momento?",
                answer: "Sim, você pode cancelar sua assinatura a qualquer momento. Não há contratos de longo prazo."
              },
              {
                question: "Como funciona o pagamento via M-Pesa?",
                answer: "Após escolher seu plano, você receberá instruções para completar o pagamento via M-Pesa de forma segura."
              },
              {
                question: "Posso editar meu CV depois de criado?",
                answer: "Com os planos Mensal e Anual, você pode editar e atualizar seus CVs quantas vezes quiser."
              }
            ].map((faq, index) => (
              <Card key={index} className="p-4 md:p-6 border-0 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">{faq.question}</h3>
                <p className="text-gray-600 text-sm md:text-base">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Precos;
