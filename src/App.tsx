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
import Empfehlungsprogramm from "./pages/Empfehlungsprogramm"; // Import the new page
import NotFound from "./pages/NotFound";
import Login from "./pages/Login"; // Import Login page
import AdminDashboard from "./pages/Admin"; // Import AdminDashboard
import AdminServices from "./pages/Admin/Services"; // Import AdminServices
import { SessionProvider } from "./components/SessionProvider"; // Import SessionProvider

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SessionProvider> {/* Wrap routes with SessionProvider */}
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/ueber-uns" element={<UeberUns />} />
            <Route path="/leistungen" element={<Leistungen />} />
            <Route path="/galerie" element={<Galerie />} />
            <Route path="/bewertungen" element={<Bewertungen />} />
            <Route path="/kontakt" element={<Kontakt />} />
            <Route path="/impressum" element={<Impressum />} />
            <Route path="/datenschutz" element={<Datenschutz />} />
            <Route path="/empfehlungsprogramm" element={<Empfehlungsprogramm />} /> {/* Add new route here */}
            <Route path="/login" element={<Login />} /> {/* Add Login route */}
            <Route path="/admin" element={<AdminDashboard />} /> {/* Admin Dashboard */}
            <Route path="/admin/services" element={<AdminServices />} /> {/* Admin Services */}
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </SessionProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;