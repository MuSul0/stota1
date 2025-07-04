import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '@/components/SessionProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ListChecks, MessageSquare, Settings } from 'lucide-react';

export default function Kundenportal() {
  const { session, user, loading } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!session || user?.role !== 'kunde') {
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

  if (!session || user?.role !== 'kunde') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-red-600 text-lg">Zugriff verweigert. Bitte als Kunde anmelden.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Willkommen im Kundenportal</h1>
        <p className="mb-8 text-gray-700">Hallo <span className="font-semibold">{user.email}</span>, hier können Sie Ihre Daten und Buchungen verwalten.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="hover:shadow-lg transition-shadow rounded-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-600">
                <Calendar className="h-6 w-6" />
                Termine
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Verwalten Sie Ihre gebuchten Dienstleistungen und Termine.</p>
              <Button 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                onClick={() => navigate('/kundenportal/termine')}
              >
                Termine anzeigen
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow rounded-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-600">
                <ListChecks className="h-6 w-6" />
                Aufträge
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Behalten Sie den Status Ihrer Aufträge im Blick.</p>
              <Button 
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                onClick={() => navigate('/kundenportal/auftraege')}
              >
                Aufträge anzeigen
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow rounded-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-600">
                <MessageSquare className="h-6 w-6" />
                Nachrichten
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Kommunizieren Sie direkt mit unserem Team.</p>
              <Button 
                className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white"
                onClick={() => navigate('/kundenportal/nachrichten')}
              >
                Nachrichten anzeigen
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow rounded-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-600">
                <Settings className="h-6 w-6" />
                Einstellungen
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Verwalten Sie Ihre Kontoeinstellungen und Präferenzen.</p>
              <Button 
                className="w-full bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-700 hover:to-yellow-700 text-white"
                onClick={() => navigate('/kundenportal/einstellungen')}
              >
                Einstellungen
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}