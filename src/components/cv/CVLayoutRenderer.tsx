import React from 'react';
import { Card } from '@/components/ui/card';
import { Mail, Phone, MapPin, Globe, Calendar, Award, Briefcase } from 'lucide-react';

interface CVLayoutRendererProps {
  data: any;
  template: any;
  className?: string;
}

const CVLayoutRenderer = ({ data, template, className = "" }: CVLayoutRendererProps) => {
  const colors = data.colorPalette || template.colorPalette;
  const fonts = template.fonts || { primary: 'Arial', headings: 'Arial' };

  // Template 1: Sidebar Profissional
  const renderSidebarLayout = () => (
    <div className={`flex min-h-[297mm] ${className}`} style={{ fontFamily: fonts.primary }}>
      <div 
        className="w-1/3 p-6 text-white"
        style={{ backgroundColor: colors.primary }}
      >
        {/* Photo */}
        <div className="flex justify-center mb-6">
          <div className="w-32 h-32 rounded-full bg-white bg-opacity-20 border-4 border-white flex items-center justify-center">
            <span className="text-4xl text-white">👤</span>
          </div>
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: fonts.headings }}>
            {data.personalData?.fullName || 'SEU NOME'}
          </h1>
          <p className="text-lg opacity-90">
            {data.personalData?.profession || 'Sua Profissão'}
          </p>
        </div>

        {/* Contact */}
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-4 border-b-2 pb-2" style={{ borderColor: colors.accent, fontFamily: fonts.headings }}>
            CONTACTO
          </h3>
          <div className="space-y-3">
            {data.personalData?.phone && (
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-3" />
                <span className="text-sm">{data.personalData.phone}</span>
              </div>
            )}
            {data.personalData?.email && (
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-3" />
                <span className="text-sm break-all">{data.personalData.email}</span>
              </div>
            )}
            {data.personalData?.address && (
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-3" />
                <span className="text-sm">{data.personalData.address}</span>
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        {data.skills?.technical?.length > 0 && (
          <div>
            <h3 className="text-lg font-bold mb-4 border-b-2 pb-2" style={{ borderColor: colors.accent, fontFamily: fonts.headings }}>
              COMPETÊNCIAS
            </h3>
            <div className="space-y-3">
              {data.skills.technical.map((skill: string, index: number) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">{skill}</span>
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
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 p-8" style={{ backgroundColor: colors.background }}>
        {/* About */}
        {data.about && (
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-4" style={{ color: colors.primary, fontFamily: fonts.headings }}>
              PERFIL PROFISSIONAL
            </h3>
            <p className="text-gray-700 leading-relaxed">{data.about}</p>
          </div>
        )}

        {/* Experience */}
        {data.experience?.length > 0 && (
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-6" style={{ color: colors.primary, fontFamily: fonts.headings }}>
              EXPERIÊNCIA PROFISSIONAL
            </h3>
            <div className="space-y-6">
              {data.experience.map((exp: any, index: number) => (
                <div key={index} className="border-l-4 pl-4" style={{ borderColor: colors.accent }}>
                  <h4 className="text-xl font-bold" style={{ color: colors.text }}>{exp.position}</h4>
                  <p className="font-medium text-gray-600 mb-2">{exp.company}</p>
                  <div className="flex items-center text-gray-500 text-sm mb-3">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{exp.startDate} - {exp.current ? 'Presente' : exp.endDate}</span>
                  </div>
                  {exp.description && (
                    <p className="text-gray-700">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {data.education?.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold mb-6" style={{ color: colors.primary, fontFamily: fonts.headings }}>
              FORMAÇÃO ACADÉMICA
            </h3>
            <div className="space-y-4">
              {data.education.map((edu: any, index: number) => (
                <div key={index} className="border-l-4 pl-4" style={{ borderColor: colors.accent }}>
                  <h4 className="font-bold text-lg" style={{ color: colors.text }}>{edu.degree}</h4>
                  <p className="text-gray-600">{edu.institution}</p>
                  <p className="text-gray-500 text-sm">{edu.startYear} - {edu.endYear}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Template 2: Timeline Minimalista
  const renderTimelineLayout = () => (
    <div className={`max-w-4xl mx-auto ${className}`} style={{ fontFamily: fonts.primary, backgroundColor: colors.background }}>
      {/* Header com foto */}
      <div className="text-center py-12" style={{ backgroundColor: colors.primary }}>
        <div className="w-40 h-40 rounded-full bg-white bg-opacity-10 border-8 border-white mx-auto mb-6 flex items-center justify-center">
          <span className="text-5xl text-white">👤</span>
        </div>
        <h1 className="text-4xl font-bold text-white mb-3" style={{ fontFamily: fonts.headings }}>
          {data.personalData?.fullName || 'SEU NOME'}
        </h1>
        <p className="text-2xl text-white opacity-90">
          {data.personalData?.profession || 'Sua Profissão'}
        </p>
      </div>

      <div className="p-12">
        {/* Contact Strip */}
        <div className="flex justify-center space-x-12 mb-12 py-6 border-y-2" style={{ borderColor: colors.accent }}>
          {data.personalData?.phone && (
            <div className="flex items-center">
              <Phone className="w-5 h-5 mr-3" style={{ color: colors.primary }} />
              <span>{data.personalData.phone}</span>
            </div>
          )}
          {data.personalData?.email && (
            <div className="flex items-center">
              <Mail className="w-5 h-5 mr-3" style={{ color: colors.primary }} />
              <span>{data.personalData.email}</span>
            </div>
          )}
          {data.personalData?.address && (
            <div className="flex items-center">
              <MapPin className="w-5 h-5 mr-3" style={{ color: colors.primary }} />
              <span>{data.personalData.address}</span>
            </div>
          )}
        </div>

        {/* About */}
        {data.about && (
          <div className="mb-12">
            <h3 className="text-3xl font-bold mb-6 text-center" style={{ color: colors.primary, fontFamily: fonts.headings }}>
              PERFIL PROFISSIONAL
            </h3>
            <p className="text-lg text-center leading-relaxed max-w-3xl mx-auto" style={{ color: colors.text }}>
              {data.about}
            </p>
          </div>
        )}

        {/* Timeline Experience */}
        {data.experience?.length > 0 && (
          <div className="mb-12">
            <h3 className="text-3xl font-bold mb-8 text-center" style={{ color: colors.primary, fontFamily: fonts.headings }}>
              LINHA DO TEMPO PROFISSIONAL
            </h3>
            <div className="relative max-w-4xl mx-auto">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1" style={{ backgroundColor: colors.accent }}></div>
              {data.experience.map((exp: any, index: number) => (
                <div key={index} className={`relative mb-12 ${index % 2 === 0 ? 'text-right pr-1/2' : 'text-left pl-1/2'}`}>
                  <div 
                    className="absolute top-6 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-4 border-white"
                    style={{ backgroundColor: colors.primary }}
                  ></div>
                  <div className={`inline-block max-w-md p-6 rounded-lg shadow-lg ${index % 2 === 0 ? 'mr-8' : 'ml-8'}`} style={{ backgroundColor: 'white' }}>
                    <h4 className="text-xl font-bold mb-2" style={{ color: colors.primary, fontFamily: fonts.headings }}>
                      {exp.position}
                    </h4>
                    <p className="font-medium mb-2" style={{ color: colors.secondary }}>{exp.company}</p>
                    <div className="flex items-center mb-3 text-sm" style={{ color: colors.text }}>
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{exp.startDate} - {exp.current ? 'Presente' : exp.endDate}</span>
                    </div>
                    {exp.description && (
                      <p className="text-sm" style={{ color: colors.text }}>{exp.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Template 3: Executivo Clean - FORMATO ÚNICO CLEAN
  const renderExecutiveLayout = () => (
    <div className={`max-w-4xl mx-auto p-8 ${className}`} style={{ fontFamily: fonts.primary, backgroundColor: colors.background }}>
      {/* Header Executivo Elegante */}
      <div className="border-b-2 pb-6 mb-8" style={{ borderColor: colors.primary }}>
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2 tracking-wide" style={{ color: colors.primary, fontFamily: fonts.headings }}>
            {data.personalData?.fullName || 'SEU NOME'}
          </h1>
          <div className="w-20 h-1 mx-auto mb-4" style={{ backgroundColor: colors.accent }}></div>
          <h2 className="text-xl text-gray-600 mb-6">
            {data.personalData?.profession || 'Sua Profissão'}
          </h2>
        </div>
        
        {/* Contact em linha horizontal clean */}
        <div className="grid grid-cols-3 gap-4 text-center text-sm">
          {data.personalData?.email && (
            <div className="flex flex-col items-center">
              <Mail className="w-5 h-5 mb-1" style={{ color: colors.primary }} />
              <span className="text-gray-700">{data.personalData.email}</span>
            </div>
          )}
          {data.personalData?.phone && (
            <div className="flex flex-col items-center">
              <Phone className="w-5 h-5 mb-1" style={{ color: colors.primary }} />
              <span className="text-gray-700">{data.personalData.phone}</span>
            </div>
          )}
          {data.personalData?.address && (
            <div className="flex flex-col items-center">
              <MapPin className="w-5 h-5 mb-1" style={{ color: colors.primary }} />
              <span className="text-gray-700">{data.personalData.address}</span>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-10">
        {/* Resumo Executivo */}
        {data.about && (
          <div>
            <h3 className="text-xl font-bold mb-4 uppercase tracking-wider text-center" style={{ color: colors.primary, fontFamily: fonts.headings }}>
              Resumo Executivo
            </h3>
            <div className="w-16 h-0.5 mx-auto mb-6" style={{ backgroundColor: colors.accent }}></div>
            <p className="text-lg leading-relaxed text-center max-w-3xl mx-auto text-gray-700">{data.about}</p>
          </div>
        )}

        {/* Experiência com formatação clean */}
        {data.experience?.length > 0 && (
          <div>
            <h3 className="text-xl font-bold mb-6 uppercase tracking-wider text-center" style={{ color: colors.primary, fontFamily: fonts.headings }}>
              Experiência Profissional
            </h3>
            <div className="w-16 h-0.5 mx-auto mb-8" style={{ backgroundColor: colors.accent }}></div>
            <div className="space-y-8">
              {data.experience.map((exp: any, index: number) => (
                <div key={index} className="text-center">
                  <h4 className="text-lg font-bold mb-1" style={{ color: colors.text }}>{exp.position}</h4>
                  <p className="text-md font-medium mb-2" style={{ color: colors.secondary }}>{exp.company}</p>
                  <p className="text-sm mb-4 text-gray-500">
                    {exp.startDate} - {exp.current ? 'Presente' : exp.endDate}
                  </p>
                  {exp.description && (
                    <p className="leading-relaxed text-gray-700 max-w-2xl mx-auto">{exp.description}</p>
                  )}
                  {index < data.experience.length - 1 && (
                    <div className="w-8 h-0.5 mx-auto mt-6" style={{ backgroundColor: colors.accent }}></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Formação Clean */}
        {data.education?.length > 0 && (
          <div>
            <h3 className="text-xl font-bold mb-6 uppercase tracking-wider text-center" style={{ color: colors.primary, fontFamily: fonts.headings }}>
              Formação Académica
            </h3>
            <div className="w-16 h-0.5 mx-auto mb-8" style={{ backgroundColor: colors.accent }}></div>
            <div className="grid grid-cols-1 gap-6">
              {data.education.map((edu: any, index: number) => (
                <div key={index} className="text-center">
                  <h4 className="text-lg font-bold" style={{ color: colors.text }}>{edu.degree}</h4>
                  <p className="text-gray-600">{edu.institution}</p>
                  <p className="text-sm text-gray-500">{edu.startYear} - {edu.endYear}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Template 4: Criativo Designer - FORMATO CRIATIVO E COLORIDO
  const renderCreativeLayout = () => (
    <div className={`min-h-[297mm] ${className}`} style={{ fontFamily: fonts.primary, backgroundColor: colors.background }}>
      {/* Header Criativo com formas geométricas */}
      <div 
        className="relative p-8 text-white overflow-hidden"
        style={{ backgroundColor: colors.primary }}
      >
        {/* Elementos decorativos */}
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20" style={{ backgroundColor: colors.accent }}></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 transform rotate-45 opacity-30" style={{ backgroundColor: colors.secondary }}></div>
        
        <div className="relative z-10 flex items-center">
          <div className="flex-1">
            <h1 className="text-5xl font-bold mb-3" style={{ fontFamily: fonts.headings }}>
              {data.personalData?.fullName || 'SEU NOME'}
            </h1>
            <p className="text-2xl opacity-90 mb-6">
              {data.personalData?.profession || 'Sua Profissão'}
            </p>
            
            {/* Contact em estilo criativo */}
            <div className="flex flex-wrap gap-6">
              {data.personalData?.email && (
                <div className="flex items-center bg-white bg-opacity-20 px-4 py-2 rounded-full">
                  <Mail className="w-4 h-4 mr-2" />
                  <span className="text-sm">{data.personalData.email}</span>
                </div>
              )}
              {data.personalData?.phone && (
                <div className="flex items-center bg-white bg-opacity-20 px-4 py-2 rounded-full">
                  <Phone className="w-4 h-4 mr-2" />
                  <span className="text-sm">{data.personalData.phone}</span>
                </div>
              )}
              {data.personalData?.website && (
                <div className="flex items-center bg-white bg-opacity-20 px-4 py-2 rounded-full">
                  <Globe className="w-4 h-4 mr-2" />
                  <span className="text-sm">{data.personalData.website}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="w-48 h-48 rounded-3xl bg-white bg-opacity-10 border-4 border-white flex items-center justify-center ml-8">
            <span className="text-6xl text-white">🎨</span>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* About Section Criativa */}
        {data.about && (
          <div className="mb-10 text-center">
            <h3 className="text-3xl font-bold mb-6" style={{ color: colors.secondary, fontFamily: fonts.headings }}>
              Sobre Mim
            </h3>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full" style={{ backgroundColor: colors.accent, top: '-10px' }}></div>
              <p className="text-lg leading-relaxed max-w-3xl mx-auto p-6 rounded-2xl shadow-lg bg-white" style={{ color: colors.text }}>
                {data.about}
              </p>
            </div>
          </div>
        )}

        {/* Skills Section Criativa com Cards coloridos */}
        {data.skills?.technical?.length > 0 && (
          <div className="mb-10">
            <h3 className="text-3xl font-bold mb-8 text-center" style={{ color: colors.secondary, fontFamily: fonts.headings }}>
              Minhas Habilidades
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {data.skills.technical.map((skill: string, index: number) => (
                <div 
                  key={index} 
                  className="p-4 rounded-2xl text-center text-white font-bold transform hover:scale-105 transition-transform shadow-lg"
                  style={{ 
                    backgroundColor: index % 2 === 0 ? colors.accent : colors.secondary,
                  }}
                >
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience com cards visuais */}
        {data.experience?.length > 0 && (
          <div>
            <h3 className="text-3xl font-bold mb-8 text-center" style={{ color: colors.secondary, fontFamily: fonts.headings }}>
              Jornada Profissional
            </h3>
            <div className="space-y-6">
              {data.experience.map((exp: any, index: number) => (
                <div key={index} className="relative">
                  <div 
                    className="bg-white p-8 rounded-3xl shadow-xl border-l-8"
                    style={{ borderColor: colors.primary }}
                  >
                    <div className="flex items-start">
                      <div 
                        className="w-16 h-16 rounded-full flex items-center justify-center mr-6 flex-shrink-0"
                        style={{ backgroundColor: colors.accent }}
                      >
                        <Briefcase className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-2xl font-bold mb-2" style={{ color: colors.primary }}>{exp.position}</h4>
                        <p className="text-lg font-medium mb-2" style={{ color: colors.secondary }}>{exp.company}</p>
                        <p className="text-sm mb-4 text-gray-500">
                          {exp.startDate} - {exp.current ? 'Presente' : exp.endDate}
                        </p>
                        {exp.description && (
                          <p className="leading-relaxed" style={{ color: colors.text }}>{exp.description}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Template 5: Grid Moderno
  const renderModernGridLayout = () => (
    <div className={`max-w-6xl mx-auto ${className}`} style={{ fontFamily: fonts.primary, backgroundColor: colors.background }}>
      {/* Modern Header */}
      <div className="grid grid-cols-3 gap-8 p-8 mb-8" style={{ backgroundColor: colors.primary }}>
        <div className="col-span-2">
          <h1 className="text-4xl font-bold text-white mb-3" style={{ fontFamily: fonts.headings }}>
            {data.personalData?.fullName || 'SEU NOME'}
          </h1>
          <p className="text-2xl text-white opacity-90 mb-6">
            {data.personalData?.profession || 'Sua Profissão'}
          </p>
          {data.about && (
            <p className="text-white leading-relaxed">{data.about}</p>
          )}
        </div>
        <div className="flex justify-center items-center">
          <div className="w-32 h-32 rounded-lg bg-white bg-opacity-20 border-4 border-white flex items-center justify-center">
            <span className="text-4xl text-white">👤</span>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Contact Cards */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {data.personalData?.email && (
            <div className="bg-white p-4 rounded-lg shadow-md text-center">
              <Mail className="w-8 h-8 mx-auto mb-2" style={{ color: colors.primary }} />
              <p className="text-sm" style={{ color: colors.text }}>{data.personalData.email}</p>
            </div>
          )}
          {data.personalData?.phone && (
            <div className="bg-white p-4 rounded-lg shadow-md text-center">
              <Phone className="w-8 h-8 mx-auto mb-2" style={{ color: colors.primary }} />
              <p className="text-sm" style={{ color: colors.text }}>{data.personalData.phone}</p>
            </div>
          )}
          {data.personalData?.address && (
            <div className="bg-white p-4 rounded-lg shadow-md text-center">
              <MapPin className="w-8 h-8 mx-auto mb-2" style={{ color: colors.primary }} />
              <p className="text-sm" style={{ color: colors.text }}>{data.personalData.address}</p>
            </div>
          )}
        </div>

        {/* Skills Cards */}
        {data.skills?.technical?.length > 0 && (
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-6" style={{ color: colors.primary, fontFamily: fonts.headings }}>
              Competências Técnicas
            </h3>
            <div className="grid grid-cols-4 gap-4">
              {data.skills.technical.map((skill: string, index: number) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-md text-center">
                  <Award className="w-6 h-6 mx-auto mb-2" style={{ color: colors.accent }} />
                  <p className="text-sm font-medium" style={{ color: colors.text }}>{skill}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience Cards */}
        {data.experience?.length > 0 && (
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-6" style={{ color: colors.primary, fontFamily: fonts.headings }}>
              Experiência Profissional
            </h3>
            <div className="grid grid-cols-2 gap-6">
              {data.experience.map((exp: any, index: number) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-center mb-4">
                    <Briefcase className="w-6 h-6 mr-3" style={{ color: colors.primary }} />
                    <h4 className="text-lg font-bold" style={{ color: colors.text }}>{exp.position}</h4>
                  </div>
                  <p className="font-medium mb-2" style={{ color: colors.secondary }}>{exp.company}</p>
                  <p className="text-sm mb-3" style={{ color: colors.text }}>
                    {exp.startDate} - {exp.current ? 'Presente' : exp.endDate}
                  </p>
                  {exp.description && (
                    <p className="text-sm" style={{ color: colors.text }}>{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Switch entre layouts baseado no template
  switch (template.layoutConfig?.type || template.layout) {
    case "duas_colunas":
    case "sidebar_esquerda":
      return renderSidebarLayout();
    case "uma_coluna":
    case "uma_coluna_timeline":
      return renderTimelineLayout();
    case "executivo":
    case "executivo_clean":
      return renderExecutiveLayout();
    case "criativo_horizontal":
      return renderCreativeLayout();
    case "grid_moderno":
    case "moderno_grid":
      return renderModernGridLayout();
    default:
      return renderSidebarLayout();
  }
};

export default CVLayoutRenderer;
