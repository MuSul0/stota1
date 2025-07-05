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
    const { email, password, first_name, last_name } = await req.json();

    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "Email und Passwort sind erforderlich" }),
        { status: 400, headers: corsHeaders }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Benutzer anlegen
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: {
        role: "admin",
        first_name: first_name || "",
        last_name: last_name || "",
      },
      email_confirm: true,
    });

    if (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 400, headers: corsHeaders }
      );
    }

    // Profil in Tabelle anlegen
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
        { status: 400, headers: corsHeaders }
      );
    }

    return new Response(
      JSON.stringify({ success: true, userId: data.user.id }),
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      { status: 500, headers: corsHeaders }
    );
  }
});