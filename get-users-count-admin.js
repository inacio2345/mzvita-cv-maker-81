import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ojwhrtwfqjshimkpupnz.supabase.co';
const supabaseServiceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qd2hydHdmcWpzaGlta3B1cG56Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDYwMzI0OSwiZXhwIjoyMDkwMTc5MjQ5fQ.MMTymaRV2mZG4eJK0BkMV1Gdc4RcFRQzoNTjknWp7GY';

// Create a Supabase client with the service_role key to bypass RLS
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

async function countAllUsers() {
  const { count, error } = await supabase
    .from('user_profiles')
    .select('*', { count: 'exact', head: true });
    
  if (error) {
    console.error('Error fetching real users count:', error);
  } else {
    console.log(`Real total users in user_profiles: ${count}`);
  }
}

countAllUsers();
