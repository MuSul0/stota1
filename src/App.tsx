// ... bestehende Imports
import AdminDashboard from '@/pages/admin';
import MitarbeiterDashboard from '@/pages/mitarbeiter';

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster position="top-center" richColors expand={true} />
      <BrowserRouter>
        <SessionProvider>
          <ScrollToTop />
          <Routes>
            {/* Öffentliche Routen */}
            <Route path="/" element={<Index />} />
            {/* ... andere öffentliche Routen */}
            
            {/* Geschützte Routen */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/mitarbeiter" element={<MitarbeiterDashboard />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </SessionProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);