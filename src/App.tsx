// ... bestehende Imports
import AdminLayout from '@/pages/Admin/Layout';
import AdminDashboard from '@/pages/Admin/Dashboard';
import Mitarbeiter from '@/pages/Admin/Mitarbeiter';
import Dienstleistungen from '@/pages/Admin/Dienstleistungen';
import Kunden from '@/pages/Admin/Kunden';
import Einstellungen from '@/pages/Admin/Einstellungen';

function App() {
  return (
    // ... bestehender Provider-Code
    <Routes>
      {/* ... andere Routen */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="mitarbeiter" element={<Mitarbeiter />} />
        <Route path="dienstleistungen" element={<Dienstleistungen />} />
        <Route path="kunden" element={<Kunden />} />
        <Route path="einstellungen" element={<Einstellungen />} />
      </Route>
    </Routes>
    // ...
  );
}