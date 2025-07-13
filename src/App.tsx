import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { SessionProvider } from '@/components/SessionProvider';
import { MediaProvider } from './contexts/MediaContext';
import Index from '@/pages/Index';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import NotFound from '@/pages/NotFound';
import Impressum from '@/pages/Impressum';
import Datenschutz from '@/pages/Datenschutz';
import Kontakt from '@/pages/Kontakt';
import Leistungen from '@/pages/Leistungen';
import Reinigung from '@/pages/Leistungen/Reinigung';
import Transporte from '@/pages/Leistungen/Transporte';
import Entsorgung from '@/pages/Leistungen/Entsorgung';
import GartenLandschaftsbau from '@/pages/Leistungen/GartenLandschaftsbau';
import UeberUns from '@/pages/UeberUns';
import Galerie from '@/pages/Galerie';
import Bewertungen from '@/pages/Bewertungen';
import Empfehlungsprogramm from '@/pages/Empfehlungsprogramm';

// Admin Portal
import AdminDashboard from '@/pages/adminportal/Dashboard';
import AdminUsers from '@/pages/adminportal/users';
import AdminServices from '@/pages/adminportal/services';
import AdminInvoices from '@/pages/adminportal/invoices';
import AdminAnalytics from '@/pages/adminportal/analytics';
import AdminReports from '@/pages/adminportal/reports';
import AdminNotifications from '@/pages/adminportal/notifications';
import AdminSeiteninhalte from '@/pages/adminportal/seiteninhalte';
import AdminLeads from '@/pages/adminportal/leads';
import AdminReferrals from '@/pages/adminportal/referrals';
import AdminSettings from '@/pages/adminportal/settings';
import AdminAuftragsverwaltung from '@/pages/adminportal/auftragsverwaltung';
import AdminArbeitszeiten from '@/pages/adminportal/arbeitszeiten';
import AdminEmployeeRegistration from '@/pages/adminportal/employee-registration';
import AdminLayout from '@/pages/Admin/index'; // Import AdminLayout

// Kunden Portal
import KundenDashboard from '@/pages/kundenportal/Dashboard';
import KundenAuftraege from '@/pages/kundenportal/auftraege';
import KundenNachrichten from '@/pages/kundenportal/nachrichten';
import KundenSupport from '@/pages/kundenportal/support';
import KundenTermine from '@/pages/kundenportal/termine';
import KundenEinstellungen from '@/pages/kundenportal/einstellungen';

// Mitarbeiter Portal
import MitarbeiterDashboard from '@/pages/mitarbeiterportal';
import MitarbeiterAuftraege from '@/pages/mitarbeiterportal/auftraege';
import MitarbeiterArbeitszeiten from '@/pages/mitarbeiterportal/arbeitszeiten';
import MitarbeiterFahrzeuge from '@/pages/mitarbeiterportal/fahrzeuge';
import MitarbeiterTeam from '@/pages/mitarbeiterportal/team';

// Temporäre Seite zum Erstellen von Admin-Benutzern
import CreateAdminUser from '@/pages/Admin/CreateAdminUser';


function App() {
  return (
    <SessionProvider>
      <MediaProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/impressum" element={<Impressum />} />
            <Route path="/datenschutz" element={<Datenschutz />} />
            <Route path="/kontakt" element={<Kontakt />} />
            <Route path="/leistungen" element={<Leistungen />} />
            <Route path="/leistungen/reinigung" element={<Reinigung />} />
            <Route path="/leistungen/transporte" element={<Transporte />} />
            <Route path="/leistungen/entsorgung" element={<Entsorgung />} />
            <Route path="/leistungen/garten-landschaftsbau" element={<GartenLandschaftsbau />} />
            <Route path="/ueber-uns" element={<UeberUns />} />
            <Route path="/galerie" element={<Galerie />} />
            <Route path="/bewertungen" element={<Bewertungen />} />
            <Route path="/empfehlungsprogramm" element={<Empfehlungsprogramm />} />

            {/* Admin Portal Routes */}
            <Route path="/adminportal" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="services" element={<AdminServices />} />
              <Route path="invoices" element={<AdminInvoices />} />
              <Route path="analytics" element={<AdminAnalytics />} />
              <Route path="reports" element={<AdminReports />} />
              <Route path="notifications" element={<AdminNotifications />} />
              <Route path="seiteninhalte" element={<AdminSeiteninhalte />} />
              <Route path="leads" element={<AdminLeads />} />
              <Route path="referrals" element={<AdminReferrals />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="auftragsverwaltung" element={<AdminAuftragsverwaltung />} />
              <Route path="arbeitszeiten" element={<AdminArbeitszeiten />} />
              <Route path="employee-registration" element={<AdminEmployeeRegistration />} />
            </Route>

            {/* Kunden Portal Routes */}
            <Route path="/kundenportal" element={<KundenDashboard />} />
            <Route path="/kundenportal/auftraege" element={<KundenAuftraege />} />
            <Route path="/kundenportal/nachrichten" element={<KundenNachrichten />} />
            <Route path="/kundenportal/support" element={<KundenSupport />} />
            <Route path="/kundenportal/termine" element={<KundenTermine />} />
            <Route path="/kundenportal/einstellungen" element={<KundenEinstellungen />} />

            {/* Mitarbeiter Portal Routes */}
            <Route path="/mitarbeiterportal" element={<MitarbeiterDashboard />} />
            <Route path="/mitarbeiterportal/auftraege" element={<MitarbeiterAuftraege />} />
            <Route path="/mitarbeiterportal/arbeitszeiten" element={<MitarbeiterArbeitszeiten />} />
            <Route path="/mitarbeiterportal/fahrzeuge" element={<MitarbeiterFahrzeuge />} />
            <Route path="/mitarbeiterportal/team" element={<MitarbeiterTeam />} />

            {/* Temporary Admin User Creation Route */}
            <Route path="/create-admin" element={<CreateAdminUser />} />

            {/* Catch-all for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
        <Toaster />
      </MediaProvider>
    </SessionProvider>
  );
}

export default App;