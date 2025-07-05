import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

interface UserActivity {
  id: string;
  email: string;
  role: string;
  last_sign_in_at: string | null;
  created_at: string;
}

export default function UserActivity() {
  const [users, setUsers] = useState<UserActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserActivity();
  }, []);

  const fetchUserActivity = async () => {
    setLoading(true);
    try {
      const { data: authData, error: authError } = await supabase.auth.admin.listUsers();
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*');

      if (authError || profileError) throw authError || profileError;

      const combinedUsers = authData.users.map(authUser => {
        const profile = profileData.find(p => p.id === authUser.id) || {};
        return {
          id: authUser.id,
          email: authUser.email || '',
          role: profile.role || 'user',
          last_sign_in_at: authUser.last_sign_in_at,
          created_at: authUser.created_at
        };
      });

      setUsers(combinedUsers);
    } catch (error) {
      toast.error('Fehler beim Laden der Benutzeraktivität');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-6 py-12 max-w-7xl">
        <h1 className="text-3xl font-bold mb-8">Benutzeraktivität</h1>

        {users.length === 0 ? (
          <p className="text-gray-600">Keine Benutzer gefunden.</p>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Login-Historie</CardTitle>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>E-Mail</TableHead>
                    <TableHead>Rolle</TableHead>
                    <TableHead>Registriert am</TableHead>
                    <TableHead>Letzte Anmeldung</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map(user => (
                    <TableRow key={user.id}>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>{user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : 'Nie'}</TableCell>
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