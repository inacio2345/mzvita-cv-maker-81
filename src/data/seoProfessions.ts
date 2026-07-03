export interface SEOProfession {
  slug: string;
  title: string;
  description: string;
  h1: string;
  keywords: string;
  recommendedTemplateId: string;
  tips: string[];
}

export const seoProfessions: SEOProfession[] = [
  {
    slug: 'engenheiro-civil',
    title: 'Modelo de CV para Engenheiro Civil em Moçambique | MozVita',
    description: 'Crie o seu Curriculum Vitae de Engenheiro Civil profissional para Moçambique. Destaque projetos, obras e ganhe vantagem nas empreitadas.',
    h1: 'Modelo de CV Profissional para Engenheiro Civil',
    keywords: 'cv engenheiro civil moçambique, curriculum vitae engenharia civil pdf, modelo de cv para construtoras, empreitadas cv',
    recommendedTemplateId: 'cv-diagonal-modern',
    tips: [
      'Destaque os principais projetos de construção civil em que participou (ex: Estradas, Pontes, Edifícios em Maputo, Beira, etc).',
      'Inclua as ferramentas de software que domina, como AutoCAD, Revit, MS Project.',
      'Mencione a sua inscrição na Ordem dos Engenheiros de Moçambique, se aplicável.'
    ]
  },
  {
    slug: 'bancario',
    title: 'Modelo de CV para Bancário e Finanças em Moçambique | MozVita',
    description: 'Baixe o modelo de CV ideal para o sector bancário em Moçambique. Impressione os maiores bancos (BIM, BCI, Standard Bank) com um perfil financeiro.',
    h1: 'CV para o Sector Bancário e Financeiro',
    keywords: 'cv bancário moçambique, curriculum vitae finanças, modelo cv para banco, emprego banco bim bci',
    recommendedTemplateId: 'cv-classico-elegante',
    tips: [
      'Utilize um formato clássico e conservador. Bancos valorizam a elegância e a sobriedade.',
      'Destaque a sua capacidade analítica, atenção aos detalhes e gestão de carteira de clientes.',
      'Se tiver experiência em ferramentas como Primavera, SAP, ou PHC, mencione-as.'
    ]
  },
  {
    slug: 'professor',
    title: 'Curriculum Vitae para Professor em Moçambique | MozVita',
    description: 'Crie um CV académico para escolas públicas ou privadas em Moçambique. Destaque a sua formação pedagógica e experiência letiva.',
    h1: 'Curriculum Vitae para Professores e Educadores',
    keywords: 'cv professor moçambique, curriculum vitae educação, cv para dar aulas, ministério da educação cv',
    recommendedTemplateId: 'cv-minimalist-clean',
    tips: [
      'Destaque o nível de ensino para o qual está habilitado (Primário, Secundário, Universitário).',
      'Inclua detalhes sobre a sua formação pedagógica e metodologias de ensino.',
      'Mencione as disciplinas que domina e experiência com plataformas de e-learning.'
    ]
  },
  {
    slug: 'estagio-sem-experiencia',
    title: 'Modelo de CV para Primeiro Emprego e Estágio | MozVita',
    description: 'Não tem experiência? Veja como fazer um CV para primeiro emprego ou estágio em Moçambique. Modelos gratuitos e dicas para recém-graduados.',
    h1: 'CV para Primeiro Emprego e Estágio',
    keywords: 'cv primeiro emprego moçambique, cv sem experiência, cv recém-graduado, estágio profissional moçambique',
    recommendedTemplateId: 'cv-classico-elegante',
    tips: [
      'Como não tem experiência profissional, foque-se na sua Formação Académica e Atividades Extracurriculares.',
      'Destaque os trabalhos de fim de curso ou projetos de investigação que desenvolveu.',
      'Realce as suas "Soft Skills" (Liderança, Trabalho em Equipa, Comunicação).'
    ]
  },
  {
    slug: 'saude-enfermeiro',
    title: 'Modelo de CV para Enfermeiros e Profissionais de Saúde | MozVita',
    description: 'Modelos de Curriculum Vitae para o sector da saúde em Moçambique. CVs ideais para hospitais, clínicas e ONGs.',
    h1: 'CV para Enfermeiros e Profissionais de Saúde',
    keywords: 'cv enfermeiro moçambique, cv saúde, currículo médico, cv hospital moçambique, misau emprego',
    recommendedTemplateId: 'cv-sidebar-professional',
    tips: [
      'Indique claramente a sua especialidade médica ou área de enfermagem.',
      'Mencione experiência em campanhas de saúde pública, trabalho com ONGs ou resposta a emergências.',
      'Não se esqueça de adicionar o seu número de carteira profissional.'
    ]
  },
  {
    slug: 'it-programador',
    title: 'CV para Programador e TI em Moçambique | MozVita',
    description: 'Crie o melhor CV para a área de Tecnologia da Informação (TI). Destaque as suas linguagens de programação e projetos.',
    h1: 'Curriculum Vitae para Programadores e TI',
    keywords: 'cv programador moçambique, cv ti, curriculum vitae informática, cv desenvolvedor maputo',
    recommendedTemplateId: 'cv-diagonal-modern',
    tips: [
      'Liste as linguagens de programação (ex: JavaScript, Python, PHP) e frameworks (React, Laravel) que domina.',
      'Se tiver um portfólio no GitHub ou projetos online, inclua o link no cabeçalho.',
      'Destaque certificações importantes como Cisco (CCNA), Microsoft, AWS, etc.'
    ]
  },
  {
    slug: 'funcao-publica',
    title: 'Modelo de CV para Ingresso na Função Pública Moçambique | MozVita',
    description: 'O formato ideal de Curriculum Vitae para os concursos públicos em Moçambique. Aprovado pelo padrão do Estado.',
    h1: 'CV para Concursos da Função Pública',
    keywords: 'cv função pública moçambique, modelo concurso público, curriculum vitae estado, cv ministério',
    recommendedTemplateId: 'cv-classico-elegante',
    tips: [
      'A Função Pública moçambicana exige formalidade. Use um design muito simples, de preferência o "Clássico Elegante".',
      'Anexe as informações essenciais como NUIT, BI e certificados autenticados conforme exigido no edital.',
      'Seja direto na experiência e cumpra os requisitos exatos pedidos na vaga do jornal.'
    ]
  }
];

export const getProfessionBySlug = (slug: string): SEOProfession | undefined => {
  return seoProfessions.find(p => p.slug === slug);
};
