import { supabase } from '@/lib/supabase';
import { blogPosts as staticPosts, BlogPostData } from '@/data/blogPosts';

export interface BlogFAQ {
  question: string;
  answer: string;
}

export interface DbBlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  meta_description?: string;
  category: string;
  author: string;
  read_time: string;
  image: string;
  content: string;
  faqs?: BlogFAQ[];
  featured: boolean;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface UnifiedBlogPost {
  id: string | number;
  slug: string;
  title: string;
  excerpt: string;
  metaDescription?: string;
  category: string;
  author: string;
  readTime: string;
  image: string;
  content: string;
  faqs?: BlogFAQ[];
  featured: boolean;
  date: string;
  isDb?: boolean;
}

// Converter registro do banco para o padrão unificado
export const mapDbPostToUnified = (dbPost: DbBlogPost): UnifiedBlogPost => ({
  id: dbPost.id,
  slug: dbPost.slug,
  title: dbPost.title,
  excerpt: dbPost.excerpt,
  metaDescription: dbPost.meta_description || dbPost.excerpt,
  category: dbPost.category,
  author: dbPost.author,
  readTime: dbPost.read_time,
  image: dbPost.image || '/blog/sites-emprego.jpg',
  content: dbPost.content,
  faqs: Array.isArray(dbPost.faqs) ? dbPost.faqs : [],
  featured: dbPost.featured,
  date: dbPost.created_at ? dbPost.created_at.split('T')[0] : new Date().toISOString().split('T')[0],
  isDb: true
});

// Converter post estático para o padrão unificado
export const mapStaticPostToUnified = (post: BlogPostData): UnifiedBlogPost => ({
  id: post.id,
  slug: post.slug,
  title: post.title,
  excerpt: post.excerpt,
  metaDescription: post.metaDescription || post.excerpt,
  category: post.category,
  author: post.author,
  readTime: post.readTime,
  image: post.image,
  content: post.content,
  faqs: [
    {
      question: "Este conteúdo é atualizado e adaptado a Moçambique?",
      answer: "Sim, os nossos artigos são desenvolvidos com base na realidade do mercado de trabalho moçambicano, leis locais e exigências das empresas em Maputo, Matola, Beira, Nampula e Tete."
    },
    {
      question: "Como o MozVita pode me ajudar a conseguir esta vaga?",
      answer: "O MozVita disponibiliza modelos de currículos profissionais prontos, cartas de apresentação e orientações práticas aprovadas por recrutadores e gestores de RH em Moçambique."
    }
  ],
  featured: post.featured,
  date: post.date,
  isDb: false
});

/**
 * Busca todos os posts públicos (banco + estáticos)
 */
export const getPublicBlogPosts = async (): Promise<UnifiedBlogPost[]> => {
  let dbPosts: UnifiedBlogPost[] = [];
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false });

    if (!error && data) {
      dbPosts = data.map((item: any) => mapDbPostToUnified(item as DbBlogPost));
    }
  } catch (err) {
    console.warn('[blogService] Aviso ao carregar posts do Supabase, usando posts estáticos:', err);
  }

  // Combinar sem duplicar slugs
  const staticMapped = staticPosts.map(mapStaticPostToUnified);
  const dbSlugs = new Set(dbPosts.map(p => p.slug));
  const remainingStatic = staticMapped.filter(p => !dbSlugs.has(p.slug));

  return [...dbPosts, ...remainingStatic];
};

/**
 * Busca um artigo específico pelo slug (banco prioritário, fallback estático)
 */
export const getBlogPostBySlug = async (slug: string): Promise<UnifiedBlogPost | null> => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (!error && data) {
      return mapDbPostToUnified(data as DbBlogPost);
    }
  } catch (err) {
    console.warn('[blogService] Busca no Supabase falhou, buscando estático:', err);
  }

  const staticMatch = staticPosts.find(p => p.slug === slug);
  return staticMatch ? mapStaticPostToUnified(staticMatch) : null;
};

/**
 * Busca todos os posts para o painel de administração (inclui rascunhos)
 */
export const getAdminBlogPosts = async (): Promise<DbBlogPost[]> => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[blogService] Erro ao listar posts admin:', error);
    throw error;
  }
  return (data || []) as DbBlogPost[];
};

/**
 * Criação de novo artigo pelo admin
 */
export const createAdminBlogPost = async (post: Omit<DbBlogPost, 'id' | 'created_at' | 'updated_at'>): Promise<DbBlogPost> => {
  const { data, error } = await supabase
    .from('blog_posts')
    .insert([{
      ...post,
      faqs: post.faqs || [],
      updated_at: new Date().toISOString()
    }])
    .select()
    .single();

  if (error) {
    console.error('[blogService] Erro ao criar artigo:', error);
    throw error;
  }
  return data as DbBlogPost;
};

