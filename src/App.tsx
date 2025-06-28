// ... (vorherige Imports)
import EmployeeManagement from '@/pages/Admin/Employees';

// ... (vorheriger Code)

<Route path="/admin" element={<AdminLayout />}>
  <Route index element={<AdminDashboard />} />
  <Route path="employees" element={<EmployeeManagement />} />
  {/* ... andere Routen */}
</Route>

// ... (restlicher Code)