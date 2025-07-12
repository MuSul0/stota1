import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  created_at: string;
}

export default function AdminLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
    const channel = supabase
      .channel('public:contact_requests')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'contact_requests' }, fetchLeads)
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('contact_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLeads(data || []);
    } catch (error) {
      toast.error('Fehler beim Laden der Leads');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">CRM Leads (Kontaktanfragen)</h1>
      <Card className="bg-gray-700 text-white">
        <CardHeader>
          <CardTitle>Eingegangene Kontaktanfragen</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-gray-600/50 border-gray-600">
                <TableHead className="text-white">Datum</TableHead>
                <TableHead className="text-white">Name</TableHead>
                <TableHead className="text-white">E-Mail</TableHead>
                <TableHead className="text-white">Telefon</TableHead>
                <TableHead className="text-white">Service</TableHead>
                <TableHead className="text-white">Nachricht</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead) => (
                <TableRow key={lead.id} className="hover:bg-gray-600/50 border-gray-600">
                  <TableCell>{new Date(lead.created_at).toLocaleString()}</TableCell>
                  <TableCell>{lead.name}</TableCell>
                  <TableCell>{lead.email}</TableCell>
                  <TableCell>{lead.phone || '-'}</TableCell>
                  <TableCell>{lead.service || '-'}</TableCell>
                  <TableCell className="truncate max-w-sm">{lead.message}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}