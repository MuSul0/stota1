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
import AdminLogin from "./pages/AdminLogin"; // Updated import
import CustomerLogin from "./pages/CustomerLogin"; // New import
import AdminDashboard from "./pages/Admin";
import AdminServices from "./pages/Admin/Services";
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
            <Route path="/" element={<Index />} />
            <Route path="/ueber-uns" element={<UeberUns />} />
            <Route path="/leistungen" element={<Leistungen />} />
            <Route path="/galerie" element={<Galerie />} />
            <Route path="/bewertungen" element={<Bewertungen />} />
            <Route path="/kontakt" element={<Kontakt />} />
            <Route path="/impressum" element={<Impressum />} />
            <Route path="/datenschutz" element={<Datenschutz />} />
            <Route path="/empfehlungsprogramm" element={<Empfehlungsprogramm />} />
            <Route path="/admin-login" element={<AdminLogin />} /> {/* Updated route */}
            <Route path="/customer-login" element={<CustomerLogin />} /> {/* New route */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/services" element={<AdminServices />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </SessionProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;