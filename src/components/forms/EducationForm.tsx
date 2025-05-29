
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, GraduationCap } from 'lucide-react';

const EducationForm = ({ data, onUpdate }) => {
  const [educationList, setEducationList] = useState(data.education || []);

  const addEducation = () => {
    const newEducation = {
      id: Date.now(),
      institution: '',
      degree: '',
      field: '',
      startYear: '',
      endYear: '',
      current: false
    };
    const updated = [...educationList, newEducation];
    setEducationList(updated);
    onUpdate({ education: updated });
  };

  const removeEducation = (id) => {
    const updated = educationList.filter(item => item.id !== id);
    setEducationList(updated);
    onUpdate({ education: updated });
  };

  const updateEducation = (id, field, value) => {
    const updated = educationList.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    );
    setEducationList(updated);
    onUpdate({ education: updated });
  };

  const degreeOptions = [
    'Ensino Primário',
    'Ensino Secundário',
    'Ensino Técnico',
    'Licenciatura',
    'Mestrado',
    'Doutoramento',
    'Curso Profissional'
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Formação Académica</h3>
        <p className="text-gray-600">Adicione sua formação educacional e cursos</p>
      </div>

      {educationList.length === 0 && (
        <div className="text-center py-8">
          <GraduationCap className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">Nenhuma formação adicionada ainda</p>
        </div>
      )}

      {educationList.map((education) => (
        <Card key={education.id} className="p-6 border-2 border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-semibold text-gray-900">Formação</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeEducation(education.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Instituição *</Label>
              <Input
                placeholder="Universidade Eduardo Mondlane"
                value={education.institution}
                onChange={(e) => updateEducation(education.id, 'institution', e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label>Nível de Ensino *</Label>
              <Select value={education.degree} onValueChange={(value) => updateEducation(education.id, 'degree', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Selecionar nível" />
                </SelectTrigger>
                <SelectContent>
                  {degreeOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Curso/Área</Label>
              <Input
                placeholder="Engenharia Informática"
                value={education.field}
                onChange={(e) => updateEducation(education.id, 'field', e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label>Ano de Conclusão</Label>
              <Input
                placeholder="2023"
                value={education.endYear}
                onChange={(e) => updateEducation(education.id, 'endYear', e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        </Card>
      ))}

      <Button
        onClick={addEducation}
        variant="outline"
        className="w-full flex items-center justify-center border-dashed border-2 border-gray-300 hover:border-google-blue hover:text-google-blue"
      >
        <Plus className="w-4 h-4 mr-2" />
        Adicionar Formação
      </Button>

      <div className="bg-green-50 p-4 rounded-lg">
        <p className="text-sm text-green-800">
          <strong>Dica:</strong> Liste sua formação em ordem cronológica, começando pela mais recente. 
          Inclua cursos técnicos e certificações relevantes.
        </p>
      </div>
    </div>
  );
};

export default EducationForm;
