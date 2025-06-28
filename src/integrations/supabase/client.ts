import { createClient } from '@supabase/supabase-js';

// Use these default values or replace with your actual Supabase credentials
const DEFAULT_SUPABASE_URL = 'https://edcuorkphchuobrfqvyb.supabase.co';
const DEFAULT_SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkY3VvcmtwaGNodW9icmZxdnliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEwNTk2MDQsImV4cCI6MjA2NjYzNTYwNH0.9CG7Nx32Eis0vZDk_wniAPAOZ7nLdnYLjuFDu2WActw';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY || DEFAULT_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL and Key must be defined in environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false
  }
});