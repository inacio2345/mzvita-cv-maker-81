import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ojwhrtwfqjshimkpupnz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qd2hydHdmcWpzaGlta3B1cG56Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2MDMyNDksImV4cCI6MjA5MDE3OTI0OX0.AaxnvyqNlDD6kcpUnPsL0XUWaXyzS4B2h3vqh8MwzS4';
const supabase = createClient(supabaseUrl, supabaseKey);

async function countUsers() {
  const { count, error } = await supabase
    .from('user_profiles')
    .select('*', { count: 'exact', head: true });
    
  if (error) {
    console.error('Error fetching users count:', error);
  } else {
    console.log(`Total users in user_profiles: ${count}`);
  }
}

countUsers();
