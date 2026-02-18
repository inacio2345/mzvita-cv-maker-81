
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User, BookOpen, ArrowRight, Search, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import AppHeader from '@/components/layout/AppHeader';

import { Badge } from '@/components/ui/badge';
import { blogPosts } from '@/data/blogPosts';

const Blog = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');

  // Importação dos posts do arquivo de dados centralizado


  const categories = [
    "Todos",
    "Dicas de CV",
    "Primeiro Emprego",
    "Mercado de Trabalho",
    "Setores",
    "Empreendedorismo",
    "Dicas de Carreira"
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'Todos' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const featuredPosts = blogPosts.filter(post => post.featured).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const regularPosts = filteredPosts.filter(post => !post.featured);

  const handlePostClick = (route: string) => {
    navigate(route);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <AppHeader title="Blog MozVita" />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header do Blog Modernizado */}
          <div className="text-center mb-16 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-google-blue rounded-full opacity-20"></div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight mt-8">
              Blog MzVita
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Dicas de especialistas, guias de carreira e tudo o que você precisa para conquistar o mercado de trabalho em Moçambique.
            </p>
          </div>

          <div className={`${isMobile ? 'block' : 'flex'} gap-8`}>
            {/* Sidebar de filtros (Desktop) ou Topo (Mobile) */}
            <aside className={`${isMobile ? 'w-full mb-8' : 'w-1/4'} space-y-8`}>
              {/* Pesquisa */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                  <Search className="w-5 h-5 mr-2 text-google-blue" />
                  Pesquisar
                </h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Como fazer cv..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-3 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-google-blue"
                  />
                </div>
              </div>

              {/* Categorias */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-google-blue" />
                  Categorias
                </h3>
                <div className="flex flex-col gap-2">
                  {categories.map((category, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedCategory(category)}
                      className={`text-left px-3 py-2 rounded-lg transition-colors text-sm ${selectedCategory === category
                        ? 'bg-google-blue text-white'
                        : 'text-gray-600 hover:bg-gray-50'
                        }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Newsletter simplificada */}
              <div className="bg-gradient-to-br from-google-blue to-blue-700 p-6 rounded-xl text-white shadow-md">
                <h3 className="font-bold mb-2">Newsletter</h3>
                <p className="text-xs mb-4 opacity-90">Receba dicas de carreira no seu email.</p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Seu email"
                    className="w-full px-3 py-2 text-xs rounded-lg text-gray-900"
                  />
                  <Button size="sm" className="w-full bg-white text-google-blue hover:bg-gray-100">
                    Assinar
                  </Button>
                </div>
              </div>
            </aside>

            {/* Feed de Artigos */}
            <main className={`${isMobile ? 'w-full' : 'w-3/4'}`}>
              {/* Posts em destaque (apenas se não houver filtro ativo) */}
              {featuredPosts.length > 0 && searchTerm === '' && selectedCategory === 'Todos' && (
                <div className="mb-12">
                  <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <Star className="w-5 h-5 mr-2 text-google-red" />
                    Destaques
                  </h2>
                  <div className="grid grid-cols-1 gap-6">
                    {featuredPosts.slice(0, 1).map((post) => (
                      <Card
                        key={post.id}
                        className="bg-white shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden group"
                        onClick={() => handlePostClick(post.route || `/blog/${post.slug}`)}
                      >
                        <div className="flex flex-col md:flex-row h-full">
                          <div className="md:w-2/5 relative overflow-hidden h-64 md:h-auto bg-gray-100 flex items-center justify-center">
                            {post.image ? (
                              <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            ) : (
                              <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-blue-50 to-white">
                                <BookOpen className="w-16 h-16 text-google-blue/20" />
                              </div>
                            )}
                          </div>
                          <div className="md:w-3/5 p-6 flex flex-col justify-center">
                            <div className="flex items-center gap-2 mb-3">
                              <Badge className="bg-google-blue">{post.category}</Badge>
                              <span className="text-xs text-gray-400">{post.readTime} leitura</span>
                            </div>
                            <CardTitle className="text-xl md:text-2xl font-bold mb-4 group-hover:text-google-blue transition-colors">
                              {post.title}
                            </CardTitle>
                            <p className="text-gray-600 text-sm md:text-base mb-6 line-clamp-2">
                              {post.excerpt}
                            </p>
                            <div className="flex items-center justify-between mt-auto">
                              <div className="flex items-center text-xs text-gray-500">
                                <span className="font-medium text-gray-900">{post.author}</span>
                                <span className="mx-2">•</span>
                                <span>{new Date(post.date).toLocaleDateString('pt-BR')}</span>
                              </div>
                              <ArrowRight className="w-5 h-5 text-google-blue transform group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Titulo da Lista */}
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                {searchTerm ? `Resultados para "${searchTerm}"` :
                  selectedCategory !== 'Todos' ? `Artigos: ${selectedCategory}` :
                    "Todos os Artigos"}
              </h2>

              {/* Lista Principal */}
              {filteredPosts.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-dashed border-gray-200">
                  <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900">Nenhum resultado</h3>
                  <p className="text-gray-500">Ajuste os filtros para encontrar o que procura.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {(searchTerm !== '' || selectedCategory !== 'Todos' ? filteredPosts : regularPosts).map((post) => (
                    <Card
                      key={post.id}
                      className="bg-white shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer h-full flex flex-col group overflow-hidden rounded-xl border border-gray-100"
                      onClick={() => handlePostClick(post.route || `/blog/${post.slug}`)}
                    >
                      {post.image && (
                        <div className="h-48 w-full overflow-hidden relative">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}

                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between mb-3">
                          <Badge variant="outline" className="border-blue-100 text-google-blue text-[10px] uppercase tracking-wider">
                            {post.category}
                          </Badge>
                          <span className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">{post.readTime}</span>
                        </div>
                        <CardTitle className="text-base font-bold line-clamp-2 group-hover:text-google-blue transition-colors">
                          {post.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex-1 flex flex-col">
                        <CardDescription className="text-gray-600 text-xs mb-4 line-clamp-3">
                          {post.excerpt}
                        </CardDescription>
                        <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between text-[11px] text-gray-500">
                          <span className="font-medium">{post.author}</span>
                          <span>{new Date(post.date).toLocaleDateString('pt-BR')}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </main>
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
              onClick={() => navigate('/exemplos')}
            >
              Ver Modelos de CV
            </Button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Blog;
