import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '@/components/SessionProvider';
// Header und Footer entfernt, da sie vom AdminLayout bereitgestellt werden
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface Termin {
  id: string;
  date: string;
  time: string;
  service: string;
  status: 'Bestätigt' | 'Ausstehend' | 'Abgesagt';
}

const servicesOptions = [
  { value: 'reinigung', label: 'Reinigungsservice' },
  { value: 'transport', label: 'Transport & Kurier' },
  { value: 'umzug', label: 'Umzugshilfe' },
  { value: 'beratung', label: 'Beratung' },
  { value: 'sonstiges', label: 'Sonstiges' }
];

export default function Termine() {
  const { session, user, loading } = useSession();
  const navigate = useNavigate();

  const [termine, setTermine] = useState<Termin[]>([]);
  const [loadingTermine, setLoadingTermine] = useState(true);

  // Formularzustand für neuen Termin
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const [newService, setNewService] = useState('');

  // Ref für Supabase Subscription speichern
  const subscriptionRef = useRef<any>(null);

  useEffect(() => {
    if (!loading) {
      if (!session || user?.user_metadata?.role !== 'kunde') {
        navigate('/login');
      } else {
        fetchTermine();
        setupRealtimeSubscription();
      }
    }
    // Cleanup on unmount
    return () => {
      if (subscriptionRef.current) {
        supabase.removeChannel(subscriptionRef.current);
        subscriptionRef.current = null;
      }
    };
  }, [session, user, loading]);

  const fetchTermine = async () => {
    if (!user) return;
    setLoadingTermine(true);
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .eq('user_id', user.id)
      .order('date', { ascending: true })
      .order('time', { ascending: true });

    if (error) {
      toast.error('Fehler beim Laden der Termine');
      console.error(error);
    } else {
      setTermine(data || []);
    }
    setLoadingTermine(false);
  };

  const setupRealtimeSubscription = () => {
    if (!user) return;
    // Falls schon eine Subscription besteht, entfernen
    if (subscriptionRef.current) {
      supabase.removeChannel(subscriptionRef.current);
      subscriptionRef.current = null;
    }

    const channel = supabase
      .channel('public:appointments')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'appointments', filter: `user_id=eq.${user.id}` },
        (payload) => {
          fetchTermine();
        }
      );

    channel.subscribe();
    subscriptionRef.current = channel;
  };

  const handleAddTermin = async () => {
    if (!newDate || !newTime || !newService) {
      toast.error('Bitte alle Felder ausfüllen');
      return;
    }
    if (!user) {
      toast.error('Benutzer nicht gefunden');
      return;
    }

    const newTermin = {
      user_id: user.id,
      date: newDate,
      time: newTime,
      service: newService,
      status: 'Ausstehend'
    };

    const { error } = await supabase
      .from('appointments')
      .insert(newTermin);

    if (error) {
      toast.error('Fehler beim Hinzufügen des Termins');
      console.error(error);
    } else {
      toast.success('Termin erfolgreich hinzugefügt');
      setNewDate('');
      setNewTime('');
      setNewService('');
      // fetchTermine wird durch Realtime-Subscription automatisch aufgerufen
    }
  };

  if (loading || loadingTermine) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg">Lade Termine...</p>
      </div>
    );
  }

  if (!session || user?.user_metadata?.role !== 'kunde') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-red-600 text-lg">Zugriff verweigert. Bitte als Kunde anmelden.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header entfernt */}
      <main className="flex-grow container mx-auto px-6 py-12 max-w-5xl space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Ihre Termine</h1>
        </div>
        <p className="text-gray-700">Verwalten Sie Ihre gebuchten Dienstleistungen und Termine.</p>

        {/* Neues Termin Formular */}
        <Card>
          <CardHeader>
            <CardTitle>Neuen Termin hinzufügen</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddTermin();
              }}
              className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
            >
              <div>
                <Label htmlFor="date">Datum</Label>
                <Input
                  id="date"
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="time">Uhrzeit</Label>
                <Input
                  id="time"
                  type="time"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="service">Leistung</Label>
                <Select
                  id="service"
                  value={newService}
                  onValueChange={(value) => setNewService(value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Leistung wählen" />
                  </SelectTrigger>
                  <SelectContent>
                    {servicesOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                  Termin hinzufügen
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Terminübersicht */}
        {termine.length === 0 ? (
          <p className="text-gray-600">Keine Termine gefunden.</p>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Terminübersicht</CardTitle>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Datum</TableHead>
                    <TableHead>Uhrzeit</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {termine.map((termin) => (
                    <TableRow key={termin.id}>
                      <TableCell>{new Date(termin.date).toLocaleDateString()}</TableCell>
                      <TableCell>{termin.time}</TableCell>
                      <TableCell>
                        {servicesOptions.find(s => s.value === termin.service)?.label || termin.service}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-sm font-semibold ${
                            termin.status === 'Bestätigt'
                              ? 'bg-green-100 text-green-800'
                              : termin.status === 'Ausstehend'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {termin.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </main>
      {/* Footer entfernt */}
    </div>
  );
}