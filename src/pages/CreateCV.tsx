import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, User, GraduationCap, Briefcase, Award, FileText, Eye, Palette } from 'lucide-react';
import PersonalDataForm from '@/components/forms/PersonalDataForm';
import EducationForm from '@/components/forms/EducationForm';
import ExperienceForm from '@/components/forms/ExperienceForm';
import SkillsForm from '@/components/forms/SkillsForm';
import AboutForm from '@/components/forms/AboutForm';
import ColorPaletteForm from '@/components/forms/ColorPaletteForm';

const CreateCV = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [cvData, setCvData] = useState({
    personalData: {},
    about: '',
    education: [],
    experience: [],
    skills: [],
    references: [],
    colorPalette: null
  });

  // Verificar se o usuário está logado
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/auth');
    }
  }, [navigate]);

  const steps = [
    { id: 1, title: 'Dados Pessoais', icon: <User className="w-5 h-5" />, component: PersonalDataForm },
    { id: 2, title: 'Sobre Mim', icon: <FileText className="w-5 h-5" />, component: AboutForm },
    { id: 3, title: 'Formação', icon: <GraduationCap className="w-5 h-5" />, component: EducationForm },
    { id: 4, title: 'Experiência', icon: <Briefcase className="w-5 h-5" />, component: ExperienceForm },
    { id: 5, title: 'Habilidades', icon: <Award className="w-5 h-5" />, component: SkillsForm },
    { id: 6, title: 'Cores do CV', icon: <Palette className="w-5 h-5" />, component: ColorPaletteForm }
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Salvar CV do usuário
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const userCvs = JSON.parse(localStorage.getItem('userCvs') || '[]');
      
      const newCv = {
        id: Date.now().toString(),
        ...cvData,
        createdAt: new Date().toISOString(),
        userId: user.id
      };
      
      userCvs.push(newCv);
      localStorage.setItem('userCvs', JSON.stringify(userCvs));
      
      navigate('/preview', { state: { cvData } });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleDataUpdate = (stepData) => {
    setCvData(prev => ({ ...prev, ...stepData }));
  };

  const CurrentStepComponent = steps[currentStep - 1]?.component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate('/perfil')}
              className="flex items-center text-gray-600 hover:text-google-blue"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Perfil
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-google-blue to-google-green rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Criar CV</h1>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate('/preview', { state: { cvData } })}
              className="flex items-center border-google-blue text-google-blue hover:bg-google-blue hover:text-white"
            >
              <Eye className="w-4 h-4 mr-2" />
              Visualizar
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4 overflow-x-auto">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center flex-shrink-0">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                      currentStep >= step.id
                        ? 'bg-google-blue border-google-blue text-white'
                        : 'bg-white border-gray-300 text-gray-400'
                    }`}
                  >
                    {step.icon}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-0.5 w-12 mx-2 transition-all ${
                        currentStep > step.id ? 'bg-google-blue' : 'bg-gray-300'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {steps[currentStep - 1]?.title}
              </h2>
              <p className="text-gray-600">
                Passo {currentStep} de {steps.length}
              </p>
            </div>
          </div>

          {/* Form Content */}
          <Card className="p-8 mb-8 shadow-lg border-0">
            {CurrentStepComponent && (
              <CurrentStepComponent
                data={cvData}
                onUpdate={handleDataUpdate}
              />
            )}
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Anterior
            </Button>

            <div className="text-sm text-gray-500">
              {currentStep} / {steps.length}
            </div>

            <Button
              onClick={handleNext}
              className="bg-google-blue hover:bg-blue-600 text-white flex items-center"
            >
              {currentStep === steps.length ? 'Visualizar CV' : 'Próximo'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCV;
