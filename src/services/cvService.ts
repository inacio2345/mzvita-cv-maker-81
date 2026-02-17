
// Layout configuration for advanced mode
export interface LayoutConfig {
  sectionsOrder: string[];
  hiddenSections: string[];
  itemOrder: {
    experience: string[];
    education: string[];
  };
}

export interface CVData {
  personalData: {
    photo?: string | null;
    fullName?: string;
    email?: string;
    phone?: string;
    address?: string;
    profession?: string;
    idNumber?: string;
    website?: string;
    [key: string]: any;
  };
  about: string;
  education: any[];
  experience: any[];
  skills: {
    technical?: string[];
    languages?: string[];
  } | any[];
  references: any[];
  colorPalette: any;
  fonts?: {
    primary: string;
    headings: string;
  };
  sectionTitles?: {
    [key: string]: string;
  };
  layoutConfig?: LayoutConfig;
}

export const DEFAULT_SECTIONS_ORDER = [
  'header', 'about', 'experience', 'education', 'skills', 'languages', 'references'
];

export const getDefaultLayoutConfig = (): LayoutConfig => ({
  sectionsOrder: [...DEFAULT_SECTIONS_ORDER],
  hiddenSections: [],
  itemOrder: {
    experience: [],
    education: []
  }
});

export const getEmptyCVData = (): CVData => ({
  personalData: {
    photo: null
  },
  about: '',
  education: [],
  experience: [],
  skills: [],
  references: [],
  colorPalette: {
    primary: '#2563eb',
    secondary: '#64748b',
    accent: '#10b981'
  },
  fonts: {
    primary: 'Inter',
    headings: 'Poppins'
  },
  sectionTitles: {
    header: 'Cabeçalho',
    about: 'PERFIL PROFISSIONAL',
    experience: 'EXPERIÊNCIA PROFISSIONAL',
    education: 'FORMAÇÃO ACADÉMICA',
    skills: 'HABILIDADES',
    languages: 'IDIOMAS',
    references: 'REFERÊNCIAS',
    contact: 'CONTACTO'
  },
  layoutConfig: getDefaultLayoutConfig()
});

export const validateCVData = (data: CVData): boolean => {
  const { personalData } = data;
  return !!(personalData?.fullName && personalData?.profession && personalData?.email && personalData?.phone && personalData?.address);
};

export const mergeCVData = (current: CVData, updates: Partial<CVData>): CVData => {
  return {
    ...current,
    ...updates,
    personalData: updates.personalData
      ? { ...current.personalData, ...updates.personalData }
      : current.personalData,
    skills: updates.skills
      ? (Array.isArray(updates.skills) ? updates.skills : { ...current.skills, ...updates.skills })
      : current.skills,
    sectionTitles: updates.sectionTitles
      ? { ...current.sectionTitles, ...updates.sectionTitles }
      : current.sectionTitles,
    layoutConfig: updates.layoutConfig
      ? { ...current.layoutConfig, ...updates.layoutConfig }
      : current.layoutConfig
  };
};

// Enhanced validation with security checks
export const validateCVDataSecurely = (data: CVData): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // Basic validation
  if (!data.personalData?.fullName?.trim()) {
    errors.push('Nome completo é obrigatório');
  }

  if (!data.personalData?.profession?.trim()) {
    errors.push('Profissão é obrigatória');
  }

  if (!data.personalData?.email?.trim()) {
    errors.push('E-mail é obrigatório');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.personalData.email)) {
    errors.push('E-mail inválido');
  }

  if (!data.personalData?.phone?.trim()) {
    errors.push('Telefone é obrigatório');
  }

  if (!data.personalData?.address?.trim()) {
    errors.push('Endereço é obrigatório');
  }

  // Security validation
  if (data.about && data.about.length > 2000) {
    errors.push('Descrição muito longa (máximo 2000 caracteres)');
  }

  if (data.education && data.education.length > 20) {
    errors.push('Muitas entradas de educação (máximo 20)');
  }

  if (data.experience && data.experience.length > 20) {
    errors.push('Muitas entradas de experiência (máximo 20)');
  }

  if (data.skills) {
    if (Array.isArray(data.skills) && data.skills.length > 50) {
      errors.push('Muitas habilidades (máximo 50)');
    } else if (typeof data.skills === 'object' && !Array.isArray(data.skills)) {
      const skillsObj = data.skills as { technical?: string[]; languages?: string[] };
      const totalSkills = (skillsObj.technical?.length || 0) + (skillsObj.languages?.length || 0);
      if (totalSkills > 50) {
        errors.push('Muitas habilidades (máximo 50)');
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};
