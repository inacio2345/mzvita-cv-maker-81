
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, X, Award, Code, Users, Wrench } from 'lucide-react';

const SkillsForm = ({ data, onUpdate }) => {
  const [skills, setSkills] = useState({
    technical: data.skills?.technical || [],
    soft: data.skills?.soft || [],
    languages: data.skills?.languages || [],
    tools: data.skills?.tools || []
  });

  const [newSkill, setNewSkill] = useState({
    technical: '',
    soft: '',
    languages: '',
    tools: ''
  });

  const addSkill = (category) => {
    if (newSkill[category].trim()) {
      const updated = {
        ...skills,
        [category]: [...skills[category], newSkill[category].trim()]
      };
      setSkills(updated);
      setNewSkill({ ...newSkill, [category]: '' });
      onUpdate({ skills: updated });
    }
  };

  const removeSkill = (category, index) => {
    const updated = {
      ...skills,
      [category]: skills[category].filter((_, i) => i !== index)
    };
    setSkills(updated);
    onUpdate({ skills: updated });
  };

  const skillCategories = [
    {
      key: 'technical',
      title: 'Habilidades Técnicas',
      icon: <Code className="w-5 h-5" />,
      placeholder: 'Ex: Microsoft Office, Photoshop, AutoCAD',
      suggestions: ['Microsoft Office', 'Photoshop', 'AutoCAD', 'Excel Avançado', 'PowerPoint', 'Word']
    },
    {
      key: 'soft',
      title: 'Habilidades Interpessoais',
      icon: <Users className="w-5 h-5" />,
      placeholder: 'Ex: Liderança, Comunicação, Trabalho em equipe',
      suggestions: ['Liderança', 'Comunicação', 'Trabalho em Equipe', 'Resolução de Problemas', 'Adaptabilidade', 'Criatividade']
    },
    {
      key: 'languages',
      title: 'Idiomas',
      icon: <Award className="w-5 h-5" />,
      placeholder: 'Ex: Português (Nativo), Inglês (Intermediário)',
      suggestions: ['Português (Nativo)', 'Inglês (Básico)', 'Inglês (Intermediário)', 'Inglês (Avançado)', 'Francês', 'Espanhol']
    },
    {
      key: 'tools',
      title: 'Ferramentas e Software',
      icon: <Wrench className="w-5 h-5" />,
      placeholder: 'Ex: SAP, CRM, ERP, Sistemas específicos',
      suggestions: ['SAP', 'CRM', 'ERP', 'QuickBooks', 'Sage', 'Windows', 'Linux']
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Habilidades e Competências</h3>
        <p className="text-gray-600">Adicione suas habilidades técnicas e interpessoais</p>
      </div>

      {skillCategories.map((category) => (
        <Card key={category.key} className="p-6 border-2 border-gray-100">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-google-blue/10 rounded-lg flex items-center justify-center mr-3">
              {category.icon}
            </div>
            <h4 className="font-semibold text-gray-900">{category.title}</h4>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {skills[category.key].map((skill, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                {skill}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeSkill(category.key, index)}
                  className="h-4 w-4 p-0 hover:bg-transparent"
                >
                  <X className="w-3 h-3" />
                </Button>
              </Badge>
            ))}
          </div>

          <div className="flex gap-2 mb-3">
            <Input
              placeholder={category.placeholder}
              value={newSkill[category.key]}
              onChange={(e) => setNewSkill({ ...newSkill, [category.key]: e.target.value })}
              onKeyPress={(e) => e.key === 'Enter' && addSkill(category.key)}
            />
            <Button
              onClick={() => addSkill(category.key)}
              size="sm"
              className="bg-google-blue hover:bg-blue-600"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex flex-wrap gap-1">
            <span className="text-xs text-gray-500 mr-2">Sugestões:</span>
            {category.suggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => {
                  if (!skills[category.key].includes(suggestion)) {
                    const updated = {
                      ...skills,
                      [category.key]: [...skills[category.key], suggestion]
                    };
                    setSkills(updated);
                    onUpdate({ skills: updated });
                  }
                }}
                className="text-xs text-google-blue hover:underline mr-1"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </Card>
      ))}

      <div className="bg-orange-50 p-4 rounded-lg">
        <p className="text-sm text-orange-800">
          <strong>Dica:</strong> Seja específico e honesto sobre seu nível de conhecimento. 
          Priorize habilidades relevantes para a vaga que pretende.
        </p>
      </div>
    </div>
  );
};

export default SkillsForm;
