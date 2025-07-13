import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

interface Invoice {
  id: string;
  customer_email: string;
  amount: number;
  status: 'offen' | 'bezahlt';
  due_date: string;
  created_at: string;
}

export default function AdminInvoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const subscriptionRef = useRef<any>(null);

  const fetchInvoices = async () => {
    setLoadingData(true);
    const { data, error } = await supabase
      .from('invoices')
      .select('*')
      .order('due_date', { ascending: true });

    if (error) {
      toast.error('Fehler beim Laden der Rechnungen');
      console.error(error);
    } else {
      setInvoices(data || []);
    }
    setLoadingData(false);
  };

  useEffect(() => {
    fetchInvoices();
    
    // Realtime subscription logic moved directly into useEffect
    const channel = supabase
      .channel('public:invoices')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'invoices' }, () => {
        fetchInvoices();
      })
      .subscribe();
    subscriptionRef.current = channel;
    
    return () => {
      if (subscriptionRef.current) {
        supabase.removeChannel(subscriptionRef.current);
        subscriptionRef.current = null;
      }
    };
  }, []);

  const markAsPaid = async (id: string) => {
    const { error } = await supabase
      .from('invoices')
      .update({ status: 'bezahlt' })
      .eq('id', id);

    if (error) {
      toast.error('Fehler beim Aktualisieren der Rechnung');
      console.error(error);
    } else {
      toast.success('Rechnung als bezahlt markiert');
      fetchInvoices();
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
      <h1 className="text-3xl font-bold mb-8">Rechnungen</h1>

      {invoices.length === 0 ? (
        <p className="text-gray-600">Keine Rechnungen gefunden.</p>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Rechnungsübersicht</CardTitle>
          </CardHeader>
          <CardContent className="p-0 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Kunde</TableHead>
                  <TableHead>Betrag</TableHead>
                  <TableHead>Fällig am</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aktion</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell>{invoice.customer_email}</TableCell>
                    <TableCell>{invoice.amount.toFixed(2)} €</TableCell>
                    <TableCell>{new Date(invoice.due_date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant={invoice.status === 'bezahlt' ? 'default' : 'destructive'}>
                        {invoice.status === 'bezahlt' ? 'Bezahlt' : 'Offen'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {invoice.status === 'offen' && (
                        <Button size="sm" onClick={() => markAsPaid(invoice.id)}>
                          Als bezahlt markieren
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