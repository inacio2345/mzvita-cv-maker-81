
import React from 'react';
import BlogPost from '@/components/blog/BlogPost';

const CVProfissionalMocambique = () => {
  const content = (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Introdução</h2>
      <p className="mb-6 text-gray-700 leading-relaxed">
        Criar um CV profissional em Moçambique requer conhecimento específico do mercado local e das expectativas dos empregadores moçambicanos. Neste guia completo, você aprenderá tudo o que precisa para elaborar um currículo que se destaque no competitivo mercado de trabalho do país. Para informações sobre vagas disponíveis, consulte o portal oficial do <a href="https://iefp.gov.mz/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Instituto de Emprego e Formação Profissional (IEFP)</a>.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Estrutura Básica de um CV Moçambicano</h2>
      <p className="mb-4 text-gray-700">
        Um CV profissional em Moçambique deve seguir uma estrutura clara e organizada:
      </p>
      <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
        <li><strong>Dados Pessoais:</strong> Nome completo, contacto, endereço (cidade é suficiente)</li>
        <li><strong>Foto Profissional:</strong> Recomendada para a maioria das posições - veja nosso <a href="/blog/foto-no-curriculo" className="text-blue-600 hover:text-blue-800 underline">guia sobre a importância da foto no currículo</a></li>
        <li><strong>Objetivo Profissional:</strong> Breve descrição dos seus objetivos de carreira</li>
        <li><strong>Formação Académica:</strong> Educação formal, do mais recente para o mais antigo</li>
        <li><strong>Experiência Profissional:</strong> Histórico de trabalho relevante</li>
        <li><strong>Competências:</strong> Habilidades técnicas e pessoais</li>
        <li><strong>Idiomas:</strong> Especialmente importante em Moçambique (Português, Inglês, línguas locais)</li>
      </ul>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Formatação e Design Adequados</h2>
      <p className="mb-4 text-gray-700">
        O visual do seu CV é fundamental para causar boa primeira impressão. Evite os <a href="/blog/erros-comuns" className="text-blue-600 hover:text-blue-800 underline">erros comuns de formatação que prejudicam seu currículo</a>:
      </p>
      <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
        <li>Use fontes profissionais como Times New Roman, Arial ou Calibri</li>
        <li>Mantenha tamanho de fonte entre 10-12 pontos</li>
        <li>Limite o CV a 2 páginas no máximo</li>
        <li>Use espaçamento adequado entre seções</li>
        <li>Mantenha consistência na formatação</li>
      </ul>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Adaptação ao Mercado Moçambicano</h2>
      <p className="mb-4 text-gray-700">
        O mercado de trabalho em Moçambique tem suas particularidades. Para entender melhor as <a href="https://www.emprego.co.mz/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">oportunidades disponíveis no mercado</a>, é importante conhecer estas características:
      </p>
      <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
        <li>Destaque conhecimentos em português e inglês</li>
        <li>Mencione experiência com diferentes culturas e etnias</li>
        <li>Inclua trabalho voluntário e atividades comunitárias</li>
        <li>Valorize formações técnicas e certificações</li>
        <li>Destaque flexibilidade e adaptabilidade</li>
      </ul>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Dicas Específicas por Setor</h2>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-3">Educação</h3>
      <p className="mb-4 text-gray-700">
        Para professores e educadores, destaque formação pedagógica, experiência com diferentes faixas etárias e conhecimento do currículo moçambicano.
      </p>

      <h3 className="text-xl font-semibold text-gray-900 mb-3">Saúde</h3>
      <p className="mb-4 text-gray-700">
        Profissionais de saúde devem enfatizar certificações, experiência em contextos rurais e urbanos, e capacidade de trabalhar com recursos limitados.
      </p>

      <h3 className="text-xl font-semibold text-gray-900 mb-3">Construção Civil</h3>
      <p className="mb-4 text-gray-700">
        Para pedreiros e técnicos, destaque experiência prática, conhecimento de materiais locais e capacidade de liderar equipas. Saiba mais sobre <a href="/blog/adaptar-cv-por-area" className="text-blue-600 hover:text-blue-800 underline">como adaptar seu CV para diferentes áreas profissionais</a>.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Erros Comuns a Evitar</h2>
      <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
        <li>Não incluir informações de contacto atualizadas</li>
        <li>Usar fotos inadequadas ou de baixa qualidade</li>
        <li>Exagerar nas qualificações ou experiências</li>
        <li>Não adaptar o CV para cada vaga específica</li>
        <li>Incluir informações pessoais irrelevantes</li>
      </ul>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">Conclusão</h2>
      <p className="mb-6 text-gray-700 leading-relaxed">
        Um CV profissional bem elaborado é sua porta de entrada para o mercado de trabalho moçambicano. Seguindo estas diretrizes e adaptando o conteúdo às especificidades locais, você aumentará significativamente suas chances de conseguir a vaga desejada. Lembre-se de sempre revisar e atualizar seu currículo conforme ganha novas experiências.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mb-6">📚 Artigos Relacionados</h2>
      <div className="bg-blue-50 p-6 rounded-lg mb-6">
        <ul className="space-y-3 text-gray-700">
          <li>
            <a href="/blog/erros-comuns" className="text-blue-600 hover:text-blue-800 underline font-medium">
              5 erros comuns que você deve evitar no seu CV
            </a>
            <p className="text-sm text-gray-600 mt-1">Descubra os principais erros que podem prejudicar seu currículo e como evitá-los.</p>
          </li>
          <li>
            <a href="/blog/cv-sem-experiencia" className="text-blue-600 hover:text-blue-800 underline font-medium">
              Primeiro emprego: como montar um CV sem experiência
            </a>
            <p className="text-sm text-gray-600 mt-1">Guia completo para criar um currículo atrativo mesmo sem experiência profissional.</p>
          </li>
          <li>
            <a href="/blog/tendencias-mercado-2024" className="text-blue-600 hover:text-blue-800 underline font-medium">
              Tendências do mercado de trabalho em Moçambique 2024
            </a>
            <p className="text-sm text-gray-600 mt-1">Análise das profissões em alta e competências mais valorizadas.</p>
          </li>
        </ul>
      </div>
    </div>
  );

  const faqs = [
    {
      question: "Qual é o formato ideal para um CV em Moçambique?",
      answer: "O formato ideal é de 1-2 páginas, em ordem cronológica reversa, com seções bem definidas: dados pessoais, objetivo profissional, experiência, educação, competências e referências."
    },
    {
      question: "Devo incluir foto no meu CV moçambicano?",
      answer: "Sim, em Moçambique é comum e recomendado incluir uma foto profissional no CV. Certifique-se de que seja uma imagem de boa qualidade, com vestimenta adequada e fundo neutro."
    },
    {
      question: "Como adaptar meu CV para diferentes empresas?",
      answer: "Personalize o objetivo profissional, destaque experiências relevantes para a vaga específica, use palavras-chave do anúncio e ajuste a ordem das seções conforme a importância para cada posição."
    },
    {
      question: "Quais competências são mais valorizadas no mercado moçambicano?",
      answer: "Comunicação em português e inglês, conhecimentos de informática (especialmente pacote Office), trabalho em equipe, adaptabilidade e conhecimentos específicos da área de atuação."
    },
    {
      question: "Como destacar experiência internacional no CV?",
      answer: "Crie uma seção específica para experiências internacionais, mencione idiomas falados, destaque competências interculturais e adapte a experiência para o contexto moçambicano."
    }
  ];

  const relatedPosts = [
    "A importância da foto no currículo moçambicano",
    "5 erros comuns que você deve evitar no seu CV",
    "Primeiro emprego: como montar um CV sem experiência"
  ];

  return (
    <BlogPost
      title="Como criar um CV profissional em Moçambique"
      metaDescription="Guia completo para criar um currículo profissional adaptado ao mercado de trabalho moçambicano. Dicas, estrutura e exemplos práticos para se destacar."
      author="Equipe MozVita"
      date="2024-06-07"
      readTime="8 min"
      category="Dicas de CV"
      content={content}
      faqs={faqs}
      relatedPosts={relatedPosts}
      featuredImage="/lovable-uploads/792b9048-62e9-4cb9-9295-34848dacbae0.png"
      contentImages={[
        "/lovable-uploads/d0958b45-cda0-4796-aac4-a03ccebea308.png"
      ]}
    />
  );
};

export default CVProfissionalMocambique;
