import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '@/components/SessionProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Nachrichten() {
  const { session, user, loading } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!session || user?.role !== 'kunde') {
        navigate('/login');
      }
    }
  }, [session, user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg">Lade Nachrichten...</p>
      </div>
    );
  }

  if (!session || user?.role !== 'kunde') {
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
        <h1 className="text-3xl font-bold mb-6">Ihre Nachrichten</h1>
        <p className="mb-8 text-gray-700">Kommunikation mit unserem Team.</p>

        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Beispiel-Nachrichtenübersicht</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Hier könnten Ihre Nachrichten angezeigt und beantwortet werden.</p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}