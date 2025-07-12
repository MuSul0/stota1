import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { Resend } from "https://esm.sh/resend@1.1.0"; // Resend importieren

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

    // Resend Client initialisieren
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      console.error("RESEND_API_KEY ist nicht gesetzt. E-Mails können nicht gesendet werden.");
      return new Response(JSON.stringify({ error: "RESEND_API_KEY ist nicht gesetzt." }), { status: 500, headers: corsHeaders });
    }
    const resend = new Resend(resendApiKey);

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

    for (const emailEntry of emails) {
      try {
        // E-Mail mit Resend senden
        const { data, error: resendError } = await resend.emails.send({
          from: 'onboarding@resend.dev', // WICHTIG: Ersetzen Sie dies durch eine E-Mail-Adresse von Ihrer verifizierten Resend-Domain!
          to: emailEntry.to_email,
          subject: emailEntry.subject,
          text: emailEntry.text,
        });

        if (resendError) {
          console.error(`Fehler beim Senden der E-Mail an ${emailEntry.to_email}:`, resendError);
          // Status auf 'error' setzen, wenn Resend fehlschlägt
          await supabase
            .from("email_queue")
            .update({ status: "error", sent_at: new Date().toISOString() })
            .eq("id", emailEntry.id);
        } else {
          console.log(`E-Mail erfolgreich an ${emailEntry.to_email} gesendet. Resend ID: ${data?.id}`);
          // Status auf 'sent' setzen
          const { error: updateError } = await supabase
            .from("email_queue")
            .update({ status: "sent", sent_at: new Date().toISOString() })
            .eq("id", emailEntry.id);

          if (updateError) {
            console.error("Fehler beim Aktualisieren des Email-Status:", updateError);
          }
        }
      } catch (sendError) {
        console.error("Unerwarteter Fehler beim Senden der E-Mail:", sendError);
        // Status auf 'error' setzen
        await supabase
          .from("email_queue")
          .update({ status: "error", sent_at: new Date().toISOString() })
          .eq("id", emailEntry.id);
      }
    }

    return new Response(JSON.stringify({ success: true, sentCount: emails.length }), { status: 200, headers: corsHeaders });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), { status: 500, headers: corsHeaders });
  }
});