import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, CalendarCheck, Euro, Package } from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    { title: 'Neue Kunden', value: '12', icon: Users, change: '+5%' },
    { title: 'Buchungen', value: '24', icon: CalendarCheck, change: '+12%' },
    { title: 'Umsatz', value: '3.450€', icon: Euro, change: '+8%' },
    { title: 'Dienstleistungen', value: '5', icon: Package, change: '0%' }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-gray-500">{stat.change} im letzten Monat</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Letzte Buchungen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Max Mustermann - Gebäudereinigung</span>
                <span className="text-sm text-gray-500">Heute, 10:00</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Erika Musterfrau - Umzugshilfe</span>
                <span className="text-sm text-gray-500">Gestern, 14:30</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Aktivitäten</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                <span>Systemupdate abgeschlossen</span>
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                <span>Neuer Mitarbeiter hinzugefügt</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}