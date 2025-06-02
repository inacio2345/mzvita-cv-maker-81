
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Calendar, Download, Edit } from 'lucide-react';
import { UserProfile } from '@/hooks/useUserProfile';

interface StatsSectionProps {
  profile: UserProfile;
  totalRascunhos?: number;
}

const StatsSection = ({ profile, totalRascunhos = 0 }: StatsSectionProps) => {
  const stats = [
    {
      title: 'Total de CVs',
      value: profile.total_cvs,
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Downloads Realizados',
      value: profile.downloads_realizados,
      icon: Download,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Rascunhos',
      value: totalRascunhos,
      icon: Edit,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    {
      title: 'Último Acesso',
      value: new Date(profile.ultimo_login).toLocaleDateString('pt-BR'),
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Estatísticas da Conta</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${stat.bgColor} mb-3`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.title}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsSection;
