import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

export default function Reports() {
  const [exporting, setExporting] = useState(false);

  const handleExportLeads = async () => {
    setExporting(true);
    try {
      const { data: leads, error } = await supabase
        .from('contact_requests')
        .select('name,email,phone,service,message,created_at')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (!leads || leads.length === 0) {
        toast.info("Keine Leads zum Exportieren vorhanden.");
        return;
      }

      const headers = Object.keys(leads[0]);
      const csvContent = [
        headers.join(','),
        ...leads.map(row => 
          headers.map(header => 
            `"${String(row[header as keyof typeof row] ?? '').replace(/"/g, '""')}"`
          ).join(',')
        )
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `leads-export-${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success('Leads erfolgreich als CSV exportiert.');

    } catch (error) {
      toast.error('Fehler beim Exportieren der Leads.');
      console.error(error);
    } finally {
      setExporting(false);
    }
  };

  return (
    <main className="flex-grow container mx-auto px-6 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-white">Berichte & Export</h1>

      <Card className="bg-gray-800 border-gray-700 text-white">
        <CardHeader>
          <CardTitle>Datenexport</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p>Exportieren Sie wichtige Unternehmensdaten als CSV-Datei für Ihre Auswertungen.</p>
          <Button 
            onClick={handleExportLeads} 
            disabled={exporting}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white"
          >
            {exporting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Download className="w-5 h-5" />
            )}
            {exporting ? 'Exportiere Leads...' : 'Alle Leads exportieren'}
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}