
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

const ColorPaletteForm = ({ data, onUpdate }) => {
  const [selectedPalette, setSelectedPalette] = useState(data.colorPalette || {
    primary: '#2563eb',
    secondary: '#64748b',
    accent: '#10b981'
  });
  
  const [customMode, setCustomMode] = useState(false);

  const predefinedPalettes = [
    {
      name: 'Azul Profissional',
      primary: '#2563eb',
      secondary: '#64748b',
      accent: '#10b981'
    },
    {
      name: 'Verde Corporativo',
      primary: '#059669',
      secondary: '#6b7280',
      accent: '#3b82f6'
    },
    {
      name: 'Roxo Moderno',
      primary: '#7c3aed',
      secondary: '#6b7280',
      accent: '#f59e0b'
    },
    {
      name: 'Vermelho Executivo',
      primary: '#dc2626',
      secondary: '#6b7280',
      accent: '#059669'
    },
    {
      name: 'Laranja Criativo',
      primary: '#ea580c',
      secondary: '#6b7280',
      accent: '#2563eb'
    },
    {
      name: 'Cinza Elegante',
      primary: '#374151',
      secondary: '#6b7280',
      accent: '#10b981'
    }
  ];

  const handlePaletteSelect = (palette) => {
    setSelectedPalette(palette);
    onUpdate({ colorPalette: palette });
  };

  const handleCustomColorChange = (colorType, value) => {
    const newPalette = {
      ...selectedPalette,
      [colorType]: value
    };
    setSelectedPalette(newPalette);
    onUpdate({ colorPalette: newPalette });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Cores do CV</h3>
        <p className="text-gray-600">Escolha a paleta de cores para personalizar seu CV</p>
      </div>

      <div className="flex gap-4 mb-6">
        <Button
          type="button"
          variant={!customMode ? "default" : "outline"}
          onClick={() => setCustomMode(false)}
          className="flex-1"
        >
          Paletas Pré-definidas
        </Button>
        <Button
          type="button"
          variant={customMode ? "default" : "outline"}
          onClick={() => setCustomMode(true)}
          className="flex-1"
        >
          Cores Personalizadas
        </Button>
      </div>

      {!customMode ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {predefinedPalettes.map((palette, index) => (
            <Card
              key={index}
              className={`p-4 cursor-pointer border-2 transition-all hover:shadow-md ${
                selectedPalette.primary === palette.primary 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200'
              }`}
              onClick={() => handlePaletteSelect(palette)}
            >
              <div className="text-center mb-3">
                <h4 className="font-medium text-sm">{palette.name}</h4>
              </div>
              <div className="flex gap-2 justify-center">
                <div
                  className="w-6 h-6 rounded-full border border-gray-300"
                  style={{ backgroundColor: palette.primary }}
                  title="Cor Principal"
                />
                <div
                  className="w-6 h-6 rounded-full border border-gray-300"
                  style={{ backgroundColor: palette.secondary }}
                  title="Cor Secundária"
                />
                <div
                  className="w-6 h-6 rounded-full border border-gray-300"
                  style={{ backgroundColor: palette.accent }}
                  title="Cor de Destaque"
                />
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="primaryColor">Cor Principal</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  id="primaryColor"
                  type="color"
                  value={selectedPalette.primary}
                  onChange={(e) => handleCustomColorChange('primary', e.target.value)}
                  className="w-16 h-10 p-1 border rounded"
                />
                <Input
                  type="text"
                  value={selectedPalette.primary}
                  onChange={(e) => handleCustomColorChange('primary', e.target.value)}
                  placeholder="#2563eb"
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="secondaryColor">Cor Secundária</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  id="secondaryColor"
                  type="color"
                  value={selectedPalette.secondary}
                  onChange={(e) => handleCustomColorChange('secondary', e.target.value)}
                  className="w-16 h-10 p-1 border rounded"
                />
                <Input
                  type="text"
                  value={selectedPalette.secondary}
                  onChange={(e) => handleCustomColorChange('secondary', e.target.value)}
                  placeholder="#64748b"
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="accentColor">Cor de Destaque</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  id="accentColor"
                  type="color"
                  value={selectedPalette.accent}
                  onChange={(e) => handleCustomColorChange('accent', e.target.value)}
                  className="w-16 h-10 p-1 border rounded"
                />
                <Input
                  type="text"
                  value={selectedPalette.accent}
                  onChange={(e) => handleCustomColorChange('accent', e.target.value)}
                  placeholder="#10b981"
                  className="flex-1"
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Preview das Cores</h4>
            <div className="flex gap-4 items-center">
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded border"
                  style={{ backgroundColor: selectedPalette.primary }}
                />
                <span className="text-sm">Principal</span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded border"
                  style={{ backgroundColor: selectedPalette.secondary }}
                />
                <span className="text-sm">Secundária</span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded border"
                  style={{ backgroundColor: selectedPalette.accent }}
                />
                <span className="text-sm">Destaque</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-blue-50 p-4 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Dica:</strong> A cor principal é usada para cabeçalhos e títulos, 
          a secundária para textos auxiliares e a de destaque para elementos importantes.
        </p>
      </div>
    </div>
  );
};

export default ColorPaletteForm;
