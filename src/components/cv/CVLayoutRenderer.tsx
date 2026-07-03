import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Mail, Phone, MapPin, Globe, Calendar, Award, Briefcase, GraduationCap, User, Users, Star, Languages, Wrench, Camera } from 'lucide-react';
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

  const [overflowMap, setOverflowMap] = useState<Record<string, boolean>>({});
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [scaleFactor, setScaleFactor] = useState(1);

  const isMobile = useIsMobile();
  const colors = data?.colorPalette || template?.colorPalette || { primary: '#4285F4', secondary: '#34A853', accent: '#FBBC05' };
  const fonts = data?.fonts || template?.fonts || { primary: 'Times New Roman', headings: 'Times New Roman' };

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
  const pageCount = activeLayoutConfig.pageCount || 1;

  useEffect(() => {
    if (!isAdvancedMode) return;
    const checkOverflow = () => {
      const newOverflow: Record<string, boolean> = {};
      const pages = document.querySelectorAll('.cv-page-container');
      
      pages.forEach((page) => {
        const pageRect = page.getBoundingClientRect();
        // Limit bottom with a safety margin
        const pageBottomLimit = pageRect.bottom - 40; 
        
        const nodes = page.querySelectorAll('[data-cv-node]');
        nodes.forEach(node => {
          const rect = node.getBoundingClientRect();
          // Exclude hidden/zero-height nodes from triggering overflow
          if (rect.height > 0 && rect.bottom > pageBottomLimit) {
            const id = node.getAttribute('data-cv-node');
            if (id) newOverflow[id] = true;
          }
        });
      });
      
      setOverflowMap(prev => JSON.stringify(prev) !== JSON.stringify(newOverflow) ? newOverflow : prev);
    };

    const observer = new ResizeObserver(checkOverflow);
    if (containerRef.current) observer.observe(containerRef.current);
    
    const timeout = setTimeout(checkOverflow, 500);
    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, [data, isAdvancedMode, pageCount]);

  const isAssignedToPage = (id: string, defaultPage: number, currentPageIndex: number) => {
    const assignedPage = activeLayoutConfig.pageAssignments?.[id] ?? defaultPage;
    return assignedPage === currentPageIndex;
  };

  const renderOverflowWarning = (id: string, pageIndex: number) => {
    if (!overflowMap[id] || !isAdvancedMode) return null;
    return (
      <div className="absolute inset-0 bg-white/90 backdrop-blur-[2px] z-50 flex flex-col items-center justify-center p-4 border-2 border-red-500 border-dashed rounded-lg">
        <div className="bg-red-50 text-red-600 px-4 py-2 rounded-full font-bold text-sm shadow-sm flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
          Conteúdo Excede a Página
        </div>
        <p className="text-xs text-slate-600 mt-2 font-medium text-center">
          Este item não será visível na exportação.<br/>
          Mova-o para a próxima página.
        </p>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            const newAssignments = { ...(activeLayoutConfig.pageAssignments || {}) };
            newAssignments[id] = pageIndex + 1;
            const newPageCount = Math.max(pageCount, pageIndex + 2);
            onDataChange?.({
              ...data,
              layoutConfig: { 
                ...activeLayoutConfig, 
                pageAssignments: newAssignments,
                pageCount: newPageCount
              }
            });
          }}
          className="mt-3 bg-red-600 hover:bg-red-700 text-white text-[11px] px-4 py-1.5 rounded-full font-bold transition-colors shadow-sm"
        >
          Mover para Página {pageIndex + 2}
        </button>
      </div>
    );
  };

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

  // Helper to render custom sections added by the user
  const renderCustomSections = (sidebarStyle = false, pageIndex = 0) => {
    if (!data.customSections?.length && !isAdvancedMode) return null;
    return (
      <>
        {data.customSections?.filter((section: any) => isAssignedToPage(section.id, 0, pageIndex)).map((section: any, sIdx: number) => (
          <div key={section.id} className="cv-section cv-section-item mt-4">
            <h3
              className={sidebarStyle
                ? "text-xs font-black mb-3 uppercase tracking-[0.2em] border-b border-white/20 pb-2"
                : `${isMobile ? 'text-lg' : 'text-xl'} font-bold mb-4 flex items-center`}
              style={sidebarStyle ? {} : { color: colors.primary }}
            >
              <InlineEdit
                value={section.title || 'Nova Secção'}
                onSave={(val) => {
                  const ns = [...(data.customSections || [])];
                  ns[sIdx] = { ...ns[sIdx], title: val };
                  onDataChange?.({ ...data, customSections: ns });
                }}
                isAdvancedMode={isAdvancedMode}
                className={sidebarStyle ? "text-white" : ""}
              />
            </h3>
            <div className="space-y-2">
              {section.items?.map((item: any, iIdx: number) => (
                <div key={item.id} className="flex items-start group cv-section-item">
                  <div className="w-2 h-2 rounded-full mr-3 mt-1.5 shrink-0" style={{ backgroundColor: sidebarStyle ? 'rgba(255,255,255,0.5)' : colors.primary }} />
                  <div className="flex-1">
                    <InlineEdit
                      value={item.title}
                      onSave={(val) => {
                        const ns = [...(data.customSections || [])];
                        const ni = [...ns[sIdx].items];
                        ni[iIdx] = { ...ni[iIdx], title: val };
                        ns[sIdx] = { ...ns[sIdx], items: ni };
                        onDataChange?.({ ...data, customSections: ns });
                      }}
                      isAdvancedMode={isAdvancedMode}
                      className={`text-sm ${sidebarStyle ? 'text-white' : ''}`}
                      as="span"
                    />
                    {item.description && (
                      <InlineEdit
                        value={item.description}
                        onSave={(val) => {
                          const ns = [...(data.customSections || [])];
                          const ni = [...ns[sIdx].items];
                          ni[iIdx] = { ...ni[iIdx], description: val };
                          ns[sIdx] = { ...ns[sIdx], items: ni };
                          onDataChange?.({ ...data, customSections: ns });
                        }}
                        isAdvancedMode={isAdvancedMode}
                        multiline
                        className={`text-xs mt-1 ${sidebarStyle ? 'text-white/70' : 'text-gray-500'}`}
                        as="p"
                      />
                    )}
                  </div>
                  {isAdvancedMode && (
                    <button
                      onClick={() => {
                        const ns = [...(data.customSections || [])];
                        ns[sIdx] = { ...ns[sIdx], items: ns[sIdx].items.filter((_: any, i: number) => i !== iIdx) };
                        onDataChange?.({ ...data, customSections: ns });
                      }}
                      className="opacity-0 group-hover:opacity-100 text-red-500 ml-2 text-xs"
                    >×</button>
                  )}
                </div>
              ))}
              {isAdvancedMode && (
                <button
                  onClick={() => {
                    const ns = [...(data.customSections || [])];
                    ns[sIdx] = { ...ns[sIdx], items: [...ns[sIdx].items, { id: Date.now().toString(), title: 'Novo Item', description: '' }] };
                    onDataChange?.({ ...data, customSections: ns });
                  }}
                  className={`text-xs mt-2 font-medium ${sidebarStyle ? 'text-white/60 hover:text-white' : 'text-blue-600 hover:text-blue-800'}`}
                >+ Adicionar Item</button>
              )}
            </div>
            {isAdvancedMode && (
              <button
                onClick={() => {
                  const ns = (data.customSections || []).filter((_: any, i: number) => i !== sIdx);
                  onDataChange?.({ ...data, customSections: ns });
                }}
                className="text-[10px] text-red-400 hover:text-red-600 mt-2 block"
              >Remover Secção</button>
            )}
          </div>
        ))}
        {isAdvancedMode && (
          <button
            onClick={() => {
              const newSection = { id: `custom-${Date.now()}`, title: 'Nova Secção', items: [{ id: Date.now().toString(), title: 'Item de Exemplo', description: '' }] };
              onDataChange?.({ ...data, customSections: [...(data.customSections || []), newSection] });
            }}
            className={`w-full py-3 mt-4 border-2 border-dashed rounded-lg flex items-center justify-center font-medium transition-colors ${
              sidebarStyle ? 'border-white/20 text-white/60 hover:border-white/40' : 'border-slate-300 text-slate-500 hover:border-blue-500 hover:text-blue-600'
            }`}
          >+ Adicionar Secção</button>
        )}
      </>
    );
  };

  // MODELO 1: Profissional Clássico - Cabeçalho centralizado + duas colunas
  const renderProfissionalClassico = (pageIndex: number) => (
    <div className={`min-h-full ${className} flex flex-col`} style={{ fontFamily: fonts.primary, backgroundColor: '#ffffff' }}>
      {/* Cabeçalho centralizado com FOTO OBRIGATÓRIA - Apenas na primeira página */}
      {isAssignedToPage('header', 0, pageIndex) && pageIndex === 0 && (
        <div data-cv-node="header" className="flex flex-col items-center py-4 sm:py-6 border-b-2 gap-3 relative" style={getElementStyle('header-container', { borderColor: colors.primary })}>
          {renderOverflowWarning('header', pageIndex)}
          {renderUserPhoto('circular', 'w-24 h-24')}
        
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold mb-1" style={getElementStyle('header-name', { color: colors.primary, fontFamily: fonts.headings })}>
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
      )}

      <div className="flex gap-2 p-2 relative">
        {/* Coluna Esquerda - Informações secundárias */}
        <div 
          className="w-1/3 space-y-6 transition-all duration-300 rounded-lg p-2" 
          style={getElementStyle('sidebar-left', { backgroundColor: 'transparent' })}
          onClick={(e) => handleElementClick(e, 'container', 'sidebar-left', getElementStyle('sidebar-left', { backgroundColor: 'transparent' }))}
        >
          {/* Contacto */}
          {isAssignedToPage('contact', 0, pageIndex) && (
          <div data-cv-node="contact" className="bg-gray-50 p-4 rounded-lg relative">
            {renderOverflowWarning('contact', pageIndex)}
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
          )}

          {/* Habilidades */}
          {isAssignedToPage('skills', 0, pageIndex) && (data.skills?.technical?.length > 0 || isAdvancedMode) && (
            <div data-cv-node="skills" className="bg-gray-50 p-4 rounded-lg relative">
              {renderOverflowWarning('skills', pageIndex)}
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
          {isAssignedToPage('languages', 0, pageIndex) && (data.skills?.languages?.length > 0 || isAdvancedMode) && (
            <div data-cv-node="languages" className="bg-gray-50 p-4 rounded-lg cv-section relative">
              {renderOverflowWarning('languages', pageIndex)}
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
          {/* Custom Sections */}
          {renderCustomSections(false, pageIndex)}
        </div>

        <div className="flex-1 space-y-4">
          {/* Perfil */}
          {isAssignedToPage('about', 0, pageIndex) && data.about && (
            <div data-cv-node="about" className="relative">
              {renderOverflowWarning('about', pageIndex)}
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
              <div className="text-gray-700 leading-relaxed text-justify" style={getElementStyle('about-text')}>
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
          {isAssignedToPage('experience-container', 0, pageIndex) && (data.experience?.length > 0 || isAdvancedMode) && (
            <div data-cv-node="experience-container" className="relative">
              {renderOverflowWarning('experience-container', pageIndex)}
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
                    {data.experience?.filter((e: any) => isAssignedToPage(e.id || e.company, 0, pageIndex)).map((exp: any, index: number) => (
                      <SortableItem key={exp.id || exp.company} id={exp.id || exp.company} isAdvancedMode={isAdvancedMode}>
                        <div data-cv-node={exp.id || exp.company} className="border-l-4 pl-4 relative group" style={{ borderColor: colors.secondary }}>
                          {renderOverflowWarning(exp.id || exp.company, pageIndex)}
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
                            <div className="text-gray-700 text-justify">
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
          {isAssignedToPage('education-container', 0, pageIndex) && (data.education?.length > 0 || isAdvancedMode) && (
            <div data-cv-node="education-container" className="relative">
              {renderOverflowWarning('education-container', pageIndex)}
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
                    {data.education?.filter((e: any) => isAssignedToPage(e.id || e.institution, 0, pageIndex)).map((edu: any, index: number) => (
                      <SortableItem key={edu.id || edu.institution} id={edu.id || edu.institution} isAdvancedMode={isAdvancedMode}>
                        <div data-cv-node={edu.id || edu.institution} className="border-l-4 pl-4 relative group" style={{ borderColor: colors.secondary }}>
                          {renderOverflowWarning(edu.id || edu.institution, pageIndex)}
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
  const renderBarraLateralEsquerda = (pageIndex: number) => {
    if (pageIndex > 0) return null;
    return (
    <div className={`flex min-h-full cv-layout-sidebar ${className}`} style={{ fontFamily: fonts.primary, backgroundColor: '#ffffff' }}>
      {/* Sidebar - FOTO OBRIGATÓRIA NO TOPO */}
      <div className="w-[260px] p-8 shrink-0 flex flex-col gap-8 transition-all duration-300 cv-sidebar-column" style={getElementStyle('sidebar-left-v2', { backgroundColor: colors.primary, color: '#ffffff' })}>
        <div className="flex flex-col items-center gap-4">
          <div className="relative group">
            {renderUserPhoto('circular', 'w-32 h-32 border-4 border-white/20 shadow-lg')}
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

        {/* Custom Sections */}
        {renderCustomSections(true)}
      </div>

      {/* Conteúdo Principal - Branco com Respiro */}
      <div className="flex-1 p-10 bg-white shadow-inner cv-main-column">
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
            <div className="text-gray-700 leading-relaxed text-justify">
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
                    <div className="text-gray-700 text-justify">
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
  };

  // MODELO 3: Layout Simples com Destaques - Visual VIP Minimalista
  const renderLayoutSimplesDestaques = (pageIndex: number) => {
    if (pageIndex > 0) return null;
    return (
    <div className="min-h-full p-12" style={{ fontFamily: fonts.primary, backgroundColor: '#ffffff' }}>
      {/* Header VIP de Alto Impacto */}
      <div className="flex items-center gap-10 mb-8 pb-8 border-b-4" style={getElementStyle('header-container-v3', { borderColor: colors.primary })}>
        <div className="shrink-0 flex items-center justify-center">
          {renderUserPhoto('square', 'w-36 h-36 shadow-2xl border-4 border-slate-50 rounded-lg')}
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
          <div className="text-gray-700 leading-relaxed text-justify">
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
                  <div className="text-gray-700 text-justify">
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

      {/* Custom Sections */}
      {renderCustomSections()}
    </div>
    );
  };

  // MODELO 4: Diagonal Moderno - Criativo Profissional
  const renderCriativoProfissional = (pageIndex: number) => {
    if (pageIndex > 0) return null;
    return (
    <div className={`flex min-h-full cv-layout-sidebar ${className}`} style={{ fontFamily: fonts.primary, backgroundColor: '#ffffff' }}>
      {/* Sidebar Esquerda Criativa */}
      <div className="w-[280px] p-8 shrink-0 flex flex-col gap-8 cv-sidebar-column" style={{ backgroundColor: '#f8fafc', borderRight: '1px solid #e2e8f0' }}>
        <div className="text-center">
          <div className="inline-block relative mb-4">
            <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-20 transform -translate-y-2"></div>
            {renderUserPhoto('circular', 'w-32 h-32 border-4 border-white shadow-xl')}
          </div>
          <h1 className="text-xl font-black mt-6 mb-1 tracking-tight" style={{ color: colors.primary, fontFamily: fonts.headings }}>
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

        {/* Custom Sections */}
        {renderCustomSections()}
      </div>

      {/* Conteúdo Principal */}
      <div className="flex-1 p-4 cv-main-column">
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
                    {exp.description && (<div className="text-sm text-gray-600 mt-2 text-justify"><InlineEdit value={exp.description} onSave={(val) => { const n = [...data.experience]; n[index] = { ...n[index], description: val }; onDataChange?.({ ...data, experience: n }); }} isAdvancedMode={isAdvancedMode} multiline as="p" /></div>)}
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
  };

  // MODELO 5: Sidebar Escura (Dark Header + Black Sidebar)
  const renderSidebarEscura = (pageIndex: number) => {
    if (pageIndex > 0) return null;
    return (
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

      <div className="flex flex-1 overflow-visible cv-layout-sidebar">
        {/* Sidebar Negra */}
        <div 
          className="w-[240px] text-white p-8 pt-20 relative shrink-0 transition-all duration-300 cv-sidebar-column"
          style={getElementStyle('sidebar-bg-v5', { backgroundColor: '#000000' })}
        >
          {/* Foto que sobrepõe o header - POSIÇÃO VIP */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 z-20">
            {renderUserPhoto('circular', 'w-32 h-32 border-4 border-white shadow-2xl')}
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

            {/* Custom Sections */}
            {renderCustomSections(true)}
          </div>
        </div>

        {/* Conteúdo Principal */}
        <div className="flex-1 p-5 sm:p-8 pt-6 sm:pt-8 bg-white cv-main-column">
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
                    {exp.description && (<div className="text-[10px] sm:text-xs text-gray-600 mt-2 leading-relaxed text-justify"><InlineEdit value={exp.description} onSave={(val) => { const n = [...data.experience]; n[index] = { ...n[index], description: val }; onDataChange?.({ ...data, experience: n }); }} isAdvancedMode={isAdvancedMode} multiline as="p" /></div>)}
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
  };

  const renderCreativeYellowDark = (pageIndex: number) => (
    <div className={`min-h-full ${className} flex flex-col relative bg-white`} style={{ fontFamily: fonts.primary }}>
      <div className="flex flex-1 relative">
        {/* Left Column (Dark Sidebar) */}
        <div 
          className="w-[35%] relative flex flex-col" 
          style={getElementStyle('sidebar-left', { backgroundColor: colors.secondary, color: '#FFFFFF' })}
          onClick={(e) => handleElementClick(e, 'container', 'sidebar-left', getElementStyle('sidebar-left', { backgroundColor: colors.secondary }))}
        >
          {/* Yellow Diagonal Header Accent */}
          {pageIndex === 0 && (
            <div className="absolute top-0 left-0 w-[150%] h-[200px] overflow-hidden -z-10" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)', backgroundColor: colors.primary }}></div>
          )}

          <div className="px-6 py-10 relative z-10 flex-1">
            {pageIndex === 0 && (
              <div className="mb-10 pt-4 relative flex justify-center">
                {renderUserPhoto('circular', 'w-32 h-32')}
              </div>
            )}

            {/* Contact Info */}
            {isAssignedToPage('contact', 0, pageIndex) && (
              <div data-cv-node="contact" className="mb-8 relative cv-section group">
                {renderOverflowWarning('contact', pageIndex)}
                <h3 className="text-sm font-black mb-4 uppercase tracking-[0.2em] flex items-center border-b border-white/20 pb-2 text-white">
                  <span className="w-4 h-4 rounded-full mr-2 flex items-center justify-center text-[10px]" style={{ backgroundColor: colors.primary }}><User size={10} color="#fff" /></span>
                  <InlineEdit value={getSectionTitle('contact', 'CONTACT ME')} onSave={(val) => updateSectionTitle('contact', val)} isAdvancedMode={isAdvancedMode} className="text-white" />
                </h3>
                <div className="space-y-3 text-sm text-white/90">
                  {data.personalData?.phone && (
                    <div className="flex items-start">
                      <Phone className="w-4 h-4 mr-3 mt-1 shrink-0" style={{ color: colors.primary }} />
                      <InlineEdit value={data.personalData.phone} onSave={(val) => onDataChange?.({ ...data, personalData: { ...data.personalData, phone: val } })} isAdvancedMode={isAdvancedMode} className="break-words" />
                    </div>
                  )}
                  {data.personalData?.email && (
                    <div className="flex items-start">
                      <Mail className="w-4 h-4 mr-3 mt-1 shrink-0" style={{ color: colors.primary }} />
                      <InlineEdit value={data.personalData.email} onSave={(val) => onDataChange?.({ ...data, personalData: { ...data.personalData, email: val } })} isAdvancedMode={isAdvancedMode} className="break-all" />
                    </div>
                  )}
                  {data.personalData?.address && (
                    <div className="flex items-start">
                      <MapPin className="w-4 h-4 mr-3 mt-1 shrink-0" style={{ color: colors.primary }} />
                      <InlineEdit value={data.personalData.address} onSave={(val) => onDataChange?.({ ...data, personalData: { ...data.personalData, address: val } })} isAdvancedMode={isAdvancedMode} className="break-words" />
                    </div>
                  )}
                  {data.personalData?.website && (
                    <div className="flex items-start">
                      <Globe className="w-4 h-4 mr-3 mt-1 shrink-0" style={{ color: colors.primary }} />
                      <InlineEdit value={data.personalData.website} onSave={(val) => onDataChange?.({ ...data, personalData: { ...data.personalData, website: val } })} isAdvancedMode={isAdvancedMode} className="break-words" />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* References / Custom Left Sections */}
            {isAssignedToPage('references', 0, pageIndex) && data.dados?.references?.length > 0 && (
              <div data-cv-node="references" className="mb-8 relative cv-section group">
                {renderOverflowWarning('references', pageIndex)}
                <h3 className="text-sm font-black mb-4 uppercase tracking-[0.2em] flex items-center border-b border-white/20 pb-2 text-white">
                  <span className="w-4 h-4 rounded-full mr-2 flex items-center justify-center text-[10px]" style={{ backgroundColor: colors.primary }}><User size={10} color="#fff" /></span>
                  <InlineEdit value={getSectionTitle('references', 'REFERENCES')} onSave={(val) => updateSectionTitle('references', val)} isAdvancedMode={isAdvancedMode} className="text-white" />
                </h3>
                <div className="space-y-4">
                  {data.dados?.references?.map((ref: any, idx: number) => (
                    <div key={idx} className="text-sm text-white/90">
                      <p className="font-bold text-white uppercase">{ref.name}</p>
                      <p className="text-xs text-white/70 italic mb-1">{ref.title}</p>
                      <p className="text-xs">Tel: {ref.contact}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education (Left Side in this layout) */}
            {isAssignedToPage('education-container', 0, pageIndex) && data.education?.length > 0 && (
              <div data-cv-node="education-container" className="mb-8 relative cv-section group">
                {renderOverflowWarning('education-container', pageIndex)}
                <h3 className="text-sm font-black mb-4 uppercase tracking-[0.2em] flex items-center border-b border-white/20 pb-2 text-white">
                  <span className="w-4 h-4 rounded-full mr-2 flex items-center justify-center text-[10px]" style={{ backgroundColor: colors.primary }}><GraduationCap size={10} color="#fff" /></span>
                  <InlineEdit value={getSectionTitle('education', 'EDUCATION')} onSave={(val) => updateSectionTitle('education', val)} isAdvancedMode={isAdvancedMode} className="text-white" />
                </h3>
                <div className="space-y-4">
                  {data.education?.filter((e: any) => isAssignedToPage(e.id || e.institution, 0, pageIndex)).map((edu: any, index: number) => (
                    <div key={edu.id || edu.institution} data-cv-node={edu.id || edu.institution} className="relative group text-sm">
                       <p className="font-bold text-white uppercase text-xs mb-1">
                         <InlineEdit value={edu.institution} onSave={(val) => { const newEdu = [...data.education]; newEdu[index] = { ...newEdu[index], institution: val }; onDataChange?.({ ...data, education: newEdu }); }} isAdvancedMode={isAdvancedMode} />
                       </p>
                       <p className="text-white/80 font-medium">
                         <InlineEdit value={edu.degree} onSave={(val) => { const newEdu = [...data.education]; newEdu[index] = { ...newEdu[index], degree: val }; onDataChange?.({ ...data, education: newEdu }); }} isAdvancedMode={isAdvancedMode} />
                       </p>
                       <p className="text-xs text-white/50 mt-1">
                         <InlineEdit value={edu.startYear} onSave={(val) => { const newEdu = [...data.education]; newEdu[index] = { ...newEdu[index], startYear: val }; onDataChange?.({ ...data, education: newEdu }); }} isAdvancedMode={isAdvancedMode} as="span" />
                         <span> - </span>
                         <InlineEdit value={edu.endYear} onSave={(val) => { const newEdu = [...data.education]; newEdu[index] = { ...newEdu[index], endYear: val }; onDataChange?.({ ...data, education: newEdu }); }} isAdvancedMode={isAdvancedMode} as="span" />
                       </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {renderCustomSections(true, pageIndex)}
          </div>
        </div>

        {/* Right Column (White Area) */}
        <div className="w-[65%] px-10 py-12 flex flex-col bg-white">
          {pageIndex === 0 && (
            <div className="mb-10 border-b pb-6" style={{ borderColor: '#E5E7EB' }}>
              <h1 className="text-4xl font-black mb-1 uppercase tracking-wider" style={getElementStyle('header-name', { color: colors.secondary, fontFamily: fonts.headings })}>
                <InlineEdit value={data.personalData?.fullName || 'YOUR NAME'} onSave={(val) => onDataChange?.({ ...data, personalData: { ...data.personalData, fullName: val } })} isAdvancedMode={isAdvancedMode} />
              </h1>
              <p className="text-lg font-semibold uppercase tracking-[0.2em]" style={getElementStyle('header-profession', { color: colors.primary })}>
                <InlineEdit value={data.personalData?.profession || 'Your Profession'} onSave={(val) => onDataChange?.({ ...data, personalData: { ...data.personalData, profession: val } })} isAdvancedMode={isAdvancedMode} />
              </p>
            </div>
          )}

          {isAssignedToPage('about', 0, pageIndex) && data.about && (
            <div data-cv-node="about" className="mb-8 relative cv-section group">
              {renderOverflowWarning('about', pageIndex)}
              <h3 className="text-lg font-black mb-3 uppercase tracking-wider flex items-center" style={{ color: colors.secondary }}>
                <span className="w-5 h-5 rounded-full mr-3 flex items-center justify-center text-xs" style={{ backgroundColor: colors.primary }}><User size={12} color="#fff" /></span>
                <InlineEdit value={getSectionTitle('about', 'ABOUT ME')} onSave={(val) => updateSectionTitle('about', val)} isAdvancedMode={isAdvancedMode} />
              </h3>
              <div className="text-sm text-gray-600 leading-relaxed text-justify" style={getElementStyle('about-text')}>
                <InlineEdit value={data.about} onSave={(val) => onDataChange?.({ ...data, about: val })} isAdvancedMode={isAdvancedMode} multiline as="p" />
              </div>
            </div>
          )}

          {isAssignedToPage('experience-container', 0, pageIndex) && data.experience?.length > 0 && (
            <div data-cv-node="experience-container" className="mb-8 relative cv-section group">
              {renderOverflowWarning('experience-container', pageIndex)}
              <h3 className="text-lg font-black mb-4 uppercase tracking-wider flex items-center" style={{ color: colors.secondary }}>
                <span className="w-5 h-5 rounded-full mr-3 flex items-center justify-center text-xs" style={{ backgroundColor: colors.primary }}><Briefcase size={12} color="#fff" /></span>
                <InlineEdit value={getSectionTitle('experience', 'JOB EXPERIENCE')} onSave={(val) => updateSectionTitle('experience', val)} isAdvancedMode={isAdvancedMode} />
              </h3>
              
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                 {data.experience?.filter((e: any) => isAssignedToPage(e.id || e.company, 0, pageIndex)).map((exp: any, index: number) => (
                    <div key={exp.id || exp.company} data-cv-node={exp.id || exp.company} className="relative group">
                       <div className="flex justify-between items-end mb-1">
                         <h4 className="font-bold text-sm uppercase" style={{ color: colors.secondary }}>
                           <InlineEdit value={exp.position} onSave={(val) => { const newExp = [...data.experience]; newExp[index] = { ...newExp[index], position: val }; onDataChange?.({ ...data, experience: newExp }); }} isAdvancedMode={isAdvancedMode} as="span" />
                         </h4>
                         <span className="text-xs font-bold" style={{ color: colors.primary }}>
                            <InlineEdit value={exp.startDate} onSave={(val) => { const newExp = [...data.experience]; newExp[index] = { ...newExp[index], startDate: val }; onDataChange?.({ ...data, experience: newExp }); }} isAdvancedMode={isAdvancedMode} as="span" />
                            <span> - </span>
                            <InlineEdit value={exp.current ? 'Present' : exp.endDate} onSave={(val) => { const newExp = [...data.experience]; newExp[index] = { ...newExp[index], endDate: val, current: false }; onDataChange?.({ ...data, experience: newExp }); }} isAdvancedMode={isAdvancedMode} as="span" />
                         </span>
                       </div>
                       <p className="text-xs font-medium text-gray-500 italic mb-2">
                         <InlineEdit value={exp.company} onSave={(val) => { const newExp = [...data.experience]; newExp[index] = { ...newExp[index], company: val }; onDataChange?.({ ...data, experience: newExp }); }} isAdvancedMode={isAdvancedMode} as="span" />
                       </p>
                       <div className="text-xs text-gray-600 leading-relaxed">
                         <InlineEdit value={exp.description} onSave={(val) => { const newExp = [...data.experience]; newExp[index] = { ...newExp[index], description: val }; onDataChange?.({ ...data, experience: newExp }); }} isAdvancedMode={isAdvancedMode} multiline as="p" />
                       </div>
                    </div>
                 ))}
              </div>
            </div>
          )}

          {isAssignedToPage('skills', 0, pageIndex) && data.skills?.technical?.length > 0 && (
            <div data-cv-node="skills" className="mb-8 relative cv-section group">
              {renderOverflowWarning('skills', pageIndex)}
              <h3 className="text-lg font-black mb-4 uppercase tracking-wider flex items-center" style={{ color: colors.secondary }}>
                <span className="w-5 h-5 rounded-full mr-3 flex items-center justify-center text-xs" style={{ backgroundColor: colors.primary }}><Star size={12} color="#fff" /></span>
                <InlineEdit value={getSectionTitle('skills', 'SKILLS')} onSave={(val) => updateSectionTitle('skills', val)} isAdvancedMode={isAdvancedMode} />
              </h3>
              <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                {data.skills?.technical?.map((skill: string, index: number) => (
                  <div key={index} className="flex flex-col group">
                    <span className="text-xs font-bold text-gray-700 mb-1">
                      <InlineEdit value={skill} onSave={(val) => { const newSkills = [...data.skills.technical]; newSkills[index] = val; onDataChange?.({ ...data, skills: { ...data.skills, technical: newSkills } }); }} isAdvancedMode={isAdvancedMode} />
                    </span>
                    <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                       <div className="h-full rounded-full" style={{ width: `${Math.floor(Math.random() * 40) + 60}%`, backgroundColor: colors.primary }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );

  const renderModernSlateSidebar = (pageIndex: number) => (
    <div className={`min-h-full ${className} flex flex-col relative bg-white`} style={{ fontFamily: fonts.primary }}>
      <div className="flex flex-1">
        {/* Left Sidebar */}
        <div 
          className="w-[30%] px-6 py-10 flex flex-col" 
          style={getElementStyle('sidebar-left', { backgroundColor: colors.primary, color: '#EAEAEA' })}
          onClick={(e) => handleElementClick(e, 'container', 'sidebar-left', getElementStyle('sidebar-left', { backgroundColor: colors.primary }))}
        >
          {pageIndex === 0 && (
            <div className="mb-8 flex flex-col items-center border-b border-white/10 pb-8">
              {renderUserPhoto('circular', 'w-32 h-32 mb-6')}
              <h1 className="text-2xl font-bold text-center text-white leading-tight mb-2" style={getElementStyle('header-name', { fontFamily: fonts.headings })}>
                <InlineEdit value={data.personalData?.fullName || 'Your Name'} onSave={(val) => onDataChange?.({ ...data, personalData: { ...data.personalData, fullName: val } })} isAdvancedMode={isAdvancedMode} />
              </h1>
              <p className="text-sm font-medium text-center opacity-80" style={getElementStyle('header-profession', { color: colors.secondary })}>
                <InlineEdit value={data.personalData?.profession || 'Software Engineer'} onSave={(val) => onDataChange?.({ ...data, personalData: { ...data.personalData, profession: val } })} isAdvancedMode={isAdvancedMode} />
              </p>
            </div>
          )}

          {isAssignedToPage('contact', 0, pageIndex) && (
            <div data-cv-node="contact" className="mb-8 relative cv-section group">
              {renderOverflowWarning('contact', pageIndex)}
              <h3 className="text-sm font-bold mb-4 uppercase tracking-widest text-white">
                <InlineEdit value={getSectionTitle('contact', 'CONTACT')} onSave={(val) => updateSectionTitle('contact', val)} isAdvancedMode={isAdvancedMode} />
              </h3>
              <div className="space-y-3 text-xs opacity-90">
                {data.personalData?.phone && (
                  <div className="flex items-center">
                    <Phone className="w-3.5 h-3.5 mr-3 shrink-0 text-[#60A5FA]" />
                    <InlineEdit value={data.personalData.phone} onSave={(val) => onDataChange?.({ ...data, personalData: { ...data.personalData, phone: val } })} isAdvancedMode={isAdvancedMode} className="break-words" />
                  </div>
                )}
                {data.personalData?.email && (
                  <div className="flex items-center">
                    <Mail className="w-3.5 h-3.5 mr-3 shrink-0 text-[#60A5FA]" />
                    <InlineEdit value={data.personalData.email} onSave={(val) => onDataChange?.({ ...data, personalData: { ...data.personalData, email: val } })} isAdvancedMode={isAdvancedMode} className="break-all" />
                  </div>
                )}
                {data.personalData?.address && (
                  <div className="flex items-start">
                    <MapPin className="w-3.5 h-3.5 mr-3 mt-0.5 shrink-0 text-[#60A5FA]" />
                    <InlineEdit value={data.personalData.address} onSave={(val) => onDataChange?.({ ...data, personalData: { ...data.personalData, address: val } })} isAdvancedMode={isAdvancedMode} className="break-words" />
                  </div>
                )}
              </div>
            </div>
          )}

          {isAssignedToPage('skills', 0, pageIndex) && data.skills?.technical?.length > 0 && (
            <div data-cv-node="skills" className="mb-8 relative cv-section group">
              {renderOverflowWarning('skills', pageIndex)}
              <h3 className="text-sm font-bold mb-4 uppercase tracking-widest text-white">
                <InlineEdit value={getSectionTitle('skills', 'SKILLS')} onSave={(val) => updateSectionTitle('skills', val)} isAdvancedMode={isAdvancedMode} />
              </h3>
              <ul className="space-y-2 text-xs opacity-90 list-disc list-inside">
                {data.skills?.technical?.map((skill: string, index: number) => (
                  <li key={index} className="marker:text-[#60A5FA]">
                    <InlineEdit value={skill} onSave={(val) => { const newSkills = [...data.skills.technical]; newSkills[index] = val; onDataChange?.({ ...data, skills: { ...data.skills, technical: newSkills } }); }} isAdvancedMode={isAdvancedMode} as="span" />
                  </li>
                ))}
              </ul>
            </div>
          )}

          {isAssignedToPage('languages', 0, pageIndex) && data.skills?.languages?.length > 0 && (
            <div data-cv-node="languages" className="mb-8 relative cv-section group">
              {renderOverflowWarning('languages', pageIndex)}
              <h3 className="text-sm font-bold mb-4 uppercase tracking-widest text-white">
                <InlineEdit value={getSectionTitle('languages', 'LANGUAGES')} onSave={(val) => updateSectionTitle('languages', val)} isAdvancedMode={isAdvancedMode} />
              </h3>
              <ul className="space-y-2 text-xs opacity-90 list-disc list-inside">
                {data.skills?.languages?.map((lang: string, index: number) => (
                  <li key={index} className="marker:text-[#60A5FA]">
                    <InlineEdit value={lang} onSave={(val) => { const newLangs = [...data.skills.languages]; newLangs[index] = val; onDataChange?.({ ...data, skills: { ...data.skills, languages: newLangs } }); }} isAdvancedMode={isAdvancedMode} as="span" />
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {renderCustomSections(true, pageIndex)}
        </div>

        {/* Right Content */}
        <div className="w-[70%] px-10 py-12 flex flex-col bg-white">
          {isAssignedToPage('about', 0, pageIndex) && data.about && (
            <div data-cv-node="about" className="mb-10 relative cv-section group">
              {renderOverflowWarning('about', pageIndex)}
              <h3 className="text-lg font-bold mb-3 uppercase tracking-wider border-b-2 pb-2" style={{ borderColor: colors.primary, color: colors.primary }}>
                <InlineEdit value={getSectionTitle('about', 'PROFILE')} onSave={(val) => updateSectionTitle('about', val)} isAdvancedMode={isAdvancedMode} />
              </h3>
              <div className="text-sm text-gray-700 leading-relaxed text-justify">
                <InlineEdit value={data.about} onSave={(val) => onDataChange?.({ ...data, about: val })} isAdvancedMode={isAdvancedMode} multiline as="p" />
              </div>
            </div>
          )}

          {isAssignedToPage('experience-container', 0, pageIndex) && data.experience?.length > 0 && (
            <div data-cv-node="experience-container" className="mb-10 relative cv-section group">
              {renderOverflowWarning('experience-container', pageIndex)}
              <h3 className="text-lg font-bold mb-6 uppercase tracking-wider border-b-2 pb-2" style={{ borderColor: colors.primary, color: colors.primary }}>
                <InlineEdit value={getSectionTitle('experience', 'WORK EXPERIENCE')} onSave={(val) => updateSectionTitle('experience', val)} isAdvancedMode={isAdvancedMode} />
              </h3>
              
              <div className="space-y-6">
                 {data.experience?.filter((e: any) => isAssignedToPage(e.id || e.company, 0, pageIndex)).map((exp: any, index: number) => (
                    <div key={exp.id || exp.company} data-cv-node={exp.id || exp.company} className="relative group">
                       <h4 className="font-bold text-sm" style={{ color: colors.text }}>
                         <InlineEdit value={exp.position} onSave={(val) => { const newExp = [...data.experience]; newExp[index] = { ...newExp[index], position: val }; onDataChange?.({ ...data, experience: newExp }); }} isAdvancedMode={isAdvancedMode} as="span" />
                       </h4>
                       <div className="flex justify-between items-center mb-2">
                         <p className="text-xs text-gray-600 font-medium italic">
                           <InlineEdit value={exp.company} onSave={(val) => { const newExp = [...data.experience]; newExp[index] = { ...newExp[index], company: val }; onDataChange?.({ ...data, experience: newExp }); }} isAdvancedMode={isAdvancedMode} as="span" />
                         </p>
                         <p className="text-xs text-gray-500 font-semibold">
                            <InlineEdit value={exp.startDate} onSave={(val) => { const newExp = [...data.experience]; newExp[index] = { ...newExp[index], startDate: val }; onDataChange?.({ ...data, experience: newExp }); }} isAdvancedMode={isAdvancedMode} as="span" />
                            <span> - </span>
                            <InlineEdit value={exp.current ? 'Present' : exp.endDate} onSave={(val) => { const newExp = [...data.experience]; newExp[index] = { ...newExp[index], endDate: val, current: false }; onDataChange?.({ ...data, experience: newExp }); }} isAdvancedMode={isAdvancedMode} as="span" />
                         </p>
                       </div>
                       <div className="text-xs text-gray-700 leading-relaxed whitespace-pre-wrap pl-4 border-l-2 border-gray-100 text-justify">
                         <InlineEdit value={exp.description} onSave={(val) => { const newExp = [...data.experience]; newExp[index] = { ...newExp[index], description: val }; onDataChange?.({ ...data, experience: newExp }); }} isAdvancedMode={isAdvancedMode} multiline as="p" />
                       </div>
                    </div>
                 ))}
              </div>
            </div>
          )}

          {isAssignedToPage('education-container', 0, pageIndex) && data.education?.length > 0 && (
            <div data-cv-node="education-container" className="mb-10 relative cv-section group">
              {renderOverflowWarning('education-container', pageIndex)}
              <h3 className="text-lg font-bold mb-6 uppercase tracking-wider border-b-2 pb-2" style={{ borderColor: colors.primary, color: colors.primary }}>
                <InlineEdit value={getSectionTitle('education', 'EDUCATION')} onSave={(val) => updateSectionTitle('education', val)} isAdvancedMode={isAdvancedMode} />
              </h3>
              
              <div className="space-y-5">
                {data.education?.filter((e: any) => isAssignedToPage(e.id || e.institution, 0, pageIndex)).map((edu: any, index: number) => (
                  <div key={edu.id || edu.institution} data-cv-node={edu.id || edu.institution} className="relative group">
                     <h4 className="font-bold text-sm" style={{ color: colors.text }}>
                       <InlineEdit value={edu.degree} onSave={(val) => { const newEdu = [...data.education]; newEdu[index] = { ...newEdu[index], degree: val }; onDataChange?.({ ...data, education: newEdu }); }} isAdvancedMode={isAdvancedMode} />
                     </h4>
                     <p className="text-xs text-gray-500 font-semibold mb-1">
                       <InlineEdit value={edu.startYear} onSave={(val) => { const newEdu = [...data.education]; newEdu[index] = { ...newEdu[index], startYear: val }; onDataChange?.({ ...data, education: newEdu }); }} isAdvancedMode={isAdvancedMode} as="span" />
                       <span> - </span>
                       <InlineEdit value={edu.endYear} onSave={(val) => { const newEdu = [...data.education]; newEdu[index] = { ...newEdu[index], endYear: val }; onDataChange?.({ ...data, education: newEdu }); }} isAdvancedMode={isAdvancedMode} as="span" />
                     </p>
                     <p className="text-xs text-gray-600 font-medium italic">
                       <InlineEdit value={edu.institution} onSave={(val) => { const newEdu = [...data.education]; newEdu[index] = { ...newEdu[index], institution: val }; onDataChange?.({ ...data, education: newEdu }); }} isAdvancedMode={isAdvancedMode} />
                     </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Função principal de renderização baseada no template
  const renderTemplate = (pageIndex: number) => {
    switch (template.id) {
      case 'cv-classico-elegante':
        return renderProfissionalClassico(pageIndex);
      case 'cv-sidebar-professional':
        return renderBarraLateralEsquerda(pageIndex);
      case 'cv-sidebar-dark':
        return renderSidebarEscura(pageIndex);
      case 'cv-minimalist-clean':
        return renderLayoutSimplesDestaques(pageIndex);
      case 'cv-creative-modern':
        return renderCriativoProfissional(pageIndex);
      case 'cv-yellow-dark':
        return renderCreativeYellowDark(pageIndex);
      case 'cv-modern-sidebar':
        return renderModernSlateSidebar(pageIndex);
      default:
        return renderProfissionalClassico(pageIndex);
    }
  };

  // Internal scale ONLY when NOT in advanced mode (CreateCV.tsx handles scaling in editor)
  useEffect(() => {
    if (isAdvancedMode) {
      setScaleFactor(1);
      return;
    }

    const calculateScale = () => {
      if (!containerRef.current) return;
      const parentWidth = containerRef.current.parentElement?.clientWidth || window.innerWidth;
      const a4WidthPx = 794;
      if (parentWidth < a4WidthPx + 40) {
        setScaleFactor(parentWidth / (a4WidthPx + 40));
      } else {
        setScaleFactor(1);
      }
    };

    calculateScale();
    window.addEventListener('resize', calculateScale);
    return () => window.removeEventListener('resize', calculateScale);
  }, [isAdvancedMode]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "bg-transparent w-full relative flex justify-center items-start overflow-visible print:p-0 print:m-0",
        isAdvancedMode ? "py-0" : "py-10"
      )}
    >
      {/* Contentor de Escala Proporcional */}
      <div
        className="relative origin-top flex flex-col print:shadow-none print:scale-100"
        style={{
          width: '794px',
          transform: `scale(${scaleFactor})`,
          marginBottom: `calc((1123px * ${scaleFactor} * ${pageCount}) - (1123px * ${pageCount}))`,
        }}
      >
        {Array.from({ length: pageCount }).map((_, pageIndex) => (
          <div key={pageIndex} className="relative mb-14 print:mb-0">
            {/* PAGE BREAK GUTTER BETWEEN PAGES in editor */}
            {pageIndex > 0 && (
              <div className="absolute top-[-56px] left-0 right-0 h-[56px] bg-[#64748b] z-[100] flex items-center justify-center print:hidden shadow-[inset_0_3px_8px_rgba(0,0,0,0.2),_inset_0_-3px_8px_rgba(0,0,0,0.2)]">
                <div className="px-6 py-1.5 bg-white rounded-full border border-slate-300 shadow-lg flex items-center gap-3">
                  <span className="w-10 h-px bg-slate-300 block" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 select-none">
                    Página {pageIndex + 1}
                  </span>
                  <span className="w-10 h-px bg-slate-300 block" />
                </div>
              </div>
            )}
            
            <div 
              className="cv-page-container relative bg-white shadow-2xl print:shadow-none"
              style={{
                width: '794px',
                height: '1123px', // Exactly A4
                overflow: 'hidden'
              }}
            >
              <div className="relative z-[10] w-full min-h-full">
                {renderTemplate(pageIndex)}
              </div>
              
              {/* Add Page Button inside the last page, below content if in advanced mode */}
              {pageIndex === pageCount - 1 && isAdvancedMode && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[90]">
                  <button
                    onClick={() => {
                      onDataChange?.({
                        ...data,
                        layoutConfig: { 
                          ...data.layoutConfig, 
                          pageCount: pageCount + 1 
                        }
                      });
                    }}
                    className="bg-white hover:bg-slate-50 text-slate-700 px-6 py-2 rounded-full font-bold text-xs shadow-[0_4px_12px_rgba(0,0,0,0.1)] border border-slate-200 transition-all hover:shadow-md flex items-center gap-2"
                  >
                    <span className="text-blue-600">+</span> Adicionar Nova Página
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
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
