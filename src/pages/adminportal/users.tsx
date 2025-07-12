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
  banned_until: string | null;
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
      const { data: authData, error: authError } = await supabase.auth.admin.listUsers();
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*");

      if (authError || profileError) throw authError || profileError;

      // Combine auth and profile data
      const combinedUsers = authData.users.map((authUser) => {
        const profile = profileData.find((p) => p.id === authUser.id) || {};
        return {
          id: authUser.id,
          email: authUser.email || "",
          role: profile.role || "user",
          created_at: authUser.created_at,
          last_sign_in_at: authUser.last_sign_in_at,
          banned_until: authUser.banned_until,
        };
      });

      setUsers(combinedUsers);
      setFilteredUsers(combinedUsers);
    } catch (error) {
      toast.error("Fehler beim Laden der Benutzer");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId: string, newRole: string) => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ role: newRole })
        .eq("id", userId);

      if (error) throw error;

      toast.success("Benutzerrolle aktualisiert");
      fetchUsers();
    } catch (error) {
      toast.error("Fehler beim Aktualisieren der Rolle");
      console.error(error);
    }
  };

  const toggleUserStatus = async (userId: string, isBanned: boolean) => {
    try {
      const { error } = await supabase.auth.admin.updateUserById(userId, {
        ban_duration: isBanned ? 'none' : '3650d', // Ban for 10 years or unban
      });

      if (error) throw error;

      toast.success(`Benutzer ${isBanned ? "aktiviert" : "deaktiviert"}`);
      fetchUsers();
    } catch (error) {
      toast.error("Fehler beim Ändern des Status");
      console.error(error);
    }
  };

  const isUserBanned = (user: User) => {
    return user.banned_until && new Date(user.banned_until) > new Date();
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
        <h1 className="text-3xl font-bold">Benutzerverwaltung</h1>
        <div className="flex w-full md:w-auto gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Benutzer suchen..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Alle Benutzer</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>E-Mail</TableHead>
                <TableHead>Rolle</TableHead>
                <TableHead>Registriert am</TableHead>
                <TableHead>Letzte Anmeldung</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aktionen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => {
                const banned = isUserBanned(user);
                return (
                  <TableRow key={user.id}>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Select
                        value={user.role}
                        onValueChange={(value) => updateUserRole(user.id, value)}
                      >
                        <SelectTrigger className="w-[140px]">
                          <SelectValue placeholder="Rolle" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="mitarbeiter">Mitarbeiter</SelectItem>
                          <SelectItem value="kunde">Kunde</SelectItem>
                          <SelectItem value="user">Benutzer</SelectItem>
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
                      <Badge variant={!banned ? "default" : "destructive"}>
                        {!banned ? "Aktiv" : "Deaktiviert"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleUserStatus(user.id, banned)}
                      >
                        {banned ? "Aktivieren" : "Deaktivieren"}
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}