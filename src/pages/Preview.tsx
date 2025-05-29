
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Download, Edit, FileText, Mail, Phone, MapPin, Globe, Calendar } from 'lucide-react';

const Preview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cvData = location.state?.cvData || {};

  const handleDownloadPDF = () => {
    window.print();
  };

  // Helper function to safely check if an array has items
  const hasItems = (arr: unknown): arr is Array<any> => {
    return Array.isArray(arr) && arr.length > 0;
  };

  // Default color palette if none selected
  const defaultPalette = {
    primary: '#2563eb',
    secondary: '#1e40af',
    accent: '#3b82f6'
  };

  const colors = cvData.colorPalette || defaultPalette;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header - Hide when printing */}
      <header className="bg-white shadow-sm border-b print:hidden">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate('/criar-cv')}
              className="flex items-center text-gray-600 hover:text-google-blue"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Editor
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-google-blue to-google-green rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Visualização do CV</h1>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => navigate('/criar-cv')}
                className="flex items-center border-google-blue text-google-blue hover:bg-google-blue hover:text-white"
              >
                <Edit className="w-4 h-4 mr-2" />
                Editar
              </Button>
              <Button
                onClick={handleDownloadPDF}
                className="bg-google-green hover:bg-green-600 text-white flex items-center"
              >
                <Download className="w-4 h-4 mr-2" />
                Baixar PDF
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 print:p-0">
        {/* CV Preview */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white shadow-lg print:shadow-none print:border-none overflow-hidden">
            <div 
              className="flex min-h-[297mm]" 
              style={{ 
                fontFamily: 'Times New Roman, serif',
                fontSize: '12pt',
                lineHeight: '1.4'
              }}
            >
              {/* Left Column - Personal Info & Photo */}
              <div 
                className="w-1/3 p-8 text-white"
                style={{ backgroundColor: colors.primary }}
              >
                {/* Profile Image */}
                <div className="flex justify-center mb-6">
                  {cvData.personalData?.profileImage ? (
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                      <img
                        src={cvData.personalData.profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-white bg-opacity-20 border-4 border-white flex items-center justify-center">
                      <span className="text-4xl text-white">👤</span>
                    </div>
                  )}
                </div>

                {/* Personal Info */}
                <div className="mb-8">
                  <h1 className="text-2xl font-bold mb-2 text-center">
                    {cvData.personalData?.fullName || 'SEU NOME'}
                  </h1>
                  <p className="text-lg text-center mb-4 opacity-90">
                    {cvData.personalData?.profession || 'Sua Profissão'}
                  </p>
                </div>

                {/* Contact Info */}
                <div className="mb-8">
                  <div 
                    className="text-lg font-bold mb-4 pb-2 border-b-2"
                    style={{ borderColor: colors.accent }}
                  >
                    CONTATO
                  </div>
                  <div className="space-y-3 text-sm">
                    {cvData.personalData?.phone && (
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-3 flex-shrink-0" />
                        <span className="break-all">{cvData.personalData.phone}</span>
                      </div>
                    )}
                    {cvData.personalData?.email && (
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-3 flex-shrink-0" />
                        <span className="break-all">{cvData.personalData.email}</span>
                      </div>
                    )}
                    {cvData.personalData?.website && (
                      <div className="flex items-center">
                        <Globe className="w-4 h-4 mr-3 flex-shrink-0" />
                        <span className="break-all">{cvData.personalData.website}</span>
                      </div>
                    )}
                    {cvData.personalData?.address && (
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-3 flex-shrink-0" />
                        <span className="break-all">{cvData.personalData.address}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Skills */}
                {cvData.skills && hasItems(cvData.skills.technical) && (
                  <div className="mb-8">
                    <div 
                      className="text-lg font-bold mb-4 pb-2 border-b-2"
                      style={{ borderColor: colors.accent }}
                    >
                      COMPETÊNCIAS
                    </div>
                    <div className="space-y-3">
                      {cvData.skills.technical.map((skill: string, index: number) => (
                        <div key={index} className="text-sm">
                          <div className="flex justify-between items-center mb-1">
                            <span>{skill}</span>
                            <span className="text-xs">{85 + Math.floor(Math.random() * 15)}%</span>
                          </div>
                          <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
                            <div 
                              className="h-2 rounded-full"
                              style={{ 
                                backgroundColor: colors.accent,
                                width: `${85 + Math.floor(Math.random() * 15)}%`
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Soft Skills */}
                {cvData.skills && hasItems(cvData.skills.soft) && (
                  <div>
                    <div 
                      className="text-lg font-bold mb-4 pb-2 border-b-2"
                      style={{ borderColor: colors.accent }}
                    >
                      QUALIDADES
                    </div>
                    <div className="space-y-2">
                      {cvData.skills.soft.map((skill: string, index: number) => (
                        <div key={index} className="flex items-start text-sm">
                          <span className="w-2 h-2 rounded-full bg-white mt-2 mr-3 flex-shrink-0"></span>
                          <span>{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column - Education & Experience */}
              <div className="flex-1 p-8 bg-white">
                {/* About Section */}
                {cvData.about && (
                  <div className="mb-8">
                    <div 
                      className="text-xl font-bold mb-4 pb-2 border-b-2 text-gray-800"
                      style={{ borderColor: colors.primary }}
                    >
                      PERFIL PROFISSIONAL
                    </div>
                    <p className="text-gray-700 text-justify leading-relaxed">
                      {cvData.about}
                    </p>
                  </div>
                )}

                {/* Experience Section */}
                {hasItems(cvData.experience) && (
                  <div className="mb-8">
                    <div 
                      className="text-xl font-bold mb-4 pb-2 border-b-2 text-gray-800"
                      style={{ borderColor: colors.primary }}
                    >
                      EXPERIÊNCIA PROFISSIONAL
                    </div>
                    <div className="space-y-6">
                      {cvData.experience.map((exp: any, index: number) => (
                        <div key={index} className="relative pl-4">
                          <div 
                            className="absolute left-0 top-0 w-3 h-3 rounded-full"
                            style={{ backgroundColor: colors.primary }}
                          />
                          <div 
                            className="absolute left-1.5 top-3 w-0.5 h-full"
                            style={{ backgroundColor: colors.accent, opacity: 0.3 }}
                          />
                          <div className="ml-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-1">
                              {exp.position}
                            </h3>
                            <div className="flex items-center mb-2 text-gray-600">
                              <span className="font-medium">{exp.company}</span>
                              <span className="mx-2">•</span>
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                <span>{exp.startDate} - {exp.current ? 'Presente' : exp.endDate}</span>
                              </div>
                            </div>
                            {exp.description && (
                              <div className="text-gray-700 text-sm">
                                <ul className="space-y-1">
                                  {exp.description.split('.').filter(Boolean).slice(0, 3).map((item: string, i: number) => (
                                    <li key={i} className="flex items-start">
                                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 mr-3 flex-shrink-0"></span>
                                      <span>{item.trim()}.</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Education Section */}
                {hasItems(cvData.education) && (
                  <div>
                    <div 
                      className="text-xl font-bold mb-4 pb-2 border-b-2 text-gray-800"
                      style={{ borderColor: colors.primary }}
                    >
                      FORMAÇÃO ACADÉMICA
                    </div>
                    <div className="space-y-4">
                      {cvData.education.map((edu: any, index: number) => (
                        <div key={index} className="relative pl-4">
                          <div 
                            className="absolute left-0 top-0 w-3 h-3 rounded-full"
                            style={{ backgroundColor: colors.primary }}
                          />
                          <div 
                            className="absolute left-1.5 top-3 w-0.5 h-full"
                            style={{ backgroundColor: colors.accent, opacity: 0.3 }}
                          />
                          <div className="ml-6">
                            <h3 className="font-bold text-gray-900">
                              {edu.degree}
                            </h3>
                            <p className="text-gray-600 mb-1">{edu.institution}</p>
                            <div className="flex items-center text-gray-500 text-sm">
                              <Calendar className="w-4 h-4 mr-1" />
                              <span>{edu.startYear} - {edu.endYear || 'Presente'}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Print Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @media print {
            body { 
              print-color-adjust: exact !important;
              -webkit-print-color-adjust: exact !important;
            }
            .print\\:hidden { display: none !important; }
            .print\\:p-0 { padding: 0 !important; }
            .print\\:shadow-none { box-shadow: none !important; }
            .print\\:border-none { border: none !important; }
            @page { 
              margin: 15mm; 
              size: A4; 
            }
            * {
              font-family: 'Times New Roman', serif !important;
              font-size: 12pt !important;
              line-height: 1.4 !important;
            }
            .container {
              max-width: none !important;
              padding: 0 !important;
            }
          }
        `
      }} />
    </div>
  );
};

export default Preview;
