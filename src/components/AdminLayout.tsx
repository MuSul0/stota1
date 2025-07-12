import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  LogOut,
  Users,
  BarChart2,
  FileText,
  Settings,
  Layers,
  Bell,
  Download,
  Clock,
  UserPlus,
  CalendarCheck,
  MessageSquare,
  Truck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

const navItems = [
  { to: 'dashboard', label: 'Dashboard', icon: BarChart2 },
  { to: 'users', label: 'Benutzerverwaltung', icon: Users },
  { to: 'user-activity', label: 'Benutzeraktivität', icon: Clock },
  { to: 'appointments', label: 'Terminübersicht', icon: CalendarCheck },
  { to: 'employee-registration', label: 'Mitarbeiter anmelden', icon: UserPlus },
  { to: 'invoices', label: 'Rechnungen', icon: FileText },
  { to: 'services', label: 'Services', icon: Layers },
  { to: 'media-manager', label: 'Medien', icon: Bell },
  { to: 'notifications', label: 'Benachrichtigungen', icon: MessageSquare },
  { to: 'reports', label: 'Berichte', icon: Download },
  { to: 'visitors', label: 'Besucher', icon: Truck },
  { to: 'settings', label: 'Einstellungen', icon: Settings },
];

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-72 bg-gray-900 text-gray-100 flex flex-col">
        <div className="px-8 py-6 text-3xl font-extrabold tracking-tight border-b border-gray-700 flex items-center justify-center">
          Adminportal
        </div>
        <nav className="flex-1 overflow-y-auto mt-6">
          <ul className="space-y-1 px-4">
            {navItems.map(({ to, label, icon: Icon }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-md transition-colors duration-200 hover:bg-gray-700 ${
                      isActive ? 'bg-gray-700 font-semibold text-white' : 'text-gray-300'
                    }`
                  }
                >
                  <Icon className="w-5 h-5" />
                  <span className="truncate">{label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-700">
          <Button
            variant="destructive"
            className="w-full flex items-center justify-center gap-2"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" />
            Abmelden
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-white p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;