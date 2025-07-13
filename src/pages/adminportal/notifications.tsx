import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

interface Notification {
  id: string;
  user_email: string;
  subject: string;
  content: string;
  status: 'gelesen' | 'ungelesen';
  created_at: string;
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const subscriptionRef = useRef<any>(null);

  useEffect(() => {
    fetchNotifications();
    setupRealtimeSubscription();
    
    return () => {
      if (subscriptionRef.current) {
        supabase.removeChannel(subscriptionRef.current);
        subscriptionRef.current = null;
      }
    };
  }, []);

  const fetchNotifications = async () => {
    setLoadingData(true);
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('id, user_id, subject, content, status, created_at, profiles(email)')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;

      // Map user email from profiles relation
      const mapped = (data || []).map((item: any) => ({
        id: item.id,
        user_email: item.profiles?.email || 'Unbekannt',
        subject: item.subject,
        content: item.content,
        status: item.status,
        created_at: item.created_at
      }));

      setNotifications(mapped);
    } catch (error) {
      toast.error('Fehler beim Laden der Benachrichtigungen');
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
      .channel('public:messages')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'messages' }, () => {
        fetchNotifications();
      })
      .subscribe();
    subscriptionRef.current = channel;
  };

  const markAsRead = async (id: string) => {
    const { error } = await supabase
      .from('messages')
      .update({ status: 'gelesen' })
      .eq('id', id);

    if (error) {
      toast.error('Fehler beim Aktualisieren des Status');
      console.error(error);
    } else {
      toast.success('Nachricht als gelesen markiert');
      fetchNotifications();
    }
  };

  if (loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <main className="flex-grow container mx-auto px-6 py-12 max-w-7xl">
      <h1 className="text-3xl font-bold mb-8">Benachrichtigungen</h1>

      {notifications.length === 0 ? (
        <p className="text-gray-600">Keine Benachrichtigungen gefunden.</p>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Letzte Kundenanfragen</CardTitle>
          </CardHeader>
          <CardContent className="p-0 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>E-Mail</TableHead>
                  <TableHead>Betreff</TableHead>
                  <TableHead>Nachricht</TableHead>
                  <TableHead>Datum</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aktion</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {notifications.map((note) => (
                  <TableRow key={note.id}>
                    <TableCell>{note.user_email}</TableCell>
                    <TableCell className="max-w-xs truncate">{note.subject}</TableCell>
                    <TableCell className="max-w-lg truncate">{note.content}</TableCell>
                    <TableCell>{new Date(note.created_at).toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant={note.status === 'gelesen' ? 'default' : 'destructive'}>
                        {note.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {note.status === 'ungelesen' && (
                        <Button size="sm" onClick={() => markAsRead(note.id)}>
                          Als gelesen markieren
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </main>
  );
}