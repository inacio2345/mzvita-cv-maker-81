import React from 'react';
import { Link } from 'react-router-dom';
import BlogPost from '@/components/blog/BlogPost';

const GuiaCV2026 = () => {
    const content = (
        <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Como Fazer um CV em Moçambique em 2026: Guia Completo</h2>
            <p className="mb-6 text-gray-700 leading-relaxed">
                O mercado de trabalho moçambicano está em constante evolução. Para quem deseja saber <strong>como fazer um CV em Moçambique em 2026</strong>, é fundamental entender que as velhas regras de 2020 já não se aplicam. A digitalização, impulsionada pelos grandes projetos de gás e mineração, bem como pela modernização do setor bancário, exige currículos mais tecnológicos e focados em competências específicas.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. A Ascensão do Recrutamento Digital em Moçambique</h2>
            <p className="mb-4 text-gray-700">
                Em 2026, a maioria das grandes empresas em Maputo, Matola e outras capitais provinciais utiliza sistemas de triagem automática (ATS). Isso significa que o seu <strong>cv moçambique</strong> precisa ser otimizado para as máquinas antes mesmo de chegar aos olhos humanos.
            </p>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Otimização para ATS</h3>
            <p className="mb-4 text-gray-700">
                Para garantir que o seu perfil seja selecionado, use palavras-chave que aparecem no anúncio da vaga. No nosso <Link to="/blog/erros-comuns" className="text-blue-600 hover:text-blue-800 underline">post sobre erros comuns</Link>, detalhamos como pequenas falhas de formatação podem fazer o sistema ignorar o seu CV.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Competências Digitais: O Novo Requisito Mínimo</h2>
            <p className="mb-4 text-gray-700">
                Independentemente da sua área (Saúde, Educação ou Engenharia), o domínio de ferramentas de produtividade é agora obrigatório. No seu <strong>cv moçambique</strong> de 2026, você deve destacar:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                <li><strong>Trabalho Remoto:</strong> Experiência com Microsoft Teams, Slack e Zoom.</li>
                <li><strong>IA Generativa:</strong> Como você usa IA para otimizar processos na sua área.</li>
                <li><strong>Cibersegurança Básica:</strong> Conhecimento sobre proteção de dados no ambiente corporativo moçambicano.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. A Importância da Carta de Apresentação Combinada</h2>
            <p className="mb-4 text-gray-700">
                Em 2026, o currículo raramente viaja sozinho. As empresas valorizam candidatos que enviem uma <strong>Carta de Apresentação</strong> personalizada. Veja nossa seção de <Link to="/carta-apresentacao" className="text-blue-600 hover:text-blue-800 underline">modelos de cartas oficiais</Link> para complementar o seu perfil.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Personalização por Setor em 2026</h2>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Setor Extractivo e Energia</h3>
            <p className="mb-4 text-gray-700">
                Com o avanço dos projetos de gás na bacia do Rovuma, perfis técnicos com certificações internacionais de segurança (HSE) e proficiência em Inglês têm prioridade máxima. Saiba mais sobre <Link to="/blog/adaptar-cv-por-area" className="text-blue-600 hover:text-blue-800 underline">como adaptar seu CV por área</Link>.
            </p>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Empreendedorismo e Freelancing</h3>
            <p className="mb-4 text-gray-700">
                Muitos moçambicanos estão optando por carreiras independentes. Se este é o seu caso, seu currículo deve focar em portfólio e depoimentos de clientes, mais do que em anos de casa em uma única empresa.
            </p>

            <div className="bg-google-blue/10 p-8 rounded-2xl my-10 border border-google-blue/20">
                <h4 className="text-lg font-bold text-google-blue mb-3">Dica de Ouro MozVita:</h4>
                <p className="text-google-blue/80 leading-relaxed italic">
                    "Em 2026, a agilidade é tudo. Ter o seu CV pronto em formato PDF e acessível no seu telemóvel para envio imediato via WhatsApp ou e-mail pode ser a diferença entre conseguir a entrevista ou ser deixado para trás."
                </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Sustentabilidade e Responsabilidade Social</h2>
            <p className="mb-6 text-gray-700 leading-relaxed">
                As empresas em Moçambique estão cada vez mais atentas à agenda ESG (Ambiental, Social e Governança). Incluir voluntariado ou participação em projetos comunitários no seu <strong>curriculum vitae moçambique</strong> demonstra que você é um profissional completo e consciente da realidade do país.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Conclusão: Comece Hoje</h2>
            <p className="mb-6 text-gray-700 leading-relaxed">
                Não espere pela vaga dos seus sonhos para atualizar o seu currículo. O mercado de 2026 é rápido e competitivo. Use as nossas ferramentas para criar um <strong>cv moçambique</strong> moderno, limpo e profissional.
            </p>

            <div className="flex justify-center my-10">
                <Link
                    to="/criar-cv"
                    className="bg-google-blue text-white px-8 py-4 rounded-full font-bold shadow-xl hover:shadow-blue-200 transition-all hover:scale-105"
                >
                    Criar meu CV 2026 Agora
                </Link>
            </div>
        </div>
    );

    const faqs = [
        {
            question: "Qual o melhor formato em 2026?",
            answer: "O PDF continua a ser o rei. No entanto, garantir que o texto seja selecionável e legível por ATS é agora obrigatório."
        }
    ];

    return (
        <BlogPost
            title="Como fazer CV em Moçambique em 2026: Novas Regras"
            metaDescription="Guia atualizado para o mercado de trabalho moçambicano em 2026. Saiba o que mudou e como destacar o seu perfil."
            author="Equipe MozVita"
            date="2026-02-14"
            readTime="10 min"
            category="Blog"
            content={content}
            faqs={faqs}
            slug="guia-cv-2026"
            featuredImage="/blog/guia-cv-2026.jpg"
        />
    );
};

export default GuiaCV2026;
