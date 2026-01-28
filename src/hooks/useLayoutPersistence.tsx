
import { useState, useEffect, useCallback, useRef } from 'react';
import { LayoutConfig, getDefaultLayoutConfig } from '@/services/cvService';

const STORAGE_KEY_PREFIX = 'cv_layout_config_';

export const useLayoutPersistence = (cvId?: string) => {
  const [layoutConfig, setLayoutConfig] = useState<LayoutConfig>(getDefaultLayoutConfig());
  const [isDirty, setIsDirty] = useState(false);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Generate storage key
  const getStorageKey = useCallback(() => {
    return cvId ? `${STORAGE_KEY_PREFIX}${cvId}` : `${STORAGE_KEY_PREFIX}temp`;
  }, [cvId]);

  // Load from localStorage on mount
  useEffect(() => {
    const key = getStorageKey();
    try {
      const saved = localStorage.getItem(key);
      if (saved) {
        const parsed = JSON.parse(saved);
        setLayoutConfig(parsed);
      }
    } catch (error) {
      console.warn('Failed to load layout config from localStorage:', error);
    }
  }, [getStorageKey]);

  // Auto-save to localStorage with debounce
  useEffect(() => {
    if (!isDirty) return;

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      const key = getStorageKey();
      try {
        localStorage.setItem(key, JSON.stringify(layoutConfig));
        setIsDirty(false);
      } catch (error) {
        console.warn('Failed to save layout config to localStorage:', error);
      }
    }, 2000); // 2 second debounce

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [layoutConfig, isDirty, getStorageKey]);

  // Update layout config
  const updateLayoutConfig = useCallback((updates: Partial<LayoutConfig>) => {
    setLayoutConfig(prev => ({
      ...prev,
      ...updates
    }));
    setIsDirty(true);
  }, []);

  // Reorder sections
  const reorderSections = useCallback((newOrder: string[]) => {
    setLayoutConfig(prev => ({
      ...prev,
      sectionsOrder: newOrder
    }));
    setIsDirty(true);
  }, []);

  // Toggle section visibility
  const toggleSectionVisibility = useCallback((sectionId: string) => {
    setLayoutConfig(prev => {
      const isHidden = prev.hiddenSections.includes(sectionId);
      return {
        ...prev,
        hiddenSections: isHidden
          ? prev.hiddenSections.filter(s => s !== sectionId)
          : [...prev.hiddenSections, sectionId]
      };
    });
    setIsDirty(true);
  }, []);

  // Reorder items within a section
  const reorderItems = useCallback((section: 'experience' | 'education', newOrder: string[]) => {
    setLayoutConfig(prev => ({
      ...prev,
      itemOrder: {
        ...prev.itemOrder,
        [section]: newOrder
      }
    }));
    setIsDirty(true);
  }, []);

  // Force save immediately
  const forceSave = useCallback(() => {
    const key = getStorageKey();
    try {
      localStorage.setItem(key, JSON.stringify(layoutConfig));
      setIsDirty(false);
    } catch (error) {
      console.warn('Failed to force save layout config:', error);
    }
  }, [layoutConfig, getStorageKey]);

  // Reset to default
  const resetLayout = useCallback(() => {
    setLayoutConfig(getDefaultLayoutConfig());
    setIsDirty(true);
  }, []);

  // Clear saved data
  const clearSaved = useCallback(() => {
    const key = getStorageKey();
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn('Failed to clear saved layout config:', error);
    }
  }, [getStorageKey]);

  return {
    layoutConfig,
    setLayoutConfig,
    updateLayoutConfig,
    reorderSections,
    toggleSectionVisibility,
    reorderItems,
    forceSave,
    resetLayout,
    clearSaved,
    isDirty
  };
};
