import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Loader2, Edit } from 'lucide-react';

interface SeoMetadata {
  path: string;
  title: string;
  description: string;
  keywords: string;
}

const SeoEditor = () => {
  const [metadata, setMetadata] = useState<SeoMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedMeta, setSelectedMeta] = useState<SeoMetadata | null>(null);

  useEffect(() => {
    fetchMetadata();
  }, []);

  const fetchMetadata = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('seo_metadata')
      .select('*')
      .order('path', { ascending: true });

    if (error) {
      toast.error('Fehler beim Laden der SEO-Daten.');
      console.error(error);
    } else {
      setMetadata(data || []);
    }
    setLoading(false);
  };

  const handleEditClick = (meta: SeoMetadata) => {
    setSelectedMeta(JSON.parse(JSON.stringify(meta))); // Deep copy to avoid state mutation issues
    setIsDialogOpen(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (selectedMeta) {
      setSelectedMeta({
        ...selectedMeta,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMeta) return;

    setIsSubmitting(true);
    const { error } = await supabase
      .from('seo_metadata')
      .update({
        title: selectedMeta.title,
        description: selectedMeta.description,
        keywords: selectedMeta.keywords,
      })
      .eq('path', selectedMeta.path);

    if (error) {
      toast.error('Fehler beim Speichern der Daten.');
      console.error(error);
    } else {
      toast.success(`SEO-Daten für ${selectedMeta.path} erfolgreich aktualisiert.`);
      setIsDialogOpen(false);
      fetchMetadata(); // Refresh data
    }
    setIsSubmitting(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
      </div>
    );
  }

  return (
    <main className="flex-grow container mx-auto px-6 py-12 max-w-7xl">
      <Card>
        <CardHeader>
          <CardTitle>SEO-Inhalte verwalten</CardTitle>
          <CardDescription>
            Hier können Sie die SEO-Titel, Beschreibungen und Keywords für jede Seite Ihrer Website bearbeiten.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pfad</TableHead>
                <TableHead>Titel</TableHead>
                <TableHead className="text-right">Aktion</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {metadata.map((meta) => (
                <TableRow key={meta.path}>
                  <TableCell className="font-medium">{meta.path}</TableCell>
                  <TableCell>{meta.title}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" onClick={() => handleEditClick(meta)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Bearbeiten
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
          {selectedMeta && (
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>SEO für {selectedMeta.path} bearbeiten</DialogTitle>
                <DialogDescription>
                  Änderungen hier wirken sich direkt auf die Suchmaschinenergebnisse aus.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Titel
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    value={selectedMeta.title}
                    onChange={handleFormChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="description" className="text-right pt-2">
                    Beschreibung
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={selectedMeta.description}
                    onChange={handleFormChange}
                    className="col-span-3"
                    rows={5}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="keywords" className="text-right">
                    Keywords
                  </Label>
                  <Input
                    id="keywords"
                    name="keywords"
                    value={selectedMeta.keywords}
                    onChange={handleFormChange}
                    className="col-span-3"
                    placeholder="keyword1, keyword2, keyword3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Speichern
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default SeoEditor;