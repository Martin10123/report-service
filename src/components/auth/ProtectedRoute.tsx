import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/stores';
import { ROUTES } from '@/constants';

/**
 * Protege rutas que requieren autenticación.
 * Redirige a login si no hay sesión; mientras carga la sesión muestra un loader.
 */
export function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-blue-50 via-white to-indigo-50">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  return <Outlet />;
}
