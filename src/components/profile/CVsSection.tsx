
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
    // Implementar duplicação do CV
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
          <CardTitle>Meus CVs</CardTitle>
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
        <CardTitle className="flex items-center justify-between">
          <span>Meus CVs</span>
          <Button
            onClick={() => navigate('/criar-cv')}
            className="bg-google-blue hover:bg-blue-600"
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
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-google-blue" />
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {cv.title || 'CV Sem Título'}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Criado em {new Date(cv.created_at).toLocaleDateString('pt-BR')} • 
                        Modelo: {cv.template_name}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handlePreviewCV(cv)}
                      title="Visualizar"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEditCV(cv)}
                      title="Editar"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDuplicateCV(cv)}
                      title="Duplicar"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handlePreviewCV(cv)}
                      title="Baixar PDF"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteCV(cv.id, cv.title)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      title="Excluir"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Nenhum CV criado ainda
            </h3>
            <p className="text-gray-500 mb-6">
              Comece criando seu primeiro CV profissional
            </p>
            <Button
              onClick={() => navigate('/criar-cv')}
              className="bg-google-blue hover:bg-blue-600"
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
