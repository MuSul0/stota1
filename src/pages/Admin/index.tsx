import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '@/components/SessionProvider';
import { Button } from '@/components/ui/button';
import { LogOut, LayoutDashboard, Sparkles, Users, Image, Settings } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const { session, isAdmin, loading } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && (!session || !isAdmin)) {
      navigate('/login');
    }
  }, [session, isAdmin, loading, navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Laden des Admin-Bereichs...</div>;
  }

  if (!session || !isAdmin) {
    return null; // Should redirect by useEffect
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
            <li>
              <Link to="/admin/testimonials" className="flex items-center p-3 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
                <Users className="h-5 w-5 mr-3" />
                Bewertungen
              </Link>
            </li>
            <li>
              <Link to="/admin/gallery" className="flex items-center p-3 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
                <Image className="h-5 w-5 mr-3" />
                Galerie
              </Link>
            </li>
            <li>
              <Link to="/admin/settings" className="flex items-center p-3 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
                <Settings className="h-5 w-5 mr-3" />
                Einstellungen
              </Link>
            </li>
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
          Nutzen Sie die Navigation auf der linken Seite, um Inhalte Ihrer Website zu verwalten.
        </p>
        {/* Add dashboard widgets here later */}
      </main>
    </div>
  );
};

export default AdminDashboard;