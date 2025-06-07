
import { useState } from 'react';
import { Profession, ProfessionalFormData, ProfessionCategory } from '@/types/professional';
import { PROFESSIONS, getProfessionsByCategory, searchProfessions } from '@/data/professions';

export const useProfessionalArea = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProfessionCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProfession, setSelectedProfession] = useState<Profession | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<ProfessionalFormData>>({});

  const getFilteredProfessions = (): Profession[] => {
    let professions = PROFESSIONS;

    if (selectedCategory !== 'all') {
      professions = getProfessionsByCategory(selectedCategory);
    }

    if (searchQuery.trim()) {
      professions = searchProfessions(searchQuery);
    }

    return professions;
  };

  const handleProfessionSelect = (profession: Profession) => {
    setSelectedProfession(profession);
    setFormData(prev => ({ ...prev, selectedProfession: profession }));
  };

  const handleStartForm = () => {
    if (selectedProfession) {
      setShowForm(true);
      setCurrentStep(1);
    }
  };

  const updateFormData = (updates: Partial<ProfessionalFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setCurrentStep(1);
    setFormData({});
  };

  return {
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    selectedProfession,
    showForm,
    currentStep,
    formData,
    getFilteredProfessions,
    handleProfessionSelect,
    handleStartForm,
    updateFormData,
    nextStep,
    previousStep,
    resetForm
  };
};
