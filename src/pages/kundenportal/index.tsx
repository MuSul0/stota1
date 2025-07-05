import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '@/components/SessionProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ListChecks, MessageSquare, Settings, UserCircle2, LifeBuoy } from 'lucide-react';

export default function Kundenportal() {
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

  if (!session || user?.user_metadata?.role !== 'kunde') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-red-600 text-lg">Zugriff verweigert. Bitte als Kunde anmelden.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-6 py-12">
        {/* Begrüßung */}
        <div className="flex flex-col md:flex-row items-center md:items-start md:justify-between mb-12 gap-6">
          <div className="flex items-center space-x-4">
            <UserCircle2 className="w-20 h-20 text-blue-600" />
            <div>
              <h1 className="text-4xl font-extrabold text-gray-900">Willkommen zurück,</h1>
              <p className="text-xl text-gray-700">{user.email}</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            onClick={() => navigate('/kundenportal/einstellungen')}
            className="px-6 py-3 text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white transition"
          >
            Kontoeinstellungen
          </Button>
        </div>

        {/* Dashboard Karten */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          <Card className="shadow-lg rounded-xl hover:shadow-2xl transition-shadow duration-300 bg-white">
            <CardHeader className="flex items-center space-x-3 pb-4 border-b border-gray-200">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-lg font-semibold text-gray-900">Termine</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">
                Verwalten Sie Ihre gebuchten Dienstleistungen und Termine bequem an einem Ort.
              </p>
              <Button 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                onClick={() => navigate('/kundenportal/termine')}
              >
                Termine anzeigen
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg rounded-xl hover:shadow-2xl transition-shadow duration-300 bg-white">
            <CardHeader className="flex items-center space-x-3 pb-4 border-b border-gray-200">
              <div className="p-3 bg-green-100 rounded-lg">
                <ListChecks className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-lg font-semibold text-gray-900">Aufträge</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">
                Behalten Sie den Status Ihrer Aufträge im Blick und bleiben Sie informiert.
              </p>
              <Button 
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                onClick={() => navigate('/kundenportal/auftraege')}
              >
                Aufträge anzeigen
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg rounded-xl hover:shadow-2xl transition-shadow duration-300 bg-white">
            <CardHeader className="flex items-center space-x-3 pb-4 border-b border-gray-200">
              <div className="p-3 bg-purple-100 rounded-lg">
                <MessageSquare className="w-8 h-8 text-purple-600" />
              </div>
              <CardTitle className="text-lg font-semibold text-gray-900">Nachrichten</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">
                Kommunizieren Sie direkt mit unserem Team für schnelle Antworten.
              </p>
              <Button 
                className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white"
                onClick={() => navigate('/kundenportal/nachrichten')}
              >
                Nachrichten anzeigen
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg rounded-xl hover:shadow-2xl transition-shadow duration-300 bg-white">
            <CardHeader className="flex items-center space-x-3 pb-4 border-b border-gray-200">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Settings className="w-8 h-8 text-orange-600" />
              </div>
              <CardTitle className="text-lg font-semibold text-gray-900">Einstellungen</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">
                Verwalten Sie Ihre Kontoeinstellungen und Präferenzen einfach und sicher.
              </p>
              <Button 
                className="w-full bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-700 hover:to-yellow-700 text-white"
                onClick={() => navigate('/kundenportal/einstellungen')}
              >
                Einstellungen
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg rounded-xl hover:shadow-2xl transition-shadow duration-300 bg-white">
            <CardHeader className="flex items-center space-x-3 pb-4 border-b border-gray-200">
              <div className="p-3 bg-teal-100 rounded-lg">
                <LifeBuoy className="w-8 h-8 text-teal-600" />
              </div>
              <CardTitle className="text-lg font-semibold text-gray-900">Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">
                Hilfe und Unterstützung bei Fragen und Problemen.
              </p>
              <Button 
                className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white"
                onClick={() => navigate('/kundenportal/support')}
              >
                Support aufrufen
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}