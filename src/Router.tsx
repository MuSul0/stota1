import { Routes, Route } from 'react-router-dom'
import { useSession } from '@/hooks/useSession'
import AdminLayout from '@/pages/Admin/Layout'
import Login from '@/pages/Login'
import DemoBanner from '@/components/DemoBanner'

export default function Router() {
  const { isLoading, isAdmin, isDemo } = useSession()

  if (isLoading) return <div className="p-4">Lade...</div>

  return (
    <>
      {isDemo && <DemoBanner />}
      <Routes>
        {isAdmin || isDemo ? (
          <Route path="/*" element={<AdminLayout />} />
        ) : (
          <Route path="*" element={<Login />} />
        )}
      </Routes>
    </>
  )
}