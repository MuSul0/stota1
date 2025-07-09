import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { useSession } from '@/components/SessionProvider';
import { useNavigate } from 'react-router-dom';

interface Visitor {
  id: string;
  ip_address: string;
  user_agent: string;
  visited_at: string;
  country: string | null;
  city: string | null;
}

export default function Visitors() {
  const { session, user, loading } = useSession();
  const navigate = useNavigate();

  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!loading) {
      if (!session || user?.role !== 'admin') {
        navigate('/login');
      } else {
        fetchVisitors();
      }
    }
  }, [session, user, loading, navigate]);

  const fetchVisitors = async () => {
    setLoadingData(true);
    try {
      const { data, error } = await supabase
        .from('visitors')
        .select('*')
        .order('visited_at', { ascending: false })
        .limit(100);

      if (error) throw error;

      setVisitors(data || []);
    } catch (error) {
      toast.error('Fehler beim Laden der Besucher');
      console.error(error);
    } finally {
      setLoadingData(false);
    }
  };

  if (loading || loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!session || user?.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-grow container mx-auto px-6 py-12 max-w-7xl">
        <h1 className="text-3xl font-bold mb-8">Besucher-Tracking</h1>

        {visitors.length === 0 ? (
          <p className="text-gray-600">Keine Besucher-Daten gefunden.</p>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Letzte Besucher</CardTitle>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>IP-Adresse</TableHead>
                    <TableHead>Besuchszeit</TableHead>
                    <TableHead>Land</TableHead>
                    <TableHead>Stadt</TableHead>
                    <TableHead>User Agent</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {visitors.map(visitor => (
                    <TableRow key={visitor.id}>
                      <TableCell>{visitor.ip_address}</TableCell>
                      <TableCell>{new Date(visitor.visited_at).toLocaleString()}</TableCell>
                      <TableCell>{visitor.country || 'Unbekannt'}</TableCell>
                      <TableCell>{visitor.city || 'Unbekannt'}</TableCell>
                      <TableCell className="max-w-xs truncate">{visitor.user_agent}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}