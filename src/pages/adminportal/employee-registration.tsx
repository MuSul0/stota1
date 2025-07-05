import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { Loader2, UserPlus } from 'lucide-react';

interface Employee {
  id: string;
  email: string;
  name: string;
  role: string;
  created_at: string;
}

export default function EmployeeRegistration() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const subscriptionRef = useRef<any>(null);

  useEffect(() => {
    fetchEmployees();
    setupRealtimeSubscription();

    return () => {
      if (subscriptionRef.current) {
        supabase.removeChannel(subscriptionRef.current);
        subscriptionRef.current = null;
      }
    };
  }, []);

  const fetchEmployees = async () => {
    try {
      // Hole alle Profile mit Rolle 'mitarbeiter'
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'mitarbeiter')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setEmployees(data || []);
    } catch (error) {
      toast.error('Fehler beim Laden der Mitarbeiter');
      console.error(error);
    }
  };

  const setupRealtimeSubscription = () => {
    if (subscriptionRef.current) {
      supabase.removeChannel(subscriptionRef.current);
      subscriptionRef.current = null;
    }
    const channel = supabase
      .channel('public:profiles')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles', filter: 'role=eq.mitarbeiter' }, () => {
        fetchEmployees();
      })
      .subscribe();
    subscriptionRef.current = channel;
  };

  const handleRegister = async () => {
    if (!email || !password || !name) {
      toast.error('Bitte alle Felder ausfüllen');
      return;
    }

    setLoading(true);

    try {
      // Mitarbeiter in Supabase Auth anlegen (Admin API)
      const { data, error } = await supabase.auth.admin.createUser({
        email,
        password,
        user_metadata: { role: 'mitarbeiter' },
        email_confirm: true
      });

      if (error) {
        toast.error('Fehler bei der Registrierung: ' + error.message);
        setLoading(false);
        return;
      }

      // Profil in Tabelle anlegen
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: data.user.id,
          email,
          name,
          role: 'mitarbeiter',
          created_at: new Date().toISOString()
        });

      if (profileError) {
        toast.error('Fehler beim Anlegen des Profils');
        setLoading(false);
        return;
      }

      toast.success('Mitarbeiter erfolgreich registriert');
      setEmail('');
      setPassword('');
      setName('');
      fetchEmployees();
    } catch (error) {
      toast.error('Unbekannter Fehler bei der Registrierung');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-6 py-12 max-w-4xl space-y-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <UserPlus className="w-6 h-6 text-blue-600" />
          Mitarbeiter in Echtzeit anmelden
        </h1>

        <Card>
          <CardHeader>
            <CardTitle>Neuen Mitarbeiter registrieren</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleRegister();
              }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Max Mustermann"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">E-Mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="max@beispiel.de"
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Passwort</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mindestens 6 Zeichen"
                  required
                />
              </div>
              <div className="md:col-span-3 flex justify-end">
                <Button type="submit" disabled={loading} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  {loading ? 'Registriere...' : 'Mitarbeiter registrieren'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Aktuelle Mitarbeiter</CardTitle>
          </CardHeader>
          <CardContent className="p-0 overflow-x-auto">
            {employees.length === 0 ? (
              <p className="p-4 text-gray-600">Keine Mitarbeiter gefunden.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>E-Mail</TableHead>
                    <TableHead>Registriert am</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employees.map(emp => (
                    <TableRow key={emp.id}>
                      <TableCell>{emp.name}</TableCell>
                      <TableCell>{emp.email}</TableCell>
                      <TableCell>{new Date(emp.created_at).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}