/**
 * Atualização de artigo pelo admin
 */
export const updateAdminBlogPost = async (id: string, updates: Partial<DbBlogPost>): Promise<DbBlogPost> => {
  const { data, error } = await supabase
    .from('blog_posts')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('[blogService] Erro ao atualizar artigo:', error);
    throw error;
  }
  return data as DbBlogPost;
};

/**
 * Exclusão de artigo pelo admin
 */
export const deleteAdminBlogPost = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('[blogService] Erro ao apagar artigo:', error);
    throw error;
  }
};

/**
 * Geração de Artigo Completo com IA especialista em Moçambique (SEO e 1000 a 2000 palavras)
 */
export const generateAiArticle = async (topic: string, category: string = 'Mercado de Trabalho'): Promise<{
  title: string;
  slug: string;
  excerpt: string;
  meta_description: string;
  content: string;
  category: string;
  read_time: string;
  faqs: BlogFAQ[];
}> => {
  const prompt = `Você é um Redator Especialista Sênior em SEO e Mercado de Trabalho em Moçambique para a plataforma MozVita (www.mozvita.online).
Crie um artigo aprofundado, completo, prático e de altíssima qualidade para o tema: "${topic}".
Categoria: "${category}".

REQUISITOS OBRIGATÓRIOS DE CONTEÚDO E SEO:
1. EXTENSÃO: O artigo deve ser LONGO e COMPLETO, contendo entre 1.000 a 2.000 palavras no corpo do texto ("content"). Evite resumos ou textos superficiais.
2. ESTRUTURA HTML LIMPA:
   - Comece com <p class="lead"> contextualizando a realidade do profissional em Moçambique (Maputo, Beira, Nampula, Tete, etc.).
   - Divida em seções lógicas usando <h2> para os tópicos principais e <h3> para subtópicos detalhados.
   - Use <p> bem desenvolvidos com 3 a 5 linhas cada.
   - Destaque termos-chave importantes e expressões de busca com <strong>negrito</strong> para melhorar a leitura escaneável e o SEO.
   - Use listas estruturadas com <ul><li><strong>Conceito:</strong> Explicação detalhada.</li></ul> ou <ol><li><strong>Passo:</strong> Ação prática.</li></ol>.
   - Insira caixas de destaque com dicas práticas usando <div class="my-6 p-5 bg-blue-50 border-l-4 border-blue-600 rounded-r-xl">...</div>.
   - No final, inclua uma caixa de chamada para ação convidando o leitor a criar seu currículo profissional no MozVita apontando para "/modelos" ou "/criar-cv".
3. CONTEXTO MOÇAMBICANO:
   - Cite aspectos práticos como: envio de CV em PDF, províncias (Maputo, Matola, Sofala, Nampula, Cabo Delgado), setores em alta (ONGs, logística, banca, mineração/gás, telecomunicações, comércio), e canais de recrutamento habituais.
4. FAQ (PERGUNTAS FREQUENTES):
   - Forneça 3 a 4 perguntas e respostas detalhadas no array "faqs".
5. FORMATO DE RESPOSTA:
   - Responda ESTRITAMENTE em formato JSON puro, sem blocos markdown fora do JSON.
   
Schema JSON exato:
{
  "title": "Título com alto CTR otimizado para busca orgânica",
  "slug": "slug-otimizado-separado-por-hifens",
  "excerpt": "Resumo chamativo de 2 linhas para o card do artigo no blog",
  "meta_description": "Meta descrição para o Google com até 155 caracteres contendo a palavra-chave principal",
  "read_time": "10 min",
  "content": "<p class=\\"lead\\">...</p><h2>...</h2><p>...</p>",
  "faqs": [
    { "question": "Pergunta frequente 1?", "answer": "Resposta completa e prática 1." },
    { "question": "Pergunta frequente 2?", "answer": "Resposta completa e prática 2." },
    { "question": "Pergunta frequente 3?", "answer": "Resposta completa e prática 3." }
  ]
}`;

  try {
    const { data, error } = await supabase.functions.invoke('generate-cv-text', {
      body: {
        prompt,
        fieldType: 'blog_article',
        tone: 'Autoridade, Prático e Detalhado'
      }
    });

    if (error) throw error;

    let rawText = data?.text || '';
    rawText = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();

    const parsed = JSON.parse(rawText);
    
    // Validar e formatar FAQs
    const parsedFaqs: BlogFAQ[] = Array.isArray(parsed.faqs) && parsed.faqs.length > 0
      ? parsed.faqs.map((f: any) => ({
          question: String(f.question || 'Pergunta sobre o mercado de trabalho'),
          answer: String(f.answer || 'Orientação profissional recomendada pelo MozVita.')
        }))
      : [
          {
            question: `Qual é o primeiro passo para ter sucesso com ${topic} em Moçambique?`,
            answer: `O primeiro passo é pesquisar os requisitos específicos das empresas moçambicanas, alinhar as suas competências e apresentar um currículo profissional em formato PDF atualizado.`
          },
          {
            question: `Como destacar este diferencial perante recrutadores moçambicanos?`,
            answer: `Destaque resultados mensuráveis, use termos técnicos do setor e mencione sua facilidade de adaptação à cultura corporativa da empresa contratante.`
          },
          {
            question: `O MozVita oferece suporte ou modelos para esta área?`,
            answer: `Sim! O MozVita possui modelos de currículo e cartas de apresentação otimizados para todos os setores de trabalho em Moçambique.`
          }
        ];

    return {
      title: parsed.title || topic,
      slug: parsed.slug || topic.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      excerpt: parsed.excerpt || `Guia completo e aprofundado sobre ${topic} no mercado de trabalho em Moçambique.`,
      meta_description: parsed.meta_description || parsed.excerpt || '',
      content: parsed.content || `<p>${topic}</p>`,
      category: category || 'Mercado de Trabalho',
      read_time: parsed.read_time || '10 min',
      faqs: parsedFaqs
    };
  } catch (err) {
    console.warn('[blogService] Falha na IA via Edge Function, gerando artigo aprofundado (1000+ palavras):', err);
    const cleanSlug = topic.toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    return {
      title: `${topic}: O Guia Completo e Estratégico para Moçambique em 2026`,
      slug: cleanSlug || `guia-${Date.now()}`,
      excerpt: `Aprenda o passo a passo definitivo sobre ${topic} no mercado de trabalho moçambicano. Recomendações práticas, técnicas de contratação e modelos de sucesso.`,
      meta_description: `Descubra tudo sobre ${topic} em Moçambique. Guia prático de 2026 com dicas de contratação, currículo e oportunidades em Maputo e províncias.`,
      category: category,
      read_time: '12 min',
      content: `
        <p class="lead">O mercado de trabalho em Moçambique está a passar por transformações aceleradas. Compreender a fundo o impacto de <strong>${topic}</strong> é essencial para quem busca estabilidade, valorização salarial e novas oportunidades em Maputo, Matola, Beira, Nampula e Tete.</p>

        <h2>1. O Cenário Atual e a Importância de ${topic} em Moçambique</h2>
        <p>Nos últimos anos, o perfil de contratação das empresas que operam no território moçambicano — desde multinacionais dos setores de energia e logística até pequenas e médias empresas (PMEs) e ONGs — tornou-se extremamente rigoroso. Os recrutadores procuram profissionais que não apenas possuam a formação básica, mas que compreendam o valor prático de <strong>${topic}</strong> em seu dia a dia.</p>
        <p>Muitos candidatos enviam dezenas de candidaturas sem receber retorno justamente porque ignoram as particularidades da cultura corporativa moçambicana. É fundamental demonstrar clareza, seriedade e proatividade desde o primeiro contato.</p>

        <h2>2. Principais Desafios Enfrentados pelos Profissionais</h2>
        <p>Ao abordar <strong>${topic}</strong>, os profissionais moçambicanos deparam-se frequentemente com obstáculos comuns, tais como:</p>
        <ul>
          <li><strong>Falta de direcionamento estratégico:</strong> Muitos candidatos não alinham suas qualificações com as reais demandas das vagas abertas.</li>
          <li><strong>Currículos desatualizados ou desformatados:</strong> Documentos em Word com formatação quebrada ou arquivos pesados que não abrem no telemóvel dos recrutadores.</li>
          <li><strong>Comunicação passiva:</strong> Esperar que a oportunidade surja sem investir em networking qualificado no LinkedIn ou eventos profissionais locais.</li>
          <li><strong>Desconhecimento dos requisitos regionais:</strong> Exigências que variam significativamente entre a região sul (Maputo) e os polos de desenvolvimento no centro e norte do país.</li>
        </ul>

        <h2>3. Passo a Passo Prático para Dominar ${topic}</h2>
        <p>Para se posicionar como uma referência e conquistar a atenção dos responsáveis pelo recrutamento, siga este roteiro testado e aprovado:</p>
        <ol>
          <li><strong>Diagnóstico de Perfil:</strong> Faça uma autoavaliação honesta. Identifique quais competências você já domina e quais ferramentas ou certificações ainda precisa adquirir para se destacar em <strong>${topic}</strong>.</li>
          <li><strong>Estruturação do Currículo:</strong> Certifique-se de que o seu CV contém uma seção de resumo profissional claro, listando suas maiores realizações com dados e números concretos.</li>
          <li><strong>Adequação à Linguagem do Setor:</strong> Utilize palavras-chave relevantes que os sistemas de triagem e gerentes de RH utilizam ao buscar novos talentos.</li>
          <li><strong>Preparação para a Entrevista:</strong> Pratique como explicar a sua trajetória em no máximo 2 minutos, mantendo postura formal, contato visual firme e segurança nas respostas.</li>
        </ol>

        <div class="my-6 p-5 bg-blue-50 border-l-4 border-blue-600 rounded-r-xl">
          <h4 class="font-bold text-blue-900 mb-1">Dica Estratégica da Equipe MozVita:</h4>
          <p class="text-blue-800 text-sm">Em Moçambique, a recomendação de outros profissionais e a pontualidade contam quase tanto quanto os diplomas. Chegue sempre 15 minutos antes da hora marcada para entrevistas presenciais e envie o seu currículo exclusivamente em formato <strong>PDF</strong>.</p>
        </div>

        <h2>4. Competências Técnicas e Comportamentais Mais Valorizadas</h2>
        <p>Para ter sucesso duradouro ao trabalhar com <strong>${topic}</strong>, é necessário equilibrar conhecimentos técnicos (Hard Skills) com habilidades humanas (Soft Skills):</p>
        <ul>
          <li><strong>Domínio de Ferramentas Digitais:</strong> Conhecimento prático do pacote Office (especialmente Excel), ferramentas de comunicação corporativa e navegação ágil pela internet.</li>
          <li><strong>Comunicação Clara e Respeitosa:</strong> Capacidade de redigir emails profissionais, relatórios sucintos e tratar colegas e clientes com cordialidade.</li>
          <li><strong>Capacidade de Resolução de Problemas:</strong> Recrutadores não querem funcionários que apenas apontem dificuldades, mas sim colaboradores que apresentem alternativas viáveis.</li>
          <li><strong>Ética Profissional e Pontualidade:</strong> Integridade nas relações de trabalho e respeito absoluto aos prazos estabelecidos.</li>
        </ul>

        <h2>5. O Que Evitar a Todo Custo</h2>
        <p>Evite erros que podem desqualificar a sua candidatura de forma imediata:</p>
        <ul>
          <li><strong>Mentir no Currículo:</strong> Informar níveis de línguas (como inglês fluente) ou experiências que não condizem com a verdade.</li>
          <li><strong>Currículo sem foco:</strong> Enviar o mesmo documento genérico para vagas de áreas totalmente distintas.</li>
          <li><strong>Desleixo visual:</strong> Uso de fontes ilegíveis, cores berrantes ou fotos inadequadas (como fotos recortadas de festas ou selfies).</li>
        </ul>

        <h2>6. Conclusão e Próximos Passos</h2>
        <p>Dominar <strong>${topic}</strong> não é uma questão de sorte, mas sim de método, dedicação e apresentação profissional impecável. Ao aplicar estas orientações, você estará vários passos à frente da concorrência no mercado moçambicano.</p>
        <p>Lembre-se: o seu currículo é a sua ferramenta de marketing pessoal mais importante. É ele que abre a porta para que você mostre todo o seu valor numa entrevista presencial ou remota.</p>

        <div class="mt-8 p-6 bg-brand-50 rounded-2xl border border-brand-200 text-center">
          <h3 class="text-xl font-bold text-slate-900 mb-2">Pronto para Criar o Seu Currículo Profissional?</h3>
          <p class="text-slate-600 mb-4 max-w-xl mx-auto">Use os modelos oficiais da MozVita, aprovados por recrutadores em todo o país. Fácil, rápido e em formato PDF perfeito para telemóvel e computador.</p>
          <a href="/modelos" class="inline-block bg-brand-600 text-white font-bold py-3 px-8 rounded-xl shadow-md hover:bg-brand-700 transition-all">Ver Modelos de Currículo Grátis &rarr;</a>
        </div>
      `,
      faqs: [
        {
          question: `Qual é o primeiro passo para começar a aplicar ${topic} na minha carreira em Moçambique?`,
          answer: `O primeiro passo é mapear as oportunidades reais nas empresas do seu setor em Maputo ou províncias, atualizar o seu currículo em PDF e destacar as competências específicas exigidas pelos anúncios.`
        },
        {
          question: `Como os recrutadores moçambicanos avaliam os candidatos nesta área?`,
          answer: `Eles avaliam a coerência da trajetória profissional, a clareza do currículo, a pontualidade e a capacidade de resolver problemas práticos no dia a dia da empresa.`
        },
        {
          question: `Como posso formatar meu currículo para garantir que seja lido?`,
          answer: `Utilize uma estrutura limpa com títulos bem definidos, dados de contacto atualizados, foco em conquistas reais e faça o download em formato PDF através da plataforma MozVita.`
        }
      ]
    };
  }
};

