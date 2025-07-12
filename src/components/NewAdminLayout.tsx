"use client";

import React from "react";
import { Outlet, useNavigate, NavLink } from "react-router-dom";
import { LogOut, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/components/SessionProvider";

const navItems = [
  { to: "dashboard", label: "Dashboard" },
  { to: "analytics", label: "Analytics" },
  { to: "users", label: "Benutzer" },
  { to: "employee-registration", label: "Mitarbeiter registrieren" },
  { to: "services", label: "Services" },
  { to: "seiteninhalte", label: "Seiteninhalte" },
  { to: "invoices", label: "Rechnungen" },
  { to: "notifications", label: "Benachrichtigungen" },
  { to: "leads", label: "Leads" },
  { to: "referrals", label: "Empfehlungen" },
  { to: "reports", label: "Berichte" },
  { to: "settings", label: "Einstellungen" },
];

const NewAdminLayout = () => {
  const navigate = useNavigate();
  const { session, user, loading } = useSession();

  React.useEffect(() => {
    if (!loading) {
      if (!session || user?.role !== 'admin') {
        navigate('/login', { replace: true });
      }
    }
  }, [session, user, loading, navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <Loader2 className="h-16 w-16 animate-spin text-white" />
      </div>
    );
  }

  if (!session || user?.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="flex items-center justify-between gap-4 px-4 sm:px-6 py-4 border-b border-gray-700">
        <div className="text-xl font-bold select-none">Admin</div>
        <div className="flex-1 min-w-0 mx-4">
          <nav className="flex space-x-4 overflow-x-auto pb-2 -mb-2">
            {navItems.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `whitespace-nowrap px-3 py-2 rounded-md font-medium transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
        <Button
          variant="destructive"
          onClick={handleLogout}
          className="flex items-center gap-2 flex-shrink-0"
        >
          <LogOut className="w-5 h-5" />
          <span className="hidden sm:inline">Abmelden</span>
        </Button>
      </header>

      {/* Main Content */}
      <main className="flex-grow overflow-auto p-4 sm:p-6 bg-gray-800">
        <Outlet />
      </main>
    </div>
  );
};

export default NewAdminLayout;