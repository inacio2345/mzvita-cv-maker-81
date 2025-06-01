
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Globe, Calendar, Award, Briefcase, GraduationCap, User, Star, Save, Plus } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import EditableField from './EditableField';
import { toast } from 'sonner';

interface EditableCVLayoutRendererProps {
  data: any;
  template: any;
  className?: string;
  userPhoto?: string;
  onDataChange: (newData: any) => void;
}

const EditableCVLayoutRenderer = ({ 
  data, 
  template, 
  className = "", 
  userPhoto,
  onDataChange 
}: EditableCVLayoutRendererProps) => {
  const isMobile = useIsMobile();
  const colors = data.colorPalette || template.colorPalette;
  const fonts = template.fonts || { primary: 'Inter', headings: 'Poppins' };
  const [cvData, setCvData] = useState(data);
  const [hasChanges, setHasChanges] = useState(false);

  const updateField = (path: string, value: string) => {
    const newData = { ...cvData };
    const keys = path.split('.');
    let current = newData;
    
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) {
        current[keys[i]] = {};
      }
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
    setCvData(newData);
    setHasChanges(true);
  };

  const addExperience = () => {
    const newExp = {
      position: 'Nova Posição',
      company: 'Nome da Empresa',
      startDate: '2024',
      endDate: '2024',
      current: false,
      description: 'Descrição das responsabilidades e conquistas...'
    };
    
    const newData = {
      ...cvData,
      experience: [...(cvData.experience || []), newExp]
    };
    
    setCvData(newData);
    setHasChanges(true);
  };

  const addEducation = () => {
    const newEdu = {
      degree: 'Curso/Graduação',
      institution: 'Nome da Instituição',
      startYear: '2020',
      endYear: '2024'
    };
    
    const newData = {
      ...cvData,
      education: [...(cvData.education || []), newEdu]
    };
    
    setCvData(newData);
    setHasChanges(true);
  };

  const addSkill = () => {
    const newSkill = 'Nova Competência';
    const newData = {
      ...cvData,
      skills: {
        ...cvData.skills,
        technical: [...(cvData.skills?.technical || []), newSkill]
      }
    };
    
    setCvData(newData);
    setHasChanges(true);
  };

  const saveChanges = () => {
    onDataChange(cvData);
    setHasChanges(false);
    toast.success('Alterações salvas com sucesso!');
  };

  const updateExperience = (index: number, field: string, value: string) => {
    const newData = { ...cvData };
    if (!newData.experience) newData.experience = [];
    if (!newData.experience[index]) return;
    
    newData.experience[index] = {
      ...newData.experience[index],
      [field]: value
    };
    
    setCvData(newData);
    setHasChanges(true);
  };

  const updateEducation = (index: number, field: string, value: string) => {
    const newData = { ...cvData };
    if (!newData.education) newData.education = [];
    if (!newData.education[index]) return;
    
    newData.education[index] = {
      ...newData.education[index],
      [field]: value
    };
    
    setCvData(newData);
    setHasChanges(true);
  };

  const updateSkill = (index: number, value: string) => {
    const newData = { ...cvData };
    if (!newData.skills) newData.skills = { technical: [] };
    if (!newData.skills.technical) newData.skills.technical = [];
    
    newData.skills.technical[index] = value;
    setCvData(newData);
    setHasChanges(true);
  };

  // Função para renderizar foto do usuário
  const renderUserPhoto = (position: string, size: string = "w-24 h-24 sm:w-32 sm:h-32") => {
    if (!userPhoto && !cvData.personalData?.photo) return null;
    
    const photoUrl = userPhoto || cvData.personalData?.photo;
    const baseClasses = `${size} object-cover border-4 border-white shadow-lg flex-shrink-0`;
    
    switch (position) {
      case 'circular':
        return (
          <div className={`${baseClasses} rounded-full overflow-hidden`}>
            <img src={photoUrl} alt="Foto de perfil" className="w-full h-full object-cover" />
          </div>
        );
      case 'square':
        return (
          <div className={`${baseClasses} rounded-lg overflow-hidden`}>
            <img src={photoUrl} alt="Foto de perfil" className="w-full h-full object-cover" />
          </div>
        );
      case 'hexagonal':
        return (
          <div className={`${baseClasses} rounded-lg transform rotate-6 overflow-hidden`}>
            <img src={photoUrl} alt="Foto de perfil" className="w-full h-full object-cover" />
          </div>
        );
      default:
        return (
          <div className={`${baseClasses} rounded-full overflow-hidden`}>
            <img src={photoUrl} alt="Foto de perfil" className="w-full h-full object-cover" />
          </div>
        );
    }
  };

  // Template Executivo Premium - Editável
  const renderEditableExecutivePremium = () => (
    <div 
      className={`${isMobile ? 'block' : 'flex'} min-h-full ${className}`} 
      style={{ fontFamily: fonts.primary }}
    >
      {/* Save Button - Fixed Position */}
      {hasChanges && (
        <div className="fixed top-4 right-4 z-50 print:hidden">
          <Button
            onClick={saveChanges}
            className="bg-green-500 hover:bg-green-600 text-white shadow-lg"
          >
            <Save className="w-4 h-4 mr-2" />
            Salvar Alterações
          </Button>
        </div>
      )}

      {/* Sidebar */}
      <div 
        className={`${isMobile ? 'w-full py-6 px-4' : 'w-1/3 p-6'} text-white relative overflow-hidden cv-section`}
        style={{ backgroundColor: colors.primary }}
      >
        {/* Elementos decorativos */}
        <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-white bg-opacity-10 rounded-full -mr-8 sm:-mr-10 -mt-8 sm:-mt-10"></div>
        <div className="absolute bottom-0 left-0 w-12 h-12 sm:w-16 sm:h-16 bg-white bg-opacity-5 rounded-full -ml-6 sm:-ml-8 -mb-6 sm:-mb-8"></div>
        
        {/* Foto e informações básicas */}
        <div className={`${isMobile ? 'flex items-center space-x-4 mb-6' : 'text-center mb-6'}`}>
          <div className={isMobile ? 'flex-shrink-0' : 'flex justify-center mb-4'}>
            {renderUserPhoto('circular', isMobile ? 'w-20 h-20' : 'w-32 h-32') || (
              <div className={`${isMobile ? 'w-20 h-20' : 'w-32 h-32'} rounded-full bg-white bg-opacity-20 border-4 border-white flex items-center justify-center`}>
                <User className={`${isMobile ? 'w-10 h-10' : 'w-16 h-16'} text-white opacity-60`} />
              </div>
            )}
          </div>
          
          <div className={isMobile ? 'flex-1' : ''}>
            <EditableField
              value={cvData.personalData?.fullName || ''}
              onSave={(value) => updateField('personalData.fullName', value)}
              placeholder="SEU NOME"
              className={`${isMobile ? 'text-xl cv-mobile-name' : 'text-2xl'} font-bold mb-2 text-white`}
            />
            <EditableField
              value={cvData.personalData?.profession || ''}
              onSave={(value) => updateField('personalData.profession', value)}
              placeholder="Sua Profissão"
              className={`${isMobile ? 'text-base cv-mobile-text' : 'text-lg'} opacity-90 text-white`}
            />
          </div>
        </div>

        {/* Contacto */}
        <div className="mb-6 cv-section">
          <h3 className={`${isMobile ? 'text-base cv-mobile-title' : 'text-lg'} font-bold mb-3 border-b-2 pb-2`} style={{ borderColor: colors.accent, fontFamily: fonts.headings }}>
            CONTACTO
          </h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-3 flex-shrink-0" />
              <EditableField
                value={cvData.personalData?.phone || ''}
                onSave={(value) => updateField('personalData.phone', value)}
                placeholder="Seu telefone"
                className={`${isMobile ? 'text-sm cv-mobile-text' : 'text-sm'} text-white flex-1`}
              />
            </div>
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-3 flex-shrink-0" />
              <EditableField
                value={cvData.personalData?.email || ''}
                onSave={(value) => updateField('personalData.email', value)}
                placeholder="seu.email@exemplo.com"
                className={`${isMobile ? 'text-sm cv-mobile-text' : 'text-sm'} text-white flex-1`}
              />
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-3 flex-shrink-0" />
              <EditableField
                value={cvData.personalData?.address || ''}
                onSave={(value) => updateField('personalData.address', value)}
                placeholder="Sua localização"
                className={`${isMobile ? 'text-sm cv-mobile-text' : 'text-sm'} text-white flex-1`}
              />
            </div>
            <div className="flex items-center">
              <Globe className="w-4 h-4 mr-3 flex-shrink-0" />
              <EditableField
                value={cvData.personalData?.website || ''}
                onSave={(value) => updateField('personalData.website', value)}
                placeholder="www.seusite.com"
                className={`${isMobile ? 'text-sm cv-mobile-text' : 'text-sm'} text-white flex-1`}
              />
            </div>
          </div>
        </div>

        {/* Competências */}
        <div className="cv-section">
          <h3 className={`${isMobile ? 'text-base cv-mobile-title' : 'text-lg'} font-bold mb-3 border-b-2 pb-2`} style={{ borderColor: colors.accent, fontFamily: fonts.headings }}>
            COMPETÊNCIAS
          </h3>
          <div className="space-y-3">
            {(cvData.skills?.technical || []).map((skill: string, index: number) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <EditableField
                    value={skill}
                    onSave={(value) => updateSkill(index, value)}
                    placeholder="Nova competência"
                    className={`${isMobile ? 'text-sm cv-mobile-text' : 'text-sm'} text-white flex-1`}
                  />
                  <span className="text-xs">90%</span>
                </div>
                <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full"
                    style={{ backgroundColor: colors.accent, width: "90%" }}
                  />
                </div>
              </div>
            ))}
            <Button
              onClick={addSkill}
              variant="ghost"
              size="sm"
              className="w-full border-dashed border-white border text-white hover:bg-white hover:bg-opacity-10 print:hidden"
            >
              <Plus className="w-3 h-3 mr-1" />
              Adicionar Competência
            </Button>
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className={`${isMobile ? 'w-full p-4' : 'flex-1 p-6 sm:p-8'}`} style={{ backgroundColor: colors.background || '#ffffff' }}>
        {/* Perfil */}
        <div className="mb-6 cv-section">
          <h3 className={`${isMobile ? 'text-lg cv-mobile-title' : 'text-2xl'} font-bold mb-4 flex items-center`} style={{ color: colors.primary, fontFamily: fonts.headings }}>
            <User className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'} mr-2 sm:mr-3`} />
            PERFIL PROFISSIONAL
          </h3>
          <EditableField
            value={cvData.about || ''}
            onSave={(value) => updateField('about', value)}
            placeholder="Descreva seu perfil profissional, experiência e objetivos de carreira..."
            className={`text-gray-700 leading-relaxed ${isMobile ? 'text-sm cv-mobile-text' : ''}`}
            multiline={true}
          />
        </div>

        {/* Experiência */}
        <div className="mb-6 cv-section">
          <h3 className={`${isMobile ? 'text-lg cv-mobile-title' : 'text-2xl'} font-bold mb-4 flex items-center`} style={{ color: colors.primary, fontFamily: fonts.headings }}>
            <Briefcase className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'} mr-2 sm:mr-3`} />
            EXPERIÊNCIA PROFISSIONAL
          </h3>
          <div className="space-y-4 sm:space-y-6">
            {(cvData.experience || []).map((exp: any, index: number) => (
              <div key={index} className="border-l-4 pl-4 sm:pl-6 relative cv-section" style={{ borderColor: colors.accent }}>
                <div className="absolute w-3 h-3 rounded-full -left-1.5 top-2" style={{ backgroundColor: colors.accent }}></div>
                <EditableField
                  value={exp.position || ''}
                  onSave={(value) => updateExperience(index, 'position', value)}
                  placeholder="Cargo/Posição"
                  className={`${isMobile ? 'text-base cv-mobile-title' : 'text-xl'} font-bold`}
                />
                <EditableField
                  value={exp.company || ''}
                  onSave={(value) => updateExperience(index, 'company', value)}
                  placeholder="Nome da Empresa"
                  className={`font-medium text-gray-600 mb-2 ${isMobile ? 'text-sm cv-mobile-text' : ''}`}
                />
                <div className={`flex items-center text-gray-500 mb-3 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                  <Calendar className="w-4 h-4 mr-1" />
                  <EditableField
                    value={`${exp.startDate || '2024'} - ${exp.current ? 'Presente' : exp.endDate || '2024'}`}
                    onSave={(value) => {
                      const [start, end] = value.split(' - ');
                      updateExperience(index, 'startDate', start);
                      updateExperience(index, 'endDate', end === 'Presente' ? '' : end);
                      updateExperience(index, 'current', end === 'Presente');
                    }}
                    placeholder="2020 - 2024"
                    className="text-gray-500"
                  />
                </div>
                <EditableField
                  value={exp.description || ''}
                  onSave={(value) => updateExperience(index, 'description', value)}
                  placeholder="Descreva suas responsabilidades, conquistas e resultados obtidos nesta posição..."
                  className={`text-gray-700 leading-relaxed ${isMobile ? 'text-sm cv-mobile-text' : ''}`}
                  multiline={true}
                />
              </div>
            ))}
            <Button
              onClick={addExperience}
              variant="outline"
              className="w-full border-dashed border-gray-300 text-gray-600 hover:bg-gray-50 print:hidden"
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Experiência
            </Button>
          </div>
        </div>

        {/* Formação */}
        <div className="cv-section">
          <h3 className={`${isMobile ? 'text-lg cv-mobile-title' : 'text-2xl'} font-bold mb-4 flex items-center`} style={{ color: colors.primary, fontFamily: fonts.headings }}>
            <GraduationCap className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'} mr-2 sm:mr-3`} />
            FORMAÇÃO ACADÉMICA
          </h3>
          <div className="space-y-4">
            {(cvData.education || []).map((edu: any, index: number) => (
              <div key={index} className="border-l-4 pl-4 sm:pl-6 relative cv-section" style={{ borderColor: colors.accent }}>
                <div className="absolute w-3 h-3 rounded-full -left-1.5 top-2" style={{ backgroundColor: colors.accent }}></div>
                <EditableField
                  value={edu.degree || ''}
                  onSave={(value) => updateEducation(index, 'degree', value)}
                  placeholder="Curso/Graduação"
                  className={`font-bold ${isMobile ? 'text-base cv-mobile-title' : 'text-lg'}`}
                />
                <EditableField
                  value={edu.institution || ''}
                  onSave={(value) => updateEducation(index, 'institution', value)}
                  placeholder="Nome da Instituição"
                  className={`text-gray-600 font-medium ${isMobile ? 'text-sm cv-mobile-text' : ''}`}
                />
                <EditableField
                  value={`${edu.startYear || '2020'} - ${edu.endYear || '2024'}`}
                  onSave={(value) => {
                    const [start, end] = value.split(' - ');
                    updateEducation(index, 'startYear', start);
                    updateEducation(index, 'endYear', end);
                  }}
                  placeholder="2020 - 2024"
                  className={`text-gray-500 ${isMobile ? 'text-xs' : 'text-sm'}`}
                />
              </div>
            ))}
            <Button
              onClick={addEducation}
              variant="outline"
              className="w-full border-dashed border-gray-300 text-gray-600 hover:bg-gray-50 print:hidden"
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Formação
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white w-full h-full">
      {renderEditableExecutivePremium()}
    </div>
  );
};

export default EditableCVLayoutRenderer;
