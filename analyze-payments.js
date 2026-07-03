import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ojwhrtwfqjshimkpupnz.supabase.co';
const supabaseServiceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qd2hydHdmcWpzaGlta3B1cG56Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDYwMzI0OSwiZXhwIjoyMDkwMTc5MjQ5fQ.MMTymaRV2mZG4eJK0BkMV1Gdc4RcFRQzoNTjknWp7GY';

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

async function analyzePayments() {
  const { data: payments, error } = await supabase
    .from('payments')
    .select('*');
    
  if (error) {
    console.error('Error fetching payments:', error);
    return;
  }
  
  console.log(`Total payment attempts: ${payments.length}`);
  
  const statusCounts = payments.reduce((acc, p) => {
    acc[p.status] = (acc[p.status] || 0) + 1;
    return acc;
  }, {});
  
  console.log('Payment Statuses:', statusCounts);
  
  // Let's also get recent pending/failed ones to see timestamps
  const recentStuck = payments
    .filter(p => p.status !== 'paid' && p.status !== 'completed')
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 5);
    
  console.log('Recent stuck/pending payments:', recentStuck.map(p => ({
    id: p.id,
    status: p.status,
    created_at: p.created_at,
    paysuite_id: p.paysuite_id
  })));
}

analyzePayments();
