
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Edit, Eye, Star } from 'lucide-react';

const Exemplos = () => {
  const navigate = useNavigate();

  const exemplosCv = [
    {
      id: 1,
      nome: "CV Profissional Azul",
      categoria: "Corporativo",
      rating: 4.8,
      preview: "/lovable-uploads/5b6ca5ab-a64b-47e8-a7c5-7799482fe3ef.png",
      dados: {
        personalData: {
          fullName: "Maria Silva Santos",
          profession: "Gestora de Marketing",
          email: "maria.santos@email.com",
          phone: "+258 84 123 4567",
          address: "Maputo, Moçambique",
          website: "linkedin.com/in/mariasilva"
        },
        about: "Profissional experiente em marketing digital com mais de 5 anos de experiência no desenvolvimento de estratégias de marca e campanhas publicitárias. Especializada em redes sociais, SEO e análise de dados para otimização de resultados.",
        education: [
          {
            degree: "Licenciatura em Marketing",
            institution: "Universidade Eduardo Mondlane",
            startYear: "2016",
            endYear: "2020"
          }
        ],
        experience: [
          {
            position: "Gestora de Marketing",
            company: "Empresa Digital Lda",
            startDate: "Jan 2021",
            endDate: "Presente",
            current: true,
            description: "Desenvolvimento de estratégias de marketing digital. Gestão de campanhas nas redes sociais. Análise de métricas e relatórios de performance."
          }
        ],
        skills: {
          technical: ["Marketing Digital", "Google Analytics", "Photoshop", "Excel"],
          soft: ["Liderança", "Comunicação", "Criatividade", "Trabalho em Equipa"]
        },
        colorPalette: {
          primary: "#2563eb",
          secondary: "#1e40af",
          accent: "#3b82f6"
        }
      }
    },
    {
      id: 2,
      nome: "CV Criativo Verde",
      categoria: "Criativo",
      rating: 4.9,
      preview: "/lovable-uploads/5b6ca5ab-a64b-47e8-a7c5-7799482fe3ef.png",
      dados: {
        personalData: {
          fullName: "João Carlos Manhiça",
          profession: "Designer Gráfico",
          email: "joao.manhica@email.com",
          phone: "+258 87 987 6543",
          address: "Beira, Moçambique",
          website: "behance.net/joaomanhica"
        },
        about: "Designer gráfico criativo com paixão por criar soluções visuais inovadoras. Experiência em design de marca, materiais promocionais e design digital. Sempre buscando novas tendências e técnicas para entregar resultados excepcionais.",
        education: [
          {
            degree: "Licenciatura em Design Gráfico",
            institution: "Instituto Superior de Artes e Cultura",
            startYear: "2017",
            endYear: "2021"
          }
        ],
        experience: [
          {
            position: "Designer Gráfico Sénior",
            company: "Agência Criativa Moz",
            startDate: "Fev 2022",
            endDate: "Presente",
            current: true,
            description: "Criação de identidades visuais para marcas. Desenvolvimento de materiais publicitários. Coordenação de projetos de design."
          }
        ],
        skills: {
          technical: ["Adobe Creative Suite", "Figma", "Illustrator", "InDesign"],
          soft: ["Criatividade", "Atenção aos Detalhes", "Gestão de Tempo", "Colaboração"]
        },
        colorPalette: {
          primary: "#059669",
          secondary: "#047857",
          accent: "#10b981"
        }
      }
    },
    {
      id: 3,
      nome: "CV Elegante Roxo",
      categoria: "Executivo",
      rating: 4.7,
      preview: "/lovable-uploads/5b6ca5ab-a64b-47e8-a7c5-7799482fe3ef.png",
      dados: {
        personalData: {
          fullName: "Ana Lucia Tembe",
          profession: "Directora Financeira",
          email: "ana.tembe@email.com",
          phone: "+258 82 555 7890",
          address: "Maputo, Moçambique",
          website: "linkedin.com/in/anatembe"
        },
        about: "Directora financeira experiente com mais de 10 anos na área de finanças corporativas. Especializada em planeamento financeiro estratégico, análise de investimentos e gestão de riscos. Forte liderança e capacidade analítica.",
        education: [
          {
            degree: "MBA em Finanças",
            institution: "Universidade Católica de Moçambique",
            startYear: "2018",
            endYear: "2020"
          },
          {
            degree: "Licenciatura em Economia",
            institution: "Universidade Eduardo Mondlane",
            startYear: "2010",
            endYear: "2014"
          }
        ],
        experience: [
          {
            position: "Directora Financeira",
            company: "Grupo Empresarial Moz",
            startDate: "Jan 2020",
            endDate: "Presente",
            current: true,
            description: "Gestão estratégica das finanças corporativas. Planeamento orçamental e controlo financeiro. Liderança da equipa de contabilidade e finanças."
          }
        ],
        skills: {
          technical: ["Análise Financeira", "SAP", "Excel Avançado", "Power BI"],
          soft: ["Liderança", "Pensamento Estratégico", "Comunicação", "Tomada de Decisões"]
        },
        colorPalette: {
          primary: "#7c3aed",
          secondary: "#6d28d9",
          accent: "#8b5cf6"
        }
      }
    },
    {
      id: 4,
      nome: "CV Moderno Laranja",
      categoria: "Tecnologia",
      rating: 4.6,
      preview: "/lovable-uploads/5b6ca5ab-a64b-47e8-a7c5-7799482fe3ef.png",
      dados: {
        personalData: {
          fullName: "Pedro Miguel Cossa",
          profession: "Desenvolvedor Full Stack",
          email: "pedro.cossa@email.com",
          phone: "+258 86 111 2233",
          address: "Maputo, Moçambique",
          website: "github.com/pedrocossa"
        },
        about: "Desenvolvedor full stack apaixonado por tecnologia e inovação. Experiência em desenvolvimento web com React, Node.js e bases de dados. Sempre em busca de novos desafios e tecnologias emergentes.",
        education: [
          {
            degree: "Licenciatura em Engenharia Informática",
            institution: "Universidade Eduardo Mondlane",
            startYear: "2018",
            endYear: "2022"
          }
        ],
        experience: [
          {
            position: "Desenvolvedor Full Stack",
            company: "TechSolutions Moz",
            startDate: "Mar 2022",
            endDate: "Presente",
            current: true,
            description: "Desenvolvimento de aplicações web responsivas. Implementação de APIs RESTful. Manutenção e optimização de bases de dados."
          }
        ],
        skills: {
          technical: ["React", "Node.js", "Python", "MySQL", "Git", "Docker"],
          soft: ["Resolução de Problemas", "Aprendizagem Rápida", "Trabalho em Equipa", "Adaptabilidade"]
        },
        colorPalette: {
          primary: "#ea580c",
          secondary: "#dc2626",
          accent: "#f97316"
        }
      }
    }
  ];

  const handleUseTemplate = (exemplo) => {
    navigate('/criar-cv', { state: { templateData: exemplo.dados } });
  };

  const handlePreview = (exemplo) => {
    navigate('/preview', { state: { cvData: exemplo.dados } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="flex items-center text-gray-600 hover:text-google-blue"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Início
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-google-blue to-google-green rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Exemplos de CV</h1>
            </div>
            <Button
              onClick={() => navigate('/criar-cv')}
              className="bg-google-blue hover:bg-blue-600 text-white flex items-center"
            >
              <FileText className="w-4 h-4 mr-2" />
              Criar do Zero
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            Escolha seu Modelo de CV
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Selecione um dos nossos modelos profissionais e personalize com suas informações. 
            Todos os modelos são totalmente editáveis e prontos para impressão.
          </p>
        </div>

        {/* Templates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {exemplosCv.map((exemplo) => (
            <Card key={exemplo.id} className="overflow-hidden hover:shadow-lg transition-shadow border-0 shadow-md">
              {/* Preview Image */}
              <div className="relative h-64 bg-gray-100">
                <img
                  src={exemplo.preview}
                  alt={exemplo.nome}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <div className="bg-white px-2 py-1 rounded-full flex items-center text-sm">
                    <Star className="w-3 h-3 text-yellow-500 mr-1 fill-current" />
                    {exemplo.rating}
                  </div>
                </div>
                <div className="absolute top-2 left-2">
                  <span className="bg-google-blue text-white px-2 py-1 rounded-full text-xs">
                    {exemplo.categoria}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2 text-gray-900">
                  {exemplo.nome}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Modelo profissional perfeito para {exemplo.categoria.toLowerCase()}
                </p>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePreview(exemplo)}
                    className="flex-1 flex items-center justify-center"
                  >
                    <Eye className="w-3 h-3 mr-1" />
                    Ver
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleUseTemplate(exemplo)}
                    className="flex-1 bg-google-blue hover:bg-blue-600 text-white flex items-center justify-center"
                  >
                    <Edit className="w-3 h-3 mr-1" />
                    Usar
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Card className="p-8 max-w-2xl mx-auto border-0 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Não encontrou o que procura?
            </h2>
            <p className="text-gray-600 mb-6">
              Crie seu CV personalizado do zero com nosso editor intuitivo
            </p>
            <Button
              size="lg"
              onClick={() => navigate('/criar-cv')}
              className="bg-gradient-to-r from-google-blue to-google-green hover:from-google-green hover:to-google-blue text-white px-8 py-4"
            >
              <FileText className="w-5 h-5 mr-2" />
              Criar CV do Zero
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Exemplos;
