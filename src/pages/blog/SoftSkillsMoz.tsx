import React from 'react';
import BlogPost from '@/components/blog/BlogPost';

const SoftSkillsMoz = () => {
    const content = (
        <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">O Que o Diploma Não Ensina: Soft Skills</h2>
            <p className="mb-6 text-gray-700 leading-relaxed">
                Antigamente, ter licenciatura abria todas as portas em Moçambique. Em 2025, o jogo mudou. Empresas como a Vodacom, Sasol e grandes bancos estão a rejeitar candidatos tecnicamente perfeitos, mas que não sabem comunicar ou resolver conflitos. Vamos falar sobre as competências invisíveis que garantem o emprego.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Comunicação Assertiva (Não é só falar português correto!)</h2>
            <p className="mb-4 text-gray-700">
                Em um ambiente corporativo multicultural, saber expressar ideias sem ser agressivo ou passivo é ouro.
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                <li><strong>Escuta Ativa:</strong> Você ouve para responder ou para entender?</li>
                <li><strong>Clareza no Email:</strong> Escrever emails curtos e diretos é uma habilidade rara.</li>
                <li><strong>Feedback:</strong> Saber receber críticas sem levar para o lado pessoal.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Inteligência Emocional no "Chapa" Lotado</h2>
            <p className="mb-4 text-gray-700">
                Parece brincadeira, mas a resiliência do dia a dia moçambicano é uma soft skill.
            </p>
            <div className="bg-purple-50 p-6 rounded-lg mb-6">
                <h3 className="font-bold text-purple-900 mb-2">Por que as empresas valorizam isso?</h3>
                <p className="text-purple-800">
                    Projetos atrasam, clientes reclamam, a internet falha. Quem mantém a calma e foca na solução (em vez de reclamar) é promovido. A capacidade de navegar em ambientes de pressão é o maior diferencial de um gerente.
                </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Adaptabilidade Digital (Tech-Savviness)</h2>
            <p className="mb-4 text-gray-700">
                Não estamos a falar de programação. Estamos a falar de não ter medo de novas ferramentas.
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                <li>Sabe usar o Teams/Zoom sem travar?</li>
                <li>Usa IA (ChatGPT) para otimizar seu trabalho ou tem medo dela?</li>
                <li>Consegue aprender um sistema novo (ERP) sozinho assistindo tutoriais?</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Ética e Integridade</h2>
            <p className="mb-6 text-gray-700 leading-relaxed">
                Em um mercado onde a confiança é tudo, ser conhecido como alguém "que cumpre o que promete" e não pega atalhos éticos vale mais que um mestrado. A reputação chega antes do currículo.
            </p>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-8">
                <p className="text-green-800 font-medium">
                    Dica Prática: No seu CV MozVita, não liste soft skills como "Sou comunicativo". Prove! Exemplo: "Liderei equipe de 5 pessoas e reduzi conflitos internos através de reuniões quinzenais de feedback."
                </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Conclusão</h2>
            <p className="mb-6 text-gray-700 leading-relaxed">
                Técnica se ensina em 3 meses. Comportamento leva anos para mudar. Comece hoje a observar como você reage aos problemas. É aí que mora a sua empregabilidade.
            </p>
        </div>
    );

    const faqs = [
        {
            question: "Como colocar soft skills no CV?",
            answer: "Evite listas soltas. Tente embuti-las na descrição das suas experiências profissionais, mostrando resultados."
        },
        {
            question: "Posso aprender liderança sem ser chefe?",
            answer: "Sim! Liderar é influenciar. Você pode liderar um projeto da faculdade, um grupo da igreja ou uma iniciativa no bairro."
        },
        {
            question: "Qual a soft skill mais rara em Moçambique?",
            answer: "Pontualidade e compromisso com prazos. Quem entrega no prazo consistentemente destaca-se de 90% dos candidatos."
        }
    ];

    const relatedPosts = [
        "Entrevista de Emprego em Moçambique: Guia Definitivo",
        "Como fazer CV em Moçambique em 2026: Novas Regras",
        "5 erros comuns que você deve evitar no seu CV"
    ];

    return (
        <BlogPost
            title="As 5 Competências (Soft Skills) que Garantem Emprego em 2025"
            metaDescription="Inteligência emocional, comunicação e adaptabilidade: saiba quais são as habilidades comportamentais mais procuradas pelos recrutadores em Moçambique."
            author="Equipe MozVita"
            date="2026-02-18"
            readTime="6 min"
            category="Dicas de Carreira"
            content={content}
            faqs={faqs}
            relatedPosts={relatedPosts}
            featuredImage="/blog/soft-skills-moz.jpg"
        />
    );
};

export default SoftSkillsMoz;
