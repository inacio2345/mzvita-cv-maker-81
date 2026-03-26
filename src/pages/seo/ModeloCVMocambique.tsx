import React from 'react';
import SEOPage from '@/components/layout/SEOPage';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const ModeloCVMocambique = () => {
    return (
        <SEOPage
            title="Modelo de CV Moçambique: Melhores Designs para 2026"
            seoTitle="Modelo de CV Moçambique | Designs Profissionais para Baixar"
            description="Encontre o melhor modelo de cv moçambique adaptado ao seu setor em Moçambique. Designs modernos, clássicos e criativos prontos para baixar em PDF."
            keywords="modelo de cv moçambique, cv moçambique, cv moçambique pdf, exemplos cv moçambique"
            canonical="/modelo-cv-mocambique"
        >
            <section>
                <p>
                    Escolher o <strong>modelo de CV moçambique</strong> correto é metade do caminho para conseguir um emprego. O design fala antes mesmo de o recrutador ler a primeira palavra. Se o layout for confuso, a sua experiência pode nem sequer ser lida.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">Tipos de Modelos de CV Mais Usados</h2>
                <p>
                    Dependendo da sua área de atuação, o seu "template" deve variar:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Modelo Clássico:</strong> Ideal para áreas como Direito, Contabilidade e Administração Pública. Foca na sobriedade.</li>
                    <li><strong>Modelo Moderno:</strong> Perfeito para Tecnologia, Marketing e Vendas. Usa cores subtis e uma estrutura de duas colunas.</li>
                    <li><strong>Modelo Criativo:</strong> Para Designers, Arquitetos e Publicitários. Permite mais liberdade visual.</li>
                </ul>

                <h2 className="text-2xl font-bold mt-8 mb-4">Como Escolher o Modelo Certo?</h2>
                <p>
                    Ao procurar por um <em>modelo de currículo moçambique</em>, pergunte-se: "Este design representa a cultura da empresa onde quero trabalhar?". Se a empresa for uma multinacional em Moçambique, um design moderno e limpo é geralmente a melhor aposta. Se for uma instituição governamental, o clássico Times New Roman ou Arial ainda é o padrão ouro.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">Dicas de Formatação no MozVita</h2>
                <p>
                    Os nossos modelos seguem as melhores práticas globais de UX (User Experience). Isto significa que:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>As margens são otimizadas para não cortar informações na impressão.</li>
                    <li>As fontes são seguras para todos os dispositivos.</li>
                    <li>Existe um equilíbrio perfeito entre espaços em branco e texto.</li>
                </ul>

                <h2 className="text-2xl font-bold mt-8 mb-4">FAQ sobre Modelos de CV</h2>
                <div className="mt-6">
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Posso mudar as cores do modelo?</AccordionTrigger>
                            <AccordionContent>
                                Sim, no nosso gerador pode personalizar as cores principais para que o CV reflita a sua personalidade profissional ou a marca da empresa desejada.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>Os modelos são compatíveis com sistemas ATS?</AccordionTrigger>
                            <AccordionContent>
                                Sim! Os nossos modelos de CV em Moçambique são construídos para serem lidos por softwares de recrutamento automático (ATS) usados por grandes empresas.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </section>
        </SEOPage>
    );
};

export default ModeloCVMocambique;
