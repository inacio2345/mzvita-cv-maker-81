
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
          <Card className="bg-white shadow-lg print:shadow-none print:border-none min-h-[297mm]">
            <div className="p-8 print:p-6" style={{ fontFamily: 'Times New Roman, serif' }}>
              {/* Header Section */}
              <div className="border-b-2 border-gray-300 pb-6 mb-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {cvData.personalData?.fullName || 'Seu Nome'}
                    </h1>
                    <div className="space-y-1 text-gray-700">
                      {cvData.personalData?.email && (
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 mr-2" />
                          <span>{cvData.personalData.email}</span>
                        </div>
                      )}
                      {cvData.personalData?.phone && (
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 mr-2" />
                          <span>{cvData.personalData.phone}</span>
                        </div>
                      )}
                      {cvData.personalData?.address && (
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span>{cvData.personalData.address}</span>
                        </div>
                      )}
                      {cvData.personalData?.website && (
                        <div className="flex items-center">
                          <Globe className="w-4 h-4 mr-2" />
                          <span>{cvData.personalData.website}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  {cvData.personalData?.profileImage && (
                    <div className="ml-6">
                      <img
                        src={cvData.personalData.profileImage}
                        alt="Profile"
                        className="w-24 h-24 rounded-lg object-cover border"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* About Section */}
              {cvData.about && (
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1">
                    Sobre Mim
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {cvData.about}
                  </p>
                </div>
              )}

              {/* Experience Section */}
              {cvData.experience?.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1">
                    Experiência Profissional
                  </h2>
                  <div className="space-y-4">
                    {cvData.experience.map((exp, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {exp.position}
                          </h3>
                          <div className="text-sm text-gray-600 flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {exp.startDate} - {exp.current ? 'Presente' : exp.endDate}
                          </div>
                        </div>
                        <p className="text-gray-700 font-medium mb-2">{exp.company}</p>
                        {exp.description && (
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {exp.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education Section */}
              {cvData.education?.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1">
                    Formação Académica
                  </h2>
                  <div className="space-y-3">
                    {cvData.education.map((edu, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              {edu.degree}
                            </h3>
                            <p className="text-gray-700">{edu.institution}</p>
                            {edu.field && (
                              <p className="text-gray-600 text-sm">{edu.field}</p>
                            )}
                          </div>
                          {edu.endYear && (
                            <span className="text-sm text-gray-600">{edu.endYear}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills Section */}
              {cvData.skills && Object.values(cvData.skills).some(skillArray => skillArray?.length > 0) && (
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1">
                    Habilidades e Competências
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {cvData.skills.technical?.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Habilidades Técnicas</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          {cvData.skills.technical.map((skill, index) => (
                            <li key={index}>• {skill}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {cvData.skills.soft?.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Habilidades Interpessoais</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          {cvData.skills.soft.map((skill, index) => (
                            <li key={index}>• {skill}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {cvData.skills.languages?.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Idiomas</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          {cvData.skills.languages.map((skill, index) => (
                            <li key={index}>• {skill}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {cvData.skills.tools?.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Ferramentas e Software</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          {cvData.skills.tools.map((skill, index) => (
                            <li key={index}>• {skill}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body { print-color-adjust: exact; }
          .print\\:hidden { display: none !important; }
          .print\\:p-0 { padding: 0 !important; }
          .print\\:p-6 { padding: 1.5rem !important; }
          .print\\:shadow-none { box-shadow: none !important; }
          .print\\:border-none { border: none !important; }
          @page { margin: 1cm; size: A4; }
        }
      `}</style>
    </div>
  );
};

export default Preview;
