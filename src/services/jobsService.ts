import { supabase } from '@/lib/supabase';

export interface JobOpportunity {
  id: string;
  title: string;
  company: string;
  location: string;
  category: string;
  type: string;
  postedDate: string;
  deadline: string;
  salary: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  featured?: boolean;
}

export const mockJobs: JobOpportunity[] = [
  {
    id: '1',
    title: 'Assistente Administrativo & Logística',
    company: 'Sasol Moçambique',
    location: 'Maputo / Inhambane',
    category: 'Oil & Gas / Logística',
    type: 'Tempo Inteiro',
    postedDate: 'Hoje',
    deadline: '15 de Setembro de 2026',
    salary: '45.000 - 65.000 MT',
    featured: true,
    description: 'Gestão de documentação de processos logísticos, atendimento e suporte às operações de escritório em Maputo e Pande.',
    requirements: [
      'Licenciatura em Administração, Gestão ou Contabilidade',
      'Mínimo de 2 anos de experiência comprovada',
      'Domínio de MS Excel avançado e software ERP',
      'Fluência em Português e Inglês funcional'
    ],
    responsibilities: [
      'Organizar dossiers de fornecedores e ordens de compra',
      'Coordenar transporte e logística de equipas',
      'Elaborar relatórios mensais de desempenho operacional'
    ]
  },
  {
    id: '2',
    title: 'Analista de Operações Bancárias',
    company: 'Millennium bim',
    location: 'Maputo (Sede)',
    category: 'Banca & Finanças',
    type: 'Tempo Inteiro',
    postedDate: 'Há 1 dia',
    deadline: '20 de Setembro de 2026',
    salary: '50.000 - 75.000 MT',
    featured: true,
    description: 'Análise de operações de crédito, compliance financeiro e atendimento a clientes empresariais corporativos.',
    requirements: [
      'Licenciatura em Economia, Finanças ou Gestão Bancária',
      'Conhecimento do sistema bancário moçambicano (Banco de Moçambique)',
      'Capacidade analítica e atenção ao detalhe'
    ],
    responsibilities: [
      'Avaliar propostas de crédito e risco operacional',
      'Garantir conformidade com regulamentos do BM',
      'Acompanhar carteira de clientes corporate'
    ]
  },
  {
    id: '3',
    title: 'Técnico de Manutenção Industrial',
    company: 'TotalEnergies EP Mozambique',
    location: 'Pemba / Afungi (Cabo Delgado)',
    category: 'Oil & Gas / Engenharia',
    type: 'Regime Rotação (28/28)',
    postedDate: 'Há 2 dias',
    deadline: '18 de Setembro de 2026',
    salary: '85.000 - 120.000 MT',
    featured: true,
    description: 'Manutenção preventiva e corretiva de equipamentos mecânicos e elétricos na base logística de Palma/Pemba.',
    requirements: [
      'Nível Técnico Médio ou Superior em Engenharia Mecânica/Eletrotécnica',
      'Carta de Condução válida',
      'Certificados de Segurança no Trabalho (HSE)',
      'Disponibilidade para trabalhar em rotação'
    ],
    responsibilities: [
      'Inspecionar bombas e geradores industriais',
      'Registar avarias e emitir ordens de reparação',
      'Cumprir rigorosamente normas internacionais de HSE'
    ]
  },
  {
    id: '4',
    title: 'Oficial de Recursos Humanos',
    company: 'Organização Internacional de Saúde (ONG)',
    location: 'Beira (Sofala)',
    category: 'Saúde & ONGs',
    type: 'Tempo Inteiro',
    postedDate: 'Há 3 dias',
    deadline: '22 de Setembro de 2026',
    salary: '55.000 - 80.000 MT',
    description: 'Gestão de contratações, processamento de salários (payroll) e gestão de desempenho do pessoal de campo.',
    requirements: [
      'Licenciatura em Gestão de Recursos Humanos ou Psicologia Organizacional',
      'Mínimo de 3 anos de experiência no setor de ONGs em Moçambique',
      'Conhecimento aprofundado da Lei do Trabalho de Moçambique (Lei 23/2007)'
    ],
    responsibilities: [
      'Conduzir processos de recrutamento e seleção',
      'Gerir contratos e benefícios dos trabalhadores',
      'Coordenar formações de capacitação técnica'
    ]
  },
  {
    id: '5',
    title: 'Desenvolvedor Web & Suporte TI',
    company: 'Vodacom Moçambique',
    location: 'Maputo',
    category: 'TI & Tecnologia',
    type: 'Híbrido',
    postedDate: 'Há 4 dias',
    deadline: '25 de Setembro de 2026',
    salary: '60.000 - 90.000 MT',
    description: 'Manutenção de sistemas internos, suporte a aplicações web e integração de APIs de pagamento M-Pesa.',
    requirements: [
      'Licenciatura ou Experiência Prática em Engenharia Informática',
      'Conhecimentos em React, JavaScript/TypeScript, SQL e Node.js',
      'Familiaridade com segurança da informação'
    ],
    responsibilities: [
      'Desenvolver módulos para portais internos',
      'Prestar suporte de 2º nível às equipas operacionais',
      'Monitorar estabilidade de serviços críticos'
    ]
  },
  {
    id: '6',
    title: 'Motorista Profissional de Pesados',
    company: 'Bolloré Logistics Moçambique',
    location: 'Nampula / Nacala',
    category: 'Logística & Condução',
    type: 'Tempo Inteiro',
    postedDate: 'Há 5 dias',
    deadline: '30 de Setembro de 2026',
    salary: '35.000 - 50.000 MT',
    description: 'Condução de camiões articulados para transporte de mercadorias no corredor de Nacala e centro do país.',
    requirements: [
      'Carta de Condução Profissional (Serviços / Pesados)',
      'Experiência mínima de 4 anos no transporte de carga',
      'Registo criminal limpo e certificado de saúde válido'
    ],
    responsibilities: [
      'Transportar mercadorias com segurança nas rotas designadas',
      'Verificar estado mecânico do veículo antes de cada viagem',
      'Preencher guias de marcha e relatórios de combustível'
    ]
  }
];

