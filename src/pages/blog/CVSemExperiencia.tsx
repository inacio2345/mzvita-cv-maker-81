
import React from 'react';
import { Link } from 'react-router-dom';
import BlogPost from '@/components/blog/BlogPost';

const CVSemExperiencia = () => {
  const content = (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">O Desafio do Primeiro Emprego: Criando o seu CV Moçambique do Zero</h2>
      <p className="mb-6 text-gray-700 leading-relaxed">
        Conseguir o primeiro emprego em Moçambique pode parecer um paradoxo: as empresas querem experiência, mas como ganhar experiência sem ter trabalhado antes? A verdade é que um <strong>cv moçambique</strong> para iniciantes não deve focar apenas no que você já fez por dinheiro, mas sim em todo o seu potencial e nas habilidades que você construiu durante a sua vida académica e pessoal.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Estrutura de um CV Moçambique para Estudantes e Recém-Licenciados</h2>
      <p className="mb-4 text-gray-700">
        Se você está em Maputo, Beira, Nampula ou qualquer outra província, a regra de ouro para o seu <strong>cv moçambique</strong> é a organização. Um currículo limpo e direto ao ponto é o que mais atrai os recrutadores.
      </p>

      <h3 className="text-xl font-semibold text-gray-900 mb-3">Educação: O seu Maior Ativo</h3>
      <p className="mb-4 text-gray-700">
        Como você ainda não tem um histórico profissional longo, sua educação deve estar no topo. Mencione não apenas o nome do curso e da instituição (Ex: UEM, UP, ISCTEM), mas também disciplinas específicas que tenham relação direta com a vaga desejada. Se você foi monitor de alguma disciplina ou participou de projetos de pesquisa, isso conta como "experiência técnica" no seu <strong>currículo vitae moçambique</strong>.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Transformando Atividades em Experiência no seu CV Moçambique</h2>
      <p className="mb-4 text-gray-700">
        Muitos jovens moçambicanos cometem o erro de deixar a seção de experiência vazia. No entanto, o mercado local valoriza muito o que chamamos de "proatividade".
      </p>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">Trabalho Voluntário e Projetos Comunitários</h3>
      <p className="mb-4 text-gray-700">
        Atuou em uma ONG, igreja ou associação de bairro? Isso demonstra liderança e responsabilidade. No seu <strong>cv moçambique</strong>, descreva essas atividades como "Experiências de Impacto Social". Detalhe o que você fazia: <em>"Organização de eventos para 200 pessoas"</em> ou <em>"Gestão de stock de donativos"</em>.
      </p>

      <h3 className="text-xl font-semibold text-gray-900 mb-3">Estágios e Práticas Profissionais</h3>
      <p className="mb-4 text-gray-700">
        Mesmo que o estágio não tenha sido remunerado, ele é experiência real. Se você está seguindo as <Link to="/blog/guia-cv-2026" className="text-blue-600 hover:text-blue-800 underline">regras do CV para 2026</Link>, sabe que demonstrar aprendizado prático é fundamental.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Competências Técnicas (Hard Skills) vs. Comportamentais (Soft Skills)</h2>
      <p className="mb-4 text-gray-700">
        Em um <strong>modelo de cv moçambique</strong> para quem não tem experiência, as competências ganham destaque total.
      </p>
      <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
        <li><strong>Informática:</strong> Domínio do Pacote Office (Excel e Word são básicos).</li>
        <li><strong>Idiomas:</strong> O Inglês é o grande diferencial em Moçambique. Se você fala uma língua local (Emakhuwa, Changana, etc), mencione! Isso pode ser vital para projetos rurais.</li>
        <li><strong>Soft Skills:</strong> Adaptabilidade, vontade de aprender e pontualidade.</li>
      </ul>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">4. O Diferencial do Objetivo Profissional</h2>
      <p className="mb-4 text-gray-700">
        Para quem está começando, o objetivo profissional deve ser uma declaração de intenções. Em vez de pedir um emprego, diga como você quer ajudar a empresa.
        Exemplo: <em>"Recém-formado em Contabilidade focado em aplicar conhecimentos técnicos para otimizar a gestão financeira da organização e desenvolver uma carreira sólida no setor bancário moçambicano."</em>
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Dicas Finais para Conquistar a Primeira Entrevista</h2>
      <p className="mb-6 text-gray-700 leading-relaxed">
        Não se esqueça de revisar os <Link to="/blog/erros-comuns" className="text-blue-600 hover:text-blue-800 underline">erros comuns que eliminam candidatos</Link>. No primeiro emprego, o nível de atenção aos detalhes no seu <strong>cv moçambique</strong> diz muito sobre como você será como funcionário. Use fontes profissionais e salve sempre em PDF para garantir que o formato não mude.
      </p>

      <div className="bg-google-blue/10 border-l-4 border-google-blue p-6 rounded-r-lg mb-8">
        <h3 className="text-lg font-bold text-google-blue mb-2">Conclusão:</h3>
        <p className="text-slate-700 italic">
          "A falta de experiência formal não é uma barreira intransponível. Com um <strong>cv moçambique</strong> bem pensado, focado em competências e com uma excelente apresentação, você estará no topo da lista dos recrutadores."
        </p>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-6">📚 Conteúdos que vão impulsionar sua carreira:</h2>
      <div className="bg-blue-50 p-6 rounded-lg mb-6">
        <ul className="space-y-4 text-gray-700">
          <li>
            <Link to="/blog/cv-profissional-mocambique" className="text-blue-600 hover:text-blue-800 underline font-bold text-lg">
              Guia Completo: CV Profissional Moçambique
            </Link>
            <p className="text-sm text-gray-600">Aprenda a estruturar seu currículo como um especialista do mercado local.</p>
          </li>
          <li>
            <Link to="/blog/foto-no-curriculo" className="text-blue-600 hover:text-blue-800 underline font-bold text-lg">
              Devo usar Foto no CV?
            </Link>
            <p className="text-sm text-gray-600">Entenda as normas e preferências dos recrutadores moçambicanos sobre imagens.</p>
          </li>
          <li>
            <Link to="/cv-mocambique" className="text-blue-600 hover:text-blue-800 underline font-bold text-lg">
              Modelos de CV em Moçambique (PDF)
            </Link>
            <p className="text-sm text-gray-600">Baixe modelos prontos e otimizados para qualquer área profissional.</p>
          </li>
        </ul>
      </div>
    </div>
  );

  const faqs = [
    {
      question: "Como destacar competências sem experiência profissional?",
      answer: "Foque em experiências académicas, projetos pessoais, trabalho voluntário, estágios, cursos extracurriculares e competências desenvolvidas em contextos não profissionais que sejam transferíveis para o trabalho."
    },
    {
      question: "Devo mencionar trabalhos informais no meu primeiro CV?",
      answer: "Sim, trabalhos informais podem demonstrar responsabilidade, iniciativa e competências práticas. Apresente-os de forma profissional, destacando as competências desenvolvidas e responsabilidades assumidas."
    },
    {
      question: "Qual deve ser o foco do meu CV sem experiência?",
      answer: "Foque na sua educação, competências técnicas e pessoais, projetos académicos relevantes, certificações, idiomas e demonstre entusiasmo e vontade de aprender na área desejada."
    },
    {
      question: "Como compensar a falta de experiência profissional?",
      answer: "Invista em cursos online, certificações gratuitas, projetos pessoais, trabalho voluntário, estágios não remunerados e networking para ganhar experiência e fazer contactos na área."
    },
    {
      question: "É normal ter dificuldades para conseguir o primeiro emprego?",
      answer: "Sim, é completamente normal. O primeiro emprego é sempre mais desafiante. Mantenha-se persistente, continue a desenvolver competências e considere oportunidades de estágio ou trabalho voluntário."
    }
  ];

  const relatedPosts = [
    { title: "Como criar um CV profissional em Moçambique", slug: "cv-profissional-mocambique" },
    { title: "5 erros comuns que você deve evitar no seu CV", slug: "erros-comuns" },
    { title: "A importância da foto no currículo moçambicano", slug: "foto-no-curriculo" }
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
      slug="cv-sem-experiencia"
      featuredImage="/blog/primeiro-emprego.jpg"
      contentImages={[
        "/lovable-uploads/7b168937-52b9-4d8c-93e7-dd138aa37786.png"
      ]}
    />
  );
};

export default CVSemExperiencia;
