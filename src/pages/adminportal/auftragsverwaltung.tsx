import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, PlusCircle } from 'lucide-react';

interface Auftrag {
  id: string;
  title: string;
  description: string;
  status: 'offen' | 'in_bearbeitung' | 'abgeschlossen';
  assigned_to: string;
  created_at: string;
  profiles: {
    first_name: string;
    last_name: string;
    email: string;
  } | null;
}

interface Mitarbeiter {
  id: string;
  first_name: string;
  last_name: string;
}

export default function AdminAuftragsverwaltung() {
  const [auftraege, setAuftraege] = useState<Auftrag[]>([]);
  const [mitarbeiter, setMitarbeiter] = useState<Mitarbeiter[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newAssignedTo, setNewAssignedTo] = useState('');

  const subscriptionRef = useRef<any>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [auftraegeRes, mitarbeiterRes] = await Promise.all([
        supabase.from('tasks').select('*, profiles(first_name, last_name, email)').order('created_at', { ascending: false }),
        supabase.from('profiles').select('id, first_name, last_name').eq('role', 'mitarbeiter')
      ]);

      if (auftraegeRes.error) throw auftraegeRes.error;
      setAuftraege(auftraegeRes.data || []);

      if (mitarbeiterRes.error) throw mitarbeiterRes.error;
      setMitarbeiter(mitarbeiterRes.data || []);

    } catch (error) {
      toast.error("Fehler beim Laden der Daten.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    if (subscriptionRef.current) {
      supabase.removeChannel(subscriptionRef.current);
    }
    const channel = supabase
      .channel('public:tasks')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks' }, () => {
        toast.info("Auftragsliste wurde aktualisiert.");
        fetchData();
      })
      .subscribe();
    subscriptionRef.current = channel;

    return () => {
      if (subscriptionRef.current) {
        supabase.removeChannel(subscriptionRef.current);
      }
    };
  }, []);

  const handleCreateAuftrag = async () => {
    if (!newTitle || !newAssignedTo) {
      toast.error("Titel und zugewiesener Mitarbeiter sind erforderlich.");
      return;
    }
    const { error } = await supabase.from('tasks').insert({
      title: newTitle,
      description: newDescription,
      assigned_to: newAssignedTo,
      status: 'offen'
    });

    if (error) {
      toast.error("Fehler beim Erstellen des Auftrags.");
    } else {
      toast.success("Auftrag erfolgreich erstellt.");
      setNewTitle('');
      setNewDescription('');
      setNewAssignedTo('');
      setDialogOpen(false);
    }
  };

  const handleStatusChange = async (auftragId: string, newStatus: string) => {
    const { error } = await supabase.from('tasks').update({ status: newStatus }).eq('id', auftragId);
    if (error) toast.error("Status konnte nicht geändert werden.");
    else toast.success("Status aktualisiert.");
  };

  if (loading) {
    return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Auftragsverwaltung</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Neuer Auftrag
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-gray-800 text-white border-gray-700">
            <DialogHeader>
              <DialogTitle>Neuen Auftrag erstellen</DialogTitle>
              <DialogDescription>Füllen Sie die Details aus, um einen neuen Auftrag zu erstellen.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">Titel</Label>
                <Input id="title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="col-span-3 bg-gray-700 border-gray-600" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">Beschreibung</Label>
                <Textarea id="description" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} className="col-span-3 bg-gray-700 border-gray-600" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="assign" className="text-right">Zuweisen an</Label>
                <Select onValueChange={setNewAssignedTo} value={newAssignedTo}>
                  <SelectTrigger className="col-span-3 bg-gray-700 border-gray-600">
                    <SelectValue placeholder="Mitarbeiter auswählen" />
                  </SelectTrigger>
                  <SelectContent>
                    {mitarbeiter.map(m => (
                      <SelectItem key={m.id} value={m.id}>{m.first_name} {m.last_name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleCreateAuftrag}>Auftrag erstellen</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Card className="bg-gray-700 text-white shadow-lg">
        <CardHeader>
          <CardTitle>Alle Aufträge</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-600">
                <TableHead className="text-white">Titel</TableHead>
                <TableHead className="text-white">Mitarbeiter</TableHead>
                <TableHead className="text-white">Status</TableHead>
                <TableHead className="text-white">Erstellt am</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auftraege.map((auftrag) => (
                <TableRow key={auftrag.id} className="border-gray-600">
                  <TableCell>{auftrag.title}</TableCell>
                  <TableCell>{auftrag.profiles ? `${auftrag.profiles.first_name} ${auftrag.profiles.last_name}` : 'Nicht zugewiesen'}</TableCell>
                  <TableCell>
                    <Select value={auftrag.status} onValueChange={(newStatus) => handleStatusChange(auftrag.id, newStatus)}>
                      <SelectTrigger className="w-[180px] bg-gray-800 border-gray-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="offen">Offen</SelectItem>
                        <SelectItem value="in_bearbeitung">In Bearbeitung</SelectItem>
                        <SelectItem value="abgeschlossen">Abgeschlossen</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>{new Date(auftrag.created_at).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}