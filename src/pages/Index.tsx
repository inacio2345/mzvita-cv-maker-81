import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Zap, Shield, Download, Star, Users, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import AuthModal from '@/components/auth/AuthModal';
import Footer from '@/components/ui/footer';
const Index = () => {
  const navigate = useNavigate();
  const {
    user
  } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const handleCreateCV = () => {
    if (user) {
      navigate('/criar-cv');
    } else {
      setShowAuthModal(true);
    }
  };
  return <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Crie seu <span className="bg-gradient-to-r from-google-blue to-google-green bg-clip-text text-transparent">
                CV Profissional
              </span> em minutos
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto text-justify">Crie seu currículo profissional online em Moçambique. Modelos prontos, fácil de usar e 100% em português. Destaque-se no mercado de trabalho com a MozVita


A MozVita é a ferramenta mais completa e fácil de usar para quem deseja criar currículos profissionais de alto impacto em Moçambique. 


Com modelos modernos, organizados e compatíveis com recrutadores moçambicanos e internacionais.


MozVita ajuda-te a destacar-te no mercado de trabalho com poucos cliques.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-google-blue hover:bg-blue-600 text-white px-8 py-6 text-lg" onClick={handleCreateCV}>
                <FileText className="mr-2 h-5 w-5" />
                {user ? 'Criar CV Grátis' : 'Registre-se e Crie CV'}
              </Button>
              <Button size="lg" variant="outline" className="border-google-blue text-google-blue hover:bg-google-blue hover:text-white px-8 py-6 text-lg" onClick={() => navigate('/exemplos')}>
                Ver Exemplos
              </Button>
            </div>
            {!user && <p className="text-sm text-gray-500 mt-4">
                É necessário fazer registro para criar e salvar seus CVs
              </p>}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Por que escolher o MozVita?
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Descubra os benefícios de usar nossa plataforma para criar um currículo profissional e 
              aumentar suas chances de sucesso.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center text-xl font-semibold">
                  <Zap className="mr-2 h-5 w-5 text-yellow-500" />
                  Fácil e Rápido
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-500">
                  Crie seu currículo em minutos com nossa interface intuitiva e templates pré-definidos.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center text-xl font-semibold">
                  <Shield className="mr-2 h-5 w-5 text-green-500" />
                  Profissional e Seguro
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-500">
                  Templates criados por especialistas em RH e total segurança dos seus dados.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center text-xl font-semibold">
                  <Download className="mr-2 h-5 w-5 text-blue-500" />
                  Download em PDF
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-500">
                  Exporte seu currículo em formato PDF, pronto para ser enviado para qualquer empresa.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              O que dizem sobre nós
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Veja o que nossos usuários estão falando sobre a experiência de criar seus currículos 
              com o MozVita.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Testimonial 1 */}
            <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardContent className="relative">
                <Star className="absolute top-2 right-2 h-4 w-4 text-yellow-400" />
                <p className="text-gray-700 mb-4">
                  "Consegui criar um currículo incrível em poucos minutos. A plataforma é muito fácil de usar e os templates são ótimos!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-200 mr-4">
                    <Users className="w-6 h-6 text-gray-500 mx-auto mt-2" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      Maria Silva
                    </p>
                    <p className="text-gray-500 text-sm">
                      Estudante
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial 2 */}
            <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardContent className="relative">
                <Star className="absolute top-2 right-2 h-4 w-4 text-yellow-400" />
                <p className="text-gray-700 mb-4">
                  "O MozVita me ajudou a conseguir o emprego dos meus sonhos. O currículo ficou muito profissional e destacou minhas habilidades."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-200 mr-4">
                    <Users className="w-6 h-6 text-gray-500 mx-auto mt-2" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      João Pereira
                    </p>
                    <p className="text-gray-500 text-sm">
                      Profissional de Marketing
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* Stat 1 */}
            <div>
              <p className="text-4xl font-bold text-google-blue mb-2">
                1000+
              </p>
              <p className="text-gray-600">
                Currículos Criados
              </p>
            </div>

            {/* Stat 2 */}
            <div>
              <p className="text-4xl font-bold text-google-green mb-2">
                95%
              </p>
              <p className="text-gray-600">
                Satisfação dos Usuários
              </p>
            </div>

            {/* Stat 3 */}
            <div>
              <p className="text-4xl font-bold text-yellow-500 mb-2">
                20+
              </p>
              <p className="text-gray-600">
                Templates Disponíveis
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
            Não perca mais tempo, crie um currículo profissional e destaque-se no mercado de trabalho.
          </p>
          <Button size="lg" className="bg-google-blue hover:bg-blue-600 text-white px-8 py-6 text-lg" onClick={handleCreateCV}>
            <CheckCircle className="mr-2 h-5 w-5" />
            {user ? 'Criar Meu CV Agora' : 'Registrar e Criar CV'}
          </Button>
        </div>
      </section>
      
      <Footer />
      
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>;
};
export default Index;