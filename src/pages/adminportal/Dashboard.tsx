import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Users, CheckCircle, Clock, Eye, UserPlus } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    activeUsers: 0,
    completedServices: 0,
    pendingRequests: 0,
    visitorsToday: 0,
    newRegistrationsToday: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: revenue, error: revenueError } = await supabase.rpc('calculate_total_revenue');
      if (revenueError) throw revenueError;

      const { count: usersCount, error: usersError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });
      if (usersError) throw usersError;

      const { count: servicesCount, error: servicesError } = await supabase
        .from('services')
        .select('*', { count: 'exact', head: true });
      if (servicesError) throw servicesError;

      const { count: pendingCount, error: pendingError } = await supabase
        .from('requests')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');
      if (pendingError) throw pendingError;

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const { count: visitorsCount, error: visitorsError } = await supabase
        .from('visitors')
        .select('*', { count: 'exact', head: true })
        .gte('visited_at', today.toISOString());
      if (visitorsError) throw visitorsError;

      const { count: registrationsCount, error: registrationsError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', today.toISOString());
      if (registrationsError) throw registrationsError;

      setStats({
        totalRevenue: revenue || 0,
        activeUsers: usersCount || 0,
        completedServices: servicesCount || 0,
        pendingRequests: pendingCount || 0,
        visitorsToday: visitorsCount || 0,
        newRegistrationsToday: registrationsCount || 0
      });
    } catch (error) {
      toast.error('Fehler beim Laden der Statistiken');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg">Lade Statistiken...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <motion.main 
        className="flex-grow container mx-auto px-6 py-12 space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
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

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Besucher heute</CardTitle>
              <Eye className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.visitorsToday}</div>
              <p className="text-xs text-gray-500">Aktuelle Besucheranzahl</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Registrierungen heute</CardTitle>
              <UserPlus className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.newRegistrationsToday}</div>
              <p className="text-xs text-gray-500">Neue Benutzeranmeldungen</p>
            </CardContent>
          </Card>
        </div>
      </motion.main>
    </div>
  );
}