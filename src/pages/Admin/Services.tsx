import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '@/components/SessionProvider';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { PlusCircle, Edit, Trash2, Save, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import AdminDashboard from './index'; // Import the AdminDashboard for layout

interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
  image_url: string;
  price: string;
  popular: boolean;
}

const AdminServices = () => {
  const { session, isAdmin, loading } = useSession();
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>([]);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (!loading && (!session || !isAdmin)) {
      navigate('/login');
    } else if (session && isAdmin) {
      fetchServices();
    }
  }, [session, isAdmin, loading, navigate]);

  const fetchServices = async () => {
    const { data, error } = await supabase.from('services').select('*');
    if (error) {
      toast.error('Fehler beim Laden der Services: ' + error.message);
    } else {
      setServices(data as Service[]);
    }
  };

  const handleAddService = () => {
    setEditingService({
      id: '',
      icon: '',
      title: '',
      description: '',
      features: [],
      image_url: '',
      price: '',
      popular: false,
    });
    setIsDialogOpen(true);
  };

  const handleEditService = (service: Service) => {
    setEditingService({ ...service });
    setIsDialogOpen(true);
  };

  const handleDeleteService = async (id: string) => {
    if (window.confirm('Sind Sie sicher, dass Sie diesen Service löschen möchten?')) {
      const { error } = await supabase.from('services').delete().eq('id', id);
      if (error) {
        toast.error('Fehler beim Löschen des Services: ' + error.message);
      } else {
        toast.success('Service erfolgreich gelöscht.');
        fetchServices();
      }
    }
  };

  const handleSaveService = async () => {
    if (!editingService) return;

    const { id, ...dataToSave } = editingService;
    dataToSave.features = dataToSave.features.map(f => f.trim()).filter(f => f.length > 0); // Clean features array

    if (id) {
      // Update existing service
      const { error } = await supabase.from('services').update(dataToSave).eq('id', id);
      if (error) {
        toast.error('Fehler beim Aktualisieren des Services: ' + error.message);
      } else {
        toast.success('Service erfolgreich aktualisiert.');
        setIsDialogOpen(false);
        fetchServices();
      }
    } else {
      // Add new service
      const { error } = await supabase.from('services').insert(dataToSave);
      if (error) {
        toast.error('Fehler beim Hinzufügen des Services: ' + error.message);
      } else {
        toast.success('Service erfolgreich hinzugefügt.');
        setIsDialogOpen(false);
        fetchServices();
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setEditingService(prev => ({ ...prev!, [id]: value }));
  };

  const handleFeaturesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const featuresArray = e.target.value.split('\n');
    setEditingService(prev => ({ ...prev!, features: featuresArray }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setEditingService(prev => ({ ...prev!, popular: checked }));
  };

  if (loading || !session || !isAdmin) {
    return <AdminDashboard />; // Show loading or redirect
  }

  return (
    <AdminDashboard> {/* Use AdminDashboard as layout wrapper */}
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Services verwalten</h1>
          <Button onClick={handleAddService}>
            <PlusCircle className="h-5 w-5 mr-2" />
            Neuen Service hinzufügen
          </Button>
        </div>

        <Card>
          <CardContent className="p-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Titel</TableHead>
                  <TableHead>Icon</TableHead>
                  <TableHead>Preis</TableHead>
                  <TableHead>Beliebt</TableHead>
                  <TableHead className="text-right">Aktionen</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell className="font-medium">{service.title}</TableCell>
                    <TableCell>{service.icon}</TableCell>
                    <TableCell>{service.price}</TableCell>
                    <TableCell>{service.popular ? 'Ja' : 'Nein'}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => handleEditService(service)} className="mr-2">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDeleteService(service.id)}>
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
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{editingService?.id ? 'Service bearbeiten' : 'Neuen Service hinzufügen'}</DialogTitle>
            </DialogHeader>
            {editingService && (
              <form className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">Titel</Label>
                  <Input id="title" value={editingService.title} onChange={handleInputChange} required className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="icon" className="text-right">Icon (Lucide Name)</Label>
                  <Input id="icon" value={editingService.icon} onChange={handleInputChange} placeholder="z.B. Sparkles, Truck" required className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">Beschreibung</Label>
                  <Textarea id="description" value={editingService.description} onChange={handleInputChange} required className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="features" className="text-right">Features (pro Zeile)</Label>
                  <Textarea id="features" value={editingService.features.join('\n')} onChange={handleFeaturesChange} placeholder="Feature 1&#10;Feature 2" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="image_url" className="text-right">Bild URL</Label>
                  <Input id="image_url" value={editingService.image_url} onChange={handleInputChange} required className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="price" className="text-right">Preis</Label>
                  <Input id="price" value={editingService.price} onChange={handleInputChange} required className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="popular" className="text-right">Beliebt</Label>
                  <Checkbox id="popular" checked={editingService.popular} onCheckedChange={handleCheckboxChange} className="col-span-3" />
                </div>
              </form>
            )}
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
    </AdminDashboard>
  );
};

export default AdminServices;