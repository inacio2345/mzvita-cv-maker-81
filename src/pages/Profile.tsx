
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useSavedCVs } from '@/hooks/useSavedCVs';
import { FileText, Edit, Trash2, Plus, Download, AlertCircle, User } from 'lucide-react';

import Header from '@/components/ui/header';

const Profile = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { savedCVs, loading: cvsLoading, deleteCV } = useSavedCVs();

  React.useEffect(() => {
    if (!authLoading && !user) {
      navigate('/');
    }
  }, [user, authLoading, navigate]);

  const handleDeleteCV = async (cvId: string, cvTitle: string) => {
    if (!confirm(`Tem certeza que deseja excluir o CV "${cvTitle}"?`)) return;
    await deleteCV(cvId);
  };

  const handleEditCV = (cv: any) => {
    navigate('/criar-cv', {
      state: {
        templateData: cv.cv_data,
        selectedTemplate: {
          id: cv.id,
          nome: cv.template_name,
          layout: "duas_colunas",
          foto_posicao: "esquerda",
          paleta: "azul"
        },
        editingCV: cv
      }
    });
  };

  const handlePreviewCV = (cv: any) => {
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

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <p className="text-gray-500">Carregando...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />

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

          {/* Upgrade Notice */}
          <Card className="mb-8 border-blue-200 bg-gradient-to-r from-blue-50 to-blue-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-google-blue to-google-green rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Novo Perfil Profissional Disponível!
                    </h3>
                    <p className="text-gray-600">
                      Acesse nosso novo perfil profissional inspirado no LinkedIn com recursos avançados
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => navigate('/perfil-profissional')}
                  className="bg-google-blue hover:bg-blue-600 text-white"
                >
                  Acessar Novo Perfil
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* User Info */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Informações da Conta</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-google-blue to-google-green rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">
                    {user.email?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{user.email}</p>
                  <p className="text-sm text-gray-500">
                    Membro desde {new Date(user.created_at).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

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

            {cvsLoading ? (
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
                          onClick={() => handleDeleteCV(cv.id, cv.title)}
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

    </div>
  );
};

export default Profile;
