import { createClient } from '@supabase/supabase-js';

// Direkt aus Umgebungsvariablen lesen (bitte in Ihrem Build-System konfigurieren)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 
                    process.env.EXPO_PUBLIC_SUPABASE_URL || 
                    'https://edcuorkphchuobrfqvyb.supabase.co';

const supabaseKey = import.meta.env.VITE_SUPABASE_KEY || 
                   process.env.EXPO_PUBLIC_SUPABASE_KEY || 
                   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkY3VvcmtwaGNodW9icmZxdnliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEwNTk2MDQsImV4cCI6MjA2NjYzNTYwNH0.9CG7Nx32Eis0vZDk_wniAPAOZ7nLdnYLjuFDu2WActw';

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL und Key müssen definiert sein');
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    storage: typeof window !== 'undefined' ? window.localStorage : undefined
  }
});