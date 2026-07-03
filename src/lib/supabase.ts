
// Re-export the single canonical Supabase client to avoid multiple GoTrueClient instances
export { supabase } from '@/integrations/supabase/client';

export const isSupabaseConfigured = () => {
  return !!import.meta.env.VITE_SUPABASE_URL && !!import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
};
