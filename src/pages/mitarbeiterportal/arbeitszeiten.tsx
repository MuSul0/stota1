import { useSession } from '@/components/SessionProvider';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { motion } from 'framer-motion';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Trash2 } from 'lucide-react';

interface WorkTime {
  id: string;
  user_id: string;
  start_time: string;
  end_time: string | null;
  created_at: string;
}

export default function Arbeitszeiten() {
  const { session, user, loading } = useSession();
  const navigate = useNavigate();
  const [workTimes, setWorkTimes] = useState<WorkTime[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const subscriptionRef = useRef<any>(null);

  useEffect(() => {
    if (!loading) {
      if (!session || user?.role !== 'mitarbeiter') {
        navigate('/login');
      } else {
        fetchWorkTimes();
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

  const fetchWorkTimes = async () => {
    if (!user) return;
    setLoadingData(true);
    const { data, error } = await supabase
      .from('work_times')
      .select('*')
      .eq('user_id', user.id)
      .order('start_time', { ascending: false });

    if (error) {
      toast.error('Fehler beim Laden der Arbeitszeiten');
      console.error(error);
    } else {
      setWorkTimes(data || []);
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
      .channel('public:work_times')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'work_times', filter: `user_id=eq.${user.id}` },
        () => {
          fetchWorkTimes();
        }
      )
      .subscribe();
    subscriptionRef.current = channel;
  };

  const handleAddWorkTime = async () => {
    if (!startTime) {
      toast.error('Bitte Startzeit eingeben');
      return;
    }
    if (!user) {
      toast.error('Benutzer nicht gefunden');
      return;
    }
    const newWorkTime = {
      user_id: user.id,
      start_time: startTime,
      end_time: endTime || null
    };
    const { error } = await supabase.from('work_times').insert(newWorkTime);
    if (error) {
      toast.error('Fehler beim Hinzufügen der Arbeitszeit');
      console.error(error);
    } else {
      toast.success('Arbeitszeit erfolgreich hinzugefügt');
      setStartTime('');
      setEndTime('');
    }
  };

  const handleDeleteWorkTime = async (workTimeId: string) => {
    const { error } = await supabase.from('work_times').delete().eq('id', workTimeId);
    if (error) {
        toast.error('Fehler beim Löschen der Arbeitszeit.');
        console.error(error);
    } else {
        toast.success('Arbeitszeit erfolgreich gelöscht.');
    }
  };

  if (loading || loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg">Lade Arbeitszeiten...</p>
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
        <h1 className="text-3xl font-bold">Arbeitszeiten</h1>
        <p className="mb-6 text-gray-700">Erfassen und verwalten Sie Ihre Arbeitszeiten.</p>

        <Card>
          <CardHeader>
            <CardTitle>Neue Arbeitszeit erfassen</CardTitle>
            <CardDescription>Start- und Endzeit eingeben (Endzeit optional)</CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddWorkTime();
              }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end"
            >
              <div>
                <Label htmlFor="startTime">Startzeit *</Label>
                <Input
                  id="startTime"
                  type="datetime-local"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="endTime">Endzeit</Label>
                <Input
                  id="endTime"
                  type="datetime-local"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>
              <div>
                <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                  Arbeitszeit hinzufügen
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {workTimes.length === 0 ? (
          <p className="text-gray-600">Keine Arbeitszeiten gefunden.</p>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Arbeitszeiten Übersicht</CardTitle>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Startzeit</TableHead>
                    <TableHead>Endzeit</TableHead>
                    <TableHead>Dauer</TableHead>
                    <TableHead>Erfasst am</TableHead>
                    <TableHead className="text-right">Aktion</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {workTimes.map((wt) => {
                    const start = new Date(wt.start_time);
                    const end = wt.end_time ? new Date(wt.end_time) : null;
                    const duration = end ? ((end.getTime() - start.getTime()) / 3600000).toFixed(2) + ' Std.' : 'Offen';
                    return (
                      <TableRow key={wt.id}>
                        <TableCell>{start.toLocaleString()}</TableCell>
                        <TableCell>{end ? end.toLocaleString() : '-'}</TableCell>
                        <TableCell>{duration}</TableCell>
                        <TableCell>{new Date(wt.created_at).toLocaleString()}</TableCell>
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
        )}
      </motion.main>
    </div>
  );
}