import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, Users, HeadphonesIcon, Heart, Bell, Crown } from 'lucide-react';


const Comunidade = () => {
  const whatsappGroups = [
    {
      title: 'Atendimento VIP',
      description: 'Suporte exclusivo e personalizado para nossos usuários premium',
      icon: Crown,
      color: 'from-yellow-400 to-orange-500'
    },
    {
      title: 'Oportunidades MozVita',
      description: 'Vagas de emprego, dicas de carreira e oportunidades exclusivas',
      icon: Users,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Suporte Técnico',
      description: 'Ajuda técnica rápida para resolver suas dúvidas e problemas',
      icon: HeadphonesIcon,
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Apoiar o MozVita',
      description: 'Contribua com sugestões e ajude a melhorar nossa plataforma',
      icon: Heart,
      color: 'from-red-500 to-rose-500'
    },
    {
      title: 'Novidades do Sistema',
      description: 'Fique por dentro de todas as atualizações e novas funcionalidades',
      icon: Bell,
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const handleJoinCommunity = () => {
    window.open('https://chat.whatsapp.com/Fr5JP6FK5352kVOdoaU2XP', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            {/* WhatsApp-inspired icon */}
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
              <MessageCircle className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Junte-se à <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Comunidade MozVita
              </span> no WhatsApp e Fique Por Dentro das Oportunidades!
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Participe da Comunidade MozVita no WhatsApp e receba em primeira mão dicas, oportunidades de emprego, 
              suporte técnico, atualizações do sistema e atendimento VIP. Nossa comunidade é o lugar certo para 
              quem quer crescer com a gente!
            </p>
            
            <Button 
              size="lg" 
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={handleJoinCommunity}
            >
              <MessageCircle className="mr-2 h-6 w-6" />
              Entrar na Comunidade no WhatsApp
            </Button>
          </div>
        </div>
      </section>

      {/* Groups Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nossos Grupos de WhatsApp
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Escolha o grupo que mais se adapta às suas necessidades ou participe de todos para ter acesso completo à nossa comunidade
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {whatsappGroups.map((group, index) => (
              <Card 
                key={index} 
                className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-green-500 cursor-pointer group"
                onClick={handleJoinCommunity}
              >
                <CardHeader className="pb-4">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${group.color} flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                    <group.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-center text-gray-900">
                    {group.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-center">
                    {group.description}
                  </CardDescription>
                  <div className="mt-4 flex items-center justify-center">
                    <Button 
                      variant="outline" 
                      className="border-green-500 text-green-600 hover:bg-green-50 rounded-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleJoinCommunity();
                      }}
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Participar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Por que fazer parte da nossa comunidade?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Notificações em Tempo Real</h3>
              <p className="text-gray-600 text-sm">Receba atualizações instantâneas sobre novas oportunidades</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Networking</h3>
              <p className="text-gray-600 text-sm">Conecte-se com outros profissionais de Moçambique</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <HeadphonesIcon className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Suporte Direto</h3>
              <p className="text-gray-600 text-sm">Tire suas dúvidas diretamente com nossa equipe</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Crown className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="font-semibold mb-2">Conteúdo Exclusivo</h3>
              <p className="text-gray-600 text-sm">Acesse dicas e materiais disponíveis apenas na comunidade</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Pronto para fazer parte da nossa comunidade?
          </h2>
          <p className="text-lg text-green-100 mb-8 max-w-3xl mx-auto">
            Não perca mais nenhuma oportunidade! Junte-se agora à maior comunidade de profissionais de Moçambique.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-green-600 hover:bg-green-50 px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={handleJoinCommunity}
          >
            <MessageCircle className="mr-2 h-6 w-6" />
            Entrar Agora no WhatsApp
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Comunidade;