import { useSession } from '@/components/SessionProvider';
import { redirect } from 'react-router-dom';

export default function AdminDashboard() {
  const { session, user } = useSession();

  if (!session || user?.role !== 'admin') {
    redirect('/login');
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p>Willkommen im Admin-Bereich</p>
    </div>
  );
}