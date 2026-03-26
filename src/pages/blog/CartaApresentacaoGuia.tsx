import React from 'react';
import BlogPost from '@/components/blog/BlogPost';

const CartaApresentacaoGuia = () => {
    const content = (
        <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">A Carta que Abre Portas (Sim, ela ainda importa!)</h2>
            <p className="mb-6 text-gray-700 leading-relaxed">
                Muitos candidatos perguntam: "Ninguém lê carta de apresentação, certo?". Errado. Em processos seletivos competitivos, onde 50 candidatos têm o mesmo curso e experiência, a carta é o desempate. Ela mostra sua escrita, sua paixão e sua pesquisa sobre a empresa.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. A Estrutura Vencedora</h2>
            <p className="mb-4 text-gray-700">
                Não escreva um testamento. Mantenha em 3 a 4 parágrafos curtos.
            </p>

            <div className="bg-gray-50 p-6 rounded-lg mb-6 border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-3">Modelo para Copiar (Adapte sempre!):</h3>
                <p className="text-gray-700 italic text-sm">
                    "Prezado(a) Gestor de RH [ou nome se souber],<br /><br />
                    Com 5 anos de experiência em gestão de frotas e um histórico comprovado de redução de custos em 15% na [Empresa Anterior], escrevo para demonstrar meu forte interesse na vaga de Supervisor Logístico na [Nome da Empresa].<br /><br />
                    Acompanho a expansão da [Nome da Empresa] na província de Sofala e admiro o vosso compromisso com a segurança. Acredito que minha certificação em HSE e minha liderança em equipas multiculturais podem agregar valor imediato às vossas operações.<br /><br />
                    Estou disponível para uma entrevista e anexo meu CV para detalhar minhas qualificações.<br /><br />
                    Atenciosamente,<br />
                    [Seu Nome]"
                </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Erros que "Queimam" o Candidato</h2>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                <li><strong>"A quem possa interessar":</strong> Mostra preguiça. Tente descobrir o nome do recrutador ou use "À Equipa de Recrutamento".</li>
                <li><strong>Repetir o CV:</strong> A carta não é para listar onde trabalhou (isso está no CV). É para dizer COMO você vai ajudar a empresa.</li>
                <li><strong>Erros de Português:</strong> Uma carta com erros gramaticais garante eliminação imediata. Revise 3 vezes.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. E se a vaga não pedir carta?</h2>
            <p className="mb-6 text-gray-700 leading-relaxed">
                Envie mesmo assim. Se for por email, o corpo do email É a sua carta de apresentação. Se for upload em portal, anexe se houver espaço. Isso demonstra proatividade ("vestir a camisola" antes mesmo de entrar).
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Conclusão</h2>
            <p className="mb-6 text-gray-700 leading-relaxed">
                Use a ferramenta de "Cartas Oficiais" do MozVita para gerar modelos profissionais em segundos, mas nunca esqueça de personalizar o texto para a vaga específica.
            </p>
        </div>
    );

    const faqs = [
        {
            question: "Posso usar a mesma carta para todas as vagas?",
            answer: "Definitivamente não. Recrutadores percebem 'copia e cola' a quilômetros. Altere pelo menos o nome da empresa e o motivo do interesse."
        },
        {
            question: "Qual o tamanho ideal?",
            answer: "Meia página A4. Cerca de 200 a 300 palavras. Ninguém tem tempo para ler biografias."
        },
        {
            question: "Mando no corpo do email ou em anexo?",
            answer: "Se enviar currículo por email, coloque o texto no corpo do email. O anexo deve ser apenas o CV (e a carta em PDF se explicitamente pedido)."
        }
    ];

    const relatedPosts = [
        "Como fazer CV em Moçambique em 2026: Novas Regras",
        "Modelos de Carta de Apresentação",
        "Entrevista de Emprego em Moçambique: Guia Definitivo"
    ];

    return (
        <BlogPost
            title="Carta de Apresentação Irresistível: Modelo para Moçambique"
            metaDescription="Aprenda a escrever uma carta de apresentação que convence recrutadores. Modelos prontos, o que escrever e erros a evitar."
            author="Equipe MozVita"
            date="2026-02-18"
            readTime="5 min"
            category="Dicas de CV"
            content={content}
            faqs={faqs}
            relatedPosts={relatedPosts}
            featuredImage="/blog/carta-apresentacao-guia.jpg"
        />
    );
};

export default CartaApresentacaoGuia;
