import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tjlupvwotgqmgarudwdw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqbHVwdndvdGdxbWdhcnVkd2R3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2MzQ3OTEsImV4cCI6MjA2MDIxMDc5MX0.yx9pP0M8EdvfDyzeNjbvIJLGv0pQ-1q9zo6zdIkhTsg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Debugging
supabase.auth.onAuthStateChange((event, session) => {
  console.log('Auth state changed:', event, session);
});