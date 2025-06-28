import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Settings, Package, BookUser } from 'lucide-react';

export default function AdminSidebar() {
  const navItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/mitarbeiter', icon: Users, label: 'Mitarbeiter' },
    { path: '/admin/dienstleistungen', icon: Package, label: 'Dienstleistungen' },
    { path: '/admin/kunden', icon: BookUser, label: 'Kunden' },
    { path: '/admin/einstellungen', icon: Settings, label: 'Einstellungen' }
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-800">Nikolai Transport</h1>
        <p className="text-sm text-gray-500">Admin Panel</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `flex items-center p-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`
            }
          >
            <item.icon className="h-5 w-5 mr-3" />
            {item.label}
          </NavLink>
        ))}
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <div className="text-sm text-gray-500">Version 1.0.0</div>
      </div>
    </div>
  );
}