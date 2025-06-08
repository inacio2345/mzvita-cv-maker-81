
import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface AboutFormProps {
  data: any;
  onUpdate: (updates: any) => void;
  errors?: Record<string, string>;
}

const AboutForm = ({ data, onUpdate, errors = {} }: AboutFormProps) => {
  const [about, setAbout] = useState(data.about || '');
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    setCharCount(about.trim().length);
  }, [about]);

  const handleChange = (value: string) => {
    setAbout(value);
    setCharCount(value.trim().length);
    onUpdate({ about: value });
  };

  const suggestions = [
    "Profissional dedicado com experiência em desenvolvimento de software e gestão de projetos...",
    "Graduado em Engenharia com forte interesse em inovação tecnológica e sustentabilidade...",
    "Especialista em marketing digital buscando novos desafios no mercado moçambicano...",
    "Jovem profissional motivado a contribuir para o crescimento empresarial através de soluções criativas..."
  ];

  const isValid = charCount >= 50;
  const isOptimal = charCount >= 100 && charCount <= 300;

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Perfil Profissional</h3>
        <p className="text-gray-600">Escreva um breve resumo que destaque suas principais qualificações</p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Label htmlFor="about">
            Resumo Profissional <span className="text-red-500">*</span>
          </Label>
          {isValid && (
            <CheckCircle className="w-4 h-4 text-green-500" />
          )}
          {!isValid && charCount > 0 && (
            <AlertCircle className="w-4 h-4 text-yellow-500" />
          )}
        </div>
        
        <Textarea
          id="about"
          placeholder="Descreva brevemente seu perfil profissional, principais qualificações e objetivos de carreira..."
          value={about}
          onChange={(e) => handleChange(e.target.value)}
          className={`h-32 transition-colors ${
            errors.about ? 'border-red-500 focus:border-red-500' : 
            isValid ? 'border-green-500 focus:border-green-500' : 
            'border-gray-300'
          }`}
          maxLength={500}
        />
        
        <div className="flex justify-between items-center text-sm">
          <div className={`flex items-center gap-1 ${
            charCount < 50 ? 'text-red-500' : 
            isOptimal ? 'text-green-600' : 
            'text-yellow-600'
          }`}>
            <span>{charCount}/500 caracteres</span>
            {charCount < 50 && <span>(mínimo: 50)</span>}
            {isOptimal && <CheckCircle className="w-3 h-3" />}
          </div>
          
          {charCount >= 50 && (
            <span className="text-green-600 text-xs font-medium">✓ Obrigatório preenchido</span>
          )}
        </div>
        
        {errors.about && (
          <p className="text-sm text-red-500 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.about}
          </p>
        )}
      </div>

      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
        <h4 className="font-semibold text-yellow-800 mb-3">💡 Sugestões para começar:</h4>
        <div className="space-y-2">
          {suggestions.map((suggestion, index) => (
            <div 
              key={index} 
              className="cursor-pointer hover:bg-yellow-100 p-2 rounded text-sm text-yellow-700 transition-colors"
              onClick={() => handleChange(suggestion)}
            >
              <span className="font-medium">Exemplo {index + 1}:</span> {suggestion}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h4 className="font-medium text-blue-900 mb-2">📝 Dicas para um bom perfil profissional:</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Mantenha entre 50-300 caracteres para melhor legibilidade</li>
          <li>• Foque em suas principais qualificações e experiências</li>
          <li>• Mencione o que você pode oferecer ao empregador</li>
          <li>• Use palavras-chave da sua área profissional</li>
          <li>• Seja específico sobre seus objetivos de carreira</li>
        </ul>
      </div>
    </div>
  );
};

export default AboutForm;
