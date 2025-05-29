import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  CheckCircle, 
  Star, 
  Users, 
  Download,
  Palette,
  Clock,
  Shield,
  User,
  BookOpen
} from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  // Verificar se o usuário está logado
  const isLoggedIn = localStorage.getItem('user') !== null;

  const handleCreateCV = () => {
    if (isLoggedIn) {
      navigate('/criar-cv');
    } else {
      navigate('/auth');
    }
  };

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
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">MzVita CV</span>
            </div>
            
            <div className="hidden md:flex space-x-6">
              <button 
                onClick={() => navigate('/como-funciona')}
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Como Funciona
              </button>
              <button 
                onClick={() => navigate('/precos')}
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Preços
              </button>
              <button 
                onClick={() => navigate('/blog')}
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Blog
              </button>
              <button 
                onClick={() => navigate('/contato')}
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Contato
              </button>
            </div>

            <div className="flex items-center space-x-3">
              {isLoggedIn ? (
                <>
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/perfil')}
                    className="flex items-center"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Perfil
                  </Button>
                  <Button onClick={handleCreateCV}>
                    Criar CV
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/auth')}
                  >
                    Entrar
                  </Button>
                  <Button onClick={handleCreateCV}>
                    Criar CV
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Crie seu <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">CV Profissional</span> em minutos
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            A ferramenta mais fácil e moderna para criar currículos impressionantes em Moçambique. 
            Templates profissionais, design atraente e resultados garantidos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={handleCreateCV}
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-3"
            >
              {isLoggedIn ? 'Criar Novo CV' : 'Começar Gratuitamente'}
              <FileText className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/como-funciona')}
              className="px-8 py-3"
            >
              Ver Como Funciona
            </Button>
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

      {/* Blog Preview Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Dicas e Guias Profissionais
          </h2>
          <p className="text-xl text-gray-600">
            Conteúdo especializado para impulsionar sua carreira
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <BookOpen className="w-8 h-8 text-blue-600 mb-2" />
              <CardTitle>Importância do CV</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Descubra por que um CV bem estruturado é fundamental para o sucesso profissional.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <FileText className="w-8 h-8 text-green-600 mb-2" />
              <CardTitle>Como Criar um CV</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Guia completo sobre currículos em Moçambique e como usar nossa plataforma.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Users className="w-8 h-8 text-purple-600 mb-2" />
              <CardTitle>Tendências 2024</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Conheça as principais tendências do mercado de trabalho moçambicano.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button 
            variant="outline" 
            onClick={() => navigate('/blog')}
            className="px-6 py-2"
          >
            Ver Todos os Artigos
          </Button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Pronto para transformar sua carreira?
          </h2>
          <p className="text-xl mb-8">
            Junte-se a milhares de moçambicanos que já conquistaram melhores oportunidades
          </p>
          <Button 
            size="lg" 
            onClick={handleCreateCV}
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3"
          >
            {isLoggedIn ? 'Criar Novo CV' : 'Criar Meu CV Agora'}
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <FileText className="w-6 h-6" />
                <span className="text-xl font-bold">MzVita CV</span>
              </div>
              <p className="text-gray-400">
                A melhor ferramenta para criar CVs profissionais em Moçambique.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Produto</h3>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => navigate('/como-funciona')} className="hover:text-white transition-colors">Como Funciona</button></li>
                <li><button onClick={() => navigate('/precos')} className="hover:text-white transition-colors">Preços</button></li>
                <li><button onClick={handleCreateCV} className="hover:text-white transition-colors">Criar CV</button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Recursos</h3>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => navigate('/blog')} className="hover:text-white transition-colors">Blog</button></li>
                <li><button onClick={() => navigate('/contato')} className="hover:text-white transition-colors">Suporte</button></li>
                {isLoggedIn && <li><button onClick={() => navigate('/perfil')} className="hover:text-white transition-colors">Perfil</button></li>}
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Contato</h3>
              <ul className="space-y-2 text-gray-400">
                <li>+258 869 824 047</li>
                <li>+258 841 524 822</li>
                <li>suportmzvita@gmail.com</li>
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
