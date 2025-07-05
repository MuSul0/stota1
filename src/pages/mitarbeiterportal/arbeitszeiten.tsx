import { useSession } from '@/components/SessionProvider';
import { redirect } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Arbeitszeiten() {
  const { session, user, loading } = useSession();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg">Lade...</p>
      </div>
    );
  }

  if (!session || user?.user_metadata?.role !== 'mitarbeiter') {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6">Arbeitszeiten</h1>
        <p className="mb-8 text-gray-700">Erfassen Sie Ihre Arbeitszeiten</p>
        <Card>
          <CardContent>
            <Button className="w-full" onClick={() => alert('Arbeitszeit erfassen - Funktion noch nicht implementiert')}>
              Erfassen
            </Button>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}