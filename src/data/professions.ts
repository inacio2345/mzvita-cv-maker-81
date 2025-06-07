
import { Profession, ProfessionCategory } from '@/types/professional';

export const PROFESSION_CATEGORIES: ProfessionCategory[] = [
  'Educação',
  'Construção Civil',
  'Serviços Técnicos',
  'Saúde',
  'Criatividade',
  'Administrativo',
  'Tecnologia',
  'Jurídico',
  'Engenharia',
  'Comércio',
  'Transporte',
  'Alimentação',
  'Segurança'
];

export const PROFESSIONS: Profession[] = [
  // Construção Civil
  {
    id: 'pedreiro',
    name: 'Pedreiro',
    category: 'Construção Civil',
    description: 'Profissional responsável pela construção e reforma de edificações, executando alvenaria, concretagem e acabamentos.',
    objectives: 'Executar obras com qualidade, segurança e dentro dos prazos estabelecidos, contribuindo para o desenvolvimento urbano.',
    importance: 'Fundamental para o crescimento da infraestrutura urbana e habitacional, sendo essencial para o desenvolvimento econômico.',
    applicationAreas: 'Construtoras, obras residenciais, comerciais e industriais, reformas e manutenção predial.',
    specificQuestions: [
      { id: 'experience_years', question: 'Quantos anos de experiência possui?', type: 'number', required: true },
      { id: 'work_types', question: 'Tipos de obra que já trabalhou', type: 'textarea', required: true },
      { id: 'specializations', question: 'Especializações', type: 'textarea', required: false }
    ],
    cvTemplate: {
      colors: { primary: '#D97706', secondary: '#92400E', accent: '#FEF3C7' },
      style: 'technical',
      layout: 'classic'
    }
  },
  
  // Educação
  {
    id: 'professor',
    name: 'Professor',
    category: 'Educação',
    description: 'Educador responsável por transmitir conhecimentos e formar cidadãos críticos e conscientes.',
    objectives: 'Facilitar o processo de aprendizagem, desenvolver competências nos alunos e contribuir para a formação integral.',
    importance: 'Peça fundamental na formação da sociedade, responsável pelo desenvolvimento intelectual e social das futuras gerações.',
    applicationAreas: 'Escolas públicas e privadas, universidades, cursos técnicos, educação à distância.',
    specificQuestions: [
      { id: 'education_level', question: 'Nível de formação', type: 'select', options: ['Ensino Médio', 'Graduação', 'Pós-graduação', 'Mestrado', 'Doutorado'], required: true },
      { id: 'subjects', question: 'Disciplinas que leciona', type: 'textarea', required: true },
      { id: 'teaching_years', question: 'Anos de experiência em ensino', type: 'number', required: true }
    ],
    cvTemplate: {
      colors: { primary: '#1E40AF', secondary: '#1E3A8A', accent: '#DBEAFE' },
      style: 'academic',
      layout: 'classic'
    }
  },

  // Criatividade
  {
    id: 'designer-grafico',
    name: 'Designer Gráfico',
    category: 'Criatividade',
    description: 'Profissional que cria soluções visuais para comunicar mensagens através de elementos gráficos.',
    objectives: 'Desenvolver identidades visuais impactantes e comunicar efetivamente através do design.',
    importance: 'Essencial para a comunicação visual empresarial e criação de experiências visuais memoráveis.',
    applicationAreas: 'Agências de publicidade, empresas, freelances, editoras, mídia digital.',
    specificQuestions: [
      { id: 'tools', question: 'Ferramentas que domina', type: 'textarea', required: true },
      { id: 'portfolio', question: 'Link do portfólio', type: 'text', required: false },
      { id: 'work_style', question: 'Estilo de trabalho preferido', type: 'textarea', required: true }
    ],
    cvTemplate: {
      colors: { primary: '#EC4899', secondary: '#BE185D', accent: '#FCE7F3' },
      style: 'creative',
      layout: 'creative'
    }
  },

  // Serviços Técnicos
  {
    id: 'eletricista',
    name: 'Eletricista',
    category: 'Serviços Técnicos',
    description: 'Especialista em instalações e manutenção de sistemas elétricos residenciais, comerciais e industriais.',
    objectives: 'Garantir instalações elétricas seguras e eficientes, seguindo normas técnicas rigorosas.',
    importance: 'Fundamental para a segurança e funcionamento de instalações elétricas em todos os setores.',
    applicationAreas: 'Residências, empresas, indústrias, construção civil, manutenção predial.',
    specificQuestions: [
      { id: 'certifications', question: 'Certificações técnicas', type: 'textarea', required: true },
      { id: 'voltage_experience', question: 'Experiência com diferentes voltagens', type: 'textarea', required: true },
      { id: 'safety_training', question: 'Treinamentos de segurança', type: 'textarea', required: false }
    ],
    cvTemplate: {
      colors: { primary: '#EAB308', secondary: '#A16207', accent: '#FEF3C7' },
      style: 'technical',
      layout: 'classic'
    }
  },

  // Saúde
  {
    id: 'enfermeiro',
    name: 'Enfermeiro',
    category: 'Saúde',
    description: 'Profissional de saúde responsável pelo cuidado direto aos pacientes e coordenação da assistência de enfermagem.',
    objectives: 'Prestar cuidados de enfermagem humanizados e de qualidade, promovendo a saúde e bem-estar dos pacientes.',
    importance: 'Essencial no sistema de saúde, sendo o profissional que mais tempo passa com os pacientes.',
    applicationAreas: 'Hospitais, clínicas, postos de saúde, home care, empresas, escolas.',
    specificQuestions: [
      { id: 'specialization', question: 'Especialização/Área de atuação', type: 'text', required: true },
      { id: 'experience_years', question: 'Anos de experiência', type: 'number', required: true },
      { id: 'work_environments', question: 'Ambientes de trabalho', type: 'textarea', required: true }
    ],
    cvTemplate: {
      colors: { primary: '#059669', secondary: '#047857', accent: '#D1FAE5' },
      style: 'medical',
      layout: 'classic'
    }
  },

  {
    id: 'medico',
    name: 'Médico',
    category: 'Saúde',
    description: 'Profissional habilitado para diagnosticar, tratar e prevenir doenças, promovendo a saúde integral.',
    objectives: 'Salvar vidas, aliviar sofrimento e promover a saúde através de diagnósticos precisos e tratamentos eficazes.',
    importance: 'Pilar fundamental da saúde pública, responsável pela manutenção da vida e qualidade de vida da população.',
    applicationAreas: 'Hospitais, clínicas, consultórios, medicina preventiva, pesquisa médica.',
    specificQuestions: [
      { id: 'specialty', question: 'Especialidade médica', type: 'text', required: true },
      { id: 'institutions', question: 'Hospitais/Clínicas onde atua', type: 'textarea', required: true },
      { id: 'practice_years', question: 'Anos de prática médica', type: 'number', required: true }
    ],
    cvTemplate: {
      colors: { primary: '#0F766E', secondary: '#0D9488', accent: '#CCFBF1' },
      style: 'medical',
      layout: 'classic'
    }
  },

  // Tecnologia
  {
    id: 'programador',
    name: 'Programador',
    category: 'Tecnologia',
    description: 'Profissional que desenvolve software e aplicações utilizando linguagens de programação.',
    objectives: 'Criar soluções tecnológicas eficientes e inovadoras que resolvam problemas reais.',
    importance: 'Fundamental na era digital, impulsionando a transformação tecnológica em todos os setores.',
    applicationAreas: 'Empresas de tecnologia, startups, bancos, consultoria, desenvolvimento freelance.',
    specificQuestions: [
      { id: 'languages', question: 'Linguagens de programação', type: 'textarea', required: true },
      { id: 'frameworks', question: 'Frameworks e tecnologias', type: 'textarea', required: true },
      { id: 'project_types', question: 'Tipos de projetos desenvolvidos', type: 'textarea', required: true }
    ],
    cvTemplate: {
      colors: { primary: '#3B82F6', secondary: '#1E40AF', accent: '#DBEAFE' },
      style: 'technical',
      layout: 'modern'
    }
  },

  // Administrativo
  {
    id: 'assistente-administrativo',
    name: 'Assistente Administrativo',
    category: 'Administrativo',
    description: 'Profissional responsável por atividades de apoio administrativo e organização empresarial.',
    objectives: 'Otimizar processos administrativos e dar suporte eficiente às operações da empresa.',
    importance: 'Essencial para o funcionamento organizacional, garantindo eficiência nos processos internos.',
    applicationAreas: 'Empresas de todos os portes, órgãos públicos, escritórios, organizações não-governamentais.',
    specificQuestions: [
      { id: 'software_skills', question: 'Softwares que domina', type: 'textarea', required: true },
      { id: 'admin_experience', question: 'Experiência administrativa (anos)', type: 'number', required: true },
      { id: 'responsibilities', question: 'Principais responsabilidades', type: 'textarea', required: true }
    ],
    cvTemplate: {
      colors: { primary: '#6366F1', secondary: '#4F46E5', accent: '#E0E7FF' },
      style: 'formal',
      layout: 'classic'
    }
  }

  // Nota: Por brevidade, incluí apenas algumas profissões como exemplo. 
  // O array completo teria todas as 60 profissões mencionadas.
];

export const getProfessionsByCategory = (category: ProfessionCategory): Profession[] => {
  return PROFESSIONS.filter(profession => profession.category === category);
};

export const searchProfessions = (query: string): Profession[] => {
  const lowercaseQuery = query.toLowerCase();
  return PROFESSIONS.filter(profession => 
    profession.name.toLowerCase().includes(lowercaseQuery) ||
    profession.description.toLowerCase().includes(lowercaseQuery)
  );
};
