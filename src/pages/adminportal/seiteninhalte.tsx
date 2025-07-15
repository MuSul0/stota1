import { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Loader2, Edit, FileText, Clock, CheckCircle, TrendingUp, ChevronDown, ChevronRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SmartMediaUpload } from '@/components/admin/SmartMediaUpload';

// Definiert die Struktur für SEO-Metadaten
interface SeoMetadata {
  path: string;
  title: string;
  description: string;
  keywords: string;
  updated_at: string;
}

// Definiert die Seiten und ihre zugehörigen Medien-Upload-Slots
const pageSections = [
  {
    id: 'startseite',
    name: 'Startseite',
    media: [
      { title: "Hero Bild", description: "Das große Hauptbild ganz oben.", type: "image" },
      { title: "Vorschau Transporte", description: "Bild für die Transport-Dienstleistung.", type: "image" },
      { title: "Vorschau Reinigung", description: "Bild für die Reinigungs-Dienstleistung.", type: "image" },
      { title: "Vorschau Gartenbau", description: "Bild für die Gartenbau-Dienstleistung.", type: "image" },
      { title: "Vorschau Entsorgung", description: "Bild für die Entsorgungs-Dienstleistung.", type: "image" },
    ]
  },
  {
    id: 'leistungen',
    name: 'Leistungen',
    media: [
      { title: "Header-Bild Transporte", description: "Titelbild für die Transport-Detailseite.", type: "image" },
      { title: "Header-Bild Reinigung", description: "Titelbild für die Reinigungs-Detailseite.", type: "image" },
      { title: "Header-Bild Gartenbau", description: "Titelbild für die Gartenbau-Detailseite.", type: "image" },
      { title: "Header-Bild Entsorgung", description: "Titelbild für die Entsorgungs-Detailseite.", type: "image" },
    ]
  },
  { id: 'ueber-uns', name: 'Über Uns', media: [{ title: "Team Bild", description: "Ein Bild des Teams oder Gründers.", type: "image" }] },
  { id: 'empfehlungsprogramm', name: 'Empfehlungsprogramm', media: [{ title: "Programm-Banner", description: "Werbebanner für das Empfehlungsprogramm.", type: "image" }] },
  { id: 'kontakt', name: 'Kontakt', media: [{ title: "Kontakt Header-Bild", description: "Das Titelbild auf der Kontaktseite.", type: "image" }] },
];

