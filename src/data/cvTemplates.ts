
export interface CVTemplate {
  id: string;
  nome: string;
  layout: string;
  foto_posicao: string;
  paleta: string;
  secoes: string[];
  colorPalette: {
    primary: string;
    secondary: string;
    accent: string;
    background?: string;
    text?: string;
  };
  fonts: {
    primary: string;
    headings: string;
  };
  layoutConfig: {
    type: string;
    sections: string[];
    columns?: {
      left?: string[];
      right?: string[];
    };
  };
  dados: {
    personalData: any;
    about: string;
    education: any[];
    experience: any[];
    skills: any;
    references?: any[];
  };
  canvaUrl?: string;
}

export const cvTemplates: CVTemplate[] = [
  {
    id: "cv01",
    nome: "Modelo Executivo Premium",
    layout: "sidebar_esquerda",
    foto_posicao: "esquerda_circular",
    paleta: "azul_executivo",
    secoes: ["foto", "contato", "skills", "idiomas", "perfil", "experiencia", "educacao"],
    canvaUrl: "https://www.canva.com/design/DAGpDei1yRQ/BygIKeaStwN18mdOoS3TYQ/view",
    colorPalette: {
      primary: "#1e3a8a",
      secondary: "#3b82f6",
      accent: "#fbbf24",
      background: "#ffffff",
      text: "#1f2937"
    },
    fonts: {
      primary: "Inter",
      headings: "Poppins"
    },
    layoutConfig: {
      type: "duas_colunas",
      sections: ["foto", "contato", "skills", "idiomas", "perfil", "experiencia", "educacao"],
      columns: {
        left: ["foto", "contato", "skills", "idiomas"],
        right: ["perfil", "experiencia", "educacao"]
      }
    },
    dados: {
      personalData: {
        fullName: "João Silva Santos",
        profession: "Gestor Executivo",
        email: "joao.santos@email.com",
        phone: "+258 84 123 4567",
        address: "Maputo, Moçambique",
        website: "linkedin.com/in/joaosantos"
      },
      about: "Executivo sénior com mais de 10 anos de experiência em liderança empresarial e gestão estratégica.",
      education: [
        {
          degree: "MBA em Gestão Empresarial",
          institution: "Universidade Eduardo Mondlane",
          startYear: "2018",
          endYear: "2020"
        }
      ],
      experience: [
        {
          position: "Director Executivo",
          company: "Empresa Moçambicana Lda",
          startDate: "Jan 2020",
          endDate: "Presente",
          current: true,
          description: "Liderança estratégica e gestão operacional completa da organização."
        }
      ],
      skills: {
        technical: ["Gestão Estratégica", "Liderança", "Análise Financeira", "Planejamento"],
        soft: ["Comunicação", "Negociação", "Visão Estratégica", "Inovação"]
      }
    }
  },
  {
    id: "cv02",
    nome: "Modelo Criativo Moderno",
    layout: "criativo_colorido",
    foto_posicao: "topo_central",
    paleta: "verde_criativo",
    secoes: ["foto", "perfil", "experiencia", "educacao", "skills_visual"],
    canvaUrl: "https://www.canva.com/design/DAGpDfzeXTg/tGUHKXZS1IserDD8MJbFGw/view",
    colorPalette: {
      primary: "#059669",
      secondary: "#10b981",
      accent: "#fbbf24",
      background: "#f0fdf4",
      text: "#065f46"
    },
    fonts: {
      primary: "Nunito",
      headings: "Montserrat"
    },
    layoutConfig: {
      type: "criativo_vertical",
      sections: ["foto", "perfil", "experiencia", "educacao", "skills_visual"]
    },
    dados: {
      personalData: {
        fullName: "Maria Fernanda Costa",
        profession: "Designer Gráfica",
        email: "maria.costa@design.com",
        phone: "+258 87 987 6543",
        address: "Beira, Moçambique",
        website: "behance.net/mariafernanda"
      },
      about: "Designer criativa especializada em branding e identidade visual com foco em soluções inovadoras.",
      education: [
        {
          degree: "Licenciatura em Design Gráfico",
          institution: "Instituto Superior de Artes",
          startYear: "2018",
          endYear: "2022"
        }
      ],
      experience: [
        {
          position: "Designer Sénior",
          company: "Agência Criativa Moz",
          startDate: "Mar 2022",
          endDate: "Presente",
          current: true,
          description: "Criação de identidades visuais e campanhas publicitárias para clientes nacionais."
        }
      ],
      skills: {
        technical: ["Adobe Creative Suite", "Figma", "Branding", "UI/UX Design"],
        soft: ["Criatividade", "Comunicação Visual", "Pensamento Crítico", "Inovação"]
      }
    }
  },
  {
    id: "cv03",
    nome: "Modelo Minimalista Clean",
    layout: "minimalista_limpo",
    foto_posicao: "esquerda_quadrada",
    paleta: "cinza_minimalista",
    secoes: ["foto", "dados_pessoais", "experiencia", "educacao", "competencias"],
    canvaUrl: "https://www.canva.com/design/DAGpDfOD3q4/chRZEyg_aUgvbO-WTtQQfA/view",
    colorPalette: {
      primary: "#374151",
      secondary: "#6b7280",
      accent: "#f59e0b",
      background: "#ffffff",
      text: "#111827"
    },
    fonts: {
      primary: "Source Sans Pro",
      headings: "Roboto"
    },
    layoutConfig: {
      type: "minimalista",
      sections: ["foto", "dados_pessoais", "experiencia", "educacao", "competencias"]
    },
    dados: {
      personalData: {
        fullName: "Carlos Manuel Sitoe",
        profession: "Analista de Sistemas",
        email: "carlos.sitoe@tech.com",
        phone: "+258 86 111 2233",
        address: "Nampula, Moçambique",
        website: "github.com/carlossitoe"
      },
      about: "Profissional de TI especializado em análise de sistemas e desenvolvimento de soluções tecnológicas.",
      education: [
        {
          degree: "Engenharia Informática",
          institution: "Universidade Católica de Moçambique",
          startYear: "2017",
          endYear: "2021"
        }
      ],
      experience: [
        {
          position: "Analista de Sistemas",
          company: "TechMoz Solutions",
          startDate: "Jan 2022",
          endDate: "Presente",
          current: true,
          description: "Análise e desenvolvimento de sistemas empresariais usando tecnologias modernas."
        }
      ],
      skills: {
        technical: ["Java", "Spring Boot", "SQL", "Git", "Agile"],
        soft: ["Resolução de Problemas", "Trabalho em Equipa", "Comunicação Técnica"]
      }
    }
  },
  {
    id: "cv04",
    nome: "Modelo Profissional Corporativo",
    layout: "corporativo_tradicional",
    foto_posicao: "topo_esquerda",
    paleta: "azul_corporativo",
    secoes: ["cabecalho_foto", "resumo", "experiencia_detalhada", "formacao", "certificacoes"],
    canvaUrl: "https://www.canva.com/design/DAGpDWqo6nc/7epmrCS59CaeumjLrCZwng/view",
    colorPalette: {
      primary: "#1e40af",
      secondary: "#3b82f6",
      accent: "#dc2626",
      background: "#f8fafc",
      text: "#1e293b"
    },
    fonts: {
      primary: "Open Sans",
      headings: "Lato"
    },
    layoutConfig: {
      type: "corporativo",
      sections: ["cabecalho_foto", "resumo", "experiencia_detalhada", "formacao", "certificacoes"]
    },
    dados: {
      personalData: {
        fullName: "Ana Sofia Macamo",
        profession: "Gestora de Recursos Humanos",
        email: "ana.macamo@rh.com",
        phone: "+258 84 777 8888",
        address: "Maputo, Moçambique",
        website: "linkedin.com/in/anasofia"
      },
      about: "Gestora de RH experiente com foco em desenvolvimento de talentos e cultura organizacional.",
      education: [
        {
          degree: "Licenciatura em Psicologia",
          institution: "Universidade Eduardo Mondlane",
          startYear: "2015",
          endYear: "2019"
        }
      ],
      experience: [
        {
          position: "Gestora de RH",
          company: "Grupo Empresarial",
          startDate: "Mai 2020",
          endDate: "Presente",
          current: true,
          description: "Gestão completa do departamento de recursos humanos e desenvolvimento organizacional."
        }
      ],
      skills: {
        technical: ["Gestão de Pessoas", "Recrutamento", "Avaliação de Desempenho", "Legislação Laboral"],
        soft: ["Liderança", "Empatia", "Comunicação", "Negociação"]
      }
    }
  },
  {
    id: "cv05",
    nome: "Modelo Elegante Premium",
    layout: "elegante_sofisticado",
    foto_posicao: "direita_circular",
    paleta: "dourado_elegante",
    secoes: ["header_elegante", "sobre", "trajetoria", "formacao_premium", "distincoes"],
    canvaUrl: "https://www.canva.com/design/DAGpDV5eSUU/WaepU_svQ6_PtBtMofOqPQ/view",
    colorPalette: {
      primary: "#92400e",
      secondary: "#d97706",
      accent: "#fbbf24",
      background: "#fffbeb",
      text: "#78350f"
    },
    fonts: {
      primary: "Crimson Text",
      headings: "Playfair Display"
    },
    layoutConfig: {
      type: "elegante",
      sections: ["header_elegante", "sobre", "trajetoria", "formacao_premium", "distincoes"]
    },
    dados: {
      personalData: {
        fullName: "Dr. Fernando Chissano",
        profession: "Consultor Empresarial",
        email: "fernando.chissano@consultoria.com",
        phone: "+258 82 555 7890",
        address: "Maputo, Moçambique",
        website: "fernandochissano.com"
      },
      about: "Consultor empresarial sénior com vasta experiência em transformação organizacional e estratégia.",
      education: [
        {
          degree: "Doutoramento em Gestão",
          institution: "ISCTEM",
          startYear: "2018",
          endYear: "2022"
        }
      ],
      experience: [
        {
          position: "Consultor Sénior",
          company: "Consultoria Estratégica",
          startDate: "Jan 2019",
          endDate: "Presente",
          current: true,
          description: "Consultoria estratégica para empresas de grande porte em transformação digital."
        }
      ],
      skills: {
        technical: ["Estratégia Empresarial", "Transformação Digital", "Gestão de Mudança"],
        soft: ["Liderança Executiva", "Visão Estratégica", "Comunicação Executiva"]
      }
    }
  },
  {
    id: "cv06",
    nome: "Modelo Tech Inovador",
    layout: "tech_moderno",
    foto_posicao: "lateral_hexagonal",
    paleta: "roxo_tech",
    secoes: ["header_tech", "skills_tech", "projetos", "experiencia_tech", "educacao_tech"],
    canvaUrl: "https://www.canva.com/design/DAGpDa2QcWg/oAzlosPfUhQEnvNdHL8FCQ/view",
    colorPalette: {
      primary: "#7c3aed",
      secondary: "#a855f7",
      accent: "#06b6d4",
      background: "#faf5ff",
      text: "#581c87"
    },
    fonts: {
      primary: "JetBrains Mono",
      headings: "Space Grotesk"
    },
    layoutConfig: {
      type: "tech_grid",
      sections: ["header_tech", "skills_tech", "projetos", "experiencia_tech", "educacao_tech"]
    },
    dados: {
      personalData: {
        fullName: "Tomás Nguenha",
        profession: "Desenvolvedor Full Stack",
        email: "tomas.nguenha@dev.com",
        phone: "+258 87 123 9876",
        address: "Maputo, Moçambique",
        website: "github.com/tomasnguenha"
      },
      about: "Desenvolvedor apaixonado por tecnologia, especializado em soluções web modernas e escaláveis.",
      education: [
        {
          degree: "Engenharia de Software",
          institution: "Universidade Eduardo Mondlane",
          startYear: "2018",
          endYear: "2022"
        }
      ],
      experience: [
        {
          position: "Full Stack Developer",
          company: "Tech Startup Moz",
          startDate: "Jun 2022",
          endDate: "Presente",
          current: true,
          description: "Desenvolvimento de aplicações web usando React, Node.js e tecnologias cloud."
        }
      ],
      skills: {
        technical: ["React", "Node.js", "TypeScript", "MongoDB", "AWS", "Docker"],
        soft: ["Problem Solving", "Teamwork", "Continuous Learning", "Innovation"]
      }
    }
  },
  {
    id: "cv07",
    nome: "Modelo Académico Formal",
    layout: "academico_formal",
    foto_posicao: "topo_centro",
    paleta: "verde_academico",
    secoes: ["header_academico", "formacao_detalhada", "investigacao", "publicacoes", "experiencia_ensino"],
    canvaUrl: "https://www.canva.com/design/DAGpDTi1RXU/DEloL6WiM_0JUuGH3fx4eA/view",
    colorPalette: {
      primary: "#065f46",
      secondary: "#059669",
      accent: "#d97706",
      background: "#f0fdfa",
      text: "#064e3b"
    },
    fonts: {
      primary: "Georgia",
      headings: "Times New Roman"
    },
    layoutConfig: {
      type: "academico",
      sections: ["header_academico", "formacao_detalhada", "investigacao", "publicacoes", "experiencia_ensino"]
    },
    dados: {
      personalData: {
        fullName: "Dra. Mariana Cumbe",
        profession: "Investigadora Científica",
        email: "mariana.cumbe@universidade.ac.mz",
        phone: "+258 84 999 1111",
        address: "Maputo, Moçambique",
        website: "researchgate.net/profile/mariana-cumbe"
      },
      about: "Investigadora dedicada com foco em biotecnologia e desenvolvimento sustentável em África.",
      education: [
        {
          degree: "Doutoramento em Biotecnologia",
          institution: "Universidade Eduardo Mondlane",
          startYear: "2019",
          endYear: "2023"
        }
      ],
      experience: [
        {
          position: "Investigadora Sénior",
          company: "Centro de Biotecnologia",
          startDate: "Jan 2024",
          endDate: "Presente",
          current: true,
          description: "Liderança de projectos de investigação em biotecnologia aplicada à agricultura."
        }
      ],
      skills: {
        technical: ["Biotecnologia", "Investigação Científica", "Análise de Dados", "Metodologia"],
        soft: ["Pensamento Crítico", "Escrita Científica", "Apresentação", "Colaboração"]
      }
    }
  },
  {
    id: "cv08",
    nome: "Modelo Comercial Dinâmico",
    layout: "comercial_vendas",
    foto_posicao: "esquerda_destaque",
    paleta: "laranja_comercial",
    secoes: ["header_comercial", "resultados", "experiencia_vendas", "competencias_comerciais", "formacao"],
    canvaUrl: "https://www.canva.com/design/DAGpDdRLq4Q/XKvpwjiBGdqVtnPR-4MW5Q/view",
    colorPalette: {
      primary: "#ea580c",
      secondary: "#fb923c",
      accent: "#facc15",
      background: "#fff7ed",
      text: "#9a3412"
    },
    fonts: {
      primary: "Roboto",
      headings: "Oswald"
    },
    layoutConfig: {
      type: "comercial",
      sections: ["header_comercial", "resultados", "experiencia_vendas", "competencias_comerciais", "formacao"]
    },
    dados: {
      personalData: {
        fullName: "Pedro Macuácua",
        profession: "Gestor Comercial",
        email: "pedro.macuacua@vendas.com",
        phone: "+258 86 777 2222",
        address: "Beira, Moçambique",
        website: "linkedin.com/in/pedromacuacua"
      },
      about: "Gestor comercial experiente com histórico comprovado de superação de metas e liderança de equipas.",
      education: [
        {
          degree: "Licenciatura em Marketing",
          institution: "ISCTEM",
          startYear: "2016",
          endYear: "2020"
        }
      ],
      experience: [
        {
          position: "Gestor Comercial",
          company: "Empresa de Distribuição",
          startDate: "Mar 2021",
          endDate: "Presente",
          current: true,
          description: "Gestão de equipa comercial e desenvolvimento de estratégias de vendas regionais."
        }
      ],
      skills: {
        technical: ["Gestão de Vendas", "CRM", "Análise de Mercado", "Negociação"],
        soft: ["Liderança", "Persuasão", "Relacionamento", "Orientação para Resultados"]
      }
    }
  },
  {
    id: "cv09",
    nome: "Modelo Criativo Artístico",
    layout: "artistico_portfolio",
    foto_posicao: "integrada_design",
    paleta: "multicolor_artistico",
    secoes: ["header_artistico", "portfolio", "experiencia_criativa", "skills_artisticas", "educacao_arte"],
    canvaUrl: "https://www.canva.com/design/DAGpDTk-qIg/NjoAxOuqfZihmD8FtNZBLQ/view",
    colorPalette: {
      primary: "#db2777",
      secondary: "#f472b6",
      accent: "#06b6d4",
      background: "#fdf2f8",
      text: "#831843"
    },
    fonts: {
      primary: "Dancing Script",
      headings: "Pacifico"
    },
    layoutConfig: {
      type: "artistico",
      sections: ["header_artistico", "portfolio", "experiencia_criativa", "skills_artisticas", "educacao_arte"]
    },
    dados: {
      personalData: {
        fullName: "Beatriz Cossa",
        profession: "Artista & Ilustradora",
        email: "beatriz.cossa@arte.com",
        phone: "+258 87 444 5555",
        address: "Maputo, Moçambique",
        website: "behance.net/beatrizcossa"
      },
      about: "Artista visual especializada em ilustração digital e design de personagens com inspiração africana.",
      education: [
        {
          degree: "Licenciatura em Belas Artes",
          institution: "Instituto Superior de Artes",
          startYear: "2017",
          endYear: "2021"
        }
      ],
      experience: [
        {
          position: "Ilustradora Freelancer",
          company: "Trabalho Independente",
          startDate: "Jan 2022",
          endDate: "Presente",
          current: true,
          description: "Criação de ilustrações para livros infantis, campanhas publicitárias e projetos culturais."
        }
      ],
      skills: {
        technical: ["Ilustração Digital", "Adobe Illustrator", "Photoshop", "Procreate"],
        soft: ["Criatividade", "Storytelling Visual", "Interpretação Cultural", "Inovação"]
      }
    }
  },
  {
    id: "cv10",
    nome: "Modelo Consultor Especialista",
    layout: "consultor_especialista",
    foto_posicao: "direita_profissional",
    paleta: "azul_consultor",
    secoes: ["header_consultor", "especializacoes", "clientes", "resultados", "credenciais"],
    canvaUrl: "https://www.canva.com/design/DAGpDU7JXQg/sENHF9gfc9ulXEMKCbPiAA/view",
    colorPalette: {
      primary: "#1e40af",
      secondary: "#3b82f6",
      accent: "#10b981",
      background: "#f8fafc",
      text: "#1e293b"
    },
    fonts: {
      primary: "Inter",
      headings: "Merriweather"
    },
    layoutConfig: {
      type: "consultor",
      sections: ["header_consultor", "especializacoes", "clientes", "resultados", "credenciais"]
    },
    dados: {
      personalData: {
        fullName: "Eng. Ricardo Manhiça",
        profession: "Consultor em Engenharia",
        email: "ricardo.manhica@consultoria.mz",
        phone: "+258 84 333 4444",
        address: "Maputo, Moçambique",
        website: "ricardomanhica.consulting"
      },
      about: "Consultor especialista em engenharia civil e gestão de projectos de infraestrutura em Moçambique.",
      education: [
        {
          degree: "Mestrado em Engenharia Civil",
          institution: "Universidade Eduardo Mondlane",
          startYear: "2015",
          endYear: "2017"
        }
      ],
      experience: [
        {
          position: "Consultor Sénior",
          company: "Consultoria Independente",
          startDate: "Jan 2018",
          endDate: "Presente",
          current: true,
          description: "Consultoria em projectos de infraestrutura e supervisão de obras públicas."
        }
      ],
      skills: {
        technical: ["Gestão de Projectos", "AutoCAD", "Análise Estrutural", "Orçamentação"],
        soft: ["Liderança Técnica", "Comunicação com Clientes", "Resolução de Problemas", "Planeamento"]
      }
    }
  }
];

export const getTemplateById = (id: string): CVTemplate | undefined => {
  return cvTemplates.find(template => template.id === id);
};

export const getRandomTemplates = (count: number = 4): CVTemplate[] => {
  const shuffled = [...cvTemplates].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const getDefaultTemplate = (): CVTemplate => {
  return cvTemplates[0]; // Primeiro modelo como padrão
};
