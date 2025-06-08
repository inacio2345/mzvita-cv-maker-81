
import { useState, useEffect } from 'react';
import { CVData, getEmptyCVData, mergeCVData } from '@/services/cvService';

export const useCVData = (initialData?: CVData) => {
  const [cvData, setCvData] = useState<CVData>(() => initialData || getEmptyCVData());
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const validateRequiredFields = (): boolean => {
    const errors: Record<string, string> = {};
    
    // Dados pessoais obrigatórios
    if (!cvData.personalData?.fullName?.trim()) {
      errors.fullName = 'Nome completo é obrigatório';
    }
    if (!cvData.personalData?.email?.trim()) {
      errors.email = 'Email é obrigatório';
    }
    if (!cvData.personalData?.phone?.trim()) {
      errors.phone = 'Telefone é obrigatório';
    }
    if (!cvData.personalData?.address?.trim()) {
      errors.address = 'Endereço é obrigatório';
    }
    if (!cvData.personalData?.profession?.trim()) {
      errors.profession = 'Profissão é obrigatória';
    }

    // Sobre mim obrigatório
    if (!cvData.about?.trim()) {
      errors.about = 'Perfil profissional é obrigatório';
    }

    // Pelo menos uma experiência
    if (!cvData.experience || cvData.experience.length === 0) {
      errors.experience = 'Pelo menos uma experiência profissional é obrigatória';
    } else {
      cvData.experience.forEach((exp, index) => {
        if (!exp.position?.trim()) {
          errors[`experience_${index}_position`] = 'Cargo é obrigatório';
        }
        if (!exp.company?.trim()) {
          errors[`experience_${index}_company`] = 'Empresa é obrigatória';
        }
        if (!exp.startDate?.trim()) {
          errors[`experience_${index}_startDate`] = 'Data de início é obrigatória';
        }
        if (!exp.description?.trim()) {
          errors[`experience_${index}_description`] = 'Descrição das atividades é obrigatória';
        }
      });
    }

    // Pelo menos uma formação
    if (!cvData.education || cvData.education.length === 0) {
      errors.education = 'Pelo menos uma formação acadêmica é obrigatória';
    } else {
      cvData.education.forEach((edu, index) => {
        if (!edu.degree?.trim()) {
          errors[`education_${index}_degree`] = 'Curso é obrigatório';
        }
        if (!edu.institution?.trim()) {
          errors[`education_${index}_institution`] = 'Instituição é obrigatória';
        }
        if (!edu.endYear?.trim()) {
          errors[`education_${index}_endYear`] = 'Ano de conclusão é obrigatório';
        }
      });
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const updateCVData = (updates: Partial<CVData>) => {
    setCvData(current => mergeCVData(current, updates));
  };

  const resetCVData = () => {
    setCvData(getEmptyCVData());
    setValidationErrors({});
  };

  useEffect(() => {
    if (initialData) {
      setCvData(initialData);
    }
  }, [initialData]);

  return {
    cvData,
    updateCVData,
    resetCVData,
    validateRequiredFields,
    validationErrors,
    isValid: Object.keys(validationErrors).length === 0
  };
};
