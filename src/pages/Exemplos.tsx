import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { FileText, Download, Eye, Star, X } from 'lucide-react';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { cvTemplates } from '@/data/cvTemplates';

const Exemplos = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedExample, setSelectedExample] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const examples = [
    {
      id: 1,
      templateId: "cv01",
      title: "Profissional Clássico",
      description: "Cabeçalho centralizado com layout de duas colunas. Ideal para áreas corporativas e formais.",
      image: "/lovable-uploads/747f1bdf-1fbe-4810-a1c3-72ea53977221.png",
      rating: 5,
      downloads: 1500,
      category: "Administração",
      features: ["Layout tradicional", "Duas colunas", "Cores neutras", "Impressão otimizada"]
    },
    {
      id: 2,
      templateId: "cv02",
      title: "Barra Lateral Esquerda",
      description: "Foto e dados pessoais em sidebar colorida. Perfeito para profissionais experientes.",
      image: "/lovable-uploads/1854ebd7-7bcf-4b3b-b462-853dbc55e809.png",
      rating: 5,
      downloads: 1250,
      category: "Saúde",
      features: ["Sidebar colorida", "Espaço para foto", "Ícones informativos", "Visual corporativo"]
    },
    {
      id: 3,
      templateId: "cv03",
      title: "Layout Simples com Destaques",
      description: "Estrutura vertical com blocos destacados. Leve e limpo para qualquer área.",
      image: "/lovable-uploads/59c97f28-beba-4d5b-b61f-81af113eb8c3.png",
      rating: 4,
      downloads: 980,
      category: "Engenharia",
      features: ["Blocos destacados", "Estrutura limpa", "Fácil leitura", "Versátil"]
    },
    {
      id: 4,
      templateId: "cv04",
      title: "Criativo Profissional",
      description: "Cores suaves e tipografia moderna. Ideal para marketing, design e áreas criativas.",
      image: "/lovable-uploads/8ac8cb30-f191-426c-8e75-a0c5b9e3f6f0.png",
      rating: 5,
      downloads: 1100,
      category: "Design",
      features: ["Header gradiente", "Ícones grandes", "Cores suaves", "Tipografia moderna"]
    },
    {
      id: 5,
      templateId: "cv05",
      title: "Compacto Menu Direita",
      description: "Layout enxuto com menu lateral direito. Foco em praticidade e organização.",
      image: "/lovable-uploads/b61b9db8-b219-4dee-9766-53e8fe085d6f.png",
      rating: 4,
      downloads: 850,
      category: "Educação",
      features: ["Menu lateral direito", "Layout compacto", "Organização clara", "Versão prática"]
    }
  ];

  const categories = ["Todos", "Administração", "Saúde", "Engenharia", "Design", "Educação", "Informática", "Hotelaria"];

  const filteredExamples = selectedCategory === "Todos" 
    ? examples 
    : examples.filter(example => example.category === selectedCategory);

  const handleViewExample = (example) => {
    setSelectedExample(example);
    setIsModalOpen(true);
  };

  const handleUseTemplate = (example) => {
    const template = cvTemplates.find(t => t.id === example.templateId);
    if (template) {
      navigate('/criar-cv', {
        state: {
          selectedTemplate: template,
          templateData: template.dados,
          fromExamples: true
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div 
              className="flex items-center space-x-2 cursor-pointer" 
              onClick={() => navigate('/')}
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-google-blue to-google-green rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-google-blue to-google-green bg-clip-text text-transparent">
                MozVita
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-4 xl:space-x-8">
              <Button variant="ghost" onClick={() => navigate('/')} className="text-gray-600 hover:text-google-blue">
                Início
              </Button>
              <Button variant="ghost" onClick={() => navigate('/como-funciona')} className="text-gray-600 hover:text-google-blue">
                Como Funciona
              </Button>
              <Button variant="ghost" onClick={() => navigate('/precos')} className="text-gray-600 hover:text-google-blue">
                Preços
              </Button>
              <Button variant="ghost" onClick={() => navigate('/contato')} className="text-gray-600 hover:text-google-blue">
                Contato
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-8 sm:py-12 lg:py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-google-blue via-google-red to-google-green bg-clip-text text-transparent leading-tight">
            5 Modelos Profissionais
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-2">
            Escolha entre 5 layouts únicos e visuais criados especificamente para diferentes áreas profissionais. Todos compatíveis com os campos do formulário MozVita.
          </p>
        </div>
      </section>

      {/* Filter Categories */}
      <section className="py-4 sm:py-8 px-4">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === selectedCategory ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`text-xs sm:text-sm px-3 sm:px-4 py-2 ${
                  category === selectedCategory 
                    ? "bg-google-blue hover:bg-blue-600 text-white" 
                    : "border-google-blue text-google-blue hover:bg-google-blue hover:text-white"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Examples Grid */}
      <section className="py-8 sm:py-12 lg:py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 max-w-7xl mx-auto">
            {filteredExamples.map((example) => (
              <Card key={example.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0 shadow-lg group">
                <div className="aspect-[3/4] overflow-hidden bg-gray-100 relative">
                  <img
                    src={example.image}
                    alt={example.title}
                    className="w-full h-full object-contain bg-white transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        onClick={() => handleViewExample(example)}
                        className="bg-white text-google-blue hover:bg-gray-100 mx-1"
                        size="sm"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Ver
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-gradient-to-r from-google-blue to-google-green text-white text-xs px-2 py-1 rounded-full">
                      {example.category}
                    </span>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < example.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{example.title}</h3>
                  <p className="text-gray-600 mb-3 text-sm">{example.description}</p>
                  
                  {/* Features */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {example.features.slice(0, 2).map((feature, index) => (
                        <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <Download className="w-3 h-3" />
                      <span>{example.downloads} downloads</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleViewExample(example)}
                      className="flex-1 border-google-blue text-google-blue hover:bg-google-blue hover:text-white text-xs"
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      Ver
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={() => handleUseTemplate(example)}
                      className="flex-1 bg-google-blue hover:bg-blue-600 text-white text-xs"
                    >
                      Usar
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Modal for viewing examples */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>{selectedExample?.title}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsModalOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          {selectedExample && (
            <div className="space-y-6">
              <div className="aspect-[3/4] max-h-[70vh] overflow-hidden bg-white rounded-lg border">
                <img
                  src={selectedExample.image}
                  alt={selectedExample.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">{selectedExample.title}</h3>
                    <p className="text-gray-600 mb-4">{selectedExample.description}</p>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">
                        <span className="font-medium">Categoria:</span> {selectedExample.category}
                      </p>
                      <p className="text-sm text-gray-500">
                        <span className="font-medium">Downloads:</span> {selectedExample.downloads}
                      </p>
                    </div>
                  </div>
                  <Button 
                    onClick={() => {
                      handleUseTemplate(selectedExample);
                      setIsModalOpen(false);
                    }}
                    className="bg-google-blue hover:bg-blue-600 text-white ml-4"
                  >
                    Usar Este Modelo
                  </Button>
                </div>
                
                {/* Features detalhadas */}
                <div>
                  <h4 className="font-bold text-gray-800 mb-3">Características do Modelo:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedExample.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-google-blue rounded-full mr-2"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 bg-gradient-to-r from-google-blue to-google-green">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">Escolha Seu Modelo Ideal</h2>
          <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 opacity-90 max-w-2xl mx-auto">
            Todos os modelos suportam foto, dados pessoais completos, experiência, formação, habilidades e idiomas. 
            Personalize com suas informações e crie um CV profissional em minutos.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-google-blue hover:bg-gray-100 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            onClick={() => navigate('/como-funciona')}
          >
            Saiba Como Funciona
            <FileText className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

    </div>
  );
};

export default Exemplos;
