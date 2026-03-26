import React from 'react';
import BlogPost from '@/components/blog/BlogPost';

const LinkedinMoz = () => {
    const content = (
        <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">O Seu Currículo Vivo: LinkedIn</h2>
            <p className="mb-6 text-gray-700 leading-relaxed">
                Se você pensa que o LinkedIn é só para colocar o CV online e esperar, está a perder dinheiro. Em Moçambique, recrutadores da Contact, Elite e de grandes projetos usam o LinkedIn para "caçar" talentos que nem sequer se candidataram.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Foto e Título: A Vitrine</h2>
            <p className="mb-4 text-gray-700">
                Esqueça a foto da festa. Use uma foto com fundo neutro, boa luz e roupas profissionais.
            </p>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h3 className="font-bold text-blue-900 mb-2">A Fórmula do Título Perfeito:</h3>
                <p className="text-blue-800">
                    Não coloque "Em busca de oportunidades". Ninguém pesquisa por isso.
                    <br /><strong>Errado:</strong> Desempregado / À procura de emprego
                    <br /><strong>Certo:</strong> Contabilista Sénior | Especialista em Fiscalidade | OC N.º 1234
                    <br />Use palavras-chave da sua área!
                </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. O Resumo (Sobre) que Vende</h2>
            <p className="mb-4 text-gray-700">
                Conte sua história em 3 parágrafos.
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                <li><strong>Parágrafo 1:</strong> Quem você é e quantos anos de experiência tem.</li>
                <li><strong>Parágrafo 2:</strong> Suas principais conquistas (números, projetos).</li>
                <li><strong>Parágrafo 3:</strong> O que você sabe fazer de melhor (ferramentas, idiomas).</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Networking Moçambicano: Como Fazer</h2>
            <p className="mb-4 text-gray-700">
                Não adicione pessoas e peça emprego na primeira mensagem. Isso é "spam".
            </p>
            <p className="mb-4 text-gray-700">
                <strong>Estratégia correta:</strong>
                <br />1. Conecte-se com profissionais da sua área.
                <br />2. Comente nos posts deles com opiniões inteligentes.
                <br />3. Publique conteúdo próprio (ex: uma foto de um evento que foi, um livro que leu).
                <br />"Quem não é visto, não é lembrado."
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. A Secção de Competências</h2>
            <p className="mb-6 text-gray-700 leading-relaxed">
                Adicione pelo menos 15 competências. Peça aos colegas e ex-chefes para validarem (endorsarem) essas competências. Um perfil com validações tem 10x mais chances de ser visto.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Conclusão</h2>
            <p className="mb-6 text-gray-700 leading-relaxed">
                O LinkedIn é uma maratona, não um sprint. Dedique 15 minutos por dia. Em 3 meses, você terá uma rede poderosa que trabalha por você.
            </p>
        </div>
    );

    const faqs = [
        {
            question: "Preciso pagar o LinkedIn Premium?",
            answer: "Não. Para 99% dos profissionais em Moçambique, a versão gratuita é suficiente se bem usada."
        },
        {
            question: "Devo postar em Inglês ou Português?",
            answer: "Depende do seu objetivo. Se quer vagas em multinacionais, postar em Inglês é um grande diferencial. Se o foco é PMEs locais, Português está ótimo."
        },
        {
            question: "Posso adicionar recrutadores?",
            answer: "Sim, mas envie uma nota personalizada no convite. 'Olá, admiro o trabalho da Contact e gostaria de acompanhar as novidades.' Nunca envie currículo no inbox sem ser solicitado."
        }
    ];

    const relatedPosts = [
        "Empreendedorismo Digital em Moçambique: Começar do Zero",
        "Vagas em Tete e Cabo Delgado: Como preparar seu CV",
        "A importância da foto no currículo moçambicano"
    ];

    return (
        <BlogPost
            title="LinkedIn Moçambique: Como Ser Recrutado Sem Enviar CV"
            metaDescription="Transforme seu perfil do LinkedIn em um ímã de recrutadores. Dicas de foto, título, resumo e networking para o mercado moçambicano."
            author="Equipe MozVita"
            date="2026-02-18"
            readTime="9 min"
            category="Dicas de Carreira"
            content={content}
            faqs={faqs}
            relatedPosts={relatedPosts}
            featuredImage="/blog/linkedin-moz.jpg"
        />
    );
};

export default LinkedinMoz;
