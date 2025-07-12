"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface User {
  id: string;
  email: string;
  role: string;
  created_at: string;
  last_sign_in_at: string | null;
  is_active: boolean;
}

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter((user) =>
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("admin-list-users");
      if (error) throw error;
      
      // Sicherstellen, dass data ein Array ist, sonst ein leeres Array verwenden
      const usersData = Array.isArray(data) ? data : [];
      setUsers(usersData);
      setFilteredUsers(usersData);
    } catch (error) {
      toast.error("Fehler beim Laden der Benutzer: " + (error as Error).message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (userId: string, payload: { role?: string; isActive?: boolean }) => {
    try {
      const { error } = await supabase.functions.invoke("admin-update-user", {
        body: { userId, ...payload },
      });
      if (error) throw error;
      
      toast.success("Benutzer erfolgreich aktualisiert");
      fetchUsers();
    } catch (error) {
      toast.error("Fehler beim Aktualisieren des Benutzers: " + (error as Error).message);
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold text-white">Benutzerverwaltung</h1>
        <div className="flex w-full md:w-auto gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Benutzer suchen..."
              className="pl-10 bg-gray-800 text-white border-gray-600"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <Card className="bg-gray-700 text-white shadow-lg">
        <CardHeader>
          <CardTitle>Alle Benutzer</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-600">
                <TableHead className="text-white">E-Mail</TableHead>
                <TableHead className="text-white">Rolle</TableHead>
                <TableHead className="text-white">Registriert am</TableHead>
                <TableHead className="text-white">Letzte Anmeldung</TableHead>
                <TableHead className="text-white">Status</TableHead>
                <TableHead className="text-right text-white">Aktionen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id} className="border-gray-600">
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Select
                      value={user.role}
                      onValueChange={(value) => updateUser(user.id, { role: value })}
                    >
                      <SelectTrigger className="w-[140px] bg-gray-800 border-gray-600">
                        <SelectValue placeholder="Rolle" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="mitarbeiter">Mitarbeiter</SelectItem>
                        <SelectItem value="kunde">Kunde</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {user.last_sign_in_at
                      ? new Date(user.last_sign_in_at).toLocaleString()
                      : "Nie"}
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.is_active ? "default" : "destructive"}>
                      {user.is_active ? "Aktiv" : "Deaktiviert"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateUser(user.id, { isActive: !user.is_active })}
                    >
                      {user.is_active ? "Deaktivieren" : "Aktivieren"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}