
import React from 'react';
import { Card } from '@/components/ui/card';
import { Mail, Phone, MapPin, Globe, Calendar, Award, Briefcase, GraduationCap, User, Star, Languages, Wrench } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface CVLayoutRendererProps {
  data: any;
  template: any;
  className?: string;
  userPhoto?: string;
}

const CVLayoutRenderer = ({ data, template, className = "", userPhoto }: CVLayoutRendererProps) => {
  const isMobile = useIsMobile();
  const colors = data.colorPalette || template.colorPalette;
  const fonts = template.fonts || { primary: 'Inter', headings: 'Poppins' };

  // Função para renderizar foto do usuário
  const renderUserPhoto = (position: string, size: string = "w-24 h-24 sm:w-32 sm:h-32") => {
    if (!userPhoto && !data.personalData?.photo) return null;
    
    const photoUrl = userPhoto || data.personalData?.photo;
    const baseClasses = `${size} object-cover border-4 border-white shadow-lg flex-shrink-0`;
    
    switch (position) {
      case 'circular':
        return (
          <div className={`${baseClasses} rounded-full overflow-hidden`}>
            <img src={photoUrl} alt="" className="w-full h-full object-cover" />
          </div>
        );
      case 'square':
        return (
          <div className={`${baseClasses} rounded-lg overflow-hidden`}>
            <img src={photoUrl} alt="" className="w-full h-full object-cover" />
          </div>
        );
      case 'hexagonal':
        return (
          <div className={`${baseClasses} rounded-lg transform rotate-6 overflow-hidden`}>
            <img src={photoUrl} alt="" className="w-full h-full object-cover" />
          </div>
        );
      default:
        return (
          <div className={`${baseClasses} rounded-full overflow-hidden`}>
            <img src={photoUrl} alt="" className="w-full h-full object-cover" />
          </div>
        );
    }
  };

  // Template 1: Executivo Premium (padrão) - Responsivo
  const renderExecutivePremium = () => (
    <div 
      className={`${isMobile ? 'block' : 'flex'} min-h-full ${className}`} 
      style={{ fontFamily: fonts.primary }}
    >
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
            <h1 className={`${isMobile ? 'text-xl cv-mobile-name' : 'text-2xl'} font-bold mb-2`} style={{ fontFamily: fonts.headings }}>
              {data.personalData?.fullName || 'SEU NOME'}
            </h1>
            <p className={`${isMobile ? 'text-base cv-mobile-text' : 'text-lg'} opacity-90`}>
              {data.personalData?.profession || 'Sua Profissão'}
            </p>
          </div>
        </div>

        {/* Contacto */}
        <div className="mb-6 cv-section">
          <h3 className={`${isMobile ? 'text-base cv-mobile-title' : 'text-lg'} font-bold mb-3 border-b-2 pb-2`} style={{ borderColor: colors.accent, fontFamily: fonts.headings }}>
            CONTACTO
          </h3>
          <div className="space-y-2">
            {data.personalData?.phone && (
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-3 flex-shrink-0" />
                <span className={`${isMobile ? 'text-sm cv-mobile-text' : 'text-sm'} break-all`}>{data.personalData.phone}</span>
              </div>
            )}
            {data.personalData?.email && (
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-3 flex-shrink-0" />
                <span className={`${isMobile ? 'text-sm cv-mobile-text' : 'text-sm'} break-all`}>{data.personalData.email}</span>
              </div>
            )}
            {data.personalData?.address && (
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-3 flex-shrink-0" />
                <span className={`${isMobile ? 'text-sm cv-mobile-text' : 'text-sm'}`}>{data.personalData.address}</span>
              </div>
            )}
            {data.personalData?.website && (
              <div className="flex items-center">
                <Globe className="w-4 h-4 mr-3 flex-shrink-0" />
                <span className={`${isMobile ? 'text-sm cv-mobile-text' : 'text-sm'} break-all`}>{data.personalData.website}</span>
              </div>
            )}
          </div>
        </div>

        {/* Competências Técnicas */}
        {data.skills?.technical?.length > 0 && (
          <div className="mb-6 cv-section">
            <h3 className={`${isMobile ? 'text-base cv-mobile-title' : 'text-lg'} font-bold mb-3 border-b-2 pb-2`} style={{ borderColor: colors.accent, fontFamily: fonts.headings }}>
              COMPETÊNCIAS TÉCNICAS
            </h3>
            <div className="space-y-3">
              {data.skills.technical.slice(0, 6).map((skill: string, index: number) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className={`${isMobile ? 'text-sm cv-mobile-text' : 'text-sm'}`}>{skill}</span>
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

        {/* Habilidades Interpessoais */}
        {data.skills?.interpersonal?.length > 0 && (
          <div className="mb-6 cv-section">
            <h3 className={`${isMobile ? 'text-base cv-mobile-title' : 'text-lg'} font-bold mb-3 border-b-2 pb-2`} style={{ borderColor: colors.accent, fontFamily: fonts.headings }}>
              HABILIDADES INTERPESSOAIS
            </h3>
            <div className="space-y-2">
              {data.skills.interpersonal.map((skill: string, index: number) => (
                <div key={index} className="flex items-center">
                  <Star className="w-3 h-3 mr-2 flex-shrink-0" />
                  <span className={`${isMobile ? 'text-sm cv-mobile-text' : 'text-sm'}`}>{skill}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Idiomas */}
        {data.skills?.languages?.length > 0 && (
          <div className="mb-6 cv-section">
            <h3 className={`${isMobile ? 'text-base cv-mobile-title' : 'text-lg'} font-bold mb-3 border-b-2 pb-2`} style={{ borderColor: colors.accent, fontFamily: fonts.headings }}>
              IDIOMAS
            </h3>
            <div className="space-y-2">
              {data.skills.languages.map((language: string, index: number) => (
                <div key={index} className="flex items-center">
                  <Languages className="w-3 h-3 mr-2 flex-shrink-0" />
                  <span className={`${isMobile ? 'text-sm cv-mobile-text' : 'text-sm'}`}>{language}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Ferramentas e Software */}
        {data.skills?.tools?.length > 0 && (
          <div className="cv-section">
            <h3 className={`${isMobile ? 'text-base cv-mobile-title' : 'text-lg'} font-bold mb-3 border-b-2 pb-2`} style={{ borderColor: colors.accent, fontFamily: fonts.headings }}>
              FERRAMENTAS
            </h3>
            <div className="space-y-2">
              {data.skills.tools.map((tool: string, index: number) => (
                <div key={index} className="flex items-center">
                  <Wrench className="w-3 h-3 mr-2 flex-shrink-0" />
                  <span className={`${isMobile ? 'text-sm cv-mobile-text' : 'text-sm'}`}>{tool}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Conteúdo Principal */}
      <div className={`${isMobile ? 'w-full p-4' : 'flex-1 p-6 sm:p-8'}`} style={{ backgroundColor: colors.background || '#ffffff' }}>
        {/* Perfil */}
        {data.about && (
          <div className="mb-6 cv-section">
            <h3 className={`${isMobile ? 'text-lg cv-mobile-title' : 'text-2xl'} font-bold mb-4 flex items-center`} style={{ color: colors.primary, fontFamily: fonts.headings }}>
              <User className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'} mr-2 sm:mr-3`} />
              PERFIL PROFISSIONAL
            </h3>
            <p className={`text-gray-700 leading-relaxed ${isMobile ? 'text-sm cv-mobile-text' : ''}`}>{data.about}</p>
          </div>
        )}

        {/* Experiência */}
        {data.experience?.length > 0 && (
          <div className="mb-6 cv-section">
            <h3 className={`${isMobile ? 'text-lg cv-mobile-title' : 'text-2xl'} font-bold mb-4 flex items-center`} style={{ color: colors.primary, fontFamily: fonts.headings }}>
              <Briefcase className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'} mr-2 sm:mr-3`} />
              EXPERIÊNCIA PROFISSIONAL
            </h3>
            <div className="space-y-4 sm:space-y-6">
              {data.experience.map((exp: any, index: number) => (
                <div key={index} className="border-l-4 pl-4 sm:pl-6 relative cv-section" style={{ borderColor: colors.accent }}>
                  <div className="absolute w-3 h-3 rounded-full -left-1.5 top-2" style={{ backgroundColor: colors.accent }}></div>
                  <h4 className={`${isMobile ? 'text-base cv-mobile-title' : 'text-xl'} font-bold`} style={{ color: colors.text || '#1f2937' }}>{exp.position}</h4>
                  <p className={`font-medium text-gray-600 mb-2 ${isMobile ? 'text-sm cv-mobile-text' : ''}`}>{exp.company}</p>
                  <div className={`flex items-center text-gray-500 mb-3 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                    <span>{exp.startDate} - {exp.current ? 'Presente' : exp.endDate}</span>
                  </div>
                  {exp.description && (
                    <p className={`text-gray-700 leading-relaxed ${isMobile ? 'text-sm cv-mobile-text' : ''}`}>{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Formação */}
        {data.education?.length > 0 && (
          <div className="cv-section">
            <h3 className={`${isMobile ? 'text-lg cv-mobile-title' : 'text-2xl'} font-bold mb-4 flex items-center`} style={{ color: colors.primary, fontFamily: fonts.headings }}>
              <GraduationCap className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'} mr-2 sm:mr-3`} />
              FORMAÇÃO ACADÉMICA
            </h3>
            <div className="space-y-4">
              {data.education.map((edu: any, index: number) => (
                <div key={index} className="border-l-4 pl-4 sm:pl-6 relative cv-section" style={{ borderColor: colors.accent }}>
                  <div className="absolute w-3 h-3 rounded-full -left-1.5 top-2" style={{ backgroundColor: colors.accent }}></div>
                  <h4 className={`font-bold ${isMobile ? 'text-base cv-mobile-title' : 'text-lg'}`} style={{ color: colors.text || '#1f2937' }}>{edu.degree}</h4>
                  <p className={`text-gray-600 font-medium ${isMobile ? 'text-sm cv-mobile-text' : ''}`}>{edu.institution}</p>
                  <p className={`text-gray-500 ${isMobile ? 'text-xs' : 'text-sm'}`}>{edu.startYear} - {edu.endYear}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Template 2: Criativo Moderno - Responsivo com todas as seções
  const renderCreativeModern = () => (
    <div className={`max-w-4xl mx-auto ${className}`} style={{ fontFamily: fonts.primary, backgroundColor: colors.background }}>
      {/* Header criativo com foto */}
      <div className={`relative ${isMobile ? 'p-4' : 'p-8'} text-white overflow-hidden cv-section`} style={{ backgroundColor: colors.primary }}>
        <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 rounded-full opacity-20" style={{ backgroundColor: colors.accent }}></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-24 sm:h-24 transform rotate-45 opacity-30" style={{ backgroundColor: colors.secondary }}></div>
        
        <div className="relative z-10 text-center">
          <div className="mb-4 sm:mb-6">
            {renderUserPhoto('circular', isMobile ? 'w-32 h-32' : 'w-40 h-40') || (
              <div className={`${isMobile ? 'w-32 h-32' : 'w-40 h-40'} rounded-full bg-white bg-opacity-20 border-8 border-white mx-auto flex items-center justify-center`}>
                <User className={`${isMobile ? 'w-16 h-16' : 'w-20 h-20'} text-white opacity-60`} />
              </div>
            )}
          </div>
          <h1 className={`${isMobile ? 'text-2xl cv-mobile-name' : 'text-4xl'} font-bold mb-3`} style={{ fontFamily: fonts.headings }}>
            {data.personalData?.fullName || 'SEU NOME'}
          </h1>
          <p className={`${isMobile ? 'text-lg cv-mobile-text' : 'text-2xl'} opacity-90 mb-4 sm:mb-6`}>
            {data.personalData?.profession || 'Sua Profissão'}
          </p>
        </div>
      </div>

      <div className={`${isMobile ? 'p-4' : 'p-8'}`}>
        {/* Contacto em linha */}
        <div className={`${isMobile ? 'grid grid-cols-1 gap-3' : 'flex flex-wrap justify-center gap-6'} mb-6 sm:mb-8 py-4 sm:py-6 border-y-2 cv-section`} style={{ borderColor: colors.accent }}>
          {data.personalData?.phone && (
            <div className="flex items-center justify-center">
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" style={{ color: colors.primary }} />
              <span className={isMobile ? 'text-sm cv-mobile-text' : ''}>{data.personalData.phone}</span>
            </div>
          )}
          {data.personalData?.email && (
            <div className="flex items-center justify-center">
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" style={{ color: colors.primary }} />
              <span className={`${isMobile ? 'text-sm cv-mobile-text' : ''} break-all`}>{data.personalData.email}</span>
            </div>
          )}
          {data.personalData?.address && (
            <div className="flex items-center justify-center">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" style={{ color: colors.primary }} />
              <span className={isMobile ? 'text-sm cv-mobile-text' : ''}>{data.personalData.address}</span>
            </div>
          )}
        </div>

        {/* Sobre */}
        {data.about && (
          <div className="mb-6 sm:mb-8 text-center cv-section">
            <h3 className={`${isMobile ? 'text-xl cv-mobile-title' : 'text-3xl'} font-bold mb-4 sm:mb-6`} style={{ color: colors.primary, fontFamily: fonts.headings }}>
              Sobre Mim
            </h3>
            <p className={`${isMobile ? 'text-sm cv-mobile-text' : 'text-lg'} leading-relaxed max-w-3xl mx-auto`} style={{ color: colors.text }}>
              {data.about}
            </p>
          </div>
        )}

        {/* Skills visuais */}
        {data.skills?.technical?.length > 0 && (
          <div className="mb-6 sm:mb-8 cv-section">
            <h3 className={`${isMobile ? 'text-xl cv-mobile-title' : 'text-3xl'} font-bold mb-6 sm:mb-8 text-center`} style={{ color: colors.primary, fontFamily: fonts.headings }}>
              Competências
            </h3>
            <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2 md:grid-cols-4'} gap-3 sm:gap-4`}>
              {data.skills.technical.map((skill: string, index: number) => (
                <div 
                  key={index} 
                  className={`p-3 sm:p-4 rounded-2xl text-center text-white font-bold shadow-lg ${isMobile ? 'text-sm cv-mobile-text' : ''}`}
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
          <div className="cv-section">
            <h3 className={`${isMobile ? 'text-xl cv-mobile-title' : 'text-3xl'} font-bold mb-6 sm:mb-8 text-center`} style={{ color: colors.primary, fontFamily: fonts.headings }}>
              Experiência
            </h3>
            <div className="space-y-4 sm:space-y-6">
              {data.experience.map((exp: any, index: number) => (
                <div key={index} className={`bg-white ${isMobile ? 'p-4' : 'p-6'} rounded-2xl shadow-lg border-l-8 cv-section`} style={{ borderColor: colors.primary }}>
                  <h4 className={`${isMobile ? 'text-lg cv-mobile-title' : 'text-2xl'} font-bold mb-2`} style={{ color: colors.primary }}>{exp.position}</h4>
                  <p className={`${isMobile ? 'text-base cv-mobile-text' : 'text-lg'} font-medium mb-2`} style={{ color: colors.secondary }}>{exp.company}</p>
                  <p className={`${isMobile ? 'text-xs' : 'text-sm'} mb-3 sm:mb-4 text-gray-500`}>
                    {exp.startDate} - {exp.current ? 'Presente' : exp.endDate}
                  </p>
                  {exp.description && (
                    <p className={`leading-relaxed ${isMobile ? 'text-sm cv-mobile-text' : ''}`} style={{ color: colors.text }}>{exp.description}</p>
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
    <div className="bg-white w-full h-full">
      {renderTemplate()}
    </div>
  );
};

export default CVLayoutRenderer;
