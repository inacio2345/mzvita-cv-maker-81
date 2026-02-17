import React from 'react';
import SEOPage from '@/components/layout/SEOPage';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const ExemplosCVMocambique = () => {
    return (
        <SEOPage
            title="Exemplos de CV Moçambique por Área Profissional"
            seoTitle="Exemplos CV Moçambique | Casos Reais por Setor em Moçambique"
            description="Veja exemplos cv moçambique para professores, motoristas, enfermeiros e mais. Aprenda o que destacar em cada profissão no mercado de trabalho moçambicano."
            keywords="exemplos cv moçambique, cv moçambique, modelo de cv moçambique, cv moçambique pdf"
            canonical="/exemplos-cv-mocambique"
        >
            <section>
                <p>
                    Muitas vezes, a maior dificuldade não é o design, mas o que escrever. Ver <strong>exemplos de cv moçambique</strong> reais pode dar a inspiração necessária para descrever as suas competências de forma mais impactante para o mercado nacional.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">Exemplos por Profissão em Moçambique</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="bg-white border rounded-lg p-6 shadow-sm">
                        <h3 className="text-xl font-bold mb-3">Enfermagem e Saúde</h3>
                        <p className="text-sm text-slate-600">Destaque certificações do MISAU, experiência em centros de saúde comunitários e gestão de stocks médicos.</p>
                    </div>
                    <div className="bg-white border rounded-lg p-6 shadow-sm">
                        <h3 className="text-xl font-bold mb-3">Educação (Professores)</h3>
                        <p className="text-sm text-slate-600">Destaque o nível pedagógico, anos de serviço no sistema nacional de ensino e metodologias de ensino ativo.</p>
                    </div>
                    <div className="bg-white border rounded-lg p-6 shadow-sm">
                        <h3 className="text-xl font-bold mb-3">Motoristas</h3>
                        <p className="text-sm text-slate-600">Destaque o tipo de carta de condução (P, C, C1), experiência em rotas inter-provinciais e conhecimento mecânico básico.</p>
                    </div>
                    <div className="bg-white border rounded-lg p-6 shadow-sm">
                        <h3 className="text-xl font-bold mb-3">Administração e Logística</h3>
                        <p className="text-sm text-slate-600">Destaque o domínio de software de faturação, gestão de armazéns e competências em Inglês para negócios.</p>
                    </div>
                </div>

                <h2 className="text-2xl font-bold mt-12 mb-4">Como Adaptar um Exemplo para o seu Perfil</h2>
                <p>
                    Nunca copie um exemplo fielmente. O segredo de um bom <em>exemplos de currículo moçambique</em> é a personalização. Use as palavras-chave que as empresas moçambicanas usam nos seus anúncios de emprego (links como o emprego.co.mz são ótimas fontes para encontrar estas palavras).
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">FAQ: Inspiração e Exemplos</h2>
                <div className="mt-6">
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Posso usar frases prontas no meu perfil?</AccordionTrigger>
                            <AccordionContent>
                                Sim, desde que as adapte. Frases como "Profissional dinâmico e proativo" são clichês. Tente ser mais específico: "Especialista em vendas com 5 anos de experiência no mercado de retalho em Maputo".
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </section>
        </SEOPage>
    );
};

export default ExemplosCVMocambique;
