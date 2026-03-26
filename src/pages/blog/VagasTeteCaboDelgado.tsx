import React from 'react';
import BlogPost from '@/components/blog/BlogPost';

const VagasTeteCaboDelgado = () => {
    const content = (
        <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">O Novo Ciclo de Oportunidades: Gás e Mineração</h2>
            <p className="mb-6 text-gray-700 leading-relaxed">
                Com a retomada dos megaprojetos na bacia do Rovuma e a expansão das minas em Moatize, as províncias de Tete e Cabo Delgado voltaram a ser o epicentro do emprego industrial em Moçambique. Mas atenção: as regras de contratação mudaram. As multinacionais agora exigem não apenas técnicos, mas especialistas certificados e com soft skills apuradas.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Perfis Mais Procurados em 2024/2025</h2>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                <li><strong>HSE (Higiene, Saúde e Segurança):</strong> Obrigatório para qualquer função de campo. Certificações NEBOSH são o padrão ouro.</li>
                <li><strong>Logística e Supply Chain:</strong> Especialistas em mover cargas complexas em terrenos difíceis.</li>
                <li><strong>Engenheiros Mecânicos e Elétricos:</strong> Com foco em manutenção preventiva de maquinário pesado.</li>
                <li><strong>Recursos Humanos e Adm:</strong> Para gerir as centenas de contratações locais (Conteúdo Local).</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Como Estruturar o CV para Estes Projetos</h2>
            <p className="mb-4 text-gray-700">
                Recrutadores destas áreas recebem milhares de CVs. O seu precisa passar pelo "filtro de 6 segundos".
            </p>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h3 className="font-bold text-blue-900 mb-2">Checklist do CV Industrial:</h3>
                <ul className="list-check space-y-2 text-blue-800">
                    <li>✅ Destaque as certificações técnicas no topo.</li>
                    <li>✅ Mencione projetos específicos (ex: "Atuei na construção da planta X").</li>
                    <li>✅ Use palavras-chave como "Zero Harm", "Compliance" e "ISO 9001".</li>
                    <li>✅ Se tiver experiência local, cite as comunidades onde trabalhou.</li>
                </ul>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Onde Encontrar as Vagas?</h2>
            <p className="mb-4 text-gray-700">
                Muitas vagas não chegam aos jornais. Elas circulam em:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                <li><strong>Portais das Empresas:</strong> TotalEnergies, Vale (Vulcan), Kenmare têm páginas de carreiras próprias.</li>
                <li><strong>Agências de Recrutamento Especializadas:</strong> Contact, Elite, 121 HR Solutions.</li>
                <li><strong>LinkedIn:</strong> Siga os gestores de RH destas empresas, não apenas as páginas corporativas.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Dica de Ouro: Mobilidade e Idiomas</h2>
            <p className="mb-6 text-gray-700 leading-relaxed">
                Disponibilidade para viver em acampamentos (camps) e escalas rotativas (28/28 ou 21/7) é essencial. Além disso, o Inglês é a língua oficial de operação em quase todos os megaprojetos. Se o seu inglês é básico, invista nisso antes de uma pós-graduação.
            </p>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
                <p className="text-yellow-800 font-medium">
                    Dica MozVita: Tenha sempre uma versão do seu CV em Inglês pronta. Muitas vezes o gestor da vaga é expatriado e não fala português.
                </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Conclusão</h2>
            <p className="mb-6 text-gray-700 leading-relaxed">
                Trabalhar em Tete ou Cabo Delgado pode mudar sua vida financeira e profissional. Prepare seu CV com foco técnico, segurança e clareza. Use nossos modelos para garantir que a formatação não seja um problema.
            </p>
        </div>
    );

    const faqs = [
        {
            question: "Preciso pagar para me candidatar a vagas de Minas?",
            answer: "NUNCA. Multinacionais e agências sérias jamais cobram valores dos candidatos. Se pedirem dinheiro para 'processo', é burla."
        },
        {
            question: "O que é a Lei do Conteúdo Local?",
            answer: "É a legislação que obriga grandes projetos a contratar mão-de-obra e serviços moçambicanos. Use isso a seu favor, destacando sua nacionalidade e residência."
        },
        {
            question: "Vale a pena ir para Pemba ou Tete sem emprego garantido?",
            answer: "Não recomendamos. O custo de vida nessas cidades é alto. O ideal é aplicar online e só viajar para entrevistas confirmadas ou com suporte financeiro."
        }
    ];

    const relatedPosts = [
        "Como fazer CV em Moçambique em 2026: Novas Regras",
        "CV para Motorista em Moçambique: Guia Prático",
        "Como criar um CV profissional em Moçambique"
    ];

    return (
        <BlogPost
            title="Vagas em Tete e Cabo Delgado: Como preparar seu CV para a Indústria"
            metaDescription="Guia completo para conseguir emprego nos megaprojetos de gás e mineração em Moçambique. Dicas de CV, perfis procurados e onde achar vagas."
            author="Equipe MozVita"
            date="2026-02-18"
            readTime="7 min"
            category="Setores"
            content={content}
            faqs={faqs}
            relatedPosts={relatedPosts}
            featuredImage="/blog/vagas-tete-cabo-delgado.jpg"
        />
    );
};

export default VagasTeteCaboDelgado;
