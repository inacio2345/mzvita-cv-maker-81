
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User, ArrowLeft, Facebook, Linkedin, MessageCircle, Home, ChevronRight } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useNavigate, Link } from 'react-router-dom';
import AppHeader from '@/components/layout/AppHeader';
import AdSpace from '@/components/ads/AdSpace';
import AdsterraMobileBanner from '@/components/ads/AdsterraMobileBanner';
import SEO from '@/components/SEO';

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
  relatedPosts?: { title: string; slug: string }[];
  featuredImage?: string;
  contentImages?: string[];
  slug: string;
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
  contentImages = [],
  slug
}: BlogPostProps) => {
  const navigate = useNavigate();
  const siteUrl = 'https://www.mozvita.online';
  const imageUrl = featuredImage ? (featuredImage.startsWith('http') ? featuredImage : `${siteUrl}${featuredImage}`) : `${siteUrl}/og-image.png`;
  const postUrl = `/blog/${slug}`;
  const fullPostUrl = `${siteUrl}${postUrl}`;

  // State for reading progress
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    const updateReadingProgress = () => {
      const currentScroll = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      if (scrollHeight) {
        setReadingProgress(Number((currentScroll / scrollHeight).toFixed(2)) * 100);
      }
    };

    window.addEventListener('scroll', updateReadingProgress);
    return () => window.removeEventListener('scroll', updateReadingProgress);
  }, []);

  const shareOnWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' - ' + fullPostUrl)}`, '_blank');
  };

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullPostUrl)}`, '_blank');
  };

  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullPostUrl)}`, '_blank');
  };

  // Schema.org Structured Data
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "image": [imageUrl],
    "datePublished": date,
    "dateModified": date,
    "author": [{
      "@type": "Person",
      "name": author,
      "url": "https://www.mozvita.online/sobre"
    }],
    "datePublished": date,
    "dateModified": date,
    "articleSection": category,
    "publisher": {
      "@type": "Organization",
      "name": "MozVita CV Maker",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.mozvita.online/logo.png"
      }
    },
    "description": metaDescription,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${siteUrl}${postUrl}`
    }
  };

  // ... (Ads scripts omitted for brevity, keeping existing) ...
  const blogInlineAdScript = `
    <script async="async" data-cfasync="false" src="//pl26870458.profitableratecpm.com/61eba68a47e0ac2b98ec3fed6c320ba9/invoke.js"></script>
    <div id="container-61eba68a47e0ac2b98ec3fed6c320ba9"></div>
  `;

  // Script para anúncio no final do blog
  const blogEndAdScript = `
    <script async="async" data-cfasync="false" src="//pl26870458.profitableratecpm.com/61eba68a47e0ac2b98ec3fed6c320ba9/invoke.js"></script>
    <div id="container-61eba68a47e0ac2b98ec3fed6c320ba9"></div>
  `;

  // Função para inserir anúncios no conteúdo
  const insertAdsIntoContent = (content: React.ReactNode) => {
    if (React.isValidElement(content) && content.props.children) {
      const children = React.Children.toArray(content.props.children);
      const newChildren: React.ReactNode[] = [];
      const totalElements = children.length;
      const middleIndex = Math.floor(totalElements / 2);

      let topAdInserted = false;
      let middleAdInserted = false;

      children.forEach((child, index) => {
        newChildren.push(child);

        // 1. Anúncio no Topo (após o primeiro parágrafo)
        if (!topAdInserted && React.isValidElement(child) &&
          (child.type === 'p' || (child.props && child.props.className && child.props.className.includes('mb-6')))) {
          newChildren.push(
            <div key="blog-top-ad-container" className="my-8">
              <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-2 text-center">Anúncio</p>
              <AdSpace
                id="blog-inline-ad"
                type="blog-inline"
                scriptCode={blogInlineAdScript}
              />
              <AdsterraMobileBanner />
            </div>
          );
          topAdInserted = true;
        }

        // 2. Anúncio no Meio (aproximadamente 50% do conteúdo, se tiver elementos suficientes)
        if (topAdInserted && !middleAdInserted && index === middleIndex && totalElements > 6) {
          newChildren.push(
            <div key="blog-middle-ad-container" className="my-8">
              <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-2 text-center">Anúncio</p>
              <AdSpace
                id="blog-middle-ad"
                type="blog-inline"
                scriptCode={blogInlineAdScript}
              />
              <AdsterraMobileBanner />
            </div>
          );
          middleAdInserted = true;
        }
      });

      return React.cloneElement(content, content.props, newChildren);
    }
    return content;
  };

  const enhancedContent = insertAdsIntoContent(content);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <SEO
        title={`${title} | MozVita Blog`}
        description={metaDescription}
        ogImage={imageUrl}
        ogType="article"
        schemaData={schemaData}
        canonical={postUrl}
      />

      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 h-1 bg-blue-600 z-50 transition-all duration-300" style={{ width: `${readingProgress}%` }} />

      <AppHeader title="Blog MozVita" />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">

          {/* Breadcrumbs */}
          <nav className="flex items-center text-sm text-gray-500 mb-6 overflow-x-auto whitespace-nowrap pb-2">
            <Link to="/" className="hover:text-blue-600 flex items-center">
              <Home className="w-3 h-3 mr-1" /> Home
            </Link>
            <ChevronRight className="w-3 h-3 mx-2" />
            <Link to="/blog" className="hover:text-blue-600">Blog</Link>
            <ChevronRight className="w-3 h-3 mx-2" />
            <span className="text-gray-900 font-medium">{category}</span>
          </nav>

          {/* Social Share Floating (Desktop) */}
          <div className="hidden lg:flex flex-col fixed left-4 top-1/2 -translate-y-1/2 gap-3 z-40 bg-white p-3 rounded-xl shadow-lg border border-gray-100">
            <span className="text-xs font-bold text-center text-gray-400 mb-1">Share</span>
            <Button variant="ghost" size="icon" className="hover:bg-green-50 hover:text-green-600" onClick={shareOnWhatsApp} title="Compartilhar no WhatsApp">
              <MessageCircle className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-blue-50 hover:text-blue-600" onClick={shareOnFacebook} title="Compartilhar no Facebook">
              <Facebook className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-blue-50 hover:text-blue-700" onClick={shareOnLinkedIn} title="Compartilhar no LinkedIn">
              <Linkedin className="w-5 h-5" />
            </Button>
          </div>

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
                  alt={`Capa do artigo: ${title} - MozVita Blog`}
                  className="w-full h-64 md:h-80 object-cover"
                  loading="lazy"
                />
              </div>
            )}
          </div>

          {/* Mobile Share Bar (Top) */}
          <div className="lg:hidden flex items-center justify-between bg-white border border-gray-100 rounded-lg p-3 mb-8 shadow-sm">
            <span className="text-sm font-semibold text-gray-700">Compartilhar:</span>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="border-green-200 text-green-700 bg-green-50" onClick={shareOnWhatsApp}>
                <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp
              </Button>
              <Button size="icon" variant="ghost" onClick={shareOnFacebook}>
                <Facebook className="w-4 h-4 text-blue-600" />
              </Button>
              <Button size="icon" variant="ghost" onClick={shareOnLinkedIn}>
                <Linkedin className="w-4 h-4 text-blue-700" />
              </Button>
            </div>
          </div>

          {/* Conteúdo do artigo */}
          <Card className="bg-white shadow-lg mb-8">
            <CardContent className="p-8">
              <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-strong:text-gray-900">
                {enhancedContent}

                {/* Imagens do conteúdo */}
                {contentImages.length > 0 && (
                  <div className="my-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {contentImages.map((image, index) => (
                        <div key={index} className="rounded-lg overflow-hidden shadow-md">
                          <img
                            src={image}
                            alt={`Ilustração visual para o tópico ${index + 1} do artigo ${title}`}
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
                    <li key={index}>
                      <a
                        href={`/blog/${post.slug}`}
                        className="text-blue-600 hover:text-blue-800 font-medium hover:underline block py-1"
                        title={post.title}
                      >
                        {post.title}
                      </a>
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

    </div>

  );
};

export default BlogPost;
