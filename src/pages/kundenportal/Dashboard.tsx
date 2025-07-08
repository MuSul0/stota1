import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '@/components/SessionProvider';
// Header und Footer entfernt, da sie vom AdminLayout bereitgestellt werden
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ListChecks, MessageSquare, Settings } from 'lucide-react';

export default function KundenDashboard() {
  const { session, user, loading } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!session || user?.user_metadata?.role !== 'kunde') {
        navigate('/login');
      }
    }
  }, [session, user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg">Lade...</p>
      </div>
    );
  }

  if (!session || session.user.user_metadata?.role !== 'kunde') {
    return <div>Zugriff verweigert. Bitte als Kunde anmelden.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header entfernt */}
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Mein Kundenportal</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-6 w-6 text-blue-500" />
                Termine
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Verwalten Sie Ihre gebuchten Dienstleistungen</p>
              <Button onClick={() => navigate('/termine')}>Anzeigen</Button>
            </CardContent>
          </Card>

          {/* Weitere Karten für Kundenbereich */}
        </div>
      </div>
      {/* Footer entfernt */}
    </div>
  );
}