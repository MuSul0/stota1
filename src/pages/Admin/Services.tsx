import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Edit, Trash2, Save, XCircle, Search } from 'lucide-react';
import { toast } from 'sonner';

interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  category: string;
  is_active: boolean;
  created_at: string;
}

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    const filtered = services.filter(service =>
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredServices(filtered);
  }, [searchTerm, services]);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setServices(data || []);
      setFilteredServices(data || []);
    } catch (error) {
      toast.error('Fehler beim Laden der Services');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddService = () => {
    setEditingService({
      id: '',
      title: '',
      description: '',
      price: '',
      duration: '1 Stunde',
      category: 'reinigung',
      is_active: true,
      created_at: new Date().toISOString()
    });
    setIsDialogOpen(true);
  };

  const handleEditService = (service: Service) => {
    setEditingService(service);
    setIsDialogOpen(true);
  };

  const handleDeleteService = async (id: string) => {
    if (!window.confirm('Möchten Sie diesen Service wirklich löschen?')) return;
    
    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast.success('Service erfolgreich gelöscht');
      fetchServices();
    } catch (error) {
      toast.error('Fehler beim Löschen des Services');
      console.error(error);
    }
  };

  const handleSaveService = async () => {
    if (!editingService) return;

    try {
      if (editingService.id) {
        // Update existing service
        const { error } = await supabase
          .from('services')
          .update(editingService)
          .eq('id', editingService.id);

        if (error) throw error;
        toast.success('Service erfolgreich aktualisiert');
      } else {
        // Create new service
        const { error } = await supabase
          .from('services')
          .insert(editingService);

        if (error) throw error;
        toast.success('Service erfolgreich erstellt');
      }
      
      setIsDialogOpen(false);
      fetchServices();
    } catch (error) {
      toast.error('Fehler beim Speichern des Services');
      console.error(error);
    }
  };

  const toggleServiceStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('services')
        .update({ is_active: !currentStatus })
        .eq('id', id);

      if (error) throw error;
      
      toast.success(`Service ${currentStatus ? 'deaktiviert' : 'aktiviert'}`);
      fetchServices();
    } catch (error) {
      toast.error('Fehler beim Ändern des Status');
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold">Services</h1>
        <div className="flex w-full md:w-auto gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Services suchen..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button onClick={handleAddService}>
            <PlusCircle className="h-5 w-5 mr-2" />
            Neuer Service
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
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
              {filteredServices.map((service) => (
                <TableRow key={service.id}>
                  <TableCell className="font-medium">{service.title}</TableCell>
                  <TableCell>{service.category}</TableCell>
                  <TableCell>{service.price} €</TableCell>
                  <TableCell>{service.duration}</TableCell>
                  <TableCell>
                    <Badge variant={service.is_active ? 'default' : 'secondary'}>
                      {service.is_active ? 'Aktiv' : 'Inaktiv'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleServiceStatus(service.id, service.is_active)}
                    >
                      {service.is_active ? 'Deaktivieren' : 'Aktivieren'}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEditService(service)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteService(service.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
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
            <DialogTitle>
              {editingService?.id ? 'Service bearbeiten' : 'Neuen Service erstellen'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Titel*
              </Label>
              <Input
                id="title"
                value={editingService?.title || ''}
                onChange={(e) => setEditingService(prev => ({
                  ...prev!,
                  title: e.target.value
                }))}
                className="col-span-3"
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Beschreibung*
              </Label>
              <Textarea
                id="description"
                value={editingService?.description || ''}
                onChange={(e) => setEditingService(prev => ({
                  ...prev!,
                  description: e.target.value
                }))}
                className="col-span-3"
                rows={3}
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Kategorie*
              </Label>
              <select
                id="category"
                value={editingService?.category || 'reinigung'}
                onChange={(e) => setEditingService(prev => ({
                  ...prev!,
                  category: e.target.value
                }))}
                className="col-span-3 border rounded-md p-2"
                required
              >
                <option value="reinigung">Reinigung</option>
                <option value="transport">Transport</option>
                <option value="umzug">Umzug</option>
                <option value="sonstiges">Sonstiges</option>
              </select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Preis*
              </Label>
              <Input
                id="price"
                type="number"
                value={editingService?.price || ''}
                onChange={(e) => setEditingService(prev => ({
                  ...prev!,
                  price: e.target.value
                }))}
                className="col-span-3"
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="duration" className="text-right">
                Dauer*
              </Label>
              <Input
                id="duration"
                value={editingService?.duration || ''}
                onChange={(e) => setEditingService(prev => ({
                  ...prev!,
                  duration: e.target.value
                }))}
                className="col-span-3"
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="is_active" className="text-right">
                Aktiv
              </Label>
              <Checkbox
                id="is_active"
                checked={editingService?.is_active || false}
                onCheckedChange={(checked) => setEditingService(prev => ({
                  ...prev!,
                  is_active: !!checked
                }))}
                className="col-span-3"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              <XCircle className="h-4 w-4 mr-2" />
              Abbrechen
            </Button>
            <Button onClick={handleSaveService}>
              <Save className="h-4 w-4 mr-2" />
              Speichern
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}