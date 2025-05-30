
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

  // Template 3: Executivo Clean
  const renderExecutiveLayout = () => (
    <div className={`max-w-4xl mx-auto ${className}`} style={{ fontFamily: fonts.primary, backgroundColor: colors.background }}>
      {/* Header Executivo */}
      <div className="border-b-4 pb-8 mb-8" style={{ borderColor: colors.primary }}>
        <h1 className="text-5xl font-bold mb-3" style={{ color: colors.primary, fontFamily: fonts.headings }}>
          {data.personalData?.fullName || 'SEU NOME'}
        </h1>
        <h2 className="text-2xl mb-6" style={{ color: colors.secondary }}>
          {data.personalData?.profession || 'Sua Profissão'}
        </h2>
        
        <div className="flex justify-between items-center">
          <div className="flex space-x-8">
            {data.personalData?.email && (
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-2" style={{ color: colors.primary }} />
                <span>{data.personalData.email}</span>
              </div>
            )}
            {data.personalData?.phone && (
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-2" style={{ color: colors.primary }} />
                <span>{data.personalData.phone}</span>
              </div>
            )}
          </div>
          {data.personalData?.address && (
            <div className="flex items-center">
              <MapPin className="w-5 h-5 mr-2" style={{ color: colors.primary }} />
              <span>{data.personalData.address}</span>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-12">
        {/* Resumo Executivo */}
        {data.about && (
          <div>
            <h3 className="text-2xl font-bold mb-4 uppercase tracking-wide" style={{ color: colors.primary, fontFamily: fonts.headings }}>
              Resumo Executivo
            </h3>
            <p className="text-lg leading-relaxed" style={{ color: colors.text }}>{data.about}</p>
          </div>
        )}

        {/* Experiência */}
        {data.experience?.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold mb-6 uppercase tracking-wide" style={{ color: colors.primary, fontFamily: fonts.headings }}>
              Experiência Profissional
            </h3>
            <div className="space-y-8">
              {data.experience.map((exp: any, index: number) => (
                <div key={index}>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="text-xl font-bold" style={{ color: colors.text }}>{exp.position}</h4>
                      <p className="text-lg font-medium" style={{ color: colors.secondary }}>{exp.company}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium" style={{ color: colors.primary }}>
                        {exp.startDate} - {exp.current ? 'Presente' : exp.endDate}
                      </p>
                    </div>
                  </div>
                  {exp.description && (
                    <p className="leading-relaxed" style={{ color: colors.text }}>{exp.description}</p>
                  )}
                  <hr className="mt-6" style={{ borderColor: colors.accent }} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Formação */}
        {data.education?.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold mb-6 uppercase tracking-wide" style={{ color: colors.primary, fontFamily: fonts.headings }}>
              Formação Académica
            </h3>
            <div className="space-y-4">
              {data.education.map((edu: any, index: number) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <h4 className="text-lg font-bold" style={{ color: colors.text }}>{edu.degree}</h4>
                    <p style={{ color: colors.secondary }}>{edu.institution}</p>
                  </div>
                  <p className="font-medium" style={{ color: colors.primary }}>
                    {edu.startYear} - {edu.endYear}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Template 4: Criativo Horizontal
  const renderCreativeLayout = () => (
    <div className={`flex min-h-[297mm] ${className}`} style={{ fontFamily: fonts.primary, backgroundColor: colors.background }}>
      {/* Left Side - Large Photo and Contact */}
      <div className="w-2/5 p-8 flex flex-col" style={{ backgroundColor: colors.primary }}>
        <div className="text-center mb-8">
          <div className="w-48 h-48 rounded-lg bg-white bg-opacity-20 border-8 border-white mx-auto mb-6 flex items-center justify-center">
            <span className="text-6xl text-white">👤</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: fonts.headings }}>
            {data.personalData?.fullName || 'SEU NOME'}
          </h1>
          <p className="text-xl text-white opacity-90">
            {data.personalData?.profession || 'Sua Profissão'}
          </p>
        </div>

        <div className="text-white space-y-4 mt-auto">
          {data.personalData?.phone && (
            <div className="flex items-center">
              <Phone className="w-5 h-5 mr-3" />
              <span>{data.personalData.phone}</span>
            </div>
          )}
          {data.personalData?.email && (
            <div className="flex items-center">
              <Mail className="w-5 h-5 mr-3" />
              <span className="break-all">{data.personalData.email}</span>
            </div>
          )}
          {data.personalData?.website && (
            <div className="flex items-center">
              <Globe className="w-5 h-5 mr-3" />
              <span>{data.personalData.website}</span>
            </div>
          )}
        </div>
      </div>

      {/* Right Side - Content */}
      <div className="flex-1 p-8">
        {/* About Section */}
        {data.about && (
          <div className="mb-10">
            <h3 className="text-3xl font-bold mb-6" style={{ color: colors.secondary, fontFamily: fonts.headings }}>
              Sobre Mim
            </h3>
            <p className="text-lg leading-relaxed" style={{ color: colors.text }}>{data.about}</p>
          </div>
        )}

        {/* Skills Section with Creative Layout */}
        {data.skills?.technical?.length > 0 && (
          <div className="mb-10">
            <h3 className="text-3xl font-bold mb-6" style={{ color: colors.secondary, fontFamily: fonts.headings }}>
              Competências
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {data.skills.technical.map((skill: string, index: number) => (
                <div key={index} className="p-4 rounded-lg text-center" style={{ backgroundColor: colors.accent, color: 'white' }}>
                  <span className="font-medium">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {data.experience?.length > 0 && (
          <div>
            <h3 className="text-3xl font-bold mb-6" style={{ color: colors.secondary, fontFamily: fonts.headings }}>
              Experiência
            </h3>
            <div className="space-y-6">
              {data.experience.map((exp: any, index: number) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <h4 className="text-xl font-bold mb-2" style={{ color: colors.primary }}>{exp.position}</h4>
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
