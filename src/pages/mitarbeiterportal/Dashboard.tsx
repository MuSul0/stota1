import { useSession } from '@/components/SessionProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, CalendarCheck, Truck, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function MitarbeiterDashboard() {
  const { session } = useSession();

  if (!session || session.user.user_metadata?.role !== 'mitarbeiter') {
    return <div>Zugriff verweigert. Bitte als Mitarbeiter anmelden.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Mitarbeiterbereich</h1>
        
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
              <Button>Zeiterfassung</Button>
            </CardContent>
          </Card>

          {/* Weitere Karten für Mitarbeiterbereich */}
        </div>
      </div>
    </div>
  );
}