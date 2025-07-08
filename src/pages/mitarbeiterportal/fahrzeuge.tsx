import { useSession } from '@/components/SessionProvider';
import { useNavigate } from 'react-router-dom';
// Header und Footer entfernt, da sie vom AdminLayout bereitgestellt werden
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { motion } from 'framer-motion';

interface Fahrzeug {
  id: string;
  name: string;
  type: string;
  status: 'verfuegbar' | 'reserviert';
  reserved_by: string | null;
  created_at: string;
}

export default function Fahrzeuge() {
  const { session, user, loading } = useSession();
  const navigate = useNavigate();
  const [fahrzeuge, setFahrzeuge] = useState<Fahrzeug[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const subscriptionRef = useRef<any>(null);

  useEffect(() => {
    if (!loading) {
      if (!session || user?.user_metadata?.role !== 'mitarbeiter') {
        navigate('/login');
      } else {
        fetchFahrzeuge();
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

  const fetchFahrzeuge = async () => {
    setLoadingData(true);
    const { data, error } = await supabase
      .from('vehicles')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      toast.error('Fehler beim Laden der Fahrzeuge');
      console.error(error);
    } else {
      setFahrzeuge(data || []);
    }
    setLoadingData(false);
  };

  const setupRealtimeSubscription = () => {
    if (subscriptionRef.current) {
      supabase.removeChannel(subscriptionRef.current);
      subscriptionRef.current = null;
    }
    const channel = supabase
      .channel('public:vehicles')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'vehicles' }, () => {
        fetchFahrzeuge();
      })
      .subscribe();
    subscriptionRef.current = channel;
  };

  const handleReserve = async (id: string, currentStatus: string) => {
    if (!user) {
      toast.error('Benutzer nicht gefunden');
      return;
    }
    if (currentStatus === 'reserviert') {
      // Fahrzeug freigeben
      const { error } = await supabase
        .from('vehicles')
        .update({ status: 'verfuegbar', reserved_by: null })
        .eq('id', id);
      if (error) {
        toast.error('Fehler beim Freigeben des Fahrzeugs');
        console.error(error);
      } else {
        toast.success('Fahrzeug freigegeben');
      }
    } else {
      // Fahrzeug reservieren
      const { error } = await supabase
        .from('vehicles')
        .update({ status: 'reserviert', reserved_by: user.id })
        .eq('id', id);
      if (error) {
        toast.error('Fehler beim Reservieren des Fahrzeugs');
        console.error(error);
      } else {
        toast.success('Fahrzeug reserviert');
      }
    }
  };

  if (loading || loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg">Lade Fahrzeuge...</p>
      </div>
    );
  }

  if (!session || user?.user_metadata?.role !== 'mitarbeiter') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header entfernt */}
      <motion.main 
        className="flex-grow container mx-auto px-6 py-12 max-w-5xl space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold">Fahrzeuge</h1>
        <p className="mb-6 text-gray-700">Verfügbare Fahrzeuge und Reservierungen.</p>

        {fahrzeuge.length === 0 ? (
          <p className="text-gray-600">Keine Fahrzeuge gefunden.</p>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Fahrzeugübersicht</CardTitle>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Typ</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Aktion</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fahrzeuge.map((fahrzeug) => (
                    <TableRow key={fahrzeug.id}>
                      <TableCell>{fahrzeug.name}</TableCell>
                      <TableCell>{fahrzeug.type}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-sm font-semibold ${
                            fahrzeug.status === 'reserviert'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {fahrzeug.status === 'reserviert' ? 'Reserviert' : 'Verfügbar'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant={fahrzeug.status === 'reserviert' ? 'outline' : 'default'}
                          onClick={() => handleReserve(fahrzeug.id, fahrzeug.status)}
                        >
                          {fahrzeug.status === 'reserviert' ? 'Freigeben' : 'Reservieren'}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </motion.main>
      {/* Footer entfernt */}
    </div>
  );
}