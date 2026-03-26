import React from 'react';
import AppHeader from '@/components/layout/AppHeader';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { FileText, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SEOPageProps {
    title: string;
    seoTitle: string;
    description: string;
    keywords: string;
    canonical: string;
    children: React.ReactNode;
}

const SEOPage = ({
    title,
    seoTitle,
    description,
    keywords,
    canonical,
    children
}: SEOPageProps) => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-50">
            <SEO
                title={seoTitle}
                description={description}
                keywords={keywords}
                canonical={canonical}
            />
            <AppHeader title="MozVita" />

            <main className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <Breadcrumbs />

                    <article className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12 mb-12">
                        <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-8 border-b pb-6">
                            {title}
                        </h1>

                        <div className="prose prose-slate prose-lg max-w-none prose-headings:text-slate-900 prose-p:text-slate-600 prose-strong:text-slate-900 prose-a:text-google-blue">
                            {children}
                        </div>

                        <div className="mt-12 p-8 bg-blue-50 rounded-xl border border-blue-100 text-center">
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">
                                Pronto para se destacar no mercado?
                            </h2>
                            <p className="text-slate-600 mb-8 text-lg">
                                Use nosso gerador inteligente e crie seu CV profissional em Moçambique hoje mesmo.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <Button
                                    size="lg"
                                    className="bg-google-blue hover:bg-blue-600 text-white px-8 h-14 text-lg"
                                    onClick={() => navigate('/criar-cv')}
                                >
                                    <FileText className="mr-2 h-5 w-5" />
                                    Criar meu CV grátis
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="border-google-blue text-google-blue hover:bg-blue-50 h-14 text-lg"
                                    onClick={() => navigate('/exemplos')}
                                >
                                    Ver modelos de CV
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </div>
                        </div>
                    </article>
                </div>
            </main>



            {/* Floating CTA for long content */}
            <div className="fixed bottom-6 right-6 z-50">
                <Button
                    size="lg"
                    className="bg-google-blue hover:bg-blue-600 text-white shadow-2xl rounded-full px-6 py-4 flex items-center gap-2"
                    onClick={() => navigate('/criar-cv')}
                >
                    <FileText className="h-5 w-5" />
                    <span className="hidden sm:inline">Criar CV Agora</span>
                </Button>
            </div>
        </div>
    );
};

export default SEOPage;
