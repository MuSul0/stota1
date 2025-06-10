import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useSession } from '@/components/SessionProvider';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Sparkles, 
  Star, 
  Image, 
  Settings,
  LogOut,
  Home
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { session, isAdmin, loading } = useSession();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Laden...</div>;
  }

  if (!session || !isAdmin) {
    navigate('/login');
    return null;
  }

  const navItems = [
    { 
      name: 'Dashboard', 
      path: '/admin', 
      icon: <LayoutDashboard className="h-5 w-5" /> 
    },
    { 
      name: 'Services', 
      path: '/admin/services', 
      icon: <Sparkles className="h-5 w-5" /> 
    },
    { 
      name: 'Bewertungen', 
      path: '/admin/bewertungen', 
      icon: <Star className="h-5 w-5" /> 
    },
    { 
      name: 'Galerie', 
      path: '/admin/galerie', 
      icon: <Image className="h-5 w-5" /> 
    },
    { 
      name: 'Einstellungen', 
      path: '/admin/einstellungen', 
      icon: <Settings className="h-5 w-5" /> 
    }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6 flex flex-col border-r border-gray-700">
        <div className="mb-8">
          <Link to="/" className="flex items-center space-x-2 text-white">
            <Home className="h-6 w-6" />
            <span className="text-xl font-bold">Nikolai Admin</span>
          </Link>
        </div>
        
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center p-3 rounded-md transition-colors ${
                location.pathname === item.path 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {item.icon}
              <span className="ml-3">{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="mt-auto pt-4 border-t border-gray-700">
          <Button 
            onClick={handleLogout} 
            variant="ghost" 
            className="w-full text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Abmelden
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;