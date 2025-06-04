
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Users, AlertTriangle, CreditCard, Shield, Scale, FileText } from 'lucide-react';
import Footer from '@/components/ui/footer';

const TermosUso = () => {
  const navigate = useNavigate();

  const sections = [
    {
      icon: <Users className="w-5 h-5 sm:w-6 sm:h-6 text-google-blue" />,
      title: "Aceitação dos Termos",
      content: "Ao usar nossos serviços, você concorda com estes termos. Se não concordar, não deve usar nossos serviços. Estes termos se aplicam a todos os usuários do MozVita."
    },
    {
      icon: <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-google-green" />,
      title: "Descrição do Serviço",
      content: "O MozVita é uma plataforma online para criação de currículos profissionais. Oferecemos templates, ferramentas de edição e download em PDF para ajudar na criação de CVs."
    },
    {
      icon: <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-google-red" />,
      title: "Pagamentos e Assinaturas",
      content: "Oferecemos planos gratuitos e pagos. Os pagamentos são processados através de M-Pesa, E-Mola e Mkesh. As cobranças ocorrem conforme o plano escolhido."
    },
    {
      icon: <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-google-yellow" />,
      title: "Propriedade Intelectual",
      content: "O conteúdo do site, incluindo design, código e templates, é propriedade do MozVita. Os usuários mantêm propriedade sobre o conteúdo dos seus CVs."
    },
    {
      icon: <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-google-blue" />,
      title: "Responsabilidades do Usuário",
      content: "Os usuários são responsáveis pela veracidade das informações fornecidas e pelo uso adequado da plataforma, não violando direitos de terceiros."
    },
    {
      icon: <Scale className="w-5 h-5 sm:w-6 sm:h-6 text-google-green" />,
      title: "Limitação de Responsabilidade",
      content: "Nossa responsabilidade é limitada ao valor pago pelo serviço. Não nos responsabilizamos por danos indiretos ou consequenciais decorrentes do uso do serviço."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 bg-gradient-to-r from-google-blue via-google-red to-google-green bg-clip-text text-transparent leading-tight">
            Termos de Uso
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-4 sm:mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed px-2">
            Conheça os termos e condições que regem o uso da nossa plataforma de criação de CVs.
          </p>
          <p className="text-xs sm:text-sm text-gray-500">
            Última atualização: Janeiro de 2024
          </p>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:gap-8">
            {sections.map((section, index) => (
              <Card key={index} className="p-4 sm:p-6 md:p-8 border-0 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex flex-col space-y-3 sm:space-y-4 md:flex-row md:space-y-0 md:space-x-4 lg:space-x-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0 mx-auto md:mx-0">
                    {section.icon}
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4">{section.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{section.content}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Detailed Terms */}
          <Card className="mt-6 sm:mt-8 md:mt-12 p-4 sm:p-6 md:p-8 border-0 shadow-lg">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 text-center md:text-left">Condições Específicas</h2>
            <div className="space-y-4 sm:space-y-6 text-gray-600">
              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-2 md:mb-3">Uso Permitido</h3>
                <ul className="list-disc list-inside space-y-1 md:space-y-2 text-sm sm:text-base pl-4">
                  <li>Criar CVs para uso pessoal e profissional</li>
                  <li>Baixar e imprimir seus CVs criados</li>
                  <li>Compartilhar CVs com potenciais empregadores</li>
                  <li>Editar e atualizar seus CVs conforme necessário</li>
                </ul>
              </div>
              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-2 md:mb-3">Uso Proibido</h3>
                <ul className="list-disc list-inside space-y-1 md:space-y-2 text-sm sm:text-base pl-4">
                  <li>Criar conteúdo falso, enganoso ou difamatório</li>
                  <li>Violar direitos autorais ou propriedade intelectual</li>
                  <li>Usar o serviço para fins ilegais ou não autorizados</li>
                  <li>Tentar quebrar ou contornar medidas de segurança</li>
                </ul>
              </div>
              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-2 md:mb-3">Cancelamento e Reembolso</h3>
                <p className="text-sm sm:text-base leading-relaxed">Você pode cancelar sua assinatura a qualquer momento. Reembolsos são processados conforme nossa política de reembolso, geralmente dentro de 30 dias da compra.</p>
              </div>
              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-2 md:mb-3">Modificações dos Termos</h3>
                <p className="text-sm sm:text-base leading-relaxed">Reservamos o direito de modificar estes termos a qualquer momento. Mudanças significativas serão comunicadas com antecedência.</p>
              </div>
              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-2 md:mb-3">Lei Aplicável</h3>
                <p className="text-sm sm:text-base leading-relaxed">Estes termos são regidos pelas leis de Moçambique. Qualquer disputa será resolvida nos tribunais competentes de Maputo.</p>
              </div>
            </div>
          </Card>

          {/* Contact Section */}
          <Card className="mt-6 sm:mt-8 p-4 sm:p-6 md:p-8 border-0 shadow-lg bg-gradient-to-r from-google-blue to-google-green text-white">
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 md:mb-4">Dúvidas sobre os Termos?</h2>
              <p className="text-base sm:text-lg md:text-xl mb-4 md:mb-6 opacity-90">
                Nossa equipe jurídica está disponível para esclarecer qualquer questão.
              </p>
              <Button 
                size="default"
                className="bg-white text-google-blue hover:bg-gray-100 text-sm sm:text-base px-6 py-2 sm:px-8 sm:py-3"
                onClick={() => navigate('/contato')}
              >
                Entrar em Contato
              </Button>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TermosUso;
