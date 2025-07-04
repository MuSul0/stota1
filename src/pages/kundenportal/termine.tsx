import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '@/components/SessionProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Termine() {
  const { session, user, loading } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!session || user?.user_metadata?.role !== 'kunde') {
        navigate('/login');
      }
    }
  }, [session, user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg">Lade Termine...</p>
      </div>
    );
  }

  if (!session || user?.user_metadata?.role !== 'kunde') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-red-600 text-lg">Zugriff verweigert. Bitte als Kunde anmelden.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-6">Ihre Termine</h1>
        <p className="mb-8 text-gray-700">Verwalten Sie Ihre gebuchten Dienstleistungen und Termine.</p>

        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Beispiel-Terminübersicht</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Hier könnten Ihre gebuchten Termine angezeigt und verwaltet werden.</p>
            <Button onClick={() => alert('Termin hinzufügen Funktion noch nicht implementiert')}>
              Neuen Termin hinzufügen
            </Button>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}