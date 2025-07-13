import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

interface Referral {
  id: string;
  referrer_name: string;
  referrer_email: string;
  referred_name: string;
  referred_email: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

export default function AdminReferrals() {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReferrals();
    const channel = supabase
      .channel('public:referrals')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'referrals' }, fetchReferrals)
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchReferrals = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('referrals')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReferrals(data || []);
    } catch (error) {
      toast.error('Fehler beim Laden der Empfehlungen');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('referrals')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      toast.success('Status der Empfehlung aktualisiert.');
    } catch (error) {
      toast.error('Fehler beim Aktualisieren des Status.');
      console.error(error);
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'approved':
        return 'default';
      case 'rejected':
        return 'destructive';
      case 'pending':
      default:
        return 'secondary';
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
      <h1 className="text-2xl sm:text-3xl font-bold text-white">Empfehlungen</h1>
      <Card className="bg-gray-700 text-white">
        <CardHeader>
          <CardTitle>Empfehlungsprogramm-Übersicht</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-gray-600/50 border-gray-600">
                  <TableHead className="text-white">Datum</TableHead>
                  <TableHead className="text-white">Empfohlen von</TableHead>
                  <TableHead className="text-white">Empfohlene Person</TableHead>
                  <TableHead className="text-white">Status</TableHead>
                  <TableHead className="text-right text-white">Aktion</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {referrals.map((referral) => (
                  <TableRow key={referral.id} className="hover:bg-gray-600/50 border-gray-600">
                    <TableCell>{new Date(referral.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div>{referral.referrer_name}</div>
                      <div className="text-xs text-gray-400">{referral.referrer_email}</div>
                    </TableCell>
                    <TableCell>
                      <div>{referral.referred_name}</div>
                      <div className="text-xs text-gray-400">{referral.referred_email}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(referral.status)}>{referral.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Select onValueChange={(value) => handleStatusChange(referral.id, value)} defaultValue={referral.status}>
                        <SelectTrigger className="w-[120px] bg-gray-800 border-gray-600 text-white">
                          <SelectValue placeholder="Status ändern" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="approved">Approved</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}