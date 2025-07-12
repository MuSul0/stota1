import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SessionProvider from '@/components/SessionProvider';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Toaster } from '@/components/ui/sonner';

// Seiten importieren
import Index from '@/pages/Index';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import NotFound from '@/pages/NotFound';

// Admin-Seiten
import AdminDashboard from '@/pages/adminportal/Dashboard';
import AdminUsers from '@/pages/adminportal/users';
import EmployeeRegistration from '@/pages/adminportal/employee-registration';

// Kunden-Seiten
import KundenDashboard from '@/pages/kundenportal/Dashboard';

// Mitarbeiter-Seiten
import MitarbeiterDashboard from '@/pages/mitarbeiterportal/index';

function App() {
  return (
    <Router> {/* Der Router muss zuerst kommen */}
      <SessionProvider> {/* SessionProvider ist jetzt innerhalb des Routers */}
        <Routes>
          {/* Öffentliche Routen */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Geschützte Admin-Routen */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/adminportal" element={<AdminDashboard />} />
            <Route path="/adminportal/users" element={<AdminUsers />} />
            <Route path="/adminportal/employee-registration" element={<EmployeeRegistration />} />
            {/* Fügen Sie hier weitere Admin-Routen hinzu */}
          </Route>

          {/* Geschützte Mitarbeiter-Routen */}
          <Route element={<ProtectedRoute allowedRoles={['mitarbeiter', 'admin']} />}>
            <Route path="/mitarbeiterportal" element={<MitarbeiterDashboard />} />
            {/* Fügen Sie hier weitere Mitarbeiter-Routen hinzu */}
          </Route>

          {/* Geschützte Kunden-Routen */}
          <Route element={<ProtectedRoute allowedRoles={['kunde', 'admin']} />}>
            <Route path="/kundenportal" element={<KundenDashboard />} />
            {/* Fügen Sie hier weitere Kunden-Routen hinzu */}
          </Route>

          {/* Fallback-Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </SessionProvider>
      <Toaster />
    </Router>
  );
}

export default App;