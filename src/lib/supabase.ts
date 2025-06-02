
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mzwtggvhsjfvlfbanoym.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16d3RnZ3Zoc2pmdmxmYmFub3ltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2OTU5NDEsImV4cCI6MjA2NDI3MTk0MX0.ZZbdMhN7Eer521FoG_I_P9CFUa0acphy9NFjjISD3cI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    persistSession: true,
    autoRefreshToken: true,
  }
});

export const isSupabaseConfigured = () => {
  return true;
};
