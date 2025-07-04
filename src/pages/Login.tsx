import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';

const Login = () => (
  <Auth 
    supabaseClient={supabase}
    appearance={{ theme: ThemeSupa }}
    providers={[]}
  />
);

export default Login;