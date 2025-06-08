
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Search, ExternalLink, AlertCircle } from 'lucide-react';

interface Empresa {
  name: string;
  address: string;
  lat: number;
  lon: number;
  place_id: string;
}

const MeuEmprego = () => {
  const [cidade, setCidade] = useState('');
  const [tipoEmpresa, setTipoEmpresa] = useState('');
  const [resultados, setResultados] = useState<Empresa[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  const API_KEY = '3c94218522294e3a9b2e04a4dd2291b3';

  const buscarEmpresas = async () => {
    if (!cidade || !tipoEmpresa) {
      setErro('Por favor, preencha todos os campos');
      return;
    }

    setCarregando(true);
    setErro('');
    setResultados([]);

    try {
      // Primeiro, geocodificar a cidade
      const geocodeResponse = await fetch(
        `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(cidade)}&apiKey=${API_KEY}`
      );
      
      if (!geocodeResponse.ok) {
        throw new Error('Erro ao buscar a cidade');
      }
      
      const geocodeData = await geocodeResponse.json();
      
      if (!geocodeData.features || geocodeData.features.length === 0) {
        setErro('Cidade não encontrada. Verifique o nome e tente novamente.');
        setCarregando(false);
        return;
      }

      const cityCoords = geocodeData.features[0].geometry.coordinates;
      const [lon, lat] = cityCoords;

      // Buscar empresas próximas
      const placesResponse = await fetch(
        `https://api.geoapify.com/v2/places?categories=commercial.${encodeURIComponent(tipoEmpresa.toLowerCase())}&filter=circle:${lon},${lat},10000&bias=proximity:${lon},${lat}&limit=20&apiKey=${API_KEY}`
      );

      if (!placesResponse.ok) {
        throw new Error('Erro ao buscar empresas');
      }

      const placesData = await placesResponse.json();

      if (!placesData.features || placesData.features.length === 0) {
        setErro(`Nenhuma empresa do tipo "${tipoEmpresa}" encontrada em ${cidade}.`);
        setCarregando(false);
        return;
      }

      const empresas: Empresa[] = placesData.features.map((feature: any) => ({
        name: feature.properties.name || feature.properties.address_line1 || 'Nome não disponível',
        address: feature.properties.formatted || 'Endereço não disponível',
        lat: feature.geometry.coordinates[1],
        lon: feature.geometry.coordinates[0],
        place_id: feature.properties.place_id || Math.random().toString(36)
      }));

      setResultados(empresas);
    } catch (error) {
      console.error('Erro na busca:', error);
      setErro('Erro ao buscar empresas. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  };

  const abrirNoMapa = (lat: number, lon: number, nome: string) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;
    window.open(url, '_blank');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Encontre Empresas na Sua Cidade
          </h1>
          <p className="text-gray-600">
            Use seu CV para encontrar oportunidades de trabalho em empresas próximas
          </p>
        </div>

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
                <label htmlFor="cidade" className="block text-sm font-medium text-gray-700 mb-2">
                  Cidade
                </label>
                <Input
                  id="cidade"
                  type="text"
                  placeholder="Ex: Maputo, Beira, Nampula..."
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="tipoEmpresa" className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Empresa
                </label>
                <Input
                  id="tipoEmpresa"
                  type="text"
                  placeholder="Ex: supermarket, pharmacy, bank, hotel..."
                  value={tipoEmpresa}
                  onChange={(e) => setTipoEmpresa(e.target.value)}
                />
              </div>
            </div>
            
            {erro && (
              <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 rounded-md">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">{erro}</span>
              </div>
            )}

            <Button 
              onClick={buscarEmpresas} 
              className="w-full"
              disabled={carregando}
            >
              {carregando ? 'Buscando...' : 'Buscar'}
            </Button>
          </CardContent>
        </Card>

        {/* Área de resultados */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Resultados da Busca
          </h2>
          
          {resultados.length === 0 && !carregando && !erro ? (
            <Card>
              <CardContent className="text-center py-8">
                <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">
                  Nenhuma empresa encontrada. Faça uma busca para ver os resultados.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {resultados.map((empresa, index) => (
                <Card key={empresa.place_id || index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <h3 className="font-semibold text-lg text-gray-900 line-clamp-2">
                        {empresa.name}
                      </h3>
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" />
                        <p className="text-sm text-gray-600 line-clamp-3">
                          {empresa.address}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => abrirNoMapa(empresa.lat, empresa.lon, empresa.name)}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Ver no Mapa
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MeuEmprego;
