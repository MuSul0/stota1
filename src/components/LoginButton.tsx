import { Button } from '@/components/ui/button';
import { LogIn, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSession } from '@/components/SessionProvider';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const LoginButton = () => {
  const { session } = useSession();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Fehler beim Abmelden: " + error.message);
    } else {
      toast.success("Erfolgreich abgemeldet!");
    }
  };

  if (session) {
    return (
      <Button onClick={handleLogout} variant="outline" className="gap-2">
        <LogOut className="h-4 w-4" />
        Abmelden
      </Button>
    );
  }

  return (
    <Button asChild variant="outline" className="gap-2">
      <Link to="/login">
        <LogIn className="h-4 w-4" />
        Anmelden
      </Link>
    </Button>
  );
};

export default LoginButton;