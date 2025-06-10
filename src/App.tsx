import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import UeberUns from "./pages/UeberUns";
import Leistungen from "./pages/Leistungen";
import Galerie from "./pages/Galerie";
import Bewertungen from "./pages/Bewertungen";
import Kontakt from "./pages/Kontakt";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";
import Empfehlungsprogramm from "./pages/Empfehlungsprogramm";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import AdminLayout from "./pages/Admin";
import AdminDashboard from "./pages/Admin/Dashboard";
import AdminServices from "./pages/Admin/Services";
import AdminUsers from "./pages/Admin/Users";
import AdminSettings from "./pages/Admin/Settings";
import { SessionProvider } from "./components/SessionProvider";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SessionProvider>
          <ScrollToTop />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/ueber-uns" element={<UeberUns />} />
            <Route path="/leistungen" element={<Leistungen />} />
            <Route path="/galerie" element={<Galerie />} />
            <Route path="/bewertungen" element={<Bewertungen />} />
            <Route path="/kontakt" element={<Kontakt />} />
            <Route path="/impressum" element={<Impressum />} />
            <Route path="/datenschutz" element={<Datenschutz />} />
            <Route path="/empfehlungsprogramm" element={<Empfehlungsprogramm />} />
            <Route path="/login" element={<Login />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="services" element={<AdminServices />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </SessionProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;