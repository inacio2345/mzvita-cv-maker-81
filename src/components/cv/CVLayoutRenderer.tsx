
import React from 'react';
import { Card } from '@/components/ui/card';
import { Mail, Phone, MapPin, Globe, Calendar } from 'lucide-react';

interface CVLayoutRendererProps {
  data: any;
  template: any;
  className?: string;
}

const CVLayoutRenderer = ({ data, template, className = "" }: CVLayoutRendererProps) => {
  const colors = data.colorPalette || template.colorPalette;

  const renderSidebarLayout = () => (
    <div className={`flex min-h-[297mm] ${className}`}>
      {/* Left Sidebar */}
      <div 
        className="w-1/3 p-6 text-white"
        style={{ backgroundColor: colors.primary }}
      >
        {/* Profile Section */}
        {template.foto_posicao !== "sem_foto" && template.foto_posicao !== "nenhuma" && (
          <div className="flex justify-center mb-6">
            <div className="w-28 h-28 rounded-full bg-white bg-opacity-20 border-4 border-white flex items-center justify-center">
              <span className="text-3xl text-white">👤</span>
            </div>
          </div>
        )}
        
        <div className="mb-6">
          <h1 className="text-xl font-bold mb-2 text-center">
            {data.personalData?.fullName || 'SEU NOME'}
          </h1>
          <p className="text-center mb-4 opacity-90">
            {data.personalData?.profession || 'Sua Profissão'}
          </p>
        </div>

        {/* Contact Info */}
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-3 border-b-2 pb-2" style={{ borderColor: colors.accent }}>
            CONTATO
          </h3>
          <div className="space-y-2 text-sm">
            {data.personalData?.phone && (
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <span>{data.personalData.phone}</span>
              </div>
            )}
            {data.personalData?.email && (
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                <span className="break-all">{data.personalData.email}</span>
              </div>
            )}
            {data.personalData?.website && (
              <div className="flex items-center">
                <Globe className="w-4 h-4 mr-2" />
                <span>{data.personalData.website}</span>
              </div>
            )}
            {data.personalData?.address && (
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                <span>{data.personalData.address}</span>
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        {data.skills?.technical?.length > 0 && (
          <div>
            <h3 className="text-lg font-bold mb-3 border-b-2 pb-2" style={{ borderColor: colors.accent }}>
              COMPETÊNCIAS
            </h3>
            <div className="space-y-2">
              {data.skills.technical.map((skill: string, index: number) => (
                <div key={index} className="text-sm">
                  <div className="flex justify-between mb-1">
                    <span>{skill}</span>
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

      {/* Right Content */}
      <div className="flex-1 p-6 bg-white">
        {/* About */}
        {data.about && (
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-3 text-gray-800 border-b-2 pb-2" style={{ borderColor: colors.primary }}>
              PERFIL PROFISSIONAL
            </h3>
            <p className="text-gray-700 text-justify">{data.about}</p>
          </div>
        )}

        {/* Experience */}
        {data.experience?.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-3 text-gray-800 border-b-2 pb-2" style={{ borderColor: colors.primary }}>
              EXPERIÊNCIA PROFISSIONAL
            </h3>
            <div className="space-y-4">
              {data.experience.map((exp: any, index: number) => (
                <div key={index} className="border-l-4 pl-4" style={{ borderColor: colors.accent }}>
                  <h4 className="font-bold text-gray-900">{exp.position}</h4>
                  <p className="text-gray-600 mb-1">{exp.company}</p>
                  <div className="flex items-center text-gray-500 text-sm mb-2">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{exp.startDate} - {exp.current ? 'Presente' : exp.endDate}</span>
                  </div>
                  {exp.description && (
                    <p className="text-gray-700 text-sm">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {data.education?.length > 0 && (
          <div>
            <h3 className="text-xl font-bold mb-3 text-gray-800 border-b-2 pb-2" style={{ borderColor: colors.primary }}>
              FORMAÇÃO ACADÉMICA
            </h3>
            <div className="space-y-3">
              {data.education.map((edu: any, index: number) => (
                <div key={index} className="border-l-4 pl-4" style={{ borderColor: colors.accent }}>
                  <h4 className="font-bold text-gray-900">{edu.degree}</h4>
                  <p className="text-gray-600">{edu.institution}</p>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{edu.startYear} - {edu.endYear || 'Presente'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderOneColumnLayout = () => (
    <div className={`max-w-4xl mx-auto bg-white ${className}`}>
      {/* Header with photo */}
      {template.foto_posicao === "topo_central" && (
        <div className="text-center py-8" style={{ backgroundColor: colors.primary }}>
          <div className="w-32 h-32 rounded-full bg-white bg-opacity-20 border-4 border-white mx-auto mb-4 flex items-center justify-center">
            <span className="text-4xl text-white">👤</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            {data.personalData?.fullName || 'SEU NOME'}
          </h1>
          <p className="text-xl text-white opacity-90">
            {data.personalData?.profession || 'Sua Profissão'}
          </p>
        </div>
      )}

      <div className="p-8">
        {/* Contact Strip */}
        <div className="flex justify-center space-x-8 mb-8 py-4 border-y" style={{ borderColor: colors.accent }}>
          {data.personalData?.phone && (
            <div className="flex items-center text-gray-600">
              <Phone className="w-4 h-4 mr-2" />
              <span>{data.personalData.phone}</span>
            </div>
          )}
          {data.personalData?.email && (
            <div className="flex items-center text-gray-600">
              <Mail className="w-4 h-4 mr-2" />
              <span>{data.personalData.email}</span>
            </div>
          )}
          {data.personalData?.address && (
            <div className="flex items-center text-gray-600">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{data.personalData.address}</span>
            </div>
          )}
        </div>

        {/* About */}
        {data.about && (
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-4 text-gray-800" style={{ color: colors.primary }}>
              PERFIL PROFISSIONAL
            </h3>
            <p className="text-gray-700 text-justify leading-relaxed">{data.about}</p>
          </div>
        )}

        {/* Timeline Experience */}
        {data.experience?.length > 0 && (
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-6 text-gray-800" style={{ color: colors.primary }}>
              EXPERIÊNCIA PROFISSIONAL
            </h3>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5" style={{ backgroundColor: colors.accent }}></div>
              {data.experience.map((exp: any, index: number) => (
                <div key={index} className="relative ml-10 mb-8">
                  <div 
                    className="absolute -left-7 top-0 w-4 h-4 rounded-full border-4 border-white"
                    style={{ backgroundColor: colors.primary }}
                  ></div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-xl font-bold text-gray-900 mb-1">{exp.position}</h4>
                    <p className="font-medium text-gray-600 mb-2">{exp.company}</p>
                    <div className="flex items-center text-gray-500 text-sm mb-3">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{exp.startDate} - {exp.current ? 'Presente' : exp.endDate}</span>
                    </div>
                    {exp.description && (
                      <p className="text-gray-700">{exp.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education and Skills in two columns */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Education */}
          {data.education?.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800" style={{ color: colors.primary }}>
                FORMAÇÃO
              </h3>
              <div className="space-y-4">
                {data.education.map((edu: any, index: number) => (
                  <div key={index} className="border-l-4 pl-4" style={{ borderColor: colors.accent }}>
                    <h4 className="font-bold text-gray-900">{edu.degree}</h4>
                    <p className="text-gray-600">{edu.institution}</p>
                    <p className="text-gray-500 text-sm">{edu.startYear} - {edu.endYear}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {data.skills?.technical?.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800" style={{ color: colors.primary }}>
                COMPETÊNCIAS
              </h3>
              <div className="space-y-3">
                {data.skills.technical.map((skill: string, index: number) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700">{skill}</span>
                      <span className="text-gray-500 text-sm">85%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full"
                        style={{ backgroundColor: colors.primary, width: "85%" }}
                      />
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

  // Choose layout based on template
  switch (template.layout) {
    case "sidebar_esquerda":
    case "duas_colunas":
    case "duas_colunas_simples":
      return renderSidebarLayout();
    case "uma_coluna":
    case "simples_vertical":
      return renderOneColumnLayout();
    default:
      return renderSidebarLayout();
  }
};

export default CVLayoutRenderer;
