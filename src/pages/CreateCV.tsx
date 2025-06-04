
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, ArrowRight, User, GraduationCap, Briefcase, Award, FileText, Eye, Palette, AlertCircle, Camera, Lock } from 'lucide-react';
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
  const { user, loading } = useAuth();
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

  // Check authentication status
  useEffect(() => {
    if (!loading && !user) {
      setShowAuthModal(true);
    }
  }, [user, loading]);

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
    if (!user) {
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

  const handlePreview = () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    
    navigate('/preview', { 
      state: { 
        cvData, 
        selectedTemplate: selectedTemplate,
        userPhoto: cvData.personalData?.photo
      }
    });
  };

  const CurrentStepComponent = steps[currentStep - 1]?.component;

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-gradient-to-r from-google-blue to-google-green rounded-lg flex items-center justify-center mx-auto mb-4">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-4 sm:py-6 md:py-8">
        <div className="max-w-4xl mx-auto">
          {/* Authentication Warning */}
          {!user && (
            <div className="mb-4 sm:mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <Lock className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-orange-800 font-medium text-sm sm:text-base">Autenticação Necessária</p>
                  <p className="text-orange-700 text-xs sm:text-sm">
                    Você precisa fazer login para criar e salvar seus CVs.
                  </p>
                  <Button 
                    onClick={() => setShowAuthModal(true)}
                    className="mt-2 bg-orange-600 hover:bg-orange-700 text-white text-sm"
                    size="sm"
                  >
                    Fazer Login
                  </Button>
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
              {!user && (
                <p className="text-xs sm:text-sm text-orange-600 mt-2">
                  Faça login para continuar criando seu CV
                </p>
              )}
            </div>
          </div>

          {/* Form Content */}
          <Card className={`p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 md:mb-8 shadow-lg border-0 ${!user ? 'opacity-50' : ''}`}>
            {CurrentStepComponent && (
              <CurrentStepComponent
                data={cvData}
                onUpdate={handleDataUpdate}
              />
            )}
            
            {!user && (
              <div className="absolute inset-0 bg-white bg-opacity-75 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Lock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">Faça login para continuar</p>
                  <Button 
                    onClick={() => setShowAuthModal(true)}
                    className="bg-google-blue hover:bg-blue-600 text-white"
                  >
                    Fazer Login
                  </Button>
                </div>
              </div>
            )}
          </Card>

          {/* Navigation Buttons - Mobile Optimized */}
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1 || !user}
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
              disabled={!user}
              className="bg-google-blue hover:bg-blue-600 text-white flex items-center text-sm sm:text-base px-3 sm:px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
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

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => {
          setShowAuthModal(false);
          if (!user) {
            navigate('/');
          }
        }} 
      />
    </div>
  );
};

export default CreateCV;
