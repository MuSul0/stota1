import { Button } from '@/components/ui/button';
import { LogIn, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSession } from '@/components/SessionProvider';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const LoginButton = () => {
  const { session, refreshSession } = useSession();

  const handleLogout = async () => {
    console.log("Attempting logout. Current session state in LoginButton:", session);
    const { error } = await supabase.auth.signOut();
    if (error) {
      if (error.message === "Auth session missing!") {
        toast.success("Erfolgreich abgemeldet! (Sitzung war bereits abgelaufen)");
        console.warn("Supabase signOut error: Auth session missing! User was already logged out. Forcing session refresh.");
        await refreshSession(); // Manuelle Aktualisierung der Sitzung
      } else {
        toast.error("Fehler beim Abmelden: " + error.message);
        console.error("Logout error:", error);
      }
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