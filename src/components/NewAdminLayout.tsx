"use client";

import React, { useState } from "react";
import { Outlet, useNavigate, NavLink } from "react-router-dom";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const navItems = [
  { to: "dashboard", label: "Dashboard" },
  { to: "users", label: "Benutzer" },
  { to: "employee-registration", label: "Mitarbeiter registrieren" },
  { to: "services", label: "Services" },
  { to: "invoices", label: "Rechnungen" },
  { to: "notifications", label: "Benachrichtigungen" },
  { to: "reports", label: "Berichte" },
  { to: "settings", label: "Einstellungen" },
];

const NewAdminLayout = () => {
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(true);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
        <div className="text-xl font-bold select-none">Admin</div>
        <nav className="flex space-x-4 overflow-x-auto">
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
        <Button
          variant="destructive"
          onClick={handleLogout}
          className="flex items-center gap-2"
        >
          <LogOut className="w-5 h-5" />
          Abmelden
        </Button>
      </header>

      {/* Main Content */}
      <main className="flex-grow overflow-auto p-6 bg-gray-800">
        <Outlet />
      </main>
    </div>
  );
};

export default NewAdminLayout;