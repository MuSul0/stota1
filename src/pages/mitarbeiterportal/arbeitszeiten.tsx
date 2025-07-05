import { useSession } from '@/components/SessionProvider';
import { redirect } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

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
      <motion.main 
        className="flex-grow container mx-auto px-4 py-12 max-w-3xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold mb-4">Arbeitszeiten erfassen</h1>
        <p className="mb-8 text-gray-700">
          Erfassen Sie hier Ihre Arbeitszeiten schnell und einfach.
        </p>
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Arbeitszeit erfassen</CardTitle>
            <CardDescription>Starten Sie jetzt die Zeiterfassung für Ihren Arbeitstag.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              onClick={() => alert('Arbeitszeit erfassen - Funktion noch nicht implementiert')}
            >
              Erfassen
            </Button>
          </CardContent>
        </Card>
      </motion.main>
      <Footer />
    </div>
  );
}