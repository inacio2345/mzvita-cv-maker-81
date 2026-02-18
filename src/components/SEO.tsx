import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  twitterCard?: string;
  schemaData?: object;
}

const SEO = ({
  title,
  description,
  keywords,
  canonical,
  ogType = 'website',
  ogImage = 'https://lovable.dev/opengraph-image-p98pqg.png',
  twitterCard = 'summary_large_image',
  schemaData
}: SEOProps) => {
  const siteTitle = title ? `${title}` : 'MzVita CV - Criar Currículos Profissionais em Moçambique';
  const siteDescription = description || 'A melhor plataforma para criar CVs profissionais em Moçambique. Design moderno, processo simples e pagamento via M-Pesa.';
  const siteKeywords = keywords || 'criar CV rápido Moçambique, modelo de CV Times New Roman, carta de apresentação profissional, curriculum vitae Moçambique, CV online grátis';
  const siteUrl = 'https://www.mozvita.online';
  const pageUrl = canonical ? `${siteUrl}${canonical}` : siteUrl;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
      <meta name="keywords" content={siteKeywords} />
      {canonical && <link rel="canonical" href={pageUrl} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:image" content={ogImage.startsWith('/') ? `${siteUrl}${ogImage}` : ogImage} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:url" content={pageUrl} />

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDescription} />
      <meta name="twitter:description" content={siteDescription} />
      <meta name="twitter:image" content={ogImage.startsWith('/') ? `${siteUrl}${ogImage}` : ogImage} />

      {/* Article Specific Meta Tags */}
      {ogType === 'article' && (
        <>
          {schemaData && (schemaData as any).datePublished && (
            <meta property="article:published_time" content={(schemaData as any).datePublished} />
          )}
          {schemaData && (schemaData as any).dateModified && (
            <meta property="article:modified_time" content={(schemaData as any).dateModified} />
          )}
          {schemaData && (schemaData as any).articleSection && (
            <meta property="article:section" content={(schemaData as any).articleSection} />
          )}
          {schemaData && (schemaData as any).author && (schemaData as any).author[0] && (
            <meta property="article:author" content={(schemaData as any).author[0].name} />
          )}
        </>
      )}

      {/* Structured Data (JSON-LD) */}
      {schemaData && (
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
