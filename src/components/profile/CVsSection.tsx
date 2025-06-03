
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Edit, Copy, Trash2, Download, Plus, Eye } from 'lucide-react';
import { useSavedCVs, SavedCV } from '@/hooks/useSavedCVs';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const CVsSection = () => {
  const { savedCVs, loading, deleteCV } = useSavedCVs();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleDeleteCV = async (cvId: string, cvTitle: string) => {
    if (!confirm(`Tem certeza que deseja excluir o CV "${cvTitle}"?`)) return;
    await deleteCV(cvId);
  };

  const handleDuplicateCV = async (cv: SavedCV) => {
    toast({
      title: "Funcionalidade em desenvolvimento",
      description: "A duplicação de CVs será implementada em breve.",
    });
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
        },
        editingCV: cv
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

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Meus CVs</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-center py-8">Carregando CVs...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
          <span className="text-lg md:text-xl">Meus CVs</span>
          <Button
            onClick={() => navigate('/criar-cv')}
            className="bg-google-blue hover:bg-blue-600 w-full sm:w-auto"
            size="sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            Novo CV
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {savedCVs.length > 0 ? (
          <div className="space-y-4">
            {savedCVs.map((cv) => (
              <div key={cv.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
                  <div className="flex items-start space-x-3 flex-1">
                    <FileText className="w-5 h-5 text-google-blue mt-1 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {cv.title || 'CV Sem Título'}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Criado em {new Date(cv.created_at).toLocaleDateString('pt-BR')}
                      </p>
                      <p className="text-sm text-gray-500">
                        Modelo: {cv.template_name}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 lg:flex-nowrap lg:space-x-2 lg:gap-0">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handlePreviewCV(cv)}
                      title="Visualizar"
                      className="flex-1 sm:flex-none"
                    >
                      <Eye className="w-4 h-4 sm:mr-0 mr-2" />
                      <span className="sm:hidden">Visualizar</span>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEditCV(cv)}
                      title="Editar"
                      className="flex-1 sm:flex-none"
                    >
                      <Edit className="w-4 h-4 sm:mr-0 mr-2" />
                      <span className="sm:hidden">Editar</span>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDuplicateCV(cv)}
                      title="Duplicar"
                      className="flex-1 sm:flex-none"
                    >
                      <Copy className="w-4 h-4 sm:mr-0 mr-2" />
                      <span className="sm:hidden">Duplicar</span>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handlePreviewCV(cv)}
                      title="Baixar PDF"
                      className="flex-1 sm:flex-none"
                    >
                      <Download className="w-4 h-4 sm:mr-0 mr-2" />
                      <span className="sm:hidden">Download</span>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteCV(cv.id, cv.title)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 flex-1 sm:flex-none"
                      title="Excluir"
                    >
                      <Trash2 className="w-4 h-4 sm:mr-0 mr-2" />
                      <span className="sm:hidden">Excluir</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 md:w-16 md:h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Nenhum CV criado ainda
            </h3>
            <p className="text-gray-500 mb-6 text-sm md:text-base">
              Comece criando seu primeiro CV profissional
            </p>
            <Button
              onClick={() => navigate('/criar-cv')}
              className="bg-google-blue hover:bg-blue-600 w-full sm:w-auto"
            >
              <Plus className="w-4 h-4 mr-2" />
              Criar Meu Primeiro CV
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CVsSection;
