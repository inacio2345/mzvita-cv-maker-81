
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Edit, Eye, Star, Sparkles, Palette, Layout, Award, ExternalLink } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-purple-100">
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="flex items-center text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-all duration-200"
              size="sm"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Voltar ao Início</span>
              <span className="sm:hidden">Voltar</span>
            </Button>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
              <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Modelos de CV
              </h1>
            </div>
            <Button
              onClick={() => navigate('/criar-cv')}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white flex items-center shadow-lg hover:shadow-xl transition-all duration-200"
              size="sm"
            >
              <FileText className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Criar do Zero</span>
              <span className="sm:hidden">Criar</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 sm:py-12">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-4 sm:mb-6 shadow-xl">
            <Layout className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Escolha seu Modelo Perfeito
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            Descubra templates profissionais criados especialmente para destacar seu perfil no mercado moçambicano. 
            <span className="font-semibold text-purple-600"> Totalmente editáveis e prontos para impressionar!</span>
          </p>
        </div>

        {/* Stats Bar - Responsivo */}
        <div className="flex justify-center mb-8 sm:mb-12">
          <div className="grid grid-cols-3 gap-4 sm:gap-8 bg-white/60 backdrop-blur-lg rounded-2xl p-4 sm:p-8 shadow-xl border border-purple-100 w-full max-w-md sm:max-w-none sm:w-auto">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-1 sm:mb-2">10+</div>
              <div className="text-xs sm:text-sm text-gray-600">Templates Únicos</div>
            </div>
            <div className="text-center border-x border-purple-200">
              <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1 sm:mb-2">100%</div>
              <div className="text-xs sm:text-sm text-gray-600">Editáveis</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-indigo-600 mb-1 sm:mb-2">A4</div>
              <div className="text-xs sm:text-sm text-gray-600">Otimizado</div>
            </div>
          </div>
        </div>

        {/* Templates Grid - Melhor responsividade */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-16">
          {cvTemplates.map((template, index) => (
            <Card key={template.id} className="group overflow-hidden hover:shadow-2xl transition-all duration-500 border-0 shadow-lg bg-white/90 backdrop-blur-lg hover:scale-105">
              {/* Preview Card */}
              <div className="relative h-64 sm:h-80 lg:h-96 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                {/* Enhanced Mini CV Preview */}
                <div className="absolute inset-2 sm:inset-4 bg-white rounded-lg shadow-xl transform scale-75 origin-top-left transition-transform duration-300 group-hover:scale-80">
                  <div className="h-full flex" style={{ fontSize: '6px', lineHeight: '1.2' }}>
                    {/* Left sidebar preview */}
                    <div 
                      className="w-1/3 p-2 sm:p-3 text-white flex flex-col relative overflow-hidden"
                      style={{ backgroundColor: template.colorPalette.primary }}
                    >
                      <div className="absolute top-0 right-0 w-6 h-6 sm:w-8 sm:h-8 bg-white bg-opacity-10 rounded-full -mr-3 sm:-mr-4 -mt-3 sm:-mt-4"></div>
                      
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white bg-opacity-20 rounded-full mx-auto mb-2 sm:mb-3 flex items-center justify-center">
                        <div className="w-4 h-4 sm:w-6 sm:h-6 bg-white bg-opacity-40 rounded-full"></div>
                      </div>
                      <div className="text-center mb-2 sm:mb-3">
                        <div className="h-1 sm:h-1.5 bg-white bg-opacity-90 mb-1 rounded"></div>
                        <div className="h-0.5 sm:h-1 bg-white bg-opacity-70 w-3/4 mx-auto rounded"></div>
                      </div>
                      <div className="space-y-1 sm:space-y-1.5 flex-1">
                        <div className="h-0.5 sm:h-1 bg-white bg-opacity-60 rounded"></div>
                        <div className="h-0.5 sm:h-1 bg-white bg-opacity-50 w-2/3 rounded"></div>
                        <div className="h-0.5 sm:h-1 bg-white bg-opacity-50 w-3/4 rounded"></div>
                        <div className="mt-2 sm:mt-3 space-y-0.5 sm:space-y-1">
                          <div className="h-0.5 sm:h-1 bg-white bg-opacity-40 rounded"></div>
                          <div className="h-0.5 sm:h-1 bg-white bg-opacity-40 w-4/5 rounded"></div>
                        </div>
                      </div>
                    </div>
                    {/* Right content preview */}
                    <div className="flex-1 p-2 sm:p-3 bg-white">
                      <div className="space-y-2 sm:space-y-3">
                        <div className="h-1 sm:h-1.5 bg-gray-300 w-1/2 rounded"></div>
                        <div className="space-y-0.5 sm:space-y-1">
                          <div className="h-0.5 sm:h-1 bg-gray-200 rounded"></div>
                          <div className="h-0.5 sm:h-1 bg-gray-200 w-4/5 rounded"></div>
                          <div className="h-0.5 sm:h-1 bg-gray-200 w-3/5 rounded"></div>
                        </div>
                        <div className="h-1 sm:h-1.5 bg-gray-300 w-2/3 mt-3 sm:mt-4 rounded"></div>
                        <div className="space-y-0.5 sm:space-y-1">
                          <div className="h-0.5 sm:h-1 bg-gray-200 rounded"></div>
                          <div className="h-0.5 sm:h-1 bg-gray-200 w-3/4 rounded"></div>
                          <div className="h-0.5 sm:h-1 bg-gray-200 w-5/6 rounded"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced badges */}
                <div className="absolute top-2 sm:top-4 right-2 sm:right-4 space-y-1 sm:space-y-2">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-full flex items-center text-xs font-medium">
                    <Star className="w-2 h-2 sm:w-3 sm:h-3 mr-1 fill-current" />
                    <span className="hidden sm:inline">4.9</span>
                  </div>
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-medium">
                    <Award className="w-2 h-2 sm:w-3 sm:h-3 mr-1" />
                    <span className="hidden sm:inline">Premium</span>
                  </div>
                </div>
                <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
                  <span 
                    className="text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-medium shadow-lg"
                    style={{ backgroundColor: template.colorPalette.primary }}
                  >
                    <span className="hidden sm:inline">{template.layout}</span>
                    <Palette className="w-3 h-3 sm:hidden" />
                  </span>
                </div>

                {/* Canva link badge */}
                {template.canvaUrl && (
                  <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4">
                    <a 
                      href={template.canvaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-medium shadow-lg flex items-center hover:scale-105 transition-transform"
                    >
                      <ExternalLink className="w-2 h-2 sm:w-3 sm:h-3 mr-1" />
                      <span className="hidden sm:inline">Canva</span>
                    </a>
                  </div>
                )}
              </div>

              {/* Enhanced Card Content */}
              <div className="p-4 sm:p-6 bg-gradient-to-br from-white to-gray-50">
                <h3 className="font-bold text-lg sm:text-xl mb-2 sm:mb-3 text-gray-900 group-hover:text-purple-600 transition-colors duration-200">
                  {template.nome}
                </h3>
                
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="flex space-x-1 mr-3 sm:mr-4">
                    {Object.values(template.colorPalette).slice(0, 3).map((color, idx) => (
                      <div 
                        key={idx}
                        className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-white shadow-md"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <span className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-2 sm:px-3 py-1 rounded-full">
                    {template.paleta.replace('_', ' ')}
                  </span>
                </div>
                
                <p className="text-gray-600 text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed">
                  Layout <span className="font-medium">{template.layout.replace('_', ' ')}</span> com seções: 
                  <span className="text-purple-600 font-medium"> {template.secoes.slice(0, 3).join(', ')}</span>
                  {template.secoes.length > 3 && <span className="text-purple-600 font-medium">...</span>}
                </p>

                {/* Enhanced Action Buttons */}
                <div className="flex gap-2 sm:gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePreview(template)}
                    className="flex-1 flex items-center justify-center border-purple-200 text-purple-600 hover:bg-purple-50 hover:border-purple-300 transition-all duration-200"
                  >
                    <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    <span className="text-xs sm:text-sm">Visualizar</span>
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleUseTemplate(template)}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    <Edit className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    <span className="text-xs sm:text-sm">Usar Modelo</span>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Enhanced Call to Action */}
        <div className="text-center">
          <Card className="p-6 sm:p-12 max-w-4xl mx-auto border-0 shadow-2xl bg-gradient-to-br from-white via-purple-50 to-blue-50 overflow-hidden relative">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-purple-200 to-blue-200 rounded-full -mr-12 sm:-mr-16 -mt-12 sm:-mt-16 opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-tr from-blue-200 to-purple-200 rounded-full -ml-8 sm:-ml-12 -mb-8 sm:-mb-12 opacity-50"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-4 sm:mb-6 shadow-lg">
                <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Nenhum modelo se encaixa perfeitamente?
              </h2>
              <p className="text-gray-600 mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
                Crie seu CV totalmente personalizado do zero com nosso editor intuitivo e todas as ferramentas profissionais. 
                <span className="font-semibold text-purple-600"> Sua criatividade é o limite!</span>
              </p>
              <Button
                size="lg"
                onClick={() => navigate('/criar-cv')}
                className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 hover:from-purple-700 hover:via-blue-700 hover:to-indigo-700 text-white px-6 sm:px-10 py-3 sm:py-4 text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <FileText className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
                Criar CV Personalizado
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 ml-2 sm:ml-3" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Exemplos;
