
import { useState, useEffect, useCallback } from 'react';
import { CVData, LayoutConfig, getEmptyCVData, mergeCVData, getDefaultLayoutConfig } from '@/services/cvService';

export const useCVData = (initialData?: CVData) => {
  const [cvData, setCvData] = useState<CVData>(() => initialData || getEmptyCVData());

  const updateCVData = useCallback((updates: Partial<CVData>) => {
    setCvData(current => mergeCVData(current, updates));
  }, []);

  const resetCVData = useCallback(() => {
    setCvData(getEmptyCVData());
  }, []);

  // Layout config specific updates
  const updateLayoutConfig = useCallback((updates: Partial<LayoutConfig>) => {
    setCvData(current => ({
      ...current,
      layoutConfig: {
        ...(current.layoutConfig || getDefaultLayoutConfig()),
        ...updates
      }
    }));
  }, []);

  const reorderSections = useCallback((newOrder: string[]) => {
    updateLayoutConfig({ sectionsOrder: newOrder });
  }, [updateLayoutConfig]);

  const toggleSectionVisibility = useCallback((sectionId: string) => {
    setCvData(current => {
      const currentConfig = current.layoutConfig || getDefaultLayoutConfig();
      const isHidden = currentConfig.hiddenSections.includes(sectionId);
      return {
        ...current,
        layoutConfig: {
          ...currentConfig,
          hiddenSections: isHidden
            ? currentConfig.hiddenSections.filter(s => s !== sectionId)
            : [...currentConfig.hiddenSections, sectionId]
        }
      };
    });
  }, []);

  const reorderItems = useCallback((section: 'experience' | 'education', newOrder: string[]) => {
    setCvData(current => {
      const currentConfig = current.layoutConfig || getDefaultLayoutConfig();
      return {
        ...current,
        layoutConfig: {
          ...currentConfig,
          itemOrder: {
            ...currentConfig.itemOrder,
            [section]: newOrder
          }
        }
      };
    });
  }, []);

  const resetLayoutConfig = useCallback(() => {
    updateLayoutConfig(getDefaultLayoutConfig());
  }, [updateLayoutConfig]);

  useEffect(() => {
    if (initialData) {
      setCvData(initialData);
    }
  }, [initialData]);

  return {
    cvData,
    updateCVData,
    resetCVData,
    // Layout config specific
    updateLayoutConfig,
    reorderSections,
    toggleSectionVisibility,
    reorderItems,
    resetLayoutConfig,
    layoutConfig: cvData.layoutConfig || getDefaultLayoutConfig()
  };
};

