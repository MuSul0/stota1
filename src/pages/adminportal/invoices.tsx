import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { CalendarIcon, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface Invoice {
  id: string;
  customer_email: string;
  amount: number;
  status: 'offen' | 'bezahlt';
  due_date: string;
  created_at: string;
}

const invoiceSchema = z.object({
  customer_email: z.string().email({ message: "Bitte geben Sie eine gültige E-Mail-Adresse ein." }),
  amount: z.coerce.number().positive({ message: "Der Betrag muss größer als 0 sein." }),
  due_date: z.date({
    required_error: "Ein Fälligkeitsdatum ist erforderlich.",
  }),
});

export default function AdminInvoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const subscriptionRef = useRef<any>(null);

  const form = useForm<z.infer<typeof invoiceSchema>>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      customer_email: "",
      amount: 0,
    },
  });

  useEffect(() => {
    fetchInvoices();
    setupRealtimeSubscription();
    
    return () => {
      if (subscriptionRef.current) {
        supabase.removeChannel(subscriptionRef.current);
        subscriptionRef.current = null;
      }
    };
  }, []);

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

  const setupRealtimeSubscription = () => {
    if (subscriptionRef.current) {
      supabase.removeChannel(subscriptionRef.current);
      subscriptionRef.current = null;
    }
    const channel = supabase
      .channel('public:invoices')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'invoices' }, () => {
        fetchInvoices();
      })
      .subscribe();
    subscriptionRef.current = channel;
  };

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
    }
  };

  const onSubmit = async (values: z.infer<typeof invoiceSchema>) => {
    setIsSubmitting(true);
    const { error } = await supabase.from("invoices").insert([
      {
        customer_email: values.customer_email,
        amount: values.amount,
        due_date: format(values.due_date, "yyyy-MM-dd"),
        status: "offen",
      },
    ]);

    if (error) {
      toast.error("Fehler beim Erstellen der Rechnung.");
      console.error(error);
    } else {
      toast.success("Rechnung erfolgreich erstellt.");
      form.reset();
      setIsCreateDialogOpen(false);
    }
    setIsSubmitting(false);
  };

  if (loadingData) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
      </div>
    );
  }

  return (
    <main className="flex-grow container mx-auto px-6 py-12 max-w-7xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Rechnungen</h1>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>Neue Rechnung erstellen</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Neue Rechnung erstellen</DialogTitle>
              <DialogDescription>
                Füllen Sie die Details aus, um eine neue Rechnung zu erstellen.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                <FormField
                  control={form.control}
                  name="customer_email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kunden-E-Mail</FormLabel>
                      <FormControl>
                        <Input placeholder="kunde@beispiel.de" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Betrag (€)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" placeholder="100.00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="due_date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Fällig am</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Datum auswählen</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date(new Date().setDate(new Date().getDate() - 1))
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Rechnung speichern
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

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