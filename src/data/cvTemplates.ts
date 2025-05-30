
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
}

export const cvTemplates: CVTemplate[] = [
  {
    id: "cv01",
    nome: "CV Profissional com Sidebar Escura",
    layout: "sidebar_esquerda",
    foto_posicao: "esquerda_circular",
    paleta: "azul_profissional",
    secoes: ["foto", "contato", "skills", "idiomas", "perfil", "experiencia", "educacao"],
    colorPalette: {
      primary: "#003366",
      secondary: "#0066CC",
      accent: "#FFD700",
      background: "#FFFFFF",
      text: "#333333"
    },
    fonts: {
      primary: "Open Sans",
      headings: "Roboto Slab"
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
        fullName: "Ana Sofia Macamo",
        profession: "Gestora de Recursos Humanos",
        email: "ana.macamo@email.com",
        phone: "+258 84 123 4567",
        address: "Maputo, Moçambique",
        website: "linkedin.com/in/anamacamo"
      },
      about: "Profissional experiente em gestão de recursos humanos com mais de 7 anos de experiência. Especializada em recrutamento, seleção e desenvolvimento de talentos.",
      education: [
        {
          degree: "Licenciatura em Psicologia",
          institution: "Universidade Eduardo Mondlane",
          startYear: "2014",
          endYear: "2018"
        }
      ],
      experience: [
        {
          position: "Gestora de RH",
          company: "Empresa Moçambicana Lda",
          startDate: "Jan 2019",
          endDate: "Presente",
          current: true,
          description: "Gestão completa do departamento de recursos humanos. Recrutamento e seleção de candidatos."
        }
      ],
      skills: {
        technical: ["Gestão de Pessoas", "Recrutamento", "Excel", "SAP"],
        soft: ["Liderança", "Comunicação", "Empatia", "Negociação"]
      }
    }
  },
  {
    id: "cv02",
    nome: "CV Minimalista Timeline",
    layout: "uma_coluna_timeline",
    foto_posicao: "topo_central",
    paleta: "minimalista_verde",
    secoes: ["foto", "perfil", "timeline_experiencia", "educacao", "skills_grafico"],
    colorPalette: {
      primary: "#2C7A7B",
      secondary: "#319795",
      accent: "#4FD1C7",
      background: "#F7FAFC",
      text: "#2D3748"
    },
    fonts: {
      primary: "Lato",
      headings: "Montserrat"
    },
    layoutConfig: {
      type: "uma_coluna",
      sections: ["foto", "perfil", "linha_cronologica_experiencia", "educacao", "skills_grafico"]
    },
    dados: {
      personalData: {
        fullName: "Carlos Manuel Sitoe",
        profession: "Desenvolvedor Full Stack",
        email: "carlos.sitoe@gmail.com",
        phone: "+258 87 987 6543",
        address: "Beira, Moçambique",
        website: "github.com/carlossitoe"
      },
      about: "Desenvolvedor apaixonado por tecnologia, especializado em React e Node.js. Focado em criar soluções inovadoras e escaláveis.",
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
          position: "Senior Developer",
          company: "TechMoz Solutions",
          startDate: "Mar 2022",
          endDate: "Presente",
          current: true,
          description: "Desenvolvimento de aplicações web usando React, Node.js e MongoDB."
        }
      ],
      skills: {
        technical: ["React", "Node.js", "MongoDB", "TypeScript", "AWS"],
        soft: ["Resolução de Problemas", "Trabalho em Equipa", "Criatividade"]
      }
    }
  },
  {
    id: "cv03",
    nome: "CV Executivo Clean",
    layout: "executivo_clean",
    foto_posicao: "sem_foto",
    paleta: "executivo_cinza",
    secoes: ["cabecalho", "resumo_executivo", "conquistas", "experiencia", "educacao"],
    colorPalette: {
      primary: "#1A202C",
      secondary: "#2D3748",
      accent: "#4A5568",
      background: "#FFFFFF",
      text: "#2D3748"
    },
    fonts: {
      primary: "Georgia",
      headings: "Arial"
    },
    layoutConfig: {
      type: "executivo",
      sections: ["cabecalho", "resumo_executivo", "conquistas", "experiencia", "educacao"]
    },
    dados: {
      personalData: {
        fullName: "Dr. Fernando Chissano",
        profession: "Director Executivo",
        email: "fernando.chissano@empresa.com",
        phone: "+258 84 777 8888",
        address: "Maputo, Moçambique",
        website: "linkedin.com/in/fernandochissano"
      },
      about: "Executivo sénior com mais de 15 anos de experiência em liderança empresarial e transformação digital.",
      education: [
        {
          degree: "MBA em Gestão Empresarial",
          institution: "ISCTEM",
          startYear: "2015",
          endYear: "2017"
        }
      ],
      experience: [
        {
          position: "Director Executivo",
          company: "Grupo Empresarial Moçambicano",
          startDate: "Jan 2018",
          endDate: "Presente",
          current: true,
          description: "Liderança estratégica da organização. Crescimento de receita em 300% nos últimos 5 anos."
        }
      ],
      skills: {
        technical: ["Gestão Estratégica", "Transformação Digital", "Análise Financeira"],
        soft: ["Liderança", "Visão Estratégica", "Negociação"]
      }
    }
  },
  {
    id: "cv04",
    nome: "CV Criativo Designer",
    layout: "criativo_horizontal",
    foto_posicao: "grande_lateral",
    paleta: "criativo_colorido",
    secoes: ["foto_grande", "sobre_criativo", "portfolio", "skills_visuais", "experiencia"],
    colorPalette: {
      primary: "#E53E3E",
      secondary: "#DD6B20",
      accent: "#D69E2E",
      background: "#FFFAF0",
      text: "#1A202C"
    },
    fonts: {
      primary: "Nunito",
      headings: "Playfair Display"
    },
    layoutConfig: {
      type: "criativo_horizontal",
      sections: ["foto_grande", "sobre_criativo", "portfolio", "skills_visuais", "experiencia"]
    },
    dados: {
      personalData: {
        fullName: "Mariana Cumbe",
        profession: "Designer Gráfica & UI/UX",
        email: "mariana.cumbe@design.com",
        phone: "+258 82 555 7890",
        address: "Maputo, Moçambique",
        website: "behance.net/marianacumbe"
      },
      about: "Designer criativa especializada em branding e experiência do usuário. Apaixonada por criar designs que conectam marcas às pessoas.",
      education: [
        {
          degree: "Design Gráfico",
          institution: "Instituto Superior de Artes",
          startYear: "2018",
          endYear: "2022"
        }
      ],
      experience: [
        {
          position: "UI/UX Designer",
          company: "Agência Criativa Moz",
          startDate: "Mai 2022",
          endDate: "Presente",
          current: true,
          description: "Criação de interfaces digitais e identidades visuais para startups moçambicanas."
        }
      ],
      skills: {
        technical: ["Figma", "Adobe Creative Suite", "Sketch", "Prototyping"],
        soft: ["Criatividade", "Pensamento Visual", "Comunicação"]
      }
    }
  },
  {
    id: "cv05",
    nome: "CV Moderno Grid",
    layout: "moderno_grid",
    foto_posicao: "grid_destaque",
    paleta: "moderno_azul",
    secoes: ["header_moderno", "skills_cards", "experiencia_cards", "educacao_grid"],
    colorPalette: {
      primary: "#3182CE",
      secondary: "#2B6CB0",
      accent: "#63B3ED",
      background: "#F7FAFC",
      text: "#2D3748"
    },
    fonts: {
      primary: "Inter",
      headings: "Poppins"
    },
    layoutConfig: {
      type: "grid_moderno",
      sections: ["header_moderno", "skills_cards", "experiencia_cards", "educacao_grid"]
    },
    dados: {
      personalData: {
        fullName: "Tomás Nguenha",
        profession: "Product Manager",
        email: "tomas.nguenha@tech.com",
        phone: "+258 86 111 2233",
        address: "Nampula, Moçambique",
        website: "linkedin.com/in/tomasnguenha"
      },
      about: "Product Manager experiente em produtos digitais, com foco em growth e experiência do usuário.",
      education: [
        {
          degree: "Gestão de Empresas",
          institution: "Universidade Eduardo Mondlane",
          startYear: "2016",
          endYear: "2020"
        }
      ],
      experience: [
        {
          position: "Senior Product Manager",
          company: "Startup Moçambicana",
          startDate: "Jan 2021",
          endDate: "Presente",
          current: true,
          description: "Gestão de roadmap de produto e coordenação de equipas multidisciplinares."
        }
      ],
      skills: {
        technical: ["Product Strategy", "Analytics", "Figma", "SQL"],
        soft: ["Liderança", "Comunicação", "Pensamento Analítico"]
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
