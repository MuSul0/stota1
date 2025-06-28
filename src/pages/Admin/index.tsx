// ... bestehenden Importe ...
import CreateEmployee from './CreateEmployee';

export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4 flex flex-col">
        <div className="mb-8 p-4">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
        </div>
        <nav className="flex-1">
          <AdminNav />
        </nav>
      </div>
      
      {/* Hauptinhalt */}
      <div className="flex-1 overflow-auto p-6">
        <Routes>
          <Route index element={<AdminDashboard />} />
          <Route path="create-employee" element={<CreateEmployee />} />
          {/* ... andere Routen ... */}
        </Routes>
      </div>
    </div>
  );
}