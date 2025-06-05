
export interface CVData {
  personalData: {
    photo?: string | null;
    fullName?: string;
    email?: string;
    phone?: string;
    address?: string;
    idNumber?: string;
    website?: string;
    [key: string]: any;
  };
  about: string;
  education: any[];
  experience: any[];
  skills: any[];
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
