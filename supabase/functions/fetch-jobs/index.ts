import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Trata preflight request do CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { searchTerm, city, category } = await req.json();

    const serpApiKey = Deno.env.get('SERPAPI_KEY');
    
    if (!serpApiKey) {
      throw new Error('Chave da API SerpApi não configurada no Supabase.');
    }

    // Construir a query para o Google Jobs
    let query = 'vagas ';
    if (category && category !== 'Todas') {
      query += `de ${category} `;
    }
    if (searchTerm) {
      query += `${searchTerm} `;
    }
    if (city && city !== 'Todas') {
      query += `em ${city} `;
    }
    query += 'Moçambique';

    // Fazer fetch à SerpApi (Google Jobs)
    const url = `https://serpapi.com/search.json?engine=google_jobs&q=${encodeURIComponent(query)}&api_key=${serpApiKey}&gl=mz&hl=pt`;
    
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    // Mapear resultados da SerpApi para a nossa estrutura JobOpportunity
    const jobsResults = data.jobs_results || [];
    
    const formattedJobs = jobsResults.map((job: any, index: number) => {
      // Tentar extrair o salário das extensions
      const extensions = job.extensions || [];
      const type = extensions.find((ext: string) => ext.toLowerCase().includes('tempo inteiro') || ext.toLowerCase().includes('part-time') || ext.toLowerCase().includes('contract')) || 'Tempo Inteiro';
      
      return {
        id: job.job_id || `api-${index}`,
        title: job.title || 'Vaga não especificada',
        company: job.company_name || 'Empresa não divulgada',
        location: job.location || city !== 'Todas' ? city : 'Moçambique',
        category: category !== 'Todas' ? category : 'Geral',
        type: type,
        postedDate: extensions[1] || 'Recente',
        deadline: 'Consultar no link oficial',
        salary: 'Salário não especificado',
        description: job.description || 'Nenhuma descrição fornecida pelo anunciante.',
        requirements: ['Ver os requisitos completos na descrição da vaga'],
        responsibilities: ['Responsabilidades detalhadas na descrição'],
        featured: false
      };
    });

    return new Response(JSON.stringify({ jobs: formattedJobs }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});
