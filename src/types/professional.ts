
export interface Profession {
  id: string;
  name: string;
  category: string;
  description: string;
  objectives: string;
  importance: string;
  applicationAreas: string;
  specificQuestions: ProfessionQuestion[];
  cvTemplate: CVTemplate;
}

export interface ProfessionQuestion {
  id: string;
  question: string;
  type: 'text' | 'number' | 'select' | 'textarea';
  options?: string[];
  required: boolean;
}

export interface CVTemplate {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  style: 'formal' | 'creative' | 'technical' | 'medical' | 'academic';
  layout: 'classic' | 'modern' | 'creative';
}

export interface ProfessionalFormData {
  // Etapa 1 - Dados básicos
  fullName: string;
  birthDate: string;
  nationality: string;
  idNumber: string;
  address: string;
  email: string;
  phone: string;
  maritalStatus: string;
  photo?: string;
  
  // Etapa 2 - Dados específicos
  specificAnswers: Record<string, string>;
  selectedProfession: Profession;
}

export type ProfessionCategory = 
  | 'Educação'
  | 'Construção Civil'
  | 'Serviços Técnicos'
  | 'Saúde'
  | 'Criatividade'
  | 'Administrativo'
  | 'Tecnologia'
  | 'Jurídico'
  | 'Engenharia'
  | 'Comércio'
  | 'Transporte'
  | 'Alimentação'
  | 'Segurança';
