
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProfessionalFormData, Profession } from '@/types/professional';

interface SpecificInfoFormProps {
  data: Partial<ProfessionalFormData>;
  onUpdate: (updates: Partial<ProfessionalFormData>) => void;
  profession?: Profession;
}

const SpecificInfoForm = ({ data, onUpdate, profession }: SpecificInfoFormProps) => {
  const handleChange = (questionId: string, value: string) => {
    const specificAnswers = { ...data.specificAnswers, [questionId]: value };
    onUpdate({ specificAnswers });
  };

  if (!profession) {
    return <div>Nenhuma profissão selecionada</div>;
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Informações Específicas - {profession.name}
        </h3>
        <p className="text-gray-600">
          Preencha as informações específicas da sua área profissional
        </p>
      </div>

      <div className="space-y-6">
        {profession.specificQuestions.map((question) => {
          const currentValue = data.specificAnswers?.[question.id] || '';

          return (
            <div key={question.id}>
              <Label htmlFor={question.id}>
                {question.question}
                {question.required && <span className="text-red-500 ml-1">*</span>}
              </Label>

              {question.type === 'text' && (
                <Input
                  id={question.id}
                  value={currentValue}
                  onChange={(e) => handleChange(question.id, e.target.value)}
                  className="mt-1"
                  required={question.required}
                />
              )}

              {question.type === 'number' && (
                <Input
                  id={question.id}
                  type="number"
                  value={currentValue}
                  onChange={(e) => handleChange(question.id, e.target.value)}
                  className="mt-1"
                  required={question.required}
                />
              )}

              {question.type === 'textarea' && (
                <Textarea
                  id={question.id}
                  value={currentValue}
                  onChange={(e) => handleChange(question.id, e.target.value)}
                  className="mt-1"
                  rows={3}
                  required={question.required}
                />
              )}

              {question.type === 'select' && question.options && (
                <Select
                  value={currentValue}
                  onValueChange={(value) => handleChange(question.id, value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Selecione uma opção..." />
                  </SelectTrigger>
                  <SelectContent>
                    {question.options.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          );
        })}
      </div>

      <div className="bg-green-50 p-4 rounded-lg">
        <p className="text-sm text-green-800">
          <strong>Dica:</strong> Seja específico e detalhado nas suas respostas. 
          Essas informações serão usadas para personalizar seu CV para a área de {profession.name}.
        </p>
      </div>
    </div>
  );
};

export default SpecificInfoForm;
