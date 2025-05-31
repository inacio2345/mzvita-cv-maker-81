
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, ArrowRight, User, GraduationCap, Briefcase, Award, FileText, Eye, Palette } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import AuthModal from '@/components/auth/AuthModal';
import PersonalDataForm from '@/components/forms/PersonalDataForm';
import EducationForm from '@/components/forms/EducationForm';
import ExperienceForm from '@/components/forms/ExperienceForm';
import SkillsForm from '@/components/forms/SkillsForm';
import AboutForm from '@/components/forms/AboutForm';
import ColorPaletteForm from '@/components/forms/ColorPaletteForm';

const CreateCV = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const templateData = location.state?.templateData;
  const selectedTemplate = location.state?.selectedTemplate;
  
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

  // Load template data if available
  useEffect(() => {
    if (templateData) {
      setCvData(templateData);
    }
  }, [templateData]);

  // Check if user needs to login before creating CV
  useEffect(() => {
    if (!user && currentStep > 1) {
      setShowAuthModal(true);
    }
  }, [user, currentStep]);

  const steps = [
    { id: 1, title: 'Dados Pessoais', icon: <User className="w-5 h-5" />, component: PersonalDataForm },
    { id: 2, title: 'Sobre Mim', icon: <FileText className="w-5 h-5" />, component: AboutForm },
    { id: 3, title: 'Formação', icon: <GraduationCap className="w-5 h-5" />, component: EducationForm },
    { id: 4, title: 'Experiência', icon: <Briefcase className="w-5 h-5" />, component: ExperienceForm },
    { id: 5, title: 'Habilidades', icon: <Award className="w-5 h-5" />, component: SkillsForm },
    { id: 6, title: 'Cores do CV', icon: <Palette className="w-5 h-5" />, component: ColorPaletteForm }
  ];

  const handleNext = () => {
    // Require login after first step
    if (!user && currentStep >= 1) {
      setShowAuthModal(true);
      return;
    }

    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/preview', { 
        state: { 
          cvData, 
          selectedTemplate: selectedTemplate || {
            id: "custom",
            nome: "CV Personalizado",
            layout: "duas_colunas",
            foto_posicao: "esquerda",
            paleta: "personalizada",
            colorPalette: cvData.colorPalette || {
              primary: '#2563eb',
              secondary: '#1e40af', 
              accent: '#3b82f6'
            }
          }
        }
      });
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
              onClick={() => navigate('/')}
              className="flex items-center text-gray-600 hover:text-google-blue"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Início
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-google-blue to-google-green rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Criar CV</h1>
              {selectedTemplate && (
                <span className="text-sm text-gray-500">({selectedTemplate.nome})</span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              {user ? (
                <Button
                  variant="outline"
                  onClick={() => navigate('/perfil')}
                  className="border-google-green text-google-green hover:bg-google-green hover:text-white"
                >
                  Meu Perfil
                </Button>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => setShowAuthModal(true)}
                  className="border-google-blue text-google-blue hover:bg-google-blue hover:text-white"
                >
                  Entrar
                </Button>
              )}
              <Button
                variant="outline"
                onClick={() => navigate('/preview', { 
                  state: { 
                    cvData, 
                    selectedTemplate: selectedTemplate || {
                      id: "preview",
                      nome: "Visualização",
                      layout: "duas_colunas",
                      foto_posicao: "esquerda",
                      paleta: "azul",
                      colorPalette: cvData.colorPalette || {
                        primary: '#2563eb',
                        secondary: '#1e40af',
                        accent: '#3b82f6'
                      }
                    }
                  }
                })}
                className="flex items-center border-google-blue text-google-blue hover:bg-google-blue hover:text-white"
              >
                <Eye className="w-4 h-4 mr-2" />
                Visualizar
              </Button>
            </div>
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
              {selectedTemplate && (
                <p className="text-sm text-gray-500 mt-1">
                  Editando modelo: {selectedTemplate.nome}
                </p>
              )}
              {!user && currentStep > 1 && (
                <p className="text-sm text-orange-600 mt-2">
                  Faça login para continuar criando seu CV
                </p>
              )}
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

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </div>
  );
};

export default CreateCV;
