
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
}

export const getEmptyCVData = (): CVData => ({
  personalData: {
    photo: null
  },
  about: '',
  education: [],
  experience: [],
  skills: [],
  references: [],
  colorPalette: null
});

export const validateCVData = (data: CVData): boolean => {
  const { personalData } = data;
  return !!(personalData?.fullName && personalData?.email && personalData?.phone);
};

export const mergeCVData = (current: CVData, updates: Partial<CVData>): CVData => {
  return { ...current, ...updates };
};

// Enhanced validation with security checks
export const validateCVDataSecurely = (data: CVData): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  // Basic validation
  if (!data.personalData?.fullName?.trim()) {
    errors.push('Nome completo é obrigatório');
  }
  
  if (!data.personalData?.email?.trim()) {
    errors.push('E-mail é obrigatório');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.personalData.email)) {
    errors.push('E-mail inválido');
  }
  
  if (!data.personalData?.phone?.trim()) {
    errors.push('Telefone é obrigatório');
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
  
  if (data.skills && data.skills.length > 50) {
    errors.push('Muitas habilidades (máximo 50)');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};
