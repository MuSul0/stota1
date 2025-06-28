import { createClient } from '@supabase/supabase-js';

// Default values from your project
const DEFAULT_SUPABASE_URL = 'https://edcuorkphchuobrfqvyb.supabase.co';
const DEFAULT_SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkY3VvcmtwaGNodW9icmZxdnliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEwNTk2MDQsImV4cCI6MjA2NjYzNTYwNH0.9CG7Nx32Eis0vZDk_wniAPAOZ7nLdnYLjuFDu2WActw';
const DEFAULT_SERVICE_ROLE_KEY = 'your-service-role-key-here'; // Get this from Supabase dashboard

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY || DEFAULT_SUPABASE_KEY;
const serviceRoleKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY || DEFAULT_SERVICE_ROLE_KEY;

// Regular client for frontend use
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false
  }
});

// Admin client for privileged operations
export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});