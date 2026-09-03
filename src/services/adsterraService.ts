import { supabase } from '@/lib/supabase';

export interface AdsterraDailyStat {
  date: string;
  impressions: number;
  clicks: number;
  ctr: number;
  cpm_usd: number;
  revenue_usd: number;
  revenue_mzn: number;
}

export interface AdsterraSummary {
  total_revenue_usd: string;
  total_revenue_mzn: string;
  total_impressions: number;
  total_clicks: number;
  avg_cpm_usd: string;
}

export interface AdsterraApiResponse {
  success: boolean;
  summary?: AdsterraSummary;
  daily_stats?: AdsterraDailyStat[];
  error?: string;
}

/**
 * Busca estatísticas de monetização do Adsterra via Supabase Edge Function
 */
export const getAdsterraStats = async (
  startDate?: string,
  finishDate?: string
): Promise<AdsterraApiResponse> => {
  try {
    const { data, error } = await supabase.functions.invoke('adsterra-stats', {
      body: { start_date: startDate, finish_date: finishDate }
    });

    if (error) throw error;
    return data as AdsterraApiResponse;
  } catch (err: any) {
    console.error('Erro ao buscar estatísticas do Adsterra:', err);
    return {
      success: false,
      error: err.message || 'Falha na ligação com o servidor do Adsterra.'
    };
  }
};
