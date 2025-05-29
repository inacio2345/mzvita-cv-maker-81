
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ColorPaletteFormProps {
  data: any;
  onUpdate: (data: any) => void;
}

const ColorPaletteForm = ({ data, onUpdate }: ColorPaletteFormProps) => {
  const colorPalettes = [
    {
      name: 'Azul Profissional',
      primary: '#2563eb',
      secondary: '#1e40af',
      accent: '#3b82f6'
    },
    {
      name: 'Verde Empresarial',
      primary: '#16a34a',
      secondary: '#15803d',
      accent: '#22c55e'
    },
    {
      name: 'Roxo Moderno',
      primary: '#7c3aed',
      secondary: '#6d28d9',
      accent: '#8b5cf6'
    },
    {
      name: 'Vermelho Executivo',
      primary: '#dc2626',
      secondary: '#b91c1c',
      accent: '#ef4444'
    },
    {
      name: 'Laranja Criativo',
      primary: '#ea580c',
      secondary: '#c2410c',
      accent: '#f97316'
    },
    {
      name: 'Cinza Elegante',
      primary: '#374151',
      secondary: '#1f2937',
      accent: '#6b7280'
    }
  ];

  const handleColorSelection = (palette: any) => {
    onUpdate({
      ...data,
      colorPalette: palette
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Escolha a Paleta de Cores para seu CV
        </h3>
        <p className="text-gray-600">
          Selecione uma combinação de cores que reflita sua personalidade profissional
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {colorPalettes.map((palette, index) => (
          <Card 
            key={index}
            className={`p-4 cursor-pointer transition-all border-2 ${
              data.colorPalette?.name === palette.name 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => handleColorSelection(palette)}
          >
            <div className="text-center">
              <h4 className="font-medium text-gray-900 mb-3">{palette.name}</h4>
              <div className="flex justify-center space-x-2 mb-3">
                <div 
                  className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                  style={{ backgroundColor: palette.primary }}
                />
                <div 
                  className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                  style={{ backgroundColor: palette.secondary }}
                />
                <div 
                  className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                  style={{ backgroundColor: palette.accent }}
                />
              </div>
              {data.colorPalette?.name === palette.name && (
                <div className="text-blue-600 text-sm font-medium">✓ Selecionada</div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {data.colorPalette && (
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <p className="text-gray-700">
            <strong>Paleta Selecionada:</strong> {data.colorPalette.name}
          </p>
        </div>
      )}
    </div>
  );
};

export default ColorPaletteForm;
