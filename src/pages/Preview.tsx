
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Download, Edit, FileText, Mail, Phone, MapPin, Globe } from 'lucide-react';

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
          <Card className="bg-white shadow-lg print:shadow-none print:border-none">
            <div className="flex min-h-[842px]" style={{ fontFamily: 'Times New Roman, serif' }}>
              {/* Left Column - Main Content */}
              <div className="flex-1 p-8 bg-gray-50">
                {/* Header with Name and Title */}
                <div className="mb-8">
                  <h1 className="text-4xl font-bold text-gray-900 mb-2 uppercase tracking-wide">
                    {cvData.personalData?.fullName || 'SEU NOME'}
                  </h1>
                  <div className="text-lg text-gray-700 mb-4">
                    {cvData.personalData?.profession || 'Sua Profissão & Especialidade'}
                  </div>
                </div>

                {/* About Section */}
                {cvData.about && (
                  <div className="mb-8">
                    <div className="bg-gray-800 text-white px-4 py-2 rounded-full inline-block mb-4">
                      <h2 className="text-sm font-bold uppercase">Sobre mim</h2>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm">
                      <p className="text-gray-700 leading-relaxed text-justify">
                        {cvData.about}
                      </p>
                    </div>
                  </div>
                )}

                {/* Skills Section */}
                {cvData.skills && hasItems(cvData.skills.technical) && (
                  <div className="mb-8">
                    <div className="bg-gray-800 text-white px-4 py-2 rounded-full inline-block mb-4">
                      <h2 className="text-sm font-bold uppercase">Atuação</h2>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm">
                      <div className="space-y-3">
                        {cvData.skills.technical.slice(0, 5).map((skill: string, index: number) => (
                          <div key={index} className="flex justify-between items-center">
                            <span className="text-gray-800 font-medium">{skill}</span>
                            <span className="text-gray-600 font-bold">
                              {85 + Math.floor(Math.random() * 15)}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Education Section */}
                {hasItems(cvData.education) && (
                  <div className="mb-8">
                    <div className="bg-gray-800 text-white px-4 py-2 rounded-full inline-block mb-4">
                      <h2 className="text-sm font-bold uppercase">Educação</h2>
                    </div>
                    <div className="space-y-4">
                      {cvData.education.map((edu: any, index: number) => (
                        <div key={index} className="flex items-start">
                          <div className="w-2 h-2 bg-gray-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                          <div>
                            <p className="text-gray-800 font-medium">
                              {edu.degree} em {edu.institution} em {edu.endYear || 'Presente'}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Additional Skills */}
                {cvData.skills && hasItems(cvData.skills.soft) && (
                  <div className="mb-8">
                    <div className="bg-gray-800 text-white px-4 py-2 rounded-full inline-block mb-4">
                      <h2 className="text-sm font-bold uppercase">Formação</h2>
                    </div>
                    <div className="space-y-2">
                      {cvData.skills.soft.map((skill: string, index: number) => (
                        <div key={index} className="flex items-start">
                          <div className="w-2 h-2 bg-gray-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                          <span className="text-gray-800">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contact Section */}
                <div>
                  <div className="bg-gray-800 text-white px-4 py-2 rounded-full inline-block mb-4">
                    <h2 className="text-sm font-bold uppercase">Contato</h2>
                  </div>
                  <div className="space-y-3">
                    {cvData.personalData?.phone && (
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-3 text-gray-600" />
                        <span className="text-gray-800">{cvData.personalData.phone}</span>
                      </div>
                    )}
                    {cvData.personalData?.website && (
                      <div className="flex items-center">
                        <Globe className="w-4 h-4 mr-3 text-gray-600" />
                        <span className="text-gray-800">{cvData.personalData.website}</span>
                      </div>
                    )}
                    {cvData.personalData?.address && (
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-3 text-gray-600" />
                        <span className="text-gray-800">{cvData.personalData.address}</span>
                      </div>
                    )}
                    {cvData.personalData?.email && (
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-3 text-gray-600" />
                        <span className="text-gray-800">{cvData.personalData.email}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column - Experience */}
              <div className="w-2/5 p-8 bg-green-100">
                {/* Profile Image */}
                {cvData.personalData?.profileImage && (
                  <div className="flex justify-center mb-8">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                      <img
                        src={cvData.personalData.profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}

                {/* Experience Section */}
                {hasItems(cvData.experience) && (
                  <div className="mb-8">
                    <div className="bg-gray-800 text-white px-4 py-2 rounded-full inline-block mb-6">
                      <h2 className="text-sm font-bold uppercase">Experiência Profissional</h2>
                    </div>
                    <div className="space-y-6">
                      {cvData.experience.map((exp: any, index: number) => (
                        <div key={index}>
                          <div className="bg-white p-4 rounded-xl shadow-sm">
                            <h3 className="text-lg font-bold text-gray-900 mb-1">
                              {exp.company} ({exp.startDate} - {exp.current ? 'Presente' : exp.endDate})
                            </h3>
                            <h4 className="text-base font-semibold text-gray-700 mb-3">
                              Cargo: {exp.position}
                            </h4>
                            {exp.description && (
                              <ul className="space-y-2 text-sm text-gray-700">
                                {exp.description.split('.').filter(Boolean).slice(0, 3).map((item: string, i: number) => (
                                  <li key={i} className="flex items-start">
                                    <span className="w-1.5 h-1.5 bg-gray-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                    <span>{item.trim()}.</span>
                                  </li>
                                ))}
                              </ul>
                            )}
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
              margin: 0.5cm; 
              size: A4; 
            }
            * {
              font-family: 'Times New Roman', serif !important;
            }
          }
        `
      }} />
    </div>
  );
};

export default Preview;
