import { Routes, Route } from 'react-router-dom'
import { useSession } from './hooks/useSession'
import AdminLayout from './pages/Admin/Layout'
import Login from './pages/Login'

export default function Router() {
  const { isLoading, session } = useSession()

  if (isLoading) return <div>Lade...</div>

  return (
    <Routes>
      {!session ? (
        <Route path="*" element={<Login />} />
      ) : (
        <Route path="/admin/*" element={<AdminLayout />} />
      )}
    </Routes>
  )
}