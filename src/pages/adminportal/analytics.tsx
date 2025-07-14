import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { Loader2, Users, Globe, MapPin } from 'lucide-react';

interface Visitor {
  id: string;
  ip_address: string;
  user_agent: string;
  country: string;
  city: string;
  visited_at: string;
}

interface AnalyticsStats {
  totalVisitors: number;
  uniqueCountries: number;
  uniqueCities: number;
}

export default function AdminAnalytics() {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [stats, setStats] = useState<AnalyticsStats>({ totalVisitors: 0, uniqueCountries: 0, uniqueCities: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    setLoading(true);
    try {
      const { data, error, count } = await supabase
        .from('visitors')
        .select('*', { count: 'exact' })
        .order('visited_at', { ascending: false });

      if (error) throw error;

      const uniqueCountries = new Set(data.map(v => v.country).filter(Boolean)).size;
      const uniqueCities = new Set(data.map(v => v.city).filter(Boolean)).size;

      setVisitors(data.slice(0, 100) || []); // Show only last 100 in table, but calculate on all
      setStats({
        totalVisitors: count || 0,
        uniqueCountries,
        uniqueCities,
      });
    } catch (error) {
      toast.error('Fehler beim Laden der Analytics-Daten');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-white">Analytics</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="bg-gray-700 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Besucher Gesamt</CardTitle>
            <Users className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalVisitors}</div>
          </CardContent>
        </Card>
        <Card className="bg-gray-700 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Länder</CardTitle>
            <Globe className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.uniqueCountries}</div>
          </CardContent>
        </Card>
        <Card className="bg-gray-700 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Städte</CardTitle>
            <MapPin className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.uniqueCities}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gray-700 text-white">
        <CardHeader>
          <CardTitle>Letzte 100 Besucher</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-gray-600/50 border-gray-600">
                  <TableHead className="text-white">Datum</TableHead>
                  <TableHead className="text-white">IP Addresse</TableHead>
                  <TableHead className="text-white">Standort</TableHead>
                  <TableHead className="text-white">User Agent</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {visitors.map((visitor) => (
                  <TableRow key={visitor.id} className="hover:bg-gray-600/50 border-gray-600">
                    <TableCell>{new Date(visitor.visited_at).toLocaleString()}</TableCell>
                    <TableCell>{visitor.ip_address}</TableCell>
                    <TableCell>{visitor.city}, {visitor.country}</TableCell>
                    <TableCell className="truncate max-w-xs">{visitor.user_agent}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}