import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Mail, Phone, MapPin, Globe, Calendar, Award, Briefcase, GraduationCap, User, Star, Languages, Wrench, Camera } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { LayoutConfig, getDefaultLayoutConfig } from '@/services/cvService';
import { cn } from '@/lib/utils';
import InlineEdit from './InlineEdit';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import SortableItem from './SortableItem';
import FloatingToolbar from './FloatingToolbar';


interface CVLayoutRendererProps {
  data: any;
  template: any;
  className?: string;
  userPhoto?: string;
  layoutConfig?: LayoutConfig;
  isAdvancedMode?: boolean;
  onDataChange?: (data: any) => void;
  isMobile?: boolean;
}

const CVLayoutRenderer = ({
  data,
  template,
  className = "",
  userPhoto,
  layoutConfig,
  isAdvancedMode = false,
  onDataChange
}: CVLayoutRendererProps) => {
  const [activeToolbar, setActiveToolbar] = useState<{
    position: { x: number, y: number };
    type: 'text' | 'container' | 'photo';
    id: string;
    currentStyle?: any;
  } | null>(null);

  const isMobile = useIsMobile();
  const colors = data.colorPalette || template.colorPalette;
  const fonts = data.fonts || template.fonts || { primary: 'Inter', headings: 'Poppins' };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const memoizedSensors = useMemo(() => sensors, [sensors]);

  const handleDragEnd = (event: DragEndEvent, section: 'experience' | 'education') => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const items = [...data[section]];
      const oldIndex = items.findIndex(item => (item.id || item.company || item.institution) === active.id);
      const newIndex = items.findIndex(item => (item.id || item.company || item.institution) === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        const newItems = arrayMove(items, oldIndex, newIndex);
        onDataChange?.({ ...data, [section]: newItems });
      }
    }
  };

  // Use provided layoutConfig or get from data or use default
  const activeLayoutConfig = layoutConfig || data.layoutConfig || getDefaultLayoutConfig();

  const handleElementClick = (e: React.MouseEvent, type: 'text' | 'container' | 'photo', id: string, currentStyle?: any) => {
    if (!isAdvancedMode) return;
    e.stopPropagation();
    setActiveToolbar({
      position: { x: e.clientX, y: e.clientY },
      type,
      id,
      currentStyle: currentStyle || {}
    });
  };

  const handleStyleChange = (newStyle: any) => {
    if (!activeToolbar) return;

    if (activeToolbar.type === 'photo') {
      if (newStyle.action === 'delete') {
        onDataChange?.({
          ...data,
          personalData: { ...data.personalData, photo: null }
        });
      } else if (newStyle.action === 'toggleVisibility') {
        const isHidden = activeLayoutConfig.hiddenSections?.includes('photo');
        const newHiddenSections = isHidden
          ? activeLayoutConfig.hiddenSections.filter(s => s !== 'photo')
          : [...(activeLayoutConfig.hiddenSections || []), 'photo'];
        
        onDataChange?.({
          ...data,
          layoutConfig: { ...activeLayoutConfig, hiddenSections: newHiddenSections }
        });
      }
      setActiveToolbar(null);
      return;
    }

    // Dynamic style update logic
    const elementStyles = data.elementStyles || {};
    const updatedStyles = {
      ...elementStyles,
      [activeToolbar.id]: {
        ...(elementStyles[activeToolbar.id] || {}),
        ...newStyle
      }
    };

    onDataChange?.({
      ...data,
      elementStyles: updatedStyles
    });
    
    // Update local state to reflect change in toolbar if still open
    setActiveToolbar(prev => prev ? ({
      ...prev,
      currentStyle: { ...prev.currentStyle, ...newStyle }
    }) : null);
  };

  const isSectionHidden = (sectionId: string) => {
    // Foto agora é obrigatória conforme pedido do utilizador, a menos que explicitamente removida em modo avançado
    if (sectionId === 'photo') {
      const isHidden = activeLayoutConfig.hiddenSections?.includes(sectionId) || false;
      return isHidden && !isAdvancedMode;
    }
    return activeLayoutConfig.hiddenSections?.includes(sectionId) || false;
  };

  const getElementStyle = (id: string, defaultStyle: React.CSSProperties = {}) => {
    const customStyle = data.elementStyles?.[id] || {};
    const textScale = activeLayoutConfig.spacing?.fontSize || 1;
    
    // Aplicar escala de texto se houver fontSize definido no estilo original ou customizado
    const combinedStyle = { ...defaultStyle, ...customStyle };
    if (combinedStyle.fontSize && typeof combinedStyle.fontSize === 'number') {
      combinedStyle.fontSize = combinedStyle.fontSize * textScale;
    } else if (combinedStyle.fontSize && typeof combinedStyle.fontSize === 'string' && combinedStyle.fontSize.includes('px')) {
      const size = parseFloat(combinedStyle.fontSize);
      combinedStyle.fontSize = `${size * textScale}px`;
    }

    return {
      ...combinedStyle,
      lineHeight: '1.6', // Respiro de sofisticação
    };
  };

  // Função para renderizar foto do usuário
  const renderUserPhoto = (position: string, size: string = "w-24 h-24 sm:w-32 sm:h-32") => {
    const photoUrl = userPhoto || data.personalData?.photo;
    const isPhotoHidden = isSectionHidden('photo');
    
    if (!photoUrl && !isAdvancedMode) return null;
    if (isPhotoHidden && !isAdvancedMode) return null;

    const shapeClass = position === 'square' ? 'rounded-lg' : 'rounded-full';

    return (
      <div 
        className={cn(
          "relative group transition-all duration-300",
          isPhotoHidden && "opacity-20 grayscale scale-95"
        )}
        onClick={(e) => handleElementClick(e, 'photo', 'profile-photo', { visible: !isPhotoHidden })}
      >
        <div className={`${size} ${shapeClass} overflow-hidden border-4 border-white shadow-lg flex-shrink-0 bg-slate-100`}>
          {photoUrl ? (
            <img
              src={photoUrl}
              alt="Foto do perfil"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-400">
              <User className="w-1/2 h-1/2" />
            </div>
          )}
        </div>
        
        {isAdvancedMode && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-full cursor-pointer z-10">
            <div className="bg-white/90 p-2 rounded-full shadow-lg">
              <Camera className="text-google-blue w-6 h-6" />
            </div>
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    onDataChange?.({
                      ...data,
                      personalData: { ...data.personalData, photo: reader.result as string }
                    });
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
          </div>
        )}
      </div>
    );
  };

  // Helper for section titles
  const getSectionTitle = (key: string, defaultTitle: string) => {
    return data.sectionTitles?.[key] || defaultTitle;
  };

  const updateSectionTitle = (key: string, value: string) => {
    onDataChange?.({
      ...data,
      sectionTitles: {
        ...data.sectionTitles,
        [key]: value
      }
    });
  };

  // MODELO 1: Profissional Clássico - Cabeçalho centralizado + duas colunas
  const renderProfissionalClassico = () => (
    <div className={`min-h-full ${className} flex flex-col`} style={{ fontFamily: fonts.primary, backgroundColor: '#ffffff' }}>
      {/* Cabeçalho centralizado com FOTO OBRIGATÓRIA */}
      <div className="flex flex-col items-center py-6 sm:py-8 border-b-2 gap-4" style={getElementStyle('header-container', { borderColor: colors.primary })}>
        {renderUserPhoto('circular', 'w-32 h-32')}
        
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-1" style={getElementStyle('header-name', { color: colors.primary, fontFamily: fonts.headings })}>
            <InlineEdit
              value={data.personalData?.fullName || 'SEU NOME'}
              onSave={(val) => onDataChange?.({ ...data, personalData: { ...data.personalData, fullName: val } })}
              isAdvancedMode={isAdvancedMode}
              className="text-center"
              onClick={(e) => handleElementClick(e, 'text', 'header-name', getElementStyle('header-name', { color: colors.primary, fontFamily: fonts.headings }))}
              style={getElementStyle('header-name')}
              as="span"
            />
          </h1>
          <p className="text-xl text-gray-600 font-medium" style={getElementStyle('header-profession', { color: '#4b5563' })}>
            <InlineEdit
              value={data.personalData?.profession || 'Sua Profissão'}
              onSave={(val) => onDataChange?.({ ...data, personalData: { ...data.personalData, profession: val } })}
              isAdvancedMode={isAdvancedMode}
              className="text-center"
              onClick={(e) => handleElementClick(e, 'text', 'header-profession', getElementStyle('header-profession', { color: '#4b5563' }))}
              style={getElementStyle('header-profession')}
              as="span"
            />
          </p>
        </div>
      </div>

      <div className="flex gap-2 p-2 relative">
        {/* Coluna Esquerda - Informações secundárias */}
        <div 
          className="w-1/3 space-y-6 transition-all duration-300 rounded-lg p-2" 
          style={getElementStyle('sidebar-left', { backgroundColor: 'transparent' })}
          onClick={(e) => handleElementClick(e, 'container', 'sidebar-left', getElementStyle('sidebar-left', { backgroundColor: 'transparent' }))}
        >
          {/* Contacto */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold mb-4 text-gray-800`}>
              <InlineEdit
                value={getSectionTitle('contact', 'CONTACTO')}
                onSave={(val) => updateSectionTitle('contact', val)}
                isAdvancedMode={isAdvancedMode}
              />
            </h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-3 text-gray-600" />
                <InlineEdit
                  value={data.personalData?.phone || ''}
                  onSave={(val) => onDataChange?.({ ...data, personalData: { ...data.personalData, phone: val } })}
                  isAdvancedMode={isAdvancedMode}
                  placeholder="Seu telefone"
                  className="text-sm"
                />
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-3 text-gray-600" />
                <InlineEdit
                  value={data.personalData?.email || ''}
                  onSave={(val) => onDataChange?.({ ...data, personalData: { ...data.personalData, email: val } })}
                  isAdvancedMode={isAdvancedMode}
                  placeholder="Seu email"
                  className="text-sm break-all"
                />
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-3 text-gray-600" />
                <InlineEdit
                  value={data.personalData?.address || ''}
                  onSave={(val) => onDataChange?.({ ...data, personalData: { ...data.personalData, address: val } })}
                  isAdvancedMode={isAdvancedMode}
                  placeholder="Seu endereço"
                  className="text-sm"
                />
              </div>
            </div>
          </div>

          {/* Habilidades */}
          {(data.skills?.technical?.length > 0 || isAdvancedMode) && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold mb-4 text-gray-800`}>
                <InlineEdit
                  value={getSectionTitle('skills', 'HABILIDADES')}
                  onSave={(val) => updateSectionTitle('skills', val)}
                  isAdvancedMode={isAdvancedMode}
                />
              </h3>
              <div className="space-y-2">
                {data.skills?.technical?.map((skill: string, index: number) => (
                  <div key={index} className="flex items-center group">
                    <div className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: colors.primary }}></div>
                    <InlineEdit
                      value={skill}
                      onSave={(val) => {
                        const newSkills = [...data.skills.technical];
                        newSkills[index] = val;
                        onDataChange?.({ ...data, skills: { ...data.skills, technical: newSkills } });
                      }}
                      isAdvancedMode={isAdvancedMode}
                      className="text-sm flex-1"
                    />
                    {isAdvancedMode && (
                      <button
                        onClick={() => {
                          const newSkills = data.skills.technical.filter((_: any, i: number) => i !== index);
                          onDataChange?.({ ...data, skills: { ...data.skills, technical: newSkills } });
                        }}
                        className="opacity-0 group-hover:opacity-100 text-red-500 ml-2"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
                {isAdvancedMode && (
                  <button
                    onClick={() => {
                      const newSkills = [...(data.skills?.technical || []), "Nova Habilidade"];
                      onDataChange?.({ ...data, skills: { ...data.skills, technical: newSkills } });
                    }}
                    className="text-xs text-blue-600 hover:text-blue-800 mt-2 flex items-center font-medium"
                  >
                    + Adicionar Habilidade
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Idiomas */}
          {(data.skills?.languages?.length > 0 || isAdvancedMode) && (
            <div className="bg-gray-50 p-4 rounded-lg cv-section">
              <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold mb-4 text-gray-800`}>
                <InlineEdit
                  value={getSectionTitle('languages', 'IDIOMAS')}
                  onSave={(val) => updateSectionTitle('languages', val)}
                  isAdvancedMode={isAdvancedMode}
                />
              </h3>
              <div className="space-y-2">
                {data.skills?.languages?.map((language: string, index: number) => (
                  <div key={index} className="flex items-center group">
                    <Languages className="w-3 h-3 mr-2 text-gray-600" />
                    <InlineEdit
                      value={language}
                      onSave={(val) => {
                        const newLangs = [...data.skills.languages];
                        newLangs[index] = val;
                        onDataChange?.({ ...data, skills: { ...data.skills, languages: newLangs } });
                      }}
                      isAdvancedMode={isAdvancedMode}
                      className="text-sm flex-1"
                    />
                    {isAdvancedMode && (
                      <button
                        onClick={() => {
                          const newLangs = data.skills.languages.filter((_: any, i: number) => i !== index);
                          onDataChange?.({ ...data, skills: { ...data.skills, languages: newLangs } });
                        }}
                        className="opacity-0 group-hover:opacity-100 text-red-500 ml-2"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
                {isAdvancedMode && (
                  <button
                    onClick={() => {
                      const newLangs = [...(data.skills?.languages || []), "Novo Idioma"];
                      onDataChange?.({ ...data, skills: { ...data.skills, languages: newLangs } });
                    }}
                    className="text-xs text-blue-600 hover:text-blue-800 mt-2 flex items-center font-medium"
                  >
                    + Adicionar Idioma
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Coluna Direita - ConteÃºdo principal */}
        <div className="flex-1 space-y-4">
          {/* Perfil */}
          {data.about && (
            <div>
              <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold mb-4 flex items-center`} style={getElementStyle('about-title', { color: colors.primary })}>
                <User className="w-5 h-5 mr-2" />
                <InlineEdit
                  value={getSectionTitle('about', 'PERFIL PROFISSIONAL')}
                  onSave={(val) => updateSectionTitle('about', val)}
                  isAdvancedMode={isAdvancedMode}
                  onClick={(e) => handleElementClick(e, 'text', 'about-title', getElementStyle('about-title'))}
                  style={getElementStyle('about-title')}
                />
              </h3>
              <div className="text-gray-700 leading-relaxed" style={getElementStyle('about-text')}>
                <InlineEdit
                  value={data.about}
                  onSave={(val) => onDataChange?.({ ...data, about: val })}
                  isAdvancedMode={isAdvancedMode}
                  multiline
                  onClick={(e) => handleElementClick(e, 'text', 'about-text', getElementStyle('about-text'))}
                  style={getElementStyle('about-text')}
                  as="p"
                />
              </div>
            </div>
          )}

          {/* Experiência */}
          {(data.experience?.length > 0 || isAdvancedMode) && (
            <div>
              <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold mb-4 flex items-center`} style={getElementStyle('exp-title', { color: colors.primary })}>
                <Briefcase className="w-5 h-5 mr-2" />
                <InlineEdit
                  value={getSectionTitle('experience', 'EXPERIÊNCIA PROFISSIONAL')}
                  onSave={(val) => updateSectionTitle('experience', val)}
                  isAdvancedMode={isAdvancedMode}
                  onClick={(e) => handleElementClick(e, 'text', 'exp-title', getElementStyle('exp-title'))}
                  style={getElementStyle('exp-title')}
                />
              </h3>
              <DndContext
                sensors={memoizedSensors}
                collisionDetection={closestCenter}
                onDragEnd={(e) => handleDragEnd(e, 'experience')}
              >
                <SortableContext
                  items={data.experience.map((e: any) => e.id || e.company)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-4">
                    {data.experience?.map((exp: any, index: number) => (
                      <SortableItem key={exp.id || exp.company} id={exp.id || exp.company} isAdvancedMode={isAdvancedMode}>
                        <div className="border-l-4 pl-4 relative group" style={{ borderColor: colors.secondary }}>
                          {isAdvancedMode && (
                            <button
                              onClick={() => {
                                const newExp = data.experience.filter((_: any, i: number) => i !== index);
                                onDataChange?.({ ...data, experience: newExp });
                              }}
                              className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 p-1 text-red-500 hover:bg-red-50 rounded"
                              title="Remover experiência"
                            >
                              ×
                            </button>
                          )}
                          <h4 className="font-bold text-lg text-gray-800">
                            <InlineEdit
                              value={exp.position}
                              onSave={(val) => {
                                const newExp = [...data.experience];
                                newExp[index] = { ...newExp[index], position: val };
                                onDataChange?.({ ...data, experience: newExp });
                              }}
                              isAdvancedMode={isAdvancedMode}
                              as="span"
                            />
                          </h4>
                          <p className="font-medium text-gray-600">
                            <InlineEdit
                              value={exp.company}
                              onSave={(val) => {
                                const newExp = [...data.experience];
                                newExp[index] = { ...newExp[index], company: val };
                                onDataChange?.({ ...data, experience: newExp });
                              }}
                              isAdvancedMode={isAdvancedMode}
                              as="span"
                            />
                          </p>
                          <div className="text-sm text-gray-500 mb-2 flex gap-1">
                            <InlineEdit
                              value={exp.startDate}
                              onSave={(val) => {
                                const newExp = [...data.experience];
                                newExp[index] = { ...newExp[index], startDate: val };
                                onDataChange?.({ ...data, experience: newExp });
                              }}
                              isAdvancedMode={isAdvancedMode}
                              as="span"
                            />
                            <span>-</span>
                            {exp.current ? (
                              <InlineEdit
                                value="Presente"
                                onSave={(val) => {
                                  const newExp = [...data.experience];
                                  newExp[index] = { ...newExp[index], endDate: val, current: false };
                                  onDataChange?.({ ...data, experience: newExp });
                                }}
                                isAdvancedMode={isAdvancedMode}
                                as="span"
                              />
                            ) : (
                              <InlineEdit
                                value={exp.endDate}
                                onSave={(val) => {
                                  const newExp = [...data.experience];
                                  newExp[index] = { ...newExp[index], endDate: val };
                                  onDataChange?.({ ...data, experience: newExp });
                                }}
                                isAdvancedMode={isAdvancedMode}
                                as="span"
                              />
                            )}
                          </div>
                          {exp.description && (
                            <div className="text-gray-700">
                              <InlineEdit
                                value={exp.description}
                                onSave={(val) => {
                                  const newExp = [...data.experience];
                                  newExp[index] = { ...newExp[index], description: val };
                                  onDataChange?.({ ...data, experience: newExp });
                                }}
                                isAdvancedMode={isAdvancedMode}
                                multiline
                                as="p"
                              />
                            </div>
                          )}
                        </div>
                      </SortableItem>
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
              {isAdvancedMode && (
                <button
                  onClick={() => {
                    const newExp = [
                      ...(data.experience || []),
                      {
                        id: Date.now().toString(),
                        position: "Novo Cargo",
                        company: "Nome da Empresa",
                        startDate: "2024",
                        endDate: "Presente",
                        current: true,
                        description: "Descrição das atividades..."
                      }
                    ];
                    onDataChange?.({ ...data, experience: newExp });
                  }}
                  className="w-full py-3 mt-4 border-2 border-dashed border-slate-300 rounded-lg text-slate-500 hover:border-blue-500 hover:text-blue-600 flex items-center justify-center font-medium transition-colors"
                >
                  + Adicionar Experiência
                </button>
              )}
            </div>
          )}

          {/* Formação */}
          {(data.education?.length > 0 || isAdvancedMode) && (
            <div>
              <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold mb-4 flex items-center`} style={getElementStyle('edu-title', { color: colors.primary })}>
                <GraduationCap className="w-5 h-5 mr-2" />
                <InlineEdit
                  value={getSectionTitle('education', 'FORMAÇÃO ACADÉMICA')}
                  onSave={(val) => updateSectionTitle('education', val)}
                  isAdvancedMode={isAdvancedMode}
                  onClick={(e) => handleElementClick(e, 'text', 'edu-title', getElementStyle('edu-title'))}
                  style={getElementStyle('edu-title')}
                />
              </h3>
              <DndContext
                sensors={memoizedSensors}
                collisionDetection={closestCenter}
                onDragEnd={(e) => handleDragEnd(e, 'education')}
              >
                <SortableContext
                  items={data.education?.map((e: any) => e.id || e.institution) || []}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-3">
                    {data.education?.map((edu: any, index: number) => (
                      <SortableItem key={edu.id || edu.institution} id={edu.id || edu.institution} isAdvancedMode={isAdvancedMode}>
                        <div className="border-l-4 pl-4 relative group" style={{ borderColor: colors.secondary }}>
                          {isAdvancedMode && (
                            <button
                              onClick={() => {
                                const newEdu = data.education.filter((_: any, i: number) => i !== index);
                                onDataChange?.({ ...data, education: newEdu });
                              }}
                              className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 p-1 text-red-500 hover:bg-red-50 rounded"
                              title="Remover formação"
                            >
                              ×
                            </button>
                          )}
                          <h4 className="font-bold text-gray-800">
                            <InlineEdit
                              value={edu.degree}
                              onSave={(val) => {
                                const newEdu = [...data.education];
                                newEdu[index] = { ...newEdu[index], degree: val };
                                onDataChange?.({ ...data, education: newEdu });
                              }}
                              isAdvancedMode={isAdvancedMode}
                              as="span"
                            />
                          </h4>
                          <p className="text-gray-600">
                            <InlineEdit
                              value={edu.institution}
                              onSave={(val) => {
                                const newEdu = [...data.education];
                                newEdu[index] = { ...newEdu[index], institution: val };
                                onDataChange?.({ ...data, education: newEdu });
                              }}
                              isAdvancedMode={isAdvancedMode}
                              as="span"
                            />
                          </p>
                          <p className="text-sm text-gray-500">
                            <InlineEdit
                              value={edu.startYear}
                              onSave={(val) => {
                                const newEdu = [...data.education];
                                newEdu[index] = { ...newEdu[index], startYear: val };
                                onDataChange?.({ ...data, education: newEdu });
                              }}
                              isAdvancedMode={isAdvancedMode}
                              as="span"
                            />
                            {" - "}
                            <InlineEdit
                              value={edu.endYear}
                              onSave={(val) => {
                                const newEdu = [...data.education];
                                newEdu[index] = { ...newEdu[index], endYear: val };
                                onDataChange?.({ ...data, education: newEdu });
                              }}
                              isAdvancedMode={isAdvancedMode}
                              as="span"
                            />
                          </p>
                        </div>
                      </SortableItem>
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
              {isAdvancedMode && (
                <button
                  onClick={() => {
                    const newEdu = [
                      ...(data.education || []),
                      {
                        id: Date.now().toString(),
                        degree: "Curso / Grau",
                        institution: "Nome da Instituição",
                        startYear: "2020",
                        endYear: "2024"
                      }
                    ];
                    onDataChange?.({ ...data, education: newEdu });
                  }}
                  className="w-full py-3 mt-4 border-2 border-dashed border-slate-300 rounded-lg text-slate-500 hover:border-blue-500 hover:text-blue-600 flex items-center justify-center font-medium transition-colors"
                >
                  + Adicionar Formação
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div >
  );

  // MODELO 2: Barra Lateral Esquerda - Visual Moderno
  const renderBarraLateralEsquerda = () => (
    <div className={`flex min-h-full ${className}`} style={{ fontFamily: fonts.primary, backgroundColor: '#ffffff' }}>
      {/* Sidebar - FOTO OBRIGATÓRIA NO TOPO */}
      <div className="w-[260px] p-8 shrink-0 flex flex-col gap-8 transition-all duration-300" style={getElementStyle('sidebar-left-v2', { backgroundColor: colors.primary, color: '#ffffff' })}>
        <div className="flex flex-col items-center gap-6">
          <div className="relative group">
            {renderUserPhoto('circular', 'w-40 h-40 border-4 border-white/20 shadow-lg')}
          </div>
          
          <div className="text-center">
            <h1 className="text-2xl font-bold uppercase tracking-wider leading-tight" style={getElementStyle('header-name-v2', { color: '#ffffff', fontFamily: fonts.headings })}>
              <InlineEdit 
                value={data.personalData?.fullName || 'SEU NOME'} 
                onSave={(val) => onDataChange?.({ ...data, personalData: { ...data.personalData, fullName: val } })} 
                isAdvancedMode={isAdvancedMode} 
                className="text-white"
                as="span" 
              />
            </h1>
            <p className="text-sm opacity-80 mt-2 font-medium tracking-wide" style={getElementStyle('header-title-v2')}>
              <InlineEdit 
                value={data.personalData?.profession || 'Sua Profissão'} 
                onSave={(val) => onDataChange?.({ ...data, personalData: { ...data.personalData, profession: val } })} 
                isAdvancedMode={isAdvancedMode} 
                className="text-white"
                as="span" 
              />
            </p>
          </div>
        </div>

        {/* Contacto com ícones */}
        <div className="cv-section">
          <h3 className="text-xs font-black mb-4 uppercase tracking-[0.2em] border-b border-white/20 pb-2">
            <InlineEdit value={getSectionTitle('contact', 'CONTACTO')} onSave={(val) => updateSectionTitle('contact', val)} isAdvancedMode={isAdvancedMode} className="text-white" />
          </h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3" style={getElementStyle('contact-phone')}>
              <Phone className="w-4 h-4 mt-0.5 opacity-70" />
              <InlineEdit value={data.personalData?.phone || ''} onSave={(val) => onDataChange?.({ ...data, personalData: { ...data.personalData, phone: val } })} isAdvancedMode={isAdvancedMode} placeholder="Telefone" className="text-xs text-white" />
            </div>
            <div className="flex items-start gap-3" style={getElementStyle('contact-email')}>
              <Mail className="w-4 h-4 mt-0.5 opacity-70" />
              <InlineEdit value={data.personalData?.email || ''} onSave={(val) => onDataChange?.({ ...data, personalData: { ...data.personalData, email: val } })} isAdvancedMode={isAdvancedMode} placeholder="Email" className="text-xs text-white break-all" />
            </div>
            <div className="flex items-start gap-3" style={getElementStyle('contact-address')}>
              <MapPin className="w-4 h-4 mt-0.5 opacity-70" />
              <InlineEdit value={data.personalData?.address || ''} onSave={(val) => onDataChange?.({ ...data, personalData: { ...data.personalData, address: val } })} isAdvancedMode={isAdvancedMode} placeholder="Endereço" className="text-xs text-white" />
            </div>
          </div>
        </div>

        {/* Habilidades - Estilo Moderno na Sidebar */}
        {(data.skills?.technical?.length > 0 || isAdvancedMode) && (
          <div className="cv-section">
            <h3 className="text-xs font-black mb-4 uppercase tracking-[0.2em] border-b border-white/20 pb-2">
              <InlineEdit value={getSectionTitle('skills', 'HABILIDADES')} onSave={(val) => updateSectionTitle('skills', val)} isAdvancedMode={isAdvancedMode} className="text-white" />
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.skills?.technical?.map((skill: string, index: number) => (
                <div key={index} className="px-2 py-1 bg-white/10 rounded text-[10px] font-medium border border-white/5">
                  <InlineEdit 
                    value={skill} 
                    onSave={(val) => {
                      const newSkills = [...data.skills.technical];
                      newSkills[index] = val;
                      onDataChange?.({ ...data, skills: { ...data.skills, technical: newSkills } });
                    }} 
                    isAdvancedMode={isAdvancedMode} 
                    className="text-white"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Conteúdo Principal - Branco com Respiro */}
      <div className="flex-1 p-10 bg-white shadow-inner">
        {/* Perfil */}
        {data.about && (
          <div className="mb-8 cv-section">
            <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold mb-4 flex items-center`} style={{ color: colors.primary }}>
              <User className="w-6 h-6 mr-3" />
              <InlineEdit
                value={getSectionTitle('about', 'PERFIL PROFISSIONAL')}
                onSave={(val) => updateSectionTitle('about', val)}
                isAdvancedMode={isAdvancedMode}
              />
            </h3>
            <div className="text-gray-700 leading-relaxed">
              <InlineEdit
                value={data.about}
                onSave={(val) => onDataChange?.({ ...data, about: val })}
                isAdvancedMode={isAdvancedMode}
                multiline
                as="p"
              />
            </div>
          </div>
        )}

        {/* Experiência */}
        {(data.experience?.length > 0 || isAdvancedMode) && (
          <div className="mb-8 cv-section">
            <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold mb-4 flex items-center`} style={{ color: colors.primary }}>
              <Briefcase className="w-6 h-6 mr-3" />
              <InlineEdit
                value={getSectionTitle('experience', 'EXPERIÊNCIA PROFISSIONAL')}
                onSave={(val) => updateSectionTitle('experience', val)}
                isAdvancedMode={isAdvancedMode}
              />
            </h3>
            <div className="space-y-6">
              {data.experience?.map((exp: any, index: number) => (
                <div key={index} className="border-l-4 pl-6 relative group" style={{ borderColor: colors.accent }}>
                  {isAdvancedMode && (
                    <button
                      onClick={() => {
                        const newExp = data.experience.filter((_: any, i: number) => i !== index);
                        onDataChange?.({ ...data, experience: newExp });
                      }}
                      className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 p-1 text-red-500 hover:bg-red-50 rounded"
                      title="Remover experiência"
                    >
                      ×
                    </button>
                  )}
                  <h4 className="text-xl font-bold text-gray-800">
                    <InlineEdit
                      value={exp.position}
                      onSave={(val) => {
                        const newExp = [...data.experience];
                        newExp[index] = { ...newExp[index], position: val };
                        onDataChange?.({ ...data, experience: newExp });
                      }}
                      isAdvancedMode={isAdvancedMode}
                      as="span"
                    />
                  </h4>
                  <p className="font-medium text-gray-600 mb-2">
                    <InlineEdit
                      value={exp.company}
                      onSave={(val) => {
                        const newExp = [...data.experience];
                        newExp[index] = { ...newExp[index], company: val };
                        onDataChange?.({ ...data, experience: newExp });
                      }}
                      isAdvancedMode={isAdvancedMode}
                      as="span"
                    />
                  </p>
                  <p className="text-sm text-gray-500 mb-3">
                    <InlineEdit
                      value={exp.startDate}
                      onSave={(val) => {
                        const newExp = [...data.experience];
                        newExp[index] = { ...newExp[index], startDate: val };
                        onDataChange?.({ ...data, experience: newExp });
                      }}
                      isAdvancedMode={isAdvancedMode}
                      as="span"
                    /> - {exp.current ? (
                      <InlineEdit
                        value="Presente"
                        onSave={(val) => {
                          const newExp = [...data.experience];
                          newExp[index] = { ...newExp[index], endDate: val, current: false };
                          onDataChange?.({ ...data, experience: newExp });
                        }}
                        isAdvancedMode={isAdvancedMode}
                        as="span"
                      />
                    ) : (
                      <InlineEdit
                        value={exp.endDate}
                        onSave={(val) => {
                          const newExp = [...data.experience];
                          newExp[index] = { ...newExp[index], endDate: val };
                          onDataChange?.({ ...data, experience: newExp });
                        }}
                        isAdvancedMode={isAdvancedMode}
                        as="span"
                      />
                    )}
                  </p>
                  {exp.description && (
                    <div className="text-gray-700">
                      <InlineEdit
                        value={exp.description}
                        onSave={(val) => {
                          const newExp = [...data.experience];
                          newExp[index] = { ...newExp[index], description: val };
                          onDataChange?.({ ...data, experience: newExp });
                        }}
                        isAdvancedMode={isAdvancedMode}
                        multiline
                        as="p"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
            {isAdvancedMode && (
              <button
                onClick={() => {
                  const newExp = [
                    ...(data.experience || []),
                    {
                      id: Date.now().toString(),
                      position: "Novo Cargo",
                      company: "Nome da Empresa",
                      startDate: "2024",
                      endDate: "Presente",
                      current: true,
                      description: "Descrição das atividades..."
                    }
                  ];
                  onDataChange?.({ ...data, experience: newExp });
                }}
                className="w-full py-3 mt-4 border-2 border-dashed border-slate-300 rounded-lg text-slate-500 hover:border-blue-500 hover:text-blue-600 flex items-center justify-center font-medium transition-colors"
              >
                + Adicionar Experiência
              </button>
            )}
          </div>
        )}

        {/* Formação */}
        {(data.education?.length > 0 || isAdvancedMode) && (
          <div>
            <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold mb-4 flex items-center`} style={{ color: colors.primary }}>
              <GraduationCap className="w-6 h-6 mr-3" />
              <InlineEdit
                value={getSectionTitle('education', 'FORMAÇÃO ACADÉMICA')}
                onSave={(val) => updateSectionTitle('education', val)}
                isAdvancedMode={isAdvancedMode}
              />
            </h3>
            <div className="space-y-4">
              {data.education?.map((edu: any, index: number) => (
                <div key={index} className="border-l-4 pl-6 relative group" style={{ borderColor: colors.accent }}>
                  {isAdvancedMode && (
                    <button
                      onClick={() => {
                        const newEdu = data.education.filter((_: any, i: number) => i !== index);
                        onDataChange?.({ ...data, education: newEdu });
                      }}
                      className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 p-1 text-red-500 hover:bg-red-50 rounded"
                      title="Remover formação"
                    >
                      ×
                    </button>
                  )}
                  <h4 className="font-bold text-lg text-gray-800">
                    <InlineEdit
                      value={edu.degree}
                      onSave={(val) => {
                        const newEdu = [...data.education];
                        newEdu[index] = { ...newEdu[index], degree: val };
                        onDataChange?.({ ...data, education: newEdu });
                      }}
                      isAdvancedMode={isAdvancedMode}
                      as="span"
                    />
                  </h4>
                  <p className="text-gray-600">
                    <InlineEdit
                      value={edu.institution}
                      onSave={(val) => {
                        const newEdu = [...data.education];
                        newEdu[index] = { ...newEdu[index], institution: val };
                        onDataChange?.({ ...data, education: newEdu });
                      }}
                      isAdvancedMode={isAdvancedMode}
                      as="span"
                    />
                  </p>
                  <p className="text-sm text-gray-500">
                    <InlineEdit
                      value={edu.startYear}
                      onSave={(val) => {
                        const newEdu = [...data.education];
                        newEdu[index] = { ...newEdu[index], startYear: val };
                        onDataChange?.({ ...data, education: newEdu });
                      }}
                      isAdvancedMode={isAdvancedMode}
                      as="span"
                    /> - <InlineEdit
                      value={edu.endYear}
                      onSave={(val) => {
                        const newEdu = [...data.education];
                        newEdu[index] = { ...newEdu[index], endYear: val };
                        onDataChange?.({ ...data, education: newEdu });
                      }}
                      isAdvancedMode={isAdvancedMode}
                      as="span"
                    />
                  </p>
                </div>
              ))}
            </div>
            {isAdvancedMode && (
              <button
                onClick={() => {
                  const newEdu = [
                    ...(data.education || []),
                    {
                      id: Date.now().toString(),
                      degree: "Curso / Grau",
                      institution: "Nome da Instituição",
                      startYear: "2020",
                      endYear: "2024"
                    }
                  ];
                  onDataChange?.({ ...data, education: newEdu });
                }}
                className="w-full py-3 mt-4 border-2 border-dashed border-slate-300 rounded-lg text-slate-500 hover:border-blue-500 hover:text-blue-600 flex items-center justify-center font-medium transition-colors"
              >
                + Adicionar Formação
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );

  // MODELO 3: Layout Simples com Destaques - Visual VIP Minimalista
  const renderLayoutSimplesDestaques = () => (
    <div className="min-h-full p-12" style={{ fontFamily: fonts.primary, backgroundColor: '#ffffff' }}>
      {/* Header VIP de Alto Impacto */}
      <div className="flex items-center gap-12 mb-10 pb-10 border-b-4" style={getElementStyle('header-container-v3', { borderColor: colors.primary })}>
        <div className="shrink-0 flex items-center justify-center">
          {renderUserPhoto('square', 'w-48 h-48 shadow-2xl border-8 border-slate-50 rounded-lg')}
        </div>
        
        <div className="flex-1">
          <h1 className="text-5xl font-black mb-2 tracking-tight uppercase" style={getElementStyle('header-name-v3', { color: colors.primary, fontFamily: fonts.headings })}>
            <InlineEdit
              value={data.personalData?.fullName || 'SEU NOME'}
              onSave={(val) => onDataChange?.({ ...data, personalData: { ...data.personalData, fullName: val } })}
              isAdvancedMode={isAdvancedMode}
              as="span"
            />
          </h1>
          <p className="text-2xl text-gray-400 font-light mb-8 tracking-widest uppercase">
            <InlineEdit
              value={data.personalData?.profession || 'Sua Profissão'}
              onSave={(val) => onDataChange?.({ ...data, personalData: { ...data.personalData, profession: val } })}
              isAdvancedMode={isAdvancedMode}
              as="span"
            />
          </p>
          <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-xs text-gray-500 font-bold uppercase tracking-widest leading-none">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-slate-300" />
              <InlineEdit value={data.personalData?.email || ''} onSave={(val) => onDataChange?.({ ...data, personalData: { ...data.personalData, email: val } })} isAdvancedMode={isAdvancedMode} placeholder="email" className="break-all" />
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-slate-300" />
              <InlineEdit value={data.personalData?.phone || ''} onSave={(val) => onDataChange?.({ ...data, personalData: { ...data.personalData, phone: val } })} isAdvancedMode={isAdvancedMode} placeholder="telefone" />
            </div>
            <div className="flex items-center gap-2 col-span-2">
              <MapPin className="w-4 h-4 text-slate-300" />
              <InlineEdit value={data.personalData?.address || ''} onSave={(val) => onDataChange?.({ ...data, personalData: { ...data.personalData, address: val } })} isAdvancedMode={isAdvancedMode} placeholder="endereço" />
            </div>
          </div>
        </div>
      </div>

      {/* Seções com blocos destacados */}
      {data.about && (
        <div className="mb-8 p-6 rounded-lg cv-section" style={{ backgroundColor: colors.background || '#f8fafc' }}>
          <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold mb-4`} style={{ color: colors.primary }}>
            <InlineEdit
              value={getSectionTitle('about', 'PERFIL PROFISSIONAL')}
              onSave={(val) => updateSectionTitle('about', val)}
              isAdvancedMode={isAdvancedMode}
            />
          </h3>
          <div className="text-gray-700 leading-relaxed">
            <InlineEdit
              value={data.about}
              onSave={(val) => onDataChange?.({ ...data, about: val })}
              isAdvancedMode={isAdvancedMode}
              multiline
              as="p"
            />
          </div>
        </div>
      )}

      {(data.experience?.length > 0 || isAdvancedMode) && (
        <div className="mb-8 p-6 rounded-lg cv-section" style={{ backgroundColor: '#ffffff', border: `2px solid ${colors.primary}` }}>
          <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold mb-6`} style={{ color: colors.primary }}>
            <InlineEdit
              value={getSectionTitle('experience', 'EXPERIÊNCIA PROFISSIONAL')}
              onSave={(val) => updateSectionTitle('experience', val)}
              isAdvancedMode={isAdvancedMode}
            />
          </h3>
          <div className="space-y-6">
            {data.experience?.map((exp: any, index: number) => (
              <div key={index} className="pb-4 border-b border-gray-200 last:border-b-0 relative group">
                {isAdvancedMode && (
                  <button
                    onClick={() => {
                      const newExp = data.experience.filter((_: any, i: number) => i !== index);
                      onDataChange?.({ ...data, experience: newExp });
                    }}
                    className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 p-1 text-red-500 hover:bg-red-50 rounded"
                    title="Remover experiência"
                  >
                    ×
                  </button>
                )}
                <h4 className="text-xl font-bold text-gray-800 mb-1">
                  <InlineEdit
                    value={exp.position}
                    onSave={(val) => {
                      const newExp = [...data.experience];
                      newExp[index] = { ...newExp[index], position: val };
                      onDataChange?.({ ...data, experience: newExp });
                    }}
                    isAdvancedMode={isAdvancedMode}
                    as="span"
                  />
                </h4>
                <p className="font-medium text-gray-600 mb-2">
                  <InlineEdit
                    value={exp.company}
                    onSave={(val) => {
                      const newExp = [...data.experience];
                      newExp[index] = { ...newExp[index], company: val };
                      onDataChange?.({ ...data, experience: newExp });
                    }}
                    isAdvancedMode={isAdvancedMode}
                    as="span"
                  />
                </p>
                <p className="text-sm text-gray-500 mb-3">
                  <InlineEdit
                    value={exp.startDate}
                    onSave={(val) => {
                      const newExp = [...data.experience];
                      newExp[index] = { ...newExp[index], startDate: val };
                      onDataChange?.({ ...data, experience: newExp });
                    }}
                    isAdvancedMode={isAdvancedMode}
                    as="span"
                  /> - {exp.current ? (
                    <InlineEdit
                      value="Presente"
                      onSave={(val) => {
                        const newExp = [...data.experience];
                        newExp[index] = { ...newExp[index], endDate: val, current: false };
                        onDataChange?.({ ...data, experience: newExp });
                      }}
                      isAdvancedMode={isAdvancedMode}
                      as="span"
                    />
                  ) : (
                    <InlineEdit
                      value={exp.endDate}
                      onSave={(val) => {
                        const newExp = [...data.experience];
                        newExp[index] = { ...newExp[index], endDate: val };
                        onDataChange?.({ ...data, experience: newExp });
                      }}
                      isAdvancedMode={isAdvancedMode}
                      as="span"
                    />
                  )}
                </p>
                {exp.description && (
                  <div className="text-gray-700">
                    <InlineEdit
                      value={exp.description}
                      onSave={(val) => {
                        const newExp = [...data.experience];
                        newExp[index] = { ...newExp[index], description: val };
                        onDataChange?.({ ...data, experience: newExp });
                      }}
                      isAdvancedMode={isAdvancedMode}
                      multiline
                      as="p"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
          {isAdvancedMode && (
            <button
              onClick={() => {
                const newExp = [
                  ...(data.experience || []),
                  {
                    id: Date.now().toString(),
                    position: "Novo Cargo",
                    company: "Nome da Empresa",
                    startDate: "2024",
                    endDate: "Presente",
                    current: true,
                    description: "Descrição das atividades..."
                  }
                ];
                onDataChange?.({ ...data, experience: newExp });
              }}
              className="w-full py-3 mt-4 border-2 border-dashed border-slate-300 rounded-lg text-slate-500 hover:border-blue-500 hover:text-blue-600 flex items-center justify-center font-medium transition-colors"
            >
              + Adicionar Experiência
            </button>
          )}
        </div>
      )}

      {(data.education?.length > 0 || isAdvancedMode) && (
        <div className="mb-8 p-6 rounded-lg cv-section" style={{ backgroundColor: colors.background || '#f8fafc' }}>
          <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold mb-6`} style={{ color: colors.primary }}>
            <InlineEdit
              value={getSectionTitle('education', 'FORMAÇÃO ACADÉMICA')}
              onSave={(val) => updateSectionTitle('education', val)}
              isAdvancedMode={isAdvancedMode}
            />
          </h3>
          <div className="space-y-4">
            {data.education?.map((edu: any, index: number) => (
              <div key={index} className="pb-4 border-b border-gray-200 last:border-b-0 relative group">
                {isAdvancedMode && (
                  <button
                    onClick={() => {
                      const newEdu = data.education.filter((_: any, i: number) => i !== index);
                      onDataChange?.({ ...data, education: newEdu });
                    }}
                    className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 p-1 text-red-500 hover:bg-red-50 rounded"
                    title="Remover formação"
                  >
                    ×
                  </button>
                )}
                <h4 className="font-bold text-lg text-gray-800">
                  <InlineEdit
                    value={edu.degree}
                    onSave={(val) => {
                      const newEdu = [...data.education];
                      newEdu[index] = { ...newEdu[index], degree: val };
                      onDataChange?.({ ...data, education: newEdu });
                    }}
                    isAdvancedMode={isAdvancedMode}
                    as="span"
                  />
                </h4>
                <p className="text-gray-600">
                  <InlineEdit
                    value={edu.institution}
                    onSave={(val) => {
                      const newEdu = [...data.education];
                      newEdu[index] = { ...newEdu[index], institution: val };
                      onDataChange?.({ ...data, education: newEdu });
                    }}
                    isAdvancedMode={isAdvancedMode}
                    as="span"
                  />
                </p>
                <p className="text-sm text-gray-500">
                  <InlineEdit
                    value={edu.startYear}
                    onSave={(val) => {
                      const newEdu = [...data.education];
                      newEdu[index] = { ...newEdu[index], startYear: val };
                      onDataChange?.({ ...data, education: newEdu });
                    }}
                    isAdvancedMode={isAdvancedMode}
                    as="span"
                  /> - <InlineEdit
                    value={edu.endYear}
                    onSave={(val) => {
                      const newEdu = [...data.education];
                      newEdu[index] = { ...newEdu[index], endYear: val };
                      onDataChange?.({ ...data, education: newEdu });
                    }}
                    isAdvancedMode={isAdvancedMode}
                    as="span"
                  />
                </p>
              </div>
            ))}
          </div>
          {isAdvancedMode && (
            <button
              onClick={() => {
                const newEdu = [
                  ...(data.education || []),
                  {
                    id: Date.now().toString(),
                    degree: "Curso / Grau",
                    institution: "Nome da Instituição",
                    startYear: "2020",
                    endYear: "2024"
                  }
                ];
                onDataChange?.({ ...data, education: newEdu });
              }}
              className="w-full py-3 mt-4 border-2 border-dashed border-slate-300 rounded-lg text-slate-500 hover:border-blue-500 hover:text-blue-600 flex items-center justify-center font-medium transition-colors"
            >
              + Adicionar Formação
            </button>
          )}
        </div>
      )}

      {((data.skills?.technical?.length > 0) || (data.skills?.languages?.length > 0) || isAdvancedMode) && (
        <div className="p-6 rounded-lg cv-section" style={{ backgroundColor: '#ffffff', border: `2px solid ${colors.primary}` }}>
          <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold mb-6`} style={{ color: colors.primary }}>
            COMPETÊNCIAS
          </h3>
          <div className="grid grid-cols-2 gap-6">
            {(data.skills?.technical?.length > 0 || isAdvancedMode) && (
              <div>
                <h4 className="font-bold text-gray-800 mb-3">
                  <InlineEdit
                    value={getSectionTitle('skills', 'HABILIDADES TÉCNICAS')}
                    onSave={(val) => updateSectionTitle('skills', val)}
                    isAdvancedMode={isAdvancedMode}
                  />
                </h4>
                <div className="flex flex-wrap gap-2">
                  {data.skills?.technical?.map((skill: string, index: number) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm flex items-center group">
                      <InlineEdit
                        value={skill}
                        onSave={(val) => {
                          const newSkills = [...data.skills.technical];
                          newSkills[index] = val;
                          onDataChange?.({ ...data, skills: { ...data.skills, technical: newSkills } });
                        }}
                        isAdvancedMode={isAdvancedMode}
                        as="span"
                        className="mr-1"
                      />
                      {isAdvancedMode && (
                        <button
                          onClick={() => {
                            const newSkills = data.skills.technical.filter((_: any, i: number) => i !== index);
                            onDataChange?.({ ...data, skills: { ...data.skills, technical: newSkills } });
                          }}
                          className="text-red-400 hover:text-red-600 ml-1 font-bold"
                        >
                          ×
                        </button>
                      )}
                    </span>
                  ))}
                  {isAdvancedMode && (
                    <button
                      onClick={() => {
                        const newSkills = [...(data.skills?.technical || []), "Nova Habilidade"];
                        onDataChange?.({ ...data, skills: { ...data.skills, technical: newSkills } });
                      }}
                      className="px-3 py-1 border border-dashed border-gray-300 text-gray-500 rounded-full text-sm hover:border-blue-400 hover:text-blue-500"
                    >
                      + Adicionar
                    </button>
                  )}
                </div>
              </div>
            )}
            {(data.skills?.languages?.length > 0 || isAdvancedMode) && (
              <div>
                <h4 className="font-bold text-gray-800 mb-3">
                  <InlineEdit
                    value={getSectionTitle('languages', 'IDIOMAS')}
                    onSave={(val) => updateSectionTitle('languages', val)}
                    isAdvancedMode={isAdvancedMode}
                  />
                </h4>
                <div className="flex flex-wrap gap-2">
                  {data.skills?.languages?.map((language: string, index: number) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm flex items-center group">
                      <InlineEdit
                        value={language}
                        onSave={(val) => {
                          const newLangs = [...data.skills.languages];
                          newLangs[index] = val;
                          onDataChange?.({ ...data, skills: { ...data.skills, languages: newLangs } });
                        }}
                        isAdvancedMode={isAdvancedMode}
                        as="span"
                        className="mr-1"
                      />
                      {isAdvancedMode && (
                        <button
                          onClick={() => {
                            const newLangs = data.skills.languages.filter((_: any, i: number) => i !== index);
                            onDataChange?.({ ...data, skills: { ...data.skills, languages: newLangs } });
                          }}
                          className="text-red-400 hover:text-red-600 ml-1 font-bold"
                        >
                          ×
                        </button>
                      )}
                    </span>
                  ))}
                  {isAdvancedMode && (
                    <button
                      onClick={() => {
                        const newLangs = [...(data.skills?.languages || []), "Novo Idioma"];
                        onDataChange?.({ ...data, skills: { ...data.skills, languages: newLangs } });
                      }}
                      className="px-3 py-1 border border-dashed border-gray-300 text-gray-500 rounded-full text-sm hover:border-blue-400 hover:text-blue-500"
                    >
                      + Adicionar
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  // MODELO 4: Diagonal Moderno - Criativo Profissional
  const renderCriativoProfissional = () => (
    <div className={`flex min-h-full ${className}`} style={{ fontFamily: fonts.primary, backgroundColor: '#ffffff' }}>
      {/* Sidebar Esquerda Criativa */}
      <div className="w-[280px] p-8 shrink-0 flex flex-col gap-10" style={{ backgroundColor: '#f8fafc', borderRight: '1px solid #e2e8f0' }}>
        <div className="text-center">
          <div className="relative inline-block">
            {renderUserPhoto('circular', 'w-40 h-40 border-4 border-white shadow-xl')}
          </div>
          <h1 className="text-2xl font-black mt-6 mb-1 tracking-tight" style={{ color: colors.primary, fontFamily: fonts.headings }}>
            <InlineEdit value={data.personalData?.fullName || 'SEU NOME'} onSave={(val) => onDataChange?.({ ...data, personalData: { ...data.personalData, fullName: val } })} isAdvancedMode={isAdvancedMode} as="span" />
          </h1>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400">
            <InlineEdit value={data.personalData?.profession || 'Sua Profissão'} onSave={(val) => onDataChange?.({ ...data, personalData: { ...data.personalData, profession: val } })} isAdvancedMode={isAdvancedMode} as="span" />
          </p>
        </div>

        <div className="mb-6 cv-section">
          <h3 className="text-sm font-bold mb-3 uppercase tracking-wider flex items-center" style={{ color: colors.primary }}>
            <Phone className="w-4 h-4 mr-2" />
            <InlineEdit value={getSectionTitle('contact', 'Contacto')} onSave={(val) => updateSectionTitle('contact', val)} isAdvancedMode={isAdvancedMode} />
          </h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center" style={getElementStyle('contact-phone')}>
              <Phone className="w-3 h-3 mr-2" style={{ color: colors.primary }} />
              <InlineEdit 
                value={data.personalData?.phone || ''} 
                onSave={(val) => onDataChange?.({ ...data, personalData: { ...data.personalData, phone: val } })} 
                isAdvancedMode={isAdvancedMode} 
                placeholder="Telefone" 
                onClick={(e) => handleElementClick(e, 'text', 'contact-phone', getElementStyle('contact-phone'))}
                style={getElementStyle('contact-phone')}
                className="text-sm" 
              />
            </div>
            <div className="flex items-center" style={getElementStyle('contact-email')}>
              <Mail className="w-3 h-3 mr-2" style={{ color: colors.primary }} />
              <InlineEdit 
                value={data.personalData?.email || ''} 
                onSave={(val) => onDataChange?.({ ...data, personalData: { ...data.personalData, email: val } })} 
                isAdvancedMode={isAdvancedMode} 
                placeholder="Email" 
                onClick={(e) => handleElementClick(e, 'text', 'contact-email', getElementStyle('contact-email'))}
                style={getElementStyle('contact-email')}
                className="text-sm break-all" 
              />
            </div>
            <div className="flex items-center" style={getElementStyle('contact-address')}>
              <MapPin className="w-3 h-3 mr-2" style={{ color: colors.primary }} />
              <InlineEdit 
                value={data.personalData?.address || ''} 
                onSave={(val) => onDataChange?.({ ...data, personalData: { ...data.personalData, address: val } })} 
                isAdvancedMode={isAdvancedMode} 
                placeholder="Endereço" 
                onClick={(e) => handleElementClick(e, 'text', 'contact-address', getElementStyle('contact-address'))}
                style={getElementStyle('contact-address')}
                className="text-sm" 
              />
            </div>
          </div>
        </div>

        {data.about && (
          <div className="mb-6 cv-section">
            <h3 className="text-sm font-bold mb-3 uppercase tracking-wider flex items-center" style={{ color: colors.primary }}>
              <User className="w-4 h-4 mr-2" />
              <InlineEdit value={getSectionTitle('about', 'Sobre Mim')} onSave={(val) => updateSectionTitle('about', val)} isAdvancedMode={isAdvancedMode} />
            </h3>
            <div className="text-sm text-gray-600 leading-relaxed">
              <InlineEdit value={data.about} onSave={(val) => onDataChange?.({ ...data, about: val })} isAdvancedMode={isAdvancedMode} multiline as="p" />
            </div>
          </div>
        )}

        {(data.skills?.technical?.length > 0 || isAdvancedMode) && (
          <div className="mb-6 cv-section">
            <h3 className="text-sm font-bold mb-3 uppercase tracking-wider flex items-center" style={{ color: colors.primary }}>
              <Star className="w-4 h-4 mr-2" />
              <InlineEdit value={getSectionTitle('skills', 'Habilidades')} onSave={(val) => updateSectionTitle('skills', val)} isAdvancedMode={isAdvancedMode} />
            </h3>
            <div className="space-y-2">
              {data.skills?.technical?.map((skill: string, index: number) => (
                <div key={index} className="flex items-center text-sm text-gray-600 group">
                  <div className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: colors.primary }}></div>
                  <InlineEdit value={skill} onSave={(val) => { const n = [...data.skills.technical]; n[index] = val; onDataChange?.({ ...data, skills: { ...data.skills, technical: n } }); }} isAdvancedMode={isAdvancedMode} as="span" />
                  {isAdvancedMode && (<button onClick={() => { const n = data.skills.technical.filter((_: any, i: number) => i !== index); onDataChange?.({ ...data, skills: { ...data.skills, technical: n } }); }} className="opacity-0 group-hover:opacity-100 ml-1 text-red-500 text-xs">×</button>)}
                </div>
              ))}
              {isAdvancedMode && (<button onClick={() => { onDataChange?.({ ...data, skills: { ...data.skills, technical: [...(data.skills?.technical || []), "Nova Habilidade"] } }); }} className="text-xs text-gray-400 hover:text-blue-500">+ Adicionar</button>)}
            </div>
          </div>
        )}
      </div>

      {/* Conteúdo Principal */}
      <div className="flex-1 p-4">
        {(data.education?.length > 0 || isAdvancedMode) && (
          <div className="mb-8 cv-section">
            <div className="flex items-center mb-4">
              <GraduationCap className="w-5 h-5 mr-2" style={{ color: colors.primary }} />
              <h3 className="text-lg font-bold" style={{ color: colors.primary, fontFamily: fonts.headings }}>
                <InlineEdit value={getSectionTitle('education', 'Formação')} onSave={(val) => updateSectionTitle('education', val)} isAdvancedMode={isAdvancedMode} />
              </h3>
            </div>
            <div className="space-y-4 ml-2">
              {data.education?.map((edu: any, index: number) => (
                <div key={index} className="flex relative group">
                  <div className="flex flex-col items-center mr-4">
                    <div className="w-3 h-3 rounded-full border-2 mt-1" style={{ borderColor: colors.primary, backgroundColor: 'white' }}></div>
                    {index < (data.education?.length || 0) - 1 && (<div className="w-0.5 flex-1 mt-1" style={{ backgroundColor: colors.primary, opacity: 0.3 }}></div>)}
                  </div>
                  <div className="flex-1 pb-4">
                    {isAdvancedMode && (<button onClick={() => { onDataChange?.({ ...data, education: data.education.filter((_: any, i: number) => i !== index) }); }} className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 text-red-500 text-xs">×</button>)}
                    <h4 className="font-bold text-gray-800"><InlineEdit value={edu.degree} onSave={(val) => { const n = [...data.education]; n[index] = { ...n[index], degree: val }; onDataChange?.({ ...data, education: n }); }} isAdvancedMode={isAdvancedMode} as="span" /></h4>
                    <p className="text-sm text-gray-500 italic"><InlineEdit value={edu.institution} onSave={(val) => { const n = [...data.education]; n[index] = { ...n[index], institution: val }; onDataChange?.({ ...data, education: n }); }} isAdvancedMode={isAdvancedMode} as="span" /></p>
                    <p className="text-xs mt-1" style={{ color: colors.primary }}><InlineEdit value={edu.startYear} onSave={(val) => { const n = [...data.education]; n[index] = { ...n[index], startYear: val }; onDataChange?.({ ...data, education: n }); }} isAdvancedMode={isAdvancedMode} as="span" /> - <InlineEdit value={edu.endYear} onSave={(val) => { const n = [...data.education]; n[index] = { ...n[index], endYear: val }; onDataChange?.({ ...data, education: n }); }} isAdvancedMode={isAdvancedMode} as="span" /></p>
                  </div>
                </div>
              ))}
            </div>
            {isAdvancedMode && (<button onClick={() => { onDataChange?.({ ...data, education: [...(data.education || []), { id: Date.now().toString(), degree: "Curso", institution: "Instituição", startYear: "2020", endYear: "2024" }] }); }} className="w-full py-2 mt-2 border-2 border-dashed border-slate-300 rounded text-xs text-slate-500 hover:border-blue-500">+ Adicionar Formação</button>)}
          </div>
        )}

        {(data.experience?.length > 0 || isAdvancedMode) && (
          <div className="mb-8 cv-section">
            <div className="flex items-center mb-4">
              <Briefcase className="w-5 h-5 mr-2" style={{ color: colors.primary }} />
              <h3 className="text-lg font-bold" style={{ color: colors.primary, fontFamily: fonts.headings }}>
                <InlineEdit value={getSectionTitle('experience', 'Experiência')} onSave={(val) => updateSectionTitle('experience', val)} isAdvancedMode={isAdvancedMode} />
              </h3>
            </div>
            <div className="space-y-4 ml-2">
              {data.experience?.map((exp: any, index: number) => (
                <div key={index} className="flex relative group">
                  <div className="flex flex-col items-center mr-4">
                    <div className="w-3 h-3 rounded-full border-2 mt-1" style={{ borderColor: colors.primary, backgroundColor: 'white' }}></div>
                    {index < (data.experience?.length || 0) - 1 && (<div className="w-0.5 flex-1 mt-1" style={{ backgroundColor: colors.primary, opacity: 0.3 }}></div>)}
                  </div>
                  <div className="flex-1 pb-4">
                    {isAdvancedMode && (<button onClick={() => { onDataChange?.({ ...data, experience: data.experience.filter((_: any, i: number) => i !== index) }); }} className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 text-red-500 text-xs">×</button>)}
                    <h4 className="font-bold text-gray-800"><InlineEdit value={exp.position} onSave={(val) => { const n = [...data.experience]; n[index] = { ...n[index], position: val }; onDataChange?.({ ...data, experience: n }); }} isAdvancedMode={isAdvancedMode} as="span" /></h4>
                    <p className="text-sm text-gray-500 italic"><InlineEdit value={exp.company} onSave={(val) => { const n = [...data.experience]; n[index] = { ...n[index], company: val }; onDataChange?.({ ...data, experience: n }); }} isAdvancedMode={isAdvancedMode} as="span" /></p>
                    <p className="text-xs mt-1" style={{ color: colors.primary }}>
                      <InlineEdit value={exp.startDate} onSave={(val) => { const n = [...data.experience]; n[index] = { ...n[index], startDate: val }; onDataChange?.({ ...data, experience: n }); }} isAdvancedMode={isAdvancedMode} as="span" /> - {exp.current ? (<InlineEdit value="Presente" onSave={(val) => { const n = [...data.experience]; n[index] = { ...n[index], endDate: val, current: false }; onDataChange?.({ ...data, experience: n }); }} isAdvancedMode={isAdvancedMode} as="span" />) : (<InlineEdit value={exp.endDate} onSave={(val) => { const n = [...data.experience]; n[index] = { ...n[index], endDate: val }; onDataChange?.({ ...data, experience: n }); }} isAdvancedMode={isAdvancedMode} as="span" />)}
                    </p>
                    {exp.description && (<div className="text-sm text-gray-600 mt-2"><InlineEdit value={exp.description} onSave={(val) => { const n = [...data.experience]; n[index] = { ...n[index], description: val }; onDataChange?.({ ...data, experience: n }); }} isAdvancedMode={isAdvancedMode} multiline as="p" /></div>)}
                  </div>
                </div>
              ))}
            </div>
            {isAdvancedMode && (<button onClick={() => { onDataChange?.({ ...data, experience: [...(data.experience || []), { id: Date.now().toString(), position: "Cargo", company: "Empresa", startDate: "2024", endDate: "Presente", current: true, description: "Descrição..." }] }); }} className="w-full py-2 mt-2 border-2 border-dashed border-slate-300 rounded text-xs text-slate-500 hover:border-blue-500">+ Adicionar Experiência</button>)}
          </div>
        )}

        {(data.references?.length > 0 || isAdvancedMode) && (
          <div className="cv-section">
            <h3 className="text-lg font-bold mb-4" style={{ color: colors.primary, fontFamily: fonts.headings }}>
              <InlineEdit value={getSectionTitle('references', 'Referências')} onSave={(val) => updateSectionTitle('references', val)} isAdvancedMode={isAdvancedMode} />
            </h3>
            <div className={`${isMobile ? 'space-y-3' : 'grid grid-cols-2 gap-4'}`}>
              {data.references?.map((ref: any, index: number) => (
                <div key={index} className="bg-gray-50 p-3 rounded group relative">
                  {isAdvancedMode && (<button onClick={() => { onDataChange?.({ ...data, references: data.references.filter((_: any, i: number) => i !== index) }); }} className="absolute right-1 top-1 opacity-0 group-hover:opacity-100 text-red-500 text-xs">×</button>)}
                  <p className="font-bold text-sm text-gray-800"><InlineEdit value={ref.name} onSave={(val) => { const n = [...data.references]; n[index] = { ...n[index], name: val }; onDataChange?.({ ...data, references: n }); }} isAdvancedMode={isAdvancedMode} as="span" /></p>
                  <p className="text-xs text-gray-500"><InlineEdit value={ref.title || ref.contact} onSave={(val) => { const n = [...data.references]; n[index] = { ...n[index], title: val }; onDataChange?.({ ...data, references: n }); }} isAdvancedMode={isAdvancedMode} as="span" /></p>
                </div>
              ))}
            </div>
            {isAdvancedMode && (<button onClick={() => { onDataChange?.({ ...data, references: [...(data.references || []), { name: "Nome", title: "Cargo / Empresa" }] }); }} className="text-xs text-gray-400 hover:text-blue-500 mt-2">+ Adicionar</button>)}
          </div>
        )}
      </div>
    </div>
  );

  // MODELO 5: Sidebar Escura (Dark Header + Black Sidebar)
  const renderSidebarEscura = () => (
    <div className={`min-h-full ${className} flex flex-col`} style={{ fontFamily: fonts.primary, backgroundColor: '#ffffff' }}>
      {/* Header Superior Azul / Primário */}
      <div 
        className="relative h-40 flex items-center shrink-0 transition-all duration-300" 
        style={getElementStyle('header-container-v5', { backgroundColor: colors.primary })}
      >
        <div 
          className="absolute left-0 top-0 bottom-0 w-[240px] transition-all duration-300" 
          style={getElementStyle('sidebar-bg-v5', { backgroundColor: '#000000' })}
        ></div>
        <div className="ml-[280px] text-white pr-8 relative z-10">
          <h1 className="text-4xl font-black uppercase tracking-[0.1em] mb-1" style={getElementStyle('header-name-v5', { fontFamily: fonts.headings })}>
            <InlineEdit 
              value={data.personalData?.fullName || 'SEU NOME'} 
              onSave={(val) => onDataChange?.({ ...data, personalData: { ...data.personalData, fullName: val } })} 
              isAdvancedMode={isAdvancedMode} 
              className="text-white"
              as="span" 
            />
          </h1>
          <p className="text-lg opacity-80 font-bold tracking-widest uppercase" style={getElementStyle('header-title-v5')}>
            <InlineEdit 
              value={data.personalData?.profession || 'Sua Profissão'} 
              onSave={(val) => onDataChange?.({ ...data, personalData: { ...data.personalData, profession: val } })} 
              isAdvancedMode={isAdvancedMode} 
              className="text-white"
              as="span" 
            />
          </p>
        </div>
      </div>

      <div className="flex flex-1 overflow-visible">
        {/* Sidebar Negra */}
        <div 
          className="w-[240px] text-white p-8 pt-20 relative shrink-0 transition-all duration-300"
          style={getElementStyle('sidebar-bg-v5', { backgroundColor: '#000000' })}
        >
          {/* Foto que sobrepõe o header - POSIÇÃO VIP */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 z-20">
            {renderUserPhoto('circular', 'w-44 h-44 border-8 border-white shadow-2xl')}
          </div>

          <div className="space-y-6 sm:space-y-8 mt-4 sm:mt-6">
            {/* Sobre Mim */}
            <div className="cv-section pt-8">
              <h3 className="text-[10px] sm:text-xs font-bold mb-3 uppercase tracking-widest text-white/50 border-b border-white/10 pb-1">Sobre Mim</h3>
              <div className="text-[10px] sm:text-xs leading-relaxed opacity-80">
                <InlineEdit value={data.about} onSave={(val) => onDataChange?.({ ...data, about: val })} isAdvancedMode={isAdvancedMode} multiline as="p" className="text-white" />
              </div>
            </div>

            {/* Contacto */}
            <div className="cv-section space-y-3">
              <div className="flex items-center text-[10px] sm:text-xs opacity-90 group relative" style={getElementStyle('contact-phone-v5')}>
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-500 flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                  <Phone className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                </div>
                <InlineEdit 
                  value={data.personalData?.phone || ''} 
                  onSave={(val) => onDataChange?.({ ...data, personalData: { ...data.personalData, phone: val } })} 
                  isAdvancedMode={isAdvancedMode} 
                  placeholder="Telefone" 
                  onClick={(e) => handleElementClick(e, 'text', 'contact-phone-v5', getElementStyle('contact-phone-v5'))}
                  style={getElementStyle('contact-phone-v5')}
                  className="text-white" 
                />
              </div>
              <div className="flex items-center text-[10px] sm:text-xs opacity-90 group relative" style={getElementStyle('contact-email-v5')}>
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-500 flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                  <Mail className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                </div>
                <InlineEdit 
                  value={data.personalData?.email || ''} 
                  onSave={(val) => onDataChange?.({ ...data, personalData: { ...data.personalData, email: val } })} 
                  isAdvancedMode={isAdvancedMode} 
                  placeholder="Email" 
                  onClick={(e) => handleElementClick(e, 'text', 'contact-email-v5', getElementStyle('contact-email-v5'))}
                  style={getElementStyle('contact-email-v5')}
                  className="text-white break-all" 
                />
              </div>
              <div className="flex items-center text-[10px] sm:text-xs opacity-90 group relative">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-500 flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                  <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                </div>
                <InlineEdit value={data.personalData?.address || ''} onSave={(val) => onDataChange?.({ ...data, personalData: { ...data.personalData, address: val } })} isAdvancedMode={isAdvancedMode} placeholder="Endereço" className="text-white" />
              </div>
            </div>

            {/* Idiomas */}
            {(data.skills?.languages?.length > 0 || isAdvancedMode) && (
              <div className="cv-section">
                <div className="bg-white/5 border border-white/10 rounded-lg p-2 sm:p-3">
                  <h3 className="text-[10px] sm:text-xs font-bold mb-2 uppercase tracking-widest text-blue-400">IDIOMA</h3>
                  <div className="space-y-1">
                    {data.skills?.languages?.map((language: string, index: number) => (
                      <div key={index} className="flex items-center text-[10px] sm:text-xs opacity-90 group">
                        <span className="mr-2 text-blue-500">•</span>
                        <InlineEdit value={language} onSave={(val) => { const n = [...data.skills.languages]; n[index] = val; onDataChange?.({ ...data, skills: { ...data.skills, languages: n } }); }} isAdvancedMode={isAdvancedMode} as="span" className="text-white" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Expertise */}
            {(data.skills?.technical?.length > 0 || isAdvancedMode) && (
              <div className="cv-section">
                <div className="bg-white/5 border border-white/10 rounded-lg p-2 sm:p-3">
                  <h3 className="text-[10px] sm:text-xs font-bold mb-2 uppercase tracking-widest text-blue-400">EXPERTISE</h3>
                  <div className="space-y-1">
                    {data.skills?.technical?.map((skill: string, index: number) => (
                      <div key={index} className="flex items-center text-[10px] sm:text-xs opacity-90 group">
                        <span className="mr-2 text-blue-500">•</span>
                        <InlineEdit value={skill} onSave={(val) => { const n = [...data.skills.technical]; n[index] = val; onDataChange?.({ ...data, skills: { ...data.skills, technical: n } }); }} isAdvancedMode={isAdvancedMode} as="span" className="text-white" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Conteúdo Principal */}
        <div className="flex-1 p-5 sm:p-8 pt-6 sm:pt-8 bg-white">
          {/* Experiência */}
          {(data.experience?.length > 0 || isAdvancedMode) && (
            <div className="mb-8 sm:mb-10">
              <div className="inline-block px-6 sm:px-10 py-1.5 rounded-full text-white text-xs sm:text-sm font-bold mb-6 tracking-wide" style={{ backgroundColor: colors.primary }}>
                EXPERIÊNCIA
              </div>
              <div className="space-y-6 sm:space-y-8 mt-2">
                {data.experience?.map((exp: any, index: number) => (
                  <div key={index} className="relative group pl-1">
                    <h4 className="font-bold text-gray-900 uppercase text-sm sm:text-base">
                      <InlineEdit value={exp.company} onSave={(val) => { const n = [...data.experience]; n[index] = { ...n[index], company: val }; onDataChange?.({ ...data, experience: n }); }} isAdvancedMode={isAdvancedMode} as="span" />
                    </h4>
                    <div className="flex justify-between items-start mt-1">
                      <p className="text-xs sm:text-sm font-bold text-gray-700">
                        <InlineEdit value={exp.position} onSave={(val) => { const n = [...data.experience]; n[index] = { ...n[index], position: val }; onDataChange?.({ ...data, experience: n }); }} isAdvancedMode={isAdvancedMode} as="span" />
                      </p>
                      <p className="text-[10px] sm:text-xs font-bold text-gray-400 shrink-0 ml-2">
                        <InlineEdit value={exp.startDate} onSave={(val) => { const n = [...data.experience]; n[index] = { ...n[index], startDate: val }; onDataChange?.({ ...data, experience: n }); }} isAdvancedMode={isAdvancedMode} as="span" /> - {exp.current ? 'PRESENTE' : exp.endDate}
                      </p>
                    </div>
                    {exp.description && (<div className="text-[10px] sm:text-xs text-gray-600 mt-2 leading-relaxed"><InlineEdit value={exp.description} onSave={(val) => { const n = [...data.experience]; n[index] = { ...n[index], description: val }; onDataChange?.({ ...data, experience: n }); }} isAdvancedMode={isAdvancedMode} multiline as="p" /></div>)}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Formação */}
          {(data.education?.length > 0 || isAdvancedMode) && (
            <div className="mb-8 sm:mb-10">
              <div className="inline-block px-6 sm:px-10 py-1.5 rounded-full text-white text-xs sm:text-sm font-bold mb-6 tracking-wide" style={{ backgroundColor: colors.primary }}>
                FORMAÇÃO
              </div>
              <div className="space-y-4 sm:space-y-6 mt-2">
                {data.education?.map((edu: any, index: number) => (
                  <div key={index} className="pl-1">
                    <h4 className="font-bold text-gray-900 uppercase text-sm sm:text-base">
                      <InlineEdit value={edu.institution} onSave={(val) => { const n = [...data.education]; n[index] = { ...n[index], institution: val }; onDataChange?.({ ...data, education: n }); }} isAdvancedMode={isAdvancedMode} as="span" />
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-700 mt-1">
                      <InlineEdit value={edu.degree} onSave={(val) => { const n = [...data.education]; n[index] = { ...n[index], degree: val }; onDataChange?.({ ...data, education: n }); }} isAdvancedMode={isAdvancedMode} as="span" />
                    </p>
                    <p className="text-[10px] sm:text-xs font-bold text-gray-400 mt-1 uppercase">
                      <InlineEdit value={edu.startYear} onSave={(val) => { const n = [...data.education]; n[index] = { ...n[index], startYear: val }; onDataChange?.({ ...data, education: n }); }} isAdvancedMode={isAdvancedMode} as="span" /> - <InlineEdit value={edu.endYear} onSave={(val) => { const n = [...data.education]; n[index] = { ...n[index], endYear: val }; onDataChange?.({ ...data, education: n }); }} isAdvancedMode={isAdvancedMode} as="span" />
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Competências com barras de progresso */}
          {(data.skills?.technical?.length > 0 || isAdvancedMode) && (
            <div>
              <div className="inline-block px-6 sm:px-10 py-1.5 rounded-full text-white text-xs sm:text-sm font-bold mb-6 tracking-wide" style={{ backgroundColor: colors.primary }}>
                COMPETÊNCIAS
              </div>
              <div className="grid grid-cols-1 gap-y-3 sm:gap-y-4 mt-2 pr-2">
                {data.skills?.technical?.map((skill: string, index: number) => {
                  const percentage = Math.max(60, 100 - (index * 8));
                  return (
                    <div key={index} className="group">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] sm:text-xs font-bold text-gray-700 uppercase">{skill}</span>
                        <span className="text-[8px] sm:text-[10px] font-bold text-gray-400">{percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${percentage}%`, backgroundColor: colors.primary }}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Função principal de renderização baseada no template
  const renderTemplate = () => {
    switch (template.id) {
      case 'cv-classico-elegante':
        return renderProfissionalClassico();

      case 'cv-sidebar-professional':
        return renderBarraLateralEsquerda();

      case 'cv-sidebar-dark':
        return renderSidebarEscura();

      case 'cv-minimalist-clean':
        return renderLayoutSimplesDestaques();

      case 'cv-diagonal-modern':
        return renderCriativoProfissional();

      default:
        if (template.layout?.includes('sidebar')) return renderBarraLateralEsquerda();
        if (template.layout?.includes('creative') || template.layout?.includes('diagonal')) return renderCriativoProfissional();
        return renderProfissionalClassico();
    }
  };

  const containerRef = React.useRef<HTMLDivElement>(null);
  const [scaleFactor, setScaleFactor] = useState(1);

  // Lógica de Escala A4 Pro para Mobile e Desktop
  useEffect(() => {
    const calculateScale = () => {
      if (!containerRef.current) return;
      const parentWidth = containerRef.current.parentElement?.clientWidth || window.innerWidth;
      const a4WidthPx = 794; // Largura aproximada de 210mm a 96dpi (pode ser ajustada para 800)
      
      if (parentWidth < a4WidthPx + 40) {
        setScaleFactor(parentWidth / (a4WidthPx + 40));
      } else {
        setScaleFactor(1);
      }
    };

    calculateScale();
    window.addEventListener('resize', calculateScale);
    return () => window.removeEventListener('resize', calculateScale);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="bg-transparent w-full relative flex justify-center items-start overflow-visible py-10 print:p-0 print:m-0"
    >
      {/* Contentor de Escala Proporcional - O SEGREDO DO A4 NO MOBILE */}
      <div 
        className="relative origin-top transition-transform duration-300 shadow-2xl print:shadow-none print:scale-100 bg-white"
        style={{ 
          width: '794px', // 210mm a 96dpi
          minHeight: '1123px', // 297mm a 96dpi
          transform: `scale(${scaleFactor})`,
          marginBottom: `calc((1123px * ${scaleFactor}) - 1123px)` // Ajuste para o fluxo de layout
        }}
      >
        {/* CORTE FÍSICO DE PÁGINA A4 COM SOMBRAS - VISÃO SUPER PROFISSIONAL */}
        {[1, 2, 3, 4].map((page) => (
          <div 
            key={page}
            className="absolute -left-[20px] -right-[20px] z-[100] h-[32px] bg-slate-50 pointer-events-none flex items-center justify-center"
            style={{ 
              top: `${page * 1123 - 16}px`,
              boxShadow: 'inset 0 4px 6px -1px rgba(0,0,0,0.05), inset 0 -4px 6px -1px rgba(0,0,0,0.05)'
            }}
          >
            {isAdvancedMode && (
              <div className="px-3 py-[2px] bg-white text-slate-400 text-[9px] font-bold uppercase rounded border border-slate-200 shadow-sm tracking-[0.2em] relative z-10 pointer-events-auto">
                Fim da Página {page}
              </div>
            )}
          </div>
        ))}

        {/* Camada de Conteúdo */}
        <div className="relative z-[10] w-full min-h-full">
          {renderTemplate()}
        </div>
      </div>

      {activeToolbar && (
        <FloatingToolbar 
          position={activeToolbar.position}
          activeElement={activeToolbar}
          onClose={() => setActiveToolbar(null)}
          onStyleChange={handleStyleChange}
        />
      )}
    </div>
  );
};

export default CVLayoutRenderer;
