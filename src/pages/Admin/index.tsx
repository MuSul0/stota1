import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '@/components/SessionProvider';
import { Button } from '@/components/ui/button';
import { LogOut, LayoutDashboard, Sparkles, Users, Image, Settings } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const AdminDashboard = () => {
  const { session, isAdmin, loading } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && (!session || !isAdmin)) {
      toast.error('Zugriff verweigert: Keine Admin-Berechtigung');
      navigate('/login');
    }
  }, [session, isAdmin, loading, navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success('Erfolgreich abgemeldet');
    navigate('/login');
  };

  if (loading || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-700">Überprüfe Berechtigungen...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-8 text-blue-400">Admin Panel</h2>
        <nav className="flex-1">
          <ul className="space-y-2">
            <li>
              <Link to="/admin" className="flex items-center p-3 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
                <LayoutDashboard className="h-5 w-5 mr-3" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/admin/services" className="flex items-center p-3 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
                <Sparkles className="h-5 w-5 mr-3" />
                Services
              </Link>
            </li>
            {/* Weitere Links... */}
          </ul>
        </nav>
        <Button onClick={handleLogout} className="w-full mt-8 bg-red-600 hover:bg-red-700">
          <LogOut className="h-5 w-5 mr-2" />
          Abmelden
        </Button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Willkommen im Admin-Bereich!</h1>
        <p className="text-gray-600">
          Sie haben erfolgreich Zugriff auf das Admin-Panel.
        </p>
      </main>
    </div>
  );
};

export default AdminDashboard;