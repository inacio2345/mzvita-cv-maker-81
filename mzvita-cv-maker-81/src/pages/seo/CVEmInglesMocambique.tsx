import React from 'react';
import SEOPage from '@/components/layout/SEOPage';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const CVEmInglesMocambique = () => {
    return (
        <SEOPage
            title="CV em Inglês Moçambique: Guia para Empresas Internacionais"
            seoTitle="CV em Inglês Moçambique | Como fazer um Resume Profissional"
            description="Precisa de um CV em Inglês em Moçambique? Aprenda a traduzir sua experiência e termos técnicos para o mercado internacional e multinacionais de Oil & Gas."
            keywords="cv em inglês moçambique, english resume mozambique, currículo em inglês, traduções cv moçambique"
            canonical="/cv-em-ingles-mocambique"
        >
            <section>
                <p>
                    Com o crescimento dos grandes projetos de gás em Cabo Delgado e a presença de multinacionais em Maputo, saber fazer um <strong>cv em inglês moçambique</strong> tornou-se uma habilidade de ouro. Muitas empresas exigem o "Resume" ou "CV" em inglês para processos de seleção internacionais.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">Termos Técnicos Essenciais (Resume Vocabulary)</h2>
                <p>
                    Ao traduzir o seu currículo, evite o tradutor literal. Use termos que os recrutadores internacionais reconhecem:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Work Experience:</strong> Experiência Profissional.</li>
                    <li><strong>Education / Academic Background:</strong> Formação Académica.</li>
                    <li><strong>Hard Skills / Technical Skills:</strong> Competências Técnicas.</li>
                    <li><strong>Soft Skills:</strong> Habilidades Interpessoais.</li>
                    <li><strong>References available upon request:</strong> Referências sob pedido.</li>
                </ul>

                <h2 className="text-2xl font-bold mt-8 mb-4">Diferenças entre o CV Português e Inglês</h2>
                <p>
                    O <em>english resume mozambique</em> tende a ser ainda mais direto ao ponto (concise). Enquanto em Moçambique somos detalhistas, currículos em inglês para multinacionais devem focar fortemente em resultados quantificáveis. Exemplos: "Increased sales by 20%" em vez de apenas "Managed sales".
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">MozVita e o Currículo Bilingue</h2>
                <p>
                    No MozVita, oferecemos modelos que permitem introduzir o seu conteúdo em qualquer língua. Se o seu objetivo é uma multinacional de Oil & Gas ou uma ONG internacional (como as agências da ONU), escolha um dos nossos designs modernos e use o guia de termos acima para preencher.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">FAQ: Currículos em Inglês</h2>
                <div className="mt-6">
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Devo enviar o CV em Português e Inglês?</AccordionTrigger>
                            <AccordionContent>
                                A menos que o anúncio especifique o contrário, envie apenas na língua em que a vaga foi publicada. Se a vaga está em inglês, responda com um currículo em inglês.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </section>
        </SEOPage>
    );
};

export default CVEmInglesMocambique;
