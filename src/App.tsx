import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from '@/pages/Index';
import UeberUns from '@/pages/UeberUns';
import Leistungen from '@/pages/Leistungen';
import Galerie from '@/pages/Galerie';
import Kontakt from '@/pages/Kontakt';
import Bewertungen from '@/pages/Bewertungen';
import Datenschutz from '@/pages/Datenschutz';
import Impressum from '@/pages/Impressum';
import Empfehlungsprogramm from '@/pages/Empfehlungsprogramm';
import NotFound from '@/pages/NotFound';
import Login from '@/pages/Login';
import Kundenportal from '@/pages/Kundenportal';
import Mitarbeiterportal from '@/pages/Mitarbeiterportal';
import AdminLayout from '@/pages/Admin';
import AdminDashboard from '@/pages/Admin/Dashboard';
import AdminServices from '@/pages/Admin/Services';
import AdminUsers from '@/pages/Admin/Users';
import AdminSettings from '@/pages/Admin/Settings';
import AdminMedia from '@/pages/Admin/MediaManager';
import AdminEmployees from '@/pages/Admin/Employees';
import ScrollToTop from '@/components/ScrollToTop';
import { Toaster } from '@/components/ui/sonner';
import SessionProvider from '@/components/SessionProvider';

const App = () => {
  return (
    <Router>
      <SessionProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/ueber-uns" element={<UeberUns />} />
          <Route path="/leistungen" element={<Leistungen />} />
          <Route path="/galerie" element={<Galerie />} />
          <Route path="/kontakt" element={<Kontakt />} />
          <Route path="/bewertungen" element={<Bewertungen />} />
          <Route path="/datenschutz" element={<Datenschutz />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/empfehlungsprogramm" element={<Empfehlungsprogramm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/kundenportal" element={<Kundenportal />} />
          <Route path="/mitarbeiterportal" element={<Mitarbeiterportal />} />
          
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="media" element={<AdminMedia />} />
            <Route path="employees" element={<AdminEmployees />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </SessionProvider>
    </Router>
  );
};

export default App;