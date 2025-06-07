
import React from 'react';
import BlogPost from '@/components/blog/BlogPost';

const CVSemExperiencia = () => {
  const content = (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">O Desafio do Primeiro Emprego</h2>
      <p className="mb-6 text-gray-700 leading-relaxed">
        Conseguir o primeiro emprego em Moçambique pode parecer um paradoxo: as empresas querem experiência, mas como ganhar experiência sem ter trabalhado antes? A boa notícia é que você tem mais para oferecer do que imagina. Este guia vai ajudá-lo a criar um CV convincente mesmo sem experiência profissional formal.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Foque na Sua Formação Académica</h2>
      <p className="mb-4 text-gray-700">
        Quando você não tem experiência profissional, sua formação académica torna-se ainda mais importante:
      </p>
      <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
        <li><strong>Destaque seu curso:</strong> Mencione disciplinas relevantes para a vaga</li>
        <li><strong>Notas e reconhecimentos:</strong> Se teve bom desempenho, mencione</li>
        <li><strong>Projetos académicos:</strong> Trabalhos de conclusão, pesquisas, apresentações</li>
        <li><strong>Atividades extracurriculares:</strong> Grupos de estudo, representação estudantil</li>
      </ul>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Valorize Experiências Não-Formais</h2>
      <p className="mb-4 text-gray-700">
        Muitas experiências que você considera "não profissionais" são valiosas para empregadores:
      </p>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-3">Trabalho Voluntário</h3>
      <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
        <li>Atividades em ONGs ou instituições de caridade</li>
        <li>Trabalho comunitário</li>
        <li>Apoio em eventos religiosos ou culturais</li>
        <li>Tutoria ou ensino informal</li>
      </ul>

      <h3 className="text-xl font-semibold text-gray-900 mb-3">Trabalhos Informais</h3>
      <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
        <li>Vendas informais (demonstra iniciativa)</li>
        <li>Cuidar de crianças (responsabilidade)</li>
        <li>Ajuda em negócios familiares</li>
        <li>Trabalhos sazonais ou de fim de semana</li>
      </ul>

      <h3 className="text-xl font-semibold text-gray-900 mb-3">Estágios e Práticas</h3>
      <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-1">
        <li>Estágios curriculares obrigatórios</li>
        <li>Práticas profissionais</li>
        <li>Observações ou visitas técnicas</li>
        <li>Programas de trainee</li>
      </ul>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Desenvolva e Destaque Suas Competências</h2>
      <p className="mb-4 text-gray-700">
        Competências são muitas vezes mais importantes que experiência para o primeiro emprego:
      </p>

      <h3 className="text-xl font-semibold text-gray-900 mb-3">Competências Técnicas</h3>
      <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
        <li>Informática: Office, Internet, redes sociais profissionais</li>
        <li>Idiomas: Português, inglês, línguas locais</li>
        <li>Certificações: Cursos online, workshops, seminários</li>
        <li>Competências específicas da área de formação</li>
      </ul>

      <h3 className="text-xl font-semibold text-gray-900 mb-3">Competências Pessoais</h3>
      <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-1">
        <li>Comunicação e relacionamento interpessoal</li>
        <li>Trabalho em equipa</li>
        <li>Liderança (mesmo em contextos não profissionais)</li>
        <li>Resolução de problemas</li>
        <li>Adaptabilidade e flexibilidade</li>
        <li>Pontualidade e responsabilidade</li>
      </ul>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Estrutura Ideal para CV sem Experiência</h2>
      <div className="mb-6 text-gray-700">
        <strong>Ordem sugerida das seções:</strong>
        <ol className="list-decimal pl-6 mt-2 space-y-1">
          <li>Dados pessoais e contacto</li>
          <li>Objetivo profissional (fundamental para iniciantes)</li>
          <li>Formação académica (detalhada)</li>
          <li>Competências e habilidades</li>
          <li>Experiências relevantes (estágios, voluntariado)</li>
          <li>Cursos e certificações</li>
          <li>Idiomas</li>
          <li>Outras informações relevantes</li>
        </ol>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Como Escrever o Objetivo Profissional</h2>
      <p className="mb-4 text-gray-700">
        Para quem não tem experiência, o objetivo profissional é crucial. Deve ser específico e mostrar motivação:
      </p>
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <p className="text-gray-700 italic">
          <strong>Exemplo:</strong> "Recém-formado em Administração, procuro oportunidade como Assistente Administrativo onde possa aplicar conhecimentos em gestão e desenvolver experiência prática. Motivado para aprender e contribuir para o crescimento da organização."
        </p>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Dicas Específicas para Moçambique</h2>
      <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
        <li>Destaque conhecimento das realidades locais</li>
        <li>Mencione capacidade de trabalhar em ambientes multiculturais</li>
        <li>Valorize formação em português e inglês</li>
        <li>Inclua atividades comunitárias (muito valorizadas)</li>
        <li>Mostre disposição para aprender e crescer</li>
      </ul>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">7. O que Não Incluir</h2>
      <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
        <li>Não mencione falta de experiência negativamente</li>
        <li>Evite seções vazias ou com pouco conteúdo</li>
        <li>Não use frases como "sem experiência prévia"</li>
        <li>Não inclua hobbies irrelevantes para a vaga</li>
        <li>Evite informações pessoais desnecessárias</li>
      </ul>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">Conclusão</h2>
      <p className="mb-6 text-gray-700 leading-relaxed">
        Não ter experiência profissional não significa não ter valor para oferecer. Foque no seu potencial, nas competências desenvolvidas durante a formação e nas experiências de vida que demonstram suas qualidades pessoais. Muitos empregadores preferem contratar pessoas motivadas e com vontade de aprender do que profissionais experientes mas acomodados. Seu primeiro emprego está mais próximo do que você imagina!
      </p>
    </div>
  );

  const faqs = [
    {
      question: "Como compensar a falta de experiência profissional?",
      answer: "Destaque formação académica, projetos de curso, trabalho voluntário, competências técnicas e pessoais. Mostre motivação e vontade de aprender."
    },
    {
      question: "Devo incluir trabalhos informais no meu CV?",
      answer: "Sim, se forem relevantes. Trabalhos informais demonstram iniciativa, responsabilidade e habilidades que são valorizadas pelos empregadores."
    },
    {
      question: "Qual o tamanho ideal do CV para primeiro emprego?",
      answer: "Uma página é suficiente. Focus na qualidade das informações, não na quantidade. Seja conciso e relevante."
    },
    {
      question: "Como destacar competências sem experiência comprovada?",
      answer: "Use exemplos de situações académicas, pessoais ou de voluntariado onde demonstrou essas competências. Seja específico nos exemplos."
    }
  ];

  const relatedPosts = [
    "Como criar um CV profissional em Moçambique",
    "5 erros comuns que você deve evitar no seu CV",
    "Tendências do mercado de trabalho em Moçambique 2024"
  ];

  return (
    <BlogPost
      title="Primeiro emprego: como montar um CV sem experiência"
      metaDescription="Guia completo para criar um currículo atrativo mesmo sem experiência profissional. Dicas específicas para conseguir o primeiro emprego em Moçambique."
      author="Equipe MozVita"
      date="2024-06-05"
      readTime="7 min"
      category="Primeiro Emprego"
      content={content}
      faqs={faqs}
      relatedPosts={relatedPosts}
    />
  );
};

export default CVSemExperiencia;
