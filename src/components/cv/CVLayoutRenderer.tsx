import React, { useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Mail, Phone, MapPin, Globe, Calendar, Award, Briefcase, GraduationCap, User, Star, Languages, Wrench, Camera } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { LayoutConfig, getDefaultLayoutConfig } from '@/services/cvService';
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

  // Helper to check if section is hidden
  const isSectionHidden = (sectionId: string) => {
    return activeLayoutConfig.hiddenSections?.includes(sectionId) || false;
  };

  // Função para renderizar foto do usuário
  const renderUserPhoto = (position: string, size: string = "w-24 h-24 sm:w-32 sm:h-32") => {
    if (!userPhoto && !data.personalData?.photo && !isAdvancedMode) return null;

    const photoUrl = userPhoto || data.personalData?.photo;

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          onDataChange?.({
            ...data,
            personalData: {
              ...data.personalData,
              photo: reader.result as string
            }
          });
        };
        reader.readAsDataURL(file);
      }
    };

    const shapeClass = position === 'square' ? 'rounded-lg' : 'rounded-full';

    const photoElement = (
      <div className={`${size} ${shapeClass} overflow-hidden border-4 border-white shadow-lg flex-shrink-0`}>
        {photoUrl ? (
          <img
            src={photoUrl}
            alt="Foto do perfil"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">
            <User className="w-1/2 h-1/2" />
          </div>
        )}
      </div>
    );

    if (isAdvancedMode) {
      return (
        <label className={`${size} ${shapeClass} overflow-hidden border-4 border-white shadow-lg flex-shrink-0 cursor-pointer block relative group`}>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePhotoUpload}
          />
          {photoUrl ? (
            <img
              src={photoUrl}
              alt="Foto do perfil"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">
              <User className="w-1/2 h-1/2" />
            </div>
          )}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white z-10">
            <Camera className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-medium uppercase tracking-wider">Alterar</span>
          </div>
        </label>
      );
    }

    return photoElement;
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
    <div className={`min-h-full ${className}`} style={{ fontFamily: fonts.primary, backgroundColor: '#ffffff' }}>
      {/* Cabeçalho centralizado */}
      <div className="text-center py-6 sm:py-8 border-b-2" style={{ borderColor: colors.primary }}>
        <h1 className={`${isMobile ? 'text-2xl' : 'text-4xl'} font-bold mb-2`} style={{ color: colors.primary, fontFamily: fonts.headings }}>
          <InlineEdit
            value={data.personalData?.fullName || 'SEU NOME'}
            onSave={(val) => onDataChange?.({ ...data, personalData: { ...data.personalData, fullName: val } })}
            isAdvancedMode={isAdvancedMode}
            as="span"
          />
        </h1>
        <p className={`${isMobile ? 'text-lg' : 'text-xl'} text-gray-600 font-medium`}>
          <InlineEdit
            value={data.personalData?.profession || 'Sua Profissão'}
            onSave={(val) => onDataChange?.({ ...data, personalData: { ...data.personalData, profession: val } })}
            isAdvancedMode={isAdvancedMode}
            as="span"
          />
        </p>
      </div>

      <div className={`${isMobile ? 'block' : 'flex'} gap-6 p-4 sm:p-6`}>
        {/* Coluna Esquerda - InformaÃ§Ãµes secundÃ¡rias */}
        <div className={`${isMobile ? 'w-full mb-6' : 'w-1/3'} space-y-6`}>
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
        <div className={`${isMobile ? 'w-full' : 'flex-1'} space-y-6`}>
          {/* Perfil */}
          {data.about && (
            <div>
              <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold mb-4 flex items-center`} style={{ color: colors.primary }}>
                <User className="w-5 h-5 mr-2" />
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
            <div>
              <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold mb-4 flex items-center`} style={{ color: colors.primary }}>
                <Briefcase className="w-5 h-5 mr-2" />
                <InlineEdit
                  value={getSectionTitle('experience', 'EXPERIÊNCIA PROFISSIONAL')}
                  onSave={(val) => updateSectionTitle('experience', val)}
                  isAdvancedMode={isAdvancedMode}
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
              <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold mb-4 flex items-center`} style={{ color: colors.primary }}>
                <GraduationCap className="w-5 h-5 mr-2" />
                <InlineEdit
                  value={getSectionTitle('education', 'FORMAÇÃO ACADÉMICA')}
                  onSave={(val) => updateSectionTitle('education', val)}
                  isAdvancedMode={isAdvancedMode}
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

  // MODELO 2: Barra Lateral Esquerda
  const renderBarraLateralEsquerda = () => (
    <div className={`${isMobile ? 'block' : 'flex'} min-h-full ${className}`} style={{ fontFamily: fonts.primary }}>
      {/* Sidebar Esquerda */}
      <div
        className={`${isMobile ? 'w-full py-6 px-4' : 'w-1/3 p-6'} text-white`}
        style={{ backgroundColor: colors.primary }}
      >
        {/* Foto e Info Básica */}
        <div className="text-center mb-6">
          <div className="mx-auto" style={{ width: 'fit-content' }}>
            {renderUserPhoto('circular', isMobile ? 'w-24 h-24' : 'w-32 h-32') || (
              <div className={`${isMobile ? 'w-24 h-24' : 'w-32 h-32'} rounded-full bg-white bg-opacity-20 border-4 border-white flex items-center justify-center`}>
                <User className={`${isMobile ? 'w-12 h-12' : 'w-16 h-16'} text-white`} />
              </div>
            )}
          </div>
          <h1 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold mt-4 mb-2`}>
            <InlineEdit
              value={data.personalData?.fullName || 'SEU NOME'}
              onSave={(val) => onDataChange?.({ ...data, personalData: { ...data.personalData, fullName: val } })}
              isAdvancedMode={isAdvancedMode}
              as="span"
              className="text-white"
            />
          </h1>
          <p className={`${isMobile ? 'text-base' : 'text-lg'} opacity-90`}>
            <InlineEdit
              value={data.personalData?.profession || 'Sua Profissão'}
              onSave={(val) => onDataChange?.({ ...data, personalData: { ...data.personalData, profession: val } })}
              isAdvancedMode={isAdvancedMode}
              as="span"
              className="text-white"
            />
          </p>
        </div>

        {/* Contacto com ícones */}
        <div className="mb-6 cv-section">
          <h3 className="text-lg font-bold mb-3 border-b-2 pb-2" style={{ borderColor: colors.accent }}>
            <InlineEdit
              value={getSectionTitle('contact', 'CONTACTO')}
              onSave={(val) => updateSectionTitle('contact', val)}
              isAdvancedMode={isAdvancedMode}
              className="text-white"
            />
          </h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-3" />
              <InlineEdit
                value={data.personalData?.phone || ''}
                onSave={(val) => onDataChange?.({ ...data, personalData: { ...data.personalData, phone: val } })}
                isAdvancedMode={isAdvancedMode}
                placeholder="Seu telefone"
                className="text-sm text-white hover:text-white"
              />
            </div>
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-3" />
              <InlineEdit
                value={data.personalData?.email || ''}
                onSave={(val) => onDataChange?.({ ...data, personalData: { ...data.personalData, email: val } })}
                isAdvancedMode={isAdvancedMode}
                placeholder="Seu email"
                className="text-sm break-all text-white hover:text-white"
              />
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-3" />
              <InlineEdit
                value={data.personalData?.address || ''}
                onSave={(val) => onDataChange?.({ ...data, personalData: { ...data.personalData, address: val } })}
                isAdvancedMode={isAdvancedMode}
                placeholder="Seu endereço"
                className="text-sm text-white hover:text-white"
              />
            </div>
          </div>
        </div>

        {/* Habilidades */}
        {(data.skills?.technical?.length > 0 || isAdvancedMode) && (
          <div className="mb-6 cv-section">
            <h3 className="text-lg font-bold mb-3 border-b-2 pb-2" style={{ borderColor: colors.accent }}>
              <InlineEdit
                value={getSectionTitle('skills', 'HABILIDADES')}
                onSave={(val) => updateSectionTitle('skills', val)}
                isAdvancedMode={isAdvancedMode}
                className="text-white"
              />
            </h3>
            <div className="space-y-2">
              {data.skills?.technical?.map((skill: string, index: number) => (
                <div key={index} className="flex items-center group">
                  <Wrench className="w-3 h-3 mr-2" />
                  <InlineEdit
                    value={skill}
                    onSave={(val) => {
                      const newSkills = [...data.skills.technical];
                      newSkills[index] = val;
                      onDataChange?.({ ...data, skills: { ...data.skills, technical: newSkills } });
                    }}
                    isAdvancedMode={isAdvancedMode}
                    className="text-sm flex-1 text-white hover:text-white"
                  />
                  {isAdvancedMode && (
                    <button
                      onClick={() => {
                        const newSkills = data.skills.technical.filter((_: any, i: number) => i !== index);
                        onDataChange?.({ ...data, skills: { ...data.skills, technical: newSkills } });
                      }}
                      className="opacity-0 group-hover:opacity-100 text-red-300 ml-2"
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
                  className="text-xs text-blue-200 hover:text-white mt-2 flex items-center font-medium"
                >
                  + Adicionar Habilidade
                </button>
              )}
            </div>
          </div>
        )}

        {/* Idiomas */}
        {(data.skills?.languages?.length > 0 || isAdvancedMode) && (
          <div>
            <h3 className="text-lg font-bold mb-3 border-b-2 pb-2" style={{ borderColor: colors.accent }}>
              <InlineEdit
                value={getSectionTitle('languages', 'IDIOMAS')}
                onSave={(val) => updateSectionTitle('languages', val)}
                isAdvancedMode={isAdvancedMode}
                className="text-white"
              />
            </h3>
            <div className="space-y-2">
              {data.skills?.languages?.map((language: string, index: number) => (
                <div key={index} className="flex items-center group">
                  <Languages className="w-3 h-3 mr-2" />
                  <InlineEdit
                    value={language}
                    onSave={(val) => {
                      const newLangs = [...data.skills.languages];
                      newLangs[index] = val;
                      onDataChange?.({ ...data, skills: { ...data.skills, languages: newLangs } });
                    }}
                    isAdvancedMode={isAdvancedMode}
                    className="text-sm flex-1 text-white hover:text-white"
                  />
                  {isAdvancedMode && (
                    <button
                      onClick={() => {
                        const newLangs = data.skills.languages.filter((_: any, i: number) => i !== index);
                        onDataChange?.({ ...data, skills: { ...data.skills, languages: newLangs } });
                      }}
                      className="opacity-0 group-hover:opacity-100 text-red-300 ml-2"
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
                  className="text-xs text-blue-200 hover:text-white mt-2 flex items-center font-medium"
                >
                  + Adicionar Idioma
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Conteúdo Principal */}
      <div className={`${isMobile ? 'w-full p-4' : 'flex-1 p-8'}`} style={{ backgroundColor: '#ffffff' }}>
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

  // MODELO 3: Layout Simples com Destaques
  const renderLayoutSimplesDestaques = () => (
    <div className={`min-h-full p-4 sm:p-8 ${className}`} style={{ fontFamily: fonts.primary, backgroundColor: '#ffffff' }}>
      {/* Nome e título no topo */}
      <div className="text-center mb-8 pb-6 border-b-2" style={{ borderColor: colors.primary }}>
        <h1 className={`${isMobile ? 'text-3xl' : 'text-4xl'} font-bold mb-2`} style={{ color: colors.primary }}>
          <InlineEdit
            value={data.personalData?.fullName || 'SEU NOME'}
            onSave={(val) => onDataChange?.({ ...data, personalData: { ...data.personalData, fullName: val } })}
            isAdvancedMode={isAdvancedMode}
            as="span"
          />
        </h1>
        <p className={`${isMobile ? 'text-lg' : 'text-xl'} text-gray-600 mb-4`}>
          <InlineEdit
            value={data.personalData?.profession || 'Sua Profissão'}
            onSave={(val) => onDataChange?.({ ...data, personalData: { ...data.personalData, profession: val } })}
            isAdvancedMode={isAdvancedMode}
            as="span"
          />
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Mail className="w-4 h-4 mr-2" />
            <InlineEdit
              value={data.personalData?.email || ''}
              onSave={(val) => onDataChange?.({ ...data, personalData: { ...data.personalData, email: val } })}
              isAdvancedMode={isAdvancedMode}
              placeholder="Seu email"
              className="text-sm break-all"
            />
          </div>
          <div className="flex items-center">
            <Phone className="w-4 h-4 mr-2" />
            <InlineEdit
              value={data.personalData?.phone || ''}
              onSave={(val) => onDataChange?.({ ...data, personalData: { ...data.personalData, phone: val } })}
              isAdvancedMode={isAdvancedMode}
              placeholder="Seu telefone"
              className="text-sm"
            />
          </div>
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2" />
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
          <div className={`${isMobile ? 'block' : 'grid grid-cols-2'} gap-6`}>
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

  // MODELO 4: Sidebar com Timeline (Diagonal Moderno)
  const renderCriativoProfissional = () => (
    <div className={`${isMobile ? 'block' : 'flex'} min-h-full ${className}`} style={{ fontFamily: fonts.primary, backgroundColor: '#ffffff' }}>
      {/* Sidebar Esquerda */}
      <div className={`${isMobile ? 'w-full px-5 py-6' : 'w-1/3 p-6'}`} style={{ backgroundColor: '#f0f4f8' }}>
        <div className="text-center mb-6">
          <div className="mx-auto" style={{ width: 'fit-content' }}>
            {renderUserPhoto('circular', isMobile ? 'w-24 h-24' : 'w-32 h-32') || (
              <div className={`${isMobile ? 'w-24 h-24' : 'w-32 h-32'} rounded-full bg-white border-4 flex items-center justify-center`} style={{ borderColor: colors.primary }}>
                <User className={`${isMobile ? 'w-12 h-12' : 'w-16 h-16'}`} style={{ color: colors.primary }} />
              </div>
            )}
          </div>
          <h1 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold mt-4 mb-1`} style={{ color: colors.primary, fontFamily: fonts.headings }}>
            <InlineEdit value={data.personalData?.fullName || 'SEU NOME'} onSave={(val) => onDataChange?.({ ...data, personalData: { ...data.personalData, fullName: val } })} isAdvancedMode={isAdvancedMode} as="span" />
          </h1>
          <p className="text-gray-500 text-sm italic">
            <InlineEdit value={data.personalData?.profession || 'Sua Profissão'} onSave={(val) => onDataChange?.({ ...data, personalData: { ...data.personalData, profession: val } })} isAdvancedMode={isAdvancedMode} as="span" />
          </p>
        </div>

        <div className="mb-6 cv-section">
          <h3 className="text-sm font-bold mb-3 uppercase tracking-wider flex items-center" style={{ color: colors.primary }}>
            <Phone className="w-4 h-4 mr-2" />
            <InlineEdit value={getSectionTitle('contact', 'Contacto')} onSave={(val) => updateSectionTitle('contact', val)} isAdvancedMode={isAdvancedMode} />
          </h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center"><Phone className="w-3 h-3 mr-2" style={{ color: colors.primary }} /><InlineEdit value={data.personalData?.phone || ''} onSave={(val) => onDataChange?.({ ...data, personalData: { ...data.personalData, phone: val } })} isAdvancedMode={isAdvancedMode} placeholder="Telefone" className="text-sm" /></div>
            <div className="flex items-center"><Mail className="w-3 h-3 mr-2" style={{ color: colors.primary }} /><InlineEdit value={data.personalData?.email || ''} onSave={(val) => onDataChange?.({ ...data, personalData: { ...data.personalData, email: val } })} isAdvancedMode={isAdvancedMode} placeholder="Email" className="text-sm break-all" /></div>
            <div className="flex items-center"><MapPin className="w-3 h-3 mr-2" style={{ color: colors.primary }} /><InlineEdit value={data.personalData?.address || ''} onSave={(val) => onDataChange?.({ ...data, personalData: { ...data.personalData, address: val } })} isAdvancedMode={isAdvancedMode} placeholder="Endereço" className="text-sm" /></div>
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
      <div className={`${isMobile ? 'w-full p-4' : 'flex-1 p-6'}`}>
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

  // MODELO 5: Sidebar Escura (Dark blue header, black sidebar, white main)
  const renderSidebarEscura = () => (
    <div className={`min-h-full ${className} flex flex-col`} style={{ fontFamily: fonts.primary, backgroundColor: '#ffffff' }}>
      {/* Header Superior Azul */}
      <div className="relative h-28 sm:h-32 flex items-center shrink-0" style={{ backgroundColor: colors.primary }}>
        <div className="absolute left-0 top-0 bottom-0 w-[30%] sm:w-[35%] bg-black"></div>
        <div className="ml-[35%] sm:ml-[40%] text-white pr-4">
          <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold uppercase tracking-wider mb-1`} style={{ fontFamily: fonts.headings }}>
            <InlineEdit value={data.personalData?.fullName || 'SEU NOME'} onSave={(val) => onDataChange?.({ ...data, personalData: { ...data.personalData, fullName: val } })} isAdvancedMode={isAdvancedMode} as="span" className="text-white" />
          </h1>
          <p className="text-sm sm:text-base opacity-90 font-medium">
            <InlineEdit value={data.personalData?.profession || 'Sua Profissão'} onSave={(val) => onDataChange?.({ ...data, personalData: { ...data.personalData, profession: val } })} isAdvancedMode={isAdvancedMode} as="span" className="text-white" />
          </p>
        </div>
      </div>

      <div className="flex flex-1 overflow-visible">
        {/* Sidebar Preta */}
        <div className="w-[30%] sm:w-[35%] bg-black text-white p-4 sm:p-6 pt-12 sm:pt-16 relative shrink-0">
          {/* Foto que sobrepõe o header */}
          <div className="absolute -top-16 sm:-top-20 left-1/2 -translate-x-1/2 z-10" style={{ width: 'fit-content' }}>
            {renderUserPhoto('circular', isMobile ? 'w-28 h-28' : 'w-36 h-36') || (
              <div className={`${isMobile ? 'w-28 h-28' : 'w-36 h-36'} rounded-full border-4 border-white bg-slate-800 flex items-center justify-center`}>
                <User className={`${isMobile ? 'w-14 h-14' : 'w-18 h-18'} text-white opacity-40`} />
              </div>
            )}
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
              <div className="flex items-center text-[10px] sm:text-xs opacity-90 group relative">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-500 flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                  <Phone className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                </div>
                <InlineEdit value={data.personalData?.phone || ''} onSave={(val) => onDataChange?.({ ...data, personalData: { ...data.personalData, phone: val } })} isAdvancedMode={isAdvancedMode} placeholder="Telefone" className="text-white" />
              </div>
              <div className="flex items-center text-[10px] sm:text-xs opacity-90 group relative">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-500 flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                  <Mail className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                </div>
                <InlineEdit value={data.personalData?.email || ''} onSave={(val) => onDataChange?.({ ...data, personalData: { ...data.personalData, email: val } })} isAdvancedMode={isAdvancedMode} placeholder="Email" className="text-white break-all" />
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

  return (
    <div className="bg-white w-full h-full">
      {renderTemplate()}
    </div>
  );
};

export default CVLayoutRenderer;
