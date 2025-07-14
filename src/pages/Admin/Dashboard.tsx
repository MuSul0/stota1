import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Activity, Users, CheckCircle, Clock, DollarSign, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    activeUsers: 0,
    completedServices: 0,
    pendingRequests: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      // Statistikdaten abrufen
      const { data: revenue } = await supabase.rpc('calculate_total_revenue');
      
      const { count: users } = await supabase
        .from('profiles')
        .select('*', { count: 'exact' });

      const { count: services } = await supabase
        .from('services')
        .select('*', { count: 'exact' });

      setStats({
        totalRevenue: revenue || 0,
        activeUsers: users || 0,
        completedServices: services || 0,
        pendingRequests: 8 // Beispielwert
      });
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Umsatz</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRevenue.toLocaleString()} €</div>
            <p className="text-xs text-gray-500">+12% im letzten Monat</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Aktive Benutzer</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeUsers}</div>
            <p className="text-xs text-gray-500">+5 neue Benutzer</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Abgeschlossene Services</CardTitle>
            <CheckCircle className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedServices}</div>
            <p className="text-xs text-gray-500">+15% im letzten Monat</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Ausstehende Anfragen</CardTitle>
            <Clock className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingRequests}</div>
            <p className="text-xs text-gray-500">2 hoch priorisiert</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Aktivitäten</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <TrendingUp className="h-4 w-4 mr-2 text-green-500" />
                <span>Neuer Service gebucht (Umzugshilfe)</span>
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2 text-blue-500" />
                <span>Neuer Benutzer registriert</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Schnellaktionen</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2">
            <Button variant="outline">Neuen Service erstellen</Button>
            <Button variant="outline">Benutzer einladen</Button>
            <Button variant="outline">Bericht generieren</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}