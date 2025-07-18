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
    const { userId, role, isActive } = await req.json();
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Admin-Check
    const { data: { user } } = await supabase.auth.getUser(req.headers.get('Authorization')?.replace('Bearer ', ''));
    if (!user) throw new Error("User not found");
    const { data: profile, error: profileError } = await supabase.from('profiles').select('role').eq('id', user.id).single();
    if (profileError || profile?.role !== 'admin') {
      return new Response(JSON.stringify({ error: "Permission denied" }), { status: 403, headers: corsHeaders });
    }

    if (role) {
      const { error: profileUpdateError } = await supabase.from("profiles").update({ role }).eq("id", userId);
      if (profileUpdateError) throw profileUpdateError;

      // Also update the app_metadata in the auth schema
      const { error: authError } = await supabase.auth.admin.updateUserById(userId, {
        app_metadata: { role: role }
      });
      if (authError) throw authError;
    }

    if (typeof isActive === 'boolean') {
      const { error } = await supabase.auth.admin.updateUserById(userId, {
        ban_until: isActive ? 'none' : new Date(Date.now() + 1000 * 60 * 60 * 24 * 365 * 100).toISOString(), // Ban for 100 years
      });
      if (error) throw error;
    }

    return new Response(JSON.stringify({ success: true }), { status: 200, headers: corsHeaders });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), { status: 500, headers: corsHeaders });
  }
});