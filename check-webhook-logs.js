import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ojwhrtwfqjshimkpupnz.supabase.co';
const supabaseServiceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qd2hydHdmcWpzaGlta3B1cG56Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDYwMzI0OSwiZXhwIjoyMDkwMTc5MjQ5fQ.MMTymaRV2mZG4eJK0BkMV1Gdc4RcFRQzoNTjknWp7GY';

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

async function checkWebhookLogs() {
  const { data: logs, error } = await supabase
    .from('webhook_logs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10);
    
  if (error) {
    console.error('Error fetching webhook_logs:', error);
    return;
  }
  
  console.log('Recent webhook logs:', logs.map(l => ({
    status: l.processing_status,
    error: l.error_message,
    event: l.event_type
  })));
}

checkWebhookLogs();
