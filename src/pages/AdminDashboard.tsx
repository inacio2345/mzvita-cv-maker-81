import React from 'react';
import { motion } from 'framer-motion';
import { Users, Megaphone, ShoppingCart, LayoutDashboard, ArrowRight, Shield, BookOpen, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function AdminDashboard() {
  const navigate = useNavigate();

  const adminCards = [
    {
      title: 'Gerir Blog & Artigos IA',
      description: 'Criar artigos com Inteligência Artificial e publicar no blog.',
      icon: BookOpen,
      color: 'text-purple-600',
      bgColor: 'bg-purple-600/10',
      path: '/admin/blog'
    },
    {
      title: 'Gerir Vagas de Emprego',
      description: 'Cadastrar e gerir oportunidades de trabalho no feed.',
      icon: Briefcase,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-600/10',
      path: '/admin/vagas'
    },
    {
      title: 'Gerir Afiliados',
      description: 'Aprovar novos afiliados e gerir comissões.',
      icon: Users,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10',
      path: '/admin/afiliados'
    },
    {
      title: 'Gerir Anúncios',
      description: 'Configurar anúncios globais e visibilidade.',
      icon: Megaphone,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      path: '/admin/anuncios'
    },
    {
      title: 'Carrinhos Abandonados',
      description: 'Visualizar e contactar potenciais clientes.',
      icon: ShoppingCart,
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/10',
      path: '/admin/carrinhos-abandonados'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-20 pt-2 px-4 md:px-8 w-full max-w-[1200px] mx-auto font-sans">
      
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-slate-900 tracking-tight">
          Dashboard Admin
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Visão geral do sistema. Selecione um módulo para gerir.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {adminCards.map((card, index) => (
          <div
            key={card.title}
            className="bg-white rounded-lg p-5 shadow-sm border border-slate-200 flex flex-col h-full hover:border-slate-300 transition-colors"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded border border-slate-200 bg-slate-50 flex items-center justify-center shrink-0">
                <card.icon className="w-4 h-4 text-slate-600" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900">{card.title}</h3>
            </div>
            
            <p className="text-slate-500 text-xs flex-1 mb-5">
              {card.description}
            </p>

            <Button 
              variant="outline"
              size="sm"
              className="w-full h-8 text-xs font-medium border-slate-200 text-slate-700 hover:bg-slate-50"
              onClick={() => navigate(card.path)}
            >
              Abrir Módulo
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
