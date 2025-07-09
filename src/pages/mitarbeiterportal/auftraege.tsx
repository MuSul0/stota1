import { useSession } from '@/components/SessionProvider';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { motion } from 'framer-motion';

interface Auftrag {
  id: string;
  title: string;
  description: string;
  status: 'offen' | 'in_bearbeitung' | 'abgeschlossen';
  assigned_to: string;
  created_at: string;
}

export default function Auftraege() {
  const { session, user, loading } = useSession();
  const navigate = useNavigate();
  const [auftraege, setAuftraege] = useState<Auftrag[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const subscriptionRef = useRef<any>(null);

  useEffect(() => {
    if (!loading) {
      if (!session || user?.role !== 'mitarbeiter') {
        navigate('/login');
      } else {
        fetchAuftraege();
        setupRealtimeSubscription();
      }
    }
    return () => {
      if (subscriptionRef.current) {
        supabase.removeChannel(subscriptionRef.current);
        subscriptionRef.current = null;
      }
    };
  }, [session, user, loading, navigate]);

  const fetchAuftraege = async () => {
    if (!user) return;
    setLoadingData(true);
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('assigned_to', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Fehler beim Laden der Aufträge');
      console.error(error);
    } else {
      setAuftraege(data || []);
    }
    setLoadingData(false);
  };

  const setupRealtimeSubscription = () => {
    if (!user) return;
    if (subscriptionRef.current) {
      supabase.removeChannel(subscriptionRef.current);
      subscriptionRef.current = null;
    }
    const channel = supabase
      .channel('public:tasks')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'tasks', filter: `assigned_to=eq.${user.id}` },
        () => {
          fetchAuftraege();
        }
      )
      .subscribe();
    subscriptionRef.current = channel;
  };

  if (loading || loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg">Lade Aufträge...</p>
      </div>
    );
  }

  if (!session || user?.role !== 'mitarbeiter') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <motion.main 
        className="flex-grow container mx-auto px-6 py-12 max-w-5xl space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold">Ihre Aufträge</h1>
        <p className="mb-6 text-gray-700">Verwalten Sie Ihre zugewiesenen Aufträge und deren Status.</p>

        {auftraege.length === 0 ? (
          <p className="text-gray-600">Keine Aufträge gefunden.</p>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Auftragsübersicht</CardTitle>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Titel</TableHead>
                    <TableHead>Beschreibung</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Erstellt am</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auftraege.map((auftrag) => (
                    <TableRow key={auftrag.id}>
                      <TableCell>{auftrag.title}</TableCell>
                      <TableCell className="max-w-lg truncate">{auftrag.description}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-sm font-semibold ${
                            auftrag.status === 'abgeschlossen'
                              ? 'bg-green-100 text-green-800'
                              : auftrag.status === 'in_bearbeitung'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {auftrag.status.replace('_', ' ')}
                        </span>
                      </TableCell>
                      <TableCell>{new Date(auftrag.created_at).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </motion.main>
    </div>
  );
}