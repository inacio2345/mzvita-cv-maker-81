import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { FileText, ArrowRight } from 'lucide-react';
const ComoFunciona = () => {
  const navigate = useNavigate();
  const steps = [{
    number: "01",
    title: "Preencha seus dados",
    description: "Complete o formulário inteligente com suas informações pessoais, formação acadêmica, experiência profissional e habilidades.",
    details: ["Dados pessoais (nome, telefone, e-mail, endereço)", "Informações sobre sua formação", "Experiência profissional detalhada", "Habilidades técnicas e comportamentais"]
  }, {
    number: "02",
    title: "Visualize o resultado",
    description: "Veja seu CV sendo montado em tempo real com design profissional formatado em Times New Roman.",
    details: ["Preview em tempo real", "Design profissional moderno", "Formatação Times New Roman", "Layout otimizado para impressão"]
  }, {
    number: "03",
    title: "Baixe em PDF",
    description: "Download instantâneo do seu CV em alta qualidade, pronto para enviar ou imprimir.",
    details: ["Download em PDF de alta qualidade", "Pronto para impressão", "Formatação preservada", "Compatível com todos os dispositivos"]
  }];
  return <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-google-blue via-google-red to-google-green bg-clip-text text-transparent">
            Como Funciona
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Criar seu CV profissional nunca foi tão fácil. Siga estes 3 passos simples e tenha seu currículo pronto em minutos.
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {steps.map((step, index) => <Card key={index} className="p-8 text-center hover:shadow-lg transition-shadow border-0 shadow-md">
                <div className={`w-16 h-16 bg-gradient-to-r ${index === 0 ? 'from-google-blue to-blue-600' : index === 1 ? 'from-google-red to-red-600' : 'from-google-green to-green-600'} text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6`}>
                  {step.number}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-6">{step.description}</p>
                <ul className="text-left space-y-2">
                  {step.details.map((detail, i) => <li key={i} className="flex items-center text-gray-700">
                      <ArrowRight className="w-4 h-4 text-google-green mr-2 flex-shrink-0" />
                      <span className="text-sm">{detail}</span>
                    </li>)}
                </ul>
              </Card>)}
          </div>

          {/* Benefits */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Por que escolher o MzVita CV?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">✨ Rápido e Eficiente</h3>
                <p className="text-gray-600">Crie seu CV completo em menos de 10 minutos com nosso processo otimizado.</p>
                
                <h3 className="text-xl font-semibold text-gray-900">🎨 Design Profissional</h3>
                <p className="text-gray-600">Layout moderno e elegante que impressiona recrutadores e empregadores.</p>
                
                <h3 className="text-xl font-semibold text-gray-900">📱 100% Responsivo</h3>
                <p className="text-gray-600">Funciona perfeitamente em todos os dispositivos - computador, tablet ou celular.</p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">🇲🇿 Feito para Moçambique</h3>
                <p className="text-gray-600">Desenvolvido especialmente para o mercado moçambicano com as melhores práticas.</p>
                
                <h3 className="text-xl font-semibold text-gray-900">💾 Download Instantâneo</h3>
                <p className="text-gray-600">Baixe seu CV em PDF de alta qualidade, pronto para envio e impressão.</p>
                
                <h3 className="text-xl font-semibold text-gray-900">🆓 Primeiro CV Grátis</h3>
                <p className="text-gray-600">Experimente nosso serviço sem compromisso - seu primeiro CV é totalmente gratuito.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-google-blue to-google-green">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Pronto para começar?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Junte-se a milhares de moçambicanos que já conseguiram o emprego dos sonhos
          </p>
          <Button size="lg" className="bg-white text-google-blue hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105" onClick={() => navigate('/criar-cv')}>
            Criar Meu CV Agora
            <FileText className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>
    </div>;
};
export default ComoFunciona;