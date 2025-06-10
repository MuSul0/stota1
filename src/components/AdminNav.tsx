import { Link } from 'react-router-dom';
import { LayoutDashboard, Users, Settings } from 'lucide-react';

const AdminNav = () => {
  return (
    <ul className="space-y-2">
      <li>
        <Link
          to="/admin"
          className="flex items-center p-3 rounded-md hover:bg-gray-700 transition-colors"
        >
          <LayoutDashboard className="h-5 w-5 mr-3" />
          Dashboard
        </Link>
      </li>
      <li>
        <Link
          to="/admin/users"
          className="flex items-center p-3 rounded-md hover:bg-gray-700 transition-colors"
        >
          <Users className="h-5 w-5 mr-3" />
          Benutzer
        </Link>
      </li>
      <li>
        <Link
          to="/admin/settings"
          className="flex items-center p-3 rounded-md hover:bg-gray-700 transition-colors"
        >
          <Settings className="h-5 w-5 mr-3" />
          Einstellungen
        </Link>
      </li>
    </ul>
  );
};

export default AdminNav;