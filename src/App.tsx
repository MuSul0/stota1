import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from 'sonner';
import ScrollToTop from '@/components/ScrollToTop';
import SessionProvider from '@/components/SessionProvider';
import NotFound from '@/pages/NotFound';
import Index from '@/pages/Index';
import Leistungen from '@/pages/Leistungen';
import UeberUns from '@/pages/UeberUns';
import Galerie from '@/pages/Galerie';
import Bewertungen from '@/pages/Bewertungen';
import Kontakt from '@/pages/Kontakt';
import Empfehlungsprogramm from '@/pages/Empfehlungsprogramm';
import Impressum from '@/pages/Impressum';
import Datenschutz from '@/pages/Datenschutz';
import Login from '@/pages/Login';
import KundenDashboard from '@/pages/kundenportal/index';
import KundenTermine from '@/pages/kundenportal/termine';
import KundenAuftraege from '@/pages/kundenportal/auftraege';
import KundenNachrichten from '@/pages/kundenportal/nachrichten';
import KundenEinstellungen from '@/pages/kundenportal/einstellungen';
import KundenSupport from '@/pages/kundenportal/support';
import Mitarbeiterportal from '@/pages/mitarbeiterportal/index';
import Arbeitszeiten from '@/pages/mitarbeiterportal/arbeitszeiten';
import Auftraege from '@/pages/mitarbeiterportal/auftraege';
import Fahrzeuge from '@/pages/mitarbeiterportal/fahrzeuge';
import Team from '@/pages/mitarbeiterportal/team';
import AdminLayout from '@/components/AdminLayout';
import AdminDashboard from '@/pages/adminportal/dashboard';
import AdminUsers from '@/pages/adminportal/users';
import AdminInvoices from '@/pages/adminportal/invoices';
import AdminSettings from '@/pages/adminportal/settings';
import AdminServices from '@/pages/adminportal/services';
import MediaManager from '@/pages/adminportal/media-manager';
import Notifications from '@/pages/adminportal/notifications';
import Reports from '@/pages/adminportal/reports';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster position="top-center" richColors expand={true} />
        <BrowserRouter>
          <SessionProvider>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/leistungen" element={<Leistungen />} />
              <Route path="/ueber-uns" element={<UeberUns />} />
              <Route path="/galerie" element={<Galerie />} />
              <Route path="/bewertungen" element={<Bewertungen />} />
              <Route path="/kontakt" element={<Kontakt />} />
              <Route path="/empfehlungsprogramm" element={<Empfehlungsprogramm />} />
              <Route path="/impressum" element={<Impressum />} />
              <Route path="/datenschutz" element={<Datenschutz />} />
              <Route path="/login" element={<Login />} />

              {/* Kundenportal */}
              <Route path="/kundenportal" element={<KundenDashboard />} />
              <Route path="/kundenportal/termine" element={<KundenTermine />} />
              <Route path="/kundenportal/auftraege" element={<KundenAuftraege />} />
              <Route path="/kundenportal/nachrichten" element={<KundenNachrichten />} />
              <Route path="/kundenportal/einstellungen" element={<KundenEinstellungen />} />
              <Route path="/kundenportal/support" element={<KundenSupport />} />

              {/* Mitarbeiterportal */}
              <Route path="/mitarbeiterportal" element={<Mitarbeiterportal />} />
              <Route path="/mitarbeiterportal/arbeitszeiten" element={<Arbeitszeiten />} />
              <Route path="/mitarbeiterportal/auftraege" element={<Auftraege />} />
              <Route path="/mitarbeiterportal/fahrzeuge" element={<Fahrzeuge />} />
              <Route path="/mitarbeiterportal/team" element={<Team />} />

              {/* Adminportal mit Nested Routes */}
              <Route path="/adminportal" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="invoices" element={<AdminInvoices />} />
                <Route path="settings" element={<AdminSettings />} />
                <Route path="services" element={<AdminServices />} />
                <Route path="media-manager" element={<MediaManager />} />
                <Route path="notifications" element={<Notifications />} />
                <Route path="reports" element={<Reports />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </SessionProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;