import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '@/components/SessionProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Plus } from 'lucide-react';

interface Termin {
  id: string;
  date: string;
  time: string;
  service: string;
  status: 'Bestätigt' | 'Ausstehend' | 'Abgesagt';
}

export default function Termine() {
  const { session, user, loading } = useSession();
  const navigate = useNavigate();

  const [termine, setTermine] = useState<Termin[]>([
    {
      id: '1',
      date: '2024-07-10',
      time: '10:00',
      service: 'Büroreinigung',
      status: 'Bestätigt'
    },
    {
      id: '2',
      date: '2024-07-15',
      time: '14:00',
      service: 'Umzugshilfe',
      status: 'Ausstehend'
    },
    {
      id: '3',
      date: '2024-07-20',
      time: '09:00',
      service: 'Fensterreinigung',
      status: 'Bestätigt'
    }
  ]);

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

  const handleAddTermin = () => {
    alert('Funktion zum Hinzufügen eines neuen Termins ist noch nicht implementiert.');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-6 py-12 max-w-5xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Ihre Termine</h1>
          <Button onClick={handleAddTermin} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Neuer Termin
          </Button>
        </div>
        <p className="mb-6 text-gray-700">Verwalten Sie Ihre gebuchten Dienstleistungen und Termine.</p>

        {termine.length === 0 ? (
          <p className="text-gray-600">Keine Termine gefunden.</p>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Terminübersicht</CardTitle>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Datum</TableHead>
                    <TableHead>Uhrzeit</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {termine.map((termin) => (
                    <TableRow key={termin.id}>
                      <TableCell>{new Date(termin.date).toLocaleDateString()}</TableCell>
                      <TableCell>{termin.time}</TableCell>
                      <TableCell>{termin.service}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-sm font-semibold ${
                            termin.status === 'Bestätigt'
                              ? 'bg-green-100 text-green-800'
                              : termin.status === 'Ausstehend'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {termin.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </main>
      <Footer />
    </div>
  );
}