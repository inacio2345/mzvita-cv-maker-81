
import React from 'react';
import BlogPost from '@/components/blog/BlogPost';

const ErrosComuns = () => {
  const content = (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Por que evitar erros no CV é crucial?</h2>
      <p className="mb-6 text-gray-700 leading-relaxed">
        Em um mercado de trabalho competitivo como o de Moçambique, pequenos erros no seu CV podem ser a diferença entre conseguir uma entrevista ou ter sua candidatura descartada. Recrutadores frequentemente recebem centenas de currículos e qualquer descuido pode eliminar suas chances. Vamos abordar os 5 erros mais comuns e como evitá-los.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Informações de Contacto Incorretas ou Desatualizadas</h2>
      <p className="mb-4 text-gray-700">
        <strong>O erro:</strong> Incluir números de telefone antigos, emails profissionais de empregos anteriores ou endereços desatualizados.
      </p>
      <p className="mb-4 text-gray-700">
        <strong>Por que prejudica:</strong> Se o empregador não conseguir entrar em contacto, sua candidatura será automaticamente descartada.
      </p>
      <p className="mb-6 text-gray-700">
        <strong>Como evitar:</strong> Sempre revise e atualize seus dados antes de enviar. Use um email profissional (nome.sobrenome@gmail.com) e certifique-se de que o número de celular está correto e ativo.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Erros de Ortografia e Gramática</h2>
      <p className="mb-4 text-gray-700">
        <strong>O erro:</strong> Palavras mal escritas, concordância incorreta, pontuação errada ou uso inadequado de maiúsculas.
      </p>
      <p className="mb-4 text-gray-700">
        <strong>Por que prejudica:</strong> Demonstra falta de atenção aos detalhes e pode indicar baixo nível de educação ou desleixo.
      </p>
      <div className="mb-6 text-gray-700">
        <strong>Como evitar:</strong>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Use ferramentas de correção como Word ou Google Docs</li>
          <li>Peça para outra pessoa revisar seu CV</li>
          <li>Leia em voz alta para identificar erros</li>
          <li>Preste atenção especial aos nomes de empresas e cargos</li>
        </ul>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Foto Inadequada ou de Má Qualidade</h2>
      <p className="mb-4 text-gray-700">
        <strong>O erro:</strong> Usar fotos casuais, selfies, imagens pixeladas ou com vestuário inadequado.
      </p>
      <p className="mb-4 text-gray-700">
        <strong>Por que prejudica:</strong> A primeira impressão é visual, e uma foto inadequada pode criar uma imagem não profissional.
      </p>
      <div className="mb-6 text-gray-700">
        <strong>Como evitar:</strong>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Use foto recente e profissional</li>
          <li>Vista roupas adequadas ao cargo pretendido</li>
          <li>Certifique-se de que a qualidade da imagem é boa</li>
          <li>Mantenha expressão séria mas amigável</li>
        </ul>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Exagerar ou Mentir sobre Experiências</h2>
      <p className="mb-4 text-gray-700">
        <strong>O erro:</strong> Inflacionar responsabilidades, inventar experiências ou estender períodos de trabalho.
      </p>
      <p className="mb-4 text-gray-700">
        <strong>Por que prejudica:</strong> Durante a entrevista ou verificação de referências, as mentiras serão descobertas, destruindo sua credibilidade.
      </p>
      <div className="mb-6 text-gray-700">
        <strong>Como evitar:</strong>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Seja honesto sobre suas experiências</li>
          <li>Destaque realizações reais e mensuráveis</li>
          <li>Se tem pouca experiência, foque em potencial e aprendizado</li>
          <li>Use verbos de ação para valorizar o que realmente fez</li>
        </ul>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Formato Confuso e Desorganizado</h2>
      <p className="mb-4 text-gray-700">
        <strong>O erro:</strong> Usar muitas cores, fontes diferentes, falta de espaçamento adequado ou ordem cronológica confusa.
      </p>
      <p className="mb-4 text-gray-700">
        <strong>Por que prejudica:</strong> Dificulta a leitura e pode cansar o recrutador, que tem pouco tempo para analisar cada CV.
      </p>
      <div className="mb-6 text-gray-700">
        <strong>Como evitar:</strong>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Use formato simples e clean</li>
          <li>Mantenha consistência na formatação</li>
          <li>Organize informações em ordem cronológica reversa</li>
          <li>Use espaçamento adequado entre seções</li>
          <li>Limite-se a 1-2 fontes no máximo</li>
        </ul>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">Dicas Extras para o Mercado Moçambicano</h2>
      <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
        <li>Não inclua informações pessoais desnecessárias (estado civil, religião)</li>
        <li>Evite usar gírias ou linguagem muito informal</li>
        <li>Não coloque referências no CV, apenas "Referências disponíveis mediante solicitação"</li>
        <li>Adapte o CV para cada vaga específica</li>
        <li>Use exemplos concretos de suas realizações</li>
      </ul>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">Conclusão</h2>
      <p className="mb-6 text-gray-700 leading-relaxed">
        Evitar estes erros comuns pode significativamente melhorar suas chances no mercado de trabalho moçambicano. Lembre-se: seu CV é seu cartão de visitas profissional. Invista tempo na sua elaboração, revise cuidadosamente e mantenha-o sempre atualizado. Um CV bem feito abre portas, enquanto um CV com erros as fecha.
      </p>
    </div>
  );

  const faqs = [
    {
      question: "Quantas vezes devo revisar meu CV antes de enviar?",
      answer: "Recomenda-se pelo menos 3 revisões: uma para conteúdo, uma para formatação e uma final para ortografia. Idealmente, peça para outra pessoa também revisar."
    },
    {
      question: "Posso usar modelos prontos de CV?",
      answer: "Sim, modelos prontos são uma ótima base, mas sempre personalize o conteúdo para sua experiência e para a vaga específica."
    },
    {
      question: "Qual o maior erro que pode eliminar minha candidatura?",
      answer: "Informações de contacto incorretas são fatais, pois impedem o empregador de entrar em contacto. Sempre verifique telefone e email."
    },
    {
      question: "Devo mencionar todos os meus empregos anteriores?",
      answer: "Inclua experiências relevantes dos últimos 10-15 anos. Trabalhos muito antigos ou irrelevantes podem ser omitidos para focar no que importa."
    }
  ];

  const relatedPosts = [
    "Como criar um CV profissional em Moçambique",
    "A importância da foto no currículo moçambicano",
    "Primeiro emprego: como montar um CV sem experiência"
  ];

  return (
    <BlogPost
      title="5 erros comuns que você deve evitar no seu CV"
      metaDescription="Descubra os principais erros que podem prejudicar seu currículo e como evitá-los para aumentar suas chances no mercado de trabalho moçambicano."
      author="Equipe MozVita"
      date="2024-06-06"
      readTime="6 min"
      category="Dicas de CV"
      content={content}
      faqs={faqs}
      relatedPosts={relatedPosts}
    />
  );
};

export default ErrosComuns;
