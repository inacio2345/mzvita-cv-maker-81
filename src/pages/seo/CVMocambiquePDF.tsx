import React from 'react';
import SEOPage from '@/components/layout/SEOPage';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const CVMocambiquePDF = () => {
    return (
        <SEOPage
            title="CV Moçambique PDF: Por que usar este formato?"
            seoTitle="CV Moçambique PDF | Gerar e Baixar Currículo Grátis"
            description="Gere seu cv moçambique em PDF de forma instantânea. Descubra os benefícios do formato cv moçambique pdf para candidaturas de emprego em Moçambique."
            keywords="cv moçambique pdf, cv moçambique, modelo de cv moçambique, baixar cv moçambique"
            canonical="/cv-mocambique-pdf"
        >
            <section>
                <p>
                    Quando se trata de candidaturas online, o formato do ficheiro que envia é crucial. O <strong>cv moçambique pdf</strong> tornou-se o padrão da indústria por vários motivos técnicos e práticos que garantem que a sua candidatura seja bem-sucedida.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">Vantagens do Formato PDF</h2>
                <p>
                    Diferente do Word (.doc ou .docx), o PDF (Portable Document Format) oferece:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Integridade Visual:</strong> O layout nunca se quebra. Se você colocou uma barra lateral ou uma foto, ela aparecerá exatamente no mesmo sítio no computador do recrutador.</li>
                    <li><strong>Segurança:</strong> É mais difícil alterar o conteúdo de um PDF por acidente, mantendo os seus dados protegidos.</li>
                    <li><strong>Universalidade:</strong> Pode ser aberto em smartphones, tablets e qualquer sistema operativo sem precisar de software pago.</li>
                </ul>

                <h2 className="text-2xl font-bold mt-8 mb-4">Como o MozVita Otimiza o seu PDF</h2>
                <p>
                    O nosso gerador automático de <em>currículo pdf moçambique</em> não cria apenas um ficheiro. Ele otimiza o tamanho do arquivo para que seja leve o suficiente para ser enviado por e-mail ou WhatsApp, mas com qualidade suficiente para ser impresso em alta resolução em qualquer tipografia de Maputo.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">Dicas para Salvar o seu CV</h2>
                <p>
                    Nomeie o seu ficheiro corretamente. Em vez de "cv_final.pdf", use "CV_TeuNome_Posicao.pdf". Isso ajuda o recrutador a encontrar o seu ficheiro rapidamente na pasta de downloads.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">FAQ: Exportação para PDF</h2>
                <div className="mt-6">
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>O documento PDF é editável?</AccordionTrigger>
                            <AccordionContent>
                                Depois de baixado, o PDF não é facilmente editável manualmente. Deve sempre voltar ao site MozVita para fazer alterações e gerar uma nova versão atualizada.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>O PDF funciona no WhatsApp?</AccordionTrigger>
                            <AccordionContent>
                                Sim! Em Moçambique, candidaturas via WhatsApp são comuns. O PDF gerado é leve e perfeito para carregar mesmo em conexões de internet lentas.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </section>
        </SEOPage>
    );
};

export default CVMocambiquePDF;
