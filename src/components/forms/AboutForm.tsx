
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const AboutForm = ({ data, onUpdate }) => {
  const [about, setAbout] = useState(data.about || '');

  const handleChange = (value) => {
    setAbout(value);
    onUpdate({ about: value });
  };

  const suggestions = [
    "Profissional dedicado com experiência em...",
    "Graduado em [curso] com forte interesse em...",
    "Especialista em [área] buscando novos desafios...",
    "Jovem profissional motivado a contribuir..."
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Sobre Mim</h3>
        <p className="text-gray-600">Escreva um breve resumo profissional sobre você</p>
      </div>

      <div>
        <Label htmlFor="about">Resumo Profissional</Label>
        <Textarea
          id="about"
          placeholder="Descreva brevemente seu perfil profissional, principais qualificações e objetivos de carreira..."
          value={about}
          onChange={(e) => handleChange(e.target.value)}
          className="mt-1 h-32"
        />
        <p className="text-sm text-gray-500 mt-1">
          {about.length}/500 caracteres
        </p>
      </div>

      <div className="bg-yellow-50 p-4 rounded-lg">
        <h4 className="font-semibold text-yellow-800 mb-2">Sugestões para começar:</h4>
        <ul className="space-y-1 text-sm text-yellow-700">
          {suggestions.map((suggestion, index) => (
            <li key={index} className="cursor-pointer hover:text-yellow-900" onClick={() => handleChange(suggestion)}>
              • {suggestion}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Dica:</strong> Mantenha entre 2-3 frases. Foque em suas principais qualificações 
          e o que você pode oferecer ao empregador.
        </p>
      </div>
    </div>
  );
};

export default AboutForm;
