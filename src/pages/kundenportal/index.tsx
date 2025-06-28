import { useSession } from '@/components/SessionProvider';
import { redirect } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, ListChecks, MessageSquare, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function KundenDashboard() {
  const { session, user } = useSession();

  if (!session || user?.role !== 'kunde') {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-gray-50">
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
              <Button onClick={() => redirect('/termine')}>Anzeigen</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ListChecks className="h-6 w-6 text-green-500" />
                Aufträge
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Verfolgen Sie den Status Ihrer Aufträge</p>
              <Button onClick={() => redirect('/auftraege')}>Anzeigen</Button>
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
              <Button onClick={() => redirect('/nachrichten')}>Anzeigen</Button>
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
              <Button onClick={() => redirect('/einstellungen')}>Anzeigen</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}