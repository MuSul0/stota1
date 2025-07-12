import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '@/components/SessionProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Support() {
  const { session, user, loading } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!session || !['kunde', 'user'].includes(user?.role || '')) {
        navigate('/login');
      }
    }
  }, [session, user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg">Lade Support-Seite...</p>
      </div>
    );
  }

  if (!session || !['kunde', 'user'].includes(user?.role || '')) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-red-600 text-lg">Zugriff verweigert. Bitte als Kunde anmelden.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-grow container mx-auto px-6 py-12 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6">Kunden-Support</h1>
        <p className="mb-8 text-gray-700">
          Hier finden Sie Hilfe und Antworten auf häufig gestellte Fragen. 
          Bei weiteren Anliegen kontaktieren Sie uns bitte direkt.
        </p>

        <Card>
          <CardHeader>
            <CardTitle>FAQ</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-4 text-gray-700">
              <li><strong>Wie kann ich einen Termin ändern?</strong> - Sie können Termine im Bereich "Termine" verwalten.</li>
              <li><strong>Wie erhalte ich eine Rechnung?</strong> - Rechnungen finden Sie in Ihrem Kundenkonto unter "Aufträge".</li>
              <li><strong>Wie kontaktiere ich den Support?</strong> - Nutzen Sie das Kontaktformular auf der Kontaktseite oder rufen Sie uns an.</li>
            </ul>
          </CardContent>
        </Card>

        <div className="mt-8 flex justify-end">
          <Button onClick={() => navigate('/kontakt')}>
            Kontaktformular öffnen
          </Button>
        </div>
      </main>
    </div>
  );
}