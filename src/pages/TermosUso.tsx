
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { FileText, Scale, Users, AlertTriangle, CreditCard, Shield } from 'lucide-react';
import Footer from '@/components/ui/footer';

const TermosUso = () => {
  const navigate = useNavigate();

  const sections = [
    {
      icon: <Users className="w-6 h-6 text-google-blue" />,
      title: "Aceitação dos Termos",
      content: "Ao usar nossos serviços, você concorda com estes termos. Se não concordar, não deve usar nossos serviços. Estes termos se aplicam a todos os usuários do MzVita CV."
    },
    {
      icon: <FileText className="w-6 h-6 text-google-green" />,
      title: "Descrição do Serviço",
      content: "O MzVita CV é uma plataforma online para criação de currículos profissionais. Oferecemos templates, ferramentas de edição e download em PDF para ajudar na criação de CVs."
    },
    {
      icon: <CreditCard className="w-6 h-6 text-google-red" />,
      title: "Pagamentos e Assinaturas",
      content: "Oferecemos planos gratuitos e pagos. Os pagamentos são processados através de M-Pesa, E-Mola e Mkesh. As cobranças ocorrem conforme o plano escolhido."
    },
    {
      icon: <Shield className="w-6 h-6 text-google-yellow" />,
      title: "Propriedade Intelectual",
      content: "O conteúdo do site, incluindo design, código e templates, é propriedade do MzVita CV. Os usuários mantêm propriedade sobre o conteúdo dos seus CVs."
    },
    {
      icon: <AlertTriangle className="w-6 h-6 text-google-blue" />,
      title: "Responsabilidades do Usuário",
      content: "Os usuários são responsáveis pela veracidade das informações fornecidas e pelo uso adequado da plataforma, não violando direitos de terceiros."
    },
    {
      icon: <Scale className="w-6 h-6 text-google-green" />,
      title: "Limitação de Responsabilidade",
      content: "Nossa responsabilidade é limitada ao valor pago pelo serviço. Não nos responsabilizamos por danos indiretos ou consequenciais decorrentes do uso do serviço."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
              <div className="w-10 h-10 bg-gradient-to-r from-google-blue to-google-green rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-google-blue to-google-green bg-clip-text text-transparent">
                MzVita CV
              </h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="/" className="text-gray-600 hover:text-google-blue transition-colors">Início</a>
              <a href="/como-funciona" className="text-gray-600 hover:text-google-blue transition-colors">Como Funciona</a>
              <a href="/precos" className="text-gray-600 hover:text-google-blue transition-colors">Preços</a>
              <a href="/contato" className="text-gray-600 hover:text-google-blue transition-colors">Contato</a>
            </nav>
            <Button variant="outline" className="border-google-blue text-google-blue hover:bg-google-blue hover:text-white">
              Entrar
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-google-blue via-google-red to-google-green bg-clip-text text-transparent">
            Termos de Uso
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Conheça os termos e condições que regem o uso da nossa plataforma de criação de CVs.
          </p>
          <p className="text-sm text-gray-500">
            Última atualização: Janeiro de 2024
          </p>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-8">
            {sections.map((section, index) => (
              <Card key={index} className="p-8 border-0 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    {section.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{section.content}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Detailed Terms */}
          <Card className="mt-12 p-8 border-0 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Condições Específicas</h2>
            <div className="space-y-6 text-gray-600">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Uso Permitido</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Criar CVs para uso pessoal e profissional</li>
                  <li>Baixar e imprimir seus CVs criados</li>
                  <li>Compartilhar CVs com potenciais empregadores</li>
                  <li>Editar e atualizar seus CVs conforme necessário</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Uso Proibido</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Criar conteúdo falso, enganoso ou difamatório</li>
                  <li>Violar direitos autorais ou propriedade intelectual</li>
                  <li>Usar o serviço para fins ilegais ou não autorizados</li>
                  <li>Tentar quebrar ou contornar medidas de segurança</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Cancelamento e Reembolso</h3>
                <p>Você pode cancelar sua assinatura a qualquer momento. Reembolsos são processados conforme nossa política de reembolso, geralmente dentro de 30 dias da compra.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Modificações dos Termos</h3>
                <p>Reservamos o direito de modificar estes termos a qualquer momento. Mudanças significativas serão comunicadas com antecedência.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Lei Aplicável</h3>
                <p>Estes termos são regidos pelas leis de Moçambique. Qualquer disputa será resolvida nos tribunais competentes de Maputo.</p>
              </div>
            </div>
          </Card>

          {/* Contact Section */}
          <Card className="mt-8 p-8 border-0 shadow-lg bg-gradient-to-r from-google-blue to-google-green text-white">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Dúvidas sobre os Termos?</h2>
              <p className="text-xl mb-6 opacity-90">
                Nossa equipe jurídica está disponível para esclarecer qualquer questão.
              </p>
              <Button 
                size="lg" 
                className="bg-white text-google-blue hover:bg-gray-100"
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
