import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || 'https://edcuorkphchuobrfqvyb.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkY3VvcmtwaGNodW9icmZxdnliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEwNTk2MDQsImV4cCI6MjA2NjYzNTYwNH0.9CG7Nx32Eis0vZDk_wniAPAOZ7nLdnYLjuFDu2WActw';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
});

// Einfache Abfrage-Funktion
export async function queryDatabase(query: string) {
  const { data, error } = await supabase.rpc('execute_query', { query });
  if (error) throw error;
  return data;
}