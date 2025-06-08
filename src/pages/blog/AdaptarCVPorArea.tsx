
import React from 'react';
import BlogPost from '@/components/blog/BlogPost';

const AdaptarCVPorArea = () => {
  const content = (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Introdução</h2>
      <p className="mb-6 text-gray-700 leading-relaxed">
        Adaptar seu CV para diferentes áreas profissionais é fundamental para o sucesso na busca por emprego em Moçambique. Cada setor tem suas particularidades, expectativas específicas e competências valorizadas. Este guia ensina como personalizar seu currículo para maximizar suas chances em qualquer área profissional.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Por que Adaptar seu CV por Área Profissional?</h2>
      <p className="mb-4 text-gray-700">
        Cada área profissional tem critérios específicos de avaliação. Um CV genérico raramente atende às expectativas dos recrutadores, que buscam candidatos com perfil alinhado às necessidades do setor.
      </p>

      <h3 className="text-xl font-semibold text-gray-900 mb-3">Benefícios da Personalização</h3>
      <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
        <li>Maior relevância para o recrutador</li>
        <li>Destaque das competências mais valorizadas</li>
        <li>Demonstração de conhecimento do setor</li>
        <li>Aumento significativo das chances de entrevista</li>
        <li>Melhor posicionamento frente à concorrência</li>
      </ul>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">2. CV para Área de Saúde</h2>
      <p className="mb-4 text-gray-700">
        Profissionais de saúde devem enfatizar formação técnica, certificações e experiência prática.
      </p>

      <h3 className="text-xl font-semibold text-gray-900 mb-3">Elementos Essenciais</h3>
      <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
        <li><strong>Formação:</strong> Destaque cursos, especializações e certificações</li>
        <li><strong>Experiência clínica:</strong> Detalhe locais de trabalho e especialidades</li>
        <li><strong>Competências técnicas:</strong> Procedimentos, equipamentos, protocolos</li>
        <li><strong>Idiomas:</strong> Português e inglês (terminologia médica)</li>
        <li><strong>Disponibilidade:</strong> Turnos, plantões, deslocamentos</li>
      </ul>

      <h3 className="text-xl font-semibold text-gray-900 mb-3">Exemplo de Objetivo Profissional</h3>
      <p className="mb-6 text-gray-700 bg-gray-50 p-4 rounded-lg italic">
        "Enfermeiro com 3 anos de experiência em UTI, especializado em cuidados intensivos e emergências. Busco oportunidade para aplicar conhecimentos em ambiente hospitalar, contribuindo para a excelência no atendimento ao paciente."
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">3. CV para Área de Educação</h2>
      <p className="mb-4 text-gray-700">
        Educadores devem valorizar formação pedagógica, metodologias e resultados alcançados.
      </p>

      <h3 className="text-xl font-semibold text-gray-900 mb-3">Pontos de Destaque</h3>
      <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
        <li><strong>Formação pedagógica:</strong> Licenciatura, cursos de didática</li>
        <li><strong>Experiência docente:</strong> Níveis de ensino, disciplinas</li>
        <li><strong>Metodologias:</strong> Técnicas de ensino, uso de tecnologia</li>
        <li><strong>Resultados:</strong> Aprovação de alunos, projetos desenvolvidos</li>
        <li><strong>Formação continuada:</strong> Workshops, seminários, cursos</li>
      </ul>

      <h3 className="text-xl font-semibold text-gray-900 mb-3">Dicas Específicas</h3>
      <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
        <li>Mencione conhecimento do currículo moçambicano</li>
        <li>Destaque experiência com diferentes faixas etárias</li>
        <li>Inclua participação em atividades extracurriculares</li>
        <li>Valorize trabalho voluntário em educação</li>
      </ul>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">4. CV para Construção Civil</h2>
      <p className="mb-4 text-gray-700">
        Profissionais da construção devem enfatizar experiência prática, projetos e habilidades técnicas.
      </p>

      <h3 className="text-xl font-semibold text-gray-900 mb-3">Elementos Importantes</h3>
      <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
        <li><strong>Experiência prática:</strong> Tipos de obras, tempo de experiência</li>
        <li><strong>Especialidades:</strong> Alvenaria, carpintaria, pintura, etc.</li>
        <li><strong>Ferramentas:</strong> Conhecimento de equipamentos e ferramentas</li>
        <li><strong>Segurança:</strong> Conhecimento de normas de segurança</li>
        <li><strong>Liderança:</strong> Experiência supervisionando equipes</li>
      </ul>

      <h3 className="text-xl font-semibold text-gray-900 mb-3">Exemplo de Experiência</h3>
      <p className="mb-6 text-gray-700 bg-gray-50 p-4 rounded-lg">
        <strong>Pedreiro - Construções ABC (2020-2024)</strong><br/>
        • Execução de alvenaria estrutural em 15 residências<br/>
        • Liderança de equipe de 3 ajudantes<br/>
        • Conhecimento em leitura de plantas baixas<br/>
        • Zero acidentes de trabalho durante o período
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">5. CV para Área Comercial</h2>
      <p className="mb-4 text-gray-700">
        Profissionais de vendas devem destacar resultados, relacionamento e conhecimento de produtos.
      </p>

      <h3 className="text-xl font-semibold text-gray-900 mb-3">Competências Essenciais</h3>
      <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
        <li><strong>Resultados de vendas:</strong> Metas alcançadas, números específicos</li>
        <li><strong>Relacionamento:</strong> Capacidade de construir relacionamentos</li>
        <li><strong>Produtos/Serviços:</strong> Conhecimento técnico do que vende</li>
        <li><strong>Negociação:</strong> Habilidades de fechamento</li>
        <li><strong>Território:</strong> Conhecimento da região de atuação</li>
      </ul>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">6. CV para Tecnologia</h2>
      <p className="mb-4 text-gray-700">
        Profissionais de TI devem enfatizar competências técnicas, projetos e certificações.
      </p>

      <h3 className="text-xl font-semibold text-gray-900 mb-3">Elementos Técnicos</h3>
      <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
        <li><strong>Linguagens:</strong> Programação, scripts, marcação</li>
        <li><strong>Sistemas:</strong> Experiência com diferentes SO</li>
        <li><strong>Ferramentas:</strong> Software específico da área</li>
        <li><strong>Projetos:</strong> Sistemas desenvolvidos, problemas resolvidos</li>
        <li><strong>Certificações:</strong> Cursos técnicos, certificações de fornecedores</li>
      </ul>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Dicas Gerais para Personalização</h2>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-3">Pesquise a Área</h3>
      <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
        <li>Estude anúncios de emprego da área</li>
        <li>Identifique palavras-chave mais usadas</li>
        <li>Conheça as principais empresas do setor</li>
        <li>Entenda as competências mais valorizadas</li>
      </ul>

      <h3 className="text-xl font-semibold text-gray-900 mb-3">Adapte a Linguagem</h3>
      <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
        <li>Use terminologia específica da área</li>
        <li>Destaque experiências relevantes</li>
        <li>Ordene informações por relevância</li>
        <li>Ajuste o objetivo profissional</li>
      </ul>

      <h3 className="text-xl font-semibold text-gray-900 mb-3">Mantenha Múltiplas Versões</h3>
      <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
        <li>Crie uma versão para cada área de interesse</li>
        <li>Salve com nomes específicos (CV_Saude, CV_Educacao)</li>
        <li>Atualize regularmente todas as versões</li>
        <li>Teste com profissionais da área</li>
      </ul>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Erros Comuns na Personalização</h2>
      <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
        <li>Usar o mesmo CV para áreas muito diferentes</li>
        <li>Não pesquisar o vocabulário específico da área</li>
        <li>Destacar experiências irrelevantes</li>
        <li>Não adaptar o objetivo profissional</li>
        <li>Esquecer de atualizar informações de contacto</li>
      </ul>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">Conclusão</h2>
      <p className="mb-6 text-gray-700 leading-relaxed">
        Adaptar seu CV por área profissional é uma estratégia essencial para o sucesso na busca por emprego. Investir tempo na personalização demonstra profissionalismo e aumenta significativamente suas chances de conseguir a vaga desejada. Lembre-se: um CV bem adaptado é um investimento no seu futuro profissional.
      </p>
    </div>
  );

  const faqs = [
    {
      question: "Como identificar as competências mais importantes para cada área?",
      answer: "Analise anúncios de emprego da área, pesquise perfis profissionais no LinkedIn, consulte sites especializados e converse com profissionais da área para entender quais competências são mais valorizadas."
    },
    {
      question: "Devo ter um CV diferente para cada área profissional?",
      answer: "Sim, idealmente deve ter versões adaptadas do seu CV para cada área ou tipo de posição. Isso permite destacar as experiências e competências mais relevantes para cada contexto."
    },
    {
      question: "Como destacar competências transferíveis entre áreas?",
      answer: "Identifique competências como liderança, comunicação, resolução de problemas e trabalho em equipa que são valiosas em qualquer área. Apresente exemplos concretos de como aplicou essas competências."
    },
    {
      question: "É possível mudar de área profissional com o mesmo CV?",
      answer: "É possível, mas não recomendado. Para mudança de área, é crucial adaptar o CV para destacar competências transferíveis e demonstrar interesse genuíno e conhecimento sobre a nova área."
    },
    {
      question: "Como pesquisar as exigências específicas de cada área?",
      answer: "Use sites de emprego, LinkedIn, associações profissionais, relatórios do mercado de trabalho e converse com profissionais da área para entender as expectativas e requisitos específicos."
    }
  ];

  const relatedPosts = [
    "Como criar um CV profissional em Moçambique",
    "5 erros comuns que você deve evitar no seu CV",
    "Tendências do mercado de trabalho em Moçambique 2024"
  ];

  return (
    <BlogPost
      title="Como adaptar seu CV para diferentes áreas profissionais"
      metaDescription="Aprenda a personalizar seu currículo para destacar as competências específicas de cada profissão e aumentar suas chances no mercado de trabalho."
      author="Equipe MozVita"
      date="2024-06-03"
      readTime="6 min"
      category="Dicas de CV"
      content={content}
      faqs={faqs}
      relatedPosts={relatedPosts}
      featuredImage="/lovable-uploads/0caa2974-247d-4390-863a-2988db8f9d7a.png"
      contentImages={[
        "/lovable-uploads/f8d66348-9619-4757-bc26-31916b80be24.png"
      ]}
    />
  );
};

export default AdaptarCVPorArea;
