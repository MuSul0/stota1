import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

const CreateAdminUser = () => {
  const [email, setEmail] = useState('mo.suleimannn@gmail.com');
  const [password, setPassword] = useState('MOMOcan1.');
  const [firstName, setFirstName] = useState('Mohamad'); 
  const [lastName, setLastName] = useState('Suleiman'); 
  const [loading, setLoading] = useState(false);

  const handleCreateAdmin = async () => {
    setLoading(true);
    try {
      // Invoke the Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('create-or-update-admin-user', {
        body: {
          email,
          password,
          first_name: firstName,
          last_name: lastName,
        },
      });

      if (error) {
        throw error;
      }

      // Check for application-level errors returned by the edge function
      if (data && data.error) {
        throw new Error(data.error);
      }

      toast.success(`Admin-Benutzer ${email} erfolgreich erstellt/aktualisiert!`);
    } catch (error: any) {
      toast.error(`Fehler beim Erstellen/Aktualisieren des Admin-Benutzers: ${error.message}`);
      console.error('Error creating/updating admin user:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Admin-Benutzer erstellen/aktualisieren</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">
            Diese Seite dient dazu, einen Admin-Benutzer in Supabase zu erstellen oder zu aktualisieren.
            Bitte verwenden Sie dies mit Vorsicht.
          </p>
          <div>
            <Label htmlFor="email">E-Mail</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="password">Passwort</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="firstName">Vorname</Label>
            <Input id="firstName" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="lastName">Nachname</Label>
            <Input id="lastName" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>
          <Button onClick={handleCreateAdmin} disabled={loading} className="w-full">
            {loading ? <Loader2 className="animate-spin mr-2" /> : 'Admin-Benutzer erstellen/aktualisieren'}
          </Button>
          <p className="text-xs text-gray-500 mt-2">
            Nach der Ausführung können Sie diese temporäre Seite und die zugehörige Route in `src/App.tsx` entfernen.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateAdminUser;