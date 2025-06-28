import { useSession } from '@/components/SessionProvider';
import { redirect } from 'react-router-dom';

export default function MitarbeiterDashboard() {
  const { session, user } = useSession();

  if (!session || user?.role !== 'mitarbeiter') {
    redirect('/login');
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Mitarbeiter Dashboard</h1>
      <p>Willkommen im Mitarbeiter-Bereich</p>
    </div>
  );
}