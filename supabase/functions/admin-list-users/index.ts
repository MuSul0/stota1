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

    const { data: { user } } = await supabase.auth.getUser(req.headers.get('Authorization')?.replace('Bearer ', ''));
    if (!user) throw new Error("User not found");

    const { data: profile, error: profileError } = await supabase.from('profiles').select('role').eq('id', user.id).single();
    if (profileError || profile?.role !== 'admin') {
      return new Response(JSON.stringify({ error: "Permission denied" }), { status: 403, headers: corsHeaders });
    }

    const { data: authData, error: authError } = await supabase.auth.admin.listUsers();
    if (authError) throw authError;

    const { data: profileData, error: profilesError } = await supabase.from('profiles').select('*');
    if (profilesError) throw profilesError;

    const combinedUsers = authData.users.map((authUser) => {
      const userProfile = profileData.find((p) => p.id === authUser.id) || {};
      return {
        id: authUser.id,
        email: authUser.email || "",
        role: userProfile.role || "user",
        created_at: authUser.created_at,
        last_sign_in_at: authUser.last_sign_in_at,
        is_active: !authUser.banned_until || new Date(authUser.banned_until) < new Date(),
      };
    });

    return new Response(JSON.stringify(combinedUsers), { status: 200, headers: corsHeaders });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), { status: 500, headers: corsHeaders });
  }
});