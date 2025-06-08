
import React from 'react';
import { User, GraduationCap, Briefcase, Award, FileText, Camera, Palette } from 'lucide-react';

interface Step {
  id: number;
  title: string;
  icon: React.ReactNode;
  component: React.ComponentType<any>;
}

interface CVCreationWizardProps {
  steps: Step[];
  currentStep: number;
  onStepChange: (step: number) => void;
}

const CVCreationWizard = ({ steps, currentStep, onStepChange }: CVCreationWizardProps) => {
  return (
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
              className={`w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center border-2 transition-all cursor-pointer ${
                currentStep >= step.id
                  ? 'bg-google-blue border-google-blue text-white'
                  : 'bg-white border-gray-300 text-gray-400'
              }`}
              onClick={() => onStepChange(step.id)}
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
      </div>
    </div>
  );
};

export default CVCreationWizard;
