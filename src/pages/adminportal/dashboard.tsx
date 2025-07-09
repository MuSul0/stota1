"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Users, FileText, Bell, BarChart2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Stats {
  users: number;
  invoicesOpen: number;
  notificationsUnread: number;
  servicesActive: number;
  lastUpdated: string;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<Stats>({
    users: 0,
    invoicesOpen: 0,
    notificationsUnread: 0,
    servicesActive: 0,
    lastUpdated: "",
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const [{ count: usersCount }, { count: invoicesCount }, { count: notificationsCount }, { count: servicesCount }] = await Promise.all([
        supabase.from("profiles").select("*", { count: "exact", head: true }),
        supabase.from("invoices").select("*", { count: "exact", head: true }).eq("status", "offen"),
        supabase.from("messages").select("*", { count: "exact", head: true }).eq("status", "ungelesen"),
        supabase.from("services").select("*", { count: "exact", head: true }).eq("is_active", true),
      ]);

      setStats({
        users: usersCount || 0,
        invoicesOpen: invoicesCount || 0,
        notificationsUnread: notificationsCount || 0,
        servicesActive: servicesCount || 0,
        lastUpdated: new Date().toLocaleTimeString(),
      });
    } catch (error) {
      toast.error("Fehler beim Laden der Statistiken");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();

    // Optional: alle 30 Sekunden aktualisieren
    const interval = setInterval(() => {
      fetchStats();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
        <Button
          variant="outline"
          size="sm"
          onClick={fetchStats}
          disabled={loading}
          className="flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          {loading ? "Lädt..." : "Aktualisieren"}
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <Card className="bg-gray-700 text-white shadow-lg">
          <CardHeader className="flex items-center gap-2">
            <Users className="w-6 h-6 text-blue-400" />
            <CardTitle>Benutzer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-extrabold">{stats.users}</div>
            <p className="text-gray-300">Gesamtanzahl registrierter Benutzer</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-700 text-white shadow-lg">
          <CardHeader className="flex items-center gap-2">
            <FileText className="w-6 h-6 text-yellow-400" />
            <CardTitle>Offene Rechnungen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-extrabold">{stats.invoicesOpen}</div>
            <p className="text-gray-300">Rechnungen, die noch offen sind</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-700 text-white shadow-lg">
          <CardHeader className="flex items-center gap-2">
            <Bell className="w-6 h-6 text-red-400" />
            <CardTitle>Ungelesene Nachrichten</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-extrabold">{stats.notificationsUnread}</div>
            <p className="text-gray-300">Neue Kundenanfragen und Nachrichten</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-700 text-white shadow-lg">
          <CardHeader className="flex items-center gap-2">
            <BarChart2 className="w-6 h-6 text-green-400" />
            <CardTitle>Aktive Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-extrabold">{stats.servicesActive}</div>
            <p className="text-gray-300">Services, die aktuell aktiv sind</p>
          </CardContent>
        </Card>
      </div>

      <p className="text-gray-400 text-sm text-right">Letzte Aktualisierung: {stats.lastUpdated}</p>
    </div>
  );
};

export default AdminDashboard;