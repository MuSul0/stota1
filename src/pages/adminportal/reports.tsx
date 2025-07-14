import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { toast } from 'sonner';

export default function Reports() {
  const [exporting, setExporting] = useState(false);

  const handleExport = () => {
    setExporting(true);
    // Platzhalter: Hier könnte ein Export als CSV/PDF implementiert werden
    setTimeout(() => {
      toast.success('Bericht erfolgreich exportiert (Platzhalter)');
      setExporting(false);
    }, 1500);
  };

  return (
    <main className="flex-grow container mx-auto px-6 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Berichte & Export</h1>

      <Card>
        <CardHeader>
          <CardTitle>Berichte</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p>Exportieren Sie wichtige Unternehmensdaten für Ihre Auswertungen.</p>
          <Button 
            onClick={handleExport} 
            disabled={exporting}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white"
          >
            <Download className="w-5 h-5" />
            {exporting ? 'Exportiere...' : 'Bericht exportieren'}
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}