import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Briefcase, Receipt, BarChart, Bell, FileText, Settings, Package, Clock, UserPlus, GitPullRequest, Mail } from 'lucide-react';

const AdminNav = () => {
  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/adminportal' },
    { name: 'Benutzer', icon: Users, path: '/adminportal/users' },
    { name: 'Dienstleistungen', icon: Briefcase, path: '/adminportal/services' },
    { name: 'Rechnungen', icon: Receipt, path: '/adminportal/invoices' },
    { name: 'Analysen', icon: BarChart, path: '/adminportal/analytics' },
    { name: 'Berichte', icon: FileText, path: '/adminportal/reports' },
    { name: 'Benachrichtigungen', icon: Bell, path: '/adminportal/notifications' },
    { name: 'Seiteninhalte', icon: Package, path: '/adminportal/seiteninhalte' },
    { name: 'Leads', icon: Mail, path: '/adminportal/leads' },
    { name: 'Empfehlungen', icon: GitPullRequest, path: '/adminportal/referrals' },
    { name: 'Einstellungen', icon: Settings, path: '/adminportal/settings' },
    { name: 'Auftragsverwaltung', icon: Briefcase, path: '/adminportal/auftragsverwaltung' },
    { name: 'Arbeitszeiten', icon: Clock, path: '/adminportal/arbeitszeiten' },
    { name: 'Mitarbeiter-Registrierung', icon: UserPlus, path: '/adminportal/employee-registration' },
  ];

  return (
    <ul className="space-y-2">
      {navItems.map((item) => (
        <li key={item.name}>
          <NavLink
            to={item.path}
            className={({ isActive }) =>
              `flex items-center p-2 rounded-md transition-colors duration-200 ${
                isActive
                  ? 'bg-gray-700 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`
            }
            end={item.path === '/adminportal'} // 'end' prop for exact match on index route
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.name}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default AdminNav;