import { Navigate } from 'react-router-dom';
import { useAuth } from '@/stores';
import { ROUTES } from '@/constants';

const Loader = () => (
  <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-blue-50 via-white to-indigo-50">
    <div className="h-10 w-10 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
  </div>
);

/**
 * Para "/" y rutas desconocidas: espera a resolver la sesión y luego redirige
 * a dashboard (si hay sesión) o a login (si no). Evita el flash de entrar a
 * dashboard y luego ser enviado a login.
 */
export function HomeRedirect() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Navigate
      to={isAuthenticated ? ROUTES.DASHBOARD : ROUTES.LOGIN}
      replace
    />
  );
}
