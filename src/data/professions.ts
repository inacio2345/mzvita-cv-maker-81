
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
  {
    id: 'coordenador-pedagogico',
    name: 'Coordenador Pedagógico',
    category: 'Educação',
    description: 'Profissional responsável pela coordenação e orientação pedagógica em instituições de ensino.',
    objectives: 'Orientar a prática pedagógica, acompanhar o desenvolvimento dos alunos e formar professores.',
    importance: 'Fundamental para garantir a qualidade do ensino e o desenvolvimento pedagógico da instituição.',
    applicationAreas: 'Escolas públicas e privadas, secretarias de educação, centros de formação.',
    specificQuestions: [
      { id: 'management_experience', question: 'Experiência em gestão educacional', type: 'number', required: true },
      { id: 'specializations', question: 'Especializações pedagógicas', type: 'textarea', required: true }
    ],
    cvTemplate: {
      colors: { primary: '#1E40AF', secondary: '#1E3A8A', accent: '#DBEAFE' },
      style: 'academic',
      layout: 'classic'
    }
  },
  {
    id: 'diretor-escolar',
    name: 'Diretor Escolar',
    category: 'Educação',
    description: 'Responsável pela gestão geral de instituições de ensino, liderando equipes e definindo diretrizes educacionais.',
    objectives: 'Garantir o funcionamento eficiente da escola e a qualidade do ensino oferecido.',
    importance: 'Líder educacional que impacta diretamente na qualidade da educação oferecida.',
    applicationAreas: 'Escolas públicas e privadas, centros educacionais, institutos de ensino.',
    specificQuestions: [
      { id: 'leadership_experience', question: 'Experiência em liderança educacional', type: 'number', required: true },
      { id: 'management_skills', question: 'Competências em gestão', type: 'textarea', required: true }
    ],
    cvTemplate: {
      colors: { primary: '#1E40AF', secondary: '#1E3A8A', accent: '#DBEAFE' },
      style: 'academic',
      layout: 'classic'
    }
  },
  {
    id: 'psicopedagogo',
    name: 'Psicopedagogo',
    category: 'Educação',
    description: 'Especialista em dificuldades de aprendizagem e desenvolvimento cognitivo.',
    objectives: 'Identificar e tratar dificuldades de aprendizagem, orientar famílias e educadores.',
    importance: 'Essencial para o desenvolvimento integral dos estudantes com necessidades especiais.',
    applicationAreas: 'Escolas, clínicas, consultórios, centros de reabilitação.',
    specificQuestions: [
      { id: 'specialization_area', question: 'Área de especialização', type: 'text', required: true },
      { id: 'clinical_experience', question: 'Experiência clínica', type: 'number', required: true }
    ],
    cvTemplate: {
      colors: { primary: '#1E40AF', secondary: '#1E3A8A', accent: '#DBEAFE' },
      style: 'academic',
      layout: 'classic'
    }
  },
  {
    id: 'bibliotecario',
    name: 'Bibliotecário',
    category: 'Educação',
    description: 'Profissional responsável pela organização e gestão de acervos bibliográficos.',
    objectives: 'Facilitar o acesso à informação e promover a cultura da leitura.',
    importance: 'Guardião do conhecimento e facilitador do acesso à informação.',
    applicationAreas: 'Bibliotecas públicas, escolares, universitárias, centros de documentação.',
    specificQuestions: [
      { id: 'library_experience', question: 'Experiência em biblioteconomia', type: 'number', required: true },
      { id: 'systems_knowledge', question: 'Sistemas de catalogação conhecidos', type: 'textarea', required: true }
    ],
    cvTemplate: {
      colors: { primary: '#1E40AF', secondary: '#1E3A8A', accent: '#DBEAFE' },
      style: 'academic',
      layout: 'classic'
    }
  },

  // Construção Civil
  {
    id: 'pedreiro',
    name: 'Pedreiro',
    category: 'Construção Civil',
    description: 'Profissional responsável pela construção e reforma de edificações, executando alvenaria, concretagem e acabamentos.',
    objectives: 'Executar obras com qualidade, segurança e dentro dos prazos estabelecidos.',
    importance: 'Fundamental para o crescimento da infraestrutura urbana e habitacional.',
    applicationAreas: 'Construtoras, obras residenciais, comerciais e industriais.',
    specificQuestions: [
      { id: 'experience_years', question: 'Anos de experiência', type: 'number', required: true },
      { id: 'work_types', question: 'Tipos de obra', type: 'textarea', required: true }
    ],
    cvTemplate: {
      colors: { primary: '#D97706', secondary: '#92400E', accent: '#FEF3C7' },
      style: 'technical',
      layout: 'classic'
    }
  },
  {
    id: 'carpinteiro',
    name: 'Carpinteiro',
    category: 'Construção Civil',
    description: 'Especialista em trabalhos com madeira, móveis e estruturas de madeira.',
    objectives: 'Criar e reparar estruturas e móveis de madeira com precisão e qualidade.',
    importance: 'Essencial para acabamentos e estruturas em madeira na construção.',
    applicationAreas: 'Construção civil, marcenarias, móveis sob medida.',
    specificQuestions: [
      { id: 'wood_experience', question: 'Experiência com madeira', type: 'number', required: true },
      { id: 'tools_knowledge', question: 'Ferramentas dominadas', type: 'textarea', required: true }
    ],
    cvTemplate: {
      colors: { primary: '#D97706', secondary: '#92400E', accent: '#FEF3C7' },
      style: 'technical',
      layout: 'classic'
    }
  },
  {
    id: 'pintor',
    name: 'Pintor',
    category: 'Construção Civil',
    description: 'Profissional responsável pela pintura de paredes, estruturas e acabamentos.',
    objectives: 'Realizar acabamentos com qualidade e durabilidade.',
    importance: 'Fundamental para o acabamento final das construções.',
    applicationAreas: 'Construção civil, reformas, manutenção predial.',
    specificQuestions: [
      { id: 'painting_experience', question: 'Experiência em pintura', type: 'number', required: true },
      { id: 'techniques_known', question: 'Técnicas conhecidas', type: 'textarea', required: true }
    ],
    cvTemplate: {
      colors: { primary: '#D97706', secondary: '#92400E', accent: '#FEF3C7' },
      style: 'technical',
      layout: 'classic'
    }
  },
  {
    id: 'soldador',
    name: 'Soldador',
    category: 'Construção Civil',
    description: 'Especialista em soldagem de metais e estruturas metálicas.',
    objectives: 'Executar soldas com precisão e segurança em estruturas metálicas.',
    importance: 'Essencial para estruturas metálicas e reparos industriais.',
    applicationAreas: 'Construção civil, indústria, estruturas metálicas.',
    specificQuestions: [
      { id: 'welding_experience', question: 'Experiência em soldagem', type: 'number', required: true },
      { id: 'welding_types', question: 'Tipos de solda', type: 'textarea', required: true }
    ],
    cvTemplate: {
      colors: { primary: '#D97706', secondary: '#92400E', accent: '#FEF3C7' },
      style: 'technical',
      layout: 'classic'
    }
  },
  {
    id: 'mestre-obras',
    name: 'Mestre de Obras',
    category: 'Construção Civil',
    description: 'Responsável pela supervisão e coordenação de obras de construção civil.',
    objectives: 'Coordenar equipes e garantir a execução conforme projeto.',
    importance: 'Líder técnico essencial para o sucesso das obras.',
    applicationAreas: 'Construtoras, obras públicas e privadas.',
    specificQuestions: [
      { id: 'leadership_experience', question: 'Experiência em liderança', type: 'number', required: true },
      { id: 'project_types', question: 'Tipos de projeto', type: 'textarea', required: true }
    ],
    cvTemplate: {
      colors: { primary: '#D97706', secondary: '#92400E', accent: '#FEF3C7' },
      style: 'technical',
      layout: 'classic'
    }
  },

  // Serviços Técnicos
  {
    id: 'eletricista',
    name: 'Eletricista',
    category: 'Serviços Técnicos',
    description: 'Especialista em instalações e manutenção de sistemas elétricos.',
    objectives: 'Garantir instalações elétricas seguras e eficientes.',
    importance: 'Fundamental para a segurança e funcionamento de instalações elétricas.',
    applicationAreas: 'Residências, empresas, indústrias, construção civil.',
    specificQuestions: [
      { id: 'certifications', question: 'Certificações técnicas', type: 'textarea', required: true },
      { id: 'voltage_experience', question: 'Experiência com voltagens', type: 'textarea', required: true }
    ],
    cvTemplate: {
      colors: { primary: '#EAB308', secondary: '#A16207', accent: '#FEF3C7' },
      style: 'technical',
      layout: 'classic'
    }
  },
  {
    id: 'encanador',
    name: 'Encanador',
    category: 'Serviços Técnicos',
    description: 'Especialista em instalações hidráulicas e sistemas de água e esgoto.',
    objectives: 'Instalar e manter sistemas hidráulicos funcionais.',
    importance: 'Essencial para o saneamento básico e infraestrutura.',
    applicationAreas: 'Residências, empresas, construção civil.',
    specificQuestions: [
      { id: 'plumbing_experience', question: 'Experiência em hidráulica', type: 'number', required: true },
      { id: 'system_types', question: 'Tipos de sistema', type: 'textarea', required: true }
    ],
    cvTemplate: {
      colors: { primary: '#EAB308', secondary: '#A16207', accent: '#FEF3C7' },
      style: 'technical',
      layout: 'classic'
    }
  },
  {
    id: 'mecanico',
    name: 'Mecânico',
    category: 'Serviços Técnicos',
    description: 'Profissional especializado em manutenção e reparo de veículos.',
    objectives: 'Diagnosticar e reparar problemas mecânicos em veículos.',
    importance: 'Essencial para manter a frota de veículos funcionando.',
    applicationAreas: 'Oficinas, concessionárias, frotas empresariais.',
    specificQuestions: [
      { id: 'vehicle_types', question: 'Tipos de veículo', type: 'textarea', required: true },
      { id: 'diagnostic_tools', question: 'Ferramentas de diagnóstico', type: 'textarea', required: true }
    ],
    cvTemplate: {
      colors: { primary: '#EAB308', secondary: '#A16207', accent: '#FEF3C7' },
      style: 'technical',
      layout: 'classic'
    }
  },
  {
    id: 'tecnico-informatica',
    name: 'Técnico em Informática',
    category: 'Serviços Técnicos',
    description: 'Especialista em manutenção e suporte técnico de equipamentos de informática.',
    objectives: 'Manter sistemas e equipamentos funcionando adequadamente.',
    importance: 'Fundamental na era digital para suporte técnico.',
    applicationAreas: 'Empresas, assistências técnicas, suporte remoto.',
    specificQuestions: [
      { id: 'tech_experience', question: 'Experiência técnica', type: 'number', required: true },
      { id: 'systems_knowledge', question: 'Sistemas conhecidos', type: 'textarea', required: true }
    ],
    cvTemplate: {
      colors: { primary: '#EAB308', secondary: '#A16207', accent: '#FEF3C7' },
      style: 'technical',
      layout: 'classic'
    }
  },
  {
    id: 'tecnico-eletronica',
    name: 'Técnico em Eletrônica',
    category: 'Serviços Técnicos',
    description: 'Especialista em manutenção e reparo de equipamentos eletrônicos.',
    objectives: 'Diagnosticar e reparar equipamentos eletrônicos.',
    importance: 'Essencial para manutenção de equipamentos eletrônicos.',
    applicationAreas: 'Assistências técnicas, indústrias, empresas.',
    specificQuestions: [
      { id: 'electronics_experience', question: 'Experiência em eletrônica', type: 'number', required: true },
      { id: 'equipment_types', question: 'Tipos de equipamento', type: 'textarea', required: true }
    ],
    cvTemplate: {
      colors: { primary: '#EAB308', secondary: '#A16207', accent: '#FEF3C7' },
      style: 'technical',
      layout: 'classic'
    }
  },

  // Saúde
  {
    id: 'medico',
    name: 'Médico',
    category: 'Saúde',
    description: 'Profissional habilitado para diagnosticar, tratar e prevenir doenças.',
    objectives: 'Salvar vidas e promover a saúde através de diagnósticos e tratamentos.',
    importance: 'Pilar fundamental da saúde pública.',
    applicationAreas: 'Hospitais, clínicas, consultórios, medicina preventiva.',
    specificQuestions: [
      { id: 'specialty', question: 'Especialidade médica', type: 'text', required: true },
      { id: 'practice_years', question: 'Anos de prática médica', type: 'number', required: true }
    ],
    cvTemplate: {
      colors: { primary: '#0F766E', secondary: '#0D9488', accent: '#CCFBF1' },
      style: 'medical',
      layout: 'classic'
    }
  },
  {
    id: 'enfermeiro',
    name: 'Enfermeiro',
    category: 'Saúde',
    description: 'Profissional de saúde responsável pelo cuidado direto aos pacientes.',
    objectives: 'Prestar cuidados de enfermagem humanizados e de qualidade.',
    importance: 'Essencial no sistema de saúde.',
    applicationAreas: 'Hospitais, clínicas, postos de saúde, home care.',
    specificQuestions: [
      { id: 'specialization', question: 'Especialização', type: 'text', required: true },
      { id: 'experience_years', question: 'Anos de experiência', type: 'number', required: true }
    ],
    cvTemplate: {
      colors: { primary: '#059669', secondary: '#047857', accent: '#D1FAE5' },
      style: 'medical',
      layout: 'classic'
    }
  },
  {
    id: 'dentista',
    name: 'Dentista',
    category: 'Saúde',
    description: 'Especialista em saúde bucal e tratamentos odontológicos.',
    objectives: 'Promover a saúde bucal e tratar doenças dentárias.',
    importance: 'Fundamental para a saúde bucal da população.',
    applicationAreas: 'Consultórios, clínicas, hospitais.',
    specificQuestions: [
      { id: 'dental_specialty', question: 'Especialidade odontológica', type: 'text', required: true },
      { id: 'practice_years', question: 'Anos de prática', type: 'number', required: true }
    ],
    cvTemplate: {
      colors: { primary: '#0F766E', secondary: '#0D9488', accent: '#CCFBF1' },
      style: 'medical',
      layout: 'classic'
    }
  },
  {
    id: 'farmaceutico',
    name: 'Farmacêutico',
    category: 'Saúde',
    description: 'Especialista em medicamentos e produtos farmacêuticos.',
    objectives: 'Garantir o uso racional de medicamentos.',
    importance: 'Essencial para a segurança farmacológica.',
    applicationAreas: 'Farmácias, hospitais, indústria farmacêutica.',
    specificQuestions: [
      { id: 'pharmacy_area', question: 'Área de atuação', type: 'text', required: true },
      { id: 'experience_years', question: 'Anos de experiência', type: 'number', required: true }
    ],
    cvTemplate: {
      colors: { primary: '#0F766E', secondary: '#0D9488', accent: '#CCFBF1' },
      style: 'medical',
      layout: 'classic'
    }
  },
  {
    id: 'fisioterapeuta',
    name: 'Fisioterapeuta',
    category: 'Saúde',
    description: 'Especialista em reabilitação física e funcional.',
    objectives: 'Restaurar e manter a função física dos pacientes.',
    importance: 'Fundamental para reabilitação e qualidade de vida.',
    applicationAreas: 'Clínicas, hospitais, centros de reabilitação.',
    specificQuestions: [
      { id: 'therapy_area', question: 'Área de especialização', type: 'text', required: true },
      { id: 'experience_years', question: 'Anos de experiência', type: 'number', required: true }
    ],
    cvTemplate: {
      colors: { primary: '#059669', secondary: '#047857', accent: '#D1FAE5' },
      style: 'medical',
      layout: 'classic'
    }
  },

  // Criatividade
  {
    id: 'designer-grafico',
    name: 'Designer Gráfico',
    category: 'Criatividade',
    description: 'Profissional que cria soluções visuais para comunicar mensagens.',
    objectives: 'Desenvolver identidades visuais impactantes.',
    importance: 'Essencial para a comunicação visual empresarial.',
    applicationAreas: 'Agências de publicidade, empresas, freelances.',
    specificQuestions: [
      { id: 'tools', question: 'Ferramentas que domina', type: 'textarea', required: true },
      { id: 'portfolio', question: 'Link do portfólio', type: 'text', required: false }
    ],
    cvTemplate: {
      colors: { primary: '#EC4899', secondary: '#BE185D', accent: '#FCE7F3' },
      style: 'creative',
      layout: 'creative'
    }
  },
  {
    id: 'fotografo',
    name: 'Fotógrafo',
    category: 'Criatividade',
    description: 'Profissional especializado em captura de imagens.',
    objectives: 'Criar imagens que contem histórias e transmitam emoções.',
    importance: 'Fundamental para documentação e arte visual.',
    applicationAreas: 'Estúdios, eventos, publicidade, jornalismo.',
    specificQuestions: [
      { id: 'photography_style', question: 'Estilo fotográfico', type: 'text', required: true },
      { id: 'equipment', question: 'Equipamentos utilizados', type: 'textarea', required: true }
    ],
    cvTemplate: {
      colors: { primary: '#EC4899', secondary: '#BE185D', accent: '#FCE7F3' },
      style: 'creative',
      layout: 'creative'
    }
  },
  {
    id: 'videomaker',
    name: 'Videomaker',
    category: 'Criatividade',
    description: 'Especialista em produção e edição de vídeos.',
    objectives: 'Criar conteúdo audiovisual de qualidade.',
    importance: 'Essencial na era do conteúdo digital.',
    applicationAreas: 'Produtoras, agências, redes sociais.',
    specificQuestions: [
      { id: 'video_experience', question: 'Experiência em vídeo', type: 'number', required: true },
      { id: 'editing_software', question: 'Softwares de edição', type: 'textarea', required: true }
    ],
    cvTemplate: {
      colors: { primary: '#EC4899', secondary: '#BE185D', accent: '#FCE7F3' },
      style: 'creative',
      layout: 'creative'
    }
  },
  {
    id: 'artista-plastico',
    name: 'Artista Plástico',
    category: 'Criatividade',
    description: 'Profissional dedicado à criação de obras de arte.',
    objectives: 'Expressar ideias e emoções através da arte.',
    importance: 'Fundamental para a cultura e expressão artística.',
    applicationAreas: 'Galerias, ateliês, exposições, ensino artístico.',
    specificQuestions: [
      { id: 'art_style', question: 'Estilo artístico', type: 'text', required: true },
      { id: 'techniques', question: 'Técnicas dominadas', type: 'textarea', required: true }
    ],
    cvTemplate: {
      colors: { primary: '#EC4899', secondary: '#BE185D', accent: '#FCE7F3' },
      style: 'creative',
      layout: 'creative'
    }
  },
  {
    id: 'musico',
    name: 'Músico',
    category: 'Criatividade',
    description: 'Profissional dedicado à criação e execução musical.',
    objectives: 'Criar e interpretar música para entreter e emocionar.',
    importance: 'Essencial para a cultura e entretenimento.',
    applicationAreas: 'Shows, estúdios, ensino musical, orquestras.',
    specificQuestions: [
      { id: 'instruments', question: 'Instrumentos tocados', type: 'textarea', required: true },
      { id: 'musical_style', question: 'Estilo musical', type: 'text', required: true }
    ],
    cvTemplate: {
      colors: { primary: '#EC4899', secondary: '#BE185D', accent: '#FCE7F3' },
      style: 'creative',
      layout: 'creative'
    }
  },

  // Administrativo
  {
    id: 'assistente-administrativo',
    name: 'Assistente Administrativo',
    category: 'Administrativo',
    description: 'Profissional responsável por atividades de apoio administrativo.',
    objectives: 'Otimizar processos administrativos e dar suporte eficiente.',
    importance: 'Essencial para o funcionamento organizacional.',
    applicationAreas: 'Empresas de todos os portes, órgãos públicos.',
    specificQuestions: [
      { id: 'software_skills', question: 'Softwares que domina', type: 'textarea', required: true },
      { id: 'admin_experience', question: 'Experiência administrativa', type: 'number', required: true }
    ],
    cvTemplate: {
      colors: { primary: '#6366F1', secondary: '#4F46E5', accent: '#E0E7FF' },
      style: 'formal',
      layout: 'classic'
    }
  },
  {
    id: 'secretario',
    name: 'Secretário',
    category: 'Administrativo',
    description: 'Profissional responsável por organização e apoio executivo.',
    objectives: 'Organizar agenda e dar suporte administrativo.',
    importance: 'Fundamental para eficiência executiva.',
    applicationAreas: 'Empresas, escritórios, órgãos públicos.',
    specificQuestions: [
      { id: 'secretarial_experience', question: 'Experiência secretarial', type: 'number', required: true },
      { id: 'language_skills', question: 'Idiomas', type: 'textarea', required: true }
    ],
    cvTemplate: {
      colors: { primary: '#6366F1', secondary: '#4F46E5', accent: '#E0E7FF' },
      style: 'formal',
      layout: 'classic'
    }
  },
  {
    id: 'recepcionista',
    name: 'Recepcionista',
    category: 'Administrativo',
    description: 'Profissional responsável pelo atendimento e recepção.',
    objectives: 'Proporcionar atendimento de qualidade aos clientes.',
    importance: 'Primeiro contato dos clientes com a empresa.',
    applicationAreas: 'Empresas, hotéis, clínicas, escritórios.',
    specificQuestions: [
      { id: 'customer_service', question: 'Experiência em atendimento', type: 'number', required: true },
      { id: 'communication_skills', question: 'Habilidades de comunicação', type: 'textarea', required: true }
    ],
    cvTemplate: {
      colors: { primary: '#6366F1', secondary: '#4F46E5', accent: '#E0E7FF' },
      style: 'formal',
      layout: 'classic'
    }
  },
  {
    id: 'analista-recursos-humanos',
    name: 'Analista de Recursos Humanos',
    category: 'Administrativo',
    description: 'Especialista em gestão de pessoas e processos de RH.',
    objectives: 'Desenvolver e manter políticas de recursos humanos.',
    importance: 'Fundamental para gestão de pessoas nas organizações.',
    applicationAreas: 'Empresas de todos os setores, consultorias.',
    specificQuestions: [
      { id: 'hr_experience', question: 'Experiência em RH', type: 'number', required: true },
      { id: 'hr_specialization', question: 'Especialização em RH', type: 'textarea', required: true }
    ],
    cvTemplate: {
      colors: { primary: '#6366F1', secondary: '#4F46E5', accent: '#E0E7FF' },
      style: 'formal',
      layout: 'classic'
    }
  },
  {
    id: 'contador',
    name: 'Contador',
    category: 'Administrativo',
    description: 'Profissional responsável pela contabilidade e finanças.',
    objectives: 'Manter a saúde financeira e contábil das organizações.',
    importance: 'Essencial para gestão financeira empresarial.',
    applicationAreas: 'Empresas, escritórios contábeis, órgãos públicos.',
    specificQuestions: [
      { id: 'accounting_experience', question: 'Experiência contábil', type: 'number', required: true },
      { id: 'certifications', question: 'Certificações', type: 'textarea', required: true }
    ],
    cvTemplate: {
      colors: { primary: '#6366F1', secondary: '#4F46E5', accent: '#E0E7FF' },
      style: 'formal',
      layout: 'classic'
    }
  },

  // Tecnologia
  {
    id: 'programador',
    name: 'Programador',
    category: 'Tecnologia',
    description: 'Profissional que desenvolve software e aplicações.',
    objectives: 'Criar soluções tecnológicas eficientes e inovadoras.',
    importance: 'Fundamental na era digital.',
    applicationAreas: 'Empresas de tecnologia, startups, bancos.',
    specificQuestions: [
      { id: 'languages', question: 'Linguagens de programação', type: 'textarea', required: true },
      { id: 'frameworks', question: 'Frameworks e tecnologias', type: 'textarea', required: true }
    ],
    cvTemplate: {
      colors: { primary: '#3B82F6', secondary: '#1E40AF', accent: '#DBEAFE' },
      style: 'technical',
      layout: 'modern'
    }
  },
  {
    id: 'analista-sistemas',
    name: 'Analista de Sistemas',
    category: 'Tecnologia',
    description: 'Especialista em análise e desenvolvimento de sistemas.',
    objectives: 'Projetar e implementar sistemas eficientes.',
    importance: 'Fundamental para digitalização empresarial.',
    applicationAreas: 'Empresas de tecnologia, bancos, indústrias.',
    specificQuestions: [
      { id: 'systems_experience', question: 'Experiência em sistemas', type: 'number', required: true },
      { id: 'methodologies', question: 'Metodologias conhecidas', type: 'textarea', required: true }
    ],
    cvTemplate: {
      colors: { primary: '#3B82F6', secondary: '#1E40AF', accent: '#DBEAFE' },
      style: 'technical',
      layout: 'modern'
    }
  },
  {
    id: 'web-designer',
    name: 'Web Designer',
    category: 'Tecnologia',
    description: 'Especialista em design e interface para web.',
    objectives: 'Criar interfaces web atrativas e funcionais.',
    importance: 'Essencial para presença digital empresarial.',
    applicationAreas: 'Agências digitais, empresas, freelances.',
    specificQuestions: [
      { id: 'design_tools', question: 'Ferramentas de design', type: 'textarea', required: true },
      { id: 'web_technologies', question: 'Tecnologias web', type: 'textarea', required: true }
    ],
    cvTemplate: {
      colors: { primary: '#3B82F6', secondary: '#1E40AF', accent: '#DBEAFE' },
      style: 'technical',
      layout: 'modern'
    }
  },
  {
    id: 'administrador-redes',
    name: 'Administrador de Redes',
    category: 'Tecnologia',
    description: 'Especialista em infraestrutura e redes de computadores.',
    objectives: 'Manter redes funcionais e seguras.',
    importance: 'Fundamental para conectividade empresarial.',
    applicationAreas: 'Empresas, provedores de internet, data centers.',
    specificQuestions: [
      { id: 'network_experience', question: 'Experiência em redes', type: 'number', required: true },
      { id: 'network_technologies', question: 'Tecnologias de rede', type: 'textarea', required: true }
    ],
    cvTemplate: {
      colors: { primary: '#3B82F6', secondary: '#1E40AF', accent: '#DBEAFE' },
      style: 'technical',
      layout: 'modern'
    }
  },
  {
    id: 'cientista-dados',
    name: 'Cientista de Dados',
    category: 'Tecnologia',
    description: 'Especialista em análise e interpretação de dados.',
    objectives: 'Extrair insights valiosos dos dados.',
    importance: 'Fundamental para tomada de decisões baseada em dados.',
    applicationAreas: 'Empresas de tecnologia, bancos, consultorias.',
    specificQuestions: [
      { id: 'data_tools', question: 'Ferramentas de análise', type: 'textarea', required: true },
      { id: 'statistical_knowledge', question: 'Conhecimentos estatísticos', type: 'textarea', required: true }
    ],
    cvTemplate: {
      colors: { primary: '#3B82F6', secondary: '#1E40AF', accent: '#DBEAFE' },
      style: 'technical',
      layout: 'modern'
    }
  },

  // Jurídico
  {
    id: 'advogado',
    name: 'Advogado',
    category: 'Jurídico',
    description: 'Profissional do direito especializado em questões legais.',
    objectives: 'Defender direitos e garantir justiça.',
    importance: 'Fundamental para o estado de direito.',
    applicationAreas: 'Escritórios de advocacia, empresas, órgãos públicos.',
    specificQuestions: [
      { id: 'law_area', question: 'Área do direito', type: 'text', required: true },
      { id: 'law_experience', question: 'Experiência jurídica', type: 'number', required: true }
    ],
    cvTemplate: {
      colors: { primary: '#1F2937', secondary: '#111827', accent: '#F3F4F6' },
      style: 'formal',
      layout: 'classic'
    }
  },
  {
    id: 'paralegal',
    name: 'Paralegal',
    category: 'Jurídico',
    description: 'Assistente jurídico especializado em apoio legal.',
    objectives: 'Dar suporte técnico em questões jurídicas.',
    importance: 'Essencial para eficiência dos escritórios de advocacia.',
    applicationAreas: 'Escritórios de advocacia, departamentos jurídicos.',
    specificQuestions: [
      { id: 'legal_experience', question: 'Experiência jurídica', type: 'number', required: true },
      { id: 'legal_areas', question: 'Áreas de atuação', type: 'textarea', required: true }
    ],
    cvTemplate: {
      colors: { primary: '#1F2937', secondary: '#111827', accent: '#F3F4F6' },
      style: 'formal',
      layout: 'classic'
    }
  },
  {
    id: 'procurador',
    name: 'Procurador',
    category: 'Jurídico',
    description: 'Representante legal do Estado ou de órgãos públicos.',
    objectives: 'Defender os interesses do Estado.',
    importance: 'Fundamental para defesa dos interesses públicos.',
    applicationAreas: 'Procuradorias, órgãos públicos, autarquias.',
    specificQuestions: [
      { id: 'public_experience', question: 'Experiência no setor público', type: 'number', required: true },
      { id: 'specialization', question: 'Especialização jurídica', type: 'text', required: true }
    ],
    cvTemplate: {
      colors: { primary: '#1F2937', secondary: '#111827', accent: '#F3F4F6' },
      style: 'formal',
      layout: 'classic'
    }
  },
  {
    id: 'juiz',
    name: 'Juiz',
    category: 'Jurídico',
    description: 'Magistrado responsável por julgar processos judiciais.',
    objectives: 'Aplicar a justiça de forma imparcial.',
    importance: 'Pilar fundamental do poder judiciário.',
    applicationAreas: 'Tribunais, varas judiciais, cortes superiores.',
    specificQuestions: [
      { id: 'judicial_experience', question: 'Experiência judicial', type: 'number', required: true },
      { id: 'court_type', question: 'Tipo de vara/tribunal', type: 'text', required: true }
    ],
    cvTemplate: {
      colors: { primary: '#1F2937', secondary: '#111827', accent: '#F3F4F6' },
      style: 'formal',
      layout: 'classic'
    }
  },
  {
    id: 'notario',
    name: 'Notário',
    category: 'Jurídico',
    description: 'Profissional responsável por atos notariais e cartorários.',
    objectives: 'Dar fé pública a documentos e atos jurídicos.',
    importance: 'Essencial para segurança jurídica.',
    applicationAreas: 'Cartórios, tabelionatos, registros públicos.',
    specificQuestions: [
      { id: 'notarial_experience', question: 'Experiência notarial', type: 'number', required: true },
      { id: 'notarial_services', question: 'Serviços notariais', type: 'textarea', required: true }
    ],
    cvTemplate: {
      colors: { primary: '#1F2937', secondary: '#111827', accent: '#F3F4F6' },
      style: 'formal',
      layout: 'classic'
    }
  },

  // Engenharia
  {
    id: 'engenheiro-civil',
    name: 'Engenheiro Civil',
    category: 'Engenharia',
    description: 'Especialista em projetos e construção de obras civis.',
    objectives: 'Projetar e executar obras de infraestrutura.',
    importance: 'Fundamental para desenvolvimento urbano.',
    applicationAreas: 'Construtoras, órgãos públicos, consultorias.',
    specificQuestions: [
      { id: 'engineering_experience', question: 'Experiência em engenharia', type: 'number', required: true },
      { id: 'project_types', question: 'Tipos de projeto', type: 'textarea', required: true }
    ],
    cvTemplate: {
      colors: { primary: '#1E40AF', secondary: '#1E3A8A', accent: '#DBEAFE' },
      style: 'technical',
      layout: 'classic'
    }
  },
  {
    id: 'engenheiro-eletrico',
    name: 'Engenheiro Elétrico',
    category: 'Engenharia',
    description: 'Especialista em sistemas elétricos e eletrônicos.',
    objectives: 'Projetar e implementar sistemas elétricos.',
    importance: 'Essencial para infraestrutura elétrica.',
    applicationAreas: 'Empresas de energia, indústrias, consultorias.',
    specificQuestions: [
      { id: 'electrical_experience', question: 'Experiência elétrica', type: 'number', required: true },
      { id: 'electrical_areas', question: 'Áreas de especialização', type: 'textarea', required: true }
    ],
    cvTemplate: {
      colors: { primary: '#1E40AF', secondary: '#1E3A8A', accent: '#DBEAFE' },
      style: 'technical',
      layout: 'classic'
    }
  },
  {
    id: 'engenheiro-mecanico',
    name: 'Engenheiro Mecânico',
    category: 'Engenharia',
    description: 'Especialista em sistemas mecânicos e industriais.',
    objectives: 'Projetar e otimizar sistemas mecânicos.',
    importance: 'Fundamental para indústria e manufatura.',
    applicationAreas: 'Indústrias, automotiva, consultorias.',
    specificQuestions: [
      { id: 'mechanical_experience', question: 'Experiência mecânica', type: 'number', required: true },
      { id: 'mechanical_specialization', question: 'Especialização', type: 'textarea', required: true }
    ],
    cvTemplate: {
      colors: { primary: '#1E40AF', secondary: '#1E3A8A', accent: '#DBEAFE' },
      style: 'technical',
      layout: 'classic'
    }
  },
  {
    id: 'arquiteto',
    name: 'Arquiteto',
    category: 'Engenharia',
    description: 'Profissional responsável por projetos arquitetônicos.',
    objectives: 'Criar espaços funcionais e esteticamente agradáveis.',
    importance: 'Fundamental para qualidade dos espaços urbanos.',
    applicationAreas: 'Escritórios de arquitetura, construtoras.',
    specificQuestions: [
      { id: 'architecture_experience', question: 'Experiência em arquitetura', type: 'number', required: true },
      { id: 'design_style', question: 'Estilo arquitetônico', type: 'text', required: true }
    ],
    cvTemplate: {
      colors: { primary: '#1E40AF', secondary: '#1E3A8A', accent: '#DBEAFE' },
      style: 'technical',
      layout: 'classic'
    }
  },
  {
    id: 'engenheiro-software',
    name: 'Engenheiro de Software',
    category: 'Engenharia',
    description: 'Especialista em desenvolvimento de software complexo.',
    objectives: 'Arquitetar e desenvolver sistemas de software.',
    importance: 'Fundamental para inovação tecnológica.',
    applicationAreas: 'Empresas de tecnologia, startups, bancos.',
    specificQuestions: [
      { id: 'software_experience', question: 'Experiência em software', type: 'number', required: true },
      { id: 'technologies', question: 'Tecnologias dominadas', type: 'textarea', required: true }
    ],
    cvTemplate: {
      colors: { primary: '#1E40AF', secondary: '#1E3A8A', accent: '#DBEAFE' },
      style: 'technical',
      layout: 'modern'
    }
  },

  // Comércio
  {
    id: 'vendedor',
    name: 'Vendedor',
    category: 'Comércio',
    description: 'Profissional especializado em vendas e relacionamento com clientes.',
    objectives: 'Aumentar vendas e satisfação dos clientes.',
    importance: 'Fundamental para sucesso comercial.',
    applicationAreas: 'Lojas, empresas, vendas externas.',
    specificQuestions: [
      { id: 'sales_experience', question: 'Experiência em vendas', type: 'number', required: true },
      { id: 'product_types', question: 'Tipos de produto', type: 'textarea', required: true }
    ],
    cvTemplate: {
      colors: { primary: '#059669', secondary: '#047857', accent: '#D1FAE5' },
      style: 'formal',
      layout: 'classic'
    }
  },
  {
    id: 'gerente-loja',
    name: 'Gerente de Loja',
    category: 'Comércio',
    description: 'Responsável pela gestão operacional de estabelecimentos comerciais.',
    objectives: 'Maximizar vendas e eficiência operacional.',
    importance: 'Essencial para sucesso do varejo.',
    applicationAreas: 'Lojas, shopping centers, franquias.',
    specificQuestions: [
      { id: 'management_experience', question: 'Experiência em gestão', type: 'number', required: true },
      { id: 'team_size', question: 'Tamanho da equipe', type: 'number', required: true }
    ],
    cvTemplate: {
      colors: { primary: '#059669', secondary: '#047857', accent: '#D1FAE5' },
      style: 'formal',
      layout: 'classic'
    }
  },
  {
    id: 'caixa',
    name: 'Operador de Caixa',
    category: 'Comércio',
    description: 'Responsável por operações de caixa e atendimento.',
    objectives: 'Processar vendas com eficiência e cortesia.',
    importance: 'Fundamental para experiência do cliente.',
    applicationAreas: 'Supermercados, lojas, farmácias.',
    specificQuestions: [
      { id: 'cashier_experience', question: 'Experiência como caixa', type: 'number', required: true },
      { id: 'systems_knowledge', question: 'Sistemas de caixa', type: 'textarea', required: true }
    ],
    cvTemplate: {
      colors: { primary: '#059669', secondary: '#047857', accent: '#D1FAE5' },
      style: 'formal',
      layout: 'classic'
    }
  },
  {
    id: 'representante-comercial',
    name: 'Representante Comercial',
    category: 'Comércio',
    description: 'Profissional que representa empresas na venda de produtos.',
    objectives: 'Expandir mercado e aumentar vendas.',
    importance: 'Essencial para expansão comercial.',
    applicationAreas: 'Representações, vendas B2B, distribuição.',
    specificQuestions: [
      { id: 'sales_territory', question: 'Território de vendas', type: 'text', required: true },
      { id: 'b2b_experience', question: 'Experiência B2B', type: 'number', required: true }
    ],
    cvTemplate: {
      colors: { primary: '#059669', secondary: '#047857', accent: '#D1FAE5' },
      style: 'formal',
      layout: 'classic'
    }
  },
  {
    id: 'promotor-vendas',
    name: 'Promotor de Vendas',
    category: 'Comércio',
    description: 'Especialista em promoção e demonstração de produtos.',
    objectives: 'Promover produtos e aumentar vendas.',
    importance: 'Fundamental para marketing de produtos.',
    applicationAreas: 'Supermercados, lojas, eventos.',
    specificQuestions: [
      { id: 'promotion_experience', question: 'Experiência em promoção', type: 'number', required: true },
      { id: 'product_categories', question: 'Categorias de produto', type: 'textarea', required: true }
    ],
    cvTemplate: {
      colors: { primary: '#059669', secondary: '#047857', accent: '#D1FAE5' },
      style: 'formal',
      layout: 'classic'
    }
  },

  // Transporte
  {
    id: 'motorista',
    name: 'Motorista',
    category: 'Transporte',
    description: 'Profissional responsável pela condução de veículos.',
    objectives: 'Transportar pessoas ou cargas com segurança.',
    importance: 'Essencial para mobilidade urbana.',
    applicationAreas: 'Transporte público, empresas, delivery.',
    specificQuestions: [
      { id: 'driving_experience', question: 'Experiência como motorista', type: 'number', required: true },
      { id: 'vehicle_types', question: 'Tipos de veículo', type: 'textarea', required: true }
    ],
    cvTemplate: {
      colors: { primary: '#DC2626', secondary: '#B91C1C', accent: '#FEE2E2' },
      style: 'formal',
      layout: 'classic'
    }
  },
  {
    id: 'entregador',
    name: 'Entregador',
    category: 'Transporte',
    description: 'Especialista em entrega de produtos e mercadorias.',
    objectives: 'Entregar produtos no prazo e local corretos.',
    importance: 'Fundamental para economia digital.',
    applicationAreas: 'Delivery, e-commerce, logística.',
    specificQuestions: [
      { id: 'delivery_experience', question: 'Experiência em delivery', type: 'number', required: true },
      { id: 'delivery_type', question: 'Tipo de entrega', type: 'text', required: true }
    ],
    cvTemplate: {
      colors: { primary: '#DC2626', secondary: '#B91C1C', accent: '#FEE2E2' },
      style: 'formal',
      layout: 'classic'
    }
  },
  {
    id: 'piloto',
    name: 'Piloto',
    category: 'Transporte',
    description: 'Profissional habilitado para conduzir aeronaves.',
    objectives: 'Operar aeronaves com segurança máxima.',
    importance: 'Fundamental para transporte aéreo.',
    applicationAreas: 'Companhias aéreas, aviação executiva.',
    specificQuestions: [
      { id: 'flight_hours', question: 'Horas de voo', type: 'number', required: true },
      { id: 'aircraft_types', question: 'Tipos de aeronave', type: 'textarea', required: true }
    ],
    cvTemplate: {
      colors: { primary: '#DC2626', secondary: '#B91C1C', accent: '#FEE2E2' },
      style: 'formal',
      layout: 'classic'
    }
  },
  {
    id: 'capitao-navio',
    name: 'Capitão de Navio',
    category: 'Transporte',
    description: 'Comandante responsável pela operação de embarcações.',
    objectives: 'Comandar embarcações com segurança.',
    importance: 'Essencial para transporte marítimo.',
    applicationAreas: 'Navegação marítima, portos, pesca.',
    specificQuestions: [
      { id: 'navigation_experience', question: 'Experiência em navegação', type: 'number', required: true },
      { id: 'vessel_types', question: 'Tipos de embarcação', type: 'textarea', required: true }
    ],
    cvTemplate: {
      colors: { primary: '#DC2626', secondary: '#B91C1C', accent: '#FEE2E2' },
      style: 'formal',
      layout: 'classic'
    }
  },
  {
    id: 'operador-logistica',
    name: 'Operador de Logística',
    category: 'Transporte',
    description: 'Especialista em operações logísticas e distribuição.',
    objectives: 'Otimizar fluxo de mercadorias e distribuição.',
    importance: 'Fundamental para cadeia de suprimentos.',
    applicationAreas: 'Centros de distribuição, empresas logísticas.',
    specificQuestions: [
      { id: 'logistics_experience', question: 'Experiência em logística', type: 'number', required: true },
      { id: 'logistics_systems', question: 'Sistemas logísticos', type: 'textarea', required: true }
    ],
    cvTemplate: {
      colors: { primary: '#DC2626', secondary: '#B91C1C', accent: '#FEE2E2' },
      style: 'formal',
      layout: 'classic'
    }
  },

  // Alimentação
  {
    id: 'chef-cozinha',
    name: 'Chef de Cozinha',
    category: 'Alimentação',
    description: 'Profissional especializado em culinária e gestão de cozinha.',
    objectives: 'Criar pratos excepcionais e liderar equipe de cozinha.',
    importance: 'Fundamental para experiência gastronômica.',
    applicationAreas: 'Restaurantes, hotéis, catering.',
    specificQuestions: [
      { id: 'culinary_experience', question: 'Experiência culinária', type: 'number', required: true },
      { id: 'cuisine_specialization', question: 'Especialização culinária', type: 'text', required: true }
    ],
    cvTemplate: {
      colors: { primary: '#F59E0B', secondary: '#D97706', accent: '#FEF3C7' },
      style: 'creative',
      layout: 'classic'
    }
  },
  {
    id: 'garcom',
    name: 'Garçom',
    category: 'Alimentação',
    description: 'Profissional responsável pelo atendimento em restaurantes.',
    objectives: 'Proporcionar excelente experiência gastronômica.',
    importance: 'Essencial para qualidade do serviço.',
    applicationAreas: 'Restaurantes, bares, hotéis.',
    specificQuestions: [
      { id: 'service_experience', question: 'Experiência em atendimento', type: 'number', required: true },
      { id: 'service_style', question: 'Estilo de serviço', type: 'text', required: true }
    ],
    cvTemplate: {
      colors: { primary: '#F59E0B', secondary: '#D97706', accent: '#FEF3C7' },
      style: 'formal',
      layout: 'classic'
    }
  },
  {
    id: 'nutricionista',
    name: 'Nutricionista',
    category: 'Alimentação',
    description: 'Especialista em nutrição e alimentação saudável.',
    objectives: 'Promover saúde através da alimentação adequada.',
    importance: 'Fundamental para saúde pública.',
    applicationAreas: 'Clínicas, hospitais, escolas, academias.',
    specificQuestions: [
      { id: 'nutrition_experience', question: 'Experiência em nutrição', type: 'number', required: true },
      { id: 'specialization_area', question: 'Área de especialização', type: 'text', required: true }
    ],
    cvTemplate: {
      colors: { primary: '#059669', secondary: '#047857', accent: '#D1FAE5' },
      style: 'medical',
      layout: 'classic'
    }
  },
  {
    id: 'padeiro',
    name: 'Padeiro',
    category: 'Alimentação',
    description: 'Especialista em panificação e confeitaria.',
    objectives: 'Produzir pães e doces de qualidade.',
    importance: 'Essencial para alimentação básica.',
    applicationAreas: 'Padarias, confeitarias, hotéis.',
    specificQuestions: [
      { id: 'baking_experience', question: 'Experiência em panificação', type: 'number', required: true },
      { id: 'baking_specialties', question: 'Especialidades', type: 'textarea', required: true }
    ],
    cvTemplate: {
      colors: { primary: '#F59E0B', secondary: '#D97706', accent: '#FEF3C7' },
      style: 'creative',
      layout: 'classic'
    }
  },
  {
    id: 'confeiteiro',
    name: 'Confeiteiro',
    category: 'Alimentação',
    description: 'Especialista em doces, bolos e sobremesas.',
    objectives: 'Criar doces e sobremesas artísticas.',
    importance: 'Fundamental para eventos e celebrações.',
    applicationAreas: 'Confeitarias, eventos, hotéis.',
    specificQuestions: [
      { id: 'pastry_experience', question: 'Experiência em confeitaria', type: 'number', required: true },
      { id: 'pastry_techniques', question: 'Técnicas dominadas', type: 'textarea', required: true }
    ],
    cvTemplate: {
      colors: { primary: '#F59E0B', secondary: '#D97706', accent: '#FEF3C7' },
      style: 'creative',
      layout: 'classic'
    }
  },

  // Segurança
  {
    id: 'seguranca',
    name: 'Segurança',
    category: 'Segurança',
    description: 'Profissional responsável pela proteção de pessoas e patrimônio.',
    objectives: 'Garantir segurança e prevenir incidentes.',
    importance: 'Fundamental para proteção patrimonial.',
    applicationAreas: 'Empresas, eventos, condomínios.',
    specificQuestions: [
      { id: 'security_experience', question: 'Experiência em segurança', type: 'number', required: true },
      { id: 'security_areas', question: 'Áreas de atuação', type: 'textarea', required: true }
    ],
    cvTemplate: {
      colors: { primary: '#374151', secondary: '#1F2937', accent: '#F3F4F6' },
      style: 'formal',
      layout: 'classic'
    }
  },
  {
    id: 'vigilante',
    name: 'Vigilante',
    category: 'Segurança',
    description: 'Profissional certificado para vigilância patrimonial.',
    objectives: 'Proteger patrimônio e pessoas através de vigilância.',
    importance: 'Essencial para segurança patrimonial.',
    applicationAreas: 'Empresas, bancos, shoppings.',
    specificQuestions: [
      { id: 'vigilance_experience', question: 'Experiência em vigilância', type: 'number', required: true },
      { id: 'certifications', question: 'Certificações', type: 'textarea', required: true }
    ],
    cvTemplate: {
      colors: { primary: '#374151', secondary: '#1F2937', accent: '#F3F4F6' },
      style: 'formal',
      layout: 'classic'
    }
  },
  {
    id: 'bombeiro',
    name: 'Bombeiro',
    category: 'Segurança',
    description: 'Profissional especializado em combate a incêndios e salvamentos.',
    objectives: 'Salvar vidas e proteger o patrimônio.',
    importance: 'Fundamental para segurança pública.',
    applicationAreas: 'Corpo de bombeiros, empresas, indústrias.',
    specificQuestions: [
      { id: 'firefighting_experience', question: 'Experiência em bombeiros', type: 'number', required: true },
      { id: 'rescue_specialties', question: 'Especialidades em salvamento', type: 'textarea', required: true }
    ],
    cvTemplate: {
      colors: { primary: '#DC2626', secondary: '#B91C1C', accent: '#FEE2E2' },
      style: 'formal',
      layout: 'classic'
    }
  },
  {
    id: 'policial',
    name: 'Policial',
    category: 'Segurança',
    description: 'Agente da lei responsável pela segurança pública.',
    objectives: 'Manter a ordem e proteger a sociedade.',
    importance: 'Pilar fundamental da segurança pública.',
    applicationAreas: 'Polícia civil, militar, federal.',
    specificQuestions: [
      { id: 'police_experience', question: 'Experiência policial', type: 'number', required: true },
      { id: 'police_specialization', question: 'Especialização', type: 'text', required: true }
    ],
    cvTemplate: {
      colors: { primary: '#1E40AF', secondary: '#1E3A8A', accent: '#DBEAFE' },
      style: 'formal',
      layout: 'classic'
    }
  },
  {
    id: 'detetive',
    name: 'Detetive',
    category: 'Segurança',
    description: 'Investigador especializado em solução de casos.',
    objectives: 'Investigar e solucionar crimes e mistérios.',
    importance: 'Essencial para investigação criminal.',
    applicationAreas: 'Polícia civil, agências de investigação.',
    specificQuestions: [
      { id: 'investigation_experience', question: 'Experiência em investigação', type: 'number', required: true },
      { id: 'case_types', question: 'Tipos de caso', type: 'textarea', required: true }
    ],
    cvTemplate: {
      colors: { primary: '#374151', secondary: '#1F2937', accent: '#F3F4F6' },
      style: 'formal',
      layout: 'classic'
    }
  }
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