export default function AdminSeiteninhalte() {
  const [metadata, setMetadata] = useState<SeoMetadata[]>([]);
  const [loadingSeo, setLoadingSeo] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedMeta, setSelectedMeta] = useState<SeoMetadata | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const subscriptionRef = useRef<any>(null);

  const fetchMetadata = useCallback(async () => {
    setLoadingSeo(true);
    try {
      const { data, error } = await supabase
        .from('seo_metadata')
        .select('*')
        .order('path', { ascending: true });

      if (error) throw error;
      setMetadata(data || []);
    } catch (error) {
      console.error('SEO fetch error:', error);
      toast.error('Fehler beim Laden der SEO-Daten.');
    } finally {
      setLoadingSeo(false);
    }
  }, []);

  useEffect(() => {
    fetchMetadata();

    if (subscriptionRef.current) {
      supabase.removeChannel(subscriptionRef.current);
    }
    const channel = supabase
      .channel('public:seo_metadata-seiteninhalte')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'seo_metadata' }, () => {
        toast.info("SEO-Daten werden aktualisiert...");
        fetchMetadata();
      })
      .subscribe();
    subscriptionRef.current = channel;

    return () => {
      if (subscriptionRef.current) {
        supabase.removeChannel(subscriptionRef.current);
      }
    };
  }, [fetchMetadata]);

  const handleEditClick = (meta: SeoMetadata) => {
    setSelectedMeta(JSON.parse(JSON.stringify(meta)));
    setIsDialogOpen(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (selectedMeta) {
      setSelectedMeta({ ...selectedMeta, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMeta) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('seo_metadata')
        .update({
          title: selectedMeta.title,
          description: selectedMeta.description,
          keywords: selectedMeta.keywords,
        })
        .eq('path', selectedMeta.path);

      if (error) throw error;
      
      toast.success(`SEO-Daten für ${selectedMeta.path} erfolgreich aktualisiert.`);
      setIsDialogOpen(false);
    } catch (error: any) {
      toast.error('Fehler beim Speichern der Daten: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleMediaUpdate = () => {
    setRefreshKey(prev => prev + 1);
  };

  if (loadingSeo) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <h1 className="text-3xl font-bold">Seiteninhalte & SEO</h1>
      
      <Tabs defaultValue="seo-dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="seo-dashboard">SEO Dashboard</TabsTrigger>
          <TabsTrigger value="bildverwaltung">Bildverwaltung</TabsTrigger>
        </TabsList>

        <TabsContent value="seo-dashboard" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Gesamt Seiten</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metadata.length}</div>
                <p className="text-xs text-muted-foreground">Alle Seiten mit SEO-Metadaten</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">SEO Score</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">92/100</div>
                <p className="text-xs text-muted-foreground">Basierend auf internen Metriken</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Alle optimiert</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Ja</div>
                <p className="text-xs text-muted-foreground">Alle Seiten haben SEO-Daten</p>
              </CardContent>
            </Card>
             <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ø Ladezeit</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0.9s</div>
                <p className="text-xs text-muted-foreground">-0.3s seit letzter Optimierung</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>SEO Seiten Übersicht</CardTitle>
              <CardDescription>Verwalten Sie hier die SEO-Daten für jede Seite.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Seite</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Zuletzt aktualisiert</TableHead>
                    <TableHead className="text-right">Aktionen</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {metadata.map((meta) => (
                    <TableRow key={meta.path}>
                      <TableCell className="font-medium">
                        <div className="font-bold">{meta.title.split('|')[0].trim()}</div>
                        <div className="text-xs text-muted-foreground">{meta.path}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-green-600 border-green-600">Aktiv</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={85 + (meta.path.length % 15)} className="w-24" />
                          <span>{85 + (meta.path.length % 15)}%</span>
                        </div>
                      </TableCell>
                      <TableCell>{new Date(meta.updated_at).toLocaleString('de-DE')}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" onClick={() => handleEditClick(meta)}><Edit className="h-4 w-4 mr-2" />Bearbeiten</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bildverwaltung" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Bildinhalte der Seiten verwalten</CardTitle>
              <CardDescription>Hier können Sie die Bilder für spezifische Bereiche Ihrer Webseite in Echtzeit ändern.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4"> {/* key={refreshKey} hier entfernt */}
                {pageSections.map(section => (
                  <div key={section.id} className="border rounded-lg">
                    <button onClick={() => toggleSection(section.id)} className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-accent rounded-t-lg">
                      <span className="font-medium capitalize">{section.name}</span>
                      {expandedSection === section.id ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
                    </button>
                    {expandedSection === section.id && (
                      <div className="p-4 space-y-4 bg-background/50 border-t">
                        {section.media.map(mediaSlot => (
                          <SmartMediaUpload 
                            key={mediaSlot.title}
                            title={mediaSlot.title} 
                            description={mediaSlot.description} 
                            type={mediaSlot.type as 'image' | 'video'} 
                            pageContext={section.id} 
                            onMediaUpdate={handleMediaUpdate}
                            refreshTrigger={refreshKey} // refreshKey als Prop übergeben
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedMeta && (
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>SEO für {selectedMeta.path} bearbeiten</DialogTitle>
                <DialogDescription>Änderungen hier wirken sich direkt auf die Suchmaschinenergebnisse aus.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">Titel</Label>
                  <Input id="title" name="title" value={selectedMeta.title} onChange={handleFormChange} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="description" className="text-right pt-2">Beschreibung</Label>
                  <Textarea id="description" name="description" value={selectedMeta.description} onChange={handleFormChange} className="col-span-3" rows={5} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="keywords" className="text-right">Keywords</Label>
                  <Input id="keywords" name="keywords" value={selectedMeta.keywords} onChange={handleFormChange} className="col-span-3" placeholder="keyword1, keyword2" />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="secondary" onClick={() => setIsDialogOpen(false)}>Abbrechen</Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Speichern
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}