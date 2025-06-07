
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User, BookOpen, ArrowRight } from 'lucide-react';
import AppHeader from '@/components/layout/AppHeader';
import Footer from '@/components/ui/footer';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Como criar um CV profissional em Moçambique",
      excerpt: "Descubra as melhores práticas para criar um currículo que se destaque no mercado de trabalho moçambicano.",
      date: "2024-06-01",
      author: "Equipe MozVita",
      readTime: "5 min",
      category: "Dicas de CV"
    },
    {
      id: 2,
      title: "5 erros comuns que você deve evitar no seu CV",
      excerpt: "Evite estes erros básicos que podem prejudicar suas chances de conseguir uma entrevista de emprego.",
      date: "2024-05-28",
      author: "Equipe MozVita",
      readTime: "3 min",
      category: "Dicas de CV"
    },
    {
      id: 3,
      title: "Primeiro emprego: como montar um CV sem experiência",
      excerpt: "Aprenda a destacar suas qualidades e potencial mesmo sem experiência profissional anterior.",
      date: "2024-05-25",
      author: "Equipe MozVita",
      readTime: "4 min",
      category: "Primeiro Emprego"
    },
    {
      id: 4,
      title: "Tendências do mercado de trabalho em Moçambique 2024",
      excerpt: "Conheça as profissões em alta e as competências mais valorizadas pelos empregadores.",
      date: "2024-05-20",
      author: "Equipe MozVita",
      readTime: "7 min",
      category: "Mercado de Trabalho"
    },
    {
      id: 5,
      title: "Como adaptar seu CV para diferentes áreas profissionais",
      excerpt: "Saiba como personalizar seu currículo para destacar as competências específicas de cada profissão.",
      date: "2024-05-15",
      author: "Equipe MozVita",
      readTime: "6 min",
      category: "Dicas de CV"
    },
    {
      id: 6,
      title: "A importância da foto no currículo moçambicano",
      excerpt: "Entenda quando e como incluir uma foto profissional no seu CV para causar boa impressão.",
      date: "2024-05-10",
      author: "Equipe MozVita",
      readTime: "3 min",
      category: "Dicas de CV"
    }
  ];

  const categories = [
    "Todos",
    "Dicas de CV",
    "Primeiro Emprego", 
    "Mercado de Trabalho"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <AppHeader title="Blog MozVita" />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header do Blog */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <BookOpen className="w-8 h-8 text-google-blue mr-3" />
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Blog MozVita
              </h1>
            </div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Dicas, guias e insights para ajudar você a criar o CV perfeito e 
              conseguir o emprego dos seus sonhos em Moçambique.
            </p>
          </div>

          {/* Filtros por categoria */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category, index) => (
              <Button
                key={index}
                variant={index === 0 ? "default" : "outline"}
                className={index === 0 ? "bg-google-blue hover:bg-blue-600" : "hover:bg-google-blue hover:text-white"}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Lista de artigos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {blogPosts.map((post) => (
              <Card key={post.id} className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                <CardHeader>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                      {post.category}
                    </span>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                  <CardTitle className="text-lg font-semibold line-clamp-2 hover:text-google-blue transition-colors">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </CardDescription>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <User className="w-4 h-4 mr-1" />
                      <span className="mr-3">{post.author}</span>
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{new Date(post.date).toLocaleDateString('pt-BR')}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-google-blue hover:text-blue-600">
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Newsletter signup */}
          <div className="bg-gradient-to-r from-google-blue to-google-green rounded-lg p-8 text-center text-white mb-12">
            <h2 className="text-2xl font-bold mb-4">
              Receba dicas exclusivas no seu email
            </h2>
            <p className="mb-6 opacity-90">
              Cadastre-se para receber nossos melhores artigos sobre criação de CV e dicas de carreira.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Seu melhor email"
                className="flex-1 px-4 py-2 rounded-lg text-gray-900"
              />
              <Button className="bg-white text-google-blue hover:bg-gray-100">
                Cadastrar
              </Button>
            </div>
          </div>

          {/* Call to action */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Pronto para criar seu CV profissional?
            </h2>
            <p className="text-gray-600 mb-6">
              Use o que aprendeu no blog e crie um currículo que impressiona empregadores.
            </p>
            <Button 
              size="lg" 
              className="bg-google-blue hover:bg-blue-600 text-white px-8 py-3"
            >
              Criar Meu CV Agora
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
