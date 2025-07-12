import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // 1. Request-Body validieren und Supabase Admin-Client initialisieren
    const { email, password, firstName, lastName } = await req.json();
    if (!email || !password || !firstName || !lastName) {
      return new Response(JSON.stringify({ error: "Alle Felder sind erforderlich." }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // SICHERHEITS-FIX: Serverseitige Passwortlängen-Validierung
    if (password.length < 6) {
      return new Response(JSON.stringify({ error: "Das Passwort muss mindestens 6 Zeichen lang sein." }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // 2. Anfragenden Benutzer authentifizieren und auf Admin-Rolle prüfen
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Autorisierung fehlt." }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(token);

    if (userError || !user) {
      return new Response(JSON.stringify({ error: "Authentifizierung fehlgeschlagen: " + (userError?.message || 'Benutzer nicht gefunden') }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const { data: profile, error: profileError } = await supabaseAdmin.from('profiles').select('role').eq('id', user.id).single();

    if (profileError || profile?.role !== 'admin') {
      return new Response(JSON.stringify({ error: "Zugriff verweigert. Admin-Rolle erforderlich." }), { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // 3. Neuen Mitarbeiter-Benutzer erstellen
    const { data: newUserData, error: createUserError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      user_metadata: { role: "mitarbeiter", first_name: firstName, last_name: lastName },
      email_confirm: true,
    });

    if (createUserError) {
      return new Response(JSON.stringify({ error: "Benutzer konnte nicht erstellt werden: " + createUserError.message }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // 4. Benutzerdefinierte Willkommens-E-Mail in die Warteschlange stellen
    const welcomeSubject = 'Willkommen als Mitarbeiter bei Stotta Transport';
    const welcomeText = `Hallo ${firstName},\n\nherzlich willkommen im Team von Stotta Transport!\n\nIhr Mitarbeiterkonto wurde erfolgreich erstellt. Sie können sich nach Bestätigung Ihrer E-Mail-Adresse anmelden.\n\nMit freundlichen Grüßen\nIhre Geschäftsleitung`;

    const { error: emailError } = await supabaseAdmin
      .from('email_queue')
      .insert([{
        to_email: email,
        subject: welcomeSubject,
        text: welcomeText,
        status: 'pending'
      }]);

    if (emailError) {
      console.error('Fehler beim Einreihen der Willkommens-E-Mail:', emailError.message);
    }

    // 5. Erfolgsantwort zurückgeben
    return new Response(JSON.stringify({ success: true, user: newUserData.user }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});