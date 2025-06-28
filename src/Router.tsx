import { Routes, Route } from 'react-router-dom'
import { useSession } from '@/hooks/useSession'
import AdminLayout from '@/pages/Admin/Layout'
import Login from '@/pages/Login'
import NotFound from '@/pages/NotFound'

export default function Router() {
  const { isLoading, session } = useSession()

  if (isLoading) return <div className="p-4">Lade...</div>

  return (
    <Routes>
      {!session ? (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Login />} />
        </>
      ) : (
        <Route path="/admin/*" element={<AdminLayout />} />
      )}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}