import { supabase } from './client';

export type AuthError = { message: string };

/**
 * Inicio de sesión con email y contraseña.
 * @see https://supabase.com/docs/reference/javascript/auth-signinwithpassword
 */
export async function signInWithPassword(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

/**
 * Registro con email y contraseña.
 * Si en Supabase está activada la confirmación de email, el usuario debe confirmar antes de iniciar sesión.
 * @see https://supabase.com/docs/reference/javascript/auth-signup
 */
export async function signUp(email: string, password: string, options?: { fullName?: string }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: options?.fullName ? { full_name: options.fullName } : undefined,
      emailRedirectTo: `${window.location.origin}/`,
    },
  });
  if (error) throw error;
  return data;
}

const AUTH_RETURN_TO_KEY = 'auth-return-to';

/**
 * Inicio de sesión con Google (OAuth).
 * Redirige al usuario a Google y luego de vuelta a la app en /.
 * El destino deseado (returnTo) se guarda en sessionStorage y AuthInit redirige allí tras cargar la sesión.
 * @param returnTo path donde redirigir tras login (ej. '/dashboard' o location.state?.from?.pathname).
 * @see https://supabase.com/docs/reference/javascript/auth-signinwithoauth
 */
export async function signInWithGoogle(returnTo?: string) {
  if (returnTo && typeof sessionStorage !== 'undefined') {
    sessionStorage.setItem(AUTH_RETURN_TO_KEY, returnTo);
  }
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/`,
    },
  });
  if (error) throw error;
  return data;
}

/** Clave para leer/limpiar el destino tras OAuth. Usado en AuthInit. */
export { AUTH_RETURN_TO_KEY };

/**
 * Cerrar sesión.
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

/**
 * Obtener la sesión actual (útil para hidratar estado al cargar).
 */
export async function getSession() {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) throw error;
  return session;
}
