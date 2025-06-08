
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, ArrowRight, User, GraduationCap, Briefcase, Award, FileText, Camera, Palette } from 'lucide-react';
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
  const { cvData, updateCVData, validateRequiredFields, validationErrors } = useCVData(templateData);

  const steps = [
    { id: 1, title: 'Dados Pessoais', icon: <User className="w-4 h-4 sm:w-5 sm:h-5" />, component: PersonalDataForm },
    { id: 2, title: 'Foto (Opcional)', icon: <Camera className="w-4 h-4 sm:w-5 sm:h-5" />, component: PhotoUploadForm },
    { id: 3, title: 'Sobre Mim', icon: <FileText className="w-4 h-4 sm:w-5 sm:h-5" />, component: AboutForm },
    { id: 4, title: 'Formação', icon: <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" />, component: EducationForm },
    { id: 5, title: 'Experiência', icon: <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" />, component: ExperienceForm },
    { id: 6, title: 'Habilidades', icon: <Award className="w-4 h-4 sm:w-5 sm:h-5" />, component: SkillsForm },
    { id: 7, title: 'Cores do CV', icon: <Palette className="w-4 h-4 sm:w-5 sm:h-5" />, component: ColorPaletteForm }
  ];

  const handleNext = () => {
    // Validar campos obrigatórios antes de avançar
    if (currentStep === 1 || currentStep === 3 || currentStep === 4 || currentStep === 5) {
      const isValid = validateRequiredFields();
      if (!isValid) {
        toast({
          title: "Campos obrigatórios não preenchidos",
          description: "Por favor, preencha todos os campos obrigatórios antes de continuar.",
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
    }
  };

  const CurrentStepComponent = steps[currentStep - 1]?.component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-4 sm:py-6 md:py-8">
        <div className="max-w-4xl mx-auto">
          <CVCreationWizard 
            steps={steps}
            currentStep={currentStep}
            onStepChange={setCurrentStep}
          />

          <Card className="p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 md:mb-8 shadow-lg border-0">
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

            <div className="text-xs sm:text-sm text-gray-500 font-medium">
              {currentStep} / {steps.length}
            </div>

            <Button
              onClick={handleNext}
              className="bg-google-blue hover:bg-blue-600 text-white flex items-center text-sm sm:text-base px-3 sm:px-4 py-2"
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
