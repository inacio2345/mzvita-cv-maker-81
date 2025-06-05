
import { useState, useEffect } from 'react';
import { CVData, getEmptyCVData, mergeCVData } from '@/services/cvService';

export const useCVData = (initialData?: CVData) => {
  const [cvData, setCvData] = useState<CVData>(() => initialData || getEmptyCVData());

  const updateCVData = (updates: Partial<CVData>) => {
    setCvData(current => mergeCVData(current, updates));
  };

  const resetCVData = () => {
    setCvData(getEmptyCVData());
  };

  useEffect(() => {
    if (initialData) {
      setCvData(initialData);
    }
  }, [initialData]);

  return {
    cvData,
    updateCVData,
    resetCVData
  };
};
