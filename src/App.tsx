import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/sonner'; // Remove separate Sonner import
import AdminLayout from '@/pages/Admin';
import AdminDashboard from '@/pages/Admin/Dashboard';
import AdminServices from '@/pages/Admin/Services';
import MediaManager from '@/pages/Admin/MediaManager';
import AdminUsers from '@/pages/Admin/Users';
import AdminSettings from '@/pages/Admin/Settings';
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster /> {/* Single Toaster component is sufficient */}
      <BrowserRouter>
        <SessionProvider>
          <ScrollToTop />
          <Routes>
            {/* ... rest of your routes ... */}
          </Routes>
        </SessionProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;