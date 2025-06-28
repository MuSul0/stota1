// ... bestehende Imports
import KundenDashboard from '@/pages/kundenportal';
import MitarbeiterDashboard from '@/pages/mitarbeiterportal';
import AdminDashboard from '@/pages/adminportal';

// ... in den Routes:
<Route path="/kundenportal" element={<KundenDashboard />} />
<Route path="/mitarbeiterportal" element={<MitarbeiterDashboard />} />
<Route path="/adminportal" element={<AdminDashboard />} />