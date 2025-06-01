
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, ArrowRight, User, GraduationCap, Briefcase, Award, FileText, Eye, Palette, AlertCircle, Camera } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import AuthModal from '@/components/auth/AuthModal';
import PersonalDataForm from '@/components/forms/PersonalDataForm';
import EducationForm from '@/components/forms/EducationForm';
import ExperienceForm from '@/components/forms/ExperienceForm';
import SkillsForm from '@/components/forms/SkillsForm';
import AboutForm from '@/components/forms/AboutForm';
import ColorPaletteForm from '@/components/forms/ColorPaletteForm';
import PhotoUploadForm from '@/components/forms/PhotoUploadForm';
import MobileNav from '@/components/ui/mobile-nav';
import { getDefaultTemplate } from '@/data/cvTemplates';

interface CVData {
  personalData: {
    photo?: string | null;
    [key: string]: any;
  };
  about: string;
  education: any[];
  experience: any[];
  skills: any[];
  references: any[];
  colorPalette: any;
}

const CreateCV = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isConfigured } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const templateData = location.state?.templateData;
  const selectedTemplate = location.state?.selectedTemplate || getDefaultTemplate();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [cvData, setCvData] = useState<CVData>({
    personalData: {
      photo: null
    },
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
    if (isConfigured && !user && currentStep > 1) {
      setShowAuthModal(true);
    }
  }, [user, currentStep, isConfigured]);

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
    // Require login after first step only if Supabase is configured
    if (isConfigured && !user && currentStep >= 2) {
      setShowAuthModal(true);
      return;
    }

    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
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

  const handleDataUpdate = (stepData: Partial<CVData>) => {
    setCvData(prev => ({ ...prev, ...stepData }));
  };

  const CurrentStepComponent = steps[currentStep - 1]?.component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="flex items-center text-gray-600 hover:text-google-blue text-sm sm:text-base p-2 sm:p-3"
              size="sm"
            >
              <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Voltar ao Início</span>
              <span className="sm:hidden">Voltar</span>
            </Button>

            <div className="flex items-center space-x-2 flex-1 justify-center sm:justify-start sm:flex-initial sm:ml-4">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-google-blue to-google-green rounded-lg flex items-center justify-center">
                <FileText className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">Criar CV</h1>
                {selectedTemplate && (
                  <span className="text-xs sm:text-sm text-gray-500 block">
                    ({selectedTemplate.nome})
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-1 sm:space-x-2">
              {user ? (
                <Button
                  variant="outline"
                  onClick={() => navigate('/perfil')}
                  className="border-google-green text-google-green hover:bg-google-green hover:text-white hidden md:flex text-sm"
                  size="sm"
                >
                  Meu Perfil
                </Button>
              ) : isConfigured ? (
                <Button
                  variant="outline"
                  onClick={() => setShowAuthModal(true)}
                  className="border-google-blue text-google-blue hover:bg-google-blue hover:text-white hidden md:flex text-sm"
                  size="sm"
                >
                  Entrar
                </Button>
              ) : null}
              
              <Button
                variant="outline"
                onClick={() => navigate('/preview', { 
                  state: { 
                    cvData, 
                    selectedTemplate: selectedTemplate,
                    userPhoto: cvData.personalData?.photo
                  }
                })}
                className="flex items-center border-google-blue text-google-blue hover:bg-google-blue hover:text-white text-xs sm:text-sm px-2 sm:px-3"
                size="sm"
              >
                <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                <span className="hidden sm:inline">Visualizar</span>
                <span className="sm:hidden">Ver</span>
              </Button>

              <MobileNav 
                showAuthButton={isConfigured && !user}
                onAuthClick={() => setShowAuthModal(true)}
              />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-4 sm:py-6 md:py-8">
        <div className="max-w-4xl mx-auto">
          {/* Show warning if Supabase is not configured */}
          {!isConfigured && (
            <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-start space-x-2 sm:space-x-3">
                <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-orange-800 font-medium text-sm sm:text-base">Modo de Demonstração</p>
                  <p className="text-orange-700 text-xs sm:text-sm">
                    A autenticação não está configurada. Você pode criar CVs, mas não será possível salvá-los.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Progress Steps - Mobile Optimized */}
          <div className="mb-4 sm:mb-6 md:mb-8">
            {/* Mobile Progress Bar */}
            <div className="block sm:hidden mb-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-google-blue h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / steps.length) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>Passo {currentStep}</span>
                <span>{steps.length} passos</span>
              </div>
            </div>

            {/* Desktop/Tablet Progress Steps */}
            <div className="hidden sm:flex items-center justify-between mb-4 overflow-x-auto pb-2">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center flex-shrink-0">
                  <div
                    className={`w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                      currentStep >= step.id
                        ? 'bg-google-blue border-google-blue text-white'
                        : 'bg-white border-gray-300 text-gray-400'
                    }`}
                  >
                    {step.icon}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-0.5 w-6 md:w-8 lg:w-12 mx-1 md:mx-2 transition-all ${
                        currentStep > step.id ? 'bg-google-blue' : 'bg-gray-300'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2">
                {steps[currentStep - 1]?.title}
              </h2>
              <p className="text-gray-600 text-sm sm:text-base hidden sm:block">
                Passo {currentStep} de {steps.length}
              </p>
              {selectedTemplate && (
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  Modelo: {selectedTemplate.nome}
                </p>
              )}
              {!user && currentStep > 1 && isConfigured && (
                <p className="text-xs sm:text-sm text-orange-600 mt-2">
                  Faça login para continuar criando seu CV
                </p>
              )}
            </div>
          </div>

          {/* Form Content */}
          <Card className="p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 md:mb-8 shadow-lg border-0">
            {CurrentStepComponent && (
              <CurrentStepComponent
                data={cvData}
                onUpdate={handleDataUpdate}
              />
            )}
          </Card>

          {/* Navigation Buttons - Mobile Optimized */}
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

      {!isConfigured && currentStep > 1 && (
        <p className="text-xs sm:text-sm text-orange-600 mt-2 text-center px-4">
          Configure a autenticação para salvar seus CVs
        </p>
      )}

      {isConfigured && (
        <AuthModal 
          isOpen={showAuthModal} 
          onClose={() => setShowAuthModal(false)} 
        />
      )}
    </div>
  );
};

export default CreateCV;
