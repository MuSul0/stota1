import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2, Trash2 } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

interface WorkTime {
  id: string;
  start_time: string;
  end_time: string | null;
  created_at: string;
  profiles: {
    first_name: string;
    last_name: string;
  } | null;
}

export default function AdminArbeitszeiten() {
  const [workTimes, setWorkTimes] = useState<WorkTime[]>([]);
  const [loading, setLoading] = useState(true);
  const subscriptionRef = useRef<any>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('work_times')
        .select('*, profiles(first_name, last_name)')
        .order('start_time', { ascending: false });

      if (error) throw error;
      setWorkTimes(data || []);
    } catch (error) {
      toast.error("Fehler beim Laden der Arbeitszeiten.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    // Realtime subscription logic moved directly into useEffect
    const channel = supabase
      .channel('public:work_times')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'work_times' }, () => {
        toast.info("Arbeitszeiten wurden aktualisiert.");
        fetchData();
      })
      .subscribe();
    subscriptionRef.current = channel;

    return () => {
      if (subscriptionRef.current) {
        supabase.removeChannel(subscriptionRef.current);
        subscriptionRef.current = null;
      }
    };
  }, []);

  const handleDeleteWorkTime = async (workTimeId: string) => {
    const { error } = await supabase.from('work_times').delete().eq('id', workTimeId);
    if (error) {
        toast.error('Fehler beim Löschen der Arbeitszeit.');
        console.error(error);
    } else {
        toast.success('Arbeitszeit erfolgreich gelöscht.');
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Arbeitszeitenübersicht</h1>
      <Card className="bg-gray-700 text-white shadow-lg">
        <CardHeader>
          <CardTitle>Alle erfassten Arbeitszeiten</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-600">
                <TableHead className="text-white">Mitarbeiter</TableHead>
                <TableHead className="text-white">Startzeit</TableHead>
                <TableHead className="text-white">Endzeit</TableHead>
                <TableHead className="text-white">Dauer</TableHead>
                <TableHead className="text-white text-right">Aktion</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {workTimes.map((wt) => {
                const start = new Date(wt.start_time);
                const end = wt.end_time ? new Date(wt.end_time) : null;
                const duration = end ? ((end.getTime() - start.getTime()) / 3600000).toFixed(2) + ' Std.' : 'Offen';
                const mitarbeiterName = wt.profiles ? `${wt.profiles.first_name} ${wt.profiles.last_name}` : 'Unbekannt';
                
                return (
                  <TableRow key={wt.id} className="border-gray-600">
                    <TableCell>{mitarbeiterName}</TableCell>
                    <TableCell>{start.toLocaleString()}</TableCell>
                    <TableCell>{end ? end.toLocaleString() : '-'}</TableCell>
                    <TableCell>{duration}</TableCell>
                    <TableCell className="text-right">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Sind Sie sicher?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Diese Aktion kann nicht rückgängig gemacht werden. Dadurch wird der Arbeitszeiteintrag dauerhaft gelöscht.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Abbrechen</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteWorkTime(wt.id)}>
                              Löschen
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}