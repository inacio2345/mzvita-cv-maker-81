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
    }
  },
  {
    id: "cv-yellow-dark",
    nome: "Amarelo Criativo",
    layout: "creative-yellow-dark",
    foto_posicao: "circular-amarelo",
    paleta: "amarelo_escuro",
    secoes: ["cabecalho", "perfil", "experiencia", "formacao", "habilidades", "referencias"],
    colorPalette: {
      primary: "#F4B41A", // Amarelo vibrante
      secondary: "#333333", // Dark Gray
      accent: "#E2A415",
      background: "#FFFFFF",
      text: "#111111"
    },
    fonts: {
      primary: "Inter",
      headings: "Montserrat"
    },
    layoutConfig: {
      type: "creative-yellow-dark",
      sections: ["foto", "contacto", "referencias", "formacao", "perfil", "experiencia", "habilidades"],
      columns: {
        left: ["foto", "contacto", "referencias", "formacao"],
        right: ["perfil", "experiencia", "habilidades"]
      }
    },
    dados: {
      personalData: {
        fullName: "BRIAN R. BAXTER",
        profession: "Graphic & Web Designer",
        email: "yourinfo@email.com",
        phone: "+1-718-310-5588",
        address: "705 Prudence Street, Lincoln Park, MI",
        website: "www.yourwebsite.com"
      },
      about: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      experience: [
        {
          position: "SENIOR WEB DESIGNER",
          company: "Creative Agency / Chicago",
          startDate: "2020",
          endDate: "Present",
          current: true,
          description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
        },
        {
          position: "GRAPHIC DESIGNER",
          company: "Creative Market / Chicago",
          startDate: "2015",
          endDate: "2020",
          current: false,
          description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
        }
      ],
      education: [
        {
          degree: "Master Degree Graduate",
          institution: "STANFORD UNIVERSITY",
          startYear: "2011",
          endYear: "2013"
        },
        {
          degree: "Bachelor Degree Graduate",
          institution: "UNIVERSITY OF CHICAGO",
          startYear: "2007",
          endYear: "2010"
        }
      ],
      skills: {
        technical: ["Adobe Photoshop", "Adobe Illustrator", "Microsoft Word", "Microsoft Powerpoint", "HTML-5 / CSS-3"],
        languages: []
      },
      references: [
        {
          name: "DARWIN B. MAGANA",
          title: "2813 Shobe Lane",
          contact: "+1-970-533-3393"
        },
        {
          name: "ROBERT J. BELVIN",
          title: "2119 Fairfax Drive",
          contact: "+1-908-987-5103"
        }
      ]
    },
    previewImage: "/lovable-uploads/template-05.jpg"
  },
  {
    id: "cv-modern-sidebar",
    nome: "Moderno Slate",
    layout: "modern-slate-sidebar",
    foto_posicao: "topo-sidebar",
    paleta: "slate_escuro",
    secoes: ["foto", "perfil", "experiencia", "formacao", "contacto", "habilidades", "idiomas", "hobbies"],
    colorPalette: {
      primary: "#2C3440", // Slate Escuro
      secondary: "#EAEAEA",
      accent: "#4A5A6D",
      background: "#FFFFFF",
      text: "#1E293B"
    },
    fonts: {
      primary: "Roboto",
      headings: "Inter"
    },
    layoutConfig: {
      type: "modern-slate-sidebar",
      sections: ["foto", "cabecalho", "contacto", "habilidades", "idiomas", "customSections", "perfil", "experiencia", "formacao"],
      columns: {
        left: ["foto", "cabecalho", "contacto", "habilidades", "idiomas", "customSections"],
        right: ["perfil", "experiencia", "formacao"]
      }
    },
    dados: {
      personalData: {
        fullName: "Your Name",
        profession: "Software Engineer",
        email: "example@gmail.com",
        phone: "+1 2345 6789",
        address: "#1 road, city/state-0011"
      },
      about: "I am a software engineer with experience in a variety of programming languages and a track record of delivering high-quality code. I am skilled in problem-solving and have a strong background in computer science. I am a strong communicator and enjoy working collaboratively with others.",
      experience: [
        {
          position: "Senior Software Developer",
          company: "Company - Country",
          startDate: "Jan 2022",
          endDate: "Dec 2023",
          current: false,
          description: "• Developed and maintained software using Java, Python, and C++\n• Led cross-functional teams to deliver successful software projects\n• write a work experience of a senior software engineer in bullet points"
        },
        {
          position: "Web Developer",
          company: "Company - Country",
          startDate: "Jan 2021",
          endDate: "Dec 2021",
          current: false,
          description: "• Developed and maintained various web applications using languages such as HTML, CSS, JavaScript, and PHP\n• Worked with cross-functional teams to gather requirements and design user interfaces"
        }
      ],
      education: [
        {
          degree: "Masters in Software Engineering",
          institution: "XYX University, Bangalore",
          startYear: "Jan 2019",
          endYear: "Dec 2020"
        },
        {
          degree: "Bachelor in Computer Science",
          institution: "XYX University, Bangalore",
          startYear: "Jan 2015",
          endYear: "Dec 2018"
        }
      ],
      skills: {
        technical: ["SQL Database Management", "Linux/Unix Command line", "Python", "C++", "JAVA"],
        languages: ["English: Proficient", "Hindi: Proficient"]
      },
      customSections: [
        {
          id: "custom-1",
          title: "HOBBIES",
          items: [
            { id: "h1", title: "Writing", description: "" },
            { id: "h2", title: "Cricket", description: "" },
            { id: "h3", title: "Music", description: "" }
          ]
        }
      ]
    },
    previewImage: "/lovable-uploads/template-06.jpg"
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
