
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, MapPin, ExternalLink } from 'lucide-react';
import AppHeader from '@/components/layout/AppHeader';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { SidebarInset } from '@/components/ui/sidebar';

interface Business {
  name: string;
  address: string;
  lat: number;
  lon: number;
  category: string;
}

const MeuEmprego = () => {
  const [businessType, setBusinessType] = useState('');
  const [city, setCity] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Business[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  // TODO: Substituir pela sua API Key da Geoapify
  const GEOAPIFY_API_KEY = 'YOUR_GEOAPIFY_API_KEY_HERE';

  const handleSearch = async () => {
    if (!businessType.trim() || !city.trim()) {
      alert('Por favor, preencha o tipo de empresa e a cidade.');
      return;
    }

    setIsLoading(true);
    setHasSearched(true);

    try {
      // TODO: Implementar a chamada para a API da Geoapify
      // Exemplo de URL que será usada:
      // https://api.geoapify.com/v2/places?categories=${businessType}&filter=place:${city}&apiKey=${GEOAPIFY_API_KEY}
      
      // Simulação de resultados para demonstração
      // Remover esta simulação quando integrar a API real
      setTimeout(() => {
        const mockResults: Business[] = [
          {
            name: "Empresa Exemplo 1",
            address: `Rua Principal, 123 - ${city}`,
            lat: -25.9686,
            lon: 32.5732,
            category: businessType
          },
          {
            name: "Empresa Exemplo 2", 
            address: `Avenida Central, 456 - ${city}`,
            lat: -25.9686,
            lon: 32.5732,
            category: businessType
          }
        ];
        setResults(mockResults);
        setIsLoading(false);
      }, 1000);

    } catch (error) {
      console.error('Erro ao buscar empresas:', error);
      setResults([]);
      setIsLoading(false);
    }
  };

  const openInMap = (lat: number, lon: number, name: string) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}&query_place_id=${encodeURIComponent(name)}`;
    window.open(url, '_blank');
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <SidebarInset>
          <AppHeader 
            title="Meu Emprego"
            customBackPath="/"
            customBackText="Voltar ao Início"
          />
          
          <div className="container mx-auto px-4 py-6">
            <div className="max-w-4xl mx-auto">
              
              {/* Header da página */}
              <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Encontre Empresas na Sua Região
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Procure por empresas próximas à sua cidade para enviar seu CV e encontrar oportunidades de emprego.
                </p>
              </div>

              {/* Formulário de busca */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="w-5 h-5" />
                    Buscar Empresas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="businessType">Tipo de Empresa</Label>
                      <Input
                        id="businessType"
                        type="text"
                        placeholder="Ex: hotel, banco, supermercado, farmácia"
                        value={businessType}
                        onChange={(e) => setBusinessType(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">Cidade</Label>
                      <Input
                        id="city"
                        type="text"
                        placeholder="Ex: Maputo, Beira, Nampula"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <Button 
                    onClick={handleSearch}
                    disabled={isLoading}
                    className="w-full md:w-auto bg-google-blue hover:bg-blue-600"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Buscando...
                      </>
                    ) : (
                      <>
                        <Search className="w-4 h-4 mr-2" />
                        Buscar Empresas
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Resultados da busca */}
              {hasSearched && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      Resultados da Busca
                      {results.length > 0 && (
                        <span className="text-sm font-normal text-gray-600">
                          ({results.length} empresa{results.length !== 1 ? 's' : ''} encontrada{results.length !== 1 ? 's' : ''})
                        </span>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {results.length === 0 ? (
                      <div className="text-center py-8">
                        <div className="text-gray-500 mb-4">
                          <MapPin className="w-12 h-12 mx-auto mb-2 opacity-50" />
                          <p className="text-lg">Nenhuma empresa encontrada</p>
                          <p className="text-sm">Tente buscar com outros termos ou verifique a cidade digitada.</p>
                        </div>
                      </div>
                    ) : (
                      <div className="grid gap-4">
                        {results.map((business, index) => (
                          <div 
                            key={index}
                            className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h3 className="font-semibold text-lg text-gray-900 mb-1">
                                  {business.name}
                                </h3>
                                <p className="text-gray-600 mb-2 flex items-center gap-1">
                                  <MapPin className="w-4 h-4" />
                                  {business.address}
                                </p>
                                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                  {business.category}
                                </span>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openInMap(business.lat, business.lon, business.name)}
                                className="ml-4"
                              >
                                <ExternalLink className="w-4 h-4 mr-1" />
                                Ver no Mapa
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Instruções para uso */}
              <Card className="mt-8 bg-blue-50 border-blue-200">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-blue-900 mb-3">💡 Dicas para encontrar empresas:</h3>
                  <ul className="text-blue-800 space-y-2 text-sm">
                    <li>• Digite tipos específicos como: "hotel", "banco", "supermercado", "farmácia", "escola"</li>
                    <li>• Use o nome completo da cidade para melhores resultados</li>
                    <li>• Clique em "Ver no Mapa" para obter direções e mais informações</li>
                    <li>• Após encontrar empresas interessantes, use seu CV criado no MozVita para se candidatar</li>
                  </ul>
                </CardContent>
              </Card>

            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default MeuEmprego;
