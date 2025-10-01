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
  previewImage?: string;
}

export const cvTemplates: CVTemplate[] = [
  {
    id: "modern-blue",
    nome: "Moderno Azul",
    layout: "two-column-sidebar",
    foto_posicao: "sidebar",
    paleta: "azul_profissional",
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
        profession: "Sua Profissão",
        email: "email@exemplo.com",
        phone: "+258 84 000 0000",
        address: "Maputo, Moçambique"
      },
      about: "Profissional dedicado com experiência comprovada em gestão e liderança de projetos.",
      experience: [],
      education: [],
      skills: {
        technical: [],
        languages: []
      }
    }
  },
  {
    id: "elegant-black",
    nome: "Elegante Preto",
    layout: "single-column",
    foto_posicao: "topo",
    paleta: "preto_elegante",
    secoes: ["cabecalho", "perfil", "experiencia", "formacao", "habilidades"],
    colorPalette: {
      primary: "#0f172a",
      secondary: "#334155",
      accent: "#64748b",
      background: "#ffffff",
      text: "#0f172a"
    },
    fonts: {
      primary: "Lato",
      headings: "Playfair Display"
    },
    layoutConfig: {
      type: "single-column",
      sections: ["header", "profile", "experience", "education", "skills"]
    },
    dados: {
      personalData: {
        fullName: "Nome Completo",
        profession: "Sua Profissão",
        email: "email@exemplo.com",
        phone: "+258 84 000 0000",
        address: "Maputo, Moçambique"
      },
      about: "Profissional com visão estratégica e comprometimento com resultados.",
      experience: [],
      education: [],
      skills: {
        technical: [],
        languages: []
      }
    }
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
