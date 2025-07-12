import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '@/components/SessionProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ListChecks, MessageSquare, Settings } from 'lucide-react';

export default function KundenDashboard() {
  const { session, user, loading } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('[KundenDashboard] Aktueller Zustand: session:', session, 'user:', user, 'loading:', loading);
    if (!loading) {
      if (!session || user?.role !== 'kunde') {
        console.log('[KundenDashboard] Weiterleitung zu /login. Grund: Sitzung fehlt oder Rolle ist nicht "kunde". Aktuelle Benutzerrolle:', user?.role);
        navigate('/login');
      } else {
        console.log('[KundenDashboard] Zugriff erlaubt. Benutzerrolle ist "kunde".');
      }
    }
  }, [session, user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Lade...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Willkommen im Kundenbereich</h1>
        <p className="mb-8 text-gray-700">Hallo {user?.email}, hier können Sie Ihre Daten und Buchungen verwalten.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-6 w-6 text-blue-500" />
                Meine Termine
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Verwalten Sie Ihre gebuchten Dienstleistungen</p>
              <Button onClick={() => navigate('/kundenportal/termine')}>Termine anzeigen</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ListChecks className="h-6 w-6 text-green-500" />
                Meine Aufträge
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Verfolgen Sie den Status Ihrer Aufträge</p>
              <Button onClick={() => navigate('/kundenportal/auftraege')}>Aufträge anzeigen</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-6 w-6 text-purple-500" />
                Nachrichten
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Kommunikation mit unserem Team</p>
              <Button onClick={() => navigate('/kundenportal/nachrichten')}>Nachrichten anzeigen</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-6 w-6 text-orange-500" />
                Einstellungen
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Kontoeinstellungen verwalten</p>
              <Button onClick={() => navigate('/kundenportal/einstellungen')}>Einstellungen</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}