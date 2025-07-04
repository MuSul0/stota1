import { createClient } from '@supabase/supabase-js';

// Directly use the environment variables (configure these in your build system)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 
                    process.env.EXPO_PUBLIC_SUPABASE_URL || 
                    'https://edcuorkphchuobrfqvyb.supabase.co';

const supabaseKey = import.meta.env.VITE_SUPABASE_KEY || 
                   process.env.EXPO_PUBLIC_SUPABASE_KEY || 
                   'sb_publishable_jSTLHDbOrCqJ-jLzBqajQA_uzZfyZJb';

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL and Key must be defined');
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    storage: typeof window !== 'undefined' ? window.localStorage : undefined
  }
});