import React from 'react';
import BlogPost from '@/components/blog/BlogPost';

const EntrevistaEmpregoMoz = () => {
    const content = (
        <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">A Hora da Verdade: Vencendo a Entrevista</h2>
            <p className="mb-6 text-gray-700 leading-relaxed">
                Você enviou seu CV criado no MozVita e foi chamado! Parabéns. Agora começa a fase mais crítica. Em Moçambique, as entrevistas variam de conversas informais a painéis rigorosos com psicotécnicos. Este guia vai te preparar para o que der e vier.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Pesquisa: O Dever de Casa</h2>
            <p className="mb-4 text-gray-700">
                Chegar na entrevista sem saber o que a empresa faz é um erro fatal.
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                <li>Visite o site e redes sociais da empresa.</li>
                <li>Entenda o produto/serviço e quem são os clientes.</li>
                <li>Descubra a cultura: É formal (Banca, Governo)? É despojada (Startups, Agências)?</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Perguntas Clássicas (e como responder)</h2>

            <h3 className="text-xl font-semibold text-gray-900 mb-2">"Fale-me sobre si."</h3>
            <p className="mb-4 text-gray-700">
                Não conte sua história de vida desde o berçário. Resuma: Formação + Experiência Relevante + Por que está ali. Exemplo: "Sou contabilista com 5 anos de experiência em PME, focado em auditoria, e procuro novos desafios em grandes empresas como a vossa."
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-2">"Quais são os seus pontos fracos?"</h3>
            <p className="mb-4 text-gray-700">
                Fugir do clichê "sou perfeccionista". Seja honesto mas estratégico. Diga algo real e como está a melhorar. Exemplo: "Tenho dificuldade em falar em público, por isso estou a fazer um curso de oratória."
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-2">"Qual a sua pretensão salarial?"</h3>
            <p className="mb-4 text-gray-700">
                Pesquise a média salarial da função em Moçambique antes de ir. Dê uma faixa salarial, não um valor fixo. "Com base na minha experiência, busco entre 25 a 30 mil meticais."
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. A Etiqueta da Entrevista em Moçambique</h2>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                <li><strong>Pontualidade:</strong> Maputo tem trânsito. Saia cedo. Chegar atrasado é quase imperdoável.</li>
                <li><strong>Apresentação:</strong> Na dúvida, vá formal. Camisa e calça social funcionam sempre.</li>
                <li><strong>Linguagem Corporal:</strong> Cumprimente com firmeza, mantenha contato visual, não cruze os braços.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Perguntas para Fazer ao Recrutador</h2>
            <p className="mb-6 text-gray-700 md:text-lg">
                No final, quando perguntarem "Tem alguma dúvida?", nunca diga não. Pergunte:
                <br />- "Como é um dia típico nesta função?"
                <br />- "Quais são os maiores desafios da equipa agora?"
                <br />Isso demonstra interesse genuíno.
            </p>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-8">
                <p className="text-green-800 font-medium">
                    Dica Extra: Entrevistas Online (Zoom/Teams) exigem preparação técnica. Teste sua internet (Movitel/Vodacom) e procure um lugar silencioso 15 minutos antes.
                </p>
            </div>
        </div>
    );

    const faqs = [
        {
            question: "Devo levar meu CV impresso?",
            answer: "Sim! Mesmo que já tenha enviado por email. Leve 2 cópias em uma pasta limpa. Mostra organização."
        },
        {
            question: "Como lidar com o nervosismo?",
            answer: "Respire fundo. Lembre-se que a entrevista é uma conversa entre dois profissionais, não um interrogatório policial. Prepare-se bem e a confiança virá."
        },
        {
            question: "Quanto tempo demora o feedback?",
            answer: "Pode variar de 1 semana a 1 mês. Se passar 10 dias, é aceitável enviar um email educado perguntando sobre o status do processo."
        }
    ];

    const relatedPosts = [
        "5 erros comuns que você deve evitar no seu CV",
        "Primeiro emprego: como montar um CV sem experiência",
        "A importância da foto no currículo moçambicano"
    ];

    return (
        <BlogPost
            title="Entrevista de Emprego em Moçambique: Guia Definitivo"
            metaDescription="Saiba como se comportar, o que vestir e como responder às perguntas mais difíceis nas entrevistas de emprego em Moçambique."
            author="Equipe MozVita"
            date="2026-02-17"
            readTime="8 min"
            category="Dicas de Carreira"
            content={content}
            faqs={faqs}
            relatedPosts={relatedPosts}
            featuredImage="/blog/entrevista-emprego.jpg"
        />
    );
};

export default EntrevistaEmpregoMoz;
