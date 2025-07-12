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
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // SICHERHEITS-FIX: Admin-Berechtigungsprüfung hinzugefügt
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Autorisierung fehlt." }), { status: 401, headers: corsHeaders });
    }
    const token = authHeader.replace('Bearer ', '');
    const { data: { user: requestingUser }, error: userError } = await supabase.auth.getUser(token);

    if (userError || !requestingUser) {
      return new Response(JSON.stringify({ error: "Authentifizierung fehlgeschlagen." }), { status: 401, headers: corsHeaders });
    }

    const { data: profile, error: profileError } = await supabase.from('profiles').select('role').eq('id', requestingUser.id).single();

    if (profileError || profile?.role !== 'admin') {
      return new Response(JSON.stringify({ error: "Zugriff verweigert. Admin-Rolle erforderlich." }), { status: 403, headers: corsHeaders });
    }
    // ENDE SICHERHEITS-FIX

    const { email, password, first_name, last_name } = await req.json();

    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "Email und Passwort sind erforderlich" }),
        { status: 400, headers: corsHeaders }
      );
    }

    // Prüfen, ob Benutzer existiert
    const { data: users, error: listError } = await supabase.auth.admin.listUsers();
    if (listError) {
      return new Response(
        JSON.stringify({ error: listError.message }),
        { status: 500, headers: corsHeaders }
      );
    }

    const existingUser = users.users.find(u => u.email === email);

    if (existingUser) {
      // Benutzer aktualisieren: Passwort zurücksetzen und Metadaten setzen
      const { error: updateError } = await supabase.auth.admin.updateUserById(existingUser.id, {
        password,
        user_metadata: {
          role: "admin",
          first_name: first_name || "",
          last_name: last_name || "",
        },
        email_confirm: true, // E-Mail als bestätigt markieren
      });

      if (updateError) {
        return new Response(
          JSON.stringify({ error: updateError.message }),
          { status: 500, headers: corsHeaders }
        );
      }

      // Profil updaten
      const { error: profileError } = await supabase
        .from("profiles")
        .upsert({
          id: existingUser.id,
          email,
          role: "admin",
          first_name: first_name || "",
          last_name: last_name || "",
          updated_at: new Date().toISOString(),
        }, { onConflict: "id" });

      if (profileError) {
        return new Response(
          JSON.stringify({ error: profileError.message }),
          { status: 500, headers: corsHeaders }
        );
      }

      return new Response(
        JSON.stringify({ success: true, message: "Benutzer aktualisiert" }),
        { status: 200, headers: corsHeaders }
      );
    } else {
      // Benutzer anlegen mit bestätigter E-Mail
      const { data, error: createError } = await supabase.auth.admin.createUser({
        email,
        password,
        user_metadata: {
          role: "admin",
          first_name: first_name || "",
          last_name: last_name || "",
        },
        email_confirm: true, // E-Mail als bestätigt markieren
      });

      if (createError) {
        return new Response(
          JSON.stringify({ error: createError.message }),
          { status: 500, headers: corsHeaders }
        );
      }

      // Profil anlegen
      const { error: profileError } = await supabase
        .from("profiles")
        .insert({
          id: data.user.id,
          email,
          role: "admin",
          first_name: first_name || "",
          last_name: last_name || "",
          created_at: new Date().toISOString(),
        });

      if (profileError) {
        return new Response(
          JSON.stringify({ error: profileError.message }),
          { status: 500, headers: corsHeaders }
        );
      }

      return new Response(
        JSON.stringify({ success: true, message: "Benutzer erstellt" }),
        { status: 200, headers: corsHeaders }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ error: (error instanceof Error) ? error.message : "Unbekannter Fehler" }),
      { status: 500, headers: corsHeaders }
    );
  }
});