"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { Loader2, UserPlus } from "lucide-react";

interface Employee {
  id: string;
  email: string;
  first_name: string;
  role: string;
  created_at: string;
}

export default function EmployeeRegistration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
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
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("role", "mitarbeiter")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setEmployees(data || []);
    } catch (error) {
      toast.error("Fehler beim Laden der Mitarbeiter");
      console.error(error);
    }
  };

  const setupRealtimeSubscription = () => {
    if (subscriptionRef.current) {
      supabase.removeChannel(subscriptionRef.current);
      subscriptionRef.current = null;
    }
    const channel = supabase
      .channel("public:profiles")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "profiles", filter: "role=eq.mitarbeiter" },
        () => {
          fetchEmployees();
        }
      )
      .subscribe();

    subscriptionRef.current = channel;
  };

  const handleRegister = async () => {
    if (!email || !password || !firstName || !lastName) {
      toast.error("Bitte alle Felder ausfüllen");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.functions.invoke("admin-create-employee", {
        body: { email, password, firstName, lastName },
      });

      if (error) throw error;

      toast.success("Mitarbeiter erfolgreich registriert");
      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
      fetchEmployees();
    } catch (error) {
      toast.error("Fehler bei der Registrierung: " + (error as Error).message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white flex items-center gap-2">
        <UserPlus className="w-8 h-8 text-blue-400" />
        Mitarbeiter registrieren
      </h1>

      <Card className="bg-gray-700 text-white shadow-lg">
        <CardHeader>
          <CardTitle>Neuen Mitarbeiter anlegen</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleRegister();
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="space-y-2">
              <Label htmlFor="firstName">Vorname</Label>
              <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Nachname</Label>
              <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-Mail</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Passwort</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="md:col-span-2 flex justify-end">
              <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700">
                {loading ? <Loader2 className="animate-spin" /> : "Mitarbeiter registrieren"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="bg-gray-700 text-white shadow-lg">
        <CardHeader>
          <CardTitle>Aktuelle Mitarbeiter</CardTitle>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          {employees.length === 0 ? (
            <p className="p-4 text-gray-400">Keine Mitarbeiter gefunden.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-gray-600">
                  <TableHead className="text-white">Name</TableHead>
                  <TableHead className="text-white">E-Mail</TableHead>
                  <TableHead className="text-white">Registriert am</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.map((emp) => (
                  <TableRow key={emp.id} className="border-gray-600">
                    <TableCell>{emp.first_name || "Unbekannt"}</TableCell>
                    <TableCell>{emp.email}</TableCell>
                    <TableCell>{new Date(emp.created_at).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}