import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Users, Clock, CheckCircle } from 'lucide-react';

const AdminDashboardPage = () => {
  const stats = [
    { title: 'Aktive Benutzer', value: '124', icon: <Users className="h-6 w-6" /> },
    { title: 'Heutige Anfragen', value: '8', icon: <Activity className="h-6 w-6" /> },
    { title: 'Durchschn. Antwortzeit', value: '2h 15m', icon: <Clock className="h-6 w-6" /> },
    { title: 'Erledigte Aufträge', value: '94%', icon: <CheckCircle className="h-6 w-6" /> }
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Aktivitäten</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Aktivitätenliste würde hier stehen */}
            <div className="text-gray-500">Letzte Aktivitäten werden hier angezeigt</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Schnellzugriff</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Schnellzugriffsbuttons */}
            <div className="space-y-4">
              <Button variant="outline" className="w-full">
                Neuen Service hinzufügen
              </Button>
              <Button variant="outline" className="w-full">
                Bewertung moderieren
              </Button>
              <Button variant="outline" className="w-full">
                Galerie aktualisieren
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboardPage;