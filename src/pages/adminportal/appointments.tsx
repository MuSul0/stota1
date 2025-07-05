import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

interface Appointment {
  id: string;
  user_email: string;
  date: string;
  time: string;
  service: string;
  status: 'Bestätigt' | 'Ausstehend' | 'Abgesagt';
}

export default function Appointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('alle');

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('*, profiles(email)')
        .order('date', { ascending: true })
        .order('time', { ascending: true });

      if (error) throw error;

      const mapped = (data || []).map((item: any) => ({
        id: item.id,
        user_email: item.profiles?.email || 'Unbekannt',
        date: item.date,
        time: item.time,
        service: item.service,
        status: item.status
      }));

      setAppointments(mapped);
    } catch (error) {
      toast.error('Fehler beim Laden der Termine');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAppointments = filterStatus === 'alle'
    ? appointments
    : appointments.filter(a => a.status.toLowerCase() === filterStatus.toLowerCase());

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
      <main className="flex-grow container mx-auto px-6 py-12 max-w-7xl space-y-6">
        <h1 className="text-3xl font-bold">Terminübersicht</h1>

        <div className="max-w-xs">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger>
              <SelectValue>Filter: {filterStatus === 'alle' ? 'Alle' : filterStatus}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="alle">Alle</SelectItem>
              <SelectItem value="bestätigt">Bestätigt</SelectItem>
              <SelectItem value="ausstehend">Ausstehend</SelectItem>
              <SelectItem value="abgesagt">Abgesagt</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {filteredAppointments.length === 0 ? (
          <p className="text-gray-600">Keine Termine gefunden.</p>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Termine</CardTitle>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>E-Mail</TableHead>
                    <TableHead>Datum</TableHead>
                    <TableHead>Uhrzeit</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAppointments.map((appt) => (
                    <TableRow key={appt.id}>
                      <TableCell>{appt.user_email}</TableCell>
                      <TableCell>{new Date(appt.date).toLocaleDateString()}</TableCell>
                      <TableCell>{appt.time}</TableCell>
                      <TableCell>{appt.service}</TableCell>
                      <TableCell>{appt.status}</TableCell>
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