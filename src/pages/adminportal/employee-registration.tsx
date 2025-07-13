import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Employee {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
}

const EmployeeRegistration = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [employees, setEmployees] = useState<Employee[]>([]);

  const fetchEmployees = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, first_name, last_name, email, role')
        .eq('role', 'mitarbeiter');

      if (error) {
        console.error("Error fetching employees:", error);
        toast.error("Fehler beim Laden der Mitarbeiterliste.");
      } else {
        setEmployees(data || []);
      }
    } catch (err) {
      console.error("Unexpected error fetching employees:", err);
      toast.error("Ein unerwarteter Fehler ist aufgetreten.");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleRegister = async () => {
    if (!email || !password || !firstName || !lastName) {
      toast.error("Bitte alle Felder ausfüllen");
      return;
    }

    setLoading(true);

    try {
      const { data, error: invokeError } = await supabase.functions.invoke("admin-create-employee", {
        body: { email, password, firstName, lastName },
      });

      if (invokeError) {
        let errorMessage = "Ein unbekannter Fehler bei der Funktionsausführung ist aufgetreten.";
        if (invokeError instanceof Error) {
          errorMessage = invokeError.message;
        }
        const functionErrorContext = (invokeError as any).context?.error;
        if (typeof functionErrorContext === 'string') {
          errorMessage = functionErrorContext;
        } else if (functionErrorContext && typeof functionErrorContext.message === 'string') {
          errorMessage = functionErrorContext.message;
        }
        throw new Error(errorMessage);
      }

      if (data && data.error) {
        throw new Error(data.error);
      }

      toast.success("Mitarbeiter erfolgreich registriert und Willkommens-E-Mail versandt.");
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
    <div className="container mx-auto p-4">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Mitarbeiter registrieren</CardTitle>
          <CardDescription>Erstellen Sie ein neues Mitarbeiterkonto.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="firstName">Vorname</Label>
            <Input
              id="firstName"
              type="text"
              placeholder="Max"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="lastName">Nachname</Label>
            <Input
              id="lastName"
              type="text"
              placeholder="Mustermann"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">E-Mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="max.mustermann@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Passwort</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button onClick={handleRegister} disabled={loading} className="w-full">
            {loading ? "Registrieren..." : "Mitarbeiter registrieren"}
          </Button>
        </CardContent>
      </Card>

      <h2 className="text-xl font-bold mt-8 mb-4 text-center">Registrierte Mitarbeiter</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {employees.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">Keine Mitarbeiter gefunden.</p>
        ) : (
          employees.map((emp) => (
            <Card key={emp.id}>
              <CardContent className="p-4">
                <p className="font-semibold">{emp.first_name} {emp.last_name}</p>
                <p className="text-sm text-gray-600">{emp.email}</p>
                <p className="text-sm text-gray-600">Rolle: {emp.role}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default EmployeeRegistration;