import { Navigate } from 'react-router-dom';
import { useAuth } from '@/stores';
import { ROUTES } from '@/constants';

type Props = {
  children: React.ReactNode;
};

/**
 * Redirige al dashboard si el usuario ya está autenticado.
 * Útil para login/register: si ya hay sesión, no mostrar el formulario.
 */
export function RedirectIfAuthenticated({ children }: Props) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-blue-50 via-white to-indigo-50">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return <>{children}</>;
}
