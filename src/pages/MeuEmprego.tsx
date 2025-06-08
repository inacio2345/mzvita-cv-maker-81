
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Search } from 'lucide-react';

const MeuEmprego = () => {
  const [cidade, setCidade] = useState('');
  const [tipoEmpresa, setTipoEmpresa] = useState('');
  const [resultados, setResultados] = useState([]);
  const [carregando, setCarregando] = useState(false);

  const buscarEmpresas = async () => {
    if (!cidade || !tipoEmpresa) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    setCarregando(true);
    
    // Aqui será implementada a integração com a API Geoapify
    // Por enquanto, apenas simulamos o processo
    setTimeout(() => {
      setCarregando(false);
      console.log('Buscando empresas:', { cidade, tipoEmpresa });
      // Placeholder para resultados da API
    }, 1000);
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
                  placeholder="Ex: banco, hotel, supermercado, farmácia..."
                  value={tipoEmpresa}
                  onChange={(e) => setTipoEmpresa(e.target.value)}
                />
              </div>
            </div>
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
        <div id="resultados-api" className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Resultados da Busca
          </h2>
          {resultados.length === 0 ? (
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
              {/* Os resultados da API serão exibidos aqui */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MeuEmprego;
