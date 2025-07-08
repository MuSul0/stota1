import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
// Header und Footer entfernt, da sie vom AdminLayout bereitgestellt werden
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { useSession } from '@/components/SessionProvider';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  email: string;
  role: string;
  created_at: string;
  last_sign_in_at: string | null;
  is_active: boolean;
}

export default function AdminUsers() {
  const { session, user, loading } = useSession();
  const navigate = useNavigate();

  const [users, setUsers] = useState<User[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const subscriptionRef = useRef<any>(null);

  useEffect(() => {
    if (!loading) {
      if (!session || user?.role !== 'admin') {
        navigate('/login');
      } else {
        fetchUsers();
        setupRealtimeSubscription();
      }
    }
  }, [session, user, loading, navigate]);

  useEffect(() => {
    return () => {
      if (subscriptionRef.current) {
        supabase.removeChannel(subscriptionRef.current);
        subscriptionRef.current = null;
      }
    };
  }, []);

  const fetchUsers = async () => {
    setLoadingData(true);
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
          created_at: authUser.created_at,
          last_sign_in_at: authUser.last_sign_in_at,
          is_active: authUser.last_sign_in_at !== null
        };
      });

      setUsers(combinedUsers);
    } catch (error) {
      toast.error('Fehler beim Laden der Benutzer');
      console.error(error);
    } finally {
      setLoadingData(false);
    }
  };

  const setupRealtimeSubscription = () => {
    if (subscriptionRef.current) {
      supabase.removeChannel(subscriptionRef.current);
      subscriptionRef.current = null;
    }
    const channel = supabase
      .channel('public:profiles')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' }, () => {
        fetchUsers();
      })
      .subscribe();

    subscriptionRef.current = channel;
  };

  const updateUserRole = async (userId: string, newRole: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', userId);
      
      if (error) throw error;
      
      toast.success('Benutzerrolle aktualisiert');
    } catch (error) {
      toast.error('Fehler beim Aktualisieren der Rolle');
      console.error(error);
    }
  };

  const toggleUserStatus = async (userId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase.auth.admin.updateUserById(userId, {
        user_metadata: { is_active: !currentStatus }
      });

      if (error) throw error;
      
      toast.success(`Benutzer ${currentStatus ? 'deaktiviert' : 'aktiviert'}`);
    } catch (error) {
      toast.error('Fehler beim Ändern des Status');
      console.error(error);
    }
  };

  if (loading || loadingData) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!session || user?.role !== 'admin') {
    return null;
  }

  return (
    <div className="space-y-6 min-h-screen bg-gray-50 flex flex-col">
      {/* Header entfernt */}
      <main className="flex-grow container mx-auto px-6 py-12 max-w-7xl">
        <h1 className="text-3xl font-bold mb-8">Benutzerverwaltung</h1>

        <Card>
          <CardHeader>
            <CardTitle>Alle Benutzer</CardTitle>
          </CardHeader>
          <CardContent className="p-0 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>E-Mail</TableHead>
                  <TableHead>Rolle</TableHead>
                  <TableHead>Registriert am</TableHead>
                  <TableHead>Letzte Anmeldung</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aktionen</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Select
                        value={user.role}
                        onValueChange={(value) => updateUserRole(user.id, value)}
                      >
                        <SelectTrigger className="w-[140px]">
                          <SelectValue placeholder="Rolle" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="mitarbeiter">Mitarbeiter</SelectItem>
                          <SelectItem value="kunde">Kunde</SelectItem>
                          <SelectItem value="user">Benutzer</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>{user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : 'Nie'}</TableCell>
                    <TableCell>
                      <Badge variant={user.is_active ? 'default' : 'secondary'}>
                        {user.is_active ? 'Aktiv' : 'Inaktiv'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleUserStatus(user.id, user.is_active)}
                      >
                        {user.is_active ? 'Deaktivieren' : 'Aktivieren'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
      {/* Footer entfernt */}
    </div>
  );
}