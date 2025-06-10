// ... (vorherige Imports bleiben gleich)
import AdminDashboardLayout from './pages/Admin';
import AdminDashboardPage from './pages/Admin/Dashboard';
import AdminServices from './pages/Admin/Services';
import AdminTestimonials from './pages/Admin/Bewertungen';
import AdminGallery from './pages/Admin/Galerie';
import AdminSettings from './pages/Admin/Einstellungen';

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SessionProvider>
          <ScrollToTop />
          <Routes>
            {/* ... (vorherige Routen bleiben gleich) */}
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboardLayout />}>
              <Route index element={<AdminDashboardPage />} />
              <Route path="services" element={<AdminServices />} />
              <Route path="bewertungen" element={<AdminTestimonials />} />
              <Route path="galerie" element={<AdminGallery />} />
              <Route path="einstellungen" element={<AdminSettings />} />
            </Route>
            
            {/* ... (restliche Routen) */}
          </Routes>
        </SessionProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);