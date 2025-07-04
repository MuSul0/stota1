import { Link } from 'react-router-dom';

const AdminNav = () => (
  <nav className="space-y-2">
    <Link to="/admin/dashboard" className="block py-2">Dashboard</Link>
    <Link to="/admin/users" className="block py-2">Users</Link>
    <Link to="/admin/settings" className="block py-2">Settings</Link>
  </nav>
);

export default AdminNav;