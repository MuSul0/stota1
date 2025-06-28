import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/Home'
import AdminPage from './pages/Admin'
import LoginPage from './pages/Login'
import { Toaster } from '@/components/ui/sonner'

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Toaster />
    </>
  )
}