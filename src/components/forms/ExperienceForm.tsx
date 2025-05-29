
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2, Briefcase } from 'lucide-react';

const ExperienceForm = ({ data, onUpdate }) => {
  const [experienceList, setExperienceList] = useState(data.experience || []);

  const addExperience = () => {
    const newExperience = {
      id: Date.now(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    };
    const updated = [...experienceList, newExperience];
    setExperienceList(updated);
    onUpdate({ experience: updated });
  };

  const removeExperience = (id) => {
    const updated = experienceList.filter(item => item.id !== id);
    setExperienceList(updated);
    onUpdate({ experience: updated });
  };

  const updateExperience = (id, field, value) => {
    const updated = experienceList.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    );
    setExperienceList(updated);
    onUpdate({ experience: updated });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Experiência Profissional</h3>
        <p className="text-gray-600">Adicione sua experiência de trabalho e projetos</p>
      </div>

      {experienceList.length === 0 && (
        <div className="text-center py-8">
          <Briefcase className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">Nenhuma experiência adicionada ainda</p>
        </div>
      )}

      {experienceList.map((experience) => (
        <Card key={experience.id} className="p-6 border-2 border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-semibold text-gray-900">Experiência</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeExperience(experience.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label>Empresa/Organização *</Label>
              <Input
                placeholder="Nome da empresa"
                value={experience.company}
                onChange={(e) => updateExperience(experience.id, 'company', e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label>Cargo *</Label>
              <Input
                placeholder="Seu cargo na empresa"
                value={experience.position}
                onChange={(e) => updateExperience(experience.id, 'position', e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label>Data de Início</Label>
              <Input
                type="date"
                value={experience.startDate}
                onChange={(e) => updateExperience(experience.id, 'startDate', e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label>Data de Fim</Label>
              <Input
                type="date"
                value={experience.endDate}
                onChange={(e) => updateExperience(experience.id, 'endDate', e.target.value)}
                className="mt-1"
                disabled={experience.current}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 mb-4">
            <Checkbox
              id={`current-${experience.id}`}
              checked={experience.current}
              onCheckedChange={(checked) => updateExperience(experience.id, 'current', checked)}
            />
            <Label htmlFor={`current-${experience.id}`}>Trabalho atual</Label>
          </div>

          <div>
            <Label>Principais Responsabilidades</Label>
            <Textarea
              placeholder="Descreva suas principais responsabilidades e conquistas nesta função..."
              value={experience.description}
              onChange={(e) => updateExperience(experience.id, 'description', e.target.value)}
              className="mt-1 h-24"
            />
          </div>
        </Card>
      ))}

      <Button
        onClick={addExperience}
        variant="outline"
        className="w-full flex items-center justify-center border-dashed border-2 border-gray-300 hover:border-google-blue hover:text-google-blue"
      >
        <Plus className="w-4 h-4 mr-2" />
        Adicionar Experiência
      </Button>

      <div className="bg-purple-50 p-4 rounded-lg">
        <p className="text-sm text-purple-800">
          <strong>Dica:</strong> Use verbos de ação e números quando possível. 
          Exemplo: "Gerenciei equipe de 5 pessoas" ou "Aumentei vendas em 20%".
        </p>
      </div>
    </div>
  );
};

export default ExperienceForm;
