
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Edit, Eye, Star } from 'lucide-react';
import { cvTemplates } from '@/data/cvTemplates';

const Exemplos = () => {
  const navigate = useNavigate();

  const handleUseTemplate = (template: any) => {
    navigate('/criar-cv', { state: { templateData: template.dados, selectedTemplate: template } });
  };

  const handlePreview = (template: any) => {
    navigate('/preview', { state: { cvData: template.dados, selectedTemplate: template } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="flex items-center text-gray-600 hover:text-google-blue"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Início
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-google-blue to-google-green rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Exemplos de CV</h1>
            </div>
            <Button
              onClick={() => navigate('/criar-cv')}
              className="bg-google-blue hover:bg-blue-600 text-white flex items-center"
            >
              <FileText className="w-4 h-4 mr-2" />
              Criar do Zero
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            Escolha seu Modelo de CV
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Selecione um dos nossos modelos profissionais desenvolvidos especialmente para o mercado moçambicano. 
            Todos os modelos são totalmente editáveis e otimizados para impressão.
          </p>
        </div>

        {/* Filter Tags */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {Array.from(new Set(cvTemplates.map(t => t.paleta))).map((paleta) => (
            <span key={paleta} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
              {paleta.replace('_', ' ')}
            </span>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cvTemplates.map((template) => (
            <Card key={template.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              {/* Preview Card */}
              <div className="relative h-80 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                {/* Mini CV Preview */}
                <div className="absolute inset-4 bg-white rounded shadow-lg transform scale-75 origin-top-left">
                  <div className="h-full flex" style={{ fontSize: '6px', lineHeight: '1.2' }}>
                    {/* Left sidebar preview */}
                    <div 
                      className="w-1/3 p-2 text-white flex flex-col"
                      style={{ backgroundColor: template.colorPalette.primary }}
                    >
                      <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full mx-auto mb-2"></div>
                      <div className="text-center mb-2">
                        <div className="h-1 bg-white bg-opacity-80 mb-1"></div>
                        <div className="h-1 bg-white bg-opacity-60 w-3/4 mx-auto"></div>
                      </div>
                      <div className="space-y-1 flex-1">
                        <div className="h-1 bg-white bg-opacity-60"></div>
                        <div className="h-1 bg-white bg-opacity-40 w-2/3"></div>
                        <div className="h-1 bg-white bg-opacity-40 w-3/4"></div>
                      </div>
                    </div>
                    {/* Right content preview */}
                    <div className="flex-1 p-2 bg-white">
                      <div className="space-y-2">
                        <div className="h-1 bg-gray-300 w-1/2"></div>
                        <div className="space-y-1">
                          <div className="h-1 bg-gray-200"></div>
                          <div className="h-1 bg-gray-200 w-4/5"></div>
                          <div className="h-1 bg-gray-200 w-3/5"></div>
                        </div>
                        <div className="h-1 bg-gray-300 w-2/3 mt-3"></div>
                        <div className="space-y-1">
                          <div className="h-1 bg-gray-200"></div>
                          <div className="h-1 bg-gray-200 w-3/4"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rating and category badges */}
                <div className="absolute top-3 right-3">
                  <div className="bg-white px-2 py-1 rounded-full flex items-center text-xs shadow-md">
                    <Star className="w-3 h-3 text-yellow-500 mr-1 fill-current" />
                    4.8
                  </div>
                </div>
                <div className="absolute top-3 left-3">
                  <span className="bg-google-blue text-white px-2 py-1 rounded-full text-xs">
                    {template.layout}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2 text-gray-900">
                  {template.nome}
                </h3>
                <div className="flex items-center mb-3">
                  <div className="flex space-x-1 mr-3">
                    {Object.values(template.colorPalette).map((color, idx) => (
                      <div 
                        key={idx}
                        className="w-4 h-4 rounded-full border border-gray-200"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">{template.paleta}</span>
                </div>
                
                <p className="text-gray-600 text-sm mb-4">
                  Layout {template.layout.replace('_', ' ')} com seções: {template.secoes.slice(0, 3).join(', ')}
                  {template.secoes.length > 3 && '...'}
                </p>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePreview(template)}
                    className="flex-1 flex items-center justify-center"
                  >
                    <Eye className="w-3 h-3 mr-1" />
                    Visualizar
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleUseTemplate(template)}
                    className="flex-1 bg-google-blue hover:bg-blue-600 text-white flex items-center justify-center"
                  >
                    <Edit className="w-3 h-3 mr-1" />
                    Usar Modelo
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Card className="p-8 max-w-2xl mx-auto border-0 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Precisa de algo personalizado?
            </h2>
            <p className="text-gray-600 mb-6">
              Crie seu CV totalmente personalizado do zero com nosso editor intuitivo e todas as ferramentas profissionais
            </p>
            <Button
              size="lg"
              onClick={() => navigate('/criar-cv')}
              className="bg-gradient-to-r from-google-blue to-google-green hover:from-google-green hover:to-google-blue text-white px-8 py-4"
            >
              <FileText className="w-5 h-5 mr-2" />
              Criar CV Personalizado
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Exemplos;
