
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { SecureDbService } from '@/services/secureDbService';

export interface SavedCV {
  id: string;
  title: string;
  template_name: string;
  created_at: string;
  updated_at: string;
  cv_data: any;
}

export const useSavedCVs = () => {
  const [savedCVs, setSavedCVs] = useState<SavedCV[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const loadSavedCVs = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      // RLS policies will automatically filter to user's CVs
      const { data, error } = await supabase
        .from('saved_cvs')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setSavedCVs(data || []);
    } catch (error) {
      console.error('Erro ao carregar CVs:', error);
      toast({
        title: "Erro ao carregar CVs",
        description: "Não foi possível carregar seus CVs salvos.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const saveCV = async (title: string, templateName: string, cvData: any) => {
    if (!user) {
      toast({
        title: "Erro",
        description: "Você precisa estar logado para salvar um CV.",
        variant: "destructive",
      });
      return null;
    }

    try {
      const data = await SecureDbService.saveCVSecurely(title, templateName, cvData);
      
      setSavedCVs(prev => [data, ...prev]);
      toast({
        title: "CV salvo com sucesso!",
        description: "Seu CV foi salvo e pode ser acessado no seu perfil.",
      });

      return data;
    } catch (error: any) {
      console.error('Erro ao salvar CV:', error);
      toast({
        title: "Erro ao salvar CV",
        description: error.message || "Não foi possível salvar seu CV. Tente novamente.",
        variant: "destructive",
      });
      return null;
    }
  };

  const updateCV = async (id: string, title: string, cvData: any) => {
    if (!user) return null;

    try {
      const data = await SecureDbService.updateCVSecurely(id, title, cvData);

      setSavedCVs(prev => 
        prev.map(cv => cv.id === id ? data : cv)
      );

      toast({
        title: "CV atualizado!",
        description: "Suas alterações foram salvas com sucesso.",
      });

      return data;
    } catch (error: any) {
      console.error('Erro ao atualizar CV:', error);
      toast({
        title: "Erro ao atualizar CV",
        description: error.message || "Não foi possível atualizar seu CV.",
        variant: "destructive",
      });
      return null;
    }
  };

  const deleteCV = async (id: string) => {
    if (!user) return false;

    try {
      await SecureDbService.deleteCVSecurely(id);

      setSavedCVs(prev => prev.filter(cv => cv.id !== id));
      toast({
        title: "CV excluído",
        description: "CV foi excluído com sucesso.",
      });

      return true;
    } catch (error: any) {
      console.error('Erro ao excluir CV:', error);
      toast({
        title: "Erro ao excluir",
        description: error.message || "Não foi possível excluir o CV.",
        variant: "destructive",
      });
      return false;
    }
  };

  useEffect(() => {
    loadSavedCVs();
  }, [user]);

  return {
    savedCVs,
    loading,
    saveCV,
    updateCV,
    deleteCV,
    loadSavedCVs,
  };
};
