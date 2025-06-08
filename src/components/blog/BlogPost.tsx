
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useNavigate } from 'react-router-dom';
import AppHeader from '@/components/layout/AppHeader';
import Footer from '@/components/ui/footer';

interface FAQ {
  question: string;
  answer: string;
}

interface BlogPostProps {
  title: string;
  metaDescription: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  content: React.ReactNode;
  faqs: FAQ[];
  relatedPosts?: string[];
  featuredImage?: string;
  contentImages?: string[];
}

const BlogPost = ({ 
  title, 
  metaDescription, 
  author, 
  date, 
  readTime, 
  category, 
  content, 
  faqs,
  relatedPosts = [],
  featuredImage,
  contentImages = []
}: BlogPostProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <AppHeader title="Blog MozVita" />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header do artigo */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {category}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {title}
            </h1>
            
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              {metaDescription}
            </p>
            
            <div className="flex items-center text-sm text-gray-500 space-x-4 mb-6">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                <span>{author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                <span>{new Date(date).toLocaleDateString('pt-BR')}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span>{readTime}</span>
              </div>
            </div>

            {/* Imagem destacada */}
            {featuredImage && (
              <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
                <img 
                  src={featuredImage} 
                  alt={title}
                  className="w-full h-64 md:h-80 object-cover"
                />
              </div>
            )}
          </div>

          {/* Conteúdo do artigo */}
          <Card className="bg-white shadow-lg mb-8">
            <CardContent className="p-8">
              <div className="prose prose-lg max-w-none">
                {content}
                
                {/* Imagens do conteúdo */}
                {contentImages.length > 0 && (
                  <div className="my-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {contentImages.map((image, index) => (
                        <div key={index} className="rounded-lg overflow-hidden shadow-md">
                          <img 
                            src={image} 
                            alt={`Ilustração ${index + 1} - ${title}`}
                            className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          {faqs.length > 0 && (
            <Card className="bg-white shadow-lg mb-8">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Perguntas Frequentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left font-medium">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          )}

          {/* CTA para criação de CV */}
          <Card className="bg-gradient-to-r from-google-blue to-google-green text-white mb-8">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">
                Pronto para criar seu CV profissional?
              </h2>
              <p className="mb-6 opacity-90">
                Use nossas dicas e crie um currículo que impressiona empregadores em Moçambique.
              </p>
              <Button 
                onClick={() => navigate('/criar-cv')}
                className="bg-white text-google-blue hover:bg-gray-100 font-semibold px-8 py-3"
              >
                Criar Meu CV Agora
              </Button>
            </CardContent>
          </Card>

          {/* Posts relacionados */}
          {relatedPosts.length > 0 && (
            <Card className="bg-white shadow-lg mb-8">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">
                  Artigos Relacionados
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {relatedPosts.map((post, index) => (
                    <li key={index} className="text-google-blue hover:text-blue-600">
                      <button className="text-left hover:underline">
                        {post}
                      </button>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Voltar ao blog */}
          <div className="text-center">
            <Button 
              onClick={() => navigate('/blog')}
              variant="outline"
              className="border-google-blue text-google-blue hover:bg-google-blue hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Blog
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BlogPost;
