
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useNavigate } from 'react-router-dom';
import AppHeader from '@/components/layout/AppHeader';
import Footer from '@/components/ui/footer';
import AdSpace from '@/components/ads/AdSpace';

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

  // Script para anúncio no meio do blog
  const blogInlineAdScript = `
    <script async="async" data-cfasync="false" src="//pl26870458.profitableratecpm.com/61eba68a47e0ac2b98ec3fed6c320ba9/invoke.js"></script>
    <div id="container-61eba68a47e0ac2b98ec3fed6c320ba9"></div>
  `;

  // Script para anúncio no final do blog
  const blogEndAdScript = `
    <script async="async" data-cfasync="false" src="//pl26870458.profitableratecpm.com/61eba68a47e0ac2b98ec3fed6c320ba9/invoke.js"></script>
    <div id="container-61eba68a47e0ac2b98ec3fed6c320ba9"></div>
  `;

  // Função para inserir anúncio após o primeiro parágrafo
  const insertAdAfterFirstParagraph = (content: React.ReactNode) => {
    if (React.isValidElement(content) && content.props.children) {
      const children = React.Children.toArray(content.props.children);
      const newChildren: React.ReactNode[] = [];
      let adInserted = false;

      children.forEach((child, index) => {
        newChildren.push(child);
        
        // Inserir anúncio após o primeiro elemento que contém texto (normalmente o primeiro parágrafo)
        if (!adInserted && React.isValidElement(child) && 
            (child.type === 'p' || (child.props && child.props.className && child.props.className.includes('mb-6')))) {
          newChildren.push(
            <AdSpace 
              key="blog-inline-ad"
              id="blog-inline-ad" 
              type="blog-inline" 
              className="my-8"
              scriptCode={blogInlineAdScript}
            />
          );
          adInserted = true;
        }
      });

      return React.cloneElement(content, content.props, newChildren);
    }
    return content;
  };

  const enhancedContent = insertAdAfterFirstParagraph(content);

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
                {enhancedContent}
                
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

                {/* Anúncio no final do artigo */}
                <AdSpace 
                  id="blog-end-ad" 
                  type="blog-end" 
                  className="my-8"
                  scriptCode={blogEndAdScript}
                />
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

          <Card className="bg-gradient-to-r from-google-blue to-google-green text-white mb-8">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">
                Pronto para criar seu CV profissional?
              </h2>
              <p className="mb-6 opacity-90">
                Use nossas dicas e crie um currículo que impressiona empregadores em Moçambique.
              </p>
              <Button 
                onClick={() => navigate('/exemplos')} 
                className="bg-white text-google-blue hover:bg-gray-100 font-semibold px-8 py-3"
              >
                Ver Modelos de CV
              </Button>
            </CardContent>
          </Card>

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
                    <li key={index} className="text-blue-600 hover:text-blue-800 cursor-pointer">
                      {post}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

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
