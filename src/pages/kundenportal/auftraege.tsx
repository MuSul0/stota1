import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '@/components/SessionProvider';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Plus, Loader2, X } from 'lucide-react';

interface Auftrag {
  id: string;
  subject: string;
  description: string;
  status: string;
  created_at: string;
}

export default function Auftraege() {
  const { session, user, loading } = useSession();
  const navigate = useNavigate();

  const [auftraege, setAuftraege] = useState<Auftrag[]>([]);
  const [loadingAuftraege, setLoadingAuftraege] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Formularzustand für neuen Auftrag
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');

  const subscriptionRef = useRef<any>(null);

  useEffect(() => {
    if (!loading) {
      if (!session || !['kunde', 'user'].includes(user?.role || '')) {
        navigate('/login');
      } else {
        fetchAuftraege();
        setupRealtimeSubscription();
      }
    }
    return () => {
      if (subscriptionRef.current) {
        supabase.removeChannel(subscriptionRef.current);
      }
    };
  }, [session, user, loading, navigate]);

  const fetchAuftraege = async () => {
    if (!user) return;
    setLoadingAuftraege(true);
    const { data, error } = await supabase
      .from('requests')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Fehler beim Laden der Aufträge');
    } else {
      setAuftraege(data || []);
    }
    setLoadingAuftraege(false);
  };

  const setupRealtimeSubscription = () => {
    if (!user || subscriptionRef.current) return;
    const channel = supabase
      .channel('public:requests')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'requests', filter: `user_id=eq.${user.id}` }, () => {
        fetchAuftraege();
      })
      .subscribe();
    subscriptionRef.current = channel;
  };

  const handleAddAuftrag = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim() || !user) {
      toast.error('Bitte Betreff und Beschreibung ausfüllen.');
      return;
    }
    setIsSubmitting(true);
    const { error } = await supabase.from('requests').insert({
      user_id: user.id,
      subject,
      description,
      status: 'pending'
    });

    if (error) {
      toast.error('Fehler beim Erstellen des Auftrags.');
    } else {
      toast.success('Auftrag erfolgreich erstellt.');
      setSubject('');
      setDescription('');
      setIsDialogOpen(false);
    }
    setIsSubmitting(false);
  };

  const handleCancelAuftrag = async (auftragId: string) => {
    const { error } = await supabase
      .from('requests')
      .update({ status: 'cancelled' })
      .eq('id', auftragId);

    if (error) {
      toast.error('Fehler beim Stornieren des Auftrags.');
    } else {
      toast.success('Auftrag wurde storniert.');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending': return <Badge variant="outline">Ausstehend</Badge>;
      case 'in_progress': return <Badge className="bg-blue-500 text-white">In Bearbeitung</Badge>;
      case 'completed': return <Badge className="bg-green-500 text-white">Abgeschlossen</Badge>;
      case 'cancelled': return <Badge variant="destructive">Storniert</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  if (loading || loadingAuftraege) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-gray-600" />
        <p className="text-gray-600 text-lg ml-4">Lade Aufträge...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-grow container mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Ihre Aufträge</h1>
            <p className="text-gray-700">Verfolgen Sie den Status Ihrer Aufträge.</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                <Plus className="mr-2 h-4 w-4" /> Neuen Auftrag erstellen
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Neuen Auftrag erstellen</DialogTitle>
                <DialogDescription>
                  Beschreiben Sie Ihr Anliegen. Wir werden uns schnellstmöglich darum kümmern.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddAuftrag}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="subject" className="text-right">Betreff</Label>
                    <Input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} className="col-span-3" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">Beschreibung</Label>
                    <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="col-span-3" required />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Auftrag senden
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Auftragsübersicht</CardTitle>
          </CardHeader>
          <CardContent>
            {auftraege.length === 0 ? (
              <p className="text-center text-gray-500 py-8">Sie haben noch keine Aufträge erstellt.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Betreff</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Erstellt am</TableHead>
                    <TableHead className="text-right">Aktionen</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auftraege.map((auftrag) => (
                    <TableRow key={auftrag.id}>
                      <TableCell className="font-medium">{auftrag.subject}</TableCell>
                      <TableCell>{getStatusBadge(auftrag.status)}</TableCell>
                      <TableCell>{new Date(auftrag.created_at).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        {auftrag.status === 'pending' && (
                           <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                                <X className="h-4 w-4 mr-1" /> Stornieren
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Sind Sie sicher?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Dieser Vorgang kann nicht rückgängig gemacht werden. Möchten Sie diesen Auftrag wirklich stornieren?
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Abbrechen</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleCancelAuftrag(auftrag.id)} className="bg-red-600 hover:bg-red-700">
                                  Ja, stornieren
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}