import { useSession } from '@/components/SessionProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, ListChecks, MessageSquare, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function KundenDashboard() {
  const { session } = useSession();

  if (!session || session.user.user_metadata?.role !== 'kunde') {
    return <div>Zugriff verweigert. Bitte als Kunde anmelden.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Mein Kundenbereich</h1>
        
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
              <Button>Termine anzeigen</Button>
            </CardContent>
          </Card>

          {/* Weitere Karten für Kundenbereich */}
        </div>
      </div>
    </div>
  );
}