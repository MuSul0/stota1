import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { email, role } = await req.json()
    
    let subject = ''
    let text = ''

    if (role === 'kunde') {
      subject = 'Willkommen als Kunde bei Stota Transport'
      text = `Sehr geehrter Kunde,\n\nherzlich willkommen bei Stota Transport!\n\nIhr Konto wurde erfolgreich erstellt.\n\nMit freundlichen Grüßen\nIhr Stota Transport Team`
    } else if (role === 'mitarbeiter') {
      subject = 'Willkommen als Mitarbeiter bei Stota Transport'
      text = `Hallo Kollege,\n\nherzlich willkommen im Team von Stota Transport!\n\nIhr Mitarbeiterkonto wurde erfolgreich erstellt.\n\nMit freundlichen Grüßen\nIhre Geschäftsleitung`
    } else if (role === 'admin') {
      subject = 'Willkommen als Administrator bei Stota Transport'
      text = `Sehr geehrte/r Administrator/in,\n\nherzlich willkommen im Admin-Bereich von Stota Transport!\n\nIhr Administratorkonto wurde erfolgreich erstellt.\n\nMit freundlichen Grüßen\nDas Systemteam`
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    const { error } = await supabase
      .from('email_queue')
      .insert([{ 
        to_email: email,
        subject: subject,
        text: text,
        status: 'pending'
      }])

    if (error) throw error

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})