import { useSession } from '@/components/SessionProvider';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Briefcase, Truck, Users, LogIn, LogOut, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

interface WorkTime {
  id: string;
  start_time: string;
  end_time: string | null;
}

interface Auftrag {
  id: string;
  title: string;
  status: 'offen' | 'in_bearbeitung' | 'abgeschlossen';
}

export default function Mitarbeiterportal() {
  const { session, user, loading } = useSession();
  const navigate = useNavigate();

  const [activeWorkTime, setActiveWorkTime] = useState<WorkTime | null>(null);
  const [recentAuftraege, setRecentAuftraege] = useState<Auftrag[]>([]);
  const [auftraegeStats, setAuftraegeStats] = useState({ open: 0, inProgress: 0 });
  const [loadingDashboard, setLoadingDashboard] = useState(true);

  const fetchDashboardData = async () => {
    if (!user) return;
    setLoadingDashboard(true);
    try {
      const [workTimeRes, auftraegeRes] = await Promise.all([
        supabase.from('work_times').select('id, start_time, end_time').eq('user_id', user.id).is('end_time', null).maybeSingle(),
        supabase.from('tasks').select('id, title, status').eq('assigned_to', user.id).order('created_at', { ascending: false })
      ]);

      if (workTimeRes.error) throw workTimeRes.error;
      setActiveWorkTime(workTimeRes.data);

      if (auftraegeRes.error) throw auftraegeRes.error;
      const allAuftraege = auftraegeRes.data || [];
      setRecentAuftraege(allAuftraege.slice(0, 3));
      setAuftraegeStats({
        open: allAuftraege.filter(a => a.status === 'offen').length,
        inProgress: allAuftraege.filter(a => a.status === 'in_bearbeitung').length,
      });

    } catch (error) {
      toast.error("Fehler beim Laden der Dashboard-Daten.");
      console.error(error);
    } finally {
      setLoadingDashboard(false);
    }
  };

  useEffect(() => {
    if (!loading) {
      if (!session || user?.role !== 'mitarbeiter') {
        navigate('/login');
      } else {
        fetchDashboardData();
      }
    }
  }, [session, user, loading, navigate]);

  const handleClockIn = async () => {
    if (!user) return;
    const { error } = await supabase.from('work_times').insert({ user_id: user.id, start_time: new Date().toISOString() });
    if (error) {
      toast.error("Fehler beim Einstempeln.");
    } else {
      toast.success("Erfolgreich eingestempelt!");
      fetchDashboardData();
    }
  };

  const handleClockOut = async () => {
    if (!activeWorkTime) return;
    const { error } = await supabase.from('work_times').update({ end_time: new Date().toISOString() }).eq('id', activeWorkTime.id);
    if (error) {
      toast.error("Fehler beim Ausstempeln.");
    } else {
      toast.success("Erfolgreich ausgestempelt!");
      fetchDashboardData();
    }
  };

  if (loading || loadingDashboard) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg">Lade Dashboard...</p>
      </div>
    );
  }

  if (!session || user?.role !== 'mitarbeiter') {
    return null;
  }

  const getStatusBadge = (status: Auftrag['status']) => {
    switch (status) {
      case 'offen':
        return <Badge variant="secondary">{status}</Badge>;
      case 'in_bearbeitung':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80">{status.replace('_', ' ')}</Badge>;
      case 'abgeschlossen':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100/80">{status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <motion.main
        className="container mx-auto px-4 py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900">Mitarbeiter-Dashboard</h1>
          <p className="text-lg text-gray-600 mt-2">Willkommen zurück, {user?.first_name || 'Mitarbeiter'}!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Clock className="w-6 h-6 text-blue-600" /> Zeiterfassung</CardTitle>
                <CardDescription>
                  {activeWorkTime
                    ? `Sie sind seit ${new Date(activeWorkTime.start_time).toLocaleTimeString()} Uhr eingestempelt.`
                    : "Sie sind aktuell nicht eingestempelt."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {activeWorkTime ? (
                  <Button onClick={handleClockOut} variant="destructive" className="w-full sm:w-auto">
                    <LogOut className="mr-2 h-4 w-4" /> Jetzt Ausstempeln
                  </Button>
                ) : (
                  <Button onClick={handleClockIn} className="w-full sm:w-auto bg-green-600 hover:bg-green-700">
                    <LogIn className="mr-2 h-4 w-4" /> Jetzt Einstempeln
                  </Button>
                )}
              </CardContent>
              <CardFooter>
                 <Button variant="link" className="p-0 h-auto text-blue-600" onClick={() => navigate('/mitarbeiterportal/arbeitszeiten')}>
                    Alle Zeiten anzeigen <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Briefcase className="w-6 h-6 text-blue-600" /> Ihre Aufträge</CardTitle>
                <CardDescription>
                  Sie haben {auftraegeStats.open} offene und {auftraegeStats.inProgress} laufende Aufträge.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {recentAuftraege.length > 0 ? (
                  <ul className="space-y-3">
                    {recentAuftraege.map(auftrag => (
                      <li key={auftrag.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                        <span className="font-medium text-gray-800">{auftrag.title}</span>
                        {getStatusBadge(auftrag.status)}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">Sie haben aktuell keine zugewiesenen Aufträge.</p>
                )}
              </CardContent>
              <CardFooter>
                <Button variant="link" className="p-0 h-auto text-blue-600" onClick={() => navigate('/mitarbeiterportal/auftraege')}>
                    Alle Aufträge anzeigen <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-8">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Truck className="w-6 h-6 text-blue-600" /> Fahrzeuge</CardTitle>
                <CardDescription>Fahrzeuge reservieren und verwalten.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" onClick={() => navigate('/mitarbeiterportal/fahrzeuge')}>
                  Zur Fahrzeugübersicht
                </Button>
              </CardContent>
            </Card>
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Users className="w-6 h-6 text-blue-600" /> Team</CardTitle>
                <CardDescription>Finden Sie Ihre Kollegen.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" onClick={() => navigate('/mitarbeiterportal/team')}>
                  Team anzeigen
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.main>
    </div>
  );
}