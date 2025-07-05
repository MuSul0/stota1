import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LogOut, Users, BarChart2, FileText, Settings, Layers, Bell, Download, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

const AdminLayout = () => {
  const navigate = useNavigate();

  const navItems = [
    { to: 'dashboard', label: 'Dashboard', icon: BarChart2 },
    { to: 'users', label: 'Benutzerverwaltung', icon: Users },
    { to: 'user-activity', label: 'Benutzeraktivität', icon: Clock },
    { to: 'appointments', label: 'Terminübersicht', icon: Clock },
    { to: 'invoices', label: 'Rechnungen', icon: FileText },
    { to: 'settings', label: 'Einstellungen', icon: Settings },
    { to: 'services', label: 'Services', icon: Layers },
    { to: 'media-manager', label: 'Medien', icon: Bell },
    { to: 'notifications', label: 'Benachrichtigungen', icon: Bell },
    { to: 'reports', label: 'Berichte', icon: Download },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-6 text-2xl font-bold border-b border-gray-700">Adminportal</div>
        <nav className="flex-1 overflow-y-auto">
          <ul>
            {navItems.map(({ to, label, icon: Icon }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-6 py-3 hover:bg-gray-700 transition-colors ${
                      isActive ? 'bg-gray-700 font-semibold' : ''
                    }`
                  }
                >
                  <Icon className="w-5 h-5" />
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-700">
          <Button variant="destructive" className="w-full flex items-center justify-center gap-2" onClick={handleLogout}>
            <LogOut className="w-4 h-4" />
            Abmelden
          </Button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto p-6 bg-white">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;