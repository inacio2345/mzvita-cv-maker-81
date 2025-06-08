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

  // MODELO 1: Profissional Clássico - Cabeçalho centralizado + duas colunas
  const renderProfissionalClassico = () => (
    <div className={`min-h-full ${className}`} style={{ fontFamily: fonts.primary, backgroundColor: '#ffffff' }}>
      {/* Cabeçalho centralizado */}
      <div className="text-center py-6 sm:py-8 border-b-2" style={{ borderColor: colors.primary }}>
        <h1 className={`${isMobile ? 'text-2xl' : 'text-4xl'} font-bold mb-2`} style={{ color: colors.primary, fontFamily: fonts.headings }}>
          {data.personalData?.fullName || 'SEU NOME'}
        </h1>
        <p className={`${isMobile ? 'text-lg' : 'text-xl'} text-gray-600 font-medium`}>
          {data.personalData?.profession || 'Sua Profissão'}
        </p>
      </div>

      <div className={`${isMobile ? 'block' : 'flex'} gap-6 p-4 sm:p-6`}>
        {/* Coluna Esquerda - Informações secundárias */}
        <div className={`${isMobile ? 'w-full mb-6' : 'w-1/3'} space-y-6`}>
          {/* Contacto */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold mb-4 text-gray-800`}>CONTACTO</h3>
            <div className="space-y-3">
              {data.personalData?.phone && (
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-3 text-gray-600" />
                  <span className="text-sm">{data.personalData.phone}</span>
                </div>
              )}
              {data.personalData?.email && (
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-3 text-gray-600" />
                  <span className="text-sm break-all">{data.personalData.email}</span>
                </div>
              )}
              {data.personalData?.address && (
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-3 text-gray-600" />
                  <span className="text-sm">{data.personalData.address}</span>
                </div>
              )}
            </div>
          </div>

          {/* Habilidades */}
          {data.skills?.technical?.length > 0 && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold mb-4 text-gray-800`}>HABILIDADES</h3>
              <div className="space-y-2">
                {data.skills.technical.map((skill: string, index: number) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: colors.primary }}></div>
                    <span className="text-sm">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Idiomas */}
          {data.skills?.languages?.length > 0 && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold mb-4 text-gray-800`}>IDIOMAS</h3>
              <div className="space-y-2">
                {data.skills.languages.map((language: string, index: number) => (
                  <div key={index} className="flex items-center">
                    <Languages className="w-3 h-3 mr-2 text-gray-600" />
                    <span className="text-sm">{language}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Coluna Direita - Conteúdo principal */}
        <div className={`${isMobile ? 'w-full' : 'flex-1'} space-y-6`}>
          {/* Perfil */}
          {data.about && (
            <div>
              <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold mb-4 flex items-center`} style={{ color: colors.primary }}>
                <User className="w-5 h-5 mr-2" />
                PERFIL PROFISSIONAL
              </h3>
              <p className="text-gray-700 leading-relaxed">{data.about}</p>
            </div>
          )}

          {/* Experiência */}
          {data.experience?.length > 0 && (
            <div>
              <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold mb-4 flex items-center`} style={{ color: colors.primary }}>
                <Briefcase className="w-5 h-5 mr-2" />
                EXPERIÊNCIA PROFISSIONAL
              </h3>
              <div className="space-y-4">
                {data.experience.map((exp: any, index: number) => (
                  <div key={index} className="border-l-4 pl-4" style={{ borderColor: colors.secondary }}>
                    <h4 className="font-bold text-lg text-gray-800">{exp.position}</h4>
                    <p className="font-medium text-gray-600">{exp.company}</p>
                    <p className="text-sm text-gray-500 mb-2">{exp.startDate} - {exp.current ? 'Presente' : exp.endDate}</p>
                    {exp.description && <p className="text-gray-700">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Formação */}
          {data.education?.length > 0 && (
            <div>
              <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold mb-4 flex items-center`} style={{ color: colors.primary }}>
                <GraduationCap className="w-5 h-5 mr-2" />
                FORMAÇÃO ACADÉMICA
              </h3>
              <div className="space-y-3">
                {data.education.map((edu: any, index: number) => (
                  <div key={index} className="border-l-4 pl-4" style={{ borderColor: colors.secondary }}>
                    <h4 className="font-bold text-gray-800">{edu.degree}</h4>
                    <p className="text-gray-600">{edu.institution}</p>
                    <p className="text-sm text-gray-500">{edu.startYear} - {edu.endYear}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
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
          {renderUserPhoto('circular', isMobile ? 'w-24 h-24' : 'w-32 h-32') || (
            <div className={`${isMobile ? 'w-24 h-24' : 'w-32 h-32'} rounded-full bg-white bg-opacity-20 border-4 border-white mx-auto flex items-center justify-center`}>
              <User className={`${isMobile ? 'w-12 h-12' : 'w-16 h-16'} text-white`} />
            </div>
          )}
          <h1 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold mt-4 mb-2`}>
            {data.personalData?.fullName || 'SEU NOME'}
          </h1>
          <p className={`${isMobile ? 'text-base' : 'text-lg'} opacity-90`}>
            {data.personalData?.profession || 'Sua Profissão'}
          </p>
        </div>

        {/* Contacto com ícones */}
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-3 border-b-2 pb-2" style={{ borderColor: colors.accent }}>
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

        {/* Habilidades */}
        {data.skills?.technical?.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-3 border-b-2 pb-2" style={{ borderColor: colors.accent }}>
              HABILIDADES
            </h3>
            <div className="space-y-2">
              {data.skills.technical.map((skill: string, index: number) => (
                <div key={index} className="flex items-center">
                  <Wrench className="w-3 h-3 mr-2" />
                  <span className="text-sm">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Idiomas */}
        {data.skills?.languages?.length > 0 && (
          <div>
            <h3 className="text-lg font-bold mb-3 border-b-2 pb-2" style={{ borderColor: colors.accent }}>
              IDIOMAS
            </h3>
            <div className="space-y-2">
              {data.skills.languages.map((language: string, index: number) => (
                <div key={index} className="flex items-center">
                  <Languages className="w-3 h-3 mr-2" />
                  <span className="text-sm">{language}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Conteúdo Principal */}
      <div className={`${isMobile ? 'w-full p-4' : 'flex-1 p-8'}`} style={{ backgroundColor: '#ffffff' }}>
        {/* Perfil */}
        {data.about && (
          <div className="mb-8">
            <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold mb-4 flex items-center`} style={{ color: colors.primary }}>
              <User className="w-6 h-6 mr-3" />
              PERFIL PROFISSIONAL
            </h3>
            <p className="text-gray-700 leading-relaxed">{data.about}</p>
          </div>
        )}

        {/* Experiência */}
        {data.experience?.length > 0 && (
          <div className="mb-8">
            <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold mb-4 flex items-center`} style={{ color: colors.primary }}>
              <Briefcase className="w-6 h-6 mr-3" />
              EXPERIÊNCIA PROFISSIONAL
            </h3>
            <div className="space-y-6">
              {data.experience.map((exp: any, index: number) => (
                <div key={index} className="border-l-4 pl-6" style={{ borderColor: colors.accent }}>
                  <h4 className="text-xl font-bold text-gray-800">{exp.position}</h4>
                  <p className="font-medium text-gray-600 mb-2">{exp.company}</p>
                  <p className="text-sm text-gray-500 mb-3">{exp.startDate} - {exp.current ? 'Presente' : exp.endDate}</p>
                  {exp.description && <p className="text-gray-700">{exp.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Formação */}
        {data.education?.length > 0 && (
          <div>
            <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold mb-4 flex items-center`} style={{ color: colors.primary }}>
              <GraduationCap className="w-6 h-6 mr-3" />
              FORMAÇÃO ACADÉMICA
            </h3>
            <div className="space-y-4">
              {data.education.map((edu: any, index: number) => (
                <div key={index} className="border-l-4 pl-6" style={{ borderColor: colors.accent }}>
                  <h4 className="font-bold text-lg text-gray-800">{edu.degree}</h4>
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

  // MODELO 3: Layout Simples com Destaques
  const renderLayoutSimplesDestaques = () => (
    <div className={`min-h-full p-4 sm:p-8 ${className}`} style={{ fontFamily: fonts.primary, backgroundColor: '#ffffff' }}>
      {/* Nome e título no topo */}
      <div className="text-center mb-8 pb-6 border-b-2" style={{ borderColor: colors.primary }}>
        <h1 className={`${isMobile ? 'text-3xl' : 'text-4xl'} font-bold mb-2`} style={{ color: colors.primary }}>
          {data.personalData?.fullName || 'SEU NOME'}
        </h1>
        <p className={`${isMobile ? 'text-lg' : 'text-xl'} text-gray-600 mb-4`}>
          {data.personalData?.profession || 'Sua Profissão'}
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          {data.personalData?.email && <span>{data.personalData.email}</span>}
          {data.personalData?.phone && <span>{data.personalData.phone}</span>}
          {data.personalData?.address && <span>{data.personalData.address}</span>}
        </div>
      </div>

      {/* Seções com blocos destacados */}
      {data.about && (
        <div className="mb-8 p-6 rounded-lg" style={{ backgroundColor: colors.background || '#f8fafc' }}>
          <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold mb-4`} style={{ color: colors.primary }}>
            PERFIL PROFISSIONAL
          </h3>
          <p className="text-gray-700 leading-relaxed">{data.about}</p>
        </div>
      )}

      {data.experience?.length > 0 && (
        <div className="mb-8 p-6 rounded-lg" style={{ backgroundColor: '#ffffff', border: `2px solid ${colors.primary}` }}>
          <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold mb-6`} style={{ color: colors.primary }}>
            EXPERIÊNCIA PROFISSIONAL
          </h3>
          <div className="space-y-6">
            {data.experience.map((exp: any, index: number) => (
              <div key={index} className="pb-4 border-b border-gray-200 last:border-b-0">
                <h4 className="text-xl font-bold text-gray-800 mb-1">{exp.position}</h4>
                <p className="font-medium text-gray-600 mb-2">{exp.company}</p>
                <p className="text-sm text-gray-500 mb-3">{exp.startDate} - {exp.current ? 'Presente' : exp.endDate}</p>
                {exp.description && <p className="text-gray-700">{exp.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {data.education?.length > 0 && (
        <div className="mb-8 p-6 rounded-lg" style={{ backgroundColor: colors.background || '#f8fafc' }}>
          <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold mb-6`} style={{ color: colors.primary }}>
            FORMAÇÃO ACADÉMICA
          </h3>
          <div className="space-y-4">
            {data.education.map((edu: any, index: number) => (
              <div key={index} className="pb-4 border-b border-gray-200 last:border-b-0">
                <h4 className="font-bold text-lg text-gray-800">{edu.degree}</h4>
                <p className="text-gray-600">{edu.institution}</p>
                <p className="text-sm text-gray-500">{edu.startYear} - {edu.endYear}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {(data.skills?.technical?.length > 0 || data.skills?.languages?.length > 0) && (
        <div className="p-6 rounded-lg" style={{ backgroundColor: '#ffffff', border: `2px solid ${colors.primary}` }}>
          <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold mb-6`} style={{ color: colors.primary }}>
            COMPETÊNCIAS
          </h3>
          <div className={`${isMobile ? 'block' : 'grid grid-cols-2'} gap-6`}>
            {data.skills?.technical?.length > 0 && (
              <div>
                <h4 className="font-bold text-gray-800 mb-3">Habilidades Técnicas</h4>
                <div className="flex flex-wrap gap-2">
                  {data.skills.technical.map((skill: string, index: number) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {data.skills?.languages?.length > 0 && (
              <div>
                <h4 className="font-bold text-gray-800 mb-3">Idiomas</h4>
                <div className="flex flex-wrap gap-2">
                  {data.skills.languages.map((language: string, index: number) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      {language}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  // MODELO 4: Criativo Profissional
  const renderCriativoProfissional = () => (
    <div className={`min-h-full ${className}`} style={{ fontFamily: fonts.primary, backgroundColor: colors.background || '#fefefe' }}>
      {/* Header criativo com gradiente */}
      <div 
        className={`${isMobile ? 'p-6' : 'p-12'} text-white relative overflow-hidden`}
        style={{ 
          background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`
        }}
      >
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20" style={{ backgroundColor: colors.accent }}></div>
        <div className="relative z-10">
          <h1 className={`${isMobile ? 'text-3xl' : 'text-5xl'} font-bold mb-3`} style={{ fontFamily: fonts.headings }}>
            {data.personalData?.fullName || 'SEU NOME'}
          </h1>
          <p className={`${isMobile ? 'text-xl' : 'text-2xl'} opacity-90 mb-6`}>
            {data.personalData?.profession || 'Sua Profissão'}
          </p>
          <div className={`${isMobile ? 'flex flex-col gap-2' : 'flex gap-6'} text-sm opacity-80`}>
            {data.personalData?.email && (
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                <span>{data.personalData.email}</span>
              </div>
            )}
            {data.personalData?.phone && (
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <span>{data.personalData.phone}</span>
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
      </div>

      <div className={`${isMobile ? 'p-4' : 'p-8'}`}>
        {/* Seções com ícones grandes e divisores coloridos */}
        {data.about && (
          <div className="mb-10">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4" style={{ backgroundColor: colors.primary }}>
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold`} style={{ color: colors.primary, fontFamily: fonts.headings }}>
                  Perfil Profissional
                </h3>
                <div className="w-20 h-1 mt-2" style={{ backgroundColor: colors.accent }}></div>
              </div>
            </div>
            <p className={`${isMobile ? 'text-base' : 'text-lg'} text-gray-700 leading-relaxed ml-16`}>{data.about}</p>
          </div>
        )}

        {data.experience?.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4" style={{ backgroundColor: colors.secondary }}>
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold`} style={{ color: colors.primary, fontFamily: fonts.headings }}>
                  Experiência
                </h3>
                <div className="w-20 h-1 mt-2" style={{ backgroundColor: colors.accent }}></div>
              </div>
            </div>
            <div className="ml-16 space-y-6">
              {data.experience.map((exp: any, index: number) => (
                <div key={index} className="relative">
                  <div className="absolute -left-16 top-2 w-4 h-4 rounded-full" style={{ backgroundColor: colors.accent }}></div>
                  <h4 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-gray-800 mb-1`}>{exp.position}</h4>
                  <p className="font-medium mb-2" style={{ color: colors.secondary }}>{exp.company}</p>
                  <p className="text-sm text-gray-500 mb-3">{exp.startDate} - {exp.current ? 'Presente' : exp.endDate}</p>
                  {exp.description && <p className="text-gray-700">{exp.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {data.education?.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4" style={{ backgroundColor: colors.accent }}>
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold`} style={{ color: colors.primary, fontFamily: fonts.headings }}>
                  Formação
                </h3>
                <div className="w-20 h-1 mt-2" style={{ backgroundColor: colors.accent }}></div>
              </div>
            </div>
            <div className="ml-16 space-y-4">
              {data.education.map((edu: any, index: number) => (
                <div key={index} className="relative">
                  <div className="absolute -left-16 top-2 w-4 h-4 rounded-full" style={{ backgroundColor: colors.secondary }}></div>
                  <h4 className="font-bold text-lg text-gray-800">{edu.degree}</h4>
                  <p className="text-gray-600">{edu.institution}</p>
                  <p className="text-sm text-gray-500">{edu.startYear} - {edu.endYear}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {(data.skills?.technical?.length > 0 || data.skills?.languages?.length > 0) && (
          <div>
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4" style={{ backgroundColor: colors.primary }}>
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold`} style={{ color: colors.primary, fontFamily: fonts.headings }}>
                  Competências
                </h3>
                <div className="w-20 h-1 mt-2" style={{ backgroundColor: colors.accent }}></div>
              </div>
            </div>
            <div className="ml-16">
              {data.skills?.technical?.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-bold text-gray-800 mb-3">Habilidades Técnicas</h4>
                  <div className="flex flex-wrap gap-3">
                    {data.skills.technical.map((skill: string, index: number) => (
                      <span 
                        key={index} 
                        className="px-4 py-2 rounded-full text-white font-medium"
                        style={{ backgroundColor: colors.secondary }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {data.skills?.languages?.length > 0 && (
                <div>
                  <h4 className="font-bold text-gray-800 mb-3">Idiomas</h4>
                  <div className="flex flex-wrap gap-3">
                    {data.skills.languages.map((language: string, index: number) => (
                      <span 
                        key={index} 
                        className="px-4 py-2 rounded-full text-white font-medium"
                        style={{ backgroundColor: colors.accent }}
                      >
                        {language}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // MODELO 5: Compacto com Menu à Direita
  const renderCompactoMenuDireita = () => (
    <div className={`${isMobile ? 'block' : 'flex'} min-h-full ${className}`} style={{ fontFamily: fonts.primary }}>
      {/* Conteúdo Principal à Esquerda */}
      <div className={`${isMobile ? 'w-full p-4 order-2' : 'flex-1 p-6'}`} style={{ backgroundColor: '#ffffff' }}>
        {/* Header compacto */}
        <div className="mb-6 pb-4 border-b-2" style={{ borderColor: colors.primary }}>
          <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold mb-2`} style={{ color: colors.primary }}>
            {data.personalData?.fullName || 'SEU NOME'}
          </h1>
          <p className={`${isMobile ? 'text-lg' : 'text-xl'} text-gray-600`}>
            {data.personalData?.profession || 'Sua Profissão'}
          </p>
        </div>

        {/* Seções em blocos organizados */}
        {data.about && (
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-3 text-gray-800 uppercase tracking-wide">Perfil</h3>
            <p className="text-gray-700 leading-relaxed">{data.about}</p>
          </div>
        )}

        {data.experience?.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-4 text-gray-800 uppercase tracking-wide">Experiência</h3>
            <div className="space-y-4">
              {data.experience.map((exp: any, index: number) => (
                <div key={index} className="border-l-3 pl-4" style={{ borderColor: colors.accent }}>
                  <h4 className="font-bold text-gray-800">{exp.position}</h4>
                  <p className="text-gray-600 font-medium">{exp.company}</p>
                  <p className="text-sm text-gray-500 mb-2">{exp.startDate} - {exp.current ? 'Presente' : exp.endDate}</p>
                  {exp.description && <p className="text-gray-700 text-sm">{exp.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {data.education?.length > 0 && (
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-800 uppercase tracking-wide">Formação</h3>
            <div className="space-y-3">
              {data.education.map((edu: any, index: number) => (
                <div key={index} className="border-l-3 pl-4" style={{ borderColor: colors.accent }}>
                  <h4 className="font-bold text-gray-800">{edu.degree}</h4>
                  <p className="text-gray-600">{edu.institution}</p>
                  <p className="text-sm text-gray-500">{edu.startYear} - {edu.endYear}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Menu Lateral Direito */}
      <div 
        className={`${isMobile ? 'w-full p-4 order-1 mb-4' : 'w-1/3 p-6'} text-white`}
        style={{ backgroundColor: colors.primary }}
      >
        {/* Dados Pessoais */}
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-4 border-b-2 pb-2" style={{ borderColor: colors.accent }}>
            CONTACTO
          </h3>
          <div className="space-y-3">
            {data.personalData?.phone && (
              <div className="flex items-start">
                <Phone className="w-4 h-4 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{data.personalData.phone}</span>
              </div>
            )}
            {data.personalData?.email && (
              <div className="flex items-start">
                <Mail className="w-4 h-4 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-sm break-all">{data.personalData.email}</span>
              </div>
            )}
            {data.personalData?.address && (
              <div className="flex items-start">
                <MapPin className="w-4 h-4 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{data.personalData.address}</span>
              </div>
            )}
          </div>
        </div>

        {/* Habilidades organizadas */}
        {data.skills?.technical?.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-4 border-b-2 pb-2" style={{ borderColor: colors.accent }}>
              HABILIDADES
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {data.skills.technical.map((skill: string, index: number) => (
                <div key={index} className="bg-white bg-opacity-10 px-3 py-2 rounded text-sm text-center">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Idiomas */}
        {data.skills?.languages?.length > 0 && (
          <div>
            <h3 className="text-lg font-bold mb-4 border-b-2 pb-2" style={{ borderColor: colors.accent }}>
              IDIOMAS
            </h3>
            <div className="space-y-2">
              {data.skills.languages.map((language: string, index: number) => (
                <div key={index} className="flex items-center">
                  <Languages className="w-3 h-3 mr-2" />
                  <span className="text-sm">{language}</span>
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
        return renderProfissionalClassico();
      case 'cv02': 
        return renderBarraLateralEsquerda();
      case 'cv03':
        return renderLayoutSimplesDestaques();
      case 'cv04':
        return renderCriativoProfissional();
      case 'cv05':
        return renderCompactoMenuDireita();
      case 'cv06':
      case 'cv07':
      case 'cv08':
      case 'cv09':
      case 'cv10':
        // Para os outros templates, usar variações dos layouts acima
        return renderBarraLateralEsquerda();
      default:
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
