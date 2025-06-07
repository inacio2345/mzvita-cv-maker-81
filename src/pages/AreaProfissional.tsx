
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Briefcase, Target, TrendingUp, Building } from 'lucide-react';
import { useProfessionalArea } from '@/hooks/useProfessionalArea';
import { PROFESSION_CATEGORIES } from '@/data/professions';
import ProfessionalFormWizard from '@/components/professional/ProfessionalFormWizard';

const AreaProfissional = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    selectedProfession,
    showForm,
    getFilteredProfessions,
    handleProfessionSelect,
    handleStartForm
  } = useProfessionalArea();

  const filteredProfessions = getFilteredProfessions();

  if (showForm) {
    return <ProfessionalFormWizard />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Área Profissional
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Encontre sua profissão ideal e gere um CV personalizado para sua área de atuação
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Pesquisar profissões..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 justify-center">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('all')}
                size="sm"
              >
                <Filter className="w-4 h-4 mr-2" />
                Todas
              </Button>
              {PROFESSION_CATEGORIES.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category)}
                  size="sm"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Professions List */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Briefcase className="w-5 h-5 mr-2" />
                    Profissões Disponíveis ({filteredProfessions.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                    {filteredProfessions.map((profession) => (
                      <div
                        key={profession.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                          selectedProfession?.id === profession.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => handleProfessionSelect(profession)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-gray-900">{profession.name}</h3>
                          <Badge variant="secondary" className="text-xs">
                            {profession.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {profession.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Profession Details */}
            <div className="lg:col-span-1">
              {selectedProfession ? (
                <Card className="sticky top-4">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {selectedProfession.name}
                      <Badge>{selectedProfession.category}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold flex items-center mb-2">
                        <Briefcase className="w-4 h-4 mr-2" />
                        Descrição
                      </h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {selectedProfession.description}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold flex items-center mb-2">
                        <Target className="w-4 h-4 mr-2" />
                        Objetivos
                      </h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {selectedProfession.objectives}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold flex items-center mb-2">
                        <TrendingUp className="w-4 h-4 mr-2" />
                        Importância
                      </h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {selectedProfession.importance}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold flex items-center mb-2">
                        <Building className="w-4 h-4 mr-2" />
                        Áreas de Aplicação
                      </h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {selectedProfession.applicationAreas}
                      </p>
                    </div>

                    <Button
                      onClick={handleStartForm}
                      className="w-full bg-green-600 hover:bg-green-700"
                      size="lg"
                    >
                      Gerar Meu CV Nessa Área
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card className="sticky top-4">
                  <CardContent className="flex items-center justify-center h-64">
                    <div className="text-center">
                      <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">
                        Selecione uma profissão para ver os detalhes
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AreaProfissional;
