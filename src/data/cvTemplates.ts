
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
    nome: "CV Clássico com Foto à Esquerda",
    layout: "duas_colunas",
    foto_posicao: "esquerda",
    paleta: "cinza_claro",
    secoes: ["perfil", "experiencia", "educacao", "skills", "referencias"],
    colorPalette: {
      primary: "#6b7280",
      secondary: "#4b5563",
      accent: "#9ca3af"
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
      about: "Profissional experiente em gestão de recursos humanos com mais de 7 anos de experiência. Especializada em recrutamento, seleção e desenvolvimento de talentos. Forte capacidade de liderança e comunicação.",
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
          description: "Gestão completa do departamento de recursos humanos. Recrutamento e seleção de candidatos. Desenvolvimento de políticas internas."
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
    nome: "CV Profissional com Barra Lateral Escura",
    layout: "sidebar_esquerda",
    foto_posicao: "canto_superior_esquerdo",
    paleta: "azul_escuro",
    secoes: ["contato", "skills", "idiomas", "educacao", "experiencia"],
    colorPalette: {
      primary: "#1e3a8a",
      secondary: "#1e40af",
      accent: "#3b82f6"
    },
    dados: {
      personalData: {
        fullName: "Carlos Manuel Sitoe",
        profession: "Engenheiro de Software",
        email: "carlos.sitoe@email.com",
        phone: "+258 87 987 6543",
        address: "Beira, Moçambique",
        website: "github.com/carlossitoe"
      },
      about: "Engenheiro de software com expertise em desenvolvimento full-stack e arquitetura de sistemas. Apaixonado por tecnologias emergentes e soluções inovadoras.",
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
          position: "Senior Software Engineer",
          company: "TechMoz Solutions",
          startDate: "Mar 2022",
          endDate: "Presente",
          current: true,
          description: "Desenvolvimento de aplicações web e mobile. Liderança técnica de projetos. Implementação de arquiteturas escaláveis."
        }
      ],
      skills: {
        technical: ["JavaScript", "React", "Node.js", "Python", "AWS", "Docker"],
        soft: ["Resolução de Problemas", "Trabalho em Equipa", "Mentoria", "Inovação"]
      }
    }
  },
  {
    id: "cv03",
    nome: "CV Limpo com Linha Cronológica",
    layout: "uma_coluna",
    foto_posicao: "topo_central",
    paleta: "branco_e_preto",
    secoes: ["perfil", "linha_cronologica_experiencia", "educacao", "skills"],
    colorPalette: {
      primary: "#000000",
      secondary: "#374151",
      accent: "#6b7280"
    },
    dados: {
      personalData: {
        fullName: "Mariana Cumbe",
        profession: "Arquitecta",
        email: "mariana.cumbe@email.com",
        phone: "+258 82 555 7890",
        address: "Maputo, Moçambique",
        website: "behance.net/marianacumbe"
      },
      about: "Arquitecta criativa com paixão por design sustentável e inovação. Especializada em projectos residenciais e comerciais com foco na sustentabilidade ambiental.",
      education: [
        {
          degree: "Licenciatura em Arquitectura",
          institution: "Universidade Eduardo Mondlane",
          startYear: "2016",
          endYear: "2021"
        }
      ],
      experience: [
        {
          position: "Arquitecta Sénior",
          company: "Estúdio de Arquitectura Moz",
          startDate: "Fev 2022",
          endDate: "Presente",
          current: true,
          description: "Desenvolvimento de projectos arquitectónicos. Coordenação de equipas multidisciplinares. Gestão de clientes e apresentações."
        }
      ],
      skills: {
        technical: ["AutoCAD", "SketchUp", "Revit", "Photoshop", "3D Max"],
        soft: ["Criatividade", "Atenção aos Detalhes", "Gestão de Projectos", "Comunicação Visual"]
      }
    }
  },
  {
    id: "cv04",
    nome: "CV Criativo com Destaque em Habilidades",
    layout: "duas_colunas_simples",
    foto_posicao: "topo_esquerda",
    paleta: "verde_claro",
    secoes: ["sobre", "skills_com_grafico", "projetos", "experiencia"],
    colorPalette: {
      primary: "#059669",
      secondary: "#047857",
      accent: "#10b981"
    },
    dados: {
      personalData: {
        fullName: "Tomás Nguenha",
        profession: "Designer Gráfico",
        email: "tomas.nguenha@email.com",
        phone: "+258 86 111 2233",
        address: "Nampula, Moçambique",
        website: "dribbble.com/tomasnguenha"
      },
      about: "Designer gráfico especializado em branding e identidade visual. Combino criatividade com estratégia para criar soluções visuais impactantes e memoráveis.",
      education: [
        {
          degree: "Design Gráfico e Multimédia",
          institution: "Instituto Superior de Artes e Cultura",
          startYear: "2018",
          endYear: "2022"
        }
      ],
      experience: [
        {
          position: "Designer Gráfico",
          company: "Agência Criativa Moz",
          startDate: "Mai 2022",
          endDate: "Presente",
          current: true,
          description: "Criação de identidades visuais para marcas moçambicanas. Desenvolvimento de campanhas publicitárias. Design de materiais promocionais."
        }
      ],
      skills: {
        technical: ["Adobe Creative Suite", "Figma", "Branding", "Web Design", "Motion Graphics"],
        soft: ["Criatividade", "Pensamento Visual", "Gestão de Tempo", "Colaboração"]
      }
    }
  },
  {
    id: "cv05",
    nome: "CV Executivo com Foco em Resultados",
    layout: "duas_colunas",
    foto_posicao: "sem_foto",
    paleta: "cinza_e_azul",
    secoes: ["resumo_executivo", "conquistas", "experiencia", "educacao"],
    colorPalette: {
      primary: "#1e40af",
      secondary: "#374151",
      accent: "#3b82f6"
    },
    dados: {
      personalData: {
        fullName: "Dr. Fernando Chissano",
        profession: "Director Executivo",
        email: "fernando.chissano@email.com",
        phone: "+258 84 777 8888",
        address: "Maputo, Moçambique",
        website: "linkedin.com/in/fernandochissano"
      },
      about: "Executivo sénior com mais de 15 anos de experiência em liderança empresarial. Especialista em transformação digital, crescimento de negócios e gestão estratégica.",
      education: [
        {
          degree: "MBA em Gestão Empresarial",
          institution: "ISCTEM - Instituto Superior de Ciências e Tecnologia de Moçambique",
          startYear: "2015",
          endYear: "2017"
        },
        {
          degree: "Licenciatura em Economia",
          institution: "Universidade Eduardo Mondlane",
          startYear: "2005",
          endYear: "2009"
        }
      ],
      experience: [
        {
          position: "Director Executivo",
          company: "Grupo Empresarial Moçambicano",
          startDate: "Jan 2018",
          endDate: "Presente",
          current: true,
          description: "Liderança estratégica da organização. Crescimento de receita em 300% nos últimos 5 anos. Implementação de processos digitais."
        }
      ],
      skills: {
        technical: ["Gestão Estratégica", "Transformação Digital", "Análise Financeira", "Liderança Organizacional"],
        soft: ["Visão Estratégica", "Tomada de Decisões", "Negociação", "Inspiração de Equipas"]
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
