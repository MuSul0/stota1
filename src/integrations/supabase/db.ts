import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || 'https://edcuorkphchuobrfqvyb.supabase.co';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'RA75VcMrCapBq6Y9j1yJeF5QynAUQxQz4oZwFDNiaCY';

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error('Supabase URL und Service Role Key müssen definiert sein');
}

export const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    storage: typeof window !== 'undefined' ? window.localStorage : undefined
  }
});