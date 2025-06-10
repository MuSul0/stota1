import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Settings, Package, BookUser, Image } from 'lucide-react';

export default function AdminNav() {
  const location = useLocation();

  const navItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/services', icon: Package, label: 'Services' },
    { path: '/admin/media', icon: Image, label: 'Medien' },
    { path: '/admin/users', icon: BookUser, label: 'Benutzer' },
    { path: '/admin/settings', icon: Settings, label: 'Einstellungen' }
  ];

  return (
    <ul className="space-y-2">
      {navItems.map((item) => (
        <li key={item.path}>
          <Link
            to={item.path}
            className={`flex items-center p-3 rounded-md transition-colors ${
              location.pathname === item.path 
                ? 'bg-gray-700' 
                : 'hover:bg-gray-700'
            }`}
          >
            <item.icon className="h-5 w-5 mr-3" />
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}