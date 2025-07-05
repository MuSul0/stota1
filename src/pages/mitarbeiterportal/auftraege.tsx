import { useSession } from '@/components/SessionProvider';
import { redirect } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function Auftraege() {
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
      <motion.main 
        className="flex-grow container mx-auto px-4 py-12 max-w-3xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold mb-4">Ihre Aufträge</h1>
        <p className="mb-8 text-gray-700">
          Hier sehen Sie Ihre zugewiesenen Aufträge und können deren Status verfolgen.
        </p>
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Aufträge anzeigen</CardTitle>
            <CardDescription>Verwalten Sie Ihre aktuellen und vergangenen Aufträge.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
              onClick={() => alert('Aufträge anzeigen - Funktion noch nicht implementiert')}
            >
              Anzeigen
            </Button>
          </CardContent>
        </Card>
      </motion.main>
      <Footer />
    </div>
  );
}