
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface StatisticsFormProps {
  onComplete: () => void;
}

const StatisticsForm = ({ onComplete }: StatisticsFormProps) => {
  const [answers, setAnswers] = useState({
    howFound: '',
    cvPurpose: '',
    experience: '',
    frequency: ''
  });
  const { toast } = useToast();

  const questions = {
    howFound: {
      title: 'Como encontrou nosso site?',
      options: ['YouTube', 'LinkedIn', 'Por terceiros', 'Facebook', 'Google', 'Outros']
    },
    cvPurpose: {
      title: 'Para que deseja um CV?',
      options: ['Prestação de serviços', 'Procurando trabalho', 'Testando a ferramenta', 'Estudante', 'Empreendedor', 'Outros']
    },
    experience: {
      title: 'Qual sua experiência profissional?',
      options: ['Iniciante (0-2 anos)', 'Intermediário (3-5 anos)', 'Experiente (6-10 anos)', 'Senior (10+ anos)']
    },
    frequency: {
      title: 'Com que frequência atualiza seu CV?',
      options: ['Nunca', 'Raramente', 'A cada 6 meses', 'Mensalmente', 'Conforme necessário']
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!answers.howFound || !answers.cvPurpose || !answers.experience || !answers.frequency) {
      toast({
        title: "Erro",
        description: "Por favor, responda todas as perguntas.",
        variant: "destructive"
      });
      return;
    }

    // Salvar estatísticas
    localStorage.setItem('userStatistics', JSON.stringify(answers));
    
    toast({
      title: "Obrigado!",
      description: "Suas respostas nos ajudam a melhorar nossos serviços.",
    });
    
    onComplete();
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Questionário Rápido</CardTitle>
        <p className="text-center text-gray-600">
          Ajude-nos a conhecer melhor nossos usuários
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {Object.entries(questions).map(([key, question]) => (
            <div key={key} className="space-y-3">
              <Label className="text-lg font-medium">{question.title}</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {question.options.map((option) => (
                  <label key={option} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name={key}
                      value={option}
                      checked={answers[key as keyof typeof answers] === option}
                      onChange={(e) => setAnswers({...answers, [key]: e.target.value})}
                      className="text-blue-600"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          <Button type="submit" className="w-full">
            Finalizar Questionário
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default StatisticsForm;
