import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { PlusCircle, Edit, Trash2, Save, XCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  category: string;
  is_active: boolean;
  created_at: string;
}

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [editingService, setEditingService] = useState<Partial<Service> | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const subscriptionRef = useRef<any>(null);

  useEffect(() => {
    fetchServices();
    setupRealtimeSubscription();
    
    return () => {
      if (subscriptionRef.current) {
        supabase.removeChannel(subscriptionRef.current);
        subscriptionRef.current = null;
      }
    };
  }, []);

  const fetchServices = async () => {
    setLoadingData(true);
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setServices(data.map(s => ({...s, price: Number(s.price) })) || []);
    } catch (error) {
      toast.error('Fehler beim Laden der Services');
      console.error(error);
    } finally {
      setLoadingData(false);
    }
  };

  const setupRealtimeSubscription = () => {
    if (subscriptionRef.current) {
      supabase.removeChannel(subscriptionRef.current);
    }
    const channel = supabase
      .channel('public:services')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'services' }, () => {
        fetchServices();
      })
      .subscribe();
    subscriptionRef.current = channel;
  };

  const handleAddService = () => {
    setEditingService({
      title: '',
      description: '',
      price: 0,
      duration: '1 Stunde',
      category: 'reinigung',
      is_active: true,
    });
    setIsDialogOpen(true);
  };

  const handleEditService = (service: Service) => {
    setEditingService(service);
    setIsDialogOpen(true);
  };

  const handleDeleteService = async (id: string) => {
    try {
      const { error } = await supabase.from('services').delete().eq('id', id);
      if (error) throw error;
      toast.success('Service erfolgreich gelöscht');
    } catch (error) {
      toast.error('Fehler beim Löschen des Services');
      console.error(error);
    }
  };

  const handleSaveService = async () => {
    if (!editingService) return;

    const serviceData = {
      ...editingService,
      price: Number(editingService.price) || 0,
    };

    try {
      if (editingService.id) {
        const { error } = await supabase.from('services').update(serviceData).eq('id', editingService.id);
        if (error) throw error;
        toast.success('Service erfolgreich aktualisiert');
      } else {
        const { error } = await supabase.from('services').insert(serviceData);
        if (error) throw error;
        toast.success('Service erfolgreich erstellt');
      }
      
      setIsDialogOpen(false);
      setEditingService(null);
    } catch (error) {
      toast.error('Fehler beim Speichern des Services');
      console.error(error);
    }
  };

  const toggleServiceStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase.from('services').update({ is_active: !currentStatus }).eq('id', id);
      if (error) throw error;
      toast.success(`Service ${currentStatus ? 'deaktiviert' : 'aktiviert'}`);
    } catch (error) {
      toast.error('Fehler beim Ändern des Status');
      console.error(error);
    }
  };

  if (loadingData) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <main className="flex-grow container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h1 className="text-3xl font-bold">Services</h1>
          <Button onClick={handleAddService} className="flex items-center gap-2">
            <PlusCircle className="h-5 w-5" />
            Neuer Service
          </Button>
        </div>

        <Card>
          <CardContent className="p-0 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Titel</TableHead>
                  <TableHead>Kategorie</TableHead>
                  <TableHead>Preis</TableHead>
                  <TableHead>Dauer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aktionen</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell className="font-medium">{service.title}</TableCell>
                    <TableCell>{service.category}</TableCell>
                    <TableCell>{service.price.toFixed(2)} €</TableCell>
                    <TableCell>{service.duration}</TableCell>
                    <TableCell>
                      <Badge variant={service.is_active ? 'default' : 'secondary'}>
                        {service.is_active ? 'Aktiv' : 'Inaktiv'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button size="sm" variant="outline" onClick={() => toggleServiceStatus(service.id, service.is_active)}>
                        {service.is_active ? 'Deaktivieren' : 'Aktivieren'}
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => handleEditService(service)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" variant="destructive"><Trash2 className="h-4 w-4" /></Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Sind Sie sicher?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Diese Aktion kann nicht rückgängig gemacht werden. Dadurch wird der Service dauerhaft gelöscht.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Abbrechen</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteService(service.id)}>Löschen</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[650px]">
            <DialogHeader>
              <DialogTitle>{editingService?.id ? 'Service bearbeiten' : 'Neuen Service erstellen'}</DialogTitle>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">Titel*</Label>
                <Input id="title" value={editingService?.title || ''} onChange={(e) => setEditingService(prev => ({ ...prev, title: e.target.value }))} className="col-span-3" required />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">Beschreibung*</Label>
                <Textarea id="description" value={editingService?.description || ''} onChange={(e) => setEditingService(prev => ({ ...prev, description: e.target.value }))} className="col-span-3" rows={3} required />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">Kategorie*</Label>
                <Select value={editingService?.category || 'reinigung'} onValueChange={(value) => setEditingService(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger className="col-span-3"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="reinigung">Reinigung</SelectItem>
                    <SelectItem value="transport">Transport</SelectItem>
                    <SelectItem value="umzug">Umzug</SelectItem>
                    <SelectItem value="sonstiges">Sonstiges</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">Preis*</Label>
                <Input id="price" type="number" value={editingService?.price || ''} onChange={(e) => setEditingService(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))} className="col-span-3" required />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="duration" className="text-right">Dauer*</Label>
                <Input id="duration" value={editingService?.duration || ''} onChange={(e) => setEditingService(prev => ({ ...prev, duration: e.target.value }))} className="col-span-3" required />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="is_active" className="text-right">Aktiv</Label>
                <Checkbox id="is_active" checked={editingService?.is_active} onCheckedChange={(checked) => setEditingService(prev => ({ ...prev, is_active: !!checked }))} />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                <XCircle className="h-4 w-4 mr-2" /> Abbrechen
              </Button>
              <Button onClick={handleSaveService}>
                <Save className="h-4 w-4 mr-2" /> Speichern
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}