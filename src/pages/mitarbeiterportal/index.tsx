import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useSession } from '@/components/SessionProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface Mitarbeiter {
  id: string;
  email: string;
  created_at: string;
  role: string;
}

export default function Mitarbeiterportal() {
  const { session, user, loading } = useSession();
  const navigate = useNavigate();

  const [mitarbeiter, setMitarbeiter] = useState<Mitarbeiter[]>([]);
  const [loadingMitarbeiter, setLoadingMitarbeiter] = useState(true);

  // Formularzustand
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!session || user?.user_metadata?.role !== 'admin') {
        navigate('/login');
      } else {
        fetchMitarbeiter();
      }
    }
  }, [session, user, loading, navigate]);

  const fetchMitarbeiter = async () => {
    setLoadingMitarbeiter(true);
    try {
      const { data, error } = await supabase.auth.admin.listUsers();

      if (error) {
        toast.error('Fehler beim Laden der Mitarbeiter');
        console.error(error);
        setLoadingMitarbeiter(false);
        return;
      }

      const { data: profiles, error: profileError } = await supabase
        .from('profiles')
        .select('id, role');

      if (profileError) {
        toast.error('Fehler beim Laden der Profile');
        console.error(profileError);
        setLoadingMitarbeiter(false);
        return;
      }

      const mitarbeiterList = data.users
        .map((u) => {
          const profile = profiles?.find(p => p.id === u.id);
          return {
            id: u.id,
            email: u.email || '',
            created_at: u.created_at,
            role: profile?.role || 'user'
          };
        })
        .filter(u => u.role === 'mitarbeiter');

      setMitarbeiter(mitarbeiterList);
    } catch (error) {
      toast.error('Fehler beim Laden der Mitarbeiter');
      console.error(error);
    } finally {
      setLoadingMitarbeiter(false);
    }
  };

  const handleCreateMitarbeiter = async () => {
    if (!email || !password) {
      toast.error('Bitte E-Mail und Passwort eingeben');
      return;
    }
    setCreating(true);

    try {
      const { data, error } = await supabase.auth.admin.createUser({
        email,
        password,
        user_metadata: { role: 'mitarbeiter' },
        email_confirm: true
      });

      if (error) {
        toast.error('Fehler beim Erstellen des Mitarbeiters');
        console.error(error);
        setCreating(false);
        return;
      }

      const { error: profileError } = await supabase
        .from('profiles')
        .insert({ id: data.user.id, role: 'mitarbeiter' });

      if (profileError) {
        toast.error('Fehler beim Anlegen des Profils');
        console.error(profileError);
        setCreating(false);
        return;
      }

      toast.success('Mitarbeiter erfolgreich erstellt');
      setEmail('');
      setPassword('');
      fetchMitarbeiter();
    } catch (error) {
      toast.error('Fehler beim Erstellen des Mitarbeiters');
      console.error(error);
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteMitarbeiter = async (id: string) => {
    if (!window.confirm('Möchten Sie diesen Mitarbeiter wirklich löschen?')) return;

    try {
      const { error } = await supabase.auth.admin.deleteUser(id);
      if (error) {
        toast.error('Fehler beim Löschen des Mitarbeiters');
        console.error(error);
        return;
      }

      // Profil löschen
      const { error: profileError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', id);

      if (profileError) {
        toast.error('Fehler beim Löschen des Profils');
        console.error(profileError);
        return;
      }

      toast.success('Mitarbeiter erfolgreich gelöscht');
      fetchMitarbeiter();
    } catch (error) {
      toast.error('Fehler beim Löschen des Mitarbeiters');
      console.error(error);
    }
  };

  const handleRoleChange = async (id: string, newRole: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', id);

      if (error) {
        toast.error('Fehler beim Aktualisieren der Rolle');
        console.error(error);
        return;
      }

      toast.success('Rolle erfolgreich aktualisiert');
      fetchMitarbeiter();
    } catch (error) {
      toast.error('Fehler beim Aktualisieren der Rolle');
      console.error(error);
    }
  };

  const handleResetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/login'
      });

      if (error) {
        toast.error('Fehler beim Senden des Passwort-Reset-Links');
        console.error(error);
        return;
      }

      toast.success('Passwort-Reset-Link wurde gesendet');
    } catch (error) {
      toast.error('Fehler beim Senden des Passwort-Reset-Links');
      console.error(error);
    }
  };

  if (loading || loadingMitarbeiter) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg">Lade Mitarbeiter...</p>
      </div>
    );
  }

  if (!session || user?.user_metadata?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-red-600 text-lg">Zugriff verweigert. Bitte als Admin anmelden.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-6 py-12 max-w-6xl space-y-8">
        <h1 className="text-3xl font-bold">Mitarbeiterverwaltung</h1>

        {/* Neues Mitarbeiter-Konto anlegen */}
        <Card>
          <CardHeader>
            <CardTitle>Neuen Mitarbeiter anlegen</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCreateMitarbeiter();
              }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end"
            >
              <div>
                <Label htmlFor="email">E-Mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="mitarbeiter@example.com"
                />
              </div>
              <div>
                <Label htmlFor="password">Passwort</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Mind. 6 Zeichen"
                  minLength={6}
                />
              </div>
              <div>
                <Button type="submit" disabled={creating} className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white">
                  {creating ? 'Erstelle...' : 'Mitarbeiter anlegen'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Mitarbeiter-Liste */}
        <Card>
          <CardHeader>
            <CardTitle>Bestehende Mitarbeiter</CardTitle>
          </CardHeader>
          <CardContent className="p-0 overflow-x-auto">
            {mitarbeiter.length === 0 ? (
              <p className="p-4 text-gray-600">Keine Mitarbeiter gefunden.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>E-Mail</TableHead>
                    <TableHead>Erstellt am</TableHead>
                    <TableHead>Rolle</TableHead>
                    <TableHead className="text-right">Aktionen</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mitarbeiter.map((m) => (
                    <TableRow key={m.id}>
                      <TableCell>{m.email}</TableCell>
                      <TableCell>{new Date(m.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Select
                          value={m.role}
                          onValueChange={(value) => handleRoleChange(m.id, value)}
                        >
                          <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="Rolle" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mitarbeiter">Mitarbeiter</SelectItem>
                            <SelectItem value="user">Benutzer</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleResetPassword(m.email)}
                        >
                          Passwort zurücksetzen
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteMitarbeiter(m.id)}
                        >
                          Löschen
                        </Button>
                      </TableCell>
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