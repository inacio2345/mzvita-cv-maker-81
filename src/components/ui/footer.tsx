import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UniversalAd from '../ads/UniversalAd';
import { Facebook, Instagram, Linkedin, MessageCircle, ArrowRight, Mail } from 'lucide-react';
import { Button } from './button';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-slate-950 text-slate-300 py-16 border-t border-slate-900 relative overflow-hidden">
      {/* Decorative background blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brand-700 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-700 blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <UniversalAd slotName="footer" className="mb-16" fallbackHeight="250px" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link to="/" className="inline-block mb-6">
              <img src="/logo.png" alt="MozVita Logo" className="h-16 w-auto object-contain brightness-0 invert opacity-90 hover:opacity-100 transition-opacity" />
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-sm">
              A principal plataforma de criação de currículos de Moçambique. Desenvolvida para ajudar profissionais a conquistarem as melhores vagas no mercado nacional e internacional.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-brand-600 hover:border-brand-500 transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-brand-600 hover:border-brand-500 transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-brand-600 hover:border-brand-500 transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://wa.me/258" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-green-600 hover:border-green-500 transition-all">
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Ferramentas</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><Link to="/modelos" className="hover:text-brand-400 transition-colors">Criador de CV</Link></li>
              <li><Link to="/modelos" className="hover:text-brand-400 transition-colors">Modelos de CV</Link></li>
              <li><Link to="/carta-apresentacao" className="hover:text-brand-400 transition-colors">Cartas de Apresentação</Link></li>
              <li><Link to="/carta-pedido-estagio" className="hover:text-brand-400 transition-colors">Cartas de Estágio</Link></li>
              <li><Link to="/carta-demissao" className="hover:text-brand-400 transition-colors">Cartas de Demissão</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Recursos</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><Link to="/cv-mocambique" className="hover:text-brand-400 transition-colors">CV Moçambique</Link></li>
              <li><Link to="/cv-em-ingles-mocambique" className="hover:text-brand-400 transition-colors">CV em Inglês</Link></li>
              <li><Link to="/blog/guia-cv-2026" className="hover:text-brand-400 transition-colors">Guia de Carreira</Link></li>
              <li><Link to="/blog" className="hover:text-brand-400 transition-colors">Blog MozVita</Link></li>
              <li><Link to="/meu-emprego" className="hover:text-brand-400 transition-colors">Vagas de Emprego</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Empresa</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><Link to="/sobre-nos" className="hover:text-brand-400 transition-colors">Sobre Nós</Link></li>
              <li><Link to="/precos" className="hover:text-brand-400 transition-colors">Planos e Preços</Link></li>
              <li><Link to="/afiliado" className="text-brand-400 hover:text-brand-300 font-bold transition-colors flex items-center gap-2">Seja Afiliado</Link></li>
              <li><Link to="/contato" className="hover:text-brand-400 transition-colors">Fale Conosco</Link></li>
              <li><Link to="/como-funciona" className="hover:text-brand-400 transition-colors">Como Funciona</Link></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-2">
             <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Newsletter</h4>
             <p className="text-slate-400 text-sm mb-4">Receba dicas de carreira e vagas semanais.</p>
             <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input 
                    type="email" 
                    placeholder="Seu melhor e-mail" 
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500 transition-colors"
                  />
                </div>
                <Button className="w-full bg-brand-600 hover:bg-brand-500 text-white border-0">
                  Inscrever-se
                </Button>
             </form>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <p>&copy; {new Date().getFullYear()} MozVita. Todos os direitos reservados.</p>
          </div>
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <Link to="/termos-de-uso" className="hover:text-white transition-colors">Termos</Link>
            <Link to="/politica-de-privacidade" className="hover:text-white transition-colors">Privacidade</Link>
            <div className="flex items-center gap-2 opacity-70">
               {/* Simulação de logos de pagamento */}
               <div className="h-6 w-10 bg-slate-800 rounded flex items-center justify-center text-[8px] font-bold">M-PESA</div>
               <div className="h-6 w-10 bg-slate-800 rounded flex items-center justify-center text-[8px] font-bold">E-MOLA</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
