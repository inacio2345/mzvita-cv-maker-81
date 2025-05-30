
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { FileText, Download, Zap, Star, Users, Award } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <FileText className="w-8 h-8 text-google-blue" />,
      title: "CV Profissional",
      description: "Crie currículos impressionantes com design moderno e formatação perfeita"
    },
    {
      icon: <Download className="w-8 h-8 text-google-green" />,
      title: "Download Instantâneo",
      description: "Baixe seu CV em PDF de alta qualidade, pronto para impressão"
    },
    {
      icon: <Zap className="w-8 h-8 text-google-yellow" />,
      title: "Processo Rápido",
      description: "Crie seu CV completo em menos de 10 minutos com nosso assistente inteligente"
    }
  ];

  const stats = [
    { number: "10,000+", label: "CVs Criados", icon: <FileText className="w-6 h-6" /> },
    { number: "95%", label: "Taxa de Sucesso", icon: <Star className="w-6 h-6" /> },
    { number: "5,000+", label: "Usuários Ativos", icon: <Users className="w-6 h-6" /> },
    { number: "24h", label: "Suporte Disponível", icon: <Award className="w-6 h-6" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-google-blue to-google-green rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-google-blue to-google-green bg-clip-text text-transparent">
                MzVita CV
              </h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="/" className="text-google-blue font-semibold">Início</a>
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
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-google-blue via-google-red to-google-green bg-clip-text text-transparent">
              Crie seu CV perfeito
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              A plataforma mais moderna de Moçambique para criar currículos profissionais. 
              Design elegante, processo simples e resultados impressionantes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-google-blue to-google-green hover:from-google-green hover:to-google-blue text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                onClick={() => navigate('/criar-cv')}
              >
                Criar Meu CV Agora
                <FileText className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-4 text-lg border-2"
                onClick={() => navigate('/exemplos')}
              >
                Ver Exemplos
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              ✨ Primeiro CV totalmente GRÁTIS • Sem cartão de crédito
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-google-blue to-google-green rounded-full flex items-center justify-center text-white">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Por que escolher o MzVita CV?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Desenvolvido especialmente para o mercado moçambicano, com as melhores práticas internacionais
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-8 text-center hover:shadow-lg transition-shadow animate-fade-in border-0 shadow-md" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Como funciona</h2>
            <p className="text-xl text-gray-600">Três passos simples para ter seu CV perfeito</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Preencha seus dados",
                description: "Complete o formulário inteligente com suas informações pessoais e profissionais",
                color: "google-blue"
              },
              {
                step: "02", 
                title: "Visualize o resultado",
                description: "Veja seu CV sendo montado em tempo real com design profissional",
                color: "google-red"
              },
              {
                step: "03",
                title: "Baixe em PDF",
                description: "Download instantâneo do seu CV em alta qualidade, pronto para usar",
                color: "google-green"
              }
            ].map((item, index) => (
              <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.3}s` }}>
                <div className={`w-16 h-16 bg-${item.color} text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6`}>
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-google-blue to-google-green">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Pronto para impressionar?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Junte-se a milhares de moçambicanos que já conseguiram o emprego dos sonhos com nossos CVs
          </p>
          <Button 
            size="lg" 
            className="bg-white text-google-blue hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            onClick={() => navigate('/criar-cv')}
          >
            Começar Agora - É Grátis!
            <FileText className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-google-blue to-google-green rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">MzVita CV</span>
              </div>
              <p className="text-gray-400">
                A melhor plataforma para criar CVs profissionais em Moçambique.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Produto</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/como-funciona" className="hover:text-white transition-colors">Como funciona</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Modelos</a></li>
                <li><a href="/precos" className="hover:text-white transition-colors">Preços</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/contato" className="hover:text-white transition-colors">Central de Ajuda</a></li>
                <li><a href="/contato" className="hover:text-white transition-colors">Contato</a></li>
                <li><a href="https://api.whatsapp.com/send?phone=258841524822&text=Ol%C3%A1%2C%20tenho%20interesse%20nos%20seus%20servi%C3%A7os.%20Pode%20me%20dar%20mais%20informa%C3%A7%C3%B5es%3F" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WhatsApp</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacidade</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 MzVita CV. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
