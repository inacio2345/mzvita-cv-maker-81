
import React from 'react';
import BlogPost from '@/components/blog/BlogPost';

const CVProfissionalMocambique = () => {
  const content = (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Introdução</h2>
      <p className="mb-6 text-gray-700 leading-relaxed">
        Criar um CV profissional em Moçambique requer conhecimento específico do mercado local e das expectativas dos empregadores moçambicanos. Neste guia completo, você aprenderá tudo o que precisa para elaborar um currículo que se destaque no competitivo mercado de trabalho do país.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Estrutura Básica de um CV Moçambicano</h2>
      <p className="mb-4 text-gray-700">
        Um CV profissional em Moçambique deve seguir uma estrutura clara e organizada:
      </p>
      <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
        <li><strong>Dados Pessoais:</strong> Nome completo, contacto, endereço (cidade é suficiente)</li>
        <li><strong>Foto Profissional:</strong> Recomendada para a maioria das posições</li>
        <li><strong>Objetivo Profissional:</strong> Breve descrição dos seus objetivos de carreira</li>
        <li><strong>Formação Académica:</strong> Educação formal, do mais recente para o mais antigo</li>
        <li><strong>Experiência Profissional:</strong> Histórico de trabalho relevante</li>
        <li><strong>Competências:</strong> Habilidades técnicas e pessoais</li>
        <li><strong>Idiomas:</strong> Especialmente importante em Moçambique (Português, Inglês, línguas locais)</li>
      </ul>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Formatação e Design Adequados</h2>
      <p className="mb-4 text-gray-700">
        O visual do seu CV é fundamental para causar boa primeira impressão:
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
        O mercado de trabalho em Moçambique tem suas particularidades:
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
        Para pedreiros e técnicos, destaque experiência prática, conhecimento de materiais locais e capacidade de liderar equipas.
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
    </div>
  );

  const faqs = [
    {
      question: "Qual o tamanho ideal para um CV em Moçambique?",
      answer: "O ideal é manter o CV entre 1 a 2 páginas. Para profissionais com pouca experiência, 1 página é suficiente. Para profissionais seniores, até 2 páginas são aceitáveis."
    },
    {
      question: "Devo incluir foto no meu CV?",
      answer: "Sim, na maioria dos casos é recomendado incluir uma foto profissional no CV em Moçambique. Certifique-se de que seja uma foto recente, com boa qualidade e vestimenta adequada."
    },
    {
      question: "Como destacar conhecimento de idiomas?",
      answer: "Liste os idiomas que domina com o nível de proficiência (básico, intermediário, avançado, fluente). Em Moçambique, destaque especialmente português, inglês e línguas locais relevantes."
    },
    {
      question: "Devo mencionar salário pretendido no CV?",
      answer: "Não é necessário mencionar salário no CV. Esta informação pode ser discutida durante a entrevista ou em carta de apresentação, se solicitado."
    }
  ];

  const relatedPosts = [
    "5 erros comuns que você deve evitar no seu CV",
    "Primeiro emprego: como montar um CV sem experiência",
    "A importância da foto no currículo moçambicano"
  ];

  return (
    <BlogPost
      title="Como criar um CV profissional em Moçambique"
      metaDescription="Guia completo para criar um currículo profissional adaptado ao mercado de trabalho moçambicano. Dicas, estrutura e exemplos práticos."
      author="Equipe MozVita"
      date="2024-06-07"
      readTime="8 min"
      category="Dicas de CV"
      content={content}
      faqs={faqs}
      relatedPosts={relatedPosts}
    />
  );
};

export default CVProfissionalMocambique;
