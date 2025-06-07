
import React from 'react';
import BlogPost from '@/components/blog/BlogPost';

const FotoNoCurriculo = () => {
  const content = (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Introdução</h2>
      <p className="mb-6 text-gray-700 leading-relaxed">
        A decisão de incluir foto no currículo em Moçambique é uma questão importante que pode influenciar significativamente o processo de seleção. Compreender quando, como e por que incluir uma foto profissional no seu CV é fundamental para causar a melhor impressão possível aos recrutadores moçambicanos.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Foto no Currículo: Realidade Moçambicana</h2>
      <p className="mb-4 text-gray-700">
        Em Moçambique, incluir foto no currículo é uma prática amplamente aceita e, em muitos casos, esperada pelos empregadores. Diferentemente de alguns países onde isso pode ser considerado discriminatório, no contexto moçambicano a foto é vista como uma forma de apresentação pessoal.
      </p>

      <h3 className="text-xl font-semibold text-gray-900 mb-3">Por que os Empregadores Valorizam a Foto?</h3>
      <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
        <li>Facilita a identificação durante entrevistas</li>
        <li>Demonstra cuidado com a apresentação pessoal</li>
        <li>Cria conexão visual com o candidato</li>
        <li>É uma expectativa cultural estabelecida</li>
        <li>Ajuda na memorização do candidato</li>
      </ul>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Quando Incluir Foto no Currículo</h2>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-3">Áreas que Recomendam Foto</h3>
      <p className="mb-4 text-gray-700">
        Algumas profissões valorizam especialmente a apresentação visual:
      </p>
      <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
        <li><strong>Atendimento ao cliente:</strong> Vendas, recepção, telemarketing</li>
        <li><strong>Hotelaria e turismo:</strong> Hotéis, restaurantes, agências</li>
        <li><strong>Educação:</strong> Professores, coordenadores, diretores</li>
        <li><strong>Saúde:</strong> Médicos, enfermeiros, técnicos</li>
        <li><strong>Administração:</strong> Assistentes, secretários, gestores</li>
        <li><strong>Segurança:</strong> Vigilantes, seguranças, porteiros</li>
      </ul>

      <h3 className="text-xl font-semibold text-gray-900 mb-3">Áreas Onde a Foto é Opcional</h3>
      <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
        <li><strong>Tecnologia:</strong> Programadores, analistas de sistemas</li>
        <li><strong>Engenharia:</strong> Engenheiros, técnicos especializados</li>
        <li><strong>Pesquisa:</strong> Investigadores, cientistas</li>
        <li><strong>Construção civil:</strong> Pedreiros, carpinteiros (dependendo da função)</li>
      </ul>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Como Tirar a Foto Profissional Perfeita</h2>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-3">Características Essenciais</h3>
      <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
        <li><strong>Qualidade:</strong> Alta resolução, sem pixelação</li>
        <li><strong>Fundo:</strong> Neutro (branco, cinza claro ou azul claro)</li>
        <li><strong>Iluminação:</strong> Natural e bem distribuída</li>
        <li><strong>Enquadramento:</strong> Do peito para cima, centralizado</li>
        <li><strong>Expressão:</strong> Sorriso discreto e olhar direto</li>
      </ul>

      <h3 className="text-xl font-semibold text-gray-900 mb-3">Vestimenta Adequada</h3>
      <p className="mb-4 text-gray-700">
        A escolha da roupa deve refletir o ambiente profissional da área:
      </p>
      <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
        <li><strong>Áreas corporativas:</strong> Camisa social, blazer ou fato</li>
        <li><strong>Área da saúde:</strong> Jaleco ou roupa social</li>
        <li><strong>Educação:</strong> Roupa social ou semi-formal</li>
        <li><strong>Atendimento:</strong> Uniforme da empresa ou roupa social</li>
        <li><strong>Áreas técnicas:</strong> Camisa polo ou social simples</li>
      </ul>

      <h3 className="text-xl font-semibold text-gray-900 mb-3">Dicas de Postura e Expressão</h3>
      <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
        <li>Mantenha postura ereta e ombros relaxados</li>
        <li>Olhe diretamente para a câmera</li>
        <li>Sorria de forma natural e discreta</li>
        <li>Evite acessórios chamativos</li>
        <li>Mantenha cabelo arrumado e bem cuidado</li>
      </ul>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Erros Comuns com Fotos no CV</h2>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-3">Erros de Qualidade Técnica</h3>
      <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
        <li>Fotos tiradas com celular em baixa resolução</li>
        <li>Iluminação inadequada (muito escura ou clara)</li>
        <li>Fundo bagunçado ou inadequado</li>
        <li>Foto cortada incorretamente</li>
        <li>Imagem desfocada ou tremida</li>
      </ul>

      <h3 className="text-xl font-semibold text-gray-900 mb-3">Erros de Apresentação</h3>
      <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
        <li>Usar fotos de redes sociais ou festas</li>
        <li>Vestimentas inadequadas para a profissão</li>
        <li>Expressão muito séria ou artificial</li>
        <li>Acessórios excessivos ou inadequados</li>
        <li>Foto muito antiga (mais de 2 anos)</li>
      </ul>

      <h3 className="text-xl font-semibold text-gray-900 mb-3">Erros de Posicionamento no CV</h3>
      <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
        <li>Foto muito grande (deve ocupar máximo 15% do CV)</li>
        <li>Posicionamento inadequado (sempre no canto superior)</li>
        <li>Foto que dificulta a leitura do texto</li>
        <li>Múltiplas fotos no mesmo CV</li>
      </ul>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Alternativas para Fotos Profissionais</h2>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-3">Opções Econômicas</h3>
      <p className="mb-4 text-gray-700">
        Para quem não pode pagar um fotógrafo profissional:
      </p>
      <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
        <li>Peça ajuda a um amigo com boa câmera</li>
        <li>Use luz natural próximo a uma janela</li>
        <li>Improvise um fundo com lençol branco</li>
        <li>Use aplicativos para melhorar a qualidade</li>
        <li>Pratique poses e expressões no espelho</li>
      </ul>

      <h3 className="text-xl font-semibold text-gray-900 mb-3">Estúdios Acessíveis</h3>
      <p className="mb-6 text-gray-700">
        Muitas cidades moçambicanas têm estúdios que oferecem "fotos 3x4 profissionais" por preços acessíveis. Procure referências e compare preços antes de escolher.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Aspectos Legais e Éticos</h2>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-3">Discriminação e Direitos</h3>
      <p className="mb-4 text-gray-700">
        Embora a foto seja aceita em Moçambique, é importante conhecer seus direitos:
      </p>
      <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
        <li>Ninguém pode ser discriminado por aparência física</li>
        <li>A competência deve ser o critério principal</li>
        <li>Você tem direito de não incluir foto se preferir</li>
        <li>Recrutadores éticos valorizam qualificações acima da aparência</li>
      </ul>

      <h3 className="text-xl font-semibold text-gray-900 mb-3">Quando Não Incluir Foto</h3>
      <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
        <li>Se a empresa explicitamente pedir CV sem foto</li>
        <li>Para vagas internacionais ou empresas estrangeiras</li>
        <li>Se você não se sente confortável</li>
        <li>Para posições que valorizam apenas competências técnicas</li>
      </ul>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Impacto da Foto na Seleção</h2>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-3">Primeiras Impressões</h3>
      <p className="mb-4 text-gray-700">
        Uma foto profissional pode transmitir:
      </p>
      <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
        <li>Seriedade e comprometimento</li>
        <li>Cuidado com detalhes</li>
        <li>Profissionalismo</li>
        <li>Confiabilidade</li>
        <li>Adequação à cultura empresarial</li>
      </ul>

      <h3 className="text-xl font-semibold text-gray-900 mb-3">Estatísticas e Dados</h3>
      <p className="mb-6 text-gray-700">
        Estudos indicam que CVs com fotos profissionais adequadas têm 30% mais chances de serem selecionados para entrevistas em Moçambique, especialmente em áreas de atendimento e vendas.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">Conclusão</h2>
      <p className="mb-6 text-gray-700 leading-relaxed">
        A foto no currículo moçambicano é uma ferramenta importante quando usada corretamente. Investir em uma imagem profissional de qualidade pode fazer a diferença na sua candidatura. Lembre-se: a foto deve complementar suas qualificações, não substituí-las. Uma apresentação cuidadosa demonstra respeito pelo processo seletivo e pela oportunidade.
      </p>
    </div>
  );

  const faqs = [
    {
      question: "É obrigatório colocar foto no CV em Moçambique?",
      answer: "Não é obrigatório por lei, mas é uma prática amplamente aceita e esperada na maioria das empresas moçambicanas. Recomenda-se incluir uma foto profissional para melhorar suas chances."
    },
    {
      question: "Qual o tamanho ideal da foto no currículo?",
      answer: "A foto deve ocupar cerca de 10-15% do espaço total do CV, aproximadamente 3x4 cm ou 4x5 cm. Deve estar posicionada no canto superior direito ou esquerdo do documento."
    },
    {
      question: "Posso usar foto do celular para o CV?",
      answer: "Pode, desde que tenha boa qualidade, iluminação adequada e fundo neutro. O importante é que a imagem seja nítida e profissional, independente do equipamento usado."
    },
    {
      question: "Quanto custa uma foto profissional para CV?",
      answer: "Em Moçambique, uma sessão básica para foto de CV custa entre 500 a 1.500 MT, dependendo da cidade e estúdio. Muitos fotógrafos oferecem pacotes específicos para fotos de currículo."
    },
    {
      question: "Devo atualizar a foto do meu CV regularmente?",
      answer: "Sim, recomenda-se atualizar a foto a cada 2-3 anos ou sempre que houver mudanças significativas na aparência. A foto deve representar sua aparência atual."
    }
  ];

  const relatedPosts = [
    "Como criar um CV profissional em Moçambique",
    "5 erros comuns que você deve evitar no seu CV",
    "Como adaptar seu CV para diferentes áreas profissionais"
  ];

  return (
    <BlogPost
      title="A importância da foto no currículo moçambicano"
      metaDescription="Entenda quando e como incluir uma foto profissional no seu CV para causar boa impressão e se destacar no mercado de trabalho moçambicano."
      author="Equipe MozVita"
      date="2024-06-02"
      readTime="4 min"
      category="Dicas de CV"
      content={content}
      faqs={faqs}
      relatedPosts={relatedPosts}
    />
  );
};

export default FotoNoCurriculo;
