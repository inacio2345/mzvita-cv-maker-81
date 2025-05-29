
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Blog = () => {
  const navigate = useNavigate();

  const articles = [
    {
      id: 1,
      title: 'A Importância de Ter um CV Bem Preparado',
      excerpt: 'Descubra por que um CV bem estruturado é fundamental para o sucesso profissional em Moçambique.',
      content: `
        <h2>Por que seu CV é tão importante?</h2>
        <p>Um currículo vitae (CV) bem preparado é a sua carta de apresentação no mercado de trabalho. Em Moçambique, onde a competição por vagas de emprego é intensa, ter um CV que se destaque é fundamental.</p>
        
        <h3>Benefícios de um CV bem feito:</h3>
        <ul>
          <li>Primeira impressão positiva aos recrutadores</li>
          <li>Destaque das suas competências principais</li>
          <li>Organização clara da sua experiência profissional</li>
          <li>Maior chance de ser chamado para entrevistas</li>
        </ul>

        <h3>Dicas essenciais:</h3>
        <p>Mantenha seu CV sempre atualizado, use uma linguagem clara e objetiva, e adapte-o para cada vaga que se candidatar.</p>

        <p><strong>Nossa plataforma</strong> oferece templates profissionais que seguem as melhores práticas do mercado moçambicano, ajudando você a criar um CV que realmente impressiona.</p>
      `,
      author: 'Equipe MzVita',
      date: '2024-01-15',
      image: '/placeholder.svg'
    },
    {
      id: 2,
      title: 'O que é um CV e Como Criar em Moçambique',
      excerpt: 'Guia completo sobre currículos em Moçambique, incluindo como usar nossa plataforma inovadora.',
      content: `
        <h2>O que é um Currículo Vitae?</h2>
        <p>Um Currículo Vitae (CV) é um documento que resume sua trajetória acadêmica, profissional e pessoal. Em Moçambique, é o documento mais importante para conseguir um emprego.</p>

        <h3>Estrutura ideal de um CV moçambicano:</h3>
        <ol>
          <li><strong>Dados Pessoais:</strong> Nome, contactos, localização</li>
          <li><strong>Objectivo Profissional:</strong> Suas metas de carreira</li>
          <li><strong>Formação Académica:</strong> Educação formal</li>
          <li><strong>Experiência Profissional:</strong> Empregos anteriores</li>
          <li><strong>Habilidades:</strong> Competências técnicas e pessoais</li>
          <li><strong>Referências:</strong> Contactos de referência</li>
        </ol>

        <h3>Como nossa plataforma ajuda:</h3>
        <p>Nossa ferramenta foi desenvolvida especificamente para o mercado moçambicano. Oferecemos:</p>
        <ul>
          <li>Templates adaptados ao contexto local</li>
          <li>Orientações específicas para cada setor</li>
          <li>Suporte em português</li>
          <li>Preços acessíveis para todos</li>
        </ul>

        <p>Criar um CV nunca foi tão fácil! <a href="/criar-cv">Experimente nossa plataforma hoje mesmo.</a></p>
      `,
      author: 'João Silva',
      date: '2024-01-10',
      image: '/placeholder.svg'
    },
    {
      id: 3,
      title: 'Tendências do Mercado de Trabalho em Moçambique 2024',
      excerpt: 'Conheça as principais tendências e como adaptar seu CV para as oportunidades emergentes.',
      content: `
        <h2>O Mercado de Trabalho Moçambicano em 2024</h2>
        <p>O mercado de trabalho em Moçambique está em constante evolução. Novas oportunidades surgem em setores como tecnologia, agricultura sustentável e energia renovável.</p>

        <h3>Setores em crescimento:</h3>
        <ul>
          <li><strong>Tecnologia da Informação:</strong> Programação, análise de dados</li>
          <li><strong>Agricultura Moderna:</strong> Técnicos agrícolas, gestão rural</li>
          <li><strong>Energia Renovável:</strong> Técnicos em solar e eólica</li>
          <li><strong>Turismo Sustentável:</strong> Guias especializados, ecoturismo</li>
        </ul>

        <h3>Competências mais valorizadas:</h3>
        <ol>
          <li>Conhecimentos digitais básicos</li>
          <li>Capacidade de trabalho em equipe</li>
          <li>Adaptabilidade e flexibilidade</li>
          <li>Comunicação eficaz</li>
          <li>Pensamento crítico</li>
        </ol>

        <h3>Como adaptar seu CV:</h3>
        <p>Para se destacar no mercado atual, é importante:</p>
        <ul>
          <li>Destacar competências digitais</li>
          <li>Mostrar experiências de liderança</li>
          <li>Incluir cursos online realizados</li>
          <li>Demonstrar capacidade de aprendizagem contínua</li>
        </ul>

        <p>Nossa plataforma está sempre atualizada com as últimas tendências. <a href="/precos">Veja nossos planos</a> e mantenha-se competitivo!</p>
      `,
      author: 'Maria Santos',
      date: '2024-01-05',
      image: '/placeholder.svg'
    }
  ];

  const [selectedArticle, setSelectedArticle] = React.useState<number | null>(null);

  if (selectedArticle !== null) {
    const article = articles.find(a => a.id === selectedArticle);
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <header className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4">
            <Button
              variant="ghost"
              onClick={() => setSelectedArticle(null)}
              className="flex items-center text-gray-600 hover:text-blue-600"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Blog
            </Button>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <article className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img 
                src={article?.image} 
                alt={article?.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{article?.title}</h1>
                
                <div className="flex items-center text-gray-600 mb-6">
                  <User className="w-4 h-4 mr-2" />
                  <span className="mr-4">{article?.author}</span>
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{new Date(article?.date || '').toLocaleDateString('pt-PT')}</span>
                </div>

                <div 
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: article?.content || '' }}
                />

                <div className="mt-8 pt-6 border-t">
                  <h3 className="text-lg font-semibold mb-4">Artigos Relacionados</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {articles.filter(a => a.id !== selectedArticle).slice(0, 2).map((relatedArticle) => (
                      <Card 
                        key={relatedArticle.id} 
                        className="cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => setSelectedArticle(relatedArticle.id)}
                      >
                        <CardHeader>
                          <CardTitle className="text-lg">{relatedArticle.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600 text-sm">{relatedArticle.excerpt}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="flex items-center text-gray-600 hover:text-blue-600"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Início
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">Blog MzVita</h1>
            <div></div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Dicas e Guias para seu Sucesso Profissional
            </h2>
            <p className="text-xl text-gray-600">
              Conteúdo especializado sobre CVs e carreira em Moçambique
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Card 
                key={article.id} 
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setSelectedArticle(article.id)}
              >
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <CardHeader>
                  <CardTitle className="text-xl">{article.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{article.excerpt}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{new Date(article.date).toLocaleDateString('pt-PT')}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Card className="p-8 bg-gradient-to-r from-blue-600 to-green-600 text-white">
              <h3 className="text-2xl font-bold mb-4">Pronto para criar seu CV?</h3>
              <p className="text-lg mb-6">
                Use nossa plataforma para criar um CV profissional em minutos!
              </p>
              <Button 
                onClick={() => navigate('/criar-cv')}
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                Criar CV Agora
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
