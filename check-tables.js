import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ojwhrtwfqjshimkpupnz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qd2hydHdmcWpzaGlta3B1cG56Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2MDMyNDksImV4cCI6MjA5MDE3OTI0OX0.AaxnvyqNlDD6kcpUnPsL0XUWaXyzS4B2h3vqh8MwzS4';
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkUsers() {
  console.log("Checking user_profiles...");
  const { data: p1, error: e1 } = await supabase.from('user_profiles').select('*').limit(5);
  console.log("user_profiles:", p1 ? p1.length : p1, "error:", e1);

  console.log("Checking saved_cvs...");
  const { data: p2, error: e2 } = await supabase.from('saved_cvs').select('*').limit(5);
  console.log("saved_cvs:", p2 ? p2.length : p2, "error:", e2);

  console.log("Checking payments...");
  const { data: p3, error: e3 } = await supabase.from('payments').select('*').limit(5);
  console.log("payments:", p3 ? p3.length : p3, "error:", e3);
  
  console.log("Checking affiliates...");
  const { data: p4, error: e4 } = await supabase.from('affiliates').select('*').limit(5);
  console.log("affiliates:", p4 ? p4.length : p4, "error:", e4);
}

checkUsers();
