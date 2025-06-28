import { useSession } from '@/components/SessionProvider';
import { redirect } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, CalendarCheck, Truck, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function MitarbeiterDashboard() {
  const { session, user } = useSession();

  if (!session || user?.role !== 'mitarbeiter') {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Mitarbeiterportal</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-6 w-6 text-blue-500" />
                Arbeitszeiten
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Erfassen Sie Ihre Arbeitszeiten</p>
              <Button onClick={() => redirect('/arbeitszeiten')}>Erfassen</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarCheck className="h-6 w-6 text-green-500" />
                Aufträge
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Ihre zugewiesenen Aufträge</p>
              <Button onClick={() => redirect('/mitarbeiter-auftraege')}>Anzeigen</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-6 w-6 text-purple-500" />
                Fahrzeuge
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Verfügbare Fahrzeuge</p>
              <Button onClick={() => redirect('/fahrzeuge')}>Reservieren</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-6 w-6 text-orange-500" />
                Team
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Teamübersicht</p>
              <Button onClick={() => redirect('/team')}>Anzeigen</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}