export const getJobs = async (
  searchTerm: string = '',
  city: string = 'Todas',
  category: string = 'Todas'
): Promise<JobOpportunity[]> => {
  let allJobs: JobOpportunity[] = [];

  // 1. Buscar vagas de parceiros
  try {
    const { data: partnerJobs, error: partnerError } = await supabase
      .from('partner_jobs')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (!partnerError && partnerJobs) {
      const formattedPartnerJobs = partnerJobs.map((job: any) => ({
        id: job.id,
        title: job.title,
        company: job.company,
        location: job.location,
        category: job.category,
        type: job.job_type || 'Tempo Inteiro',
        salary: job.salary || 'Salário não especificado',
        postedDate: new Date(job.created_at).toLocaleDateString('pt-PT'),
        deadline: job.deadline || 'Ver na descrição',
        description: job.description || '',
        requirements: job.requirements || ['Ver descrição completa'],
        responsibilities: job.responsibilities || ['Ver descrição completa'],
        featured: true, // Vagas de parceiros ganham destaque
        application_url: job.application_url,
        application_email: job.application_email
      }));
      allJobs = [...allJobs, ...formattedPartnerJobs];
    }
  } catch (error) {
    console.error('Erro ao carregar vagas de parceiros:', error);
  }

  try {
    // 2. Tentar chamar a API Real via Supabase Edge Function (SerpApi)
    const { data, error } = await supabase.functions.invoke('fetch-jobs', {
      body: { searchTerm, city, category }
    });

    if (error) throw error;
    if (data && data.jobs && data.jobs.length > 0) {
      allJobs = [...allJobs, ...data.jobs];
      // Já podemos filtrar e devolver o que tivermos (parceiros + api)
      return filterJobs(allJobs, searchTerm, city, category);
    }
    
    // Se a API não devolver nada, mas tivermos parceiros, devolvemos os parceiros filtrados
    if (allJobs.length > 0) {
      return filterJobs(allJobs, searchTerm, city, category);
    }
    
    // Se não retornar vagas, faz fallback pro mock
    console.warn("Nenhuma vaga encontrada na API, usando mock.");
  } catch (error) {
    console.error('Erro ao buscar vagas da API, fazendo fallback para o mock:', error);
  }

  // Fallback seguro: Filtra os mocks locais + parceiros
  let filtered = [...allJobs, ...mockJobs];

  return filterJobs(filtered, searchTerm, city, category);
};

// Helper function para filtrar localmente
const filterJobs = (jobs: JobOpportunity[], searchTerm: string, city: string, category: string) => {
  let filtered = jobs;
  
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filtered = filtered.filter(
      (job) =>
        job.title.toLowerCase().includes(term) ||
        job.company.toLowerCase().includes(term) ||
        job.description.toLowerCase().includes(term)
    );
  }

  if (city && city !== 'Todas') {
    filtered = filtered.filter((job) => job.location.includes(city));
  }

  if (category && category !== 'Todas') {
    filtered = filtered.filter((job) => job.category.includes(category));
  }

  return filtered;
};

export const getAllJobsForAiContext = async (): Promise<string> => {
  // Gera uma string resumida das vagas para injetar no prompt da IA
  const jobs = await getJobs();
  return jobs.map(j => `- ${j.title} na ${j.company} (${j.location})`).join('\n');
};
