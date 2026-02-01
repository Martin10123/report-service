import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { AUTH_RETURN_TO_KEY } from '@/services/supabase';

/**
 * Inicializa el listener de auth de Supabase y la sesión inicial.
 * Tras login con OAuth, redirige al destino guardado en sessionStorage (auth-return-to).
 * Montar una sola vez en la raíz (ej. en App).
 */
export function AuthInit() {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isLoading = useAuthStore((s) => s.isLoading);

  useEffect(() => {
    const cleanup = useAuthStore.getState().initAuth();
    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  useEffect(() => {
    if (isLoading || !isAuthenticated) return;
    const returnTo = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem(AUTH_RETURN_TO_KEY) : null;
    if (returnTo && returnTo.startsWith('/')) {
      sessionStorage.removeItem(AUTH_RETURN_TO_KEY);
      navigate(returnTo, { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  return null;
}
