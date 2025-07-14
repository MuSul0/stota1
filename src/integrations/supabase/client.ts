import { createClient } from '@supabase/supabase-js';

// Supabase URL and anon public key for client-side usage
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL und Key müssen in Ihrer .env-Datei definiert sein. Bitte erstellen Sie eine .env-Datei im Stammverzeichnis Ihres Projekts mit VITE_SUPABASE_URL und VITE_SUPABASE_KEY.');
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  }
});