
import { useState, useEffect } from 'react';
import { CVData, getEmptyCVData, mergeCVData } from '@/services/cvService';

export const useCVData = (initialData?: CVData) => {
  const [cvData, setCvData] = useState<CVData>(() => initialData || getEmptyCVData());
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const validateStep = (step: number): boolean => {
    const errors: Record<string, string> = {};
    
    if (step === 1) {
      // Dados pessoais obrigatórios
      if (!cvData.personalData?.fullName?.trim()) {
        errors.fullName = 'Nome completo é obrigatório';
      }
      if (!cvData.personalData?.email?.trim()) {
        errors.email = 'Email é obrigatório';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cvData.personalData.email)) {
        errors.email = 'Email inválido';
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
    }

    if (step === 3) {
      // Sobre mim obrigatório com mínimo de caracteres
      if (!cvData.about?.trim()) {
        errors.about = 'Perfil profissional é obrigatório';
      } else if (cvData.about.trim().length < 50) {
        errors.about = 'Perfil profissional deve ter pelo menos 50 caracteres';
      }
    }

    if (step === 4) {
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
    }

    if (step === 5) {
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
    }

    if (step === 6) {
      // Pelo menos uma habilidade
      if (!cvData.skills || cvData.skills.length === 0) {
        errors.skills = 'Pelo menos uma habilidade é obrigatória';
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateRequiredFields = (): boolean => {
    const errors: Record<string, string> = {};
    
    // Dados pessoais obrigatórios
    if (!cvData.personalData?.fullName?.trim()) {
      errors.fullName = 'Nome completo é obrigatório';
    }
    if (!cvData.personalData?.email?.trim()) {
      errors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cvData.personalData.email)) {
      errors.email = 'Email inválido';
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
    } else if (cvData.about.trim().length < 50) {
      errors.about = 'Perfil profissional deve ter pelo menos 50 caracteres';
    }

    // Pelo menos uma experiência
    if (!cvData.experience || cvData.experience.length === 0) {
      errors.experience = 'Pelo menos uma experiência profissional é obrigatória';
    }

    // Pelo menos uma formação
    if (!cvData.education || cvData.education.length === 0) {
      errors.education = 'Pelo menos uma formação acadêmica é obrigatória';
    }

    // Pelo menos uma habilidade
    if (!cvData.skills || cvData.skills.length === 0) {
      errors.skills = 'Pelo menos uma habilidade é obrigatória';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const updateCVData = (updates: Partial<CVData>) => {
    setCvData(current => mergeCVData(current, updates));
    // Limpar erros relacionados aos campos atualizados
    if (updates.personalData) {
      const newErrors = { ...validationErrors };
      Object.keys(updates.personalData).forEach(key => {
        delete newErrors[key];
      });
      setValidationErrors(newErrors);
    }
  };

  const resetCVData = () => {
    setCvData(getEmptyCVData());
    setValidationErrors({});
  };

  const clearValidationErrors = () => {
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
    validateStep,
    validationErrors,
    clearValidationErrors,
    isValid: Object.keys(validationErrors).length === 0
  };
};
