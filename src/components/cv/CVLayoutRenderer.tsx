
import React from 'react';
import { Card } from '@/components/ui/card';
import { Mail, Phone, MapPin, Globe, Calendar, Award, Briefcase, GraduationCap, User, Star } from 'lucide-react';

interface CVLayoutRendererProps {
  data: any;
  template: any;
  className?: string;
  userPhoto?: string;
}

const CVLayoutRenderer = ({ data, template, className = "", userPhoto }: CVLayoutRendererProps) => {
  const colors = data.colorPalette || template.colorPalette;
  const fonts = template.fonts || { primary: 'Inter', headings: 'Poppins' };

  // Função para renderizar foto do usuário
  const renderUserPhoto = (position: string, size: string = "w-32 h-32") => {
    if (!userPhoto && !data.personalData?.photo) return null;
    
    const photoUrl = userPhoto || data.personalData?.photo;
    const baseClasses = `${size} object-cover border-4 border-white shadow-lg`;
    
    switch (position) {
      case 'circular':
        return (
          <div className={`${baseClasses} rounded-full`}>
            <img src={photoUrl} alt="Foto de perfil" className="w-full h-full object-cover rounded-full" />
          </div>
        );
      case 'square':
        return (
          <div className={`${baseClasses} rounded-lg`}>
            <img src={photoUrl} alt="Foto de perfil" className="w-full h-full object-cover rounded-lg" />
          </div>
        );
      case 'hexagonal':
        return (
          <div className={`${baseClasses} rounded-lg transform rotate-6`}>
            <img src={photoUrl} alt="Foto de perfil" className="w-full h-full object-cover rounded-lg" />
          </div>
        );
      default:
        return (
          <div className={`${baseClasses} rounded-full`}>
            <img src={photoUrl} alt="Foto de perfil" className="w-full h-full object-cover rounded-full" />
          </div>
        );
    }
  };

  // Template 1: Executivo Premium (padrão)
  const renderExecutivePremium = () => (
    <div className={`flex min-h-[297mm] ${className}`} style={{ fontFamily: fonts.primary }}>
      <div 
        className="w-1/3 p-6 text-white relative overflow-hidden"
        style={{ backgroundColor: colors.primary }}
      >
        {/* Elementos decorativos */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-white bg-opacity-10 rounded-full -mr-10 -mt-10"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-white bg-opacity-5 rounded-full -ml-8 -mb-8"></div>
        
        {/* Foto */}
        <div className="flex justify-center mb-6">
          {renderUserPhoto('circular') || (
            <div className="w-32 h-32 rounded-full bg-white bg-opacity-20 border-4 border-white flex items-center justify-center">
              <User className="w-16 h-16 text-white opacity-60" />
            </div>
          )}
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: fonts.headings }}>
            {data.personalData?.fullName || 'SEU NOME'}
          </h1>
          <p className="text-lg opacity-90">
            {data.personalData?.profession || 'Sua Profissão'}
          </p>
        </div>

        {/* Contacto */}
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-4 border-b-2 pb-2" style={{ borderColor: colors.accent, fontFamily: fonts.headings }}>
            CONTACTO
          </h3>
          <div className="space-y-3">
            {data.personalData?.phone && (
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-3 flex-shrink-0" />
                <span className="text-sm">{data.personalData.phone}</span>
              </div>
            )}
            {data.personalData?.email && (
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-3 flex-shrink-0" />
                <span className="text-sm break-all">{data.personalData.email}</span>
              </div>
            )}
            {data.personalData?.address && (
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-3 flex-shrink-0" />
                <span className="text-sm">{data.personalData.address}</span>
              </div>
            )}
            {data.personalData?.website && (
              <div className="flex items-center">
                <Globe className="w-4 h-4 mr-3 flex-shrink-0" />
                <span className="text-sm break-all">{data.personalData.website}</span>
              </div>
            )}
          </div>
        </div>

        {/* Competências */}
        {data.skills?.technical?.length > 0 && (
          <div>
            <h3 className="text-lg font-bold mb-4 border-b-2 pb-2" style={{ borderColor: colors.accent, fontFamily: fonts.headings }}>
              COMPETÊNCIAS
            </h3>
            <div className="space-y-3">
              {data.skills.technical.slice(0, 6).map((skill: string, index: number) => (
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

      <div className="flex-1 p-8" style={{ backgroundColor: colors.background || '#ffffff' }}>
        {/* Perfil */}
        {data.about && (
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-4 flex items-center" style={{ color: colors.primary, fontFamily: fonts.headings }}>
              <User className="w-6 h-6 mr-3" />
              PERFIL PROFISSIONAL
            </h3>
            <p className="text-gray-700 leading-relaxed">{data.about}</p>
          </div>
        )}

        {/* Experiência */}
        {data.experience?.length > 0 && (
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-6 flex items-center" style={{ color: colors.primary, fontFamily: fonts.headings }}>
              <Briefcase className="w-6 h-6 mr-3" />
              EXPERIÊNCIA PROFISSIONAL
            </h3>
            <div className="space-y-6">
              {data.experience.map((exp: any, index: number) => (
                <div key={index} className="border-l-4 pl-6 relative" style={{ borderColor: colors.accent }}>
                  <div className="absolute w-3 h-3 rounded-full -left-2 top-2" style={{ backgroundColor: colors.accent }}></div>
                  <h4 className="text-xl font-bold" style={{ color: colors.text || '#1f2937' }}>{exp.position}</h4>
                  <p className="font-medium text-gray-600 mb-2">{exp.company}</p>
                  <div className="flex items-center text-gray-500 text-sm mb-3">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{exp.startDate} - {exp.current ? 'Presente' : exp.endDate}</span>
                  </div>
                  {exp.description && (
                    <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Formação */}
        {data.education?.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center" style={{ color: colors.primary, fontFamily: fonts.headings }}>
              <GraduationCap className="w-6 h-6 mr-3" />
              FORMAÇÃO ACADÉMICA
            </h3>
            <div className="space-y-4">
              {data.education.map((edu: any, index: number) => (
                <div key={index} className="border-l-4 pl-6 relative" style={{ borderColor: colors.accent }}>
                  <div className="absolute w-3 h-3 rounded-full -left-2 top-2" style={{ backgroundColor: colors.accent }}></div>
                  <h4 className="font-bold text-lg" style={{ color: colors.text || '#1f2937' }}>{edu.degree}</h4>
                  <p className="text-gray-600 font-medium">{edu.institution}</p>
                  <p className="text-gray-500 text-sm">{edu.startYear} - {edu.endYear}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Template 2: Criativo Moderno
  const renderCreativeModern = () => (
    <div className={`max-w-4xl mx-auto ${className}`} style={{ fontFamily: fonts.primary, backgroundColor: colors.background }}>
      {/* Header criativo com foto */}
      <div className="relative p-8 text-white overflow-hidden" style={{ backgroundColor: colors.primary }}>
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20" style={{ backgroundColor: colors.accent }}></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 transform rotate-45 opacity-30" style={{ backgroundColor: colors.secondary }}></div>
        
        <div className="relative z-10 text-center">
          <div className="mb-6">
            {renderUserPhoto('circular', 'w-40 h-40') || (
              <div className="w-40 h-40 rounded-full bg-white bg-opacity-20 border-8 border-white mx-auto flex items-center justify-center">
                <User className="w-20 h-20 text-white opacity-60" />
              </div>
            )}
          </div>
          <h1 className="text-4xl font-bold mb-3" style={{ fontFamily: fonts.headings }}>
            {data.personalData?.fullName || 'SEU NOME'}
          </h1>
          <p className="text-2xl opacity-90 mb-6">
            {data.personalData?.profession || 'Sua Profissão'}
          </p>
        </div>
      </div>

      <div className="p-8">
        {/* Contacto em linha */}
        <div className="flex flex-wrap justify-center gap-6 mb-8 py-6 border-y-2" style={{ borderColor: colors.accent }}>
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

        {/* Sobre */}
        {data.about && (
          <div className="mb-8 text-center">
            <h3 className="text-3xl font-bold mb-6" style={{ color: colors.primary, fontFamily: fonts.headings }}>
              Sobre Mim
            </h3>
            <p className="text-lg leading-relaxed max-w-3xl mx-auto" style={{ color: colors.text }}>
              {data.about}
            </p>
          </div>
        )}

        {/* Skills visuais */}
        {data.skills?.technical?.length > 0 && (
          <div className="mb-8">
            <h3 className="text-3xl font-bold mb-8 text-center" style={{ color: colors.primary, fontFamily: fonts.headings }}>
              Competências
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {data.skills.technical.map((skill: string, index: number) => (
                <div 
                  key={index} 
                  className="p-4 rounded-2xl text-center text-white font-bold shadow-lg"
                  style={{ 
                    backgroundColor: index % 2 === 0 ? colors.secondary : colors.accent,
                  }}
                >
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experiência */}
        {data.experience?.length > 0 && (
          <div>
            <h3 className="text-3xl font-bold mb-8 text-center" style={{ color: colors.primary, fontFamily: fonts.headings }}>
              Experiência
            </h3>
            <div className="space-y-6">
              {data.experience.map((exp: any, index: number) => (
                <div key={index} className="bg-white p-6 rounded-2xl shadow-lg border-l-8" style={{ borderColor: colors.primary }}>
                  <h4 className="text-2xl font-bold mb-2" style={{ color: colors.primary }}>{exp.position}</h4>
                  <p className="text-lg font-medium mb-2" style={{ color: colors.secondary }}>{exp.company}</p>
                  <p className="text-sm mb-4 text-gray-500">
                    {exp.startDate} - {exp.current ? 'Presente' : exp.endDate}
                  </p>
                  {exp.description && (
                    <p className="leading-relaxed" style={{ color: colors.text }}>{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Função principal de renderização baseada no template
  const renderTemplate = () => {
    switch (template.id) {
      case 'cv01':
        return renderExecutivePremium();
      case 'cv02':
        return renderCreativeModern();
      case 'cv03':
      case 'cv04':
      case 'cv05':
      case 'cv06':
      case 'cv07':
      case 'cv08':
      case 'cv09':
      case 'cv10':
        // Para os outros templates, usar variações do layout executivo por enquanto
        return renderExecutivePremium();
      default:
        return renderExecutivePremium();
    }
  };

  return (
    <div className="bg-white">
      {renderTemplate()}
    </div>
  );
};

export default CVLayoutRenderer;
