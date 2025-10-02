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
    id: "cv-classico-elegante",
    nome: "Clássico Elegante",
    layout: "single-column-elegant",
    foto_posicao: "topo-direito-circular",
    paleta: "roxo_bege",
    secoes: ["cabecalho", "perfil", "experiencia", "formacao", "referencias"],
    colorPalette: {
      primary: "#5B4B8A",
      secondary: "#F5F1E8",
      accent: "#8B7AB8",
      background: "#FFFFFF",
      text: "#2D2D2D"
    },
    fonts: {
      primary: "Open Sans",
      headings: "Libre Baskerville"
    },
    layoutConfig: {
      type: "single-column-elegant",
      sections: ["cabecalho", "perfil", "experiencia", "formacao", "referencias"]
    },
    dados: {
      personalData: {
        fullName: "Nome Completo",
        profession: "Sua Profissão",
        email: "email@exemplo.com",
        phone: "+258 84 000 0000",
        address: "Cidade, Moçambique",
        website: "www.site.com"
      },
      about: "Profissional experiente com forte capacidade analítica e de resolução de problemas.",
      experience: [
        {
          position: "Cargo Atual",
          company: "Empresa",
          startDate: "2022",
          endDate: "Presente",
          current: true,
          description: "Descrição das responsabilidades e conquistas.",
          reference: {
            name: "Nome da Referência",
            title: "Cargo",
            contact: "Telefone ou Email"
          }
        }
      ],
      education: [
        {
          degree: "Licenciatura",
          institution: "Universidade",
          startYear: "2018",
          endYear: "2022",
          achievements: []
        }
      ],
      skills: {
        technical: ["Habilidade 1", "Habilidade 2", "Habilidade 3"],
        languages: ["Português", "Inglês"]
      },
      references: [
        {
          name: "Nome da Referência",
          title: "Cargo",
          contact: "Telefone ou Email"
        }
      ]
    },
    previewImage: "/lovable-uploads/template-01.jpg"
  },
  {
    id: "cv-sidebar-professional",
    nome: "Sidebar Profissional",
    layout: "left-sidebar-bold",
    foto_posicao: "sidebar-retangular-grande",
    paleta: "cinza_escuro",
    secoes: ["foto", "perfil", "contacto", "experiencia", "formacao", "expertise", "idiomas", "referencias"],
    colorPalette: {
      primary: "#2D2D2D",
      secondary: "#FFFFFF",
      accent: "#666666",
      background: "#F5F5F5",
      text: "#2D2D2D"
    },
    fonts: {
      primary: "Montserrat",
      headings: "Montserrat"
    },
    layoutConfig: {
      type: "left-sidebar-bold",
      sections: ["foto", "perfil", "contacto", "experiencia", "formacao", "expertise", "idiomas", "referencias"],
      columns: {
        left: ["foto", "perfil", "contacto"],
        right: ["experiencia", "formacao", "expertise", "idiomas", "referencias"]
      }
    },
    dados: {
      personalData: {
        fullName: "Nome Completo",
        profession: "Sua Profissão",
        email: "email@exemplo.com",
        phone: "+258 84 000 0000",
        website: "www.site.com"
      },
      about: "Descrição profissional resumida.",
      experience: [
        {
          position: "Cargo",
          company: "Empresa",
          startDate: "2020",
          endDate: "2023",
          current: false,
          description: "Descrição das responsabilidades."
        }
      ],
      education: [
        {
          degree: "Grau Acadêmico",
          institution: "Universidade",
          startYear: "2006",
          endYear: "2008"
        }
      ],
      skills: {
        technical: ["Digital Marketing", "Branding", "Copywriting", "SEO"],
        languages: ["English", "French"]
      },
      references: [
        {
          name: "Nome da Referência",
          title: "Cargo / Empresa",
          phone: "123-456-7890",
          email: "email@exemplo.com"
        }
      ]
    },
    previewImage: "/lovable-uploads/template-02.jpg"
  },
  {
    id: "cv-diagonal-modern",
    nome: "Diagonal Moderno",
    layout: "diagonal-split",
    foto_posicao: "topo-esquerdo-diagonal",
    paleta: "azul_cinza",
    secoes: ["cabecalho", "formacao", "experiencia", "idiomas", "habilidades", "referencias"],
    colorPalette: {
      primary: "#5B7C99",
      secondary: "#E8EEF2",
      accent: "#4A6580",
      background: "#FFFFFF",
      text: "#2D2D2D"
    },
    fonts: {
      primary: "Poppins",
      headings: "Poppins"
    },
    layoutConfig: {
      type: "diagonal-split",
      sections: ["cabecalho", "formacao", "experiencia", "idiomas", "habilidades", "referencias"]
    },
    dados: {
      personalData: {
        fullName: "Nome Completo",
        profession: "Sua Profissão",
        email: "email@exemplo.com",
        phone: "+258 84 000 0000",
        address: "Cidade, Moçambique"
      },
      about: "",
      experience: [
        {
          position: "Cargo",
          company: "Empresa",
          startDate: "2020",
          endDate: "Presente",
          current: true,
          description: "Descrição das responsabilidades."
        }
      ],
      education: [
        {
          degree: "Grau Acadêmico",
          institution: "Universidade",
          startYear: "2016",
          endYear: "2020"
        }
      ],
      skills: {
        technical: ["Habilidade 1", "Habilidade 2", "Habilidade 3"],
        languages: ["Português", "Inglês"]
      },
      references: [
        {
          name: "Nome da Referência",
          title: "Cargo",
          contact: "Telefone ou Email"
        }
      ]
    },
    previewImage: "/lovable-uploads/template-03.jpg"
  },
  {
    id: "cv-minimalist-clean",
    nome: "Minimalista Limpo",
    layout: "single-column-minimal",
    foto_posicao: "sem-foto",
    paleta: "preto_branco",
    secoes: ["cabecalho", "perfil", "experiencia", "formacao", "habilidades", "idiomas"],
    colorPalette: {
      primary: "#000000",
      secondary: "#FFFFFF",
      accent: "#666666",
      background: "#FFFFFF",
      text: "#000000"
    },
    fonts: {
      primary: "Roboto",
      headings: "Roboto"
    },
    layoutConfig: {
      type: "single-column-minimal",
      sections: ["cabecalho", "perfil", "experiencia", "formacao", "habilidades", "idiomas"]
    },
    dados: {
      personalData: {
        fullName: "Nome Completo",
        profession: "Sua Profissão",
        email: "email@exemplo.com",
        phone: "+258 84 000 0000",
        address: "Cidade, Moçambique"
      },
      about: "Descrição profissional resumida.",
      experience: [
        {
          position: "Cargo",
          company: "Empresa",
          startDate: "2020",
          endDate: "Presente",
          current: true,
          description: "Descrição das responsabilidades."
        }
      ],
      education: [
        {
          degree: "Grau Acadêmico",
          institution: "Universidade",
          startYear: "2016",
          endYear: "2020"
        }
      ],
      skills: {
        technical: ["Habilidade 1", "Habilidade 2", "Habilidade 3"],
        languages: ["Português", "Inglês"]
      }
    },
    previewImage: "/lovable-uploads/template-04.jpg"
  },
  {
    id: "cv-sidebar-dark",
    nome: "Sidebar Escura",
    layout: "left-sidebar-dark",
    foto_posicao: "sidebar-circular-grande",
    paleta: "azul_escuro_preto",
    secoes: ["foto", "contacto", "idiomas", "habilidades", "perfil", "experiencia", "formacao"],
    colorPalette: {
      primary: "#1E3A5F",
      secondary: "#000000",
      accent: "#4A90E2",
      background: "#FFFFFF",
      text: "#FFFFFF"
    },
    fonts: {
      primary: "Roboto",
      headings: "Roboto"
    },
    layoutConfig: {
      type: "left-sidebar-dark",
      sections: ["foto", "contacto", "idiomas", "habilidades", "perfil", "experiencia", "formacao"],
      columns: {
        left: ["foto", "contacto", "idiomas", "habilidades"],
        right: ["perfil", "experiencia", "formacao"]
      }
    },
    dados: {
      personalData: {
        fullName: "Nome Completo",
        profession: "Sua Profissão",
        email: "email@exemplo.com",
        phone: "+258 84 000 0000",
        address: "Cidade, Moçambique"
      },
      about: "Descrição profissional resumida.",
      experience: [
        {
          position: "Cargo",
          company: "Empresa",
          startDate: "2020",
          endDate: "Presente",
          current: true,
          description: "Descrição das responsabilidades."
        }
      ],
      education: [
        {
          degree: "Grau Acadêmico",
          institution: "Universidade",
          startYear: "2016",
          endYear: "2020"
        }
      ],
      skills: {
        technical: ["Habilidade 1", "Habilidade 2", "Habilidade 3"],
        languages: ["Português", "Inglês"]
      }
    },
    previewImage: "/lovable-uploads/template-05.jpg"
  },
  {
    id: "cv-tech-futuristic",
    nome: "Tech Futurista",
    layout: "geometric-modern",
    foto_posicao: "circular-geometrico",
    paleta: "ciano_preto",
    secoes: ["cabecalho", "perfil", "experiencia", "formacao", "habilidades", "idiomas"],
    colorPalette: {
      primary: "#00D9FF",
      secondary: "#000000",
      accent: "#00A8CC",
      background: "#FFFFFF",
      text: "#000000"
    },
    fonts: {
      primary: "Exo 2",
      headings: "Orbitron"
    },
    layoutConfig: {
      type: "geometric-modern",
      sections: ["cabecalho", "perfil", "experiencia", "formacao", "habilidades", "idiomas"]
    },
    dados: {
      personalData: {
        fullName: "Nome Completo",
        profession: "Sua Profissão",
        email: "email@exemplo.com",
        phone: "+258 84 000 0000",
        address: "Cidade, Moçambique"
      },
      about: "Descrição profissional resumida.",
      experience: [
        {
          position: "Cargo",
          company: "Empresa",
          startDate: "2020",
          endDate: "Presente",
          current: true,
          description: "Descrição das responsabilidades."
        }
      ],
      education: [
        {
          degree: "Grau Acadêmico",
          institution: "Universidade",
          startYear: "2016",
          endYear: "2020"
        }
      ],
      skills: {
        technical: ["Habilidade 1", "Habilidade 2", "Habilidade 3"],
        languages: ["Português", "Inglês"]
      }
    },
    previewImage: "/lovable-uploads/template-06.jpg"
  },
  {
    id: "cv-creative-yellow",
    nome: "Criativo Amarelo",
    layout: "creative-blocks",
    foto_posicao: "losango",
    paleta: "amarelo_preto",
    secoes: ["cabecalho", "perfil", "experiencia", "formacao", "habilidades", "idiomas"],
    colorPalette: {
      primary: "#FFB800",
      secondary: "#000000",
      accent: "#FFC933",
      background: "#FFFFFF",
      text: "#000000"
    },
    fonts: {
      primary: "Lato",
      headings: "Bebas Neue"
    },
    layoutConfig: {
      type: "creative-blocks",
      sections: ["cabecalho", "perfil", "experiencia", "formacao", "habilidades", "idiomas"]
    },
    dados: {
      personalData: {
        fullName: "Nome Completo",
        profession: "Sua Profissão",
        email: "email@exemplo.com",
        phone: "+258 84 000 0000",
        address: "Cidade, Moçambique"
      },
      about: "Descrição profissional resumida.",
      experience: [
        {
          position: "Cargo",
          company: "Empresa",
          startDate: "2020",
          endDate: "Presente",
          current: true,
          description: "Descrição das responsabilidades."
        }
      ],
      education: [
        {
          degree: "Grau Acadêmico",
          institution: "Universidade",
          startYear: "2016",
          endYear: "2020"
        }
      ],
      skills: {
        technical: ["Habilidade 1", "Habilidade 2", "Habilidade 3"],
        languages: ["Português", "Inglês"]
      }
    },
    previewImage: "/lovable-uploads/template-07.jpg"
  },
  {
    id: "cv-professional-clean",
    nome: "Profissional Limpo",
    layout: "single-column-structured",
    foto_posicao: "sem-foto",
    paleta: "branco_preto_cinza",
    secoes: ["cabecalho", "perfil", "experiencia", "formacao", "habilidades"],
    colorPalette: {
      primary: "#000000",
      secondary: "#CCCCCC",
      accent: "#666666",
      background: "#FFFFFF",
      text: "#000000"
    },
    fonts: {
      primary: "Roboto",
      headings: "Roboto"
    },
    layoutConfig: {
      type: "single-column-structured",
      sections: ["cabecalho", "perfil", "experiencia", "formacao", "habilidades"]
    },
    dados: {
      personalData: {
        fullName: "Nome Completo",
        profession: "Sua Profissão",
        email: "email@exemplo.com",
        phone: "+258 84 000 0000",
        address: "Cidade, Moçambique"
      },
      about: "Descrição profissional resumida.",
      experience: [
        {
          position: "Cargo",
          company: "Empresa",
          startDate: "2020",
          endDate: "Presente",
          current: true,
          description: "Descrição das responsabilidades."
        }
      ],
      education: [
        {
          degree: "Grau Acadêmico",
          institution: "Universidade",
          startYear: "2016",
          endYear: "2020"
        }
      ],
      skills: {
        technical: ["Habilidade 1", "Habilidade 2", "Habilidade 3"],
        languages: []
      }
    },
    previewImage: "/lovable-uploads/template-08.jpg"
  },
  {
    id: "cv-corporate-simple",
    nome: "Corporativo Simples",
    layout: "two-column-balanced",
    foto_posicao: "opcional",
    paleta: "branco_preto",
    secoes: ["cabecalho", "experiencia", "formacao", "habilidades"],
    colorPalette: {
      primary: "#000000",
      secondary: "#FFFFFF",
      accent: "#666666",
      background: "#FFFFFF",
      text: "#000000"
    },
    fonts: {
      primary: "Roboto",
      headings: "Roboto"
    },
    layoutConfig: {
      type: "two-column-balanced",
      sections: ["cabecalho", "experiencia", "formacao", "habilidades"]
    },
    dados: {
      personalData: {
        fullName: "Nome Completo",
        profession: "Sua Profissão",
        email: "email@exemplo.com",
        phone: "+258 84 000 0000"
      },
      about: "",
      experience: [
        {
          position: "Cargo",
          company: "Empresa",
          startDate: "2020",
          endDate: "Presente",
          current: true,
          description: "Descrição das responsabilidades."
        }
      ],
      education: [
        {
          degree: "Grau Acadêmico",
          institution: "Universidade",
          startYear: "2016",
          endYear: "2020"
        }
      ],
      skills: {
        technical: ["Habilidade 1", "Habilidade 2", "Habilidade 3"],
        languages: []
      }
    },
    previewImage: "/lovable-uploads/template-09.jpg"
  },
  {
    id: "cv-minimalist-teal",
    nome: "Minimalista Teal",
    layout: "single-column-lines",
    foto_posicao: "sem-foto",
    paleta: "teal_branco",
    secoes: ["cabecalho", "perfil", "experiencia", "formacao", "habilidades"],
    colorPalette: {
      primary: "#008B8B",
      secondary: "#FFFFFF",
      accent: "#5F9EA0",
      background: "#FFFFFF",
      text: "#2D2D2D"
    },
    fonts: {
      primary: "Roboto",
      headings: "Roboto"
    },
    layoutConfig: {
      type: "single-column-lines",
      sections: ["cabecalho", "perfil", "experiencia", "formacao", "habilidades"]
    },
    dados: {
      personalData: {
        fullName: "Nome Completo",
        profession: "Sua Profissão",
        email: "email@exemplo.com",
        phone: "+258 84 000 0000"
      },
      about: "Descrição profissional resumida.",
      experience: [
        {
          position: "Cargo",
          company: "Empresa",
          startDate: "2020",
          endDate: "Presente",
          current: true,
          description: "Descrição das responsabilidades."
        }
      ],
      education: [
        {
          degree: "Grau Acadêmico",
          institution: "Universidade",
          startYear: "2016",
          endYear: "2020"
        }
      ],
      skills: {
        technical: ["Habilidade 1", "Habilidade 2", "Habilidade 3"],
        languages: []
      }
    },
    previewImage: "/lovable-uploads/template-10.jpg"
  }
];

export const getTemplateById = (id: string): CVTemplate | undefined => {
  return cvTemplates.find(template => template.id === id);
};

export const getRandomTemplates = (count: number = 4): CVTemplate[] => {
  const shuffled = [...cvTemplates].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, cvTemplates.length));
};

export const getDefaultTemplate = (): CVTemplate => {
  return cvTemplates[0];
};
