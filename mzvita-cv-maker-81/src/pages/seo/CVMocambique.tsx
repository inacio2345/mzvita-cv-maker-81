import React from 'react';
import SEOPage from '@/components/layout/SEOPage';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const CVMocambique = () => {
    return (
        <SEOPage
            title="Como Fazer um CV em Moçambique em 2026: Guia Definitivo"
            seoTitle="CV Moçambique: Criar Currículo Profissional Grátis | MozVita"
            description="Saiba tudo sobre como criar um cv moçambique em 2026. Guia completo com dicas de especialistas, modelos profissionais e download em PDF grátis."
            keywords="cv moçambique, criar cv moçambique, curriculum vitae moçambique, cv moçambique pdf, modelo de cv moçambique"
            canonical="/cv-mocambique"
        >
            <section>
                <p>
                    No competitivo mercado de trabalho moçambicano, o seu currículo (CV) é a primeira impressão que os recrutadores terão de si. Quer esteja em Maputo, Beira, Nampula ou em qualquer outra província, saber <strong>como fazer um CV em Moçambique</strong> que se destaque é fundamental para garantir aquela entrevista de emprego tão desejada.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">Por que o CV é Diferente em Moçambique?</h2>
                <p>
                    Embora a estrutura básica de um currículo seja universal, existem particularidades no mercado nacional que não deve ignorar. Em Moçambique, a clareza, a honestidade e a inclusão de certas informações (como a posse de carta de condução ou o domínio de línguas locais além do Português e Inglês) podem ser diferenciais decisivos.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">Estrutura Essencial de um CV Profissional</h2>
                <p>
                    Para garantir que o seu CV cumpre os requisitos mínimos de profissionalismo, siga esta estrutura lógica:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Informações de Contacto:</strong> Nome completo, telefone, e-mail profissional e morada simplificada.</li>
                    <li><strong>Perfil Profissional:</strong> Um resumo de 3 a 4 linhas sobre quem é o que procura.</li>
                    <li><strong>Experiência Profissional:</strong> Da mais recente para a mais antiga (ordem cronológica inversa).</li>
                    <li><strong>Formação Académica:</strong> Indique a instituição, o curso e o ano de conclusão.</li>
                    <li><strong>Habilidades e Competências:</strong> Ferramentas digitais, soft skills e habilidades técnicas.</li>
                    <li><strong>Referências:</strong> Opcional, mas muito valorizado por empresas moçambicanas.</li>
                </ul>

                <h2 className="text-2xl font-bold mt-8 mb-4">O que os Recrutadores Moçambicanos Procuram?</h2>
                <p>
                    Ao analisar milhares de currículos em Moçambique, percebemos que o foco principal das empresas está na adaptabilidade e no compromisso. Se você está à procura de <em>modelos de cv moçambique</em>, certifique-se de que o design não ofusca o conteúdo. A legibilidade é rainha.
                </p>
                <p>
                    Muitos candidatos cometem o erro de colocar informações irrelevantes ou demasiado pessoais. Evite colocar o número do seu BI, o seu estado civil ou religião, a menos que seja especificamente solicitado pela vaga. No MozVita, os nossos modelos são desenhados para filtrar o que é essencial.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">FAQ: Dúvidas Comuns sobre CV em Moçambique</h2>
                <div className="mt-6">
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Devo colocar foto no meu CV?</AccordionTrigger>
                            <AccordionContent>
                                Em Moçambique, a foto ainda é muito solicitada em áreas de atendimento ao público e serviços. No entanto, em áreas técnicas ou corporativas, a tendência é para o "neutral design". No MozVita, oferecemos ambas as opções.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>Qual é o tamanho ideal do currículo?</AccordionTrigger>
                            <AccordionContent>
                                O ideal é manter-se entre 1 a 2 páginas. Recrutadores gastam em média 6 segundos na primeira leitura de um CV. Se for longo demais, informação importante pode ser perdida.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>Como enviar o CV para empresas?</AccordionTrigger>
                            <AccordionContent>
                                Sempre envie em formato PDF. Isto garante que a formatação não se altere, independentemente de a empresa abrir o ficheiro num computador ou telemóvel.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>

                <h2 className="text-2xl font-bold mt-8 mb-4">Conclusão</h2>
                <p>
                    Criar um <strong>cv moçambique pdf</strong> profissional nunca foi tão fácil com as ferramentas certas. O MozVita nasceu para colmatar a falha de ferramentas adaptadas à nossa realidade, oferecendo designs modernos que respeitam as normas do mercado nacional. Comece hoje mesmo a construir a sua carreira de sucesso.
                </p>
            </section>
        </SEOPage>
    );
};

export default CVMocambique;
