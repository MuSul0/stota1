import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '@/components/SessionProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface Nachricht {
  id: string;
  user_id: string;
  subject: string;
  content: string;
  created_at: string;
  status: 'gelesen' | 'ungelesen';
}

export default function Nachrichten() {
  const { session, user, loading } = useSession();
  const navigate = useNavigate();

  const [nachrichten, setNachrichten] = useState<Nachricht[]>([]);
  const [loadingNachrichten, setLoadingNachrichten] = useState(true);

  // Formularzustand für neue Nachricht
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');

  // Ref für Supabase Subscription speichern
  const subscriptionRef = useRef<any>(null);

  const fetchNachrichten = async () => {
    if (!user) return;
    setLoadingNachrichten(true);
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Fehler beim Laden der Nachrichten');
      console.error(error);
    } else {
      setNachrichten(data || []);
    }
    setLoadingNachrichten(false);
  };

  useEffect(() => {
    if (!loading) {
      if (!session || !['kunde', 'user'].includes(user?.role || '')) {
        navigate('/login');
      } else {
        fetchNachrichten();
        
        // Realtime subscription logic moved directly into useEffect
        if (user) { // Ensure user is available for filter
          const channel = supabase
            .channel('public:messages')
            .on(
              'postgres_changes',
              { event: '*', schema: 'public', table: 'messages', filter: `user_id=eq.${user.id}` },
              (payload) => {
                fetchNachrichten();
              }
            );

          channel.subscribe();
          subscriptionRef.current = channel;
        }
      }
    }
    // Cleanup on unmount
    return () => {
      if (subscriptionRef.current) {
        supabase.removeChannel(subscriptionRef.current);
        subscriptionRef.current = null;
      }
    };
  }, [session, user, loading, navigate]); // Added user to dependencies for filter changes

  const handleSendMessage = async () => {
    if (!subject.trim() || !content.trim()) {
      toast.error('Bitte Betreff und Nachricht ausfüllen');
      return;
    }
    if (!user) {
      toast.error('Benutzer nicht gefunden');
      return;
    }

    const newMessage = {
      user_id: user.id,
      subject: subject.trim(),
      content: content.trim(),
      status: 'ungelesen',
      created_at: new Date().toISOString()
    };

    const { error } = await supabase
      .from('messages')
      .insert(newMessage);

    if (error) {
      toast.error('Fehler beim Senden der Nachricht');
      console.error(error);
    } else {
      toast.success('Nachricht erfolgreich gesendet');
      setSubject('');
      setContent('');
      // fetchNachrichten wird durch Realtime-Subscription automatisch aufgerufen
    }
  };

  if (loading || loadingNachrichten) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg">Lade Nachrichten...</p>
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
      <main className="flex-grow container mx-auto px-6 py-12 max-w-5xl space-y-8">
        <h1 className="text-3xl font-bold">Ihre Nachrichten</h1>
        <p className="text-gray-700">Kommunikation mit unserem Team.</p>

        {/* Neue Nachricht senden */}
        <Card>
          <CardHeader>
            <CardTitle>Neue Nachricht senden</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="space-y-4"
            >
              <div>
                <Label htmlFor="subject">Betreff</Label>
                <Input
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  placeholder="Betreff eingeben"
                />
              </div>
              <div>
                <Label htmlFor="content">Nachricht</Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  placeholder="Ihre Nachricht..."
                  rows={5}
                />
              </div>
              <Button type="submit" className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white">
                Nachricht senden
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Nachrichtenübersicht */}
        {nachrichten.length === 0 ? (
          <p className="text-gray-600">Keine Nachrichten gefunden.</p>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Nachrichtenverlauf</CardTitle>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Betreff</TableHead>
                    <TableHead>Nachricht</TableHead>
                    <TableHead>Datum</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {nachrichten.map((msg) => (
                    <TableRow key={msg.id}>
                      <TableCell className="max-w-xs truncate">{msg.subject}</TableCell>
                      <TableCell className="max-w-lg truncate">{msg.content}</TableCell>
                      <TableCell>{new Date(msg.created_at).toLocaleString()}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-sm font-semibold ${
                            msg.status === 'gelesen'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {msg.status}
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
    </div>
  );
}