
import React from 'react';
import { FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-google-blue to-google-green rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">MzVita CV</span>
            </div>
            <p className="text-gray-400">
              A melhor plataforma para criar CVs profissionais em Moçambique.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Produto</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/como-funciona" className="hover:text-white transition-colors">Como funciona</a></li>
              <li><a href="/exemplos" className="hover:text-white transition-colors">Modelos</a></li>
              <li><a href="/precos" className="hover:text-white transition-colors">Preços</a></li>
              <li><a href="/criar-cv" className="hover:text-white transition-colors">Criar CV</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Suporte</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/contato" className="hover:text-white transition-colors">Central de Ajuda</a></li>
              <li><a href="/contato" className="hover:text-white transition-colors">Contato</a></li>
              <li><a href="https://api.whatsapp.com/send?phone=258841524822&text=Ol%C3%A1%2C%20tenho%20interesse%20nos%20seus%20servi%C3%A7os.%20Pode%20me%20dar%20mais%20informa%C3%A7%C3%B5es%3F" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WhatsApp</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/termos-de-uso" className="hover:text-white transition-colors">Termos de Uso</a></li>
              <li><a href="/politica-de-privacidade" className="hover:text-white transition-colors">Privacidade</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 MzVita CV. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
