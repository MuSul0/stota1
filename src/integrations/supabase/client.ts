import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || 'https://tjlupvwotgqmgarudwdw.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqbHVwdndvdGdxbWdhcnVkd2R3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2MzQ3OTEsImV4cCI6MjA2MDIxMDc5MX0.yx9pP0M8EdvfDyzeNjbvIJLGv0pQ-1q9zo6zdIkhTsg';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});