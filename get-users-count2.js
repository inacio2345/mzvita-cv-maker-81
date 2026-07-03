import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ojwhrtwfqjshimkpupnz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qd2hydHdmcWpzaGlta3B1cG56Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2MDMyNDksImV4cCI6MjA5MDE3OTI0OX0.AaxnvyqNlDD6kcpUnPsL0XUWaXyzS4B2h3vqh8MwzS4';
const supabase = createClient(supabaseUrl, supabaseKey);

async function countUsers() {
  const { count: count1, error: err1 } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true });
    
  if (err1) {
    console.error('Error fetching profiles count:', err1.message);
  } else {
    console.log(`Total users in profiles: ${count1}`);
  }

  const { count: count2, error: err2 } = await supabase
    .from('saved_cvs')
    .select('*', { count: 'exact', head: true });
    
  if (err2) {
    console.error('Error fetching saved_cvs count:', err2.message);
  } else {
    console.log(`Total saved_cvs: ${count2}`);
  }
}

countUsers();
