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
  previewImage?: string;
}

export const cvTemplates: CVTemplate[] = [
  {
    id: "modern-professional",
    nome: "Profissional Moderno",
    layout: "two-column-sidebar",
    foto_posicao: "sidebar",
    paleta: "azul_moderno",
    secoes: ["cabecalho", "contacto", "perfil", "experiencia", "formacao", "habilidades", "idiomas"],
    colorPalette: {
      primary: "#2563eb",
      secondary: "#1e40af",
      accent: "#3b82f6",
      background: "#ffffff",
      text: "#1f2937"
    },
    fonts: {
      primary: "Inter",
      headings: "Poppins"
    },
    layoutConfig: {
      type: "two-column-sidebar",
      sections: ["header", "contact", "profile", "experience", "education", "skills", "languages"],
      columns: {
        left: ["contact", "skills", "languages"],
        right: ["profile", "experience", "education"]
      }
    },
    dados: {
      personalData: {
        fullName: "Nome Completo",
        profession: "Profissão",
        email: "email@exemplo.com",
        phone: "+258 84 000 0000",
        address: "Maputo, Moçambique",
        linkedin: "linkedin.com/in/perfil"
      },
      about: "Profissional experiente com forte capacidade analítica e de resolução de problemas.",
      experience: [
        {
          position: "Cargo Atual",
          company: "Empresa",
          startDate: "2022",
          endDate: "Presente",
          current: true,
          description: "Descrição das responsabilidades."
        }
      ],
      education: [
        {
          degree: "Licenciatura",
          institution: "Universidade",
          startYear: "2018",
          endYear: "2022"
        }
      ],
      skills: {
        technical: ["Habilidade 1", "Habilidade 2", "Habilidade 3"],
        languages: ["Português - Nativo", "Inglês - Avançado"]
      }
    }
  },
  {
    id: "elegant-minimal",
    nome: "Elegante Minimalista",
    layout: "single-column",
    foto_posicao: "topo",
    paleta: "preto_elegante",
    secoes: ["cabecalho", "perfil", "experiencia", "formacao", "habilidades", "idiomas"],
    colorPalette: {
      primary: "#0f172a",
      secondary: "#3b82f6", 
      accent: "#64748b",
      background: "#f8fafc",
      text: "#1f2937"
    },
    fonts: {
      primary: "Inter",
      headings: "Roboto"
    },
    layoutConfig: {
      type: "cabecalho_duas_colunas",
      sections: ["cabecalho", "contacto", "habilidades", "idiomas", "perfil", "experiencia", "formacao"],
      columns: {
        left: ["contacto", "habilidades", "idiomas"],
        right: ["perfil", "experiencia", "formacao"]
      }
    },
    dados: {
      personalData: {
        fullName: "António Silva Macamo",
        profession: "Gestor Financeiro",
        email: "antonio.macamo@financas.com",
        phone: "+258 84 123 4567",
        address: "Maputo, Moçambique",
        website: "linkedin.com/in/antoniomacamo"
      },
      about: "Profissional experiente em gestão financeira com mais de 8 anos de experiência em instituições bancárias e empresas de grande porte. Especializado em análise de riscos, planejamento orçamental e consultoria financeira.",
      education: [
        {
          degree: "Licenciatura em Economia",
          institution: "Universidade Eduardo Mondlane",
          startYear: "2012",
          endYear: "2016"
        },
        {
          degree: "MBA em Finanças Corporativas", 
          institution: "ISCTEM",
          startYear: "2017",
          endYear: "2019"
        }
      ],
      experience: [
        {
          position: "Gestor Financeiro Sénior",
          company: "Banco Internacional de Moçambique",
          startDate: "Jan 2020",
          endDate: "Presente",
          current: true,
          description: "Gestão do portfólio de clientes corporativos, análise de crédito e desenvolvimento de produtos financeiros inovadores."
        },
        {
          position: "Analista Financeiro",
          company: "Grupo Empresarial Maputo",
          startDate: "Jun 2016",
          endDate: "Dez 2019",
          current: false,
          description: "Análise de demonstrações financeiras, elaboração de relatórios gerenciais e apoio na tomada de decisões estratégicas."
        }
      ],
      skills: {
        technical: ["Análise Financeira", "Excel Avançado", "SAP", "Power BI", "Gestão de Riscos", "Orçamentação"],
        languages: ["Português - Nativo", "Inglês - Avançado", "Francês - Intermédio"]
      }
    }
  },
  {
    id: "cv02",
    nome: "Barra Lateral Esquerda",
    layout: "sidebar_esquerda_colorida",
    foto_posicao: "esquerda_circular",
    paleta: "azul_corporativo",
    secoes: ["foto", "dados_pessoais", "competencias", "idiomas", "perfil", "experiencia", "formacao"],
    canvaUrl: "https://www.canva.com/design/DAGpDfzeXTg/tGUHKXZS1IserDD8MJbFGw/view",
    previewImage: "/lovable-uploads/1854ebd7-7bcf-4b3b-b462-853dbc55e809.png",
    colorPalette: {
      primary: "#1e3a8a",
      secondary: "#3b82f6",
      accent: "#fbbf24",
      background: "#ffffff",
      text: "#1f2937"
    },
    fonts: {
      primary: "Open Sans",
      headings: "Lato"
    },
    layoutConfig: {
      type: "sidebar_esquerda",
      sections: ["foto", "dados_pessoais", "competencias", "idiomas", "perfil", "experiencia", "formacao"],
      columns: {
        left: ["foto", "dados_pessoais", "competencias", "idiomas"],
        right: ["perfil", "experiencia", "formacao"]
      }
    },
    dados: {
      personalData: {
        fullName: "Dra. Fernanda Sitoe",
        profession: "Médica Especialista",
        email: "fernanda.sitoe@hospital.gov.mz",
        phone: "+258 87 987 6543",
        address: "Beira, Moçambique",
        website: "drfernandasitoe.com"
      },
      about: "Médica especialista em medicina interna com mais de 10 anos de experiência no Sistema Nacional de Saúde. Dedicada ao atendimento de qualidade e à formação de novos profissionais de saúde.",
      education: [
        {
          degree: "Medicina",
          institution: "Universidade Eduardo Mondlane",
          startYear: "2008",
          endYear: "2014"
        },
        {
          degree: "Especialização em Medicina Interna",
          institution: "Hospital Central de Maputo",
          startYear: "2015",
          endYear: "2018"
        }
      ],
      experience: [
        {
          position: "Médica Especialista",
          company: "Hospital Central da Beira",
          startDate: "Mar 2018",
          endDate: "Presente",
          current: true,
          description: "Atendimento especializado em medicina interna, supervisão de internos e residentes, participação em programas de formação médica contínua."
        },
        {
          position: "Médica Residente",
          company: "Hospital Central de Maputo",
          startDate: "Jan 2015",
          endDate: "Fev 2018",
          current: false,
          description: "Formação especializada em medicina interna, atendimento de emergência e acompanhamento de pacientes internados."
        }
      ],
      skills: {
        technical: ["Medicina Interna", "Diagnóstico Clínico", "Emergência Médica", "Formação Médica", "Investigação Clínica"],
        languages: ["Português - Nativo", "Inglês - Fluente", "Francês - Básico"]
      }
    }
  },
  {
    id: "cv03",
    nome: "Layout Simples com Destaques",
    layout: "vertical_blocos_destacados",
    foto_posicao: "opcional",
    paleta: "azul_claro_destaques",
    secoes: ["nome_titulo", "contacto_linha", "perfil_destaque", "experiencia_blocos", "formacao_blocos", "competencias_tags"],
    canvaUrl: "https://www.canva.com/design/DAGpDfOD3q4/chRZEyg_aUgvbO-WTtQQfA/view",
    previewImage: "/lovable-uploads/59c97f28-beba-4d5b-b61f-81af113eb8c3.png",
    colorPalette: {
      primary: "#0369a1",
      secondary: "#0ea5e9",
      accent: "#06b6d4",
      background: "#f0f9ff",
      text: "#0c4a6e"
    },
    fonts: {
      primary: "Source Sans Pro",
      headings: "Nunito"
    },
    layoutConfig: {
      type: "vertical_destacado",
      sections: ["nome_titulo", "contacto_linha", "perfil_destaque", "experiencia_blocos", "formacao_blocos", "competencias_tags"]
    },
    dados: {
      personalData: {
        fullName: "Eng. Carlos Nhantumbo",
        profession: "Engenheiro Civil",
        email: "carlos.nhantumbo@construcao.mz",
        phone: "+258 86 111 2233",
        address: "Nampula, Moçambique",
        website: "carlosnhantumbo.eng"
      },
      about: "Engenheiro civil experiente com foco em projetos de infraestrutura e construção civil. Especializado em gestão de obras, orçamentação e supervisão técnica de projetos de grande escala.",
      education: [
        {
          degree: "Engenharia Civil",
          institution: "Universidade Eduardo Mondlane",
          startYear: "2013",
          endYear: "2018"
        },
        {
          degree: "Mestrado em Estruturas",
          institution: "Instituto Superior Técnico - Lisboa",
          startYear: "2019",
          endYear: "2021"
        }
      ],
      experience: [
        {
          position: "Engenheiro Civil Sénior",
          company: "Construtora Moçambicana Lda",
          startDate: "Jun 2021",
          endDate: "Presente",
          current: true,
          description: "Liderança técnica em projetos de infraestrutura rodoviária e edificações comerciais. Responsável pela coordenação de equipas multidisciplinares e controlo de qualidade."
        },
        {
          position: "Engenheiro Júnior",
          company: "Gabinete de Estudos e Projetos",
          startDate: "Jan 2018",
          endDate: "Mai 2021",
          current: false,
          description: "Desenvolvimento de projetos estruturais, acompanhamento de obras e elaboração de relatórios técnicos."
        }
      ],
      skills: {
        technical: ["AutoCAD", "SAP2000", "Gestão de Projetos", "Orçamentação", "Supervisão de Obras", "ETABS"],
        languages: ["Português - Nativo", "Inglês - Avançado", "Espanhol - Intermédio"]
      }
    }
  },
  {
    id: "cv04",
    nome: "Criativo Profissional",
    layout: "criativo_cores_suaves",
    foto_posicao: "integrada_header",
    paleta: "verde_lilas_coral",
    secoes: ["header_gradiente", "icones_grandes", "divisores_coloridos", "tipografia_moderna"],
    canvaUrl: "https://www.canva.com/design/DAGpDWqo6nc/7epmrCS59CaeumjLrCZwng/view",
    previewImage: "/lovable-uploads/8ac8cb30-f191-426c-8e75-a0c5b9e3f6f0.png",
    colorPalette: {
      primary: "#059669",
      secondary: "#10b981",
      accent: "#f472b6",
      background: "#f0fdf4",
      text: "#065f46"
    },
    fonts: {
      primary: "Nunito",
      headings: "Montserrat"
    },
    layoutConfig: {
      type: "criativo_moderno",
      sections: ["header_gradiente", "icones_grandes", "divisores_coloridos", "tipografia_moderna"]
    },
    dados: {
      personalData: {
        fullName: "Sofia Chambal",
        profession: "Designer Gráfica & Marketing",
        email: "sofia.chambal@criativo.mz",
        phone: "+258 84 777 8888",
        address: "Maputo, Moçambique",
        website: "sofiachambal.design"
      },
      about: "Designer gráfica criativa especializada em branding, marketing digital e comunicação visual. Apaixonada por criar identidades visuais que contam histórias e conectam marcas aos seus públicos de forma autêntica e impactante.",
      education: [
        {
          degree: "Design Gráfico e Multimédia",
          institution: "Instituto Superior de Artes e Cultura",
          startYear: "2017",
          endYear: "2021"
        },
        {
          degree: "Certificação em Marketing Digital",
          institution: "Google Digital Marketing",
          startYear: "2022",
          endYear: "2022"
        }
      ],
      experience: [
        {
          position: "Designer Sénior & Coordenadora Criativa",
          company: "Agência PubliMoz",
          startDate: "Mai 2022",
          endDate: "Presente",
          current: true,
          description: "Liderança criativa em campanhas de branding para clientes nacionais e internacionais. Desenvolvimento de estratégias visuais integradas e coordenação de equipas criativas."
        },
        {
          position: "Designer Gráfica",
          company: "Estúdio Criativo Maputo",
          startDate: "Jan 2021",
          endDate: "Abr 2022",
          current: false,
          description: "Criação de identidades visuais, materiais publicitários e conteúdo para redes sociais. Desenvolvimento de projetos para PMEs e startups locais."
        }
      ],
      skills: {
        technical: ["Adobe Creative Suite", "Figma", "Sketch", "Brand Design", "UI/UX Design", "Marketing Digital"],
        languages: ["Português - Nativo", "Inglês - Fluente", "Francês - Intermédio"]
      }
    }
  },
  {
    id: "cv05",
    nome: "Compacto com Menu à Direita",
    layout: "menu_lateral_direito",
    foto_posicao: "opcional",
    paleta: "neutro_pratico",
    secoes: ["dados_pessoais_direita", "habilidades_organizadas", "conteudo_esquerda_blocos"],
    canvaUrl: "https://www.canva.com/design/DAGpDV5eSUU/WaepU_svQ6_PtBtMofOqPQ/view",
    previewImage: "/lovable-uploads/b61b9db8-b219-4dee-9766-53e8fe085d6f.png",
    colorPalette: {
      primary: "#374151",
      secondary: "#6b7280",
      accent: "#f59e0b",
      background: "#ffffff",
      text: "#111827"
    },
    fonts: {
      primary: "Inter",
      headings: "Roboto"
    },
    layoutConfig: {
      type: "compacto_lateral",
      sections: ["dados_pessoais_direita", "habilidades_organizadas", "conteudo_esquerda_blocos"],
      columns: {
        left: ["perfil", "experiencia", "formacao"],
        right: ["dados_pessoais", "habilidades", "idiomas"]
      }
    },
    dados: {
      personalData: {
        fullName: "Prof. Mariana Cossa",
        profession: "Professora & Investigadora",
        email: "mariana.cossa@uem.mz",
        phone: "+258 82 555 7890",
        address: "Maputo, Moçambique",
        website: "marianacossa.academia.edu"
      },
      about: "Professora universitária e investigadora com doutoramento em Educação. Especializada em metodologias de ensino inovadoras e desenvolvimento curricular. Dedicada à formação de professores e à melhoria da qualidade educacional em Moçambique.",
      education: [
        {
          degree: "Doutoramento em Ciências da Educação",
          institution: "Universidade do Porto",
          startYear: "2018",
          endYear: "2022"
        },
        {
          degree: "Mestrado em Ensino",
          institution: "Universidade Eduardo Mondlane",
          startYear: "2013",
          endYear: "2015"
        },
        {
          degree: "Licenciatura em Psicologia",
          institution: "Universidade Eduardo Mondlane",
          startYear: "2008",
          endYear: "2012"
        }
      ],
      experience: [
        {
          position: "Professora Auxiliar",
          company: "Universidade Eduardo Mondlane - Faculdade de Educação",
          startDate: "Jan 2023",
          endDate: "Presente",
          current: true,
          description: "Docência em disciplinas de metodologia de ensino e psicologia educacional. Orientação de dissertações de mestrado e supervisão de projetos de investigação."
        },
        {
          position: "Professora Assistente",
          company: "Instituto Superior Pedagógico",
          startDate: "Mar 2015",
          endDate: "Dez 2022",
          current: false,
          description: "Leccionação de disciplinas de pedagogia e didática. Coordenação do programa de estágios pedagógicos e desenvolvimento de projetos de extensão universitária."
        }
      ],
      skills: {
        technical: ["Metodologias de Ensino", "Investigação Educacional", "SPSS", "Desenvolvimento Curricular", "Formação de Professores"],
        languages: ["Português - Nativo", "Inglês - Fluente", "Francês - Avançado", "Espanhol - Intermédio"]
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
        languages: ["Português - Nativo", "Inglês - Avançado"]
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
        languages: ["Português - Nativo", "Inglês - Fluente", "Francês - Básico"]
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
        languages: ["Português - Nativo", "Inglês - Avançado"]
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
        languages: ["Português - Nativo", "Inglês - Fluente"]
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
        languages: ["Português - Nativo", "Inglês - Fluente"]
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
