
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { FileText, Download, Eye, Star, X } from 'lucide-react';
import Footer from '@/components/ui/footer';
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
      title: "CV Executivo Premium",
      description: "Perfeito para cargos de gestão e liderança",
      image: "/lovable-uploads/5b6ca5ab-a64b-47e8-a7c5-7799482fe3ef.png",
      rating: 5,
      downloads: 1250,
      category: "Administração"
    },
    {
      id: 2,
      templateId: "cv06",
      title: "CV Moderno Tech",
      description: "Ideal para profissionais de tecnologia",
      image: "/lovable-uploads/5b6ca5ab-a64b-47e8-a7c5-7799482fe3ef.png",
      rating: 5,
      downloads: 980,
      category: "Informática"
    },
    {
      id: 3,
      templateId: "cv02",
      title: "CV Criativo Design",
      description: "Para designers e profissionais criativos",
      image: "/lovable-uploads/5b6ca5ab-a64b-47e8-a7c5-7799482fe3ef.png",
      rating: 4,
      downloads: 750,
      category: "Design"
    },
    {
      id: 4,
      templateId: "cv04",
      title: "CV Clássico Profissional",
      description: "Elegante e tradicional para todas as áreas",
      image: "/lovable-uploads/5b6ca5ab-a64b-47e8-a7c5-7799482fe3ef.png",
      rating: 5,
      downloads: 1500,
      category: "Administração"
    },
    {
      id: 5,
      templateId: "cv03",
      title: "CV Minimalista",
      description: "Limpo e direto ao ponto",
      image: "/lovable-uploads/5b6ca5ab-a64b-47e8-a7c5-7799482fe3ef.png",
      rating: 4,
      downloads: 650,
      category: "Engenharia"
    },
    {
      id: 6,
      templateId: "cv07",
      title: "CV Académico Formal",
      description: "Ideal para pesquisadores e acadêmicos",
      image: "/lovable-uploads/5b6ca5ab-a64b-47e8-a7c5-7799482fe3ef.png",
      rating: 4,
      downloads: 850,
      category: "Educação"
    },
    {
      id: 7,
      templateId: "cv08",
      title: "CV Comercial Dinâmico",
      description: "Para profissionais de vendas e comercial",
      image: "/lovable-uploads/5b6ca5ab-a64b-47e8-a7c5-7799482fe3ef.png",
      rating: 5,
      downloads: 920,
      category: "Administração"
    },
    {
      id: 8,
      templateId: "cv07",
      title: "CV Saúde Profissional",
      description: "Especializado para área da saúde",
      image: "/lovable-uploads/5b6ca5ab-a64b-47e8-a7c5-7799482fe3ef.png",
      rating: 4,
      downloads: 680,
      category: "Saúde"
    },
    {
      id: 9,
      templateId: "cv05",
      title: "CV Hotelaria Elegante",
      description: "Para profissionais de turismo e hotelaria",
      image: "/lovable-uploads/5b6ca5ab-a64b-47e8-a7c5-7799482fe3ef.png",
      rating: 4,
      downloads: 540,
      category: "Hotelaria"
    }
  ];

  const categories = ["Todos", "Administração", "Saúde", "Engenharia", "Educação", "Hotelaria", "Informática", "Design"];

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

            <div className="flex items-center space-x-2">
              <Button 
                onClick={() => navigate('/criar-cv')}
                className="bg-google-blue hover:bg-blue-600 text-white text-sm px-4 py-2"
              >
                Criar CV Grátis
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-8 sm:py-12 lg:py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-google-blue via-google-red to-google-green bg-clip-text text-transparent leading-tight">
            Exemplos de CVs
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-2">
            Explore nossa coleção de templates profissionais e encontre o estilo perfeito para destacar seu perfil no mercado de trabalho.
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
            {filteredExamples.map((example) => (
              <Card key={example.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0 shadow-lg group">
                <div className="aspect-[3/4] overflow-hidden bg-gray-100 relative">
                  <img
                    src={example.image}
                    alt={example.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
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
                <div className="p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-gradient-to-r from-google-blue to-google-green text-white text-xs px-2 py-1 rounded-full">
                      {example.category}
                    </span>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 sm:w-4 sm:h-4 ${
                            i < example.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{example.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm sm:text-base">{example.description}</p>
                  <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{example.downloads} downloads</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleViewExample(example)}
                      className="flex-1 border-google-blue text-google-blue hover:bg-google-blue hover:text-white text-xs sm:text-sm"
                    >
                      <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      Ver Exemplo
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={() => handleUseTemplate(example)}
                      className="flex-1 bg-google-blue hover:bg-blue-600 text-white text-xs sm:text-sm"
                    >
                      Usar Modelo
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
            <div className="space-y-4">
              <div className="aspect-[3/4] max-h-[70vh] overflow-hidden bg-gray-100 rounded-lg">
                <img
                  src={selectedExample.image}
                  alt={selectedExample.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold">{selectedExample.title}</h3>
                  <p className="text-gray-600">{selectedExample.description}</p>
                  <p className="text-sm text-gray-500 mt-2">Categoria: {selectedExample.category}</p>
                </div>
                <Button 
                  onClick={() => {
                    handleUseTemplate(selectedExample);
                    setIsModalOpen(false);
                  }}
                  className="bg-google-blue hover:bg-blue-600 text-white"
                >
                  Usar Este Modelo
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 bg-gradient-to-r from-google-blue to-google-green">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">Pronto para Criar seu CV?</h2>
          <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 opacity-90 max-w-2xl mx-auto">
            Use qualquer um destes templates como base e personalize com suas informações para criar um CV profissional em minutos.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-google-blue hover:bg-gray-100 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            onClick={() => navigate('/criar-cv')}
          >
            Começar Agora - Grátis
            <FileText className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Exemplos;
