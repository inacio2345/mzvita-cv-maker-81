
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, ArrowRight, User, GraduationCap, Briefcase, Award, FileText, Camera, Palette, CheckCircle } from 'lucide-react';
import { useCVData } from '@/hooks/useCVData';
import CVCreationWizard from '@/components/cv/CVCreationWizard';
import PersonalDataForm from '@/components/forms/PersonalDataForm';
import EducationForm from '@/components/forms/EducationForm';
import ExperienceForm from '@/components/forms/ExperienceForm';
import SkillsForm from '@/components/forms/SkillsForm';
import AboutForm from '@/components/forms/AboutForm';
import ColorPaletteForm from '@/components/forms/ColorPaletteForm';
import PhotoUploadForm from '@/components/forms/PhotoUploadForm';
import { getDefaultTemplate } from '@/data/cvTemplates';
import { useToast } from '@/hooks/use-toast';

const CreateCV = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const templateData = location.state?.templateData;
  const selectedTemplate = location.state?.selectedTemplate || getDefaultTemplate();
  
  const [currentStep, setCurrentStep] = useState(1);
  const { cvData, updateCVData, validateStep, validateRequiredFields, validationErrors, clearValidationErrors } = useCVData(templateData);

  const steps = [
    { id: 1, title: 'Dados Pessoais', icon: <User className="w-4 h-4 sm:w-5 sm:h-5" />, component: PersonalDataForm, required: true },
    { id: 2, title: 'Foto (Opcional)', icon: <Camera className="w-4 h-4 sm:w-5 sm:h-5" />, component: PhotoUploadForm, required: false },
    { id: 3, title: 'Sobre Mim', icon: <FileText className="w-4 h-4 sm:w-5 sm:h-5" />, component: AboutForm, required: true },
    { id: 4, title: 'Formação', icon: <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" />, component: EducationForm, required: true },
    { id: 5, title: 'Experiência', icon: <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" />, component: ExperienceForm, required: true },
    { id: 6, title: 'Habilidades', icon: <Award className="w-4 h-4 sm:w-5 sm:h-5" />, component: SkillsForm, required: true },
    { id: 7, title: 'Cores do CV', icon: <Palette className="w-4 h-4 sm:w-5 sm:h-5" />, component: ColorPaletteForm, required: false }
  ];

  const currentStepData = steps[currentStep - 1];
  const isStepValid = (stepId: number) => {
    const step = steps.find(s => s.id === stepId);
    if (!step?.required) return true;
    return validateStep(stepId);
  };

  const handleNext = () => {
    // Limpar erros anteriores
    clearValidationErrors();
    
    // Validar apenas se a etapa atual for obrigatória
    if (currentStepData.required) {
      const isValid = validateStep(currentStep);
      if (!isValid) {
        toast({
          title: "Verifique os campos obrigatórios",
          description: `Complete todos os campos obrigatórios na etapa "${currentStepData.title}" para continuar.`,
          variant: "destructive",
        });
        return;
      }
    }

    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Validação final antes de ir para preview
      const isValid = validateRequiredFields();
      if (!isValid) {
        toast({
          title: "CV incompleto",
          description: "Alguns campos obrigatórios não foram preenchidos. Verifique e tente novamente.",
          variant: "destructive",
        });
        
        // Voltar para a primeira etapa com erro
        const firstStepWithError = steps.find(step => 
          step.required && !validateStep(step.id)
        );
        if (firstStepWithError) {
          setCurrentStep(firstStepWithError.id);
        }
        return;
      }

      navigate('/preview', { 
        state: { 
          cvData, 
          selectedTemplate: selectedTemplate,
          userPhoto: cvData.personalData?.photo
        }
      });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      clearValidationErrors();
    }
  };

  const handleStepChange = (stepId: number) => {
    // Permitir navegação apenas se as etapas anteriores obrigatórias estiverem válidas
    const previousRequiredSteps = steps.filter(step => step.id < stepId && step.required);
    const allPreviousValid = previousRequiredSteps.every(step => validateStep(step.id));
    
    if (allPreviousValid || stepId < currentStep) {
      setCurrentStep(stepId);
      clearValidationErrors();
    }
  };

  const CurrentStepComponent = currentStepData?.component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-4 sm:py-6 md:py-8">
        <div className="max-w-4xl mx-auto">
          <CVCreationWizard 
            steps={steps}
            currentStep={currentStep}
            onStepChange={handleStepChange}
            completedSteps={steps.filter(step => !step.required || validateStep(step.id)).map(s => s.id)}
          />

          <Card className="p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 md:mb-8 shadow-lg border-0">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStepData.required && isStepValid(currentStep) 
                    ? 'bg-green-100 text-green-600' 
                    : currentStepData.required 
                      ? 'bg-red-100 text-red-600'
                      : 'bg-blue-100 text-blue-600'
                }`}>
                  {currentStepData.required && isStepValid(currentStep) ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    currentStepData.icon
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {currentStepData.title}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {currentStepData.required ? 'Obrigatório' : 'Opcional'}
                  </p>
                </div>
              </div>
            </div>

            {CurrentStepComponent && (
              <CurrentStepComponent
                data={cvData}
                onUpdate={updateCVData}
                errors={validationErrors}
              />
            )}
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="flex items-center text-sm sm:text-base px-3 sm:px-4 py-2"
              size="sm"
            >
              <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Anterior</span>
              <span className="sm:hidden">Ant.</span>
            </Button>

            <div className="text-xs sm:text-sm text-gray-500 font-medium flex items-center gap-2">
              <span>{currentStep} / {steps.length}</span>
              {currentStepData.required && isStepValid(currentStep) && (
                <CheckCircle className="w-4 h-4 text-green-600" />
              )}
            </div>

            <Button
              onClick={handleNext}
              disabled={currentStepData.required && !isStepValid(currentStep)}
              className="bg-google-blue hover:bg-blue-600 text-white flex items-center text-sm sm:text-base px-3 sm:px-4 py-2 disabled:bg-gray-300"
              size="sm"
            >
              <span className="hidden sm:inline">
                {currentStep === steps.length ? 'Visualizar CV' : 'Próximo'}
              </span>
              <span className="sm:hidden">
                {currentStep === steps.length ? 'Ver CV' : 'Próx.'}
              </span>
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCV;
