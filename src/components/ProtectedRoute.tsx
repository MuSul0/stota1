import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSession } from './SessionProvider';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { user, loading, session } = useSession();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-16 w-16 animate-spin" />
      </div>
    );
  }

  if (!session || !user) {
    // Benutzer ist nicht angemeldet, zum Login weiterleiten
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role || '')) {
    // Benutzer hat nicht die erforderliche Rolle, zur Startseite weiterleiten
    return <Navigate to="/" replace />;
  }

  // Benutzer ist angemeldet und hat die richtige Rolle
  return <Outlet />;
};

export default ProtectedRoute;