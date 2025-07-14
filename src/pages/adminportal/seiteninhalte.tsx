import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Loader2, Edit, FileText, CheckCircle, TrendingUp, ChevronDown, ChevronRight, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SmartMediaUpload } from '@/components/admin/SmartMediaUpload';

interface SeoMetadata {
  path: string;
  title: string;
  description: string;
  keywords: string;
  updated_at: string;
}

interface SeoStats {
  totalPages: number;
  missingTitles: number;
  missingDescriptions: number;
  optimizationPercentage: number;
}

export default function AdminSeiteninhalte() {
  const [metadata, setMetadata] = useState<SeoMetadata[]>([]);
  const [seoStats, setSeoStats] = useState<SeoStats>({ totalPages: 0, missingTitles: 0, missingDescriptions: 0, optimizationPercentage: 0 });
  const [loadingSeo, setLoadingSeo] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedMeta, setSelectedMeta] = useState<SeoMetadata | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const subscriptionRef = useRef<any>(null);

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
  }, []);

  useEffect(() => {
    if (metadata.length > 0) {
      const missingTitles = metadata.filter(m => !m.title).length;
      const missingDescriptions = metadata.filter(m => !m.description).length;
      
      const totalFields = metadata.length * 2; // title and description
      const missingFields = missingTitles + missingDescriptions;
      const filledFields = totalFields - missingFields;
      const optimizationPercentage = totalFields > 0 ? Math.round((filledFields / totalFields) * 100) : 0;

      setSeoStats({
        totalPages: metadata.length,
        missingTitles,
        missingDescriptions,
        optimizationPercentage,
      });
    }
  }, [metadata]);

  const fetchMetadata = async () => {
    try {
      setLoadingSeo(true);
      const { data, error } = await supabase
        .from('seo_metadata')
        .select('*')
        .order('path', { ascending: true });

      if (error) {
        console.error('SEO fetch error:', error);
        toast.error('Fehler beim Laden der SEO-Daten.');
      } else {
        setMetadata(data || []);
      }
    } catch (error) {
      console.error('SEO fetch error:', error);
      toast.error('Fehler beim Laden der SEO-Daten.');
    } finally {
      setLoadingSeo(false);
    }
  };

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
          updated_at: new Date().toISOString(),
        })
        .eq('path', selectedMeta.path);

      if (error) {
        toast.error('Fehler beim Speichern der Daten.');
      } else {
        toast.success(`SEO-Daten für ${selectedMeta.path} erfolgreich aktualisiert.`);
        setIsDialogOpen(false);
        fetchMetadata();
      }
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Fehler beim Speichern der Daten.');
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
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-white mx-auto mb-4" />
          <p className="text-white">Lade Daten...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <main className="flex-grow container mx-auto px-4 sm:px-6 py-12 max-w-7xl">
        <h1 className="text-3xl font-bold mb-8 text-white">Seiteninhalte & SEO</h1>
        
        <Tabs defaultValue="seo-dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-800">
            <TabsTrigger value="seo-dashboard" className="text-white data-[state=active]:bg-gray-700">SEO Dashboard</TabsTrigger>
            <TabsTrigger value="bildverwaltung" className="text-white data-[state=active]:bg-gray-700">Bildverwaltung</TabsTrigger>
          </TabsList>

          <TabsContent value="seo-dashboard" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Gesamt Seiten</CardTitle>
                  <FileText className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{seoStats.totalPages}</div>
                  <p className="text-xs text-gray-400">Alle Seiten mit SEO-Metadaten</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Optimierungsgrad</CardTitle>
                  <TrendingUp className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{seoStats.optimizationPercentage}%</div>
                  <p className="text-xs text-gray-400">Vollständigkeit der SEO-Daten</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Fehlende Titel</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-yellow-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{seoStats.missingTitles}</div>
                  <p className="text-xs text-gray-400">Seiten ohne Meta-Titel</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Fehlende Beschreibungen</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-yellow-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{seoStats.missingDescriptions}</div>
                  <p className="text-xs text-gray-400">Seiten ohne Meta-Beschreibung</p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">SEO Seiten Übersicht</CardTitle>
                <CardDescription className="text-gray-400">Verwalten Sie hier die SEO-Daten für jede Seite.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-700 hover:bg-gray-700/50">
                      <TableHead className="text-white">Seite</TableHead>
                      <TableHead className="text-white">SEO-Status</TableHead>
                      <TableHead className="text-white">Zuletzt aktualisiert</TableHead>
                      <TableHead className="text-right text-white">Aktionen</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {metadata.map((meta) => {
                      const isOptimized = meta.title && meta.description;
                      return (
                        <TableRow key={meta.path} className="border-gray-700 hover:bg-gray-700/50">
                          <TableCell className="font-medium">
                            <div className="font-bold text-white">{meta.title ? meta.title.split('|')[0].trim() : meta.path}</div>
                            <div className="text-xs text-gray-400">{meta.path}</div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={isOptimized ? 'default' : 'destructive'} className={isOptimized ? 'bg-green-600/20 text-green-400 border-green-500' : ''}>
                              {isOptimized ? 'Optimiert' : 'Unvollständig'}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-white">{new Date(meta.updated_at).toLocaleString('de-DE')}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm" onClick={() => handleEditClick(meta)}><Edit className="h-4 w-4 mr-2" />Bearbeiten</Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bildverwaltung" className="mt-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Bildinhalte der Seiten verwalten</CardTitle>
                <CardDescription className="text-gray-400">Hier können Sie die Bilder für spezifische Bereiche Ihrer Webseite in Echtzeit ändern.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4" key={refreshKey}>
                  {['startseite', 'leistungen', 'ueber-uns', 'empfehlungsprogramm', 'kontakt'].map(section => (
                    <div key={section} className="border border-gray-700 rounded-lg">
                      <button onClick={() => toggleSection(section)} className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-700/50 rounded-t-lg">
                        <span className="text-white font-medium capitalize">{section.replace('-', ' ')}</span>
                        {expandedSection === section ? <ChevronDown className="h-4 w-4 text-gray-400" /> : <ChevronRight className="h-4 w-4 text-gray-400" />}
                      </button>
                      {expandedSection === section && (
                        <div className="p-4 space-y-4 bg-gray-900/50 border-t border-gray-700">
                          {section === 'startseite' && <>
                            <SmartMediaUpload title="Hero Bild" description="Das große Hauptbild ganz oben." type="image" pageContext="startseite" onMediaUpdate={handleMediaUpdate} />
                            <SmartMediaUpload title="Vorschau Transporte" description="Bild für die Transport-Dienstleistung." type="image" pageContext="startseite" onMediaUpdate={handleMediaUpdate} />
                            <SmartMediaUpload title="Vorschau Reinigung" description="Bild für die Reinigungs-Dienstleistung." type="image" pageContext="startseite" onMediaUpdate={handleMediaUpdate} />
                            <SmartMediaUpload title="Vorschau Gartenbau" description="Bild für die Gartenbau-Dienstleistung." type="image" pageContext="startseite" onMediaUpdate={handleMediaUpdate} />
                            <SmartMediaUpload title="Vorschau Entsorgung" description="Bild für die Entsorgungs-Dienstleistung." type="image" pageContext="startseite" onMediaUpdate={handleMediaUpdate} />
                          </>}
                          {section === 'leistungen' && <>
                            <SmartMediaUpload title="Header-Bild Transporte" description="Titelbild für die Transport-Detailseite." type="image" pageContext="leistungen" onMediaUpdate={handleMediaUpdate} />
                            <SmartMediaUpload title="Header-Bild Reinigung" description="Titelbild für die Reinigungs-Detailseite." type="image" pageContext="leistungen" onMediaUpdate={handleMediaUpdate} />
                            <SmartMediaUpload title="Header-Bild Gartenbau" description="Titelbild für die Gartenbau-Detailseite." type="image" pageContext="leistungen" onMediaUpdate={handleMediaUpdate} />
                            <SmartMediaUpload title="Header-Bild Entsorgung" description="Titelbild für die Entsorgungs-Detailseite." type="image" pageContext="leistungen" onMediaUpdate={handleMediaUpdate} />
                          </>}
                          {section === 'ueber-uns' && <SmartMediaUpload title="Team Bild" description="Ein Bild des Teams oder Gründers." type="image" pageContext="ueber-uns" onMediaUpdate={handleMediaUpdate} />}
                          {section === 'empfehlungsprogramm' && <SmartMediaUpload title="Programm-Banner" description="Werbebanner für das Empfehlungsprogramm." type="image" pageContext="empfehlungsprogramm" onMediaUpdate={handleMediaUpdate} />}
                          {section === 'kontakt' && <SmartMediaUpload title="Kontakt Header-Bild" description="Das Titelbild auf der Kontaktseite." type="image" pageContext="kontakt" onMediaUpdate={handleMediaUpdate} />}
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
          <DialogContent className="sm:max-w-[600px] bg-gray-800 border-gray-700 text-white">
            {selectedMeta && (
              <form onSubmit={handleSubmit}>
                <DialogHeader>
                  <DialogTitle className="text-white">SEO für {selectedMeta.path} bearbeiten</DialogTitle>
                  <DialogDescription className="text-gray-400">Änderungen hier wirken sich direkt auf die Suchmaschinenergebnisse aus.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right text-white">Titel</Label>
                    <Input id="title" name="title" value={selectedMeta.title} onChange={handleFormChange} className="col-span-3 bg-gray-700 border-gray-600 text-white" />
                  </div>
                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label htmlFor="description" className="text-right pt-2 text-white">Beschreibung</Label>
                    <Textarea id="description" name="description" value={selectedMeta.description} onChange={handleFormChange} className="col-span-3 bg-gray-700 border-gray-600 text-white" rows={5} />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="keywords" className="text-right text-white">Keywords</Label>
                    <Input id="keywords" name="keywords" value={selectedMeta.keywords} onChange={handleFormChange} className="col-span-3 bg-gray-700 border-gray-600 text-white" placeholder="keyword1, keyword2" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={isSubmitting}>{isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Speichern</Button>
                </DialogFooter>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}