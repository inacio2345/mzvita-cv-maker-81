
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, User, Briefcase } from 'lucide-react';
import { useProfessionalArea } from '@/hooks/useProfessionalArea';
import BasicInfoForm from './BasicInfoForm';
import SpecificInfoForm from './SpecificInfoForm';
import { generateProfessionalCV } from '@/services/cvGenerator';
import { useToast } from '@/hooks/use-toast';

const ProfessionalFormWizard = () => {
  const {
    currentStep,
    formData,
    selectedProfession,
    nextStep,
    previousStep,
    resetForm,
    updateFormData
  } = useProfessionalArea();

  const { toast } = useToast();

  const steps = [
    {
      id: 1,
      title: 'Informações Básicas',
      icon: <User className="w-5 h-5" />,
      component: BasicInfoForm
    },
    {
      id: 2,
      title: 'Informações Específicas',
      icon: <Briefcase className="w-5 h-5" />,
      component: SpecificInfoForm
    }
  ];

  const currentStepData = steps[currentStep - 1];
  const CurrentComponent = currentStepData.component;

  const handleNext = () => {
    if (currentStep === 2) {
      // Gerar CV
      handleGenerateCV();
    } else {
      nextStep();
    }
  };

  const handleGenerateCV = async () => {
    if (!selectedProfession || !formData) return;

    try {
      await generateProfessionalCV(formData as any, selectedProfession);
      toast({
        title: "CV Gerado com Sucesso!",
        description: "Seu CV profissional foi gerado e baixado.",
      });
      resetForm();
    } catch (error) {
      toast({
        title: "Erro ao Gerar CV",
        description: "Houve um problema ao gerar seu CV. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const isStepValid = () => {
    if (currentStep === 1) {
      const required = ['fullName', 'email', 'phone', 'address'];
      return required.every(field => formData[field as keyof typeof formData]);
    }
    return true;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Criação de CV - {selectedProfession?.name}
            </h1>
            <p className="text-gray-600">
              Preencha os dados para gerar seu CV personalizado
            </p>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                      currentStep >= step.id
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'bg-white border-gray-300 text-gray-400'
                    }`}
                  >
                    {step.icon}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-0.5 w-32 mx-4 ${
                        currentStep > step.id ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <Progress value={(currentStep / steps.length) * 100} className="h-2" />
          </div>

          {/* Form */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                {currentStepData.icon}
                <span className="ml-2">{currentStepData.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CurrentComponent
                data={formData}
                onUpdate={updateFormData}
                profession={selectedProfession}
              />
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={currentStep === 1 ? resetForm : previousStep}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {currentStep === 1 ? 'Voltar' : 'Anterior'}
            </Button>

            <div className="text-sm text-gray-500">
              Passo {currentStep} de {steps.length}
            </div>

            <Button
              onClick={handleNext}
              disabled={!isStepValid()}
              className="bg-green-600 hover:bg-green-700"
            >
              {currentStep === steps.length ? 'Gerar CV' : 'Próximo'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalFormWizard;
