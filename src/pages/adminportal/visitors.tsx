import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

interface Visitor {
  id: string;
  ip_address: string;
  user_agent: string;
  visited_at: string;
  country: string | null;
  city: string | null;
}

export default function Visitors() {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVisitors();
  }, []);

  const fetchVisitors = async () => {
    setLoading(true);
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
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
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
      <Footer />
    </div>
  );
}