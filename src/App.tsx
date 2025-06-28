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

const queryClient = new QueryClient();

const App = () => (
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </SessionProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;