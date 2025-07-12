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

    // Hole alle E-Mails mit Status 'pending'
    const { data: emails, error } = await supabase
      .from("email_queue")
      .select("*")
      .eq("status", "pending")
      .limit(10);

    if (error) {
      console.error("Fehler beim Abrufen der Email Queue:", error);
      return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: corsHeaders });
    }

    if (!emails || emails.length === 0) {
      return new Response(JSON.stringify({ message: "Keine E-Mails zum Versenden." }), { status: 200, headers: corsHeaders });
    }

    // Beispiel: E-Mail Versand via externem SMTP oder API (hier nur Simulation)
    for (const email of emails) {
      try {
        // TODO: Hier echten Versand implementieren, z.B. via SMTP, SendGrid, Mailgun, etc.
        console.log(`Sende E-Mail an ${email.to_email} mit Betreff "${email.subject}"`);

        // Simuliere Versand mit Timeout
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Status auf 'sent' setzen
        const { error: updateError } = await supabase
          .from("email_queue")
          .update({ status: "sent", sent_at: new Date().toISOString() })
          .eq("id", email.id);

        if (updateError) {
          console.error("Fehler beim Aktualisieren des Email-Status:", updateError);
        }
      } catch (sendError) {
        console.error("Fehler beim Senden der E-Mail:", sendError);
        // Status auf 'error' setzen
        await supabase
          .from("email_queue")
          .update({ status: "error" })
          .eq("id", email.id);
      }
    }

    return new Response(JSON.stringify({ success: true, sentCount: emails.length }), { status: 200, headers: corsHeaders });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), { status: 500, headers: corsHeaders });
  }
});