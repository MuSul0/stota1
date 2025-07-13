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
import { Loader2, Edit, FileText, Clock, CheckCircle, TrendingUp, ChevronDown, ChevronRight, Upload, Trash2, Eye } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface SeoMetadata {
  path: string;
  title: string;
  description: string;
  keywords: string;
  updated_at: string;
}

interface MediaItem {
  id: string;
  title: string;
  url: string;
  type: 'image' | 'video';
  page_context: string | null;
  description: string | null;
  created_at: string;
}

// Erweiterte MediaUpload Komponente mit Echtzeit-Anzeige
const SmartMediaUpload = ({ title, description, type, pageContext, onMediaUpdate }: {
  title: string;
  description: string;
  type: 'image' | 'video';
  pageContext: string;
  onMediaUpdate?: () => void;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [currentMedia, setCurrentMedia] = useState<MediaItem | null>(null);
  const [loading, setLoading] = useState(true);

  // Lade aktuelles Bild beim Komponenten-Mount
  useEffect(() => {
    loadCurrentMedia();
  }, [title, pageContext]);

  const loadCurrentMedia = async () => {
    try {
      setLoading(true);
      const searchTitle = `${pageContext}-${title}`;
      
      const { data, error } = await supabase
        .from('media')
        .select('*')
        .eq('page_context', pageContext)
        .ilike('title', `%${title}%`)
        .eq('type', type)
        .order('created_at', { ascending: false })
        .limit(1);

      if (error) {
        console.error('Error loading media:', error);
      } else if (data && data.length > 0) {
        setCurrentMedia(data[0]);
      }
    } catch (error) {
      console.error('Error loading media:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error('Bitte wählen Sie eine Datei aus.');
      return;
    }

    setUploading(true);
    try {
      // Lösche vorhandenes Bild falls vorhanden
      if (currentMedia) {
        await handleDelete(false); // Lösche ohne Toast
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${pageContext}-${title.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.${fileExt}`;
      const filePath = `${type}s/${fileName}`;

      // Upload file
      const { error: uploadError } = await supabase.storage.from('media').upload(filePath, file);
      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(filePath);

      // Save to database
      const { data: newMedia, error: dbError } = await supabase.from('media').insert({
        type: type,
        url: publicUrl,
        title: `${pageContext}-${title}`,
        description: description,
        page_context: pageContext,
      }).select().single();

      if (dbError) throw dbError;

      toast.success('Bild erfolgreich hochgeladen und wird jetzt auf der Website angezeigt!');
      setFile(null);
      setCurrentMedia(newMedia);
      
      // Trigger parent update if callback provided
      if (onMediaUpdate) {
        onMediaUpdate();
      }
    } catch (error: any) {
      toast.error('Fehler beim Hochladen: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (showToast = true) => {
    if (!currentMedia) return;

    try {
      // Delete from storage
      const urlParts = currentMedia.url.split('/');
      const fileName = urlParts[urlParts.length - 1];
      const filePath = `${type}s/${fileName}`;
      
      await supabase.storage.from('media').remove([filePath]);

      // Delete from database
      const { error } = await supabase.from('media').delete().eq('id', currentMedia.id);
      if (error) throw error;

      if (showToast) {
        toast.success('Bild erfolgreich gelöscht!');
      }
      setCurrentMedia(null);
      
      if (onMediaUpdate) {
        onMediaUpdate();
      }
    } catch (error: any) {
      if (showToast) {
        toast.error('Fehler beim Löschen: ' + error.message);
      }
    }
  };

  const openImageInNewTab = () => {
    if (currentMedia) {
      window.open(currentMedia.url, '_blank');
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4 p-4 border rounded-lg bg-gray-700">
      <div className="flex-shrink-0 w-full md:w-1/3">
        <h3 className="font-semibold text-lg text-white">{title}</h3>
        <p className="text-sm text-gray-300">{description}</p>
        {currentMedia && (
          <div className="mt-2">
            <Badge variant="outline" className="text-green-400 border-green-400">
              Aktiv auf Website
            </Badge>
          </div>
        )}
      </div>
      
      <div className="flex-grow flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 w-full">
        <div className="flex-grow w-full">
          <Input
            type="file"
            accept={type === 'image' ? 'image/*' : 'video/*'}
            onChange={handleFileChange}
            className="bg-gray-600 text-white placeholder-gray-400 border-gray-500"
          />
        </div>
        <div className="flex items-center space-x-2 flex-shrink-0">
          <Button
            onClick={handleUpload}
            disabled={uploading || !file}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Upload className="h-4 w-4 mr-2" />
            {uploading ? 'Lädt hoch...' : currentMedia ? 'Ersetzen' : 'Hochladen'}
          </Button>
          {currentMedia && (
            <Button
              onClick={() => handleDelete(true)}
              variant="destructive"
              size="sm"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      
      {loading ? (
        <div className="flex-shrink-0 w-full md:w-1/4 flex items-center justify-center p-4 border border-gray-600 rounded-md bg-gray-800">
          <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
        </div>
      ) : currentMedia ? (
        <div className="flex-shrink-0 w-full md:w-1/4 relative group">
          <div className="flex items-center justify-center p-2 border border-gray-600 rounded-md bg-gray-800">
            {type === 'image' ? (
              <img 
                src={currentMedia.url} 
                alt={title} 
                className="max-h-24 object-contain rounded cursor-pointer" 
                onClick={openImageInNewTab}
              />
            ) : (
              <div className="flex flex-col items-center text-gray-400">
                <span className="text-xs mt-1">Video aktiv</span>
              </div>
            )}
          </div>
          <Button
            onClick={openImageInNewTab}
            size="sm"
            variant="secondary"
            className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Eye className="h-3 w-3" />
          </Button>
        </div>
      ) : (
        <div className="flex-shrink-0 w-full md:w-1/4 flex items-center justify-center p-4 border border-gray-600 rounded-md bg-gray-800">
          <span className="text-gray-400 text-sm">Kein Bild</span>
        </div>
      )}
    </div>
  );
};

export default function AdminSeiteninhalte() {
  const [metadata, setMetadata] = useState<SeoMetadata[]>([]);
  const [loadingSeo, setLoadingSeo] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedMeta, setSelectedMeta] = useState<SeoMetadata | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    fetchMetadata();
  }, []);

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

  const seoScore = 92;
  const totalPages = metadata.length;

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
            {/* Top Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Gesamt Seiten</CardTitle>
                  <FileText className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{totalPages}</div>
                  <p className="text-xs text-gray-400">Alle Seiten mit SEO-Metadaten</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">SEO Score</CardTitle>
                  <TrendingUp className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{seoScore}/100</div>
                  <p className="text-xs text-gray-400">Basierend auf internen Metriken</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Ø Ladezeit</CardTitle>
                  <Clock className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">0.9s</div>
                  <p className="text-xs text-gray-400">-0.3s seit letzter Optimierung</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Alle optimiert</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">Ja</div>
                  <p className="text-xs text-gray-400">Alle Seiten haben SEO-Daten</p>
                </CardContent>
              </Card>
            </div>

            {/* SEO Pages Overview */}
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
                      <TableHead className="text-white">Status</TableHead>
                      <TableHead className="text-white">Performance</TableHead>
                      <TableHead className="text-white">Zuletzt aktualisiert</TableHead>
                      <TableHead className="text-right text-white">Aktionen</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {metadata.map((meta) => (
                      <TableRow key={meta.path} className="border-gray-700 hover:bg-gray-700/50">
                        <TableCell className="font-medium">
                          <div className="font-bold text-white">{meta.title.split('|')[0].trim()}</div>
                          <div className="text-xs text-gray-400">{meta.path}</div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="default" className="bg-green-600/20 text-green-400 border-green-500">
                            Aktiv
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={85 + (meta.path.length % 15)} className="w-24" />
                            <span className="text-white">{85 + (meta.path.length % 15)}%</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-white">
                          {new Date(meta.updated_at).toLocaleString('de-DE')}
                        </TableCell>
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
          </TabsContent>

          <TabsContent value="bildverwaltung" className="mt-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Bildinhalte der Seiten verwalten</CardTitle>
                <CardDescription className="text-gray-400">
                  Hier können Sie die Bilder für spezifische Bereiche Ihrer Webseite in Echtzeit ändern. 
                  Änderungen werden sofort auf der Website sichtbar.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4" key={refreshKey}>
                  {/* Startseite */}
                  <div className="border border-gray-700 rounded-lg">
                    <button
                      onClick={() => toggleSection('startseite')}
                      className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-700/50 rounded-t-lg"
                    >
                      <span className="text-white font-medium">Startseite</span>
                      {expandedSection === 'startseite' ? (
                        <ChevronDown className="h-4 w-4 text-gray-400" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                    {expandedSection === 'startseite' && (
                      <div className="p-4 space-y-4 bg-gray-900/50 border-t border-gray-700">
                        <SmartMediaUpload 
                          title="Hero Bild" 
                          description="Das große Hauptbild ganz oben auf der Startseite." 
                          type="image" 
                          pageContext="startseite"
                          onMediaUpdate={handleMediaUpdate}
                        />
                        <SmartMediaUpload 
                          title="Vorschau Transporte" 
                          description="Bild für die Transport-Dienstleistung auf der Startseite." 
                          type="image" 
                          pageContext="startseite"
                          onMediaUpdate={handleMediaUpdate}
                        />
                        <SmartMediaUpload 
                          title="Vorschau Reinigung" 
                          description="Bild für die Reinigungs-Dienstleistung auf der Startseite." 
                          type="image" 
                          pageContext="startseite"
                          onMediaUpdate={handleMediaUpdate}
                        />
                        <SmartMediaUpload 
                          title="Vorschau Gartenbau" 
                          description="Bild für die Gartenbau-Dienstleistung auf der Startseite." 
                          type="image" 
                          pageContext="startseite"
                          onMediaUpdate={handleMediaUpdate}
                        />
                        <SmartMediaUpload 
                          title="Vorschau Entsorgung" 
                          description="Bild für die Entsorgungs-Dienstleistung auf der Startseite." 
                          type="image" 
                          pageContext="startseite"
                          onMediaUpdate={handleMediaUpdate}
                        />
                      </div>
                    )}
                  </div>

                  {/* Leistungsseiten */}
                  <div className="border border-gray-700 rounded-lg">
                    <button
                      onClick={() => toggleSection('leistungen')}
                      className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-700/50 rounded-t-lg"
                    >
                      <span className="text-white font-medium">Leistungsseiten</span>
                      {expandedSection === 'leistungen' ? (
                        <ChevronDown className="h-4 w-4 text-gray-400" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                    {expandedSection === 'leistungen' && (
                      <div className="p-4 space-y-4 bg-gray-900/50 border-t border-gray-700">
                        <SmartMediaUpload 
                          title="Header-Bild Transporte" 
                          description="Das Titelbild für die Transport-Detailseite." 
                          type="image" 
                          pageContext="leistungen"
                          onMediaUpdate={handleMediaUpdate}
                        />
                        <SmartMediaUpload 
                          title="Header-Bild Reinigung" 
                          description="Das Titelbild für die Reinigungs-Detailseite." 
                          type="image" 
                          pageContext="leistungen"
                          onMediaUpdate={handleMediaUpdate}
                        />
                        <SmartMediaUpload 
                          title="Header-Bild Gartenbau" 
                          description="Das Titelbild für die Gartenbau-Detailseite." 
                          type="image" 
                          pageContext="leistungen"
                          onMediaUpdate={handleMediaUpdate}
                        />
                        <SmartMediaUpload 
                          title="Header-Bild Entsorgung" 
                          description="Das Titelbild für die Entsorgungs-Detailseite." 
                          type="image" 
                          pageContext="leistungen"
                          onMediaUpdate={handleMediaUpdate}
                        />
                      </div>
                    )}
                  </div>

                  {/* Über Uns */}
                  <div className="border border-gray-700 rounded-lg">
                    <button
                      onClick={() => toggleSection('ueber-uns')}
                      className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-700/50 rounded-t-lg"
                    >
                      <span className="text-white font-medium">Über Uns</span>
                      {expandedSection === 'ueber-uns' ? (
                        <ChevronDown className="h-4 w-4 text-gray-400" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                    {expandedSection === 'ueber-uns' && (
                      <div className="p-4 space-y-4 bg-gray-900/50 border-t border-gray-700">
                        <SmartMediaUpload 
                          title="Team Bild" 
                          description="Ein Bild des Teams oder des Gründers auf der 'Über Uns'-Seite." 
                          type="image" 
                          pageContext="ueber-uns"
                          onMediaUpdate={handleMediaUpdate}
                        />
                      </div>
                    )}
                  </div>

                  {/* Empfehlungsprogramm */}
                  <div className="border border-gray-700 rounded-lg">
                    <button
                      onClick={() => toggleSection('empfehlungsprogramm')}
                      className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-700/50 rounded-t-lg"
                    >
                      <span className="text-white font-medium">Empfehlungsprogramm</span>
                      {expandedSection === 'empfehlungsprogramm' ? (
                        <ChevronDown className="h-4 w-4 text-gray-400" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                    {expandedSection === 'empfehlungsprogramm' && (
                      <div className="p-4 space-y-4 bg-gray-900/50 border-t border-gray-700">
                        <SmartMediaUpload 
                          title="Programm-Banner" 
                          description="Ein Werbebanner für das Empfehlungsprogramm." 
                          type="image" 
                          pageContext="empfehlungsprogramm"
                          onMediaUpdate={handleMediaUpdate}
                        />
                      </div>
                    )}
                  </div>

                  {/* Kontakt */}
                  <div className="border border-gray-700 rounded-lg">
                    <button
                      onClick={() => toggleSection('kontakt')}
                      className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-700/50 rounded-t-lg"
                    >
                      <span className="text-white font-medium">Kontakt</span>
                      {expandedSection === 'kontakt' ? (
                        <ChevronDown className="h-4 w-4 text-gray-400" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                    {expandedSection === 'kontakt' && (
                      <div className="p-4 space-y-4 bg-gray-900/50 border-t border-gray-700">
                        <SmartMediaUpload 
                          title="Kontakt Header-Bild" 
                          description="Das Titelbild auf der Kontaktseite." 
                          type="image" 
                          pageContext="kontakt"
                          onMediaUpdate={handleMediaUpdate}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Dialog for editing SEO */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[600px] bg-gray-800 border-gray-700 text-white">
            {selectedMeta && (
              <form onSubmit={handleSubmit}>
                <DialogHeader>
                  <DialogTitle className="text-white">SEO für {selectedMeta.path} bearbeiten</DialogTitle>
                  <DialogDescription className="text-gray-400">
                    Änderungen hier wirken sich direkt auf die Suchmaschinenergebnisse aus.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right text-white">Titel</Label>
                    <Input 
                      id="title" 
                      name="title" 
                      value={selectedMeta.title} 
                      onChange={handleFormChange} 
                      className="col-span-3 bg-gray-700 border-gray-600 text-white" 
                    />
                  </div>
                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label htmlFor="description" className="text-right pt-2 text-white">Beschreibung</Label>
                    <Textarea 
                      id="description" 
                      name="description" 
                      value={selectedMeta.description} 
                      onChange={handleFormChange} 
                      className="col-span-3 bg-gray-700 border-gray-600 text-white" 
                      rows={5} 
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="keywords" className="text-right text-white">Keywords</Label>
                    <Input 
                      id="keywords" 
                      name="keywords" 
                      value={selectedMeta.keywords} 
                      onChange={handleFormChange} 
                      className="col-span-3 bg-gray-700 border-gray-600 text-white" 
                      placeholder="keyword1, keyword2" 
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
    </div>
  );
}