
import React from 'react';
import BlogPost from '@/components/blog/BlogPost';

const TendenciasMercado2024 = () => {
  const content = (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Introdução</h2>
      <p className="mb-6 text-gray-700 leading-relaxed">
        O mercado de trabalho em Moçambique 2024 apresenta novas oportunidades e desafios únicos. Com o crescimento econômico do país e a expansão de diversos setores, compreender as tendências atuais é fundamental para profissionais que buscam se posicionar estrategicamente no mercado. Este guia analisa as principais tendências, profissões em alta e competências mais valorizadas pelos empregadores moçambicanos.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Setores em Crescimento em Moçambique</h2>
      <p className="mb-4 text-gray-700">
        O mercado de trabalho moçambicano está passando por uma transformação significativa em 2024, com alguns setores apresentando crescimento acelerado:
      </p>

      <h3 className="text-xl font-semibold text-gray-900 mb-3">Energia e Recursos Naturais</h3>
      <p className="mb-4 text-gray-700">
        Com os projetos de gás natural em Cabo Delgado e a expansão do setor energético, há alta demanda por:
      </p>
      <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
        <li>Engenheiros petroquímicos e de processos</li>
        <li>Técnicos em segurança industrial</li>
        <li>Especialistas em meio ambiente</li>
        <li>Operadores de equipamentos especializados</li>
        <li>Gestores de projetos internacionais</li>
      </ul>

      <h3 className="text-xl font-semibold text-gray-900 mb-3">Tecnologia e Telecomunicações</h3>
      <p className="mb-4 text-gray-700">
        A digitalização crescente criou oportunidades em:
      </p>
      <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
        <li>Desenvolvimento de software e aplicações</li>
        <li>Suporte técnico e helpdesk</li>
        <li>Marketing digital e e-commerce</li>
        <li>Administração de redes e sistemas</li>
        <li>Análise de dados e business intelligence</li>
      </ul>

      <h3 className="text-xl font-semibold text-gray-900 mb-3">Construção Civil e Infraestrutura</h3>
      <p className="mb-4 text-gray-700">
        Os grandes projetos de infraestrutura mantêm a demanda por:
      </p>
      <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
        <li>Pedreiros e carpinteiros especializados</li>
        <li>Engenheiros civis e arquitetos</li>
        <li>Mestres de obras e supervisores</li>
        <li>Operadores de máquinas pesadas</li>
        <li>Técnicos em segurança do trabalho</li>
      </ul>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Profissões Mais Procuradas em 2024</h2>
      <p className="mb-4 text-gray-700">
        Baseado em dados de recrutamento e anúncios de emprego, as profissões com maior demanda incluem:
      </p>

      <h3 className="text-xl font-semibold text-gray-900 mb-3">Top 10 Profissões em Moçambique</h3>
      <ol className="list-decimal pl-6 mb-6 text-gray-700 space-y-2">
        <li><strong>Enfermeiros e técnicos de saúde</strong> - Sistema de saúde em expansão</li>
        <li><strong>Professores (todos os níveis)</strong> - Crescimento do setor educacional</li>
        <li><strong>Vendedores e representantes comerciais</strong> - Expansão do comércio</li>
        <li><strong>Técnicos em informática</strong> - Digitalização das empresas</li>
        <li><strong>Motoristas profissionais</strong> - Crescimento do transporte e logística</li>
        <li><strong>Seguranças e vigilantes</strong> - Aumento da demanda por segurança</li>
        <li><strong>Cozinheiros e chefs</strong> - Expansão do setor gastronômico</li>
        <li><strong>Contabilistas e auxiliares financeiros</strong> - Formalização das empresas</li>
        <li><strong>Técnicos agrícolas</strong> - Modernização da agricultura</li>
        <li><strong>Operadores de call center</strong> - Crescimento dos serviços de atendimento</li>
      </ol>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Competências Mais Valorizadas</h2>
      <p className="mb-4 text-gray-700">
        O mercado de trabalho moçambicano valoriza cada vez mais competências específicas:
      </p>

      <h3 className="text-xl font-semibold text-gray-900 mb-3">Competências Técnicas (Hard Skills)</h3>
      <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
        <li>Domínio de português e inglês (essencial)</li>
        <li>Conhecimentos básicos de informática</li>
        <li>Certificações profissionais específicas</li>
        <li>Experiência com ferramentas digitais</li>
        <li>Conhecimento das línguas locais (diferencial)</li>
      </ul>

      <h3 className="text-xl font-semibold text-gray-900 mb-3">Competências Comportamentais (Soft Skills)</h3>
      <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
        <li>Adaptabilidade e flexibilidade</li>
        <li>Trabalho em equipe multicultural</li>
        <li>Comunicação eficaz</li>
        <li>Resolução de problemas</li>
        <li>Responsabilidade e pontualidade</li>
      </ul>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Salários e Benefícios Esperados</h2>
      <p className="mb-4 text-gray-700">
        Os salários em Moçambique variam significativamente por setor e experiência:
      </p>

      <h3 className="text-xl font-semibold text-gray-900 mb-3">Faixas Salariais por Categoria</h3>
      <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
        <li><strong>Iniciante (0-2 anos):</strong> 8.000 - 15.000 MT</li>
        <li><strong>Nível médio (3-5 anos):</strong> 15.000 - 30.000 MT</li>
        <li><strong>Sênior (5+ anos):</strong> 30.000 - 60.000 MT</li>
        <li><strong>Gestão/Especialista:</strong> 60.000+ MT</li>
      </ul>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Dicas para se Destacar no Mercado</h2>
      <p className="mb-4 text-gray-700">
        Para aproveitar as oportunidades do mercado moçambicano em 2024:
      </p>
      <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
        <li>Invista em capacitação contínua</li>
        <li>Desenvolva habilidades digitais básicas</li>
        <li>Construa uma rede de contactos profissionais</li>
        <li>Mantenha seu CV sempre atualizado</li>
        <li>Mostre flexibilidade para trabalhar em diferentes regiões</li>
        <li>Valorize experiências de voluntariado</li>
      </ul>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Desafios e Oportunidades</h2>
      <p className="mb-4 text-gray-700">
        O mercado apresenta tanto desafios quanto oportunidades únicas:
      </p>

      <h3 className="text-xl font-semibold text-gray-900 mb-3">Principais Desafios</h3>
      <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
        <li>Competição acirrada em algumas áreas</li>
        <li>Necessidade de qualificação específica</li>
        <li>Localização geográfica das oportunidades</li>
      </ul>

      <h3 className="text-xl font-semibold text-gray-900 mb-3">Grandes Oportunidades</h3>
      <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
        <li>Projetos de desenvolvimento internacional</li>
        <li>Crescimento do empreendedorismo</li>
        <li>Expansão do setor de serviços</li>
        <li>Investimentos estrangeiros crescentes</li>
      </ul>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">Conclusão</h2>
      <p className="mb-6 text-gray-700 leading-relaxed">
        O mercado de trabalho em Moçambique 2024 oferece oportunidades diversificadas para profissionais preparados. O sucesso depende de manter-se atualizado com as tendências, desenvolver as competências certas e apresentar-se profissionalmente. Um CV bem elaborado é o primeiro passo para aproveitar essas oportunidades emergentes.
      </p>
    </div>
  );

  const faqs = [
    {
      question: "Quais são os setores com mais oportunidades em Moçambique em 2024?",
      answer: "Os setores em maior crescimento são: energia e recursos naturais (devido aos projetos de gás), tecnologia e telecomunicações, construção civil, saúde e educação."
    },
    {
      question: "Que salário posso esperar como profissional iniciante?",
      answer: "Profissionais iniciantes podem esperar salários entre 8.000 a 15.000 MT, dependendo da área e localização. Setores como tecnologia e energia tendem a oferecer valores superiores."
    },
    {
      question: "É importante saber inglês para trabalhar em Moçambique?",
      answer: "Sim, o inglês é altamente valorizado, especialmente em empresas multinacionais e projetos internacionais. Pode ser um diferencial significativo na sua candidatura."
    },
    {
      question: "Como posso me destacar no mercado de trabalho moçambicano?",
      answer: "Invista em capacitação, desenvolva habilidades digitais, construa uma rede de contactos, mantenha flexibilidade geográfica e apresente um CV profissional adaptado ao mercado local."
    }
  ];

  const relatedPosts = [
    "Como criar um CV profissional em Moçambique",
    "Como adaptar seu CV para diferentes áreas profissionais",
    "Primeiro emprego: como montar um CV sem experiência"
  ];

  return (
    <BlogPost
      title="Tendências do mercado de trabalho em Moçambique 2024"
      metaDescription="Descubra as principais tendências, profissões em alta e oportunidades do mercado de trabalho moçambicano em 2024. Guia completo para profissionais."
      author="Equipe MozVita"
      date="2024-06-04"
      readTime="9 min"
      category="Mercado de Trabalho"
      content={content}
      faqs={faqs}
      relatedPosts={relatedPosts}
    />
  );
};

export default TendenciasMercado2024;
