
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import { FileText, Edit, Trash2, Plus, User, LogOut, Download } from 'lucide-react';
import Footer from '@/components/ui/footer';
import { useToast } from '@/hooks/use-toast';

interface SavedCV {
  id: string;
  title: string;
  template_name: string;
  created_at: string;
  updated_at: string;
  cv_data: any;
}

const Profile = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [savedCVs, setSavedCVs] = useState<SavedCV[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
    loadSavedCVs();
  }, [user, navigate]);

  const loadSavedCVs = async () => {
    try {
      const { data, error } = await supabase
        .from('saved_cvs')
        .select('*')
        .eq('user_id', user?.id)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setSavedCVs(data || []);
    } catch (error) {
      console.error('Erro ao carregar CVs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Erro ao sair:', error);
    }
  };

  const handleDeleteCV = async (cvId: string) => {
    if (!confirm('Tem certeza que deseja excluir este CV?')) return;

    try {
      const { error } = await supabase
        .from('saved_cvs')
        .delete()
        .eq('id', cvId)
        .eq('user_id', user?.id);

      if (error) throw error;

      setSavedCVs(prev => prev.filter(cv => cv.id !== cvId));
      toast({
        title: "CV excluído",
        description: "CV foi excluído com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro ao excluir",
        description: "Não foi possível excluir o CV.",
        variant: "destructive",
      });
    }
  };

  const handleEditCV = (cv: SavedCV) => {
    navigate('/criar-cv', {
      state: {
        templateData: cv.cv_data,
        selectedTemplate: {
          id: cv.id,
          nome: cv.template_name,
          layout: "duas_colunas",
          foto_posicao: "esquerda",
          paleta: "azul"
        }
      }
    });
  };

  const handlePreviewCV = (cv: SavedCV) => {
    navigate('/preview', {
      state: {
        cvData: cv.cv_data,
        selectedTemplate: {
          id: cv.id,
          nome: cv.template_name,
          layout: "duas_colunas",
          foto_posicao: "esquerda",
          paleta: "azul"
        }
      }
    });
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-8 md:w-10 h-8 md:h-10 bg-gradient-to-r from-google-blue to-google-green rounded-lg flex items-center justify-center">
                <FileText className="w-5 md:w-6 h-5 md:h-6 text-white" />
              </div>
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-google-blue to-google-green bg-clip-text text-transparent">
                MzVita CV
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700 font-medium">{user.email}</span>
              </div>
              <Button
                variant="outline"
                onClick={handleSignOut}
                className="flex items-center"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Meu Perfil
            </h1>
            <p className="text-gray-600">
              Gerencie seus CVs e informações pessoais
            </p>
          </div>

          {/* CVs Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Meus CVs</h2>
              <Button
                onClick={() => navigate('/criar-cv')}
                className="bg-google-blue hover:bg-blue-600 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Criar Novo CV
              </Button>
            </div>

            {loading ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Carregando seus CVs...</p>
              </div>
            ) : savedCVs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedCVs.map((cv) => (
                  <Card key={cv.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <FileText className="w-5 h-5 text-google-blue" />
                          <span className="truncate">{cv.title || 'CV Sem Título'}</span>
                        </div>
                      </CardTitle>
                      <p className="text-sm text-gray-500">
                        Modelo: {cv.template_name}
                      </p>
                      <p className="text-xs text-gray-400">
                        Atualizado: {new Date(cv.updated_at).toLocaleDateString('pt-BR')}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePreviewCV(cv)}
                          className="flex-1"
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Ver
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditCV(cv)}
                          className="flex-1"
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Editar
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteCV(cv.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    Nenhum CV criado ainda
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Comece criando seu primeiro CV profissional
                  </p>
                  <Button
                    onClick={() => navigate('/criar-cv')}
                    className="bg-google-blue hover:bg-blue-600 text-white"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Criar Meu Primeiro CV
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
