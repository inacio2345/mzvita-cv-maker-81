import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { getProfessionBySlug } from '@/data/seoProfessions';
import { getTemplateById } from '@/data/cvTemplates';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight, FileText, Download } from 'lucide-react';
import { motion } from 'framer-motion';

const ModeloProfissao = () => {
  const { slug } = useParams<{ slug: string }>();
  const profession = getProfessionBySlug(slug || '');

  if (!profession) {
    return <Navigate to="/" replace />;
  }

  const template = getTemplateById(profession.recommendedTemplateId);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <SEO
        title={profession.title}
        description={profession.description}
        keywords={profession.keywords}
        canonical={`/modelo-cv/${profession.slug}`}
      />

      {/* Hero Section */}
      <section className="pt-12 pb-20 bg-gradient-to-br from-brand-700 to-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
              {profession.h1}
            </h1>
            <p className="text-xl text-brand-100 mb-8 max-w-2xl">
              {profession.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/criar-cv">
                <Button size="lg" className="bg-white text-brand-700 hover:bg-slate-50 text-lg h-14 px-8 rounded-xl font-bold w-full sm:w-auto shadow-lg">
                  <FileText className="mr-2 w-5 h-5" />
                  Criar Meu CV Agora
                </Button>
              </Link>
            </div>
          </div>
          
          {template && (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="hidden md:block w-full max-w-md"
            >
              <div className="bg-white p-4 rounded-3xl shadow-2xl transform rotate-2 hover:rotate-0 transition-transform">
                <img 
                  src={template.previewImage} 
                  alt={profession.h1} 
                  className="w-full h-auto rounded-xl border border-slate-100"
                />
                <div className="mt-4 text-center">
                  <p className="text-slate-800 font-bold">Design Recomendado: {template.nome}</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Dicas Específicas para {profession.h1.replace('Modelo de CV Profissional para ', '').replace('Curriculum Vitae para ', '').replace('CV para ', '')}</h2>
            <p className="text-lg text-slate-600">Como destacar o seu perfil no mercado de trabalho em Moçambique.</p>
          </div>

          <div className="space-y-6">
            {profession.tips.map((tip, index) => (
              <div key={index} className="flex gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="mt-1 flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>
                <p className="text-lg text-slate-700">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-slate-100 text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Pronto para conquistar o mercado?</h2>
          <p className="text-lg text-slate-600 mb-8">
            Utilize o nosso sistema inteligente para preencher os seus dados e exportar o CV em formato PDF perfeito.
          </p>
          <Link to="/criar-cv">
            <Button size="lg" className="bg-brand-600 hover:bg-brand-700 text-white text-lg h-14 px-10 rounded-xl font-bold shadow-lg">
              <Download className="mr-2 w-5 h-5" />
              Baixar Modelo em PDF
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ModeloProfissao;
