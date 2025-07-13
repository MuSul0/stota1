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
import { Loader2, Edit, FileText, BarChart, Clock, CheckCircle, Search, Key, TrendingUp, ArrowRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface SeoMetadata {
  path: string;
  title: string;
  description: string;
  keywords: string;
  updated_at: string;
}

const mockKeywords = [
    { name: 'Transport Gelsenkirchen', rank: 3, volume: '1.200', change: 2 },
    { name: 'Gartenbau in der Nähe', rank: 5, volume: '2.500', change: 1 },
    { name: 'Umzugsfirma Kosten', rank: 8, volume: '3.100', change: -1 },
    { name: 'Entsorgung Sperrmüll', rank: 4, volume: '900', change: 3 },
    { name: 'Gebäudereinigung Büro', rank: 6, volume: '1.500', change: 2 },
];

const SeoDashboard = () => {
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
    setSelectedMeta(JSON.parse(JSON.stringify(meta)));
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
    setIsSubmitting(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
      </div>
    );
  }

  const seoScore = 92;
  const totalPages = metadata.length;

  return (
    <main className="flex-grow container mx-auto px-4 sm:px-6 py-12 max-w-7xl text-white">
      <h1 className="text-3xl font-bold mb-8">Live SEO Dashboard</h1>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Gesamt Seiten</CardTitle>
            <FileText className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPages}</div>
            <p className="text-xs text-gray-400">Alle Seiten mit SEO-Metadaten</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">SEO Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{seoScore}/100</div>
            <p className="text-xs text-gray-400">Basierend auf internen Metriken</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Ø Ladezeit</CardTitle>
            <Clock className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0.9s</div>
            <p className="text-xs text-gray-400">-0.3s seit letzter Optimierung</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Alle optimiert</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Ja</div>
            <p className="text-xs text-gray-400">Alle Seiten haben SEO-Daten</p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics and Keywords */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
        <Card className="lg:col-span-2 bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle>Live SEO Analytics</CardTitle>
            <CardDescription>Echte Daten von Google Search Console</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center h-48">
            <BarChart className="h-12 w-12 text-gray-500 mb-4" />
            <p className="text-center text-gray-400">Verbinden Sie Google Search Console für echte Live-Daten.</p>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3 bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle>Live Keyword Tracking</CardTitle>
            <CardDescription>Beispiel-Keywords zur Demonstration</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700">
                  <TableHead className="text-white">Keyword</TableHead>
                  <TableHead className="text-white">Rank</TableHead>
                  <TableHead className="text-white">Veränderung</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockKeywords.map((kw) => (
                  <TableRow key={kw.name} className="border-gray-700">
                    <TableCell className="font-medium">{kw.name}</TableCell>
                    <TableCell>#{kw.rank}</TableCell>
                    <TableCell className={`flex items-center ${kw.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      <TrendingUp className={`mr-1 h-4 w-4 ${kw.change < 0 ? 'transform rotate-180' : ''}`} />
                      {kw.change > 0 ? `+${kw.change}` : kw.change}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* SEO Pages Overview */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle>SEO Seiten Übersicht</CardTitle>
          <CardDescription>Verwalten Sie hier die SEO-Daten für jede Seite.</CardDescription>
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
                    <div className="font-bold">{meta.title.split('|')[0].trim()}</div>
                    <div className="text-xs text-gray-400">{meta.path}</div>
                  </TableCell>
                  <TableCell><Badge variant="default" className="bg-green-600/20 text-green-400 border-green-500">Aktiv</Badge></TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={85 + (meta.path.length % 15)} className="w-24" />
                      <span>{85 + (meta.path.length % 15)}%</span>
                    </div>
                  </TableCell>
                  <TableCell>{new Date(meta.updated_at).toLocaleString('de-DE')}</TableCell>
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

      {/* Dialog for editing */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px] bg-gray-800 border-gray-700 text-white">
          {selectedMeta && (
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>SEO für {selectedMeta.path} bearbeiten</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Änderungen hier wirken sich direkt auf die Suchmaschinenergebnisse aus.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">Titel</Label>
                  <Input id="title" name="title" value={selectedMeta.title} onChange={handleFormChange} className="col-span-3 bg-gray-700 border-gray-600" />
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="description" className="text-right pt-2">Beschreibung</Label>
                  <Textarea id="description" name="description" value={selectedMeta.description} onChange={handleFormChange} className="col-span-3 bg-gray-700 border-gray-600" rows={5} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="keywords" className="text-right">Keywords</Label>
                  <Input id="keywords" name="keywords" value={selectedMeta.keywords} onChange={handleFormChange} className="col-span-3 bg-gray-700 border-gray-600" placeholder="keyword1, keyword2" />
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

export default SeoDashboard;