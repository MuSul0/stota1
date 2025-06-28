import { useSession } from '@/components/SessionProvider';
import { redirect } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart2, Users, Settings, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminDashboard() {
  const { session, user } = useSession();

  if (!session || user?.role !== 'admin') {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Admin-Portal</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-6 w-6 text-blue-500" />
                Mitarbeiter
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Mitarbeiter verwalten</p>
              <Button onClick={() => redirect('/admin/mitarbeiter')}>Verwalten</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart2 className="h-6 w-6 text-green-500" />
                Statistiken
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Unternehmensstatistiken</p>
              <Button onClick={() => redirect('/admin/statistiken')}>Anzeigen</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-6 w-6 text-purple-500" />
                Rechnungen
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Rechnungen verwalten</p>
              <Button onClick={() => redirect('/admin/rechnungen')}>Verwalten</Button>
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
              <p className="text-gray-600 mb-4">Systemeinstellungen</p>
              <Button onClick={() => redirect('/admin/einstellungen')}>Konfigurieren</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}