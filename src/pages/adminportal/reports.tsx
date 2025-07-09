import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { toast } from 'sonner';
import { useSession } from '@/components/SessionProvider';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Reports() {
  const { session, user, loading } = useSession();
  const navigate = useNavigate();

  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!session || user?.role !== 'admin') {
        navigate('/login');
      }
    }
  }, [session, user, loading, navigate]);

  const handleExport = () => {
    setExporting(true);
    // Platzhalter: Hier könnte ein Export als CSV/PDF implementiert werden
    setTimeout(() => {
      toast.success('Bericht erfolgreich exportiert (Platzhalter)');
      setExporting(false);
    }, 1500);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg">Lade Berichte...</p>
      </div>
    );
  }

  if (!session || user?.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
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
    </div>
  );